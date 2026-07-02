import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Agencyledger.css";

export default function AgencyLedger() {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate]     = useState("");
  const [toDate, setToDate]         = useState("");
  const [searched, setSearched]     = useState(false);

  const navigate = useNavigate();

  const API_URL   = process.env.REACT_APP_API_AGENCY;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

  const today = new Date().toISOString().split("T")[0];

  const formatDate = (date) => {
    if (!date) return "";
    const [y, m, d] = date.split("-");
    return `${d}-${m}-${y}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AgencyKey: AGENCY_KEY,
          FromDate: formatDate(fromDate) || "01-03-2026",
          ToDate: formatDate(toDate) || "30-04-2026",
          PortalId: Number(PORTAL_ID),
          IsTC: true,
        }),
      });

      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      setStatements(data?.AgencyStatements || []);
    } catch {
      setError("Failed to fetch data. Please try again.");
      setStatements([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = statements.filter((item) => {
    const matchesSearch =
      (item.AgencyCode || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.RefNo || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || item.TransactionType === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalDebit  = filteredData.reduce((s, i) => s + (Number(i.Debit)  || 0), 0);
  const totalCredit = filteredData.reduce((s, i) => s + (Number(i.Credit) || 0), 0);

  // Type badge class
  const getBadgeClass = (type = "") => {
    const t = type.toLowerCase();
    if (t.includes("credit") || t.includes("deposit")) return "credit";
    if (t.includes("debit") || t.includes("reduce"))   return "debit";
    return "deposit";
  };

  return (
    <>
      <Sidebar />

      <div className="al-wrapper">

        {/* ── Header ── */}
        <div className="al-page-title"><span>📒</span> Agency Ledger</div>
        <div className="al-page-sub">View agency transaction statements by date range</div>

        {/* ── Filter Card ── */}
        <div className="al-filter-card">
          <div className="al-filter-label">Filter Records</div>
          <div className="al-filter-row">

            <div className="al-field">
              <label>Search</label>
              <input
                className="al-input"
                type="text"
                placeholder="Agency Code / Ref No"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="al-field">
              <label>Transaction Type</label>
              <select
                className="al-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Flight_TXN">Flight TXN</option>
                <option value="Debit_TXN">Debit TXN</option>
                <option value="Credit_Deposit">Credit Deposit</option>
                <option value="Bank_Deposit">Bank Deposit</option>
                <option value="Cash_TXN">Cash TXN</option>
                <option value="Reduce_Limit">Reduce Limit</option>
                <option value="Credit_Limit">Credit Limit</option>
              </select>
            </div>

            <div className="al-field">
              <label>From Date</label>
              <input
                className="al-input"
                type="date"
                value={fromDate}
                max={today}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="al-field">
              <label>To Date</label>
              <input
                className="al-input"
                type="date"
                value={toDate}
                min={fromDate}
                max={today}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <button
              className="al-search-btn"
              onClick={fetchData}
              disabled={loading}
            >
              {loading
                ? <><div className="al-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Searching...</>
                : <>🔍 Search</>
              }
            </button>

          </div>
        </div>

        {/* ── Stats ── */}
        {searched && !loading && filteredData.length > 0 && (
          <div className="al-stats">
            <div className="al-stat-card">
              <div className="al-stat-icon blue">📋</div>
              <div>
                <div className="al-stat-value">{filteredData.length}</div>
                <div className="al-stat-label">Total Records</div>
              </div>
            </div>
            <div className="al-stat-card">
              <div className="al-stat-icon red">📤</div>
              <div>
                <div className="al-stat-value">₹{totalDebit.toLocaleString("en-IN")}</div>
                <div className="al-stat-label">Total Debit</div>
              </div>
            </div>
            <div className="al-stat-card">
              <div className="al-stat-icon green">📥</div>
              <div>
                <div className="al-stat-value">₹{totalCredit.toLocaleString("en-IN")}</div>
                <div className="al-stat-label">Total Credit</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Table Card ── */}
        <div className="al-table-card">
          <div className="al-table-topbar">
            <div className="al-table-title">
              {searched ? `Transactions (${filteredData.length})` : "Transactions"}
            </div>
          </div>

          {loading && (
            <div className="al-loading">
              <div className="al-spinner" /> Loading records...
            </div>
          )}

          {!loading && error && (
            <div className="al-error">⚠️ {error}</div>
          )}

          {!loading && !searched && (
            <div className="al-hint">
              📅 Select a date range and click Search to view ledger.
            </div>
          )}

          {!loading && searched && !error && filteredData.length === 0 && (
            <div className="al-empty">No records found for the selected filters.</div>
          )}

          {!loading && filteredData.length > 0 && (
            <div className="al-table-scroll">
              <table className="al-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Agency</th>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>Txn ID</th>
                    <th>Ref No</th>
                    <th>Type</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th>Invoice</th>
                    <th>Ticket</th>
                    <th>Update</th>

                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--al-text-3)", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td style={{ fontWeight: 700 }}>{item.AgencyName}</td>
                      <td><span className="al-txn-chip">{item.BookingId || "—"}</span></td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--al-text-2)" }}>
                        {item.TxnDate ? new Date(item.TxnDate).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td><span className="al-txn-chip">{item.TransactionId}</span></td>
                      <td style={{ color: "var(--al-text-2)" }}>{item.RefNo || "—"}</td>
                      <td>
                        <span className={`al-type-badge ${getBadgeClass(item.TransactionType)}`}>
                          {item.TransactionType}
                        </span>
                      </td>
                      <td><span className="al-debit">₹{Number(item.Debit || 0).toLocaleString("en-IN")}</span></td>
                      <td><span className="al-credit">₹{Number(item.Credit || 0).toLocaleString("en-IN")}</span></td>
                      <td><span className="al-balance">₹{Number(item.CreditBalance || 0).toLocaleString("en-IN")}</span></td>
                      <td>
                        <button
                          onClick={() => navigate(`/invoice/${item.TransactionId}`)}
                          style={styles.invoiceBtn}
                        >
                          Invoice
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/ticket/${item.TransactionId}`)}
                          style={styles.ticketBtn}
                        >
                          Ticket
                        </button>
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

const styles = {
  invoiceBtn: {
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 600,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#e8f0fe",
    color: "#1a56db",
    whiteSpace: "nowrap",
  },
  ticketBtn: {
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 600,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#e6f7ee",
    color: "#0f9d58",
    whiteSpace: "nowrap",
  },
};