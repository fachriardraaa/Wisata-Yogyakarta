/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. TABEL UTAMA: open_trip
    .createTable('open_trip', (table) => {
      table.increments('id').primary(); // INT AUTO_INCREMENT PRIMARY KEY
      table.string('nama', 255).notNullable();
      table.string('kategori', 100).notNullable();
      table.string('durasi', 50).notNullable();
      table.integer('harga').notNullable();
      table.integer('kuota').notNullable();
      table.integer('kuota_tersisa').notNullable();
      table.date('tanggal_keberangkatan').notNullable();
      table.string('lokasi', 255).notNullable();
      table.string('gambar', 500).notNullable(); // URL Gambar Utama
      table.text('deskripsi_lengkap').notNullable();
      table.timestamps(true, true); // Membuat kolom created_at dan updated_at otomatis
    })

    // 2. TABEL ANAK: open_trip_fasilitas
    .createTable('open_trip_fasilitas', (table) => {
      table.increments('id').primary();
      // Foreign Key ke tabel open_trip
      table.integer('trip_id').unsigned().notNullable()
        .references('id').inTable('open_trip')
        .onDelete('CASCADE'); // Jika trip dihapus, fasilitas otomatis terhapus
      table.string('fasilitas', 255).notNullable();
    })

    // 3. TABEL ANAK: open_trip_galeri
    .createTable('open_trip_galeri', (table) => {
      table.increments('id').primary();
      // Foreign Key ke tabel open_trip
      table.integer('trip_id').unsigned().notNullable()
        .references('id').inTable('open_trip')
        .onDelete('CASCADE');
      table.string('gambar', 500).notNullable(); // URL Gambar Galeri
    })

    // 4. TABEL ANAK: open_trip_booking
    .createTable('open_trip_booking', (table) => {
      table.increments('id').primary();
      // Foreign Key ke tabel open_trip
      table.integer('trip_id').unsigned().notNullable()
        .references('id').inTable('open_trip')
        .onDelete('CASCADE');
      table.string('nama_lengkap', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('nomor_whatsapp', 20).notNullable();
      table.integer('jumlah_peserta').notNullable();
      table.integer('total_bayar').notNullable();
          table.enum('status', [
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    ]);
      table.timestamp('tanggal_booking').defaultTo(knex.fn.now()); // Otomatis terisi waktu saat ini
    })

    // 5. TABEL USER : Login dan Register
    .createTable('users', (table) => {
        table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('phone', 20).notNullable();
      table.string('password', 255).notNullable();
      table.text('avatar').nullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
    
   // Booking User
    .createTable('booking_users',(table)=>{
  table.increments('id').primary();
  table.integer('booking_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('open_trip_booking')
    .onDelete('CASCADE');
  table.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE');
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // Proses menghapus tabel harus dibalik (hapus tabel anak dulu, baru tabel utama)
  // agar tidak melanggar aturan Foreign Key Constraint
  exports.down = function(knex) {
  return knex.schema

    // tabel relasi many-to-many
    .dropTableIfExists('booking_users')

    // tabel booking
    .dropTableIfExists('open_trip_booking')

    // tabel anak open_trip
    .dropTableIfExists('open_trip_galeri')

    .dropTableIfExists('open_trip_fasilitas')

    // tabel utama
    .dropTableIfExists('open_trip')

    // tabel user
    .dropTableIfExists('users');
  }
};