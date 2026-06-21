import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/User/login.css";

const USERS_STORAGE_KEY = "users";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadUsers() {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  const data = safeJsonParse(raw, []);
  return Array.isArray(data) ? data : [];
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = loadUsers();
    const match = users.find(
      (u) => String(u?.email || "").toLowerCase() === String(email).toLowerCase()
    );

    const fallbackName = String(email || "User").includes("@")
      ? String(email).split("@")[0]
      : "User";

    // Simulasi login berhasil (tanpa backend)
    const userData = match
      ? match
      : {
          id: `usr_${Date.now()}`,
          name: fallbackName,
          email: email,
          avatar: null,
          createdAt: new Date().toISOString(),
        };

    // Simpan ke localStorage agar Navbar bisa mendeteksi status login
    localStorage.setItem("user", JSON.stringify(userData));

    // Arahkan ke dashboard setelah login
    navigate("/dashboard");
  };

  return (
    <div className="authPage">
      <div className="authShell">
        <div className="authHero" role="region" aria-label="Login">
          <div className="authGlass">
            <div className="authCopy">
              <h1 className="authHeading">Selamat Datang</h1>
              <p className="authSubheading">
                Masuk untuk merencanakan petualanganmu di Yogyakarta.
              </p>
            </div>

            <form onSubmit={handleLogin} className="authForm">
              <div className="authField">
                <label className="authLabel" htmlFor="email">
                  Email
                </label>
                <input
                  className="authInput"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="authField">
                <label className="authLabel" htmlFor="password">
                  Kata sandi
                </label>
                <div className="authInputWrap">
                  <input
                    className="authInput authInputWithToggle"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan kata sandi"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="authToggleBtn"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  >
                    {showPassword ? "Sembunyi" : "Lihat"}
                  </button>
                </div>
              </div>

              <div className="authHelpRow">
                <button
                  type="button"
                  className="authForgot"
                  onClick={() => {
                    // placeholder aksi
                  }}
                >
                  Lupa sandi?
                </button>
              </div>

              <button type="submit" className="authPrimaryBtn">
                Masuk
              </button>

              <div className="authDivider" aria-hidden="true">
                <span className="authDividerLine" />
                <span className="authDividerText">OR</span>
                <span className="authDividerLine" />
              </div>

              <button type="button" className="authGoogleBtn">
                Masuk dengan Google
              </button>
            </form>

            <div className="authBottomText">
              <span>Belum punya akun?</span>
              <Link to="/register" className="authBottomLink">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
