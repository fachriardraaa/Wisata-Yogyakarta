import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// IMPORT DATA DARI SERVICE (Tetap ada sebagai cadangan/layout)
import { dataOpenTrip } from '../../services/data/OpenTrip';
import { previewBudaya } from '../../services/data/landingData';

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
  const [wisataDb, setWisataDb] = useState([]); // Data dari database temanmu
  const [tripDb, setTripDb] = useState([]);     // Data dari database temanmu
  const [loading, setLoading] = useState(true);

  // 2. FETCH DATA DARI DATABASE & API
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        // Ambil Data DB (Port 3001)
        const [resW, resT] = await Promise.all([
          axios.get('http://localhost:3001/wisata'),
          axios.get('http://localhost:3001/trips')
        ]);
        
        setWisataDb(resW.data.wisata || []);
        setTripDb(resT.data || []);

        // Ambil Data Artikel (JSONPlaceholder - Tetap ada)
        const resA = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const rawData = resA.data.slice(0, 10);
        
        const judulLokal = [
            "Pesona Candi Prambanan di Pagi Hari", "Berburu Gudeg Legendaris Wijilan", 
            "Sunset Menawan di Pantai Parangtritis", "Menjelajahi Lorong Waktu di Keraton", 
            "Gemarlap Malam di Jalan Malioboro", "Misteri dan Keindahan Gunung Merapi",
            "Sejuknya Hutan Pinus Mangunan", "Eksotisnya Gua Jomblang Gunungkidul",
            "Belanja Batik Murah di Beringharjo", "Kisah Cinta di Alun-Alun Kidul"
        ];

        const modifiedData = rawData.map((item, index) => ({
            id: item.id,
            title: judulLokal[index],
            body: `Artikel liputan terbaru mengenai keindahan ${judulLokal[index]}. Temukan pengalaman tak terlupakan.`
        }));

        setApiData(modifiedData);
        setLoading(false);
      } catch (err) {
        console.error("Gagal ambil data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#fcfaf7]">
      
      {/* HERO SECTION */}
      <div className="min-h-screen bg-cover bg-center bg-fixed flex items-center relative" style={{ backgroundImage: `url(${bgHome})` }}>
        <div className="bg-gray-900/60 absolute inset-0 z-0" />
        <div className="relative z-10 text-white text-center w-full px-6 flex flex-col items-center mt-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">Rasakan Jiwa</h1>
          <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 mb-6 drop-shadow-2xl">Budaya Asli</h2>
          <p className="text-xl md:text-2xl mt-4 text-gray-200 mb-10 font-light max-w-2xl leading-relaxed">
            Yogyakarta menunggumu dengan sejuta cerita, keindahan alam, dan pesona budaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('section-wisata')} className="btn-hero-primary">Eksplorasi Sekarang</button>
            <button onClick={() => scrollToSection('section-trip')} className="btn-hero-secondary">Lihat Open Trip</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        
        {/* SECTION WISATA (Data dari DB) */}
        <motion.section id="section-wisata" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <div>
              <h3 className="text-5xl font-bold text-gray-900 serif">Wisata <span className="text-[#c9a452]">Populer</span></h3>
            </div>
            <Link to="/wisata" className="mt-6 md:mt-0 px-8 py-3 bg-[#1a1207] text-white font-bold rounded-lg hover:bg-[#2d1f0a] transition-all shadow-md">Lihat Semua Wisata →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wisataDb.slice(0, 3).map((item) => (
              <div key={item.id} className="group relative rounded-[2rem] overflow-hidden shadow-lg h-[22rem] cursor-pointer">
                <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/90 via-[#1a1207]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-[#c9a452] text-xs font-bold uppercase tracking-widest mb-2 block">📍 {item.lokasi}</span>
                  <h4 className="text-3xl font-bold text-white mb-6 serif">{item.nama}</h4>
                  <Link to={`/wisata/${item.id}`} className="inline-block w-full border border-[#c9a452] text-[#c9a452] text-center py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c9a452] hover:text-[#1a1207] transition-all">Lihat Detail</Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION BUDAYA (Data Lama) */}
        <motion.section id="section-budaya" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {previewBudaya.map((item, index) => (
               <div key={index} className="card-warisan-home group">
                 <div className="h-64 overflow-hidden relative rounded-t-2xl">
                    <img src={item.img} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <div className="p-6">
                   <h4 className="text-2xl font-bold text-gray-900 mb-3 serif">{item.judul}</h4>
                   <p className="text-gray-600 mb-6 text-sm">{item.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION OPEN TRIP (Data dari DB) */}
        <motion.section id="section-trip" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
            <h3 className="text-5xl font-bold text-gray-900 serif">Open Trip <span className="text-[#c9a452]">Eksklusif</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tripDb.slice(0, 2).map((item) => (
              <div key={item.id} className="group relative rounded-[2rem] overflow-hidden bg-white border border-gray-200 shadow-sm transition-all hover:-translate-y-2">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden">
                    <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                     <h4 className="text-xl font-bold mb-2">{item.nama}</h4>
                     <p className="text-xs text-gray-500 mb-4">Sisa Kuota: {item.kuotaTersisa}</p>
                     <div className="text-xl font-bold text-[#c9a452]">Rp {item.harga.toLocaleString()}</div>
                     <Link to={`/trip/${item.id}`} className="mt-4 block w-full bg-[#1a1207] text-white text-center py-2 rounded-xl text-xs font-bold uppercase">Ikut Trip</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}

export default Home;