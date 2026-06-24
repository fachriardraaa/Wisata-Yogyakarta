import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function ListWisata() {
  const [wisataList, setWisataList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/wisata")
      .then((response) => {
        setWisataList(response.data.wisata);
      })
      .catch((error) => {
        console.error("Error fetching wisata data:", error);
      });
    window.scrollTo(0, 0);
  }, []);


  const wisataData = [
    { id: "W01", nama: "Candi Prambanan", lokasi: "Sleman, DIY", kategori: "Sejarah", harga: 50000, gambar: "https://www.worldhistory.org/img/r/p/1500x1500/9249.jpg.webp?v=1755704431" },
    { id: "W02", nama: "Pantai Parangtritis", lokasi: "Bantul, DIY", kategori: "Alam", harga: 15000, gambar: "https://assets.telkomsel.com/public/2024-11/Pantai-Parangtritis-Surga-Tersembunyi-di-Yogyakarta.png" },
    { id: "W03", nama: "Keraton Yogyakarta", lokasi: "Kota Yogyakarta", kategori: "Budaya", harga: 20000, gambar: "https://asset.kompas.com/crops/EIBd7igsHcB0GX68I6o9Y_57nOk=/0x0:1000x667/1200x800/data/photo/2022/06/28/62baefcf257f2.jpg" },
    { id: "W04", nama: "Tebing Breksi", lokasi: "Sleman, DIY", kategori: "Alam", harga: 25000, gambar: "https://assets.telkomsel.com/public/2024-11/tebing-breksi.jpg" },
  ];

  return (
    <div className="bg-[#fcfaf7] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] min-h-screen font-sans selection:bg-[#c9a452] selection:text-white">
      
      {/* ─── LUXURY HERO SECTION ─── */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1600" className="w-full h-full object-cover scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1207]/90 via-[#2d1f0a]/60 to-[#fcfaf7]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#c9a452]"></span>
            <span className="text-[#c9a452] text-xs font-bold tracking-[0.3em] uppercase drop-shadow-md">Eksplorasi Mahakarya</span>
            <span className="w-12 h-[1px] bg-[#c9a452]"></span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl tracking-tight">Destinasi <span className="italic font-light text-[#c9a452]">Pilihan</span></h1>
          <p className="text-[#e8dcc4] text-lg font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Rangkaian perjalanan eksklusif menyusuri keindahan alam, sejarah, dan tradisi Nusantara.
          </p>
        </motion.div>
      </div>

      {/* ─── EDITORIAL GRID SECTION ─── */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {wisataList.map((item, index) => (
            <motion.div 
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 }}
              variants={fadeInUp}
              className="group relative"
            >
              {/* Gambar Besar dengan Proporsi Elegan */}
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative shadow-[0_15px_40px_rgba(45,31,10,0.1)]">
                <img 
                  src={item.gambar} 
                  alt={item.nama} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/80 via-[#2d1f0a]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Kategori Badge Float */}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                  {item.kategori}
                </div>
              </div>
              
              {/* Info Box Overlapping */}
              <div className="relative -mt-20 mx-6 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/50 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[#c9a452] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-[#c9a452]"></span> {item.lokasi}
                    </p>
                    <h3 className="font-serif font-bold text-3xl text-[#2d1f0a] leading-tight group-hover:text-[#c9a452] transition-colors">{item.nama}</h3>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-gray-100 pt-5 mt-4">
                  <div>
                    <small className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Mulai Dari</small>
                    <span className="font-serif font-bold text-[#2d1f0a] text-xl">IDR {(item.harga_mulai || 0).toLocaleString("id-ID")}</span>
                  </div>
                  <Link 
                    to={`/wisata/${item.id}`} 
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-[#fcfaf7] group-hover:bg-[#2d1f0a] group-hover:border-[#2d1f0a] transition-all duration-300 shadow-sm"
                  >
                    <span className="text-[#2d1f0a] group-hover:text-[#c9a452] transform group-hover:-rotate-45 transition-transform duration-300 text-xl">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListWisata;