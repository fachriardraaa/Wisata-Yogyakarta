import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dataOpenTrip } from "../../services/data/OpenTrip";
import "../../style/OpenTrip/BookingTrip.css";

// ============================================================
// TEMPLATE HALAMAN - Booking Trip
// ============================================================

const BOOKING_STORAGE_KEY = "bookingHistory";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadBookingHistory() {
  const raw = localStorage.getItem(BOOKING_STORAGE_KEY);
  const data = safeJsonParse(raw, []);
  return Array.isArray(data) ? data : [];
}

function BookingTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mencari data trip berdasarkan ID
  const trip = dataOpenTrip.find((t) => t.id === id);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    nomorWa: "",
    jumlahOrang: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!trip) return <div className="not-found">Trip tidak ditemukan.</div>;

  const jumlahOrang = Number(formData.jumlahOrang || 0);
  const totalHarga = trip.harga * jumlahOrang;

  // PERUBAHAN DI SINI: Menghapus tipe data React.ChangeEvent
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    // Menampilkan dialog pop-up bawaan browser
    alert("Terima kasih! Pembayaran Anda akan segera diproses oleh admin.");
    
    // Setelah user klik "OK" pada pop-up, baris di bawah ini baru akan berjalan:
    navigate('/trip');
  };

  // PERUBAHAN DI SINI: Menghapus tipe data React.FormEvent
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: `book_${Date.now()}`,
      tripId: trip.id,
      tripNama: trip.nama,
      tanggalKeberangkatan: trip.tanggalKeberangkatan,
      lokasi: trip.lokasi,
      harga: trip.harga,
      ...formData,
      jumlahOrang,
      totalBayar: totalHarga,
      status: "Menunggu",
      createdAt: new Date().toISOString(),
    };

    const history = loadBookingHistory();
    history.unshift(payload);
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(history));

    console.log("Mengirim data ke Backend:", payload);
    alert("Booking Berhasil! Kami akan menghubungi Anda via WhatsApp.");
    navigate("/opentrip");
  };

  return (
    <section className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h2>Konfirmasi Booking</h2>
          <p>{trip.nama}</p>
        </div>

        <div className="booking-content">
          {/* FORM SECTION */}
          <form className="booking-form-card" onSubmit={handleSubmit}>
            <h3>Data Pemesan</h3>
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input 
                type="text" 
                name="namaLengkap" 
                required 
                placeholder="Masukkan nama sesuai KTP"
                onChange={handleChange} 
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="contoh@email.com"
                onChange={handleChange} 
              />
            </div>
            <div className="input-group">
              <label>Nomor WhatsApp</label>
              <input 
                type="tel" 
                name="nomorWa" 
                required 
                placeholder="0812xxxx"
                onChange={handleChange} 
              />
            </div>
            <div className="input-group">
              <label>Jumlah Peserta</label>
              <input 
                type="number" 
                name="jumlahOrang" 
                min="1" 
                max={trip.kuotaTersisa} 
                value={formData.jumlahOrang}
                onChange={handleChange} 
              />
            </div>
            <button type="submit" className="btn-confirm-booking">
              Bayar Sekarang
            </button>
          </form>

          {/* SUMMARY SECTION */}
          <div className="booking-summary-card">
            <h3>Ringkasan Pembayaran</h3>
            <div className="summary-item">
              <span>Harga per orang</span>
              <span>Rp {trip.harga.toLocaleString("id-ID")}</span>
            </div>
            <div className="summary-item">
              <span>Jumlah Peserta</span>
              <span>{formData.jumlahOrang} Orang</span>
            </div>
            <hr className="divider" />
            <div className="summary-total">
              <span>Total Bayar</span>
              <span className="total-price">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="booking-note">
            <small>* Pembayaran akan dikonfirmasi secara manual oleh admin setelah Anda melakukan transfer.</small>
            
            {/* Tombol OK Baru */}
            {/* Tombol pemicu pop-up */}
                <button onClick={handleConfirm} className="btn-ok">
                  Konfirmasi Pembayaran
                </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingTrip;