import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function DetailWisata() {
  const { id } = useParams();
  const [selectedTiketId, setSelectedTiketId] = useState("");
  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [wisata, setWisata] = useState(null);
  const handleKurang = () => setJumlahTiket((prev) => (prev > 1 ? prev - 1 : 1));
  const handleTambah = () => setJumlahTiket((prev) => prev + 1);
  const handleTiketChange = (e) => setSelectedTiketId(e.target.value);
  const tiketPilihanInfo = wisata?.tiket?.find(t => t.id === selectedTiketId) || wisata?.tiket?.[0];
  const totalHarga = (tiketPilihanInfo?.harga || 0) * jumlahTiket;

  useEffect(() => {
  axios.get(`http://localhost:3001/wisata/${id}`)
    .then((response) => {
      const data = response.data.wisata;

      setWisata(data);

      if (data.tiket?.length > 0) {
        setSelectedTiketId(data.tiket[0].id);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  setJumlahTiket(1);
  window.scrollTo(0, 0);
}, [id]);

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
          <img src={wisata?.gambar} className="w-full h-full object-cover" alt={wisata?.nama} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207] via-[#1a1207]/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#c9a452] text-[#1a1207] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(201,164,82,0.4)]">
                {wisata?.kategori}
              </span>
              <span className="text-white/90 text-sm flex items-center gap-2 font-light backdrop-blur-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                🕒 {wisata?.jamOperasional}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-xl leading-tight">
              {wisata?.nama}
            </h1>
            <p className="text-[#e8dcc4] text-sm md:text-base flex items-center gap-2 drop-shadow-md">
              <span className="text-[#c9a452]">📍</span> {wisata?.lokasi}
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
                {wisata?.deskripsi?.charAt(0)}
              </span>
              {wisata?.deskripsi?.slice(1)}
            </p>
          </section>

          {/* Fasilitas Premium Layout */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#c9a452] inline-block"></span>
              <h2 className="text-3xl font-serif font-bold text-[#2d1f0a]">Layanan & Aktivitas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wisata?.fasilitas?.map((item, index) => (
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
                      {wisata?.tiket?.map((t) => (
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