import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 1. Cek status login user dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser(null);
      }
    }
  }, [location]); // Cek ulang setiap kali pindah halaman

  // 2. Menutup menu mobile saat berpindah rute
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // 3. Mengunci scroll body saat menu mobile aktif
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // 4. Menutup dropdown profil saat klik di luar area menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // Fungsi penanganan keluar akun (Logout)
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data sesi login
    setUser(null);
    setDropdownOpen(false);
    navigate("/"); // Kembalikan ke halaman beranda
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-box">HS</div>
            <div className="logo-text">
              <h2>
                Hiling <span>Semata</span>
              </h2>
              <p>TOUR & TRAVEL</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Buttons / User Profile Kondisional */}
          <div className="nav-buttons">
            {user ? (
              /* Tampilan Jika Sudah Login (Nama + Foto + Dropdown) */
              <div className="nav-user-profile" ref={dropdownRef}>
                <button
                  className="profile-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={
                      user.photo ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                    }
                    alt={user.username}
                    className="profile-avatar"
                  />
                  <span className="profile-name">
                    {user.username || user.name}
                  </span>
                  <span className={`profile-arrow ${dropdownOpen ? "up" : ""}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <p className="user-title">{user.name}</p>
                      <p className="user-email">
                        {user.email || "User Member"}
                      </p>
                    </div>
                    <Link to="/dashboard" className="dropdown-item">
                      📁 Dashboard
                    </Link>
                    <Link to="/dashboard/riwayat" className="dropdown-item">
                      ⏳ Riwayat Booking
                    </Link>
                    <hr className="dropdown-divider" />
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      🚪 Keluar Akun
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Tampilan Default Jika Belum Login */
              <>
                <Link to="/login" className="btn-login">
                  Masuk
                </Link>
                <Link to="/register" className="btn-register">
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu Mobile */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-link ${
              isActive(link.path) ? "mobile-active" : ""
            }`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {link.name}
          </Link>
        ))}

        {/* Tombol Mobile Kondisional */}
        <div className="mobile-buttons">
          {user ? (
            <div className="mobile-user-info">
              <div className="mobile-profile-card">
                <img
                  src={
                    user.photo ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100"
                  }
                  alt={user.username}
                />
                <div>
                  <h4>{user.username || user.name}</h4>
                  <p>{user.email || "Member Hiling Semata"}</p>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="btn-register mobile-btn text-center"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-login mobile-btn w-full"
              >
                Keluar Akun
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login mobile-btn">
                Masuk
              </Link>
              <Link to="/register" className="btn-register mobile-btn">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
