import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/OpenTrip/ListTrip.css";

function ListTrip() {

  const navigate = useNavigate();

  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo(0, 0);

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3001/trips")
      .then((res) => {

        setTripData(res.data);

        setLoading(false);

      })
      .catch((err) => {

        console.error("Gagal mengambil data:", err);

        setLoading(false);

      });

  }, [navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="open-trip-page">
      {/* HERO */}
      <div className="open-trip-hero">
        <div className="hero-left">
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "3.5rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}>Open Trip</h1>

          <p>
            Temukan pengalaman terbaik menjelajahi
            Yogyakarta bersama travelers lain dalam
            perjalanan yang berkesan.
          </p>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1200&auto=format&fit=crop"
            alt="Borobudur"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="open-trip-content">
        {/* FILTER */}
        <aside className="filter-box">
          <div className="filter-header">
            <h3>Filter Pencarian</h3>

            <button>Reset Filter</button>
          </div>

          <div className="filter-group">
            <label>Cari Destinasi</label>

            <input
              type="text"
              placeholder="Cari destinasi atau paket..."
            />
          </div>

          <div className="filter-group">
            <label>Tanggal Keberangkatan</label>

            <input type="date" />
          </div>

          <div className="filter-group">
            <label>Durasi Trip</label>

            <div className="duration-buttons">
              <button className="active">
                Semua
              </button>

              <button>1 Hari</button>

              <button>2 Hari</button>

              <button>3 Hari+</button>
            </div>
          </div>

          <div className="filter-group">
            <label>Kategori Trip</label>

            <div className="checkbox-group">
              <label>
                <input type="checkbox" />
                Alam & Petualangan
              </label>

              <label>
                <input type="checkbox" />
                Budaya & Sejarah
              </label>

              <label>
                <input type="checkbox" />
                Pantai
              </label>

              <label>
                <input type="checkbox" />
                Kuliner
              </label>

              <label>
                <input type="checkbox" />
                City Tour
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label>Harga per Orang</label>

            <input type="range" />
          </div>

          <button className="btn-filter">
            Terapkan Filter
          </button>
        </aside>

        {/* LIST TRIP */}
        <div className="trip-list-container">
          <div className="trip-list-header">
            <p>
              Menampilkan{" "}
              {tripData.length} open trip
            </p>

            <select>
              <option>
                Tanggal Terdekat
              </option>

              <option>
                Harga Termurah
              </option>

              <option>
                Rating Tertinggi
              </option>
            </select>
          </div>

<div className="trip-list">
  {tripData.map((trip) => (
    <div className="trip-card" key={trip?.id}>
      <div className="trip-image">
        <img src={trip?.gambar} alt={trip?.nama} />
        {/* Tambahkan Label Rating di atas Gambar */}

      </div>

      <div className="trip-content">
        <div className="trip-header-info">
          <h1 style={{ fontWeight: 'bold'}}>{trip?.nama}</h1>
          <span className="trip-category-tag">{trip?.kategori}</span>
        </div>

        <div className="trip-meta"style={{ fontSize: 'small', margintop: '15px' }}>
          <div className="meta-item">
            <span className="meta-icon">🕒</span> {trip?.durasi}
          </div>
          <div className="meta-item">
            <span className="meta-icon">📍</span> {trip.lokasi}
          </div>
        </div>

       

        {/* Tambahkan Quick Highlight (Icon-icon kecil) */}
        <div className="trip-highlights">
          <span className="highlight-item">✅ Hotel</span>
          <span className="highlight-item">✅ Makan</span>
          <span className="highlight-item">✅ Tiket</span>
        </div>
      </div>

      <div className="trip-price-section">
        <div className="price-top">
          <small>Mulai dari</small>
          <h3>Rp {trip?.harga.toLocaleString("id-ID")}</h3>
          <p>/ orang</p>
        </div>

        <div className="availability-box">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(trip?.kuotaTersisa/trip?.kuota)*100}%` }}
            ></div>
          </div>
          <p className="kuota-text">
            <span>{trip?.kuotaTersisa} Kursi</span> tersisa
          </p>
        </div>

        <button 
          className="btn-detail-main"
          onClick={() => navigate(`/trip/${trip?.id}`)}
        >
          Lihat Detail
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}

export default ListTrip;