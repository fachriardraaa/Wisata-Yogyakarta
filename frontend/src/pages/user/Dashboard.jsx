import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../style/User/dashboard.css";

function formatRupiah(value) {
  const numberValue = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numberValue);
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function calcDaysSince(isoDateString) {
  if (!isoDateString) return 0;
  const start = new Date(isoDateString).getTime();
  const now = Date.now();
  if (Number.isNaN(start)) return 0;
  const diff = Math.max(0, now - start);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatElapsed(ms) {
  const safeMs = Math.max(0, Number(ms || 0));
  const totalSeconds = Math.floor(safeMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const hms = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  return days > 0 ? `${days}d ${hms}` : hms;
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

function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function addDays(date, days) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

function getTripDate(booking) {
  const rawFromBooking = booking?.tanggalKeberangkatan;
  if (!rawFromBooking) return null;
  return parseDateOnly(rawFromBooking);
}

function getTripLokasi(booking) {
  return booking?.lokasi || "";
}

function deriveTripStatus(booking) {
  const rawStatus = String(booking?.status || "");
  const normalized = rawStatus.toLowerCase();
  if (normalized.includes("batal") || normalized.includes("cancel")) return "Dibatalkan";
  if (normalized.includes("selesai") || normalized.includes("completed")) return "Selesai";
  if (normalized.includes("terjalani") || normalized.includes("confirm") || normalized.includes("jalan") || normalized.includes("running") || normalized.includes("berlangsung")) {
    return "Terjalani";
  }
  if (normalized.includes("pending") || normalized.length === 0) return "Pending";

  const tripDate = getTripDate(booking);
  if (tripDate) {
    const tripKey = toDateKey(tripDate);
    const todayKey = toDateKey(new Date());
    if (tripKey < todayKey) return "Selesai";
    if (tripKey === todayKey) return "Terjalani";
    return "Pending";
  }

  return "Pending";
}

function intensityClass(count) {
  const c = Number(count || 0);
  if (c <= 0) return "dash-intensity-0";
  if (c === 1) return "dash-intensity-1";
  if (c <= 3) return "dash-intensity-2";
  return "dash-intensity-3";
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);
  const [search, setSearch] = useState("");
  const [nowTick, setNowTick] = useState(() => Date.now());

  const [calendarMode, setCalendarMode] = useState("month"); // week | month | year
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const savedUser = safeJsonParse(localStorage.getItem("user"), null);
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const hydratedUser = savedUser?.createdAt
      ? savedUser
      : { ...savedUser, createdAt: new Date().toISOString() };
    if (!savedUser?.createdAt) {
      localStorage.setItem("user", JSON.stringify(hydratedUser));
    }
    setUser(hydratedUser);
  }, [navigate]);

  useEffect(() => {
    let isActive = true;

    async function loadBookings() {
      if (!user?.email) {
        setBookings([]);
        setBookingsLoading(false);
        return;
      }

      setBookingsLoading(true);

      try {
        const response = await api.get("/bookings", {
          params: { email: user.email },
        });

        if (!isActive) return;
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Gagal mengambil data booking:", error);
        if (!isActive) return;
        setBookings([]);
      } finally {
        if (isActive) setBookingsLoading(false);
      }
    }

    loadBookings();

    return () => {
      isActive = false;
    };
  }, [user?.email]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const userBookings = useMemo(() => {
    if (!user?.email) return bookings;
    return bookings.filter((b) => {
      if (!b?.email) return true;
      return String(b.email).toLowerCase() === String(user.email).toLowerCase();
    });
  }, [bookings, user?.email]);

  const summary = useMemo(() => {
    const totalTrip = userBookings.length;
    const totalPeserta = userBookings.reduce(
      (acc, item) => acc + Number(item?.jumlahOrang || 0),
      0
    );
    const totalBayar = userBookings.reduce(
      (acc, item) => acc + Number(item?.totalBayar || 0),
      0
    );

    const latest = [...userBookings]
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      )
      .at(0);

    return {
      totalTrip,
      totalPeserta,
      totalBayar,
      latestTripNama: latest?.tripNama || "-",
    };
  }, [userBookings]);

  const statusCounts = useMemo(() => {
    let pending = 0;
    let running = 0;
    let cancelled = 0;
    let ended = 0;

    for (const item of userBookings) {
      const s = deriveTripStatus(item);
      if (s === "Pending") pending += 1;
      else if (s === "Terjalani") running += 1;
      else if (s === "Dibatalkan") cancelled += 1;
      else if (s === "Selesai") ended += 1;
    }

    return { ended, running, cancelled, pending };
  }, [userBookings]);

  const bookingsNewest = useMemo(() => {
    return [...userBookings].sort(
      (a, b) =>
        new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime()
    );
  }, [userBookings]);

  const contribByDate = useMemo(() => {
    const map = {};
    for (const item of userBookings) {
      const created = item?.createdAt ? new Date(item.createdAt) : null;
      if (!created || Number.isNaN(created.getTime())) continue;
      const key = toDateKey(created);
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  }, [userBookings]);

  const availableYears = useMemo(() => {
    const years = new Set([new Date().getFullYear()]);
    for (const key of Object.keys(contribByDate)) {
      const y = Number(String(key).slice(0, 4));
      if (y) years.add(y);
    }
    return [...years].sort((a, b) => a - b);
  }, [contribByDate]);

  const recentBookings = useMemo(() => {
    return [...userBookings]
      .sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() -
          new Date(a?.createdAt || 0).getTime()
      )
      .slice(0, 5);
  }, [userBookings]);

  const filteredRecentBookings = useMemo(() => {
    if (!search.trim()) return recentBookings;
    const q = search.trim().toLowerCase();
    return recentBookings.filter((b) =>
      String(b?.tripNama || "").toLowerCase().includes(q)
    );
  }, [recentBookings, search]);

  const historyBookings = useMemo(() => {
    return [...userBookings].sort((a, b) => {
      const nameCompare = String(a?.tripNama || "").localeCompare(String(b?.tripNama || ""), "id");
      if (nameCompare !== 0) return nameCompare;

      const dateA = new Date(a?.tanggalKeberangkatan || a?.createdAt || 0).getTime();
      const dateB = new Date(b?.tanggalKeberangkatan || b?.createdAt || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;

      return String(b?.id || "").localeCompare(String(a?.id || ""), "id");
    });
  }, [userBookings]);

  const cancelableBookings = useMemo(() => {
    return bookingsNewest
      .filter((b) => {
        const status = deriveTripStatus(b);
        return status === "Pending" || status === "Terjalani";
      })
      .slice(0, 4);
  }, [bookingsNewest]);

  const tripsFollowedNewest = useMemo(() => {
    return bookingsNewest.slice(0, 3);
  }, [bookingsNewest]);

  const agendaUpcoming = useMemo(() => {
    const todayKey = toDateKey(new Date());
    const upcoming = userBookings
      .map((b) => {
        const tripDate = getTripDate(b);
        const tripKey = tripDate ? toDateKey(tripDate) : null;
        return {
          ...b,
          _tripDate: tripDate,
          _tripKey: tripKey,
          _lokasi: getTripLokasi(b),
          _derivedStatus: deriveTripStatus(b),
        };
      })
      .filter((b) => b._tripKey && b._tripKey >= todayKey)
      .filter((b) => b._derivedStatus !== "Dibatalkan" && b._derivedStatus !== "Selesai")
      .sort((a, b) => String(a._tripKey).localeCompare(String(b._tripKey)));

    return upcoming.slice(0, 3);
  }, [userBookings]);

  const accountDays = calcDaysSince(user?.createdAt);
  const accountElapsed = user?.createdAt
    ? formatElapsed(nowTick - new Date(user.createdAt).getTime())
    : "00:00:00";

  async function handleCancelBooking(bookingId, bookingName) {
    const ok = window.confirm(`Batalkan booking "${bookingName}"?`);
    if (!ok) return;

    setCancellingBookingId(bookingId);
    try {
      await api.patch(`/bookings/${bookingId}/cancel`, {
        email: user.email,
      });

      setBookings((current) =>
        current.map((item) =>
          String(item.id) === String(bookingId)
            ? { ...item, status: "cancelled" }
            : item
        )
      );
    } catch (error) {
      console.error("Gagal membatalkan booking:", error);
      alert(
        error?.response?.data?.message || "Gagal membatalkan booking, silakan coba lagi."
      );
    } finally {
      setCancellingBookingId(null);
    }
  }

  const monthTitle = useMemo(() => {
    const d = new Date(calendarYear, calendarMonth, 1);
    return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(d);
  }, [calendarYear, calendarMonth]);

  const monthCells = useMemo(() => {
    const first = new Date(calendarYear, calendarMonth, 1);
    const firstDay = first.getDay(); // 0..6 (Sun..Sat)
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(calendarYear, calendarMonth, day));
    }
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [calendarYear, calendarMonth]);

  const yearMonthTotals = useMemo(() => {
    const totals = new Array(12).fill(0);
    for (const [key, value] of Object.entries(contribByDate)) {
      if (!key.startsWith(String(calendarYear))) continue;
      const month = Number(String(key).slice(5, 7));
      if (!month) continue;
      totals[month - 1] += Number(value || 0);
    }
    return totals;
  }, [contribByDate, calendarYear]);

  const weekDays = useMemo(() => {
    const base = startOfWeek(addDays(new Date(), weekOffset * 7));
    return new Array(7).fill(0).map((_, idx) => addDays(base, idx));
  }, [weekOffset]);

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-container">
          {/* Toolbar (like reference) */}
          <div className="dashboard-toolbar">
            <div className="dashboard-searchRow">
              <div className="dashboard-searchWrap">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trip"
                  className="dashboard-searchInput"
                />
                <div className="dashboard-searchHint">
                  ⌘ F
                </div>
              </div>
            </div>

            <div className="dashboard-toolbarRight">
              <div className="dashboard-toolbarIcons">
                <button
                  type="button"
                  className="dashboard-iconBtn"
                  aria-label="Inbox"
                >
                  ✉
                </button>
                <button
                  type="button"
                  className="dashboard-iconBtn"
                  aria-label="Notifications"
                >
                  🔔
                </button>
              </div>

              <div className="dashboard-userPill">
                <div className="dashboard-avatar">
                  {String(user.name || "U").charAt(0).toUpperCase()}
                </div>
                <div className="dashboard-userMeta">
                  <p className="dashboard-userName">{user.name}</p>
                  <p className="dashboard-userEmail">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Title row */}
          <div className="dashboard-titleRow">
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">
                Plan, prioritize, and accomplish your trips with ease.
              </p>
            </div>
            <div className="dashboard-ctaRow">
              <Link
                to="/trip"
                className="dashboard-btnPrimary"
              >
                + Add Trip
              </Link>
              <Link
                to="/dashboard/riwayat"
                className="dashboard-btnSecondary"
              >
                Import Data
              </Link>
            </div>
          </div>

          {/* Grid */}
          <div className="dashboard-grid">
            {/* Stat cards */}
            <div className="dash-statPrimary">
              <div className="dash-cardHead">
                <div>
                  <p className="dash-statLabelPrimary">Total Booking</p>
                  <p className="dash-statValuePrimary">{summary.totalTrip}</p>
                  <p className="dash-statSubPrimary">total booking</p>
                </div>
                <div className="dash-statIconPrimary">↗</div>
              </div>
            </div>

            <div className="dash-statCard">
              <div className="dash-cardHead">
                <div>
                  <p className="dash-statLabel">Pending Booking</p>
                  <p className="dash-statValue">{statusCounts.pending}</p>
                  <p className="dash-statSub">menunggu konfirmasi</p>
                  <p className="dash-statNote">booking baru</p>
                </div>
                <div className="dash-statIcon">↗</div>
              </div>
            </div>

            <div className="dash-statCard">
              <div className="dash-cardHead">
                <div>
                  <p className="dash-statLabel">Terjalani Booking</p>
                  <p className="dash-statValue">{statusCounts.running}</p>
                  <p className="dash-statSub">booking aktif</p>
                  <p className="dash-statNote">confirmed / running</p>
                </div>
                <div className="dash-statIcon">↗</div>
              </div>
            </div>

            <div className="dash-statCard">
              <div className="dash-cardHead">
                <div>
                  <p className="dash-statLabel">Cancel Booking</p>
                  <p className="dash-statValue">{statusCounts.cancelled}</p>
                  <p className="dash-statSub">booking dibatalkan</p>
                  <p className="dash-statNote">cancelled</p>
                </div>
                <div className="dash-statIcon">↗</div>
              </div>
            </div>

            {/* Analytics */}
            <div className="dash-analytics">
              <div className="dash-sectionHead">
                <p className="dash-sectionTitle">Project Analytics</p>
                <div className="dash-pillRow">
                  <button
                    type="button"
                    onClick={() => setCalendarMode("week")}
                    className={`dash-pill ${calendarMode === "week" ? "is-active" : ""}`}
                  >
                    Minggu
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarMode("month")}
                    className={`dash-pill ${calendarMode === "month" ? "is-active" : ""}`}
                  >
                    Bulan
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarMode("year")}
                    className={`dash-pill ${calendarMode === "year" ? "is-active" : ""}`}
                  >
                    Tahun
                  </button>
                </div>
              </div>

              {/* Calendar controls */}
              <div className="dash-calControls">
                {calendarMode === "week" && (
                  <div className="dash-navRow">
                    <button
                      type="button"
                      onClick={() => setWeekOffset((v) => v - 1)}
                      className="dash-navBtn"
                      aria-label="Previous week"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeekOffset((v) => v + 1)}
                      className="dash-navBtn"
                      aria-label="Next week"
                    >
                      ›
                    </button>
                    <p className="dash-rangeText">
                      {formatDateId(weekDays[0])} – {formatDateId(weekDays[6])}
                    </p>
                  </div>
                )}

                {calendarMode === "month" && (
                  <div className="dash-navRow">
                    <button
                      type="button"
                      onClick={() => {
                        if (calendarMonth === 0) {
                          setCalendarYear((y) => y - 1);
                          setCalendarMonth(11);
                        } else {
                          setCalendarMonth((m) => m - 1);
                        }
                      }}
                      className="dash-navBtn"
                      aria-label="Previous month"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (calendarMonth === 11) {
                          setCalendarYear((y) => y + 1);
                          setCalendarMonth(0);
                        } else {
                          setCalendarMonth((m) => m + 1);
                        }
                      }}
                      className="dash-navBtn"
                      aria-label="Next month"
                    >
                      ›
                    </button>
                    <p className="dash-rangeText">{monthTitle}</p>
                  </div>
                )}

                {calendarMode === "year" && (
                  <div className="dash-navRow">
                    <button
                      type="button"
                      onClick={() => setCalendarYear((y) => y - 1)}
                      className="dash-navBtn"
                      aria-label="Previous year"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalendarYear((y) => y + 1)}
                      className="dash-navBtn"
                      aria-label="Next year"
                    >
                      ›
                    </button>
                    <div className="dash-navRow">
                      <p className="dash-rangeText">{calendarYear}</p>
                      {availableYears.length > 1 && (
                        <select
                          value={calendarYear}
                          onChange={(e) => setCalendarYear(Number(e.target.value))}
                          className="dash-yearSelect"
                          aria-label="Select year"
                        >
                          {availableYears.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                )}

                <div className="dash-calHint">grafik tanggal kontribus</div>
              </div>

              {/* Calendar views */}
              <div className="dash-calWrap">
                {calendarMode === "week" && (
                  <div className="dash-weekGrid">
                    {weekDays.map((d) => {
                      const key = toDateKey(d);
                      const count = contribByDate[key] || 0;
                      return (
                        <div
                          key={key}
                          className={`dash-weekCell ${intensityClass(count)}`}
                          title={`${count} kontribusi`}
                        >
                          <p className="dash-weekDow">
                            {d.toLocaleDateString("id-ID", { weekday: "short" })}
                          </p>
                          <p className="dash-weekCount">{count}</p>
                          <p className="dash-weekDate">
                            {pad2(d.getDate())}/{pad2(d.getMonth() + 1)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {calendarMode === "month" && (
                  <div>
                    <div className="dash-monthDows">
                      {['S','M','T','W','T','F','S'].map((d) => (
                        <div key={d} className="dash-monthDow">{d}</div>
                      ))}
                    </div>
                    <div className="dash-monthGrid">
                      {monthCells.map((d, idx) => {
                        if (!d) {
                          return <div key={`empty_${idx}`} className="dash-monthEmpty" />;
                        }
                        const key = toDateKey(d);
                        const count = contribByDate[key] || 0;
                        return (
                          <div
                            key={key}
                            className={`dash-monthCell ${count ? "is-hot" : ""}`}
                            title={`${count} kontribusi`}
                          >
                            <div className="dash-monthTop">
                              <span className="dash-monthDay">{d.getDate()}</span>
                              <span className={`dash-monthBubble ${intensityClass(count)}`}>
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {calendarMode === "year" && (
                  <div className="dash-yearGrid">
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mei",
                      "Jun",
                      "Jul",
                      "Agu",
                      "Sep",
                      "Okt",
                      "Nov",
                      "Des",
                    ].map((label, idx) => {
                      const count = yearMonthTotals[idx] || 0;
                      return (
                        <button
                          type="button"
                          key={label}
                          onClick={() => {
                            setCalendarMode("month");
                            setCalendarMonth(idx);
                          }}
                          className={`dash-yearBtn ${count ? "is-hot" : ""}`}
                        >
                          <p className="dash-yearLabel">{label}</p>
                          <p className="dash-yearCount">{count}</p>
                          <p className="dash-yearSub">kontribusi</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Reminders */}
            <div className="dash-reminders">
              <p className="dash-sectionTitle">Reminders</p>
              <p className="dash-remSub">Agenda trip terdekat (urut paling dekat)</p>

              <div className="dash-list">
                {agendaUpcoming.length === 0 ? (
                  <div className="dash-emptyCard">
                    <p className="dash-emptyTitle">
                      {bookingsLoading ? "Memuat data booking" : "Belum ada agenda"}
                    </p>
                    <p className="dash-emptyText">
                      {bookingsLoading
                        ? "Tunggu sebentar, data booking sedang diambil dari server."
                        : "Booking trip untuk membuat agenda otomatis."}
                    </p>
                  </div>
                ) : (
                  agendaUpcoming.map((b) => (
                    <div key={b.id} className="dash-agendaCard">
                      <div className="dash-agendaRow">
                        <div className="dash-agendaLeft">
                          <p className="dash-agendaTitle">{b.tripNama}</p>
                          <p className="dash-agendaMeta">
                            {b._tripDate ? formatDateId(b._tripDate) : "-"} • {b._lokasi || "Yogyakarta"}
                          </p>
                        </div>
                        <span className="dash-statusPill">
                          {deriveTripStatus(b)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Link
                to="/trip"
                className="dash-remBtn"
              >
                Lihat Trip
              </Link>
            </div>

            {/* Team Collaboration / Riwayat */}
            <div className="dash-history">
              <div className="dash-historyHead">
                <p className="dash-sectionTitle">Riwayat Booking</p>
                <Link
                  to="/dashboard/riwayat"
                  className="dash-linkPill"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="dash-list">
                {historyBookings.length === 0 ? (
                  <div className="dash-emptyCard">
                    <p className="dash-emptyTitle">
                      {bookingsLoading ? "Memuat data booking" : "Belum ada trip selesai"}
                    </p>
                    <p className="dash-emptyText">
                      {bookingsLoading
                        ? "Tunggu sebentar, data booking sedang diambil dari server."
                        : "Booking akan masuk ke sini setelah data tersimpan."}
                    </p>
                  </div>
                ) : (
                  historyBookings.slice(0, 4).map((b) => {
                    const tripDate = getTripDate(b);
                    return (
                      <div key={b.id} className="dash-historyRow">
                        <div className="dash-historyIcon">
                          {String(b.tripNama || "T").charAt(0).toUpperCase()}
                        </div>
                        <div className="dash-historyBody">
                          <p className="dash-historyTitle">{b.tripNama}</p>
                          <p className="dash-historyDate">
                            {tripDate ? formatDateId(tripDate) : "-"}
                          </p>
                        </div>
                        <span className="dash-historyStatus">{deriveTripStatus(b)}</span>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="dash-historyFooter">riwayat</p>
            </div>

            {/* Cancel Booking */}
            <div className="dash-progress">
              <div className="dash-historyHead">
                <p className="dash-sectionTitle">Menu Cancel Booking</p>
              </div>

              <p className="dash-remSub">
                Booking yang masih pending atau terjalani bisa dibatalkan langsung dari sini.
              </p>

              <div className="dash-list">
                {cancelableBookings.length === 0 ? (
                  <div className="dash-emptyCard">
                    <p className="dash-emptyTitle">Tidak ada booking yang bisa dibatalkan</p>
                    <p className="dash-emptyText">Booking selesai atau sudah dibatalkan tidak tampil di menu ini.</p>
                  </div>
                ) : (
                  cancelableBookings.map((b) => {
                    const tripDate = getTripDate(b);
                    const status = deriveTripStatus(b);
                    return (
                      <div key={b.id} className="dash-cancelCard">
                        <div className="dash-cancelRow">
                          <div className="dash-cancelInfo">
                            <p className="dash-cancelTitle">{b.tripNama}</p>
                            <p className="dash-cancelMeta">
                              {tripDate ? formatDateId(tripDate) : "-"} • {b.lokasi || "Yogyakarta"}
                            </p>
                          </div>
                          <span className="dash-statusPill">{status}</span>
                        </div>
                        <button
                          type="button"
                          className="dash-cancelBtn"
                          onClick={() => handleCancelBooking(b.id, b.tripNama)}
                          disabled={cancellingBookingId === b.id}
                        >
                          {cancellingBookingId === b.id ? "Membatalkan..." : "Batalkan Booking"}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right column stack: Project + Time tracker */}
            <div className="dash-rightStack">
              <div className="dash-followCard">
                <div className="dash-followHead">
                  <p className="dash-sectionTitle">Trip yang diikuti</p>
                  <Link
                    to="/dashboard/riwayat"
                    className="dash-followLink"
                  >
                    Lihat
                  </Link>
                </div>
                <div className="dash-followList">
                  {tripsFollowedNewest.length === 0 ? (
                    <p className="dash-followEmpty">
                      {bookingsLoading ? "Memuat data booking..." : "Belum ada trip yang diikuti."}
                    </p>
                  ) : (
                    tripsFollowedNewest.map((b) => {
                      const tripDate = getTripDate(b);
                      return (
                        <div key={b.id} className="dash-followItem">
                          <span className="dash-followDot" />
                          <div className="dash-followText">
                            <p className="dash-followName">{b.tripNama}</p>
                            <p className="dash-followMeta">
                              {tripDate ? formatDateId(tripDate) : "-"} • {deriveTripStatus(b)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="dash-tracker">
                <div className="dash-tracker-bg" />
                <div className="dash-trackerInner">
                  <p className="dash-trackerLabel">Time Tracker</p>
                  <p className="dash-trackerTime">{accountElapsed}</p>
                  <p className="dash-trackerTitle">lama memiliki akun</p>
                  <p className="dash-trackerDays">{accountDays} hari</p>

                  <div className="dash-trackerBtns">
                    <button
                      type="button"
                      className="dash-trackerBtn"
                      aria-label="Pause"
                    >
                      ⏸
                    </button>
                    <button
                      type="button"
                      className="dash-trackerBtn"
                      aria-label="Stop"
                    >
                      ⏺
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;