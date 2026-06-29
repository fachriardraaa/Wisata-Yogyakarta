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
        INSERT INTO open_trip_booking (trip_id, nama_lengkap, email, nomor_whatsapp, jumlah_peserta, total_bayar, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
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

// ==========================================
// ROUTE 4: AMBIL DATA BOOKING UNTUK DASHBOARD & RIWAYAT
// ==========================================
app.get("/bookings", (req, res) => {
  const { email } = req.query;

  let sqlBookings = `
    SELECT
      b.id,
      b.trip_id AS tripId,
      t.nama AS tripNama,
      t.kategori,
      t.durasi,
      t.harga,
      t.lokasi,
      t.tanggal_keberangkatan AS tanggalKeberangkatan,
      b.nama_lengkap AS namaLengkap,
      b.email,
      b.nomor_whatsapp AS nomorWa,
      b.jumlah_peserta AS jumlahOrang,
      b.total_bayar AS totalBayar,
      COALESCE(b.status, 'pending') AS status,
      b.tanggal_booking AS createdAt
    FROM open_trip_booking b
    INNER JOIN open_trip t ON t.id = b.trip_id
  `;

  const params = [];

  if (email) {
    sqlBookings += ` WHERE b.email = ? `;
    params.push(email);
  }

  sqlBookings += ` ORDER BY b.tanggal_booking DESC `;

  db.query(sqlBookings, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data booking" });
    }

    res.json(results);
  });
});

app.patch("/bookings/:id/cancel", (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email user wajib dikirim untuk pembatalan." });
  }

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: "Gagal memulai transaksi pembatalan" });

    const sqlCheckBooking = `
      SELECT
        b.id,
        b.trip_id,
        b.email,
        COALESCE(b.status, 'pending') AS status,
        b.jumlah_peserta,
        t.kuota_tersisa
      FROM open_trip_booking b
      INNER JOIN open_trip t ON t.id = b.trip_id
      WHERE b.id = ?
    `;

    db.query(sqlCheckBooking, [id], (err, rows) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ message: "Gagal mengambil data booking" });
        });
      }

      if (rows.length === 0) {
        return db.rollback(() => {
          res.status(404).json({ message: "Booking tidak ditemukan" });
        });
      }

      const booking = rows[0];
      const bookingEmail = String(booking.email || "").trim().toLowerCase();
      const currentEmail = String(email || "").trim().toLowerCase();

      if (bookingEmail && bookingEmail !== currentEmail) {
        return db.rollback(() => {
          res.status(403).json({ message: "Booking ini bukan milik akun yang login" });
        });
      }

      const normalizedStatus = String(booking.status || "pending").toLowerCase();
      if (normalizedStatus.includes("cancel")) {
        return db.rollback(() => {
          res.status(400).json({ message: "Booking sudah dibatalkan" });
        });
      }

      if (normalizedStatus.includes("complete") || normalizedStatus.includes("selesai")) {
        return db.rollback(() => {
          res.status(400).json({ message: "Booking yang sudah selesai tidak bisa dibatalkan" });
        });
      }

      const sqlUpdateBooking = `UPDATE open_trip_booking SET status = 'cancelled' WHERE id = ?`;
      db.query(sqlUpdateBooking, [id], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: "Gagal membatalkan booking" });
          });
        }

        const sqlRestoreQuota = `UPDATE open_trip SET kuota_tersisa = kuota_tersisa + ? WHERE id = ?`;
        db.query(sqlRestoreQuota, [booking.jumlah_peserta, booking.trip_id], (err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Gagal mengembalikan kuota trip" });
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ message: "Gagal menyimpan pembatalan" });
              });
            }

            res.json({ message: "Booking berhasil dibatalkan" });
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

// ==========================================
// ROUTE 3: PROSES SIMPAN BOOKING TRIP
// ==========================================

app.get("/wisata", (req, res) => {
  const sqlAllWisata = `
    SELECT * FROM wisata
  `;
  db.query(sqlAllWisata, (err, results) => {
    if (err) return res.status(500).json({ message: "Gagal memuat data wisata" });
    res.json({ wisata: results });
  });
});

app.get("/wisata/:id", (req, res) => {
  const { id } = req.params;

  const sqlWisata = `SELECT * FROM wisata WHERE id = ?`;
  const sqlFasilitas = `SELECT * FROM fasilitas_wisata WHERE wisata_id = ?`;
  const sqlTiket = `SELECT * FROM tiket_wisata WHERE wisata_id = ?`;

  db.query(sqlWisata, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Gagal memuat data wisata" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Wisata tidak ditemukan" });
    }

    const wisata = results[0];

    db.query(sqlFasilitas, [id], (err, fasilitasResults) => {
      if (err) {
        return res.status(500).json({ message: "Gagal memuat data fasilitas" });
      }

      wisata.fasilitas = fasilitasResults;

      db.query(sqlTiket, [id], (err, tiketResults) => {
        if (err) {
          return res.status(500).json({ message: "Gagal memuat data tiket" });
        }

      wisata.tiket = tiketResults;

        return res.json({ wisata });
      });
    });
  });


})
// ==========================================
// ROUTE ABOUT US: DATA TIM KAMI
// ==========================================
app.get("/tim", (req, res) => {
  const sqlTim = `SELECT * FROM tim_kami`;
  db.query(sqlTim, (err, results) => {
    if (err) {
      console.error("Gagal mengambil data tim:", err);
      return res.status(500).json({ message: "Gagal memuat data tim" });
    }
    res.json(results);
  });
});

// ==========================================
// ROUTE BARU: TERIMA PESAN KONTAK
// ==========================================
app.post("/kontak", (req, res) => {
  const { nama, email, pesan } = req.body;

  // Validasi sederhana: pastikan semua kolom diisi
  if (!nama || !email || !pesan) {
    return res.status(400).json({ message: "Nama, email, dan pesan wajib diisi!" });
  }

  const sqlInsert = `INSERT INTO pesan_kontak (nama, email, pesan) VALUES (?, ?, ?)`;
  db.query(sqlInsert, [nama, email, pesan], (err, result) => {
    if (err) {
      console.error("Gagal menyimpan pesan kontak:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server, pesan gagal dikirim." });
    }
    res.status(201).json({ message: "Pesan berhasil dikirim! Terima kasih." });
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});