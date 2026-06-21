import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/OpenTrip/ListTrip.css";

function ListTrip() {

  const navigate = useNavigate();
  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [durasi, setDurasi] = useState("Semua");
  const [kategori, setKategori] = useState([]);
  const [hargaMax, setHargaMax] = useState(5000000);
  const [filteredTrip, setFilteredTrip] = useState([]);
  const handleKategori = (value) => {
  if (kategori.includes(value)) {
    setKategori(
      kategori.filter(item => item !== value)
    );
  } else {
    setKategori([...kategori, value]);
  }
};
const applyFilter = () => {

  let result = [...tripData];

  // Keyword
  if (keyword) {
    result = result.filter(
      (trip) =>
        trip.nama
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||

        trip.lokasi
          .toLowerCase()
          .includes(keyword.toLowerCase())
    );
  }

  // Tanggal
  if (tanggal) {
    result = result.filter(
      (trip) =>
        trip.tanggal_keberangkatan === tanggal
    );
  }

  // Durasi
  if (durasi !== "Semua") {

    if (durasi === "1 Hari") {
      result = result.filter(
        (trip) => trip.durasi.includes("1 Hari")
      );
    }

    if (durasi === "2 Hari") {
      result = result.filter(
        (trip) => trip.durasi.includes("2 Hari")
      );
    }

    if (durasi === "3 Hari+") {
      result = result.filter(
        (trip) =>
          trip.durasi.includes("3 Hari") ||
          trip.durasi.includes("4 Hari") ||
          trip.durasi.includes("5 Hari")
      );
    }
  }

  // Kategori
  if (kategori.length > 0) {
    result = result.filter(
      (trip) =>
        kategori.includes(trip.kategori)
    );
  }

  // Harga
  result = result.filter(
    (trip) => trip.harga <= hargaMax
  );

  setFilteredTrip(result);
};

const resetFilter = () => {

  setKeyword("");
  setTanggal("");
  setDurasi("Semua");
  setKategori([]);
  setHargaMax(5000000);

  setFilteredTrip(tripData);
};

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
          setFilteredTrip(res.data);

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

            <button onClick={resetFilter}>
              Reset Filter
            </button>
          </div>

          <div className="filter-group">
            <label>Cari Destinasi</label>

            <input
              type="text"
              placeholder="Cari destinasi atau paket..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Tanggal Keberangkatan</label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Durasi Trip</label>

            <div className="duration-buttons">
              <button 
                type="button"
                className={durasi === "Semua" ? "active" : ""}
                onClick={() => setDurasi("Semua")}
              >
                Semua
              </button>

              <button 
                type="button"
                className={durasi === "1 Hari" ? "active" : ""}
                onClick={() => setDurasi("1 Hari")}
              >
                1 Hari
              </button>

              <button 
                type="button"
                className={durasi === "2 Hari" ? "active" : ""}
                onClick={() => setDurasi("2 Hari")}
              >
                2 Hari
              </button>

              <button 
                type="button"
                className={durasi === "3 Hari+" ? "active" : ""}
                onClick={() => setDurasi("3 Hari+")}
              >
                3 Hari+
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Kategori Trip</label>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={kategori.includes("Alam & Petualangan")}
                  onChange={() => handleKategori("Alam & Petualangan")}
                />
                Alam & Petualangan
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={kategori.includes("Budaya & Sejarah")}
                  onChange={() => handleKategori("Budaya & Sejarah")}
                />
                Budaya & Sejarah
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={kategori.includes("Pantai")}
                  onChange={() => handleKategori("Pantai")}
                />
                Pantai
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={kategori.includes("Kuliner")}
                  onChange={() => handleKategori("Kuliner")}
                />
                Kuliner
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={kategori.includes("City Tour")}
                  onChange={() => handleKategori("City Tour")}
                />
                City Tour
              </label>
            </div>
          </div>

            <div className="filter-group">
              <label>Harga per Orang</label>

              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={hargaMax}
                onChange={(e) =>
                  setHargaMax(parseInt(e.target.value))
                }
              />

              <p>
                Maksimal Rp{" "}
                {hargaMax.toLocaleString("id-ID")}
              </p>
            </div>

          <button
            className="btn-filter"
            onClick={applyFilter}
          >
            Terapkan Filter
          </button>
        </aside>

        {/* LIST TRIP */}
        <div className="trip-list-container">
          <div className="trip-list-header">
            <p>
              Menampilkan {filteredTrip.length} open trip
            </p>
          </div>

<div className="trip-list">
  {filteredTrip.map((trip) => (
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
  {/* Mengambil array fasilitas dari objek trip, lalu melakukan looping */}
  {trip.fasilitas && trip.fasilitas.length > 0 ? (
    trip.fasilitas.map((f, i) => (
      <span key={i} className="highlight-item">
        ✅ {f}
      </span>
    ))
  ) : (
    <span className="highlight-item-empty">Tidak ada informasi fasilitas</span>
  )}
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