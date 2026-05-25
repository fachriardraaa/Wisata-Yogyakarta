import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Landing
import Home from "./pages/landing/Home";
import AboutUs from "./pages/landing/AboutUs";
import Contact from "./pages/landing/Contact";

// Wisata
import ListWisata from "./pages/wisata/ListWisata";
import DetailWisata from "./pages/wisata/DetailWisata";
import KategoriWisata from "./pages/wisata/KategoriWisata";

// Open Trip
import LandingTrip from "./pages/opentrip/LandingTrip";
import ListTrip from "./pages/opentrip/ListTrip";
import DetailTrip from "./pages/opentrip/DetailTrip";
import BookingTrip from "./pages/opentrip/BookingTrip";

// Budaya
import ListBudaya from "./pages/budaya/ListBudaya";
import DetailBudaya from "./pages/budaya/DetailBudaya";
import ArtikelBudaya from "./pages/budaya/ArtikelBudaya";

// User
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import RiwayatBooking from "./pages/user/RiwayatBooking";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Membungkus Routes dengan tag <main> secara semantic.
        minHeight digunakan agar footer tetap berada di bawah 
        meskipun isi konten halaman sedang sedikit/kosong.
      */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* Wisata */}
          <Route path="/wisata" element={<ListWisata />} />
          <Route path="/wisata/:id" element={<DetailWisata />} />
          <Route
            path="/wisata/kategori/:kategori"
            element={<KategoriWisata />}
          />

          {/* Open Trip */}
          <Route path="/opentrip" element={<LandingTrip />} />
          <Route path="/trip" element={<ListTrip />} />
          <Route path="/trip/:id" element={<DetailTrip />} />
          <Route path="/trip/booking/:id" element={<BookingTrip />} />

          {/* Budaya */}
          <Route path="/budaya" element={<ListBudaya />} />
          <Route path="/budaya/:id" element={<DetailBudaya />} />
          <Route path="/budaya/artikel" element={<ArtikelBudaya />} />

          {/* User */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/riwayat" element={<RiwayatBooking />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
