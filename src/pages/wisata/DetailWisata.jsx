// ============================================================
// TEMPLATE HALAMAN - Ganti isi sesuai halaman masing-masing
// ============================================================

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// =========================================================================
// DATA MASTER
// =========================================================================
const koleksiWisata = {
  "W01": {
    nama: "Candi Prambanan",
    lokasi: "Sleman, DI Yogyakarta",
    kategori: "Sejarah & Budaya",
    jamOperasional: "06:00 - 17:00",
    gambar: "https://www.worldhistory.org/img/r/p/1500x1500/9249.jpg.webp?v=1755704431",
    deskripsi: "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 pada masa Kerajaan Mataram Kuno. Candi ini didedikasikan untuk Trimurti Hindu, yaitu Dewa Brahma, Wisnu, dan Siwa, dengan Candi Siwa sebagai bangunan utama tertinggi. Prambanan terkenal karena arsitekturnya yang megah, relief kisah Ramayana, serta nilai sejarah dan budayanya yang tinggi. Karena keindahannya, Candi Prambanan ditetapkan sebagai Situs Warisan Dunia UNESCO dan menjadi salah satu destinasi wisata budaya paling populer di Indonesia.",
    opsiTiket: [
      { id: "p1", nama: "Tiket Masuk Weekday Dewasa", harga: 50000 },
      { id: "p2", nama: "Tiket Masuk Weekday Anak", harga: 25000 },
      { id: "p3", nama: "Tiket Masuk Weekend/Libur Dewasa", harga: 65000 },
      { id: "p4", nama: "Tiket Masuk Weekend/Libur Anak", harga: 35000 },
      { id: "p5", nama: "Pertunjukan Ramayana Ballet Reguler", harga: 165000 },
    ],
    fasilitasAktivitas: [
      { nama: "Tiket Masuk Pelajar", harga: "Rp 25.000 – Rp 35.000" },
      { nama: "Sewa Sepeda Keliling", harga: "Rp 15.000 – Rp 30.000" },
      { nama: "Pemandu Wisata Lokal", harga: "Rp 75.000 – Rp 150.000" },
      { nama: "Ramayana Ballet Spesial", harga: "Rp 385.000 – Rp 440.000" },
      { nama: "Ramayana Ballet VIP", harga: "Rp 495.000 – Rp 550.000" },
      { nama: "Parkir Mobil Khusus", harga: "Rp 10.000" },
    ]
  },
  "W02": {
    nama: "Pantai Parangtritis",
    lokasi: "Bantul, DI Yogyakarta",
    kategori: "Wisata Alam",
    jamOperasional: "24 Jam",
    gambar: "https://assets.telkomsel.com/public/2024-11/Pantai-Parangtritis-Surga-Tersembunyi-di-Yogyakarta.png",
    deskripsi: "Pantai Parangtritis adalah salah satu pantai terkenal di Yogyakarta yang berada di pesisir selatan Kabupaten Bantul. Pantai ini terkenal dengan pasir hitam, ombak besar Samudra Hindia, serta pemandangan sunset yang indah. Selain menjadi tempat wisata favorit, Parangtritis juga memiliki nilai budaya dan legenda yang erat kaitannya dengan kisah Nyi Roro Kidul. Wisatawan biasanya datang untuk menikmati suasana pantai, naik ATV, berkuda, atau menikmati kuliner di sekitar pantai.",
    opsiTiket: [
      { id: "pt1", nama: "Tiket Masuk Pantai (Min)", harga: 10000 },
      { id: "pt2", nama: "Tiket Masuk Pantai (Max)", harga: 15000 },
      { id: "pt3", nama: "Kolam Renang Air Tawar", harga: 10000 },
    ],
    fasilitasAktivitas: [
      { nama: "Sewa ATV Pantai", harga: "Rp 50.000 – Rp 100.000" },
      { nama: "Naik Kuda Pantai", harga: "Rp 30.000 – Rp 50.000" },
      { nama: "Sewa Jeep Gumuk Pasir", harga: "Rp 300.000 – Rp 550.000" },
      { nama: "Sewa Tikar & Payung", harga: "Rp 25.000 / 2 jam" },
      { nama: "Bilas / Mandi Air Bersih", harga: "Rp 1.000 – Rp 5.000" },
      { nama: "Parkir Bus Pariwisata", harga: "Rp 20.000" },
    ]
  },
  "W03": {
    nama: "Keraton Yogyakarta",
    lokasi: "Pusat Kota Yogyakarta",
    kategori: "Budaya & Sejarah",
    jamOperasional: "08:00 - 14:00",
    gambar: "https://asset.kompas.com/crops/EIBd7igsHcB0GX68I6o9Y_57nOk=/0x0:1000x667/1200x800/data/photo/2022/06/28/62baefcf257f2.jpg",
    deskripsi: "Keraton Ngayogyakarta Hadiningrat adalah istana resmi Kesultanan Yogyakarta yang menjadi pusat budaya Jawa dan tempat tinggal Sultan Yogyakarta. Dibangun pada tahun 1755 oleh Sultan Hamengkubuwono I, keraton ini memiliki arsitektur khas Jawa serta menyimpan berbagai koleksi sejarah, pusaka kerajaan, dan budaya tradisional. Selain sebagai simbol kebudayaan Jawa, Keraton Yogyakarta juga menjadi destinasi wisata sejarah yang terkenal dan sering mengadakan pertunjukan seni tradisional seperti tari Jawa dan gamelan.",
    opsiTiket: [
      { id: "k1", nama: "Tiket Domestik Dewasa", harga: 15000 },
      { id: "k2", nama: "Tiket Domestik Anak", harga: 10000 },
      { id: "k3", nama: "Mancanegara Dewasa", harga: 25000 },
      { id: "k4", nama: "Mancanegara Anak", harga: 20000 },
      { id: "k5", nama: "Museum Wahanarata Dewasa", harga: 20000 },
    ],
    fasilitasAktivitas: [
      { nama: "Jasa Pemandu (Guide)", harga: "Rp 50.000 – Rp 150.000" },
      { nama: "Foto Pakaian Adat", harga: "Rp 20.000 – Rp 50.000" },
      { nama: "Sentra Souvenir", harga: "Mulai Rp 10.000" },
      { nama: "Kuliner Tradisional", harga: "Rp 5.000 – Rp 50.000" },
      { nama: "Parkir VIP", harga: "Rp 10.000" },
      { nama: "Anak 0-2 Tahun", harga: "Gratis" },
    ]
  },
  "W04": {
    nama: "Tebing Breksi",
    lokasi: "Sleman, DI Yogyakarta",
    kategori: "Alam & Spot Foto",
    jamOperasional: "06:00 - 21:00",
    gambar: "https://assets.telkomsel.com/public/2024-11/tebing-breksi.jpg",
    deskripsi: "Tebing Breksi adalah destinasi wisata alam di Yogyakarta yang terbentuk dari bekas area tambang batu breksi. Tempat ini terkenal karena tebing batu besar yang dipahat menjadi karya seni, pemandangan alam yang indah, serta spot sunset yang menarik. Selain menikmati panorama dari atas bukit, pengunjung juga dapat berfoto, naik jeep wisata, dan menikmati suasana amphitheater alami yang sering digunakan untuk pertunjukan dan acara budaya.",
    opsiTiket: [
      { id: "b1", nama: "Tiket Weekday Domestik", harga: 10000 },
      { id: "b2", nama: "Tiket Weekend Domestik", harga: 15000 },
      { id: "b3", nama: "Tiket Mancanegara", harga: 30000 },
    ],
    fasilitasAktivitas: [
      { nama: "Sewa Jeep Jelajah", harga: "Rp 300.000 – Rp 600.000" },
      { nama: "Akses Camping Area", harga: "Rp 15.000 – Rp 50.000" },
      { nama: "Sewa Amphitheater", harga: "Mulai Rp 500.000+" },
      { nama: "Spot Foto Prewedding", harga: "Rp 100.000 – Rp 500.000" },
      { nama: "Parkir Bus Malam", harga: "Rp 25.000" },
      { nama: "Jasa Fotografer", harga: "Rp 50.000" },
    ]
  }
};

function DetailWisata() {
  const { id } = useParams();

  const [selectedTiketId, setSelectedTiketId] = useState("");
  const [jumlahTiket, setJumlahTiket] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const wisata = koleksiWisata[id] || koleksiWisata["W01"];

  useEffect(() => {
    if (wisata.opsiTiket && wisata.opsiTiket.length > 0) {
      setSelectedTiketId(wisata.opsiTiket[0].id);
    }
    setJumlahTiket(1);
  }, [id, wisata]);

  const handleKurang = () => setJumlahTiket((prev) => (prev > 1 ? prev - 1 : 1));
  const handleTambah = () => setJumlahTiket((prev) => prev + 1);
  const handleTiketChange = (e) => setSelectedTiketId(e.target.value);

  const tiketPilihanInfo = wisata.opsiTiket.find(t => t.id === selectedTiketId) || wisata.opsiTiket[0];
  const totalHarga = (tiketPilihanInfo?.harga || 0) * jumlahTiket;

  return (
    <div className="bg-[#fcfaf7] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] min-h-screen pt-24 pb-24 selection:bg-[#c9a452] selection:text-white relative">
      
      {/* ─── FLOATING BACK BUTTON ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-8 relative z-50">
        <Link
          to="/wisata"
          className="inline-flex items-center gap-3 text-[#2d1f0a] hover:text-[#c9a452] transition-all duration-300 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-white/80"
        >
          <span className="text-lg">←</span>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Kembali ke Koleksi</span>
        </Link>
      </div>

      {/* ─── IMMERSIVE HERO IMAGE ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="relative h-[55vh] md:h-[65vh] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(45,31,10,0.15)] ring-1 ring-[#c9a452]/20">
          <img src={wisata.gambar} className="w-full h-full object-cover" alt={wisata.nama} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207] via-[#1a1207]/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#c9a452] text-[#1a1207] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(201,164,82,0.4)]">
                {wisata.kategori}
              </span>
              <span className="text-white/90 text-sm flex items-center gap-2 font-light backdrop-blur-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                🕒 {wisata.jamOperasional}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-xl leading-tight">
              {wisata.nama}
            </h1>
            <p className="text-[#e8dcc4] text-sm md:text-base flex items-center gap-2 drop-shadow-md">
              <span className="text-[#c9a452]">📍</span> {wisata.lokasi}
            </p>
          </div>
        </div>
      </div>

      {/* ─── CONTENT GRID ─── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* KOLOM KIRI (Deskripsi & Fasilitas) - 7 Kolom */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Deskripsi */}
          <section className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-[#2d1f0a] mb-6 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#c9a452] inline-block"></span>
              Kisah & Keindahan
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify font-light text-lg">
              <span className="float-left text-6xl font-serif text-[#c9a452] leading-none pr-3 pt-2">
                {wisata.deskripsi.charAt(0)}
              </span>
              {wisata.deskripsi.slice(1)}
            </p>
          </section>

          {/* Fasilitas Premium Layout */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#c9a452] inline-block"></span>
              <h2 className="text-3xl font-serif font-bold text-[#2d1f0a]">Layanan & Aktivitas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wisata.fasilitasAktivitas.map((item, index) => (
                <div key={index} className="flex flex-col justify-center p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#c9a452]/20 hover:border-[#c9a452] transition-colors duration-300 group shadow-sm">
                  <span className="text-sm font-medium text-gray-700 mb-2">{item.nama}</span>
                  <span className="text-lg font-serif font-bold text-[#2d1f0a]">{item.harga}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* KOLOM KANAN (Booking Panel) - 5 Kolom */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32">
          {/* Desain Kartu Tiket Mewah */}
          <div className="bg-[#2d1f0a] rounded-[2rem] shadow-[0_30px_60px_rgba(45,31,10,0.2)] p-8 md:p-10 relative overflow-hidden border border-[#c9a452]/20">
            {/* Ornamen Batik Latar */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/batik-subtle.png')] opacity-10 mix-blend-overlay"></div>
            
            <h3 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3 relative z-10">
              Reservasi Tiket
              <span className="w-full h-[1px] bg-gradient-to-r from-[#c9a452]/50 to-transparent flex-grow"></span>
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-6">
                
                {/* Dropdown */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#c9a452] block mb-3 tracking-widest">
                    Pilih Kategori
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full bg-[#fcfaf7] border-0 p-4 rounded-xl text-sm text-[#2d1f0a] focus:ring-2 focus:ring-[#c9a452] outline-none transition-all cursor-pointer shadow-inner appearance-none font-medium"
                      value={selectedTiketId}
                      onChange={handleTiketChange}
                    >
                      {wisata.opsiTiket.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nama} — Rp {t.harga.toLocaleString("id-ID")}
                        </option>
                      ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c9a452] font-bold">▼</div>
                  </div>
                </div>

                {/* Counter */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#c9a452] block mb-3 tracking-widest">
                    Kuantitas Tiket
                  </label>
                  <div className="flex items-center justify-between bg-[#fcfaf7] rounded-xl p-2 shadow-inner">
                    <button 
                      onClick={handleKurang} 
                      className="w-12 h-12 flex items-center justify-center font-bold text-xl rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-[#2d1f0a]"
                    >−</button>
                    <span className="font-bold text-[#2d1f0a] text-xl w-12 text-center">{jumlahTiket}</span>
                    <button 
                      onClick={handleTambah} 
                      className="w-12 h-12 flex items-center justify-center font-bold text-xl rounded-lg hover:bg-[#c9a452]/20 hover:text-[#a67c00] transition-colors cursor-pointer text-[#2d1f0a]"
                    >+</button>
                  </div>
                </div>

                {/* Dashed Line separator like a physical ticket */}
                <div className="relative border-t-2 border-dashed border-white/20 my-6">
                  {/* Half circles on the edges */}
                  <div className="absolute -left-9 -top-3 w-6 h-6 bg-[#2d1f0a] rounded-full border-r border-white/10"></div>
                  <div className="absolute -right-9 -top-3 w-6 h-6 bg-[#2d1f0a] rounded-full border-l border-white/10"></div>
                </div>

                {/* Total */}
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Estimasi Total</span>
                  <span className="text-4xl font-serif font-bold text-[#c9a452]">
                    IDR {totalHarga.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert(`RESERVASI BERHASIL\\n\\nDestinasi: ${wisata.nama}\\nTiket: ${tiketPilihanInfo?.nama}\\nJumlah: ${jumlahTiket} Orang\\nTotal Bayar: Rp ${totalHarga.toLocaleString("id-ID")}`)}
                className="w-full bg-gradient-to-r from-[#c9a452] to-[#a67c00] text-[#1a1207] py-5 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(201,164,82,0.4)] transition-all duration-300 cursor-pointer text-xs tracking-widest uppercase hover:scale-[1.02]"
              >
                Konfirmasi Reservasi
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default DetailWisata;