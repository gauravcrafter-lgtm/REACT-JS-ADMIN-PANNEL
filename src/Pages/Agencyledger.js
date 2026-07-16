import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Agencyledger.css";

export default function AgencyLedger() {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate]     = useState("");
  const [toDate, setToDate]         = useState("");
  const [searched, setSearched]     = useState(false);

  const navigate = useNavigate();

  const API_URL    = process.env.REACT_APP_API_AGENCY;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
  const PORTAL_ID  = process.env.REACT_APP_PORTAL_ID;

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
    const matchesAgency = (item.AgencyName || "")
      .toLowerCase()
      .includes(agencyName.toLowerCase());
    const matchesStatus =
      statusFilter === "" || item.TransactionType === statusFilter;
    return matchesAgency && matchesStatus;
  });

  // Export current filtered data to a real Excel (.xlsx) file
  const handleExportExcel = () => {
    if (filteredData.length === 0) return;

    // Build plain row objects — keys become the Excel header row
    const excelRows = filteredData.map((item) => ({
      "Agency Name": item.AgencyName || "",
      "Txn Date": item.TxnDate
        ? new Date(item.TxnDate).toLocaleDateString("en-IN")
        : "",
      "Transaction ID": item.TransactionId || "",
      "Ref No": item.RefNo || "",
      "Transaction Type": item.TransactionType || "",
      "Txn Remark": item.TxnRemark || "",
      "Debit": Number(item.Debit || 0),
      "Credit": Number(item.Credit || 0),
      "Limit": Number(item.Limit || 0),
      "Balance": Number(item.CreditBalance || 0),
    }));

    // Sheet from JSON rows
    const worksheet = XLSX.utils.json_to_sheet(excelRows);

    // Reasonable column widths so data is readable, not squeezed
    worksheet["!cols"] = [
      { wch: 26 }, // Agency Name
      { wch: 14 }, // Txn Date
      { wch: 16 }, // Transaction ID
      { wch: 20 }, // Ref No
      { wch: 18 }, // Transaction Type
      { wch: 26 }, // Txn Remark
      { wch: 12 }, // Debit
      { wch: 12 }, // Credit
      { wch: 12 }, // Limit
      { wch: 14 }, // Balance
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agency Ledger");

    // File name includes date range so exports don't overwrite each other
    const fileFrom = fromDate || "all";
    const fileTo = toDate || "all";
    const fileName = `AgencyLedger_${fileFrom}_to_${fileTo}.xlsx`;

    // Triggers actual file save/download in the browser
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <>
      <Sidebar />

      <div className="al-wrapper">

        {/* ── Filter Row ── */}
        <div className="al-filter-card">
          <div className="al-filter-row">

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

            <div className="al-field">
              <label>agencyName</label>
              <input
                className="al-input"
                type="text"
                placeholder="Enter Agency Name"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
              />
            </div>

            <div className="al-field">
              <label>Status</label>
              <select
                className="al-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">----- Select -----</option>
                <option value="Flight_TXN">Flight TXN</option>
                <option value="Debit_TXN">Debit TXN</option>
                <option value="Credit_Deposit">Credit Deposit</option>
                <option value="Bank_Deposit">Bank Deposit</option>
                <option value="Cash_TXN">Cash TXN</option>
                <option value="Reduce_Limit">Reduce Limit</option>
                <option value="Credit_Limit">Credit Limit</option>
              </select>
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

            {/* <button
              className="al-export-btn"
              onClick={handleExportExcel}
              disabled={filteredData.length === 0}
            >
              🔍 Export Excel
            </button> */}

          </div>
        </div>

        {/* ── Table ── */}
        <div className="al-table-card">

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
                    <th>Agency Name</th>
                    <th>Txn Date</th>
                    <th>Transaction ID</th>
                    <th>Ref No</th>
                    <th>Transaction Type</th>
                    <th>Txn Remark</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Limit</th>
                    <th>Balance</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{item.AgencyName}</td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--al-text-2)" }}>
                        {item.TxnDate ? new Date(item.TxnDate).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td><span className="al-txn-chip">{item.TransactionId}</span></td>
                      <td style={{ color: "var(--al-text-2)" }}>{item.RefNo || "—"}</td>
                      <td>{item.TransactionType}</td>
                      <td style={{ color: "var(--al-text-2)" }}>{item.TxnRemark || "—"}</td>
                      <td><span className="al-debit">{Number(item.Debit || 0).toLocaleString("en-IN")}</span></td>
                      <td><span className="al-credit">{Number(item.Credit || 0).toLocaleString("en-IN")}</span></td>
                      <td>{Number(item.Limit || 0).toLocaleString("en-IN")}</td>
                      <td><span className="al-balance">{Number(item.CreditBalance || 0).toLocaleString("en-IN")}</span></td>
                      <td>
                        <button
                          onClick={() => navigate(`/invoice/${item.TransactionId}`)}
                          style={styles.invoiceBtn}
                        >
                          Invoice
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
    backgroundColor: "#1a56db",
    color: "#fff",
    whiteSpace: "nowrap",
  },
};