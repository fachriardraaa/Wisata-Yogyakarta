const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// ROUTE 1: UNTUK LANDING TRIP & LIST TRIP (Semua Trip)
// ==========================================
app.get("/trips", (req, res) => {
  const sqlAllTrips = `
    SELECT
      t.id, t.nama, t.kategori, t.durasi, t.harga, t.kuota,
      t.kuota_tersisa AS kuotaTersisa,
      t.tanggal_keberangkatan AS tanggalKeberangkatan,
      t.lokasi, t.gambar, t.deskripsi_lengkap AS deskripsiLengkap,
      IFNULL(GROUP_CONCAT(f.fasilitas), '') AS semuaFasilitas
    FROM open_trip t
    LEFT JOIN open_trip_fasilitas f ON t.id = f.trip_id
    GROUP BY t.id
  `;

  db.query(sqlAllTrips, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil semua trip" });
    }

    const formattedResults = results.map(item => {
      return {
        ...item,
        fasilitas: item.semuaFasilitas ? item.semuaFasilitas.split(/,\s*/) : []
      };
    });

    res.json(formattedResults);
  });
});


// ==========================================
// ROUTE 2: UNTUK DETAIL TRIP (Berdasarkan ID) - FIX BERUNTUN (NESTED)
// ==========================================
app.get("/trips/:id", (req, res) => {
  const { id } = req.params;

  // 1. Ambil data utama trip tunggal
  const sqlTrip = `SELECT id, nama, kategori, durasi, harga, lokasi, gambar, gambar AS gambarUtama, deskripsi_lengkap AS deskripsiLengkap FROM open_trip WHERE id = ?`;

  db.query(sqlTrip, [id], (err, tripResults) => {
    if (err) return res.status(500).json({ message: "Gagal ambil data trip" });
    if (tripResults.length === 0) return res.status(404).json({ message: "Tidak ditemukan" });

    const tripData = tripResults[0];

    // 2. Ambil data fasilitas (Masuk ke tahapan kedua)
    const sqlFasilitas = `SELECT fasilitas FROM open_trip_fasilitas WHERE trip_id = ?`;
    
    db.query(sqlFasilitas, [id], (err, fasilitasResults) => {
      if (err) return res.status(500).json({ message: "Gagal ambil fasilitas" });

      // Menyisipkan array fasilitas ke objek utama
      tripData.fasilitas = fasilitasResults.map(item => item.fasilitas);

      // 3. Ambil data galeri (Query ketiga dimasukkan di DALAM callback fasilitas)
      const sqlgaleri = `SELECT gambar FROM open_trip_galeri WHERE trip_id = ?`;
      
      db.query(sqlgaleri, [id], (err, galeriResults) => {
        if (err) return res.status(500).json({ message: "Gagal ambil galeri" });

        // Menyisipkan array galeri ke objek utama
        tripData.galeri = galeriResults.map(item => item.gambar);

        // SEKARANG AMAN: Respon baru dikirim setelah fasilitas dan galeri pasti selesai dimuat
        res.json(tripData);
      });
    });
  });
});

// ==========================================
// ROUTE 3: PROSES SIMPAN BOOKING TRIP
// ==========================================
app.post("/booking", (req, res) => {
  const { trip_id, nama_lengkap, email, nomor_whatsapp, jumlah_peserta, total_bayar } = req.body;

  if (!trip_id || !nama_lengkap || !email || !nomor_whatsapp || !jumlah_peserta || !total_bayar) {
    return res.status(400).json({ message: "Semua data form wajib diisi lengkap!" });
  }

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: "Gagal memulai transaksi database" });

    const sqlCekKuota = `SELECT kuota_tersisa FROM open_trip WHERE id = ?`;
    db.query(sqlCekKuota, [trip_id], (err, rows) => {
      if (err || rows.length === 0) {
        return db.rollback(() => {
          res.status(500).json({ message: "Gagal memeriksa kuota open trip" });
        });
      }

      const kuotaTersisaSaatIni = rows[0].kuota_tersisa;

      if (jumlah_peserta > kuotaTersisaSaatIni) {
        return db.rollback(() => {
          res.status(400).json({ message: `Kuota tidak mencukupi! Sisa kursi hanya ${kuotaTersisaSaatIni} pax.` });
        });
      }

      const sqlInsertBooking = `
        INSERT INTO open_trip_booking (trip_id, nama_lengkap, email, nomor_whatsapp, jumlah_peserta, total_bayar)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const valuesBooking = [trip_id, nama_lengkap, email, nomor_whatsapp, jumlah_peserta, total_bayar];

      db.query(sqlInsertBooking, valuesBooking, (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: "Gagal menyimpan data pemesanan" });
          });
        }

        const sqlUpdateKuota = `UPDATE open_trip SET kuota_tersisa = kuota_tersisa - ? WHERE id = ?`;
        db.query(sqlUpdateKuota, [jumlah_peserta, trip_id], (err, updateResult) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Gagal memperbarui sisa kuota perjalanan" });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ message: "Gagal melakukan commit data" });
              });
            }

            res.status(201).json({
              message: "Booking berhasil dibuat! Silakan lakukan konfirmasi pembayaran.",
              bookingId: result.insertId
            });
          });
        });
      });
    });
  });
});

app.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Semua data wajib diisi!" });
  }

  const sqlCheckEmail = `SELECT * FROM users WHERE email = ?`;
  db.query(sqlCheckEmail, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal memeriksa email" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar. Silakan gunakan email lain." });
    }

    const sqlInsertUser = `
      INSERT INTO users ( name, email, phone, password)
      VALUES ( ?, ?, ?, ?)
    `;
    db.query(sqlInsertUser, [name, email, phone, password], (err, result) => {
      if (err) return res.status(500).json({ message: "Gagal menyimpan data pengguna" });

      res.status(201).json({ message: "Pendaftaran berhasil! Silakan login." });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan kata sandi wajib diisi!" });
  }

  const sqlCheckUser = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.query(sqlCheckUser, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal memeriksa kredensial" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Email atau kata sandi salah." });
    }

    const user = results[0];
    delete user.password; // Hapus password dari respons

    res.json({ message: "Login berhasil!", user });
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});