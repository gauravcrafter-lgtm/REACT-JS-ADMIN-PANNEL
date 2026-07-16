// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "./Sidebar";
// import "../CSS/Depositrequest.css";
// import Footer2 from "./Footer2";

// export default function Depositrequest() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState("");
//   const [searched, setSearched] = useState(false);

//   const [fromDate, setFromDate] = useState(new Date("2024-01-01"));
//   const [toDate, setToDate]     = useState(new Date());

//   const API_URL   = process.env.REACT_APP_API_DEPOSIT;
//   const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
//   const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;

//   const formatDate = (date) => {
//     const d = new Date(date);
//     const day   = String(d.getDate()).padStart(2, "0");
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const year  = d.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const fetchRecords = async () => {
//     setLoading(true);
//     setError("");
//     setRecords([]);
//     setSearched(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           AgencyKey: AGENCY_KEY,
//           BookingId: null,
//           AgencyCode: null,
//           TransactionType: 0,
//           PaymentStatus: 3,
//           FromDate: formatDate(fromDate),
//           ToDate: formatDate(toDate),
//           PortalId: Number(PORTAL_ID),
//           IsTC: true,
//         }),
//       });

//       const data = await response.json();
//       const list = data?.DeHistory || [];

//       if (response.ok && Array.isArray(list)) {
//         setRecords(list);
//       } else {
//         setError("No Data Found");
//       }
//     } catch {
//       setError("API Failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Stats
//   const totalAmount  = records.reduce((sum, r) => sum + (Number(r.DepositAmount) || 0), 0);
//   const successCount = records.filter((r) => r.TxnStatus).length;
//   const failedCount  = records.filter((r) => !r.TxnStatus).length;

//   return (
//     <div>
//       <Sidebar />

//       <div className="dr-wrapper">

//         {/* ── Header ── */}
//         <div className="dr-page-title">
//           <span>💳</span> Deposit Request
//         </div>
//         <div className="dr-page-sub">View and filter deposit transaction history</div>

//         {/* ── Filter Card ── */}
//         <div className="dr-filter-card">
//           <div className="dr-filter-title">Filter Records</div>
//           <div className="dr-filter-row">
//             <div className="dr-field">
//               <label>From Date</label>
//               <DatePicker
//                 selected={fromDate}
//                 onChange={(date) => setFromDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 className="dateInput"
//                 maxDate={new Date()}
//               />
//             </div>

//             <div className="dr-field">
//               <label>To Date</label>
//               <DatePicker
//                 selected={toDate}
//                 onChange={(date) => setToDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 className="dateInput"
//                 maxDate={new Date()}
//                 minDate={fromDate}
//               />
//             </div>

//             <button
//               className="dr-search-btn"
//               onClick={fetchRecords}
//               disabled={loading}
//             >
//               {loading ? (
//                 <><div className="dr-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Searching...</>
//               ) : (
//                 <> 🔍 Search </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ── Stats (only after search) ── */}
//         {searched && !loading && records.length > 0 && (
//           <div className="dr-stats">
//             <div className="dr-stat-card">
//               <div className="dr-stat-icon blue">📋</div>
//               <div>
//                 <div className="dr-stat-value">{records.length}</div>
//                 <div className="dr-stat-label">Total Records</div>
//               </div>
//             </div>
//             <div className="dr-stat-card">
//               <div className="dr-stat-icon green">✅</div>
//               <div>
//                 <div className="dr-stat-value">{successCount}</div>
//                 <div className="dr-stat-label">Success</div>
//               </div>
//             </div>
//             <div className="dr-stat-card">
//               <div className="dr-stat-icon red">❌</div>
//               <div>
//                 <div className="dr-stat-value">{failedCount}</div>
//                 <div className="dr-stat-label">Failed</div>
//               </div>
//             </div>
//             <div className="dr-stat-card">
//               <div className="dr-stat-icon gold">💰</div>
//               <div>
//                 <div className="dr-stat-value">₹{totalAmount.toLocaleString("en-IN")}</div>
//                 <div className="dr-stat-label">Total Amount</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Table Card ── */}
//         <div className="dr-table-card">
//           <div className="dr-table-topbar">
//             <div className="dr-table-title">
//               {searched ? `Transactions (${records.length})` : "Transactions"}
//             </div>
//           </div>

//           {/* Loading */}
//           {loading && (
//             <div className="dr-loading">
//               <div className="dr-spinner" /> Loading records...
//             </div>
//           )}

//           {/* Error */}
//           {!loading && error && (
//             <div className="dr-error">⚠️ {error}</div>
//           )}

//           {/* Hint before search */}
//           {!loading && !searched && (
//             <div className="dr-hint">
//               📅 Select a date range and click Search to view records.
//             </div>
//           )}

//           {/* Empty */}
//           {!loading && searched && !error && records.length === 0 && (
//             <div className="dr-empty">No records found for the selected date range.</div>
//           )}

//           {/* Table */}
//           {!loading && records.length > 0 && (
//             <div className="dr-table-scroll">
//               <table className="dr-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Txn ID</th>
//                     <th>Deposit ID</th>
//                     <th>Agency Code</th>
//                     <th>Type</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {records.map((r, i) => (
//                     <tr key={i}>
//                       <td style={{ color: "var(--dr-text-3)", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
//                         {String(i + 1).padStart(2, "0")}
//                       </td>
//                       <td><span className="dr-txn-id">{r.TransactionId}</span></td>
//                       <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px" }}>{r.DepositId}</td>
//                       <td style={{ fontWeight: 700 }}>{r.AgencyCode}</td>
//                       <td style={{ color: "var(--dr-text-2)" }}>{r.TransactionType}</td>
//                       <td><span className="dr-amount">₹ {Number(r.DepositAmount).toLocaleString("en-IN")}</span></td>
//                       <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--dr-text-2)" }}>{r.DepositDate}</td>
//                       <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--dr-text-2)" }}>{r.DepositTime}</td>
//                       <td>
//                         <span className={`dr-badge ${r.TxnStatus ? "success" : "failed"}`}>
//                           {r.TxnStatus ? "Success" : "Failed"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>

//       <Footer2 />
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./Sidebar";
import "../CSS/Depositrequest.css";
import Footer2 from "./Footer2";

export default function Depositrequest() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [searched, setSearched] = useState(false);

  const [fromDate, setFromDate] = useState(new Date("2024-01-01"));
  const [toDate, setToDate]     = useState(new Date());

  const API_URL   = process.env.REACT_APP_API_DEPOSIT;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;

  const formatDate = (date) => {
    const d = new Date(date);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    setRecords([]);
    setSearched(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AgencyKey: AGENCY_KEY,
          BookingId: null,
          AgencyCode: null,
          TransactionType: 0,
          PaymentStatus: 3,
          FromDate: formatDate(fromDate),
          ToDate: formatDate(toDate),
          PortalId: Number(PORTAL_ID),
          IsTC: true,
        }),
      });

      const data = await response.json();
      const list = data?.DeHistory || [];

      if (response.ok && Array.isArray(list)) {
        setRecords(list);
      } else {
        setError("No Data Found");
      }
    } catch (err) {
      console.error("Deposit history fetch failed:", err);
      setError("API Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // PaymentStatus enum (confirmed): 0 = Confirm, 1 = Pending, 2 = Rejected
  const getStatusLabel = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    const map = { 0: "Confirm", 1: "Pending", 2: "Rejected" };
    return map[val] ?? String(val);
  };

  const totalAmount   = records.reduce((sum, r) => sum + (Number(r.DepositAmount) || 0), 0);
  const confirmCount  = records.filter((r) => getStatusLabel(r.PaymentStatus).toLowerCase() === "confirm").length;
  const pendingCount  = records.filter((r) => getStatusLabel(r.PaymentStatus).toLowerCase() === "pending").length;

  return (
    <div>
      <Sidebar />

      <div className="dr-wrapper">

        {/* ── Header ── */}
        <div className="dr-page-title">
          <span>💳</span> Deposit Request
        </div>
        <div className="dr-page-sub">View and filter deposit transaction history</div>

        {/* ── Filter Card ── */}
        <div className="dr-filter-card">
          <div className="dr-filter-title">Filter Records</div>
          <div className="dr-filter-row">
            <div className="dr-field">
              <label>From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                dateFormat="dd-MM-yyyy"
                className="dateInput"
                maxDate={new Date()}
              />
            </div>

            <div className="dr-field">
              <label>To Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                dateFormat="dd-MM-yyyy"
                className="dateInput"
                maxDate={new Date()}
                minDate={fromDate}
              />
            </div>

            <button
              className="dr-search-btn"
              onClick={fetchRecords}
              disabled={loading}
            >
              {loading ? (
                <><div className="dr-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Searching...</>
              ) : (
                <> 🔍 Search </>
              )}
            </button>
          </div>
        </div>

        {/* ── Stats (only after search) ── */}
        {searched && !loading && records.length > 0 && (
          <div className="dr-stats">
            <div className="dr-stat-card">
              <div className="dr-stat-icon blue">📋</div>
              <div>
                <div className="dr-stat-value">{records.length}</div>
                <div className="dr-stat-label">Total Records</div>
              </div>
            </div>
            <div className="dr-stat-card">
              <div className="dr-stat-icon green">✅</div>
              <div>
                <div className="dr-stat-value">{confirmCount}</div>
                <div className="dr-stat-label">Confirmed</div>
              </div>
            </div>
            <div className="dr-stat-card">
              <div className="dr-stat-icon red">⏳</div>
              <div>
                <div className="dr-stat-value">{pendingCount}</div>
                <div className="dr-stat-label">Pending</div>
              </div>
            </div>
            <div className="dr-stat-card">
              <div className="dr-stat-icon gold">💰</div>
              <div>
                <div className="dr-stat-value">₹{totalAmount.toLocaleString("en-IN")}</div>
                <div className="dr-stat-label">Total Amount</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Table Card ── */}
        <div className="dr-table-card">
          <div className="dr-table-topbar">
            <div className="dr-table-title">
              {searched ? `Transactions (${records.length})` : "Transactions"}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="dr-loading">
              <div className="dr-spinner" /> Loading records...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="dr-error">⚠️ {error}</div>
          )}

          {/* Hint before search */}
          {!loading && !searched && (
            <div className="dr-hint">
              📅 Select a date range and click Search to view records.
            </div>
          )}

          {/* Empty */}
          {!loading && searched && !error && records.length === 0 && (
            <div className="dr-empty">No records found for the selected date range.</div>
          )}

          {/* Table */}
          {!loading && records.length > 0 && (
            <div className="dr-table-scroll">
              <table className="dr-table">
                <thead>
                  <tr>
                    <th>Agency Code</th>
                    <th>Transaction ID</th>
                    <th>Deposit ID</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Deposit Amount</th>
                    <th>Date &amp; Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => {
                    const statusLabel = getStatusLabel(r.PaymentStatus);
                    const status = statusLabel.toLowerCase();
                    const badgeClass =
                      status === "confirm" ? "success" :
                      status === "pending" ? "pending" : "failed";

                    return (
                      <tr key={r.TransactionId || i}>
                        <td style={{ fontWeight: 700 }}>{r.AgencyCode}</td>
                        <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px" }}>{r.TransactionId}</td>
                        <td><span className="dr-txn-id">{r.DepositId}</span></td>
                        <td style={{ color: "var(--dr-text-2)" }}>{r.TransactionType}</td>
                        <td>
                          <span className={`dr-badge ${badgeClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td><span className="dr-amount">{Number(r.DepositAmount || 0)}</span></td>
                        <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "var(--dr-text-2)" }}>
                          {r.DepositDate} - {r.DepositTime}
                        </td>
                        <td>
                          <button
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: 600,
                            }}
                            onClick={() => navigate("/edit-deposit", { state: { TransactionId: r.TransactionId } })}
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
          )}
        </div>

      </div>

      <Footer2 />
    </div>
  );
}