import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Gatewayreport.css";

export default function Gatewayreport() {
  const [reports, setReports]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [fromDate, setFromDate]     = useState(null);
  const [toDate, setToDate]         = useState(null);

  const API_URL = "https://promo.namantechnolab.com/api/Admin/AdminOperation";

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
  };

  const fetchReports = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both From and To dates.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FromDate: formatDate(fromDate),
          ToDate: formatDate(toDate),
          APIRequestType: 18,
          AgencyKey: "02AD68F3-9AE6-4148-85B1-E61D1F03991F",
          AccountNo: 11,
        }),
      });

      const data = await response.json();
      let arr = [];
      if (Array.isArray(data)) arr = data;
      else {
        const key = Object.keys(data).find((k) => Array.isArray(data[k]));
        if (key) arr = data[key];
      }
      setReports(arr);
    } catch {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const successCount = reports.filter((r) => r.GatewayStatus?.toLowerCase() === "success").length;
  const failedCount  = reports.filter((r) => r.GatewayStatus?.toLowerCase() === "failed").length;
  const pendingCount = reports.filter((r) => r.GatewayStatus?.toLowerCase() === "pending").length;
  const totalReceived = reports.reduce((s, r) => s + (Number(r.RecivedAmount) || 0), 0);

  const getStatusClass = (status = "") => {
    const s = status.toLowerCase();
    if (s === "success") return "success";
    if (s === "failed")  return "failed";
    return "pending";
  };

  return (
    <>
      <Sidebar />

      <div className="gw-wrapper">

        {/* ── Header ── */}
        <div className="gw-page-title"><span>📊</span> Gateway Report</div>
        <div className="gw-page-sub">View payment gateway transactions by date range</div>

        {/* ── Filter Card ── */}
        <div className="gw-filter-card">
          <div className="gw-filter-label">Filter Records</div>
          <div className="gw-filter-row">

            <div className="gw-field">
              <label>From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
                className="gw-dateInput"
                placeholderText="Select From Date"
              />
            </div>

            <div className="gw-field">
              <label>To Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="dd-MM-yyyy"
                minDate={fromDate}
                maxDate={new Date()}
                className="gw-dateInput"
                placeholderText="Select To Date"
              />
            </div>

            <button
              className="gw-search-btn"
              onClick={fetchReports}
              disabled={loading}
            >
              {loading
                ? <><div className="gw-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Searching...</>
                : <>🔍 Search</>
              }
            </button>

          </div>
        </div>

        {/* ── Stats ── */}
        {hasSearched && !loading && reports.length > 0 && (
          <div className="gw-stats">
            <div className="gw-stat-card">
              <div className="gw-stat-icon blue">📋</div>
              <div>
                <div className="gw-stat-value">{reports.length}</div>
                <div className="gw-stat-label">Total Records</div>
              </div>
            </div>
            <div className="gw-stat-card">
              <div className="gw-stat-icon green">✅</div>
              <div>
                <div className="gw-stat-value">{successCount}</div>
                <div className="gw-stat-label">Success</div>
              </div>
            </div>
            <div className="gw-stat-card">
              <div className="gw-stat-icon red">❌</div>
              <div>
                <div className="gw-stat-value">{failedCount}</div>
                <div className="gw-stat-label">Failed</div>
              </div>
            </div>
            <div className="gw-stat-card">
              <div className="gw-stat-icon orange">⏳</div>
              <div>
                <div className="gw-stat-value">{pendingCount}</div>
                <div className="gw-stat-label">Pending</div>
              </div>
            </div>
            <div className="gw-stat-card">
              <div className="gw-stat-icon gold">💰</div>
              <div>
                <div className="gw-stat-value">₹{totalReceived.toLocaleString("en-IN")}</div>
                <div className="gw-stat-label">Total Received</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Table Card ── */}
        <div className="gw-table-card">
          <div className="gw-table-topbar">
            <div className="gw-table-title">
              {hasSearched ? `Transactions (${reports.length})` : "Transactions"}
            </div>
          </div>

          {loading && (
            <div className="gw-loading">
              <div className="gw-spinner" /> Loading records...
            </div>
          )}

          {!loading && error && (
            <div className="gw-error-msg">⚠️ {error}</div>
          )}

          {!loading && !hasSearched && (
            <div className="gw-hint">
              📅 Select a date range and click Search to view gateway reports.
            </div>
          )}

          {!loading && hasSearched && !error && reports.length === 0 && (
            <div className="gw-empty">No records found for selected date range.</div>
          )}

          {!loading && reports.length > 0 && (
            <div className="gw-table-scroll">
              <table className="gw-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Price</th>
                    <th>Gateway Charge</th>
                    <th>Received</th>
                    <th>Gateway</th>
                    <th>Booking Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--gw-text-3)", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td><span className="gw-txn-chip">{r.TransactionId}</span></td>
                      <td><span className="gw-amount">₹{Number(r.PriceTransaction || 0).toLocaleString("en-IN")}</span></td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--gw-text-2)" }}>
                        ₹{Number(r.GatewayCharge || 0).toLocaleString("en-IN")}
                      </td>
                      <td><span className="gw-amount">₹{Number(r.RecivedAmount || 0).toLocaleString("en-IN")}</span></td>
                      <td style={{ fontWeight: 700 }}>{r.PaymentGateway}</td>
                      <td>
                        <span className="gw-booking-badge">{r.BookingType}</span>
                      </td>
                      <td>
                        <span className={`gw-badge ${getStatusClass(r.GatewayStatus)}`}>
                          {r.GatewayStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      <Footer2 />
    </>
  );
}