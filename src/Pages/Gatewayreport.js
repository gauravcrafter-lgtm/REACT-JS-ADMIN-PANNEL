
// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as XLSX from "xlsx";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";
// import "../CSS/Gatewayreport.css";
// import { loadAgencyConfig } from "../util/loadConfig";

// export default function Gatewayreport() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);

//   // ✅ web.config se AgencyKey + AccountNo
//   const [config, setConfig] = useState({
//     AgencyKey: "",
//     AccountNo: "",
//   });
//   const [loadingConfig, setLoadingConfig] = useState(true);

//   const API_URL = "https://promo.namantechnolab.com/api/Admin/AdminOperation";

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const cfg = await loadAgencyConfig();
//         setConfig({
//           AgencyKey: cfg.AgencyKey || "",
//           AccountNo: cfg.AccountNo || "",
//         });
//       } catch (err) {
//         console.error("Config load failed:", err);
//         setError("Config load failed. Please refresh.");
//       } finally {
//         setLoadingConfig(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}-${String(
//       d.getMonth() + 1
//     ).padStart(2, "0")}-${d.getFullYear()}`;
//   };

//   const fetchReports = async () => {
//     if (!fromDate || !toDate) {
//       setError("Please select both From and To dates.");
//       return;
//     }

//     if (!config.AgencyKey || !config.AccountNo) {
//       setError("AgencyKey / AccountNo missing from config");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setHasSearched(true);

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           FromDate: formatDate(fromDate),
//           ToDate: formatDate(toDate),
//           APIRequestType: 18,
//           AgencyKey: config.AgencyKey,           // ✅ config se
//           AccountNo: Number(config.AccountNo),   // ✅ config se
//         }),
//       });

//       const data = await response.json();
//       let arr = [];
//       if (Array.isArray(data)) arr = data;
//       else {
//         const key = Object.keys(data).find((k) => Array.isArray(data[k]));
//         if (key) arr = data[key];
//       }
//       setReports(arr);
//     } catch {
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportExcel = () => {
//     if (reports.length === 0) return;

//     const excelRows = reports.map((r) => ({
//       "Transaction ID": r.TransactionId || "",
//       Price: Number(r.PriceTransaction || 0),
//       "Gateway Charge": Number(r.GatewayCharge || 0),
//       Received: Number(r.RecivedAmount || 0),
//       Gateway: r.PaymentGateway || "",
//       "Booking Type": r.BookingType || "",
//       "Process Type": r.ProcessType || "",
//       Status: r.GatewayStatus || "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelRows);

//     worksheet["!cols"] = [
//       { wch: 18 },
//       { wch: 14 },
//       { wch: 16 },
//       { wch: 14 },
//       { wch: 16 },
//       { wch: 16 },
//       { wch: 16 },
//       { wch: 12 },
//     ];

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Gateway Report");

//     const fileFrom = fromDate ? formatDate(fromDate) : "all";
//     const fileTo = toDate ? formatDate(toDate) : "all";
//     XLSX.writeFile(
//       workbook,
//       `GatewayReport_${fileFrom}_to_${fileTo}.xlsx`
//     );
//   };

//   const successCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "success"
//   ).length;
//   const failedCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "failed"
//   ).length;
//   const pendingCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "pending"
//   ).length;
//   const totalReceived = reports.reduce(
//     (s, r) => s + (Number(r.RecivedAmount) || 0),
//     0
//   );

//   // API ProcessType ko readable label me show karne ke liye
//   const getProcessLabel = (type = "") => {
//     const value = type.toString().trim().toLowerCase();

//     if (value === "air") return "Flight";
//     if (value === "hotel") return "Hotel";

//     return type || "-";
//   };

//   const getStatusClass = (status = "") => {
//     const s = status.toLowerCase();
//     if (s === "success") return "success";
//     if (s === "failed") return "failed";
//     return "pending";
//   };

//   if (loadingConfig) {
//     return (
//       <>
//         <Sidebar />
//         <div className="gw-wrapper">
//           <div className="gw-loading">
//             <div className="gw-spinner" /> Loading Config...
//           </div>
//         </div>
//         <Footer2 />
//       </>
//     );
//   }

//   return (
//     <>
//       <Sidebar />

//       <div className="gw-wrapper">
//         <div className="gw-page-title">
//           <span>📊</span> Gateway Report
//         </div>
//         <div className="gw-page-sub">
//           View payment gateway transactions by date range
//         </div>

//         <div className="gw-filter-card">
//           <div className="gw-filter-label">Filter Records</div>
//           <div className="gw-filter-row">
//             <div className="gw-field">
//               <label>From Date</label>
//               <DatePicker
//                 selected={fromDate}
//                 onChange={(date) => setFromDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 maxDate={new Date()}
//                 className="gw-dateInput"
//                 placeholderText="Select From Date"
//               />
//             </div>

//             <div className="gw-field">
//               <label>To Date</label>
//               <DatePicker
//                 selected={toDate}
//                 onChange={(date) => setToDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 minDate={fromDate}
//                 maxDate={new Date()}
//                 className="gw-dateInput"
//                 placeholderText="Select To Date"
//               />
//             </div>

//             <button
//               className="gw-search-btn"
//               onClick={fetchReports}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <div
//                     className="gw-spinner"
//                     style={{ width: 14, height: 14, borderWidth: 2 }}
//                   />{" "}
//                   Searching...
//                 </>
//               ) : (
//                 <>🔍 Search</>
//               )}
//             </button>

//             <button
//               className="gw-search-btn"
//               onClick={handleExportExcel}
//               disabled={reports.length === 0}
//             >
//               📤 Export Excel
//             </button>
//           </div>
//         </div>

//         {hasSearched && !loading && reports.length > 0 && (
//           <div className="gw-stats">
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon blue">📋</div>
//               <div>
//                 <div className="gw-stat-value">{reports.length}</div>
//                 <div className="gw-stat-label">Total Records</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon green">✅</div>
//               <div>
//                 <div className="gw-stat-value">{successCount}</div>
//                 <div className="gw-stat-label">Success</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon red">❌</div>
//               <div>
//                 <div className="gw-stat-value">{failedCount}</div>
//                 <div className="gw-stat-label">Failed</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon orange">⏳</div>
//               <div>
//                 <div className="gw-stat-value">{pendingCount}</div>
//                 <div className="gw-stat-label">Pending</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon gold">💰</div>
//               <div>
//                 <div className="gw-stat-value">
//                   ₹{totalReceived.toLocaleString("en-IN")}
//                 </div>
//                 <div className="gw-stat-label">Total Received</div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="gw-table-card">
//           <div className="gw-table-topbar">
//             <div className="gw-table-title">
//               {hasSearched
//                 ? `Transactions (${reports.length})`
//                 : "Transactions"}
//             </div>
//           </div>

//           {loading && (
//             <div className="gw-loading">
//               <div className="gw-spinner" /> Loading records...
//             </div>
//           )}

//           {!loading && error && (
//             <div className="gw-error-msg">⚠️ {error}</div>
//           )}

//           {!loading && !hasSearched && (
//             <div className="gw-hint">
//               📅 Select a date range and click Search to view gateway reports.
//             </div>
//           )}

//           {!loading && hasSearched && !error && reports.length === 0 && (
//             <div className="gw-empty">
//               No records found for selected date range.
//             </div>
//           )}

//           {!loading && reports.length > 0 && (
//             <div className="gw-table-scroll">
//               <table className="gw-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Transaction ID</th>
//                     <th>Price</th>
//                     <th>Gateway Charge</th>
//                     <th>Received</th>
//                     <th>Gateway</th>
//                     <th>Booking Type</th>
//                     <th>Process Type</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reports.map((r, i) => (
//                     <tr key={i}>
//                       <td
//                         style={{
//                           color: "var(--gw-text-3)",
//                           fontFamily: "'DM Mono',monospace",
//                           fontSize: "12px",
//                         }}
//                       >
//                         {String(i + 1).padStart(2, "0")}
//                       </td>
//                       <td>
//                         <span className="gw-txn-chip">{r.TransactionId}</span>
//                       </td>
//                       <td>
//                         <span className="gw-amount">
//                           ₹
//                           {Number(r.PriceTransaction || 0).toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>
//                       </td>
//                       <td
//                         style={{
//                           fontFamily: "'DM Mono',monospace",
//                           fontSize: "13px",
//                           color: "var(--gw-text-2)",
//                         }}
//                       >
//                         ₹
//                         {Number(r.GatewayCharge || 0).toLocaleString("en-IN")}
//                       </td>
//                       <td>
//                         <span className="gw-amount">
//                           ₹
//                           {Number(r.RecivedAmount || 0).toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>
//                       </td>
//                       <td style={{ fontWeight: 700 }}>{r.PaymentGateway}</td>
//                       <td>
//                         <span className="gw-booking-badge">
//                           {r.BookingType}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="gw-booking-badge">
//                           {getProcessLabel(r.ProcessType)}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`gw-badge ${getStatusClass(
//                             r.GatewayStatus
//                           )}`}
//                         >
//                           {r.GatewayStatus}
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
//     </>
//   );
// }
// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as XLSX from "xlsx";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";
// import "../CSS/Gatewayreport.css";
// import { loadAgencyConfig } from "../util/loadConfig";

// export default function Gatewayreport() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);

//   const [config, setConfig] = useState({
//     AgencyKey: "",
//     AccountNo: "",
//   });
//   const [loadingConfig, setLoadingConfig] = useState(true);

//   const API_URL = "https://promo.namantechnolab.com/api/Admin/AdminOperation";

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const cfg = await loadAgencyConfig();
//         setConfig({
//           AgencyKey: cfg.AgencyKey || "",
//           AccountNo: cfg.AccountNo || "",
//         });
//       } catch (err) {
//         console.error("Config load failed:", err);
//         setError("Config load failed. Please refresh.");
//       } finally {
//         setLoadingConfig(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}-${String(
//       d.getMonth() + 1
//     ).padStart(2, "0")}-${d.getFullYear()}`;
//   };

//   // TxnDate (e.g. "2026-10-07T17:39:07") ko readable format mein convert karta hai
//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return "-";
//     try {
//       const d = new Date(dateStr);
//       if (isNaN(d.getTime())) return dateStr;
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       });
//     } catch {
//       return dateStr;
//     }
//   };

//   const fetchReports = async () => {
//     if (!fromDate || !toDate) {
//       setError("Please select both From and To dates.");
//       return;
//     }

//     if (!config.AgencyKey || !config.AccountNo) {
//       setError("AgencyKey / AccountNo missing from config");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setHasSearched(true);

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           FromDate: formatDate(fromDate),
//           ToDate: formatDate(toDate),
//           APIRequestType: 18,
//           AgencyKey: config.AgencyKey,
//           AccountNo: Number(config.AccountNo),
//         }),
//       });

//       const data = await response.json();
//       let arr = [];
//       if (Array.isArray(data)) {
//         arr = data;
//       } else {
//         // Response mein PGMasterRs array aata hai
//         const key = Object.keys(data).find((k) => Array.isArray(data[k]));
//         if (key) arr = data[key];
//       }
//       setReports(arr);
//     } catch {
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportExcel = () => {
//     if (reports.length === 0) return;

//     const excelRows = reports.map((r) => ({
//       "Transaction ID": r.TransactionId || "",
//       "Date & Time": formatDateTime(r.TxnDate), // ✅ TxnDate
//       Price: Number(r.PriceTransaction || 0),
//       "Gateway Charge": Number(r.GatewayCharge || 0),
//       Received: Number(r.RecivedAmount || 0),
//       Gateway: r.PaymentGateway || "",
//       "Booking Type": r.BookingType || "",
//       "Process Type": r.ProcessType || "",
//       Status: r.GatewayStatus || "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelRows);

//     worksheet["!cols"] = [
//       { wch: 18 }, // Transaction ID
//       { wch: 22 }, // Date & Time
//       { wch: 14 }, // Price
//       { wch: 16 }, // Gateway Charge
//       { wch: 14 }, // Received
//       { wch: 16 }, // Gateway
//       { wch: 16 }, // Booking Type
//       { wch: 16 }, // Process Type
//       { wch: 12 }, // Status
//     ];

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Gateway Report");

//     const fileFrom = fromDate ? formatDate(fromDate) : "all";
//     const fileTo = toDate ? formatDate(toDate) : "all";
//     XLSX.writeFile(
//       workbook,
//       `GatewayReport_${fileFrom}_to_${fileTo}.xlsx`
//     );
//   };

//   const successCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "success"
//   ).length;
//   const failedCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "failed"
//   ).length;
//   const pendingCount = reports.filter(
//     (r) => r.GatewayStatus?.toLowerCase() === "pending"
//   ).length;
//   const totalReceived = reports.reduce(
//     (s, r) => s + (Number(r.RecivedAmount) || 0),
//     0
//   );

//   const getProcessLabel = (type = "") => {
//     const value = type.toString().trim().toLowerCase();
//     if (value === "air") return "Flight";
//     if (value === "hotel") return "Hotel";
//     return type || "-";
//   };

//   const getStatusClass = (status = "") => {
//     const s = status.toLowerCase();
//     if (s === "success") return "success";
//     if (s === "failed") return "failed";
//     return "pending";
//   };

//   if (loadingConfig) {
//     return (
//       <>
//         <Sidebar />
//         <div className="gw-wrapper">
//           <div className="gw-loading">
//             <div className="gw-spinner" /> Loading Config...
//           </div>
//         </div>
//         <Footer2 />
//       </>
//     );
//   }

//   return (
//     <>
//       <Sidebar />

//       <div className="gw-wrapper">
//         <div className="gw-page-title">
//           <span>📊</span> Gateway Report
//         </div>
//         <div className="gw-page-sub">
//           View payment gateway transactions by date range
//         </div>

//         <div className="gw-filter-card">
//           <div className="gw-filter-label">Filter Records</div>
//           <div className="gw-filter-row">
//             <div className="gw-field">
//               <label>From Date</label>
//               <DatePicker
//                 selected={fromDate}
//                 onChange={(date) => setFromDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 maxDate={new Date()}
//                 className="gw-dateInput"
//                 placeholderText="Select From Date"
//               />
//             </div>

//             <div className="gw-field">
//               <label>To Date</label>
//               <DatePicker
//                 selected={toDate}
//                 onChange={(date) => setToDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 minDate={fromDate}
//                 maxDate={new Date()}
//                 className="gw-dateInput"
//                 placeholderText="Select To Date"
//               />
//             </div>

//             <button
//               className="gw-search-btn"
//               onClick={fetchReports}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <div
//                     className="gw-spinner"
//                     style={{ width: 14, height: 14, borderWidth: 2 }}
//                   />{" "}
//                   Searching...
//                 </>
//               ) : (
//                 <>🔍 Search</>
//               )}
//             </button>

//             <button
//               className="gw-search-btn"
//               onClick={handleExportExcel}
//               disabled={reports.length === 0}
//             >
//               📤 Export Excel
//             </button>
//           </div>
//         </div>

//         {hasSearched && !loading && reports.length > 0 && (
//           <div className="gw-stats">
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon blue">📋</div>
//               <div>
//                 <div className="gw-stat-value">{reports.length}</div>
//                 <div className="gw-stat-label">Total Records</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon green">✅</div>
//               <div>
//                 <div className="gw-stat-value">{successCount}</div>
//                 <div className="gw-stat-label">Success</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon red">❌</div>
//               <div>
//                 <div className="gw-stat-value">{failedCount}</div>
//                 <div className="gw-stat-label">Failed</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon orange">⏳</div>
//               <div>
//                 <div className="gw-stat-value">{pendingCount}</div>
//                 <div className="gw-stat-label">Pending</div>
//               </div>
//             </div>
//             <div className="gw-stat-card">
//               <div className="gw-stat-icon gold">💰</div>
//               <div>
//                 <div className="gw-stat-value">
//                   ₹{totalReceived.toLocaleString("en-IN")}
//                 </div>
//                 <div className="gw-stat-label">Total Received</div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="gw-table-card">
//           <div className="gw-table-topbar">
//             <div className="gw-table-title">
//               {hasSearched
//                 ? `Transactions (${reports.length})`
//                 : "Transactions"}
//             </div>
//           </div>

//           {loading && (
//             <div className="gw-loading">
//               <div className="gw-spinner" /> Loading records...
//             </div>
//           )}

//           {!loading && error && (
//             <div className="gw-error-msg">⚠️ {error}</div>
//           )}

//           {!loading && !hasSearched && (
//             <div className="gw-hint">
//               📅 Select a date range and click Search to view gateway reports.
//             </div>
//           )}

//           {!loading && hasSearched && !error && reports.length === 0 && (
//             <div className="gw-empty">
//               No records found for selected date range.
//             </div>
//           )}

//           {!loading && reports.length > 0 && (
//             <div className="gw-table-scroll">
//               <table className="gw-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Transaction ID</th>
//                     <th>Date & Time</th>
//                     <th>Price</th>
//                     <th>Gateway Charge</th>
//                     <th>Received</th>
//                     <th>Gateway</th>
//                     <th>Booking Type</th>
//                     <th>Process Type</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reports.map((r, i) => (
//                     <tr key={i}>
//                       <td
//                         style={{
//                           color: "var(--gw-text-3)",
//                           fontFamily: "'DM Mono',monospace",
//                           fontSize: "12px",
//                         }}
//                       >
//                         {String(i + 1).padStart(2, "0")}
//                       </td>
//                       <td>
//                         <span className="gw-txn-chip">{r.TransactionId}</span>
//                       </td>
//                       <td
//                         style={{
//                           fontFamily: "'DM Mono',monospace",
//                           fontSize: "12.5px",
//                           color: "var(--gw-text-2)",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {formatDateTime(r.TxnDate)}
//                       </td>
//                       <td>
//                         <span className="gw-amount">
//                           ₹
//                           {Number(r.PriceTransaction || 0).toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>
//                       </td>
//                       <td
//                         style={{
//                           fontFamily: "'DM Mono',monospace",
//                           fontSize: "13px",
//                           color: "var(--gw-text-2)",
//                         }}
//                       >
//                         ₹
//                         {Number(r.GatewayCharge || 0).toLocaleString("en-IN")}
//                       </td>
//                       <td>
//                         <span className="gw-amount">
//                           ₹
//                           {Number(r.RecivedAmount || 0).toLocaleString(
//                             "en-IN"
//                           )}
//                         </span>
//                       </td>
//                       <td style={{ fontWeight: 700 }}>{r.PaymentGateway}</td>
//                       <td>
//                         <span className="gw-booking-badge">
//                           {r.BookingType}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="gw-booking-badge">
//                           {getProcessLabel(r.ProcessType)}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`gw-badge ${getStatusClass(
//                             r.GatewayStatus
//                           )}`}
//                         >
//                           {r.GatewayStatus}
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
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Gatewayreport.css";
import { loadAgencyConfig } from "../util/loadConfig";

export default function Gatewayreport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [config, setConfig] = useState({
    AgencyKey: "",
    AccountNo: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  const API_URL = "https://promo.namantechnolab.com/api/Admin/AdminOperation";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          AccountNo: cfg.AccountNo || "",
        });
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
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  // TxnDate (e.g. "2026-10-07T17:39:07") ko readable format mein convert karta hai
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    } catch {
      return dateStr;
    }
  };

  // Duplicate records hatao - TransactionId ke basis pe
  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const id = item.TransactionId;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const fetchReports = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both From and To dates.");
      return;
    }

    if (!config.AgencyKey || !config.AccountNo) {
      setError("AgencyKey / AccountNo missing from config");
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
          AgencyKey: config.AgencyKey,
          AccountNo: Number(config.AccountNo),
        }),
      });

      const data = await response.json();
      let arr = [];
      if (Array.isArray(data)) {
        arr = data;
      } else {
        // Response mein PGMasterRs array aata hai
        const key = Object.keys(data).find((k) => Array.isArray(data[k]));
        if (key) arr = data[key];
      }

      // ✅ Duplicates hata diya
      const uniqueArr = removeDuplicates(arr);
      setReports(uniqueArr);
    } catch {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (reports.length === 0) return;

    const excelRows = reports.map((r) => ({
      "Transaction ID": r.TransactionId || "",
      "Date & Time": formatDateTime(r.TxnDate),
      Price: Number(r.PriceTransaction || 0),
      "Gateway Charge": Number(r.GatewayCharge || 0),
      Received: Number(r.RecivedAmount || 0),
      Gateway: r.PaymentGateway || "",
      "Booking Type": r.BookingType || "",
      "Process Type": r.ProcessType || "",
      Status: r.GatewayStatus || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelRows);

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 14 },
      { wch: 16 },
      { wch: 14 },
      { wch: 16 },
      { wch: 16 },
      { wch: 16 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gateway Report");

    const fileFrom = fromDate ? formatDate(fromDate) : "all";
    const fileTo = toDate ? formatDate(toDate) : "all";
    XLSX.writeFile(
      workbook,
      `GatewayReport_${fileFrom}_to_${fileTo}.xlsx`
    );
  };

  const successCount = reports.filter(
    (r) => r.GatewayStatus?.toLowerCase() === "success"
  ).length;
  const failedCount = reports.filter(
    (r) => r.GatewayStatus?.toLowerCase() === "failed"
  ).length;
  const pendingCount = reports.filter(
    (r) => r.GatewayStatus?.toLowerCase() === "pending"
  ).length;
  const totalReceived = reports.reduce(
    (s, r) => s + (Number(r.RecivedAmount) || 0),
    0
  );

  const getProcessLabel = (type = "") => {
    const value = type.toString().trim().toLowerCase();
    if (value === "air") return "Flight";
    if (value === "hotel") return "Hotel";
    return type || "-";
  };

  const getStatusClass = (status = "") => {
    const s = status.toLowerCase();
    if (s === "success") return "success";
    if (s === "failed") return "failed";
    return "pending";
  };

  if (loadingConfig) {
    return (
      <>
        <Sidebar />
        <div className="gw-wrapper">
          <div className="gw-loading">
            <div className="gw-spinner" /> Loading Config...
          </div>
        </div>
        <Footer2 />
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <div className="gw-wrapper">
        <div className="gw-page-title">
          <span>📊</span> Gateway Report
        </div>
        <div className="gw-page-sub">
          View payment gateway transactions by date range
        </div>

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
              {loading ? (
                <>
                  <div
                    className="gw-spinner"
                    style={{ width: 14, height: 14, borderWidth: 2 }}
                  />{" "}
                  Searching...
                </>
              ) : (
                <>🔍 Search</>
              )}
            </button>

            <button
              className="gw-search-btn"
              onClick={handleExportExcel}
              disabled={reports.length === 0}
            >
              📤 Export Excel
            </button>
          </div>
        </div>

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
                <div className="gw-stat-value">
                  ₹{totalReceived.toLocaleString("en-IN")}
                </div>
                <div className="gw-stat-label">Total Received</div>
              </div>
            </div>
          </div>
        )}

        <div className="gw-table-card">
          <div className="gw-table-topbar">
            <div className="gw-table-title">
              {hasSearched
                ? `Transactions (${reports.length})`
                : "Transactions"}
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
            <div className="gw-empty">
              No records found for selected date range.
            </div>
          )}

          {!loading && reports.length > 0 && (
            <div className="gw-table-scroll">
              <table className="gw-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Date & Time</th>
                    <th>Price</th>
                    <th>Gateway Charge</th>
                    <th>Received</th>
                    <th>Gateway</th>
                    <th>Booking Type</th>
                    <th>Process Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={r.TransactionId || `row-${i}`}>
                      <td
                        style={{
                          color: "var(--gw-text-3)",
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "12px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <span className="gw-txn-chip">{r.TransactionId}</span>
                      </td>
                      <td
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "12.5px",
                          color: "var(--gw-text-2)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDateTime(r.TxnDate)}
                      </td>
                      <td>
                        <span className="gw-amount">
                          ₹
                          {Number(r.PriceTransaction || 0).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </td>
                      <td
                        style={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "13px",
                          color: "var(--gw-text-2)",
                        }}
                      >
                        ₹
                        {Number(r.GatewayCharge || 0).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className="gw-amount">
                          ₹
                          {Number(r.RecivedAmount || 0).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{r.PaymentGateway}</td>
                      <td>
                        <span className="gw-booking-badge">
                          {r.BookingType}
                        </span>
                      </td>
                      <td>
                        <span className="gw-booking-badge">
                          {getProcessLabel(r.ProcessType)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`gw-badge ${getStatusClass(
                            r.GatewayStatus
                          )}`}
                        >
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