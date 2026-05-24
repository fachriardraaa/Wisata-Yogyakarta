import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/User/riwayat.css";
import { dataOpenTrip } from "../../services/data/OpenTrip";

const BOOKING_STORAGE_KEY = "bookingHistory";

const TRIP_BY_ID = new Map(
  (Array.isArray(dataOpenTrip) ? dataOpenTrip : []).map((t) => [String(t.id), t])
);

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

function formatRupiah(value) {
  const numberValue = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numberValue);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function parseDateOnly(isoDateString) {
  if (!isoDateString) return null;
  const parts = String(isoDateString).split("-");
  if (parts.length < 3) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function formatDateId(date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTripFromBooking(booking) {
  const tripId = booking?.tripId != null ? String(booking.tripId) : null;
  return tripId ? TRIP_BY_ID.get(tripId) : null;
}

function getTripDate(booking) {
  const raw = booking?.tanggalKeberangkatan || getTripFromBooking(booking)?.tanggalKeberangkatan;
  if (!raw) return null;
  return parseDateOnly(raw);
}

function getTripLokasi(booking) {
  return booking?.lokasi || getTripFromBooking(booking)?.lokasi || "";
}

function deriveTripStatus(booking) {
  const rawStatus = String(booking?.status || "");
  const normalized = rawStatus.toLowerCase();
  if (normalized.includes("batal")) return "Dibatalkan";

  const tripDate = getTripDate(booking);
  if (tripDate) {
    const tripKey = toDateKey(tripDate);
    const todayKey = toDateKey(new Date());
    if (tripKey < todayKey) return "Selesai";
    if (tripKey === todayKey) return "Berlangsung";
    return "Terjadwal";
  }

  if (normalized.includes("selesai") || normalized.includes("ended") || normalized.includes("completed")) {
    return "Selesai";
  }
  if (normalized.includes("jalan") || normalized.includes("berlangsung") || normalized.includes("running")) {
    return "Berlangsung";
  }
  return rawStatus || "Menunggu";
}

function statusKind(status) {
  if (status === "Selesai") return "done";
  if (status === "Berlangsung") return "progress";
  if (status === "Dibatalkan") return "cancel";
  return "schedule";
}

function RiwayatBooking() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all"); // all | done | progress | cancel

  useEffect(() => {
    const savedUser = safeJsonParse(localStorage.getItem("user"), null);
    if (!savedUser) {
      navigate("/login");
      return;
    }
    setUser(savedUser);
    setBookings(loadBookingHistory());
  }, [navigate]);

  const userBookings = useMemo(() => {
    if (!user?.email) return bookings;
    return bookings.filter((b) => {
      if (!b?.email) return true;
      return String(b.email).toLowerCase() === String(user.email).toLowerCase();
    });
  }, [bookings, user?.email]);

  const sortedBookings = useMemo(() => {
    return [...userBookings].sort(
      (a, b) =>
        new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime()
    );
  }, [userBookings]);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedBookings
      .map((b) => {
        const trip = getTripFromBooking(b);
        const status = deriveTripStatus(b);
        const kind = statusKind(status);
        const tripDate = getTripDate(b);
        const tanggal = tripDate ? formatDateId(tripDate) : "-";
        const lokasi = getTripLokasi(b) || "-";
        const kategori = trip?.kategori || "";
        const durasi = trip?.durasi || "";
        const harga = trip?.harga != null ? Number(trip.harga) : null;
        const peserta = Number(b?.jumlahOrang || 0);
        const totalBayar = Number(b?.totalBayar || 0);
        const pricePerPerson = harga != null ? harga : peserta ? Math.round(totalBayar / peserta) : totalBayar;
        const detailParts = [kategori, durasi, lokasi, tanggal].filter((x) => x && x !== "-");
        const detail = detailParts.join(" • ");

        return {
          id: b?.id,
          status,
          kind,
          tripName: b?.tripNama || trip?.nama || "-",
          tripDetail: detail || "-",
          pemesan: b?.namaLengkap || user?.name || "-",
          peserta,
          pricePerPerson,
          totalBayar,
          createdAt: b?.createdAt ? new Date(b.createdAt).toLocaleString("id-ID") : "-",
        };
      })
      .filter((r) => {
        if (tab === "done") return r.kind === "done";
        if (tab === "progress") return r.kind === "progress";
        if (tab === "cancel") return r.kind === "cancel";
        return true;
      })
      .filter((r) => {
        if (!q) return true;
        return (
          String(r.tripName).toLowerCase().includes(q) ||
          String(r.tripDetail).toLowerCase().includes(q) ||
          String(r.pemesan).toLowerCase().includes(q)
        );
      });
  }, [sortedBookings, search, tab, user?.name]);

  const stats = useMemo(() => {
    let done = 0;
    let progress = 0;
    let cancel = 0;
    let totalPaid = 0;
    for (const b of sortedBookings) {
      const status = deriveTripStatus(b);
      const kind = statusKind(status);
      if (kind === "done") done += 1;
      else if (kind === "progress") progress += 1;
      else if (kind === "cancel") cancel += 1;
      totalPaid += Number(b?.totalBayar || 0);
    }
    return {
      total: sortedBookings.length,
      done,
      progress,
      cancel,
      totalPaid,
    };
  }, [sortedBookings]);

  if (!user) return null;

  return (
    <div className="riwayat-page">
      <div className="riwayat-shell">
        <div className="riwayat-container">
          <div className="riwayat-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Profile</span>
          </div>

          <div className="riwayat-topRow">
            <h1 className="riwayat-greeting">Hi, {user.name}!</h1>
            <div className="riwayat-actions">
              <Link to="/dashboard" className="riwayat-actionBtn">
                Dashboard
              </Link>
              <Link to="/trip" className="riwayat-actionBtn riwayat-actionBtnPrimary">
                Booking Trip
              </Link>
            </div>
          </div>

          <div className="riwayat-stats">
            <div className="riwayat-statCard">
              <div className="riwayat-statLeft">
                <div className="riwayat-statIcon">T</div>
                <div>
                  <div className="riwayat-statValue">{stats.total}</div>
                  <div className="riwayat-statLabel">Trips</div>
                  <div className="riwayat-statSub">Total booking trip</div>
                </div>
              </div>
              <Link to="/trip" className="riwayat-statLink">
                Add Trip →
              </Link>
            </div>

            <div className="riwayat-statCard">
              <div className="riwayat-statLeft">
                <div className="riwayat-statIcon">↻</div>
                <div>
                  <div className="riwayat-statValue">{stats.progress}</div>
                  <div className="riwayat-statLabel">Progress</div>
                  <div className="riwayat-statSub">Trip sedang dijalani</div>
                </div>
              </div>
              <button type="button" className="riwayat-statLink" onClick={() => setTab("progress")}>
                Lihat →
              </button>
            </div>

            <div className="riwayat-statCard">
              <div className="riwayat-statLeft">
                <div className="riwayat-statIcon">✓</div>
                <div>
                  <div className="riwayat-statValue">{stats.done}</div>
                  <div className="riwayat-statLabel">Terjalani</div>
                  <div className="riwayat-statSub">Trip selesai</div>
                </div>
              </div>
              <button type="button" className="riwayat-statLink" onClick={() => setTab("done")}>
                Lihat →
              </button>
            </div>
          </div>

          <div className="riwayat-searchBar">
            <div className="riwayat-searchLeft">
              <div className="riwayat-searchTitle">Check the Trip</div>
              <div className="riwayat-searchSub">Cari berdasarkan nama trip, lokasi, atau pemesan</div>
            </div>
            <div className="riwayat-searchField">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="riwayat-searchInput"
                placeholder="Input nama trip / lokasi"
              />
            </div>
            <button type="button" className="riwayat-searchBtn">
              Find Your Trip
            </button>
          </div>

          <div className="riwayat-tabs">
            <button
              type="button"
              className={`riwayat-tab ${tab === "all" ? "is-active" : ""}`}
              onClick={() => setTab("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`riwayat-tab ${tab === "progress" ? "is-active" : ""}`}
              onClick={() => setTab("progress")}
            >
              Progress
            </button>
            <button
              type="button"
              className={`riwayat-tab ${tab === "done" ? "is-active" : ""}`}
              onClick={() => setTab("done")}
            >
              Terjalani
            </button>
            <button
              type="button"
              className={`riwayat-tab ${tab === "cancel" ? "is-active" : ""}`}
              onClick={() => setTab("cancel")}
            >
              Dibatalkan
            </button>
          </div>

          {/* Content */}
          <div className="riwayat-tableCard">
            <div className="riwayat-tableHeader">
              <h2 className="riwayat-tableTitle">Requested Trips</h2>
              <div className="riwayat-tableMeta">Total: {rows.length} item</div>
            </div>

            {rows.length === 0 ? (
              <div className="riwayat-emptyWrap">
                <div className="riwayat-emptyNotice">Tidak ada data yang cocok.</div>
              </div>
            ) : (
              <div className="riwayat-tableWrap">
                <table className="riwayat-table">
                  <thead>
                    <tr>
                      <th className="riwayat-th">Status</th>
                      <th className="riwayat-th">Trip</th>
                      <th className="riwayat-th">Pemesan</th>
                      <th className="riwayat-th">Harga</th>
                      <th className="riwayat-th">Peserta</th>
                      <th className="riwayat-th">Total</th>
                      <th className="riwayat-th">Dibuat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="riwayat-tr">
                        <td className={`riwayat-td riwayat-status-${r.kind}`}>
                          <span className="riwayat-statusWrap">
                            <span className="riwayat-statusDot" />
                            <span className="riwayat-statusPill">{r.status}</span>
                          </span>
                        </td>
                        <td className="riwayat-td riwayat-tripCell">
                          <div className="riwayat-tripName">{r.tripName}</div>
                          <div className="riwayat-tripDetail">{r.tripDetail}</div>
                        </td>
                        <td className="riwayat-td">
                          <span className="riwayat-muted">{r.pemesan}</span>
                        </td>
                        <td className="riwayat-td">
                          <span className="riwayat-money">{formatRupiah(r.pricePerPerson)}</span>
                          <div className="riwayat-subCell">per orang</div>
                        </td>
                        <td className="riwayat-td">
                          <span className="riwayat-muted">{r.peserta} orang</span>
                        </td>
                        <td className="riwayat-td">
                          <span className="riwayat-money">{formatRupiah(r.totalBayar)}</span>
                        </td>
                        <td className="riwayat-td">
                          <span className="riwayat-muted">{r.createdAt}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiwayatBooking;