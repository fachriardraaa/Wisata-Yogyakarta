import { Link } from "react-router-dom";
import "./Footer.css";

const LINKS = {
  Jelajahi: [
    { name: "Wisata", path: "/wisata" },
    { name: "Budaya", path: "/budaya" },
    { name: "Open Trip", path: "/trip" },
    { name: "Artikel Budaya", path: "/budaya/artikel" },
  ],
  Informasi: [
    { name: "Tentang Kami", path: "/about" },
    { name: "Kontak", path: "/contact" },
  ],
  Akun: [
    { name: "Masuk", path: "/login" },
    { name: "Daftar", path: "/register" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Riwayat Booking", path: "/dashboard/riwayat" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* ── TOP ── */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src="../src/assets/logo/logo.png"
                alt="Hiling Semata"
                className="footer-logo-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="footer-logo-text" style={{ display: "none" }}>
                <span className="footer-logo-hs">HS</span>
                <span className="footer-logo-words">
                  <span>
                    <span className="footer-logo-hiling">Hiling</span>
                    <span className="footer-logo-semata"> Semata</span>
                  </span>
                  <span className="footer-logo-sub">Tour & Travel</span>
                </span>
              </span>
            </Link>

            <p className="footer-tagline">
              Jelajahi keindahan wisata dan kekayaan budaya Daerah Istimewa
              Yogyakarta — dari pantai, gunung, keraton, hingga tradisi yang tak
              lekang waktu.
            </p>

            <div className="footer-contacts">
              <div className="footer-contact-item">
                <span>📍</span>
                <span>Yogyakarta, Indonesia</span>
              </div>
              <div className="footer-contact-item">
                <span>📧</span>
                <span>hello@hilingsemata.id</span>
              </div>
              <div className="footer-contact-item">
                <span>📱</span>
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links-grid">
            {Object.entries(LINKS).map(([group, links]) => (
              <div key={group}>
                <div className="footer-link-group-title">{group}</div>
                <ul className="footer-link-list">
                  {links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="footer-link">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="footer-divider" />

        {/* ── BOTTOM ── */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} <span>Hiling Semata</span>. Dibuat
            dengan ❤️ untuk Yogyakarta.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">
              Privasi
            </Link>
            <span className="footer-dot">·</span>
            <Link to="/terms" className="footer-bottom-link">
              Syarat
            </Link>
            <span className="footer-dot">·</span>
            <Link to="/sitemap" className="footer-bottom-link">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
