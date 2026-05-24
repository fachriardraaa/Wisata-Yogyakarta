import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { dataBudaya } from "../../services/data/budayaData";
import "../../style/budaya-style/DetailBudaya.css";

/* ─── HOOK: Scroll-triggered animations ─────────────────────── */
function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll(".db-anim");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("db-visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── HOOK: Parallax hero ────────────────────────────────────── */
function useParallax(ref) {
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      ref.current.style.transform = `translateY(${scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);
}

/* ═══════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════ */
export default function DetailBudaya() {
  const { id } = useParams();
  const heroImgRef = useRef(null);

  const budaya = dataBudaya.find((b) => b.id === parseInt(id));
  const relasiData = budaya
    ? dataBudaya.filter((b) => budaya.relasi?.includes(b.id))
    : [];

  useScrollAnimation();
  useParallax(heroImgRef);

  /* Scroll ke atas saat halaman berganti */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* ── NOT FOUND ── */
  if (!budaya) {
    return (
      <div className="db-notfound">
        <h2>Budaya tidak ditemukan</h2>
        <p>Halaman yang kamu cari tidak tersedia.</p>
        <Link to="/budaya">← Kembali ke Daftar Budaya</Link>
      </div>
    );
  }

  return (
    <div className="db-root">
      {/* ══════════════════════════════════════════
          1. HERO — CINEMATIC PARALLAX
      ══════════════════════════════════════════ */}
      <section className="db-hero">
        {/* Bar atas seperti film */}
        <div className="db-hero-bar-top" />

        {/* Background parallax */}
        <div className="db-hero-img" ref={heroImgRef}>
          <img
            src={budaya.gambar}
            alt={budaya.nama}
            onError={(e) => {
              e.target.src = `https://placehold.co/1600x900/2d1f0a/c9a84c?text=${budaya.nama}`;
            }}
          />
        </div>

        {/* Overlay gelap sinematik */}
        <div className="db-hero-overlay" />

        {/* Breadcrumb */}
        <div className="db-hero-breadcrumb">
          <Link to="/">Beranda</Link>
          <span>›</span>
          <Link to="/budaya">Budaya</Link>
          <span>›</span>
          <span className="db-hero-breadcrumb-cur">{budaya.nama}</span>
        </div>

        {/* Konten teks */}
        <div className="db-hero-body">
          <div className="db-hero-kategori">{budaya.kategori}</div>
          <h1 className="db-hero-title">{budaya.nama}</h1>
          <p className="db-hero-tagline">{budaya.tagline}</p>

          {/* Strip info */}
          <div className="db-hero-strip">
            <div className="db-hero-strip-item">
              📍 <strong>{budaya.lokasi}</strong>
            </div>
            <div className="db-hero-strip-divider" />
            <div className="db-hero-strip-item">
              🕐 <strong>{budaya.waktu}</strong>
            </div>
            <div className="db-hero-strip-divider" />
            <div className="db-hero-strip-item">
              🎫 <strong>{budaya.tiket}</strong>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="db-hero-scroll">
          <div className="db-hero-scroll-line" />
          <span className="db-hero-scroll-text">Scroll</span>
        </div>

        {/* Bar bawah */}
        <div className="db-hero-bar-bottom" />
      </section>

      {/* ══════════════════════════════════════════
          2. MAIN CONTENT + SIDEBAR
      ══════════════════════════════════════════ */}
      <div className="db-main">
        {/* ── KIRI: ARTIKEL ── */}
        <article className="db-content">
          {/* Ornamen garis */}
          <div className="db-ornament-line db-anim db-anim--up">
            <div className="db-ornament-diamond" />
          </div>

          {/* Deskripsi sebagai lead quote */}
          <blockquote className="db-lead-quote db-anim db-anim--up db-delay-1">
            {budaya.deskripsi}
          </blockquote>

          {/* Paragraf artikel */}
          {budaya.paragraf.map((p, i) => (
            <p
              key={i}
              className={`db-para db-anim db-anim--up db-delay-${Math.min(i + 1, 5)}`}
              style={i > 0 ? { fontSize: "16px" } : {}}
            >
              {/* Hanya paragraf pertama yang punya drop cap */}
              {i > 0 ? p : p}
            </p>
          ))}

          {/* Divider ornamen */}
          <div className="db-section-divider db-anim db-anim--up">✦ ❧ ✦</div>

          {/* ── FAKTA SECTION — TIMELINE ── */}
          <div className="db-fakta-section db-anim db-anim--up">
            <div className="db-fakta-eyebrow">Tahukah Kamu?</div>
            <div className="db-fakta-title">
              Fakta Menarik tentang {budaya.nama}
            </div>
            <div className="db-fakta-list">
              {budaya.fakta.map((f, i) => (
                <div
                  key={i}
                  className={`db-fakta-item db-anim db-anim--left db-delay-${i + 1}`}
                >
                  <div className="db-fakta-dot">{i + 1}</div>
                  <p className="db-fakta-text">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── BUDAYA TERKAIT — MASONRY ── */}
          {relasiData.length > 0 && (
            <div className="db-relasi-section">
              <div className="db-relasi-header db-anim db-anim--up">
                <div>
                  <div className="db-relasi-eyebrow">── Jelajahi Lebih ──</div>
                  <div className="db-relasi-title">Budaya Terkait</div>
                </div>
                <Link to="/budaya" className="db-relasi-see-all">
                  Lihat Semua →
                </Link>
              </div>

              <div className="db-relasi-grid">
                {relasiData.map((rel, i) => (
                  <Link
                    key={rel.id}
                    to={`/budaya/${rel.id}`}
                    className={`db-relasi-card db-anim db-anim--scale db-delay-${i + 1}`}
                  >
                    <img
                      src={rel.gambar}
                      alt={rel.nama}
                      onError={(e) => {
                        e.target.src = `https://placehold.co/600x400/2d1f0a/c9a84c?text=${rel.nama}`;
                      }}
                    />
                    <div className="db-relasi-card-body">
                      <div className="db-relasi-card-kat">{rel.kategori}</div>
                      <div className="db-relasi-card-nama">{rel.nama}</div>
                      <div className="db-relasi-card-tagline">
                        {rel.tagline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* ── KANAN: SIDEBAR STICKY ── */}
        <aside className="db-sidebar">
          {/* Info Kunjungan */}
          <div className="db-info-box db-anim db-anim--right">
            <div className="db-info-box-header">
              <div className="db-info-box-eyebrow">Panduan Kunjungan</div>
              <div className="db-info-box-title">{budaya.nama}</div>
            </div>
            <div className="db-info-body">
              <div className="db-info-row">
                <div className="db-info-label">Lokasi</div>
                <div className="db-info-val">📍 {budaya.lokasi}</div>
              </div>
              <div className="db-info-divider" />
              <div className="db-info-row">
                <div className="db-info-label">Waktu Kunjungan</div>
                <div className="db-info-val">🕐 {budaya.waktu}</div>
              </div>
              <div className="db-info-divider" />
              <div className="db-info-row">
                <div className="db-info-label">Tiket Masuk</div>
                <div className="db-info-val">🎫 {budaya.tiket}</div>
              </div>
            </div>
          </div>

          {/* CTA Open Trip */}
          <div className="db-cta-box db-anim db-anim--right db-delay-1">
            <div className="db-cta-eyebrow">Pengalaman Nyata</div>
            <div className="db-cta-title">
              Rasakan {budaya.nama} Secara Langsung
            </div>
            <div className="db-cta-sub">
              Bergabunglah dalam open trip budaya bersama pemandu lokal
              berpengalaman.
            </div>
            <Link to="/trip" className="db-cta-btn">
              Lihat Open Trip →
            </Link>
          </div>

          {/* Tombol Navigasi */}
          <div className="db-nav-btns db-anim db-anim--right db-delay-2">
            <Link to="/budaya" className="db-btn-back">
              ← Kembali ke Daftar
            </Link>
            <Link to="/budaya/artikel" className="db-btn-artikel">
              📖 Baca Artikel Budaya
            </Link>
          </div>

          {/* Share */}
          <div className="db-share-box db-anim db-anim--right db-delay-3">
            <div className="db-share-label">Bagikan</div>
            <div className="db-share-btns">
              <a
                href={`https://wa.me/?text=Baca tentang ${budaya.nama} di Hiling Semata!`}
                target="_blank"
                rel="noreferrer"
                className="db-share-btn"
              >
                WA
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                className="db-share-btn"
              >
                FB
              </a>
              <button
                className="db-share-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link disalin!");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
