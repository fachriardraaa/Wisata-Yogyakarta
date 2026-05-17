import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { dataArtikel } from "../../services/data/budayaData";
import "../../style/budaya-style/ArtikelBudaya.css";

/* ─── KATEGORI FILTER ───────────────────────────────────────── */
const KATEGORI = [
  "Semua",
  "Batik",
  "Wayang",
  "Sejarah & Keraton",
  "Kuliner",
  "Tradisi & Upacara",
];

/* ─── TICKER ITEMS ──────────────────────────────────────────── */
const TICKER_ITEMS = [
  "Budaya Yogyakarta",
  "Warisan Leluhur",
  "Seni Tradisional",
  "Kearifan Lokal",
  "Batik & Kerajinan",
  "Tari & Musik",
  "Kuliner Khas",
  "Sejarah Keraton",
  "Open Trip Budaya",
];

/* ─── HOOK: Scroll animation ────────────────────────────────── */
function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-anim");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ab-show");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

/* ─── HOOK: Reading progress bar ───────────────────────────── */
function useProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const curr = window.scrollY;
      setProgress(total > 0 ? (curr / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ═══════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════ */
export default function ArtikelBudaya() {
  const [aktif, setAktif] = useState("Semua");
  const [search, setSearch] = useState("");
  const progress = useProgressBar();
  useScrollAnim();

  /* Scroll ke atas saat mount */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Filter data */
  const filtered = dataArtikel.filter((a) => {
    const cocokKat = aktif === "Semua" || a.kategori === aktif;
    const cocokSearch =
      a.judul.toLowerCase().includes(search.toLowerCase()) ||
      a.ringkasan.toLowerCase().includes(search.toLowerCase());
    return cocokKat && cocokSearch;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const lainnya = filtered.filter((a) => a.id !== featured?.id);

  /* Artikel pertama untuk hero kanan */
  const heroArtikel = dataArtikel[0];

  return (
    <div className="ab-root">
      {/* ── READING PROGRESS BAR ── */}
      <div className="ab-progress" style={{ width: `${progress}%` }} />

      {/* ══════════════════════════════════════════
          1. HERO — SPLIT SCREEN
      ══════════════════════════════════════════ */}
      <section className="ab-hero">
        {/* Kiri — Teks */}
        <div className="ab-hero-left">
          <span className="ab-hero-vertical-text">
            Hiling Semata · Budaya DIY · 2025
          </span>

          <div className="ab-hero-issue">── Jurnal Budaya · Edisi 2025</div>

          <h1 className="ab-hero-title">
            Warisan yang
            <br />
            <span>Tak Pernah Mati</span>
          </h1>

          <div className="ab-hero-line" />

          <p className="ab-hero-desc">
            Setiap artikel adalah jendela menuju kekayaan budaya Yogyakarta.
            Baca, pahami, dan jadikan warisan ini bagian dari hidupmu.
          </p>

          {/* Stats */}
          <div className="ab-hero-stats">
            <div className="ab-hero-stat">
              <div className="ab-hero-stat-num">{dataArtikel.length}</div>
              <div className="ab-hero-stat-label">Artikel</div>
            </div>
            <div className="ab-hero-stat-divider" />
            <div className="ab-hero-stat">
              <div className="ab-hero-stat-num">
                {[...new Set(dataArtikel.map((a) => a.kategori))].length}
              </div>
              <div className="ab-hero-stat-label">Kategori</div>
            </div>
            <div className="ab-hero-stat-divider" />
            <div className="ab-hero-stat">
              <div className="ab-hero-stat-num">∞</div>
              <div className="ab-hero-stat-label">Warisan</div>
            </div>
          </div>

          <div className="ab-hero-cta">
            <button
              className="ab-btn-gold-pill"
              onClick={() => {
                document
                  .querySelector(".ab-grid-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Mulai Membaca ↓
            </button>
            <Link to="/budaya" className="ab-btn-ghost">
              ← Semua Budaya
            </Link>
          </div>
        </div>

        {/* Kanan — Foto + tag */}
        <div className="ab-hero-right">
          <img
            src={
              heroArtikel?.gambar ||
              "../src/assets/images/bangunan_hero_section.png"
            }
            alt="Artikel Budaya"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x900/2d1f0a/c9a84c?text=Artikel+Budaya";
            }}
          />
          <div className="ab-hero-right-overlay" />
          <div className="ab-hero-right-tag">
            <div className="ab-hero-right-tag-label">Artikel Terbaru</div>
            <div className="ab-hero-right-tag-title">
              {heroArtikel?.judul?.split(" ").slice(0, 4).join(" ")}...
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. TICKER MARQUEE
      ══════════════════════════════════════════ */}
      <div className="ab-ticker" aria-hidden="true">
        <div className="ab-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ab-ticker-item">
              {item}
              <span className="ab-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. SEARCH + FILTER STICKY
      ══════════════════════════════════════════ */}
      <div className="ab-controls">
        <div className="ab-controls-inner">
          {/* Search */}
          <div className="ab-search-wrap">
            <span className="ab-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ab-search"
            />
          </div>

          {/* Filter pills */}
          <div className="ab-filters">
            {KATEGORI.map((kat) => (
              <button
                key={kat}
                className={`ab-filter-pill ${aktif === kat ? "ab-active" : ""}`}
                onClick={() => setAktif(kat)}
              >
                {aktif === kat && "✓ "}
                {kat}
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="ab-result-count">
            <strong>{filtered.length}</strong> artikel
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4. EMPTY STATE
      ══════════════════════════════════════════ */}
      {filtered.length === 0 && (
        <div className="ab-empty">
          <div className="ab-empty-icon">🎭</div>
          <div className="ab-empty-title">Artikel Tidak Ditemukan</div>
          <div className="ab-empty-sub">
            Coba kata kunci lain atau reset filter.
          </div>
          <button
            className="ab-empty-btn"
            onClick={() => {
              setAktif("Semua");
              setSearch("");
            }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <>
          {/* ══════════════════════════════════════
              5. FEATURED — EDITORIAL BIG CARD
          ══════════════════════════════════════ */}
          {featured && (
            <div className="ab-featured-section">
              <div className="ab-section-label ab-anim ab-up">
                Artikel Pilihan
              </div>
              <Link
                to={`/budaya/${featured.id}`}
                className="ab-featured-card ab-anim ab-scale"
              >
                {/* Foto */}
                <div className="ab-featured-img">
                  <img
                    src={featured.gambar}
                    alt={featured.judul}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/700x500/2d1f0a/c9a84c?text=${featured.judul}`;
                    }}
                  />
                  <div className="ab-featured-img-overlay" />
                  <div className="ab-featured-num">01</div>
                </div>

                {/* Body */}
                <div className="ab-featured-body">
                  <div className="ab-featured-badge">
                    ✦ &nbsp;{featured.kategori}
                  </div>
                  <div className="ab-featured-title">{featured.judul}</div>
                  <div className="ab-featured-ring">{featured.ringkasan}</div>
                  <div className="ab-featured-meta">
                    <div className="ab-featured-meta-item">
                      📅 {featured.tanggal}
                    </div>
                    <div className="ab-featured-meta-divider" />
                    <div className="ab-featured-meta-item">
                      ⏱ {featured.menit}
                    </div>
                    <div className="ab-featured-meta-divider" />
                    <div className="ab-featured-meta-item">
                      ✍️ {featured.penulis}
                    </div>
                  </div>
                  <div className="ab-featured-read">
                    <div className="ab-featured-read-line" />
                    Baca Artikel Lengkap
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ══════════════════════════════════════
              6. MASONRY GRID
          ══════════════════════════════════════ */}
          {lainnya.length > 0 && (
            <div className="ab-grid-section">
              <div className="ab-grid-header">
                <div>
                  <div
                    className="ab-section-label ab-anim ab-up"
                    style={{ marginBottom: "10px" }}
                  >
                    Jelajahi Lebih Banyak
                  </div>
                  <h2 className="ab-grid-title ab-anim ab-up ab-d1">
                    Cerita <span>Budaya</span> Lainnya
                  </h2>
                </div>
              </div>

              <div className="ab-masonry">
                {lainnya.map((artikel, i) => (
                  <Link
                    key={artikel.id}
                    to={`/budaya/${artikel.id}`}
                    className={`ab-card ab-anim ab-up ab-d${Math.min((i % 4) + 1, 5)}`}
                  >
                    {/* Gambar */}
                    <div className="ab-card-img">
                      <img
                        src={artikel.gambar}
                        alt={artikel.judul}
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x300/2d1f0a/c9a84c?text=${artikel.judul}`;
                        }}
                      />
                      <span className="ab-card-badge">{artikel.kategori}</span>
                      {/* Overlay hover */}
                      <div className="ab-card-img-overlay">
                        <span className="ab-card-img-overlay-text">
                          Baca Artikel →
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="ab-card-body">
                      <div className="ab-card-title">{artikel.judul}</div>
                      <div className="ab-card-ring">{artikel.ringkasan}</div>
                      <div className="ab-card-footer">
                        <div className="ab-card-meta">
                          <span>📅 {artikel.tanggal}</span>
                          <span className="ab-card-meta-dot" />
                          <span>⏱ {artikel.menit}</span>
                        </div>
                        <span className="ab-card-read-arrow">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════
          7. CTA SECTION
      ══════════════════════════════════════════ */}
      <div className="ab-cta-section">
        <div className="ab-cta-bg-text" aria-hidden="true">
          BUDAYA
        </div>
        <div className="ab-cta-inner">
          <div className="ab-cta-eyebrow ab-anim ab-up">
            ── Dari Kata Menuju Pengalaman ──
          </div>
          <h2 className="ab-cta-title ab-anim ab-up ab-d1">
            Tak Cukup Hanya
            <br />
            <span>Membacanya</span>
          </h2>
          <p className="ab-cta-sub ab-anim ab-up ab-d2">
            Setiap cerita budaya punya tempatnya. Kunjungi langsung, rasakan
            sendiri, dan jadilah bagian dari pelestarian warisan Yogyakarta.
          </p>
          <div className="ab-cta-btns ab-anim ab-up ab-d3">
            <Link to="/trip" className="ab-cta-btn-primary">
              Ikut Open Trip →
            </Link>
            <Link to="/budaya" className="ab-cta-btn-secondary">
              ← Semua Budaya
            </Link>
          </div>
          <div className="ab-cta-ornamen ab-anim ab-up ab-d4">✦ ❧ ✦</div>
        </div>
      </div>
    </div>
  );
}
