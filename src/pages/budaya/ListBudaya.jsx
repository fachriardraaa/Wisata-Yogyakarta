import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  budayaHeroData,
  budayaCategories,
  budayaRegions,
  initialBudayaItems,
  extendedBudayaItems,
} from "../../services/data/budayaData";
import "../../style/budaya-style/ListBudaya.css";

// Import aset gambar lokal
import heroBg from "../../assets/images/heroSection-budaya.png";
import seniImg from "../../assets/images/seniPertunjukan-budaya.png";
import keratonImg from "../../assets/images/keratonSejarah-budaya.png";
import kearifanImg from "../../assets/images/kearifanLokal-budaya.png";

const ListBudaya = () => {
  const navigate = useNavigate();

  // State Management
  const [activeFilter, setActiveFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCardClick = (id) => {
    navigate(`/budaya/${id}`);
  };

  // =========================================================================
  // DATA STRUKTUR UNTUK EPIC GAMES AUTOMATIC SLIDER (PAS 5 ITEM CARD KECIL)
  // =========================================================================
  const sliderData = [
    {
      id: 0,
      title: "Sendratari Ramayana",
      subtitle: "PAGELARAN MAESTRO MATARAM",
      desc: "Saksikan kemegahan kisah cinta epik beralaskan sorotan lampu malam Candi Prambanan yang magis.",
      tag: "Seni Tari",
      image: seniImg,
    },
    {
      id: 1,
      title: "Kraton Ngayogyakarta",
      subtitle: "JELAJAHI SEJARAH HIDUP",
      desc: "Telusuri silsilah, arsitektur, dan adat keraton yang masih terjaga kokoh di pusat Kota Yogyakarta.",
      tag: "Keraton & Sejarah",
      image: keratonImg,
    },
    {
      id: 2,
      title: "Kearifan Lokal Tradisional",
      subtitle: "FILOSOFI HIDUP MASYARAKAT",
      desc: "Menyelami tradisi turun-temurun, batik legendaris, hingga upacara adat rukun warga tanah Mataram.",
      tag: "Kearifan Lokal",
      image: kearifanImg,
    },
    {
      id: 3,
      title: "Harmoni Gamelan Jawa",
      subtitle: "ALUNAN SPIRITUAL KLASIK",
      desc: "Mendengarkan keselarasan nada slendro dan pelog yang menghadirkan ketenteraman jiwa khas jogja.",
      tag: "Musik Tradisional",
      image: seniImg,
    },
    {
      id: 4,
      title: "Adiluhung Batik Tulis",
      subtitle: "GORESAN MALAM PENUH MAKNA",
      desc: "Menghayati goresan canting para maestro motif parang dan kawung yang sarat akan filosofi doa leluhur.",
      tag: "Kriya & Seni Rupa",
      image: kearifanImg,
    },
  ];

  // Efek interval rotator otomatis 10 detik Epic Games System
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderData.length - 1 ? 0 : prev + 1,
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  // Logika Penyaringan Data Berdasarkan Filter Kabupaten/Kota
  const filteredInitial =
    activeFilter === "all"
      ? initialBudayaItems
      : initialBudayaItems.filter((item) => item.region === activeFilter);

  const filteredExtended =
    activeFilter === "all"
      ? extendedBudayaItems
      : extendedBudayaItems.filter((item) => item.region === activeFilter);

  return (
    <div className="budaya-container bg-[#fcf8f3] text-[#2c2115] min-h-screen font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-between pt-24 px-8 md:px-16 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${budayaHeroData.bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-0"></div>

        <div className="max-w-2xl my-auto z-10 py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[#dca842]"></span>
            <p className="text-[#dca842] tracking-widest text-xs uppercase font-semibold">
              {budayaHeroData.subtitle}
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight font-light mb-4">
            {budayaHeroData.titleMain} <br />
            <span className="text-[#e2b254] font-serif italic font-normal">
              {budayaHeroData.titleSub}
            </span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-lg font-light">
            {budayaHeroData.description}
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-[#e2b254] hover:bg-[#cb9a3c] text-[#2c2115] font-medium px-6 py-3 rounded-full flex items-center gap-2 transition duration-300 shadow-md text-xs uppercase tracking-wider">
              Jelajahi Budaya DIY <span>→</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end pb-20 z-10 text-xs text-gray-300">
          <div className="flex items-center gap-2 animate-bounce">
            🐭{" "}
            <span className="tracking-wider font-light">
              Scroll untuk menjelajahi
            </span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-white">
            📍 <span>{budayaHeroData.location}</span>
          </div>
        </div>

        {/* Wave Edge Curved Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[2px] z-20">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[50px] md:h-[80px] fill-[#fcf8f3]"
          >
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 3 KARTU UTAMA INDUK                                           */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30 -mt-12 md:-mt-16">
        {/* Kolom Kiri Keterangan Konten Tekstual */}
        <div className="lg:col-span-4 mt-4 text-clean-zone">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[#bfa37a] tracking-widest text-xs uppercase font-bold">
              Mengenal DIY
            </p>
            <span className="w-6 h-[1px] bg-[#bfa37a]"></span>
          </div>
          <h2 className="text-3xl font-serif font-light leading-tight mb-4 text-[#3a2f21]">
            Lebih dari Sekadar Tempat, <br />
            <span className="text-[#c29646] italic font-normal">
              Ini Warisan dan Identitas
            </span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light mb-6">
            Daerah Istimewa Yogyakarta bukan hanya sekadar destinasi geografi,
            melainkan entitas budaya hidup yang terus bernapas melalui tatanan
            adat, seni, serta filosofi masyarakatnya.
          </p>
        </div>

        {/* Kolom Kanan: Tiga Kartu Vertikal Panjang Beranimasi Ring Emas */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {budayaCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="premium-budaya-card bg-white rounded-[2rem] overflow-hidden border border-[#f1e7da] cursor-pointer transition-all duration-500 flex flex-col min-h-[420px] md:min-h-[460px]"
            >
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-center flex-grow flex flex-col justify-start items-center">
                <h3 className="font-serif text-base font-bold text-[#3a2f21] mb-3 mt-2 tracking-wide header-title">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[12px] leading-relaxed font-light px-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MENU BUTTON FILTER DAERAH                                             */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 pt-12 pb-4 max-w-5xl mx-auto relative z-30">
        <div className="bg-white rounded-2xl p-2.5 border border-[#eedfc9] shadow-sm flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {budayaRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => {
                setActiveFilter(region.id);
                setIsOpen(false);
              }}
              className={`px-6 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 border ${
                activeFilter === region.id
                  ? "bg-[#fcf8f2] border-[#c29646] text-[#c29646] font-semibold shadow-inner"
                  : "border-transparent text-[#534637] hover:bg-[#faf5ee]"
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LISTING WARISAN BUDAYA (GRID UTAMA DAN ELEMEN TIRAI DROPDOWN)         */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 pb-4 max-w-6xl mx-auto relative z-30 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredInitial.length > 0 ? (
            filteredInitial.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#e2b254] text-[#2c2115] text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#bfa37a] block mb-1">
                      📍 Wilayah {item.region}
                    </span>
                    <h5 className="font-serif text-sm font-bold text-[#3a2f21] mb-2 line-clamp-1">
                      {item.title}
                    </h5>
                    <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#fcf8f3] mt-3 flex justify-end text-[11px] font-medium text-[#c29646]">
                    Selengkapnya →
                  </div>
                </div>
              </div>
            ))
          ) : !filteredExtended.length ? (
            <div className="col-span-full text-center py-12 text-gray-400 text-xs italic bg-white rounded-2xl border border-[#f3ece3]">
              Belum ditemukan arsip kebudayaan daerah khusus untuk wilayah ini.
            </div>
          ) : null}
        </div>

        <div
          className={`tirai-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[1500px] mt-6 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {filteredExtended.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-[#e2b254] text-[#2c2115] text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#bfa37a] block mb-1">
                    📍 Wilayah {item.region}
                  </span>
                  <h5 className="font-serif text-sm font-bold text-[#3a2f21] mb-2 line-clamp-1">
                    {item.title}
                  </h5>
                  <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#fcf8f3] mt-3 flex justify-end text-[11px] font-medium text-[#c29646]">
                  Selengkapnya →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TOMBOL TAMPILKAN LEBIH BANYAK (Persisten / Selalu Menetap)            */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-20 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center relative my-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-[#eadaaf]/60"></div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 bg-[#fcf8f3] hover:bg-[#f6efe4] text-[#534637] hover:text-[#c29646] px-6 py-2 border border-[#eedfc9] rounded-lg text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <span>
              {isOpen ? "Sembunyikan Konten" : "Tampilkan lebih banyak"}
            </span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-500 ${isOpen ? "rotate-180 text-[#c29646]" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {isOpen && filteredExtended.length === 0 && (
          <p className="text-[11px] text-gray-400 italic mt-1 animate-fade-in">
            * Seluruh arsip untuk kategori daerah ini telah ditampilkan.
          </p>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 6. SLIDER SHOWCASE OTOMATIS (EPIC GAMES SYSTEM - SEKARANG PAS 5 CARD KECIL) */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
          {/* Sisi Kiri: Main Screen Banner (Tinggi disesuaikan dengan 5 card kanan) */}
          <div className="lg:col-span-3 relative h-[480px] rounded-2xl overflow-hidden shadow-xl bg-black group">
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                {/* Konten Teks Informatif */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-xl">
                  <span className="bg-[#c29646] text-black text-[10px] font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                    {slide.tag}
                  </span>
                  <p className="text-[#eadaaf] text-xs font-semibold tracking-widest mt-4 mb-2 uppercase">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 font-serif">
                    {slide.title}
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 font-light">
                    {slide.desc}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="bg-white hover:bg-[#eadaaf] text-black text-xs font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                      Eksplorasi Sekarang
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-3 rounded-xl backdrop-blur-sm transition-all duration-300">
                      + Simpan Arsip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sisi Kanan: Menu Navigasi Kontrol Progres Bar Linier (PAS 5 ITEM CARD) */}
          <div className="flex flex-col justify-between gap-2 h-[480px]">
            {sliderData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentSlide(index)}
                className={`w-full text-left p-2.5 md:p-3 rounded-xl transition-all duration-300 relative overflow-hidden flex items-center gap-3 border flex-1 ${
                  index === currentSlide
                    ? "bg-[#2d2822] text-white border-[#c29646] shadow-md"
                    : "bg-[#fdfbf7] hover:bg-[#f6efe4] text-[#534637] border-[#f0e6d8]"
                }`}
              >
                {/* Garis Loading Penunjuk Waktu 10 Detik */}
                {index === currentSlide && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-[#c29646] animate-epic-progress"></div>
                )}
                <img
                  src={item.image}
                  alt=""
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <p
                    className={`text-[8px] md:text-[9px] uppercase tracking-wider font-semibold ${index === currentSlide ? "text-[#eadaaf]" : "text-gray-400"}`}
                  >
                    {item.tag}
                  </p>
                  <h4 className="text-[11px] md:text-xs font-bold truncate mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. POPULAR CULTURE COMPONENT (THE DEALS OF THE WEEK THEME)                */}
      {/* ========================================================================= */}
      <section className="bg-[#1c1a16] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[#c29646] text-[10px] font-bold tracking-widest uppercase block mb-1">
                Sorotan Utama Pekan Ini
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#fcf8f3] font-serif">
                Budaya Populer & Hiburan Mataram
              </h2>
            </div>
            <button className="text-xs text-gray-400 hover:text-[#c29646] border border-zinc-800 hover:border-[#c29646] px-4 py-2 rounded-lg transition-all duration-300">
              Lihat Semua
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 shadow-md">
                <img
                  src={seniImg}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-4 bg-purple-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Karnaval Jalanan
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-200 mt-3 group-hover:text-[#c29646] transition-colors duration-300 truncate">
                Wayang Jogja Night Carnival (WJNC)
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-light leading-relaxed">
                Perpaduan kolosal koreografi modern dengan pementasan tokoh
                wayang klasik di area Tugu Yogyakarta.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 shadow-md">
                <img
                  src={kearifanImg}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-4 bg-amber-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Kuliner Historis
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-200 mt-3 group-hover:text-[#c29646] transition-colors duration-300 truncate">
                Kelezatan Autentik Thiwul Gunung Kidul
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-light leading-relaxed">
                Menilik cerita ketahanan pangan masa lalu di balik manis dan
                gurihnya parutan kelapa di atas singkong kering.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 shadow-md">
                <img
                  src={heroBg}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-4 bg-teal-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Workshop Seni
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-200 mt-3 group-hover:text-[#c29646] transition-colors duration-300 truncate">
                Eksplorasi Membatik Kampung Giriloyo
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-light leading-relaxed">
                Belajar langsung teknik mencanting malam dari perajin lokal
                senior pewaris motif tradisional Mataram kuno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FITUR BARU DI PALING BAWAH: SECTION ARTIKEL & LITERASI BUDAYA          */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#c29646] text-[10px] font-bold tracking-widest uppercase block mb-1">
              Ruang Literasi Digital
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#3a2f21] font-serif">
              📜 Cerita, Catatan & Artikel Budaya
            </h2>
          </div>
          <button 
            onClick={() => navigate("/budaya/artikel")}
            className="text-xs font-semibold text-[#c29646] hover:underline flex items-center gap-1 transition-all"
          >
            Lihat Semua Artikel <span>→</span>
          </button>
        </div>

        {/* Grid Kartu Cuplikan Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Kartu Artikel 1 */}
          <div 
            onClick={() => navigate("/budaya/artikel")}
            className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-zinc-100">
                <img 
                  src={keratonImg} 
                  alt="Garis Imajiner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Sejarah Mataram
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-serif text-sm font-bold text-[#3a2f21] line-clamp-2 leading-snug group-hover:text-[#c29646] transition-colors">
                  Menelisik Garis Imajiner Yogyakarta: Poros Gaib Kosmologi Jawa
                </h4>
                <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed mt-2">
                  Membentang lurus dari puncak Gunung Merapi, Tugu Pal Putih, Keraton, hingga Pesisir Laut Selatan...
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-[#fcf8f3] flex justify-between items-center text-[10px] text-gray-400">
              <span className="font-medium text-zinc-600">Raden Mas Pramono</span>
              <span>5 mnt baca</span>
            </div>
          </div>

          {/* Kartu Artikel 2 */}
          <div 
            onClick={() => navigate("/budaya/artikel")}
            className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-zinc-100">
                <img 
                  src={kearifanImg} 
                  alt="Batik Canting" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Filosofi Kriya
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-serif text-sm font-bold text-[#3a2f21] line-clamp-2 leading-snug group-hover:text-[#c29646] transition-colors">
                  Rahasia Dibalik Goresan Canting: Makna Motif Batik Parang Rusak
                </h4>
                <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed mt-2">
                  Batik Parang Rusak dahulu merupakan kain sakral yang hanya boleh dikenakan keluarga kesultanan Keraton...
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-[#fcf8f3] flex justify-between items-center text-[10px] text-gray-400">
              <span className="font-medium text-zinc-600">Siti Utami</span>
              <span>4 mnt baca</span>
            </div>
          </div>

          {/* Kartu Artikel 3 */}
          <div 
            onClick={() => navigate("/budaya/artikel")}
            className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 overflow-hidden relative bg-zinc-100">
                <img 
                  src={seniImg} 
                  alt="Pentas Wayang" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  Seni Pertunjukan
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-serif text-sm font-bold text-[#3a2f21] line-clamp-2 leading-snug group-hover:text-[#c29646] transition-colors">
                  Kolo Tjokro dan Eksistensi: Bagaimana Wayang Kulit Bertahan di Era Digital
                </h4>
                <p className="text-gray-500 text-xs font-light line-clamp-2 leading-relaxed mt-2">
                  Seni pementasan bayangan kulit warisan leluhur nusantara ini terus bersalin rupa menjaga nyawanya...
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-[#fcf8f3] flex justify-between items-center text-[10px] text-gray-400">
              <span className="font-medium text-zinc-600">Bagus Wijaya</span>
              <span>7 mnt baca</span>
            </div>
          </div>

        </div>

        {/* Tombol Tampilkan Lebih Banyak Ke Halaman ArtikelBudaya */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate("/budaya/artikel")}
            className="bg-[#e2b254] hover:bg-[#cb9a3c] text-[#2c2115] text-xs font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 tracking-wider uppercase"
          >
            Tampilkan Lebih Banyak Artikel 📖
          </button>
        </div>
      </section>
    </div>
  );
};

export default ListBudaya;