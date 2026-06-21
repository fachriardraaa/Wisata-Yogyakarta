import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/OpenTrip/DetailTrip.css"; 

function DetailTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State utama untuk menampung data tunggal open trip dari backend
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetching data detail trip berdasarkan parameter ID di URL
    axios.get(`http://localhost:3001/trips/${id}`)
      .then((res) => {
        setTrip(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data detail trip:", err);
        setLoading(false);
      });
  }, [id]);

  // 1. Kondisi Loading saat menunggu respon API backend selesai
  if (loading) {
    return (
      <div className="trip-loading-screen" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#bfa15f' }}>
        <h3>Memuat Detail Perjalanan Terbaik Anda...</h3>
      </div>
    );
  }

  // 2. Kondisi jika data trip kosong (tidak ditemukan di database) atau ID salah
  if (!trip) {
    return (
      <div className="trip-not-found">
        <p className="emoji">😢</p>
        <h2>Open Trip tidak ditemukan</h2>
        <button onClick={() => navigate("/trip")}>← Kembali</button>
      </div>
    );
  }

  // Fallback pengaman untuk properti bertipe data Array dari tabel relasional
  const listGaleri = trip.galeri || [];
  const listFasilitas = trip.fasilitas || [];
  const listItinerary = trip.itinerary || []; // Mengantisipasi jika database belum setup itinerary

  return (
    <section className="detail-page">
      {/* HERO SECTION */}
      <div className="detail-hero">
        {/* Menggunakan gambarUtama hasil mapping backend atau gambar default */}
        <img src={trip.gambarUtama || trip.gambar} alt={trip.nama} className="detail-hero-image" />
        <div className="detail-overlay">
          <span className="trip-category">{trip.kategori}</span>
          <h1 style={{ fontWeight: 'bold' }}>{trip.nama}</h1>
          <p>{trip.durasi} • {trip.lokasi}</p>
        </div>
      </div>

      <div className="detail-container">
        {/* LEFT COLUMN */}
        <div className="detail-left">
          {/* Gallery - Hanya di-render jika data foto di tabel open_trip_galeri tersedia */}
          {listGaleri.length > 0 && (
            <div className="detail-card gallery-section">
              <div className="gallery-grid">
                <div className="gallery-item main-item">
                  <img src={listGaleri[0]} alt="main" />
                </div>
                {listGaleri.slice(1, 5).map((img, i) => (
                  <div className="gallery-item" key={i}>
                    <img src={img} alt={`sub-${i}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deskripsi */}
          <div className="detail-card">
            <div className="section-header">
              <span className="section-dot"></span>
              <h2>Tentang Paket Ini</h2>
            </div>
            <p className="description-text">{trip.deskripsiLengkap}</p>
          </div>

          {/* Itinerary */}
          {listItinerary.length > 0 && (
            <div className="detail-card itinerary-section">
              <div className="section-header">
                <span className="section-dot"></span>
                <h2>Rencana Perjalanan</h2>
              </div>
              <div className="itinerary-list">
                {listItinerary.map((item, index) => (
                  <div className="itinerary-item" key={index}>
                    <div className="day-label">HARI {item.hari}</div>
                    <div className="itinerary-content">
                      <h3>{item.tujuan}</h3>
                      <p>{item.kegiatan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maps */}
          <div className="detail-card maps-section">
            <div className="section-header">
              <span className="section-dot"></span>
              <h2>Lokasi Penjemputan & Destinasi</h2>
            </div>
            <div className="maps-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15813.121535277314!2d110.39068156898287!3d-7.760059802398285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversitas%20Amikom%20Yogyakarta!5e0!3m2!1sid!2sid!4v1778679368841!5m2!1sid!2sid" width="100%" height="350" style={{ border: 0, borderRadius: "12px" }} allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="detail-right">
          <div className="sticky-sidebar">
            <div className="booking-card highlight-card">
              <h3>Informasi Trip</h3>
              <div className="info-grid">
                <div className="info-box"><span>📍</span><label>Lokasi</label><p>{trip.lokasi}</p></div>
                <div className="info-box"><span>🕒</span><label>Durasi</label><p>{trip.durasi}</p></div>
                <div className="info-box"><span>📅</span><label>Jadwal</label><p>{trip.tanggalKeberangkatan}</p></div>
                <div className="info-box"><span>👥</span><label>Sisa</label><p>{trip.kuotaTersisa} Kursi</p></div>
              </div>

              <div className="price-tag">
                <small>Harga Mulai</small>
                <h2>Rp {(trip.harga || 0).toLocaleString("id-ID")}<span>/org</span></h2>
              </div>

              <button className="btn-book-now gold-glow" onClick={() => navigate(`/trip/booking/${trip.id}`)}>
                Booking Sekarang
              </button>
              <button className="btn-back-outline" onClick={() => navigate("/trip")}>Kembali ke List</button>
            </div>

            {/* Fasilitas Dinamis */}
            <div className="detail-card compact">
              <h3>Fasilitas Termasuk</h3>
              <div className="fasilitas-simple">
                {listFasilitas.length > 0 ? (
                  listFasilitas.map((f, i) => (
                    <span key={i} className="f-item">✓ {f}</span>
                  ))
                ) : (
                  <span className="f-item-empty" style={{ fontStyle: 'italic', color: '#888' }}>Tidak ada info fasilitas khusus.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailTrip;