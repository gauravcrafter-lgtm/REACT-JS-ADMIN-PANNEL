import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Footer2 from "./Footer2";
import "../CSS/FlightBooking.css";
import Invoice from "./Invoice.js";
import { loadAgencyConfig } from "../util/loadConfig";

export default function FlightBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [filterPNR, setFilterPNR] = useState("");
  const [filterBookingID, setFilterBookingID] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [collapsed, setCollapsed] = useState(false);

  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [configReady, setConfigReady] = useState(false);

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_FLIGHTBOOKING;
  const today = new Date();

  const statusMap = {
    0: "Default",
    1: "Booked",
    12: "Rejected",
    17: "Hold",
    4: "Pending",
  };

  const statusOptions = ["Booked", "Pending", "Rejected", "Hold", "Default"];

  const statusClass = {
    Booked: "booked",
    Pending: "pending",
    Rejected: "rejected",
    Hold: "hold",
    Default: "default",
  };

  // Config load
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          PortalId: cfg.PortalId || "",
        });
        setConfigReady(true);
      } catch (err) {
        console.error("Config load failed:", err);
        setError("Config load failed. Please refresh.");
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    if (date && toDate && date > toDate) {
      setToDate(date);
    }
  };

  const fetchBookings = async () => {
    if (!config.AgencyKey || !config.PortalId) {
      setError("AgencyKey / PortalId missing from config");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const payload = {
        UserKey: null,
        AgencyKey: config.AgencyKey,
        FromDate: formatDate(fromDate),
        ToDate: formatDate(toDate),
        TravelDate: null,
        BookingId: null,
        AirlinePnr: null,
        AgencyCode: null,
        ReportType: 0,
        PortalId: Number(config.PortalId),
        IsTC: true,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      const bookingArray = Array.isArray(data.BookingHistory)
        ? data.BookingHistory
        : [];

      const startOfDay = fromDate
        ? new Date(fromDate).setHours(0, 0, 0, 0)
        : null;
      const endOfDay = toDate
        ? new Date(toDate).setHours(23, 59, 59, 999)
        : null;

      const filtered = bookingArray.filter((b) => {
        if (!b.BookingDate) return false;

        const bookingDate = new Date(b.BookingDate).getTime();

        if (startOfDay && bookingDate < startOfDay) return false;
        if (endOfDay && bookingDate > endOfDay) return false;

        if (
          filterPNR &&
          !b.AirlinePnr?.toLowerCase().includes(filterPNR.toLowerCase())
        )
          return false;
        if (
          filterBookingID &&
          !b.BookingId?.toLowerCase().includes(filterBookingID.toLowerCase())
        )
          return false;
        if (filterStatus !== "all") {
          const status = statusMap[Number(b.BookingStatus)]?.toLowerCase();
          if (status !== filterStatus.toLowerCase()) return false;
        }
        return true;
      });

      setBookings(filtered);
    } catch (err) {
      console.error(err);
      setError("Bookings fetch karne mein problem aayi. Please retry karein.");
    } finally {
      setLoading(false);
    }
  };

  // Config ready hone ke baad hi pehli fetch
  useEffect(() => {
    if (configReady) {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configReady]);

  const handleExportExcel = () => {
    if (bookings.length === 0) return;

    const excelRows = bookings.map((b) => ({
      Agency: b.AgencyName || "",
      "Booking ID": b.BookingId || "",
      "Booking Date": b.BookingDate || "",
      PNR: b.AirlinePnr || "",
      Sector: b.Sector || "",
      Status: statusMap[Number(b.BookingStatus)] || "Unknown",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelRows);

    worksheet["!cols"] = [
      { wch: 26 },
      { wch: 16 },
      { wch: 14 },
      { wch: 12 },
      { wch: 18 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Flight Bookings");

    const fileFrom = fromDate ? formatDate(fromDate) : "all";
    const fileTo = toDate ? formatDate(toDate) : "all";
    XLSX.writeFile(
      workbook,
      `FlightBookings_${fileFrom}_to_${fileTo}.xlsx`
    );
  };

  const bookedCount = bookings.filter(
    (b) => statusMap[Number(b.BookingStatus)] === "Booked"
  ).length;
  const pendingCount = bookings.filter(
    (b) => statusMap[Number(b.BookingStatus)] === "Pending"
  ).length;

  if (loadingConfig) {
    return (
      <div className="fb-page">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`fb-main ${collapsed ? "collapsed" : ""}`}>
          <div className="fb-state-box loading">
            <div className="fb-spinner" />
            <p>Loading Config...</p>
          </div>
          <Footer2 />
        </div>
      </div>
    );
  }

  return (
    <div className="fb-page">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`fb-main ${collapsed ? "collapsed" : ""}`}>
        <div className="fb-header">
          <div className="fb-header-left">
            <h1>Flight Bookings</h1>
            <p>Real-time overview of all flight reservations</p>
          </div>
          <div className="fb-stats">
            <div className="fb-stat-card primary">
              <span>Total</span>
              <strong>{bookings.length}</strong>
            </div>
            <div className="fb-stat-card green">
              <span>Booked</span>
              <strong>{bookedCount}</strong>
            </div>
            <div className="fb-stat-card amber">
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>
          </div>
        </div>

        <div className="fb-filter-card">
          <div className="fb-filter-title">Search &amp; Filter</div>
          <div className="fb-filter-grid">
            <div className="fb-input-group">
              <label>From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={handleFromDateChange}
                dateFormat="dd-MM-yyyy"
                maxDate={today}
                className="fb-input"
                placeholderText="DD-MM-YYYY"
              />
            </div>

            <div className="fb-input-group">
              <label>To Date</label>
              <DatePicker
                selected={toDate}
                onChange={setToDate}
                dateFormat="dd-MM-yyyy"
                minDate={fromDate}
                maxDate={today}
                className="fb-input"
                placeholderText="DD-MM-YYYY"
              />
            </div>

            <div className="fb-input-group">
              <label>Booking ID</label>
              <input
                type="text"
                value={filterBookingID}
                onChange={(e) => setFilterBookingID(e.target.value)}
                placeholder="e.g. BK-00123"
                className="fb-input"
              />
            </div>

            <div className="fb-input-group">
              <label>Airline PNR</label>
              <input
                type="text"
                value={filterPNR}
                onChange={(e) => setFilterPNR(e.target.value)}
                placeholder="e.g. XQRT7"
                className="fb-input"
              />
            </div>

            <div className="fb-input-group">
              <label>Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="fb-input"
              >
                <option value="all">All Status</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s.toLowerCase()}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="fb-input-group fb-btn-group"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <button
                onClick={handleExportExcel}
                className="fb-search-btn"
                disabled={bookings.length === 0}
                style={{ width: "80%", justifyContent: "center" }}
              >
                📤 Export Excel
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={fetchBookings}
                  className="fb-search-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                </button>
                <button
                  onClick={() => {
                    setFilterPNR("");
                    setFilterBookingID("");
                    setFilterStatus("all");
                    setFromDate(new Date());
                    setToDate(new Date());
                  }}
                  className="fb-reset-btn"
                  style={{ flex: 1 }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="fb-state-box loading">
            <div className="fb-spinner" />
            <p>Loading bookings...</p>
          </div>
        )}

        {error && !loading && (
          <div className="fb-state-box error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button onClick={fetchBookings} className="fb-retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="fb-table-card">
            <div className="fb-table-meta">
              <span>
                <strong>{bookings.length}</strong> bookings found
              </span>
              <span className="fb-table-hint">
                Scroll horizontally on smaller screens
              </span>
            </div>
            <div className="fb-table-scroll">
              <table className="fb-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Agency</th>
                    <th>Booking ID</th>
                    <th>Booking Date</th>
                    <th>PNR</th>
                    <th>Sector</th>
                    <th>Status</th>
                    <th>Invoice</th>
                    <th>Ticket</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => {
                    const statusLabel =
                      statusMap[Number(b.BookingStatus)] || "Unknown";
                    const cls = statusClass[statusLabel] || "default";
                    return (
                      <tr key={b.TransactionId || index}>
                        <td className="fb-index">{index + 1}</td>
                        <td>{b.AgencyName}</td>
                        <td className="fb-booking-id">{b.BookingId}</td>
                        <td>{b.BookingDate}</td>
                        <td className="fb-pnr">{b.AirlinePnr || "—"}</td>
                        <td>
                          <span className="fb-sector">{b.Sector}</span>
                        </td>
                        <td>
                          <span className={`fb-pill ${cls}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/invoice/${b.TransactionId}`)
                            }
                            className="fb-action-btn invoice"
                          >
                            Invoice
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/Ticketsss/${b.TransactionId}`)
                            }
                            className="fb-action-btn Ticketsss"
                          >
                            Ticket
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/Editpagedit/${b.TransactionId}`)
                            }
                            className="fb-action-btn edit"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="fb-state-box empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#c8d6e8"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6M4 20h16M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
            <p>No bookings found for the selected filters</p>
          </div>
        )}

        <Footer2 />
      </div>
    </div>
  );
}