# Hiling Semata - Aplikasi Booking Open Trip 🏖️

Aplikasi marketplace platform penyedia paket wisata (*Open Trip*) dinamis berbasis web. Dibangun menggunakan ekosistem **React.js** di sisi frontend, serta **Express.js**, **Knex.js (Migration & Seeding)**, dan **MySQL** di sisi backend.

---

## 🛠️ Tech Stack & Fitur Utama
- **Frontend:** React.js, React Router DOM, Axios untuk integrasi API.
- **Backend:** Express.js, CORS, Dotenv.
- **Database & Lifecycle:** MySQL dengan driver `mysql2`, Knex.js untuk *Database Migration* (pembuatan skema tabel otomatis) dan *Database Seeding* (pengisian data tiruan awal).
- **Fitur Otomatisasi Kuota:** Sistem *Database Transaction* pada backend yang otomatis memotong sisa kuota perjalanan saat pemesanan (*booking*) berhasil divalidasi.

---

## 📁 Struktur Repositori
```text
proyek-hiling-semata/
├── backend/          # Source code server Express & konfigurasi Knex
├── frontend/         # Source code UI aplikasi React
└── README.md         # Dokumentasi panduan instalasi (File ini)


==================================================================
                !!!PALING PENTING!!!
==================================================================
1.  Kloning Repositori
    git clone <URL_REPOSITORY_GITHUB_ANDA>
    cd hiling-semata

2.  Setup & Jalankan Backend (Server)
    Masuk ke dalam direktori backend:

    cd backend
    Install seluruh dependensi node modules yang dibutuhkan:

    Bash
    npm install
    
    Buat database baru bernama hiling_semata di phpMyAdmin (atau aplikasi GUI database pilihan Anda).
    pastikan database hiling_semata tidak ada tabel didalamnya

    Bash
    npx knex migrate:latest
    Jalankan Knex Seeder untuk mengisi tabel wisata dengan data siap pakai secara otomatis:

    Bash
    npx knex seed:run
    Nyalakan server backend dalam mode pengembangan (development):

    Bash
    node server.js
    Server backend Anda kini berjalan responsif di URL http://localhost:3001

3.  Setup & Jalankan Frontend (Client)
    Buka jendela gitbash baru, lalu masuk ke direktori frontend:

    cd frontend
    Install seluruh dependensi library frontend:

    npm install
    Jalankan aplikasi frontend React Anda:

    npm run dev
    kontol kita