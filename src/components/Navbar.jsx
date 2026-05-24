import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { name: "Beranda", path: "/" },
  { name: "Wisata", path: "/wisata" },
  { name: "Budaya", path: "/budaya" },
  { name: "Open Trip", path: "/opentrip" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Kontak", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  /* Bayangan saat scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Tutup menu saat pindah halaman */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* Lock scroll saat mobile menu buka */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-inner">
          {/* ── LOGO ── */}
          <Link to="/" className="nav-logo">
            <img
              src="../src/assets/logo/logo.png"
              alt="Hiling Semata"
              className="nav-logo-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback teks */}
            <span className="nav-logo-text" style={{ display: "none" }}>
              <span className="nav-logo-hs">HS</span>
              <span className="nav-logo-words">
                <span>
                  <span className="nav-logo-hiling">Hiling</span>
                  <span className="nav-logo-semata"> Semata</span>
                </span>
                <span className="nav-logo-sub">Tour & Travel</span>
              </span>
            </span>
          </Link>

          {/* ── LINKS DESKTOP ── */}
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "nav-link--active" : ""}`}
              >
                {link.name}
                <span className="nav-link-bar" />
              </Link>
            ))}
          </div>

          {/* ── AKSI KANAN ── */}
          <div className="nav-actions">
            <Link to="/login" className="nav-btn-login">
              Masuk
            </Link>
            <Link to="/register" className="nav-btn-register">
              Daftar
            </Link>
          </div>

          {/* ── HAMBURGER MOBILE ── */}
          <button
            className={`nav-hamburger ${menuOpen ? "nav-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="nav-ham-line" />
            <span className="nav-ham-line" />
            <span className="nav-ham-line" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nav-mobile ${menuOpen ? "nav-mobile--open" : ""}`}>
        <div className="nav-mobile-inner">
          <div className="nav-mobile-links">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-mobile-link ${isActive(link.path) ? "nav-mobile-link--active" : ""}`}
                style={{ animationDelay: `${i * 0.055}s` }}
              >
                <span className="nav-mobile-num">0{i + 1}</span>
                {link.name}
                <span className="nav-mobile-arrow">→</span>
              </Link>
            ))}
          </div>

          <div className="nav-mobile-btns">
            <Link to="/login" className="nav-mobile-btn nav-mobile-btn--ghost">
              Masuk
            </Link>
            <Link
              to="/register"
              className="nav-mobile-btn nav-mobile-btn--solid"
            >
              Daftar Sekarang
            </Link>
          </div>

          <div className="nav-mobile-footer">
            © 2025 Hiling Semata · Yogyakarta
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
