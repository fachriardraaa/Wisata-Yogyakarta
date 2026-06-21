import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// IMPORT DATA DARI SERVICE
import { dataOpenTrip } from '../../services/data/OpenTrip';
import { previewWisata, previewBudaya } from '../../services/data/landingData';

// IMPORT GAMBAR BACKGROUND HERO
import bgHome from '../../assets/images/assetsbg-home-jogja.png';

// IMPORT FILE CSS 
import '../../style/home-style/home.css'; 

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Home() {
  // 1. STATE UNTUK API
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. DATA MANIPULASI BIAR NYAMBUNG SAMA TEMA
  const judulLokal = [
    "Pesona Candi Prambanan di Pagi Hari", 
    "Berburu Gudeg Legendaris Wijilan", 
    "Sunset Menawan di Pantai Parangtritis", 
    "Menjelajahi Lorong Waktu di Keraton", 
    "Gemarlap Malam di Jalan Malioboro",
    "Misteri dan Keindahan Gunung Merapi",
    "Sejuknya Hutan Pinus Mangunan",
    "Eksotisnya Gua Jomblang Gunungkidul",
    "Belanja Batik Murah di Beringharjo",
    "Kisah Cinta di Alun-Alun Kidul"
  ];

  // 3. FETCH API & MANIPULASI DATA
  useEffect(() => {
    window.scrollTo(0, 0); // Pastikan scroll di atas
    
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const rawData = res.data.slice(0, 10); // Ambil 10 data
        
        // Sulap data bahasa Latin jadi bahasa Indonesia
        const modifiedData = rawData.map((item, index) => ({
            id: item.id,
            title: judulLokal[index],
            body: `Artikel liputan terbaru mengenai keindahan ${judulLokal[index]}. Temukan pengalaman tak terlupakan dan tips wisata terbaik hanya di Hiling Semata.`
        }));

        setApiData(modifiedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data API:", err);
        setLoading(false);
      });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const previewTrip = dataOpenTrip.slice(0, 2);

  return (
    <div className="bg-[#fcfaf7]">
      
      {/* ================= HERO SECTION ================= */}
      <div
        className="min-h-screen bg-cover bg-center bg-fixed flex items-center relative"
        style={{ backgroundImage: `url(${bgHome})` }}
      >
        <div className="bg-gray-900/60 absolute inset-0 z-0" />
        
        <div className="relative z-10 text-white text-center w-full px-6 flex flex-col items-center mt-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">Rasakan Jiwa</h1>
          <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 mb-6 drop-shadow-2xl">
            Budaya Asli
          </h2>
          <p className="text-xl md:text-2xl mt-4 text-gray-200 mb-10 font-light max-w-2xl leading-relaxed">
            Yogyakarta menunggumu dengan sejuta cerita, keindahan alam, dan pesona budaya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('section-wisata')} className="btn-hero-primary">
              Eksplorasi Sekarang
            </button>
            <button onClick={() => scrollToSection('section-trip')} className="btn-hero-secondary">
              Lihat Open Trip
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        
        {/* ================= SECTION WISATA ================= */}
        <motion.section 
          id="section-wisata" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h3 className="text-5xl font-bold text-gray-900 serif">Wisata <span className="text-[#c9a452]">Populer</span></h3>
              <p className="text-gray-600 mt-2">Jelajahi destinasi paling diminati di Yogyakarta.</p>
            </div>
            <Link to="/wisata" className="mt-6 md:mt-0 px-8 py-3 bg-[#1a1207] text-white font-bold rounded-lg hover:bg-[#2d1f0a] transition-all shadow-md">
              Lihat Semua Wisata →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewWisata.map((item, index) => (
              <div key={index} className="group relative rounded-[2rem] overflow-hidden shadow-lg h-[22rem] cursor-pointer">
                <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/90 via-[#1a1207]/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end h-full">
                  <span className="text-[#c9a452] text-xs font-bold uppercase tracking-widest mb-2 drop-shadow-md">📍 {item.lokasi}</span>
                  <h4 className="text-3xl font-bold text-white mb-6 serif drop-shadow-lg">{item.judul}</h4>
                  <Link to={`/wisata/${item.id}`} className="inline-block w-full border border-[#c9a452] text-[#c9a452] backdrop-blur-sm text-center py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c9a452] hover:text-[#1a1207] transition-all duration-300 shadow-[0_0_15px_rgba(201,164,82,0.2)]">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================= SECTION BUDAYA ================= */}
        <motion.section 
          id="section-budaya" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h3 className="text-5xl font-bold text-gray-900 serif">Warisan & <span className="text-[#c9a452]">Identitas</span></h3>
            </div>
            <Link to="/budaya" className="px-8 py-3 bg-[#b8963e] text-white font-bold rounded-lg hover:bg-[#d4a843] transition-all">
              Lihat Semua Budaya
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {previewBudaya.map((item, index) => (
              <div key={index} className="card-warisan-home group">
                <div className="h-64 overflow-hidden relative rounded-t-2xl">
                   <img src={item.img} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-[#2d1f0a]/80 text-[#c9a452] px-4 py-1 text-[10px] tracking-widest uppercase rounded-sm">
                      Warisan Budaya
                   </div>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3 serif">{item.judul}</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[40px]">{item.desc}</p>
                  <Link to={`/budaya/${item.id}`} className="text-[#b8963e] font-bold text-xs uppercase tracking-widest hover:underline">
                    Pelajari Sejarah →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================= SECTION OPEN TRIP ================= */}
        <motion.section 
          id="section-trip" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h3 className="text-5xl font-bold text-gray-900 serif">Open Trip <span className="text-[#c9a452]">Eksklusif</span></h3>
              <p className="text-gray-600 mt-2">Agendakan petualangan kelompok terbaikmu tanpa repot bersama kami.</p>
            </div>
            <Link to="/trip" className="mt-6 md:mt-0 px-8 py-3 bg-[#c9a452] text-[#1a1207] font-bold rounded-lg hover:bg-[#b8963e] transition-all shadow-md text-sm tracking-wide">
              Jelajahi Semua Trip →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previewTrip.map((item) => (
              <div key={item.id} className="group relative rounded-[2rem] overflow-hidden bg-white border border-gray-200/80 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(201,164,82,0.12)] hover:border-[#c9a452]">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden relative">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 text-[9px] tracking-widest uppercase font-bold rounded-full shadow-md">
                      🔥 HOT DEALS
                    </div>
                  </div>
                  <div className="sm:w-1/2 p-6 md:p-8 flex flex-col justify-between text-left bg-gradient-to-br from-white to-[#fcfaf7]">
                    <div>
                      <span className="text-[10px] font-bold text-[#c9a452] uppercase tracking-[0.2em] mb-1 block">📍 {item.lokasi}</span>
                      <h4 className="text-xl md:text-2xl font-bold mb-3 serif text-gray-900 line-clamp-2 leading-snug">{item.nama}</h4>
                      <div className="text-gray-500 text-xs flex items-center gap-3 mb-4 font-medium">
                        <span>🕒 {item.durasi}</span><span className="text-gray-300">|</span><span>👥 Group Tour</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                      <div>
                        <small className="text-gray-400 text-[10px] uppercase tracking-widest block mb-0.5">Mulai dari</small>
                        <div className="text-xl md:text-2xl font-bold text-[#1a1207] serif">Rp {item.harga.toLocaleString('id-ID')}</div>
                      </div>
                      <Link to={`/trip/${item.id}`} className="w-full bg-[#1a1207] text-white text-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#c9a452] hover:text-[#1a1207] transition-all duration-300 shadow-sm">
                        Ikut Trip →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================= SECTION ARTIKEL (API) ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col mb-8 border-b border-gray-200 pb-4">
            <h3 className="text-4xl font-bold text-gray-900 serif">Kabar <span className="text-[#c9a452]">Pariwisata</span></h3>
            <p className="text-gray-600 mt-2 text-sm">Informasi terkini seputar destinasi di Yogyakarta.</p>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-32">
                 <p className="text-[#c9a452] font-bold animate-pulse">Memuat data dari server...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {apiData.map((post) => (
                <div key={post.id} className="bg-white p-5 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a452] transition-all group">
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#c9a452] transition-colors">{post.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </motion.section>

      </div>
    </div>
  );
}

export default Home;