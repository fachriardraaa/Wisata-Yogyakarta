import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/budaya-style/ArtikelBudaya.css";

// Import aset gambar lokal (menggunakan aset yang sudah ada agar konsisten)
import heroBg from "../../assets/images/heroSection-budaya.png";
import seniImg from "../../assets/images/seniPertunjukan-budaya.png";
import keratonImg from "../../assets/images/keratonSejarah-budaya.png";
import kearifanImg from "../../assets/images/kearifanLokal-budaya.png";

const ArtikelBudaya = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  // Auto scroll ke atas saat halaman diakses
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Data Mock Artikel Budaya & Sejarah
  const daftarArtikel = [
    {
      id: "art-1",
      title:
        "Menelisik Garis Imajiner Yogyakarta: Filosofi Poros Gaib Karang Mataram",
      excerpt:
        "Membentang lurus dari Gunung Merapi, Tugu Pal Putih, Keraton, hingga Laut Selatan. Bukan sekadar kebetulan geografis, melainkan sebuah konsep spiritual...",
      kategori: "Sejarah",
      tanggal: "18 Mei 2026",
      penulis: "Raden Mas Pramono",
      bacaan: "5 mnt baca",
      image: keratonImg,
      highlight: true,
    },
    {
      id: "art-2",
      title:
        "Rahasia Dibalik Goresan Canting: Makna Simbolis Motif Batik Parang Rusak",
      excerpt:
        "Batik Parang Rusak dahulu hanya boleh dikenakan oleh keluarga kerajaan. Penasaran dengan jalinan doa dan ketegasan mental yang tersirat di setiap lengkungannya?",
      kategori: "Kriya & Seni",
      tanggal: "12 Mei 2026",
      penulis: "Siti Utami",
      bacaan: "4 mnt baca",
      image: kearifanImg,
      highlight: false,
    },
    {
      id: "art-3",
      title:
        "Kolo Tjokro dan Modernitas: Bagaimana Wayang Kulit Bertahan di Era Digital",
      excerpt:
        "Seni pementasan bayangan kulit asli Mataram ini terus bersalin rupa. Menilik inovasi para dalang muda dalam meramu sound system modern tanpa merusak pakem klasik.",
      kategori: "Seni Pertunjukan",
      tanggal: "05 Mei 2026",
      penulis: "Bagus Wijaya",
      bacaan: "7 mnt baca",
      image: seniImg,
      highlight: false,
    },
    {
      id: "art-4",
      title:
        "Ritual Sekaten: Perpaduan Syiar Islam dan Harmoni Akulturasi Budaya Jawa",
      excerpt:
        "Mendengarkan gemuruh alunan Gamelan Kyai Guntur Madu yang magis di halaman Masjid Gedhe Kauman, penanda perayaan hari lahir Nabi Muhammad SAW.",
      kategori: "Upacara Adat",
      tanggal: "28 April 2026",
      penulis: "Ki Jatmiko",
      bacaan: "6 mnt baca",
      image: heroBg,
      highlight: false,
    },
    {
      id: "art-5",
      title:
        "Melestarikan Kuliner Ndalem: Riwayat Panjang Sayur Brongkos Kesukaan Sultan",
      excerpt:
        "Kuah hitam pekat berbahan dasar kluwek dibalut gurihnya santan dan kacang tholo. Kuliner otentik yang menyimpan sejarah diplomasi rasa di dalam benteng istana.",
      kategori: "Kuliner",
      tanggal: "20 April 2026",
      penulis: "Nyi Warsito",
      bacaan: "4 mnt baca",
      image: kearifanImg,
      highlight: false,
    },
  ];

  const kategoriList = [
    "Semua",
    "Sejarah",
    "Seni Pertunjukan",
    "Kriya & Seni",
    "Upacara Adat",
    "Kuliner",
  ];

  // Filter Logika pencarian dan dropdown kategori
  const artikelFilter = daftarArtikel.filter((artikel) => {
    const matchSearch =
      artikel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artikel.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori =
      selectedKategori === "Semua" || artikel.kategori === selectedKategori;
    return matchSearch && matchKategori;
  });

  // Ambil artikel utama (Highlight)
  const artikelUtama = daftarArtikel.find((item) => item.highlight);

  return (
    <div className="artikel-budaya-container bg-[#fcf8f3] text-[#2c2115] min-h-screen font-sans pb-24">
      {/* ========================================================================= */}
      {/* 1. HEADER & ZONE PENCARIAN CONTROLLER                                      */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-12 px-6 md:px-16 max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-[#bfa37a]"></span>
          <p className="text-[#bfa37a] tracking-widest text-xs uppercase font-bold">
            Ruang Literasi
          </p>
          <span className="w-6 h-[1px] bg-[#bfa37a]"></span>
        </div>
        <h1 className="text-4xl font-serif font-light text-[#3a2f21] mb-4">
          Artikel &{" "}
          <span className="text-[#c29646] italic font-normal">
            Catatan Budaya
          </span>
        </h1>
        <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed mb-8">
          Kumpulan esai, ulasan mendalam, dan catatan sejarah mengenai peradaban
          tanah Mataram yang ditulis langsung oleh para pengamat budaya.
        </p>

        {/* Filter Bar Intuitif */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-3 border border-[#eedfc9]/60 shadow-sm flex flex-col md:flex-row items-center gap-3">
          <div className="w-full md:flex-grow relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari judul artikel atau topik kebudayaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#fcf8f3]/50 focus:bg-white rounded-xl border border-transparent focus:border-[#eedfc9] outline-none text-[#2c2115] transition-all"
            />
          </div>
          <div className="w-full md:w-auto flex-shrink-0">
            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full md:w-auto bg-[#fcf8f3] border border-[#eedfc9]/60 text-xs text-[#534637] px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:border-[#c29646]"
            >
              {kategoriList.map((kat, index) => (
                <option key={index} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ARTIKEL UTAMA (FEATURED SPOTLIGHT BANNER)                              */}
      {/* ========================================================================= */}
      {artikelUtama && searchQuery === "" && selectedKategori === "Semua" && (
        <section className="px-6 md:px-16 max-w-6xl mx-auto mb-16">
          <div
            onClick={() => navigate(`/artikel/${artikelUtama.id}`)}
            className="bg-white rounded-[2rem] overflow-hidden border border-[#f1e7da] shadow-sm hover:shadow-md transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full overflow-hidden relative">
              <img
                src={artikelUtama.image}
                alt={artikelUtama.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#2d2822] text-[#eadaaf] text-[9px] font-bold tracking-wider px-3 py-1 rounded uppercase">
                Sorotan Utama
              </span>
            </div>
            <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between items-start">
              <div>
                <span className="text-[#c29646] text-[10px] font-bold uppercase tracking-wider block mb-2">
                  📍 {artikelUtama.kategori}
                </span>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-[#3a2f21] leading-tight group-hover:text-[#c29646] transition-colors duration-300">
                  {artikelUtama.title}
                </h2>
                <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed mt-3">
                  {artikelUtama.excerpt}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-[#fcf8f3] mt-6 flex items-center justify-between text-[11px] text-gray-400">
                <div>
                  <p className="font-medium text-[#534637]">
                    {artikelUtama.penulis}
                  </p>
                  <p className="font-light text-[10px] mt-0.5">
                    {artikelUtama.tanggal} • {artikelUtama.bacaan}
                  </p>
                </div>
                <span className="text-[#c29646] font-semibold group-hover:translate-x-1 transition-transform">
                  Baca Tulisan →
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. GRID UTAMA ARTIKEL LAINNYA                                            */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 max-w-6xl mx-auto">
        <h3 className="font-serif text-xl font-bold text-[#3a2f21] mb-6 pb-2 border-b border-[#eedfc9]/40">
          {searchQuery || selectedKategori !== "Semua"
            ? "Hasil Pencarian Catatan"
            : "Daftar Esai & Liputan"}
        </h3>

        {artikelFilter.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artikelFilter.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/artikel/${item.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-[#f3ece3] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#3a2f21] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm border border-[#eedfc9]/40">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-sm font-bold text-[#3a2f21] line-clamp-2 leading-snug group-hover:text-[#c29646] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs font-light line-clamp-3 leading-relaxed mt-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#fcf8f3] flex items-center justify-between text-[10px] text-gray-400">
                  <div>
                    <span className="block font-medium text-[#534637]">
                      {item.penulis}
                    </span>
                    <span className="font-light text-[9px]">
                      {item.tanggal}
                    </span>
                  </div>
                  <span className="text-zinc-400 font-mono text-[9px] bg-[#fcf8f3] px-2 py-0.5 rounded border border-[#f1e7da]">
                    {item.bacaan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#f3ece3] p-6">
            <p className="text-sm text-gray-400 italic">
              Tidak ada tajuk tulisan yang cocok dengan penyaringan Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedKategori("Semua");
              }}
              className="mt-4 text-xs font-medium text-[#c29646] hover:underline"
            >
              Bersihkan Filter
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtikelBudaya;
