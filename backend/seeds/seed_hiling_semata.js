/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // 1. Bersihkan semua data lama di tabel anak terlebih dahulu, baru tabel utama
  // Ini penting agar tidak memicu error Foreign Key Integrity saat seed dijalankan ulang
  await knex('booking_users').del();
  await knex('open_trip_booking').del();
  await knex('open_trip_galeri').del();
  await knex('open_trip_fasilitas').del();
  await knex('open_trip').del();
  await knex('users').del();

 await knex('users').insert([
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@google.com',
      phone: '081234567890',
      password: 'admin', // Dalam produksi, pastikan untuk menyimpan hash password, bukan plaintext
      avatar: null,
      created_at: knex.fn.now()
    }
  ])

  // 2. MASUKKAN DATA UTAMA KE TABEL: open_trip
  await knex('open_trip').insert([
    {
      id: 1,
      nama: "Paket Jelajah Alam & Budaya DIY",
      kategori: "Alam & Petualangan",
      durasi: "3 Hari 2 Malam",
      harga: 1250000,
      kuota: 12,
      kuota_tersisa: 5,
      tanggal_keberangkatan: "2026-06-10",
      lokasi: "Yogyakarta",
      gambar: "https://i.pinimg.com/1200x/a3/ed/e5/a3ede5d0bb9365e9edae5129e0b48083.jpg",
      deskripsi_lengkap: "Nikmati perjalanan tak terlupakan menjelajahi keindahan tersembunyi Yogyakarta. Dari sunrise di puncak bukit hingga petualangan budaya di pusat kota."
    },
    {
      id: 3,
      nama: "Prambanan & Ratu Boko Sunset",
      kategori: "Budaya & Sejarah",
      durasi: "1 Hari",
      harga: 450000,
      kuota: 20,
      kuota_tersisa: 12,
      tanggal_keberangkatan: "2026-07-10",
      lokasi: "Sleman",
      gambar: "https://i.pinimg.com/1200x/c6/42/e2/c642e2412d2e8aa991432a582a42d709.jpg",
      deskripsi_lengkap: "Eksplorasi mahakarya Hindu dan menikmati sunset romantis di pelataran Ratu Boko."
    },
    {
      id: 5,
      nama: "Adventure South Coast & Timang",
      kategori: "Pantai",
      durasi: "2 Hari 1 Malam",
      harga: 1100000,
      kuota: 10,
      kuota_tersisa: 3,
      tanggal_keberangkatan: "2026-08-20",
      lokasi: "Gunungkidul & Bantul",
      gambar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      deskripsi_lengkap: "Perpaduan adrenalin di Pulau Timang dan ketenangan Gumuk Pasir Parangkusumo."
    },
    {
      id: 8,
      nama: "Urban Heritage & Modern Jogja",
      kategori: "City Tour",
      durasi: "2 Hari 1 Malam",
      harga: 650000,
      kuota: 15,
      kuota_tersisa: 9,
      tanggal_keberangkatan: "2026-10-02",
      lokasi: "Yogyakarta Kota",
      gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5a3DcrZjyLWgtnPFNaHcWPgoU-n1-Ji20qA&s",
      deskripsi_lengkap: "Melihat Jogja dari sudut pandang sejarah kolonial hingga pusat kreatif anak muda."
    }
  ]);

  // 3. MASUKKAN DATA RELASI KE TABEL: open_trip_fasilitas
  await knex('open_trip_fasilitas').insert([
    // Fasilitas Trip ID 1
    { trip_id: 1, fasilitas: "Hotel Bintang 3" },
    { trip_id: 1, fasilitas: "Makan 7x" },
    { trip_id: 1, fasilitas: "Tiket Wisata" },
    
    // Fasilitas Trip ID 3
    { trip_id: 3, fasilitas: "Transport" },
    { trip_id: 3, fasilitas: "Guide" },
    { trip_id: 3, fasilitas: "Dinner" },

    // Fasilitas Trip ID 5
    { trip_id: 5, fasilitas: "Hotel Bintang 3" },
    { trip_id: 5, fasilitas: "Jeep Timang" },
    { trip_id: 5, fasilitas: "Makan 4x" },

    // Fasilitas Trip ID 8
    { trip_id: 8, fasilitas: "Hotel Bintang 3" },
    { trip_id: 8, fasilitas: "Transport" },
    { trip_id: 8, fasilitas: "Makan 4x" }
  ]);

  // 4. MASUKKAN DATA RELASI KE TABEL: open_trip_galeri
  await knex('open_trip_galeri').insert([
    // Galeri Trip ID 1
    { trip_id: 1, gambar: "https://i.pinimg.com/736x/11/53/78/115378f6331686ea18201b09c62a05f5.jpg" },
    { trip_id: 1, gambar: "https://2.bp.blogspot.com/-jjZpMa4S1ik/TzpO4TSeoAI/AAAAAAAAANU/0gb9yJUd684/s1600/DSC_0033edt.jpg" },
    { trip_id: 1, gambar: "https://ik.imagekit.io/tvlk/blog/2024/09/shutterstock_2506333267.jpg?tr=q-70,c-at_max,w-1000,h-600" },

    // Galeri Trip ID 3
    { trip_id: 3, gambar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/0c/34/ratu-boko-wisataku-largejpg.jpg?w=900&h=-1&s=1" },
    { trip_id: 3, gambar: "https://imgcdn.espos.id/@espos/images/2022/07/Candi-Sewu.jpg?quality=60" },
    { trip_id: 3, gambar: "https://asset.tribunnews.com/7MYTf7mcLJKuI1JKcxMxg-DNAK4=/1200x675/filters:upscale():quality(30):format(webp):focal(0.5x0.5:0.5x0.5)/jogja/foto/bank/originals/sunset-di-ratu-boko.jpg" },

    // Galeri Trip ID 5
    { trip_id: 5, gambar: "https://indonesiakaya.com/wp-content/uploads/2020/10/Eksotika_Matahari_Terbenam_di_Pantai_Parangtritis_2.jpg" },
    { trip_id: 5, gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXD6pKZvT2YyUhTUfHymnuN-jR-gEOPsF6ug&s" },
    { trip_id: 5, gambar: "https://alodiatour.com/wp-content/uploads/2020/02/sandboarding-Gumuk-Pasir.jpg" },

    // Galeri Trip ID 8
    { trip_id: 8, gambar: "https://www.wsrentaljogja.com/wp-content/uploads/2017/08/@malioboro_insta.jpg" },
    { trip_id: 8, gambar: "https://bakpiakukustugu.co.id/uploads/compress/861257c278a9f67d3343e3b8ff4532ae.webp" },
    { trip_id: 8, gambar: "https://perkim.id/wp-content/uploads/2024/11/Suasana-Kawasan-Prawirotaman-%E2%80%9CKampung-Bule%E2%80%9D-Yogyakarta.jpg" }
  ])

  await knex('open_trip_booking').insert([

    {
      id:1,
      trip_id:1,
      jumlah_peserta:2,
      total_bayar:500000,
      status:'pending'
    },

  ]);await knex('open_trip_booking').insert([

    {
      trip_id:1,
      jumlah_peserta:2,
      total_bayar:500000,
      status:'pending'
    },

  ]);
 

  await knex('booking_users').insert([

  {
      booking_id:1,
      user_id:1
    },
  ])
  
   await knex('wisata').insert([
    {
      id: 'W01',
      nama: 'Candi Prambanan',
      lokasi: 'Sleman, DI Yogyakarta',
      kategori: 'Sejarah & Budaya',
      harga_mulai: 50000,
      jam_operasional: '06:00 - 17:00',
      gambar: 'https://www.worldhistory.org/img/r/p/1500x1500/9249.jpg.webp?v=1755704431',
      rating: 4.9,
      featured: true,
      deskripsi: 'Candi Hindu terbesar di Indonesia.'
    },
    {
      id: 'W02',
      nama: 'Pantai Parangtritis',
      lokasi: 'Bantul, DI Yogyakarta',
      kategori: 'Wisata Alam',
      harga_mulai: 15000,
      jam_operasional: '24 Jam',
      gambar: 'https://assets.telkomsel.com/public/2024-11/Pantai-Parangtritis-Surga-Tersembunyi-di-Yogyakarta.png',
      rating: 4.8,
      featured: true,
      deskripsi: 'Pantai terkenal di pesisir selatan Yogyakarta.'
    },
    {
      id: 'W03',
      nama: 'Keraton Yogyakarta',
      lokasi: 'Pusat Kota Yogyakarta',
      kategori: 'Budaya & Sejarah',
      harga_mulai: 15000,
      jam_operasional: '08:00 - 14:00',
      gambar: 'https://asset.kompas.com/crops/EIBd7igsHcB0GX68I6o9Y_57nOk=/0x0:1000x667/1200x800/data/photo/2022/06/28/62baefcf257f2.jpg',
      rating: 4.9,
      featured: false,
      deskripsi: 'Istana resmi Kesultanan Yogyakarta.'
    },
    {
      id: 'W04',
      nama: 'Tebing Breksi',
      lokasi: 'Sleman, DI Yogyakarta',
      kategori: 'Alam & Spot Foto',
      harga_mulai: 10000,
      jam_operasional: '06:00 - 21:00',
      gambar: 'https://assets.telkomsel.com/public/2024-11/tebing-breksi.jpg',
      rating: 4.7,
      featured: true,
      deskripsi: 'Bekas tambang batu yang menjadi objek wisata.'
    }
  ])

  await knex('tiket_wisata').insert([
  {
    id: 'P1',
    wisata_id: 'W01',
    nama: 'Tiket Masuk Weekday Dewasa',
    harga: 50000
  },
  {
    id: 'P2',
    wisata_id: 'W01',
    nama: 'Tiket Masuk Weekday Anak',
    harga: 25000
  },
  {
    id: 'P3',
    wisata_id: 'W01',
    nama: 'Tiket Masuk Weekend Dewasa',
    harga: 75000
  },
  {
    id: 'P4',
    wisata_id: 'W01',
    nama: 'Tiket Masuk Weekend Anak',
    harga: 40000
  },

  {
    id: 'PT1',
    wisata_id: 'W02',
    nama: 'Tiket Masuk Pantai',
    harga: 15000
  },
  {
    id: 'PT2',
    wisata_id: 'W02',
    nama: 'Tiket Camping',
    harga: 35000
  },
  {
    id: 'PT3',
    wisata_id: 'W02',
    nama: 'Tiket Sunset Spot',
    harga: 25000
  },

  {
    id: 'K1',
    wisata_id: 'W03',
    nama: 'Tiket Domestik Dewasa',
    harga: 15000
  },
  {
    id: 'K2',
    wisata_id: 'W03',
    nama: 'Tiket Domestik Anak',
    harga: 10000
  },
  {
    id: 'K3',
    wisata_id: 'W03',
    nama: 'Tiket Wisatawan Mancanegara',
    harga: 50000
  },

  {
    id: 'B1',
    wisata_id: 'W04',
    nama: 'Tiket Weekday Domestik',
    harga: 10000
  },
  {
    id: 'B2',
    wisata_id: 'W04',
    nama: 'Tiket Weekend Domestik',
    harga: 15000
  },
  {
    id: 'B3',
    wisata_id: 'W04',
    nama: 'Tiket Wisatawan Mancanegara',
    harga: 30000
  }
]);

await knex('fasilitas_wisata').insert([
  {
    wisata_id: 'W01',
    nama: 'Sewa Sepeda Keliling',
    harga: 'Rp 15.000 - Rp 30.000'
  },
  {
    wisata_id: 'W01',
    nama: 'Pemandu Wisata Lokal',
    harga: 'Rp 75.000 - Rp 150.000'
  },
  {
    wisata_id: 'W01',
    nama: 'Area Parkir Mobil',
    harga: 'Rp 5.000'
  },
  {
    wisata_id: 'W01',
    nama: 'Penyewaan Gazebo',
    harga: 'Rp 50.000'
  },

  {
    wisata_id: 'W02',
    nama: 'Sewa ATV Pantai',
    harga: 'Rp 50.000 - Rp 100.000'
  },
  {
    wisata_id: 'W02',
    nama: 'Sewa Ban Renang',
    harga: 'Rp 10.000'
  },
  {
    wisata_id: 'W02',
    nama: 'Sewa Tenda Camping',
    harga: 'Rp 75.000 - Rp 150.000'
  },
  {
    wisata_id: 'W02',
    nama: 'Penyewaan Perahu',
    harga: 'Rp 25.000'
  },

  {
    wisata_id: 'W03',
    nama: 'Jasa Pemandu',
    harga: 'Rp 50.000 - Rp 150.000'
  },
  {
    wisata_id: 'W03',
    nama: 'Penyewaan Helm Keselamatan',
    harga: 'Rp 10.000'
  },
  {
    wisata_id: 'W03',
    nama: 'Sewa Senter',
    harga: 'Rp 5.000'
  },

  {
    wisata_id: 'W04',
    nama: 'Sewa Jeep Jelajah',
    harga: 'Rp 300.000 - Rp 600.000'
  },
  {
    wisata_id: 'W04',
    nama: 'Paket Foto Profesional',
    harga: 'Rp 150.000'
  },
  {
    wisata_id: 'W04',
    nama: 'Sewa Kuda',
    harga: 'Rp 50.000'
  }
]);


};