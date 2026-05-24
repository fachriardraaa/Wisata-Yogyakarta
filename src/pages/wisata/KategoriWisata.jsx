// ============================================================
// TEMPLATE HALAMAN - Ganti isi sesuai halaman masing-masing
// ============================================================

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function KategoriWisata() {
  const { kategori } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kategori]);

  const daftarKategori = ["sejarah", "alam", "pantai", "keluarga"];
  const currentKategori = kategori ? kategori.charAt(0).toUpperCase() + kategori.slice(1) : "Semua";

  const wisataList = [
    { id: "W01", nama: `Eksplorasi ${currentKategori} Agung`, lokasi: "Yogyakarta", gambar: "https://images.unsplash.com/photo-1596422846543-728b49ce5f99?q=80&w=800", rating: "4.9", price: "50.000" },
    { id: "W02", nama: `Pesona ${currentKategori} Hidden Gem`, lokasi: "Gunungkidul", gambar: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800", rating: "4.8", price: "25.000" },
    { id: "W03", nama: `Warisan ${currentKategori} Mataram`, lokasi: "Sleman", gambar: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800", rating: "4.9", price: "40.000" },
    { id: "W04", nama: `Jejak ${currentKategori} Nusantara`, lokasi: "Bantul", gambar: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800", rating: "4.7", price: "30.000" },
    { id: "W05", nama: `Harmoni ${currentKategori} Alam`, lokasi: "Kulon Progo", gambar: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800", rating: "4.8", price: "20.000" },
    { id: "W06", nama: `Suaka ${currentKategori} Tersembunyi`, lokasi: "Yogyakarta", gambar: "https://images.unsplash.com/photo-1519923041107-e4dc8d919354?q=80&w=800", rating: "4.6", price: "Free" },
  ];

  return (
    <div className="bg-[#fcfaf7] bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] min-h-screen font-sans selection:bg-[#c9a452] selection:text-white">
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden border-b-[12px] border-[#2d1f0a]">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1600" className="w-full h-full object-cover" alt="Budaya Nusantara Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1207]/90 via-[#2d1f0a]/70 to-[#fcfaf7]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-16 h-[1px] bg-[#c9a452]"></span>
              <span className="text-[#c9a452] text-xl">❖</span>
              <span className="w-16 h-[1px] bg-[#c9a452]"></span>
            </div>
            <span className="text-[#e8dcc4] font-bold tracking-[0.4em] uppercase text-xs mb-4 block drop-shadow-md">Koleksi Penjelajahan</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              {currentKategori}<span className="text-[#c9a452]">.</span>
            </h1>
            <p className="text-[#dcd1b8] text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Merangkai cerita dan kenangan di sudut-sudut paling bermakna dari pesona budaya dan alam Yogyakarta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FLOATING NAV (Tekstur Kayu/Batik) ─── */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-[#2d1f0a]/95 backdrop-blur-xl p-2.5 rounded-[2rem] shadow-[0_20px_50px_rgba(45,31,10,0.2)] border border-[#c9a452]/40 flex flex-wrap justify-center items-center gap-2">
          <Link 
            to="/wisata"
            className="px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 text-[#dcd1b8] hover:text-[#c9a452] hover:bg-white/5"
          >
            Semua Destinasi
          </Link>
          {daftarKategori.map((kat) => (
            <Link 
              key={kat}
              to={`/wisata/kategori/${kat}`}
              className={`px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                kategori === kat 
                  ? "bg-gradient-to-r from-[#c9a452] to-[#a67c00] text-[#1a1207] shadow-[0_0_20px_rgba(201,164,82,0.3)] transform scale-105" 
                  : "bg-transparent text-[#dcd1b8] hover:bg-white/5 hover:text-[#c9a452]"
              }`}
            >
              {kat}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── GRID KONTEN BENTUK GUNUNGAN ─── */}
      <main className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#2d1f0a] font-bold tracking-tight">Katalog Pilihan</h2>
          <div className="w-16 h-1 bg-[#c9a452] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <AnimatePresence mode="wait">
            {wisataList.map((item, index) => (
              <motion.div 
                key={item.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Bentuk Gunungan (Atas Melengkung Penuh) */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-2xl mb-6 shadow-xl border-[6px] border-white group-hover:shadow-[0_20px_40px_rgba(45,31,10,0.15)] transition-all duration-500">
                  <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/95 via-[#2d1f0a]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#2d1f0a]/80 backdrop-blur-md border border-[#c9a452]/50 text-[#c9a452] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span className="text-sm">★</span> {item.rating}
                  </div>

                  <div className="absolute bottom-10 left-0 w-full text-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[#c9a452] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Estimasi Harga</p>
                    <p className="text-white text-3xl font-serif">Rp {item.price}</p>
                  </div>
                </div>

                <div className="text-center px-4">
                  <p className="text-[#c9a452] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">❖ {item.lokasi}</p>
                  <h3 className="text-2xl font-serif font-bold text-[#2d1f0a] leading-tight group-hover:text-[#c9a452] transition-colors duration-300 mb-5">
                    {item.nama}
                  </h3>
                  <Link 
                    to={`/wisata/${item.id}`} 
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d1f0a] border-b-2 border-[#c9a452]/30 group-hover:border-[#c9a452] pb-1.5 transition-all duration-300"
                  >
                    Selami Kisahnya
                    <span className="text-[#c9a452] transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ─── CTA FOOTER ─── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-32 relative overflow-hidden rounded-[2.5rem] bg-[#2d1f0a] text-center p-16 md:p-24 shadow-2xl border border-[#c9a452]/30">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/batik-subtle.png')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-[#fcfaf7] mb-6">Punya Impian Perjalanan Khusus?</h2>
            <p className="text-[#dcd1b8] mb-12 max-w-2xl mx-auto font-light text-lg">
              Setiap penjelajah memiliki kisahnya sendiri. Beritahu kami apa yang Anda cari, dan biarkan kami merangkai rute sempurna untuk Anda.
            </p>
            <Link to="/contact" className="inline-block bg-[#c9a452] text-[#1a1207] px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(201,164,82,0.3)]">
              Hubungi Travel Konsultan
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default KategoriWisata;