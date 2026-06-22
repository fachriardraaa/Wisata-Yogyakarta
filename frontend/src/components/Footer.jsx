import { Link } from "react-router-dom";
import "./Footer.css";

const LINKS = {
  Jelajahi: [
    { name: "Wisata", path: "/wisata" },
    { name: "Budaya", path: "/budaya" },
    { name: "Open Trip", path: "/opentrip" },
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
      <div className="footer-container">

        {/* LEFT */}
        <div>
          <Link to="/" className="footer-logo">
            <div className="logo-box">HS</div>

            <div className="logo-text">
              <h2>
                Hiling <span>Semata</span>
              </h2>
              <p>TOUR & TRAVEL</p>
            </div>
          </Link>

          <p className="footer-description">
            Jelajahi keindahan wisata dan kekayaan budaya
            Daerah Istimewa Yogyakarta — dari pantai,
            gunung, keraton, hingga tradisi yang tak lekang waktu.
          </p>

          <div className="footer-contact">
            <p>📍 Yogyakarta, Indonesia</p>
            <p>✉️ hello@hilingsemata.id</p>
            <p>📞 +62 812-3456-7890</p>
          </div>
        </div>

        {/* LINKS */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title} className="footer-links">

            <h3>{title}</h3>

            {items.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.name}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Hiling Semata.
          Dibuat dengan ❤️ untuk Yogyakarta.
        </p>

        <div className="footer-bottom-links">
          <Link to="/privacy">Privasi</Link>
          <Link to="/terms">Syarat</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}