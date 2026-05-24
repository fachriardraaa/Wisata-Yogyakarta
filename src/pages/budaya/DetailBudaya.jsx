import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  initialBudayaItems,
  extendedBudayaItems,
} from "../../services/data/budayaData";
import "../../style/budaya-style/DetailBudaya.css";

// Gabungkan data untuk pencarian item berdasarkan ID
const allBudayaItems = [...initialBudayaItems, ...extendedBudayaItems];

const DetailBudaya = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [budaya, setBudaya] = useState(null);
  const [activeTab, setActiveTab] = useState("sejarah");

  // Cari data berdasarkan ID parameter URL
  useEffect(() => {
    const foundItem = allBudayaItems.find(
      (item) => item.id === parseInt(id) || item.id === id,
    );
    if (foundItem) {
      setBudaya(foundItem);
    }
    // Auto scroll ke atas saat halaman dimuat
    window.scrollTo(0, 0);
  }, [id]);

  // Jika data tidak ditemukan
  if (!budaya) {
    return (
      <div className="min-h-screen bg-[#fcf8f3] flex flex-col justify-center items-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#3a2f21] mb-2">
          Arsip Tidak Ditemukan
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          Maaf, detail kebudayaan yang Anda cari belum terarsip atau telah
          dipindahkan.
        </p>
        <button
          onClick={() => navigate("/budaya")}
          className="bg-[#c29646] hover:bg-[#a67c33] text-white text-xs font-medium px-5 py-2.5 rounded-xl transition duration-300"
        >
          ← Kembali ke List Budaya
        </button>
      </div>
    );
  }

  return (
    <div className="detail-budaya-container bg-[#fcf8f3] text-[#2c2115] min-h-screen font-sans pb-24">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER BANNER (SINEMATIK DENGAN GRADIENT OVERLAY)               */}
      {/* ========================================================================= */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black">
        <img
          src={budaya.image}
          alt={budaya.title}
          className="w-full h-full object-cover opacity-80 animate-fade-blur"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf8f3] via-black/40 to-black/60 z-10"></div>

        {/* Tombol Kembali Floating */}
        <div className="absolute top-28 left-6 md:left-16 z-20">
          <button
            onClick={() => navigate("/budaya")}
            className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 transition duration-300 shadow-lg"
          >
            <span>←</span> Kembali ke Penjelajah
          </button>
        </div>

        {/* Informasi Utama di Atas Gambar */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-16 pb-12 z-20 max-w-5xl mx-auto flex flex-col justify-end h-full pointer-events-none">
          <span className="bg-[#e2b254] text-[#2c2115] text-[10px] font-bold px-3 py-1 rounded shadow-md w-fit uppercase tracking-wider mb-4">
            {budaya.tag || "Warisan Budaya"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#3a2f21] md:text-white leading-tight drop-shadow-sm">
            {budaya.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-700 md:text-gray-200 mt-2 flex items-center gap-2 font-light">
            <span>📍</span> Wilayah Daerah Istimewa Yogyakarta •{" "}
            <span className="font-medium text-[#c29646] md:text-[#eadaaf]">
              Kabupaten/Kota {budaya.region}
            </span>
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DUAL-COLUMN LAYOUT KONTEN UTAMA                                      */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KOLOM KIRI: DOKUMENTASI, FILOSOFI, & TAB SEJARAH (8 KOLOM) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Menu Tab Kontrol Deskripsi */}
          <div className="bg-white rounded-2xl p-2 border border-[#eedfc9]/60 shadow-sm flex gap-2">
            <button
              onClick={() => setActiveTab("sejarah")}
              className={`flex-1 text-center py-2.5 text-xs font-medium tracking-wide rounded-xl transition-all duration-300 ${
                activeTab === "sejarah"
                  ? "bg-[#2d2822] text-white shadow-md font-semibold"
                  : "text-[#534637] hover:bg-[#faf5ee]"
              }`}
            >
              📖 Sejarah & Filosofi
            </button>
            <button
              onClick={() => setActiveTab("galeri")}
              className={`flex-1 text-center py-2.5 text-xs font-medium tracking-wide rounded-xl transition-all duration-300 ${
                activeTab === "galeri"
                  ? "bg-[#2d2822] text-white shadow-md font-semibold"
                  : "text-[#534637] hover:bg-[#faf5ee]"
              }`}
            >
              🖼️ Dokumentasi Visual
            </button>
          </div>

          {/* Isi Konten Berdasarkan Tab Aktif */}
          <div className="bg-white rounded-3xl border border-[#eedfc9]/50 p-6 md:p-8 shadow-sm">
            {activeTab === "sejarah" ? (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3a2f21] mb-3">
                    Ringkasan Narasi
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    {budaya.description} Kebudayaan ini mencerminkan tatanan
                    nilai luhur yang diwariskan turun-temurun sejak era kejayaan
                    Kesultanan Mataram Islam, menjadi jembatan spiritual dan
                    ekspresi sosial yang hidup di tengah masyarakat modern
                    Daerah Istimewa Yogyakarta.
                  </p>
                </div>

                <div className="border-t border-[#fcf8f3] pt-6">
                  <h3 className="font-serif text-lg font-bold text-[#3a2f21] mb-3">
                    Nilai Filosofis & Esensi Luhur
                  </h3>
                  <blockquote className="border-l-4 border-[#c29646] bg-[#fcf8f3] p-4 text-xs md:text-sm italic text-gray-600 rounded-r-xl leading-relaxed">
                    "Setiap struktur gerak, ragam hias motif, ritual, maupun
                    ritme instrumen tidak pernah diciptakan sekadar untuk
                    estetika visual belaka, melainkan sarat akan doa, tata krama
                    hidup, hubungan harmonis manusia dengan alam, serta sujud
                    syukur kehadirat Sang Pencipta semesta."
                  </blockquote>
                  <p className="text-gray-600 text-sm leading-relaxed font-light mt-4">
                    Hingga hari ini, kelestarian kebudayaan ini terus dijaga
                    ketat melalui sistem adat istana keraton maupun inisiatif
                    mandiri desa wisata budaya di seluruh penjuru DIY,
                    menjadikannya elemen vital identitas kota budaya.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-[#3a2f21] mb-2">
                  Arsip Galeri Visual
                </h3>
                <p className="text-gray-500 text-xs font-light">
                  Koleksi dokumentasi otentik kebudayaan {budaya.title} di
                  lapangan.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-100 border border-zinc-200">
                    <img
                      src={budaya.image}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-100 border border-zinc-200 flex items-center justify-center text-center p-4">
                    <p className="text-xs text-gray-400 italic">
                      Dokumentasi Tambahan Segera Diunggah dalam Pembaruan Arsip
                      Digital
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: METADATA & SIDEBAR DETAIL PENDUKUNG (4 KOLOM) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ringkasan Informasi Ringkas */}
          <div className="bg-white rounded-3xl border border-[#eedfc9]/50 p-6 shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#3a2f21] pb-3 border-b border-[#fcf8f3] mb-4">
              Metadata Arsip
            </h4>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Kategori Utama
                </span>
                <span className="text-sm font-medium text-[#3a2f21]">
                  {budaya.tag || "Warisan Budaya"}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Wilayah Cakupan
                </span>
                <span className="text-sm font-medium text-[#3a2f21]">
                  Kabupaten / Kota {budaya.region}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Status Kelestarian
                </span>
                <span className="text-xs inline-flex items-center gap-1.5 font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mt-1 border border-teal-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>{" "}
                  Aktif & Terjaga
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Otoritas Pengarsipan
                </span>
                <span className="text-xs text-gray-500 font-light block mt-0.5">
                  E-Arsip Budaya & Sejarah Yogyakarta v2026
                </span>
              </div>
            </div>
          </div>

          {/* Kotak Edukasi / Ajakan Aksi Tradisi */}
          <div className="bg-[#2d2822] text-white rounded-3xl p-6 shadow-md relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-x-8 translate-y-8 group-hover:scale-110 transition duration-500"></div>

            <span className="text-[10px] font-bold text-[#eadaaf] uppercase tracking-widest block mb-1">
              Edukasi Komunitas
            </span>
            <h5 className="font-serif text-base font-bold mb-3 leading-snug">
              Tertarik Menyaksikan / Belajar Langsung?
            </h5>
            <p className="text-gray-300 text-xs font-light leading-relaxed mb-4">
              Anda dapat mengunjungi pusat latihan sanggar, museum, atau desa
              wisata terkait untuk ikut melestarikan warisan adiluhung ini.
            </p>
            <button className="w-full bg-[#c29646] hover:bg-[#a67c33] text-white text-xs font-medium py-2.5 rounded-xl transition duration-300 shadow-sm uppercase tracking-wider">
              Hubungi Kontak Paguyuban
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailBudaya;
