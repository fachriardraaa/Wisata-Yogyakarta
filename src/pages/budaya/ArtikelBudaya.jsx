import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataArtikel } from "../../services/data/budayaData";
import "../../style/budaya-style/ArtikelBudaya.css";

const KATEGORI = [
  "Semua",
  "Batik",
  "Wayang",
  "Sejarah & Keraton",
  "Kuliner",
  "Tradisi & Upacara",
  "Kesenian",
  "Kerajinan",
  "Seni Pertunjukan",
  "Tari",
];
const TICKER = [
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

function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-anim");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ab-show");
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP(
        d.scrollHeight - d.clientHeight > 0
          ? (window.scrollY / (d.scrollHeight - d.clientHeight)) * 100
          : 0,
      );
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

export default function ArtikelBudaya() {
  const [aktif, setAktif] = useState("Semua");
  const [search, setSearch] = useState("");
  const progress = useProgress();
  useScrollAnim();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filtered = dataArtikel.filter((a) => {
    const kat = aktif === "Semua" || a.kategori === aktif;
    const src =
      a.judul.toLowerCase().includes(search.toLowerCase()) ||
      a.ringkasan.toLowerCase().includes(search.toLowerCase());
    return kat && src;
  });

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const lainnya = filtered.filter((a) => a.id !== featured?.id);

  // 3 artikel terbaru untuk preview kanan hero
  const previewArtikel = dataArtikel.slice(0, 3);

  return (
    <div className="ab-root">
      {/* Progress bar */}
      <div className="ab-progress" style={{ width: `${progress}%` }} />

      {/* ══════════════════════════════════════════
          1. HERO — FULL FOTO + PREVIEW ARTIKEL
      ══════════════════════════════════════════ */}
      <section className="ab-hero">
        {/* Background foto penuh */}
        <div className="ab-hero-bg">
          <img
            src={dataArtikel[2]?.gambar || "../src/assets/images/keraton.png"}
            alt="Artikel Budaya"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1600x900/2d1f0a/c9a84c?text=Artikel+Budaya";
            }}
          />
        </div>

        {/* Konten bawah */}
        <div className="ab-hero-body">
          {/* Kiri — judul & aksi */}
          <div className="ab-hero-left">
            <div className="ab-hero-eyebrow">Jurnal Budaya · Edisi 2025</div>
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
            <div className="ab-hero-stats">
              <div className="ab-hero-stat">
                <div className="ab-hero-stat-num">{dataArtikel.length}</div>
                <div className="ab-hero-stat-label">Artikel</div>
              </div>
              <div className="ab-hero-stat-div" />
              <div className="ab-hero-stat">
                <div className="ab-hero-stat-num">
                  {[...new Set(dataArtikel.map((a) => a.kategori))].length}
                </div>
                <div className="ab-hero-stat-label">Kategori</div>
              </div>
              <div className="ab-hero-stat-div" />
              <div className="ab-hero-stat">
                <div className="ab-hero-stat-num">∞</div>
                <div className="ab-hero-stat-label">Warisan</div>
              </div>
            </div>
            <div className="ab-hero-btns">
              <button
                className="ab-btn-gold"
                onClick={() =>
                  document
                    .querySelector(".ab-grid-wrap")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Mulai Membaca ↓
              </button>
              <Link to="/budaya" className="ab-btn-outline-white">
                ← Semua Budaya
              </Link>
            </div>
          </div>

          {/* Kanan — 3 preview kartu artikel */}
          <div className="ab-hero-right">
            <p
              style={{
                fontFamily: "'Lato',sans-serif",
                fontSize: "9px",
                letterSpacing: ".3em",
                color: "rgba(255,255,255,.3)",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Artikel Terbaru
            </p>
            {previewArtikel.map((a) => (
              <Link
                key={a.id}
                to={`/budaya/${a.id}`}
                className="ab-hero-preview-card"
              >
                <div className="ab-hero-preview-img">
                  <img
                    src={a.gambar}
                    alt={a.judul}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/100x100/2d1f0a/c9a84c?text=${a.kategori}`;
                    }}
                  />
                </div>
                <div>
                  <div className="ab-hero-preview-kat">{a.kategori}</div>
                  <div className="ab-hero-preview-title">{a.judul}</div>
                  <div className="ab-hero-preview-menit">⏱ {a.menit}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="ab-hero-scroll">
          <div className="ab-hero-scroll-dot" />
          <span className="ab-hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. TICKER
      ══════════════════════════════════════════ */}
      <div className="ab-ticker" aria-hidden="true">
        <div className="ab-ticker-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="ab-ticker-item">
              {item}
              <span className="ab-ticker-sep" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. SEARCH + FILTER
      ══════════════════════════════════════════ */}
      <div className="ab-controls">
        <div className="ab-controls-inner">
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
          <div className="ab-filters">
            {KATEGORI.map((kat) => (
              <button
                key={kat}
                className={`ab-pill ${aktif === kat ? "ab-active" : ""}`}
                onClick={() => setAktif(kat)}
              >
                {aktif === kat && "✓ "}
                {kat}
              </button>
            ))}
          </div>
          <div className="ab-count">
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
              5. FEATURED EDITORIAL
          ══════════════════════════════════════ */}
          {featured && (
            <div className="ab-featured-wrap">
              <div className="ab-sec-label ab-anim ab-up">Artikel Pilihan</div>
              <Link
                to={`/budaya/${featured.id}`}
                className="ab-feat-card ab-anim ab-scale"
              >
                <div className="ab-feat-img">
                  <img
                    src={featured.gambar}
                    alt={featured.judul}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/700x500/2d1f0a/c9a84c?text=${featured.judul}`;
                    }}
                  />
                  <div className="ab-feat-num">01</div>
                </div>
                <div className="ab-feat-body">
                  <div className="ab-feat-badge">
                    ✦ &nbsp;{featured.kategori}
                  </div>
                  <div className="ab-feat-title">{featured.judul}</div>
                  <div className="ab-feat-ring">{featured.ringkasan}</div>
                  <div className="ab-feat-meta">
                    <div className="ab-feat-meta-item">
                      📅 {featured.tanggal}
                    </div>
                    <div className="ab-feat-meta-dot" />
                    <div className="ab-feat-meta-item">⏱ {featured.menit}</div>
                    <div className="ab-feat-meta-dot" />
                    <div className="ab-feat-meta-item">
                      ✍️ {featured.penulis}
                    </div>
                  </div>
                  <div className="ab-feat-cta">
                    <div className="ab-feat-cta-line" />
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
            <div className="ab-grid-wrap">
              <div className="ab-grid-hdr">
                <div>
                  <div
                    className="ab-sec-label ab-anim ab-up"
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
                {lainnya.map((a, i) => (
                  <Link
                    key={a.id}
                    to={`/budaya/${a.id}`}
                    className={`ab-card ab-anim ab-up ab-d${Math.min((i % 4) + 1, 5)}`}
                  >
                    <div className="ab-card-img">
                      <img
                        src={a.gambar}
                        alt={a.judul}
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x300/2d1f0a/c9a84c?text=${a.judul}`;
                        }}
                      />
                      <span className="ab-card-badge">{a.kategori}</span>
                      <div className="ab-card-overlay">
                        <span className="ab-card-overlay-txt">
                          Baca Artikel →
                        </span>
                      </div>
                    </div>
                    <div className="ab-card-body">
                      <div className="ab-card-title">{a.judul}</div>
                      <div className="ab-card-ring">{a.ringkasan}</div>
                      <div className="ab-card-foot">
                        <div className="ab-card-meta">
                          <span>📅 {a.tanggal}</span>
                          <span>·</span>
                          <span>⏱ {a.menit}</span>
                        </div>
                        <span className="ab-card-arrow">→</span>
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
          7. CTA
      ══════════════════════════════════════════ */}
      <div className="ab-cta">
        <div className="ab-cta-bg" aria-hidden="true">
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
            <Link to="/trip" className="ab-cta-btn-p">
              Ikut Open Trip →
            </Link>
            <Link to="/budaya" className="ab-cta-btn-s">
              ← Semua Budaya
            </Link>
          </div>
          <div className="ab-cta-orn ab-anim ab-up ab-d4">✦ ❧ ✦</div>
        </div>
      </div>
    </div>
  );
}
