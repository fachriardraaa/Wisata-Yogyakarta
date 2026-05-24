import { Link } from "react-router-dom";
import {
  dataHighlight,
  dataKategoriGrid,
  dataOpenTrip,
} from "../../services/data/budayaData";
import "../../style/budaya-style/ListBudaya.css";

export default function ListBudaya() {
  return (
    <div className="lb-root">
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="lb-hero">
        {/* Background foto */}
        <div className="lb-hero-bg">
          <img
            src="../src/assets/images/heroSection-budaya.png"
            alt="Budaya Yogyakarta"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Wave bawah */}
        <div className="lb-hero-wave">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
              fill="#faf5ec"
            />
          </svg>
        </div>

        {/* Konten */}
        <div className="lb-hero-content">
          <div className="lb-hero-eyebrow">Selamat Datang di</div>
          <h1 className="lb-hero-title">
            Jantung Budaya
            <br />
            di Tanah <span>Mataram</span>
          </h1>
          <p className="lb-hero-desc">
            Daerah Istimewa Yogyakarta adalah cermin budaya Jawa yang hidup dan
            terus lestari. Temukan keindahan tradisi, kearifan lokal, dan
            warisan leluhur yang tak ternilai.
          </p>
          <div className="lb-hero-actions">
            <Link to="/budaya/artikel" className="lb-btn-primary">
              Jelajahi Budaya DIY &nbsp;→
            </Link>
            <button className="lb-btn-video">
              <span className="lb-btn-video-icon">▶</span>
              Tonton Video
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="lb-hero-scroll">
          <div className="lb-scroll-icon">
            <div className="lb-scroll-dot" />
          </div>
          Scroll untuk menjelajah
        </div>

        {/* Lokasi */}
        <div className="lb-hero-location">
          <div className="lb-hero-location-pin">📍 Candi Prambanan</div>
          <div className="lb-hero-location-sub">Sleman, DIY</div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. MENGENAL DIY + 3 KARTU HIGHLIGHT
      ══════════════════════════════════════════ */}
      <section className="lb-mengenal">
        <div className="lb-mengenal-inner">
          {/* Kiri — Teks */}
          <div className="lb-mengenal-left">
            <div className="lb-mengenal-eyebrow">Mengenal DIY</div>
            <h2 className="lb-mengenal-title">
              Lebih dari Sekadar Tempat,
              <br />
              Ini <span>Warisan dan Identitas</span>
            </h2>
            <p className="lb-mengenal-desc">
              DIY bukan hanya destinasi, tapi rumah bagi nilai-nilai luhur,
              seni, tradisi, dan cara hidup yang terus dijaga turun-temurun.
            </p>
            <Link to="/about" className="lb-btn-outline">
              Tentang DIY &nbsp;→
            </Link>
          </div>

          {/* Kanan — 3 Kartu */}
          <div className="lb-cards-highlight">
            {dataHighlight.map((item) => (
              <Link
                key={item.id}
                to={`/budaya/${item.id}`}
                className={`lb-card-hl ${item.featured ? "lb-card-hl--featured" : ""}`}
              >
                {/* Foto */}
                <div className="lb-card-hl-img">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x240/2d1f0a/c9a84c?text=${item.judul}`;
                    }}
                  />
                  {/* Icon bulat di bawah foto */}
                  <div className="lb-card-hl-icon">
                    <img
                      src={item.icon}
                      alt={item.judul}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <span
                      className="lb-card-hl-icon-fallback"
                      style={{ display: "none" }}
                    >
                      {item.fallbackIcon}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="lb-card-hl-body">
                  <div className="lb-card-hl-title">{item.judul}</div>
                  <div className="lb-card-hl-desc">{item.deskripsi}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. KATEGORI GRID — 6 IKON
      ══════════════════════════════════════════ */}
      <section className="lb-kategori-section">
        <div className="lb-kategori-inner">
          <div className="lb-kategori-grid">
            {dataKategoriGrid.map((kat) => (
              <Link key={kat.id} to={kat.path} className="lb-kategori-item">
                <div className="lb-kategori-icon-wrap">
                  <img
                    src={kat.icon}
                    alt={kat.nama}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span
                    className="lb-kategori-icon-fallback"
                    style={{ display: "none" }}
                  >
                    {kat.fallbackIcon}
                  </span>
                </div>
                <span className="lb-kategori-label">{kat.nama}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. OPEN TRIP
      ══════════════════════════════════════════ */}
      <section className="lb-trip-section">
        <div className="lb-trip-inner">
          <div className="lb-trip-header">
            <p className="lb-trip-eyebrow">
              Terhubung Langsung dengan Pengalaman
            </p>
            <h2 className="lb-trip-title">
              Baca Ceritanya, Lalu Rasakan Langsung
            </h2>
            <p className="lb-trip-sub">
              Setiap budaya punya tempatnya. Kunjungi langsung dan rasakan
              pengalaman aslinya bersama open trip Hiling Semata.
            </p>
          </div>

          <div className="lb-trip-grid">
            {dataOpenTrip.map((trip) => (
              <div key={trip.id} className="lb-trip-card">
                <div className="lb-trip-card-img">
                  <img
                    src={trip.gambar}
                    alt={trip.nama}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x200/2d1f0a/c9a84c?text=${trip.nama}`;
                    }}
                  />
                  <span className="lb-trip-badge">Open Trip</span>
                  <div className="lb-trip-overlay">
                    <div className="lb-trip-card-name">{trip.nama}</div>
                    <div className="lb-trip-card-desc">{trip.deskripsi}</div>
                  </div>
                </div>
                <div className="lb-trip-card-body">
                  <div className="lb-trip-price">
                    {trip.harga}
                    <span>/orang</span>
                  </div>
                  <Link to={`/trip/${trip.id}`} className="lb-trip-btn">
                    Lihat Open Trip
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="lb-trip-see-all">
            <Link to="/trip">Lihat Semua Open Trip &nbsp;→</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. QUOTE + CTA + SILHOUETTE
      ══════════════════════════════════════════ */}
      <section className="lb-quote-section">
        {/* Foto samping kiri */}
        <div className="lb-quote-bg-img">
          <img
            src="../src/assets/images/wayangkulit.png"
            alt=""
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Konten quote */}
        <div className="lb-quote-inner">
          <div className="lb-quote-left">
            <div className="lb-quote-mark">"</div>
            <p className="lb-quote-text">
              Jogja bukan hanya tempat,
              <br />
              tapi rasa yang hidup dalam budaya.
            </p>
            <p className="lb-quote-author">— Ki Manteb Sudarsono, Dalang</p>
          </div>
          <div className="lb-quote-right">
            <h3 className="lb-quote-right-title">
              Yuk, Jaga dan Lestarikan Budaya Kita
            </h3>
            <p className="lb-quote-right-sub">
              Dengan memahami budaya, kita ikut menjaga warisan bersama
              pengrajin lokal untuk generasi mendatang.
            </p>
            <Link to="/budaya/artikel" className="lb-quote-right-btn">
              Pelajari Lebih Dalam &nbsp;→
            </Link>
          </div>
        </div>

        {/* Ornamen tengah */}
        <div className="lb-ornamen">✦ ❧ ✦</div>

        {/* Silhouette pegunungan + candi SVG */}
        <div className="lb-silhouette">
          <svg
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pegunungan background */}
            <path
              d="M0,160 L80,100 L160,140 L280,60 L400,120 L520,80 L640,130 L760,70 L880,110 L1000,50 L1120,100 L1240,65 L1360,95 L1440,70 L1440,200 L0,200 Z"
              fill="rgba(255,255,255,0.04)"
            />
            {/* Pegunungan foreground */}
            <path
              d="M0,180 L120,130 L220,165 L340,110 L440,150 L560,100 L660,145 L760,105 L860,150 L960,115 L1060,155 L1160,120 L1280,155 L1380,130 L1440,145 L1440,200 L0,200 Z"
              fill="rgba(255,255,255,0.06)"
            />
            {/* Siluet candi kiri */}
            <g fill="rgba(255,255,255,0.08)">
              <rect x="60" y="155" width="8" height="45" />
              <polygon points="64,140 52,155 76,155" />
              <rect x="54" y="160" width="20" height="40" />
              <rect x="50" y="162" width="28" height="6" />
              <rect x="58" y="150" width="12" height="12" />
            </g>
            {/* Siluet candi kanan */}
            <g fill="rgba(255,255,255,0.08)">
              <rect x="1360" y="148" width="10" height="52" />
              <polygon points="1365,130 1350,148 1380,148" />
              <rect x="1352" y="154" width="26" height="46" />
              <rect x="1348" y="156" width="34" height="7" />
              <rect x="1357" y="143" width="16" height="13" />
            </g>
          </svg>
        </div>
      </section>
    </div>
  );
}
