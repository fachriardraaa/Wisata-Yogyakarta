import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/User/register.css";

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

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Konfirmasi kata sandi tidak sama.");
      return;
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: fullName.trim() || "User",
      email: email.trim(),
      phone: phone.trim(),
      avatar: null,
      createdAt: new Date().toISOString(),
    };

    const users = loadUsers();
    const nextUsers = users.filter(
      (u) => String(u?.email || "").toLowerCase() !== String(newUser.email).toLowerCase()
    );
    nextUsers.unshift(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));

    // set current session user
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/dashboard");
  };

  return (
    <div className="registerPage">
      <div className="registerShell">
        <div className="registerHero" role="region" aria-label="Register">
          <div className="registerGlass">
            <div className="registerCopy">
              <h1 className="registerHeading">Buat Akun Baru</h1>
              <p className="registerSubheading">
                Isi data diri Anda untuk mulai menggunakan layanan Hiling Semata.
              </p>
            </div>

            <form className="registerForm" onSubmit={handleSubmit}>
              <div className="registerField">
                <label className="registerLabel" htmlFor="fullName">
                  Nama lengkap
                </label>
                <input
                  className="registerInput"
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Masukkan nama lengkap"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="registerField">
                <label className="registerLabel" htmlFor="email">
                  Email
                </label>
                <input
                  className="registerInput"
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

              <div className="registerField">
                <label className="registerLabel" htmlFor="phone">
                  Nomor HP
                </label>
                <input
                  className="registerInput"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Masukkan nomor HP"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="registerField">
                <label className="registerLabel" htmlFor="password">
                  Kata sandi
                </label>
                <div className="registerInputWrap">
                  <input
                    className="registerInput registerInputWithToggle"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Masukkan kata sandi"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="registerToggleBtn"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  >
                    {showPassword ? "Sembunyi" : "Lihat"}
                  </button>
                </div>
              </div>

              <div className="registerField">
                <label className="registerLabel" htmlFor="confirmPassword">
                  Konfirmasi kata sandi
                </label>
                <div className="registerInputWrap">
                  <input
                    className="registerInput registerInputWithToggle"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Konfirmasi kata sandi"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="registerToggleBtn"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-pressed={showConfirmPassword}
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Lihat konfirmasi kata sandi"}
                  >
                    {showConfirmPassword ? "Sembunyi" : "Lihat"}
                  </button>
                </div>
              </div>

              <button type="submit" className="registerPrimaryBtn">
                Daftar
              </button>

              <div className="registerDivider" aria-hidden="true">
                <span className="registerDividerLine" />
                <span className="registerDividerText">OR</span>
                <span className="registerDividerLine" />
              </div>

              <button type="button" className="registerGoogleBtn">
                Daftar dengan Google
              </button>
            </form>

            <div className="registerBottomText">
              <span>Sudah punya akun?</span>
              <Link to="/login" className="registerBottomLink">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;