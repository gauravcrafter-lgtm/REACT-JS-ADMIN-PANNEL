// import React, { useState, useEffect, useMemo } from "react";
// import * as XLSX from "xlsx";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";
// import { loadAgencyConfig } from "../util/loadConfig";

// /* ------------------------------------------------------------------ */
// /* Constants                                                           */
// /* ------------------------------------------------------------------ */
// const API_BOOKING_HISTORY =
//   "https://api.namantechnolab.com/api/Admin/AdminBookingHistory";
// const API_PAX_BOOKING =
//   "https://promo.namantechnolab.com/api/Operation/PaxBookingRQ";

// const REQ_LOAD_PAX_FARE = 20;
// const REQ_REFUND = 21;

// const PAGE_SIZE = 25;

// const EMPTY_ROW_FORM = {
//   fare: null, // number
//   fareError: "",
//   cancelCharge: "",
//   serviceCharge: "",
//   remark: "",
//   loadingFare: false,
//   submitting: false,
// };

// /* ------------------------------------------------------------------ */
// /* Helpers                                                             */
// /* ------------------------------------------------------------------ */

// // One unique key per row. Round-trip bookings have 2 rows with the same
// // BookingId, so BookingId/TransactionId alone is not unique.
// const getRowKey = (item) =>
//   [
//     item.TransactionId,
//     item.BookingId,
//     item.Sector,
//     item.DepartureDate,
//     item.DepartureTime,
//   ].join("|");

// const isBlank = (v) => v === null || v === undefined || v === "";

// const money = (n) => Number(n).toFixed(2);

// /**
//  * Single place that decides which passenger details are sent to the API.
//  * NO guessing / NO default values: if a value is missing, the action is blocked.
//  *
//  * TODO (backend): AdminBookingHistory returns PaxId / PaxType / BoundType /
//  * AccountNo as null (or does not return them). When the passenger-list API is
//  * available, call it here (or when the row is opened) and merge the values
//  * into `item`, then everything below starts working without further changes.
//  */
// const resolvePaxDetails = (item, config) => {
//   const details = {
//     TransactionId: item.TransactionId,
//     PaxId: item.PaxId,
//     PaxType: item.PaxType,
//     BoundType: item.BoundType,
//     AccountNo: item.AccountNo ?? config.AccountNo,
//   };

//   const zeroIsInvalid = ["TransactionId", "PaxId", "AccountNo"];
//   const missing = Object.entries(details)
//     .filter(([key, value]) => {
//       if (isBlank(value)) return true;
//       if (zeroIsInvalid.includes(key) && Number(value) === 0) return true;
//       return false;
//     })
//     .map(([key]) => key);

//   return { details, missing };
// };

// const buildPayload = (requestType, details, config, extra = {}) => ({
//   APIRequestType: requestType,
//   AdminKey: config.AdminKey,
//   TransactionId: Number(details.TransactionId),
//   BookingId: details.BookingId,
//   PaxId: Number(details.PaxId),
//   PaxType: String(details.PaxType),
//   BoundType: String(details.BoundType),
//   CancelCharge: 0,
//   ServiceCharge: 0,
//   Remark: null,
//   AccountNo: Number(details.AccountNo),
//   ...extra,
// });

// // The API answers HTTP 200 with an all-default object when it did not
// // process anything (TransactionId 0, Status 0, no message).
// const isEmptyApiResponse = (result) =>
//   !result ||
//   (Number(result.Status) === 0 &&
//     Number(result.TransactionId) === 0 &&
//     !result.Msg &&
//     !result?.Error?.ErrorDesc);

// const getApiError = (result) =>
//   result?.Error?.ErrorDesc || result?.Msg || result?.Message || "";

// const postJson = async (url, body) => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   let result = null;
//   try {
//     result = await response.json();
//   } catch (e) {
//     result = null;
//   }

//   if (!response.ok) {
//     throw new Error(
//       getApiError(result) || `Request failed (HTTP ${response.status}).`
//     );
//   }
//   return result;
// };

// /* ------------------------------------------------------------------ */
// /* Component                                                           */
// /* ------------------------------------------------------------------ */
// const BookingHistory = () => {
//   const [filters, setFilters] = useState({
//     FromDate: "2026-02-10",
//     ToDate: "2026-07-20",
//     BookingId: "",
//     AirlinePnr: "",
//     Status: 0,
//   });

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);

//   const [expandedKey, setExpandedKey] = useState(null);
//   const [rowForms, setRowForms] = useState({});

//   // AgencyKey + PortalId + AdminKey (+ optional AccountNo) from web.config
//   const [config, setConfig] = useState({
//     AgencyKey: "",
//     PortalId: "",
//     AdminKey: "",
//     AccountNo: null,
//   });
//   const [loadingConfig, setLoadingConfig] = useState(true);

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const cfg = await loadAgencyConfig();
//         setConfig({
//           AgencyKey: cfg.AgencyKey || "",
//           PortalId: cfg.PortalId || "",
//           AdminKey: cfg.AdminKey || "",
//           AccountNo: cfg.AccountNo ?? null,
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

//   /* ------------------------- filters / list ------------------------- */
//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const toApiDate = (isoDate) => {
//     if (!isoDate) return "";
//     const [y, m, d] = isoDate.split("-");
//     return `${d}-${m}-${y}`;
//   };

//   const fetchData = async () => {
//     if (!config.AgencyKey || !config.PortalId) {
//       setError("AgencyKey / PortalId missing from config.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setExpandedKey(null);
//     setRowForms({});
//     setPage(1);

//     try {
//       const result = await postJson(API_BOOKING_HISTORY, {
       
//     UserKey: null,
//     AgencyKey: config.AgencyKey,
//     FromDate: toApiDate(filters.FromDate),
//     ToDate: toApiDate(filters.ToDate),
//     TravelDate: null,
//     BookingId: filters.BookingId,
//     AirlinePnr: filters.AirlinePnr,
//     AgencyCode: null,
//     BookingStatus: Number(filters.Status),
//     PortalId: Number(config.PortalId),
//     IsTC: true,
//     ReportType: 2
// }
//       );

//       if (result && Array.isArray(result.BookingHistory)) {
//         setData(result.BookingHistory);
//         if (result.BookingHistory.length === 0) setError("No records found.");
//       } else {
//         setData([]);
//         setError("No records found.");
//       }
//     } catch (err) {
//       console.error("Fetch booking history error:", err);
//       setData([]);
//       setError("Error fetching data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
//   const pageRows = useMemo(
//     () => data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
//     [data, page]
//   );

//   const handleExportExcel = () => {
//     if (!data || data.length === 0) {
//       alert("No data to export.");
//       return;
//     }

//     const exportData = data.map((item) => ({
//       Agency: item.AgencyName,
//       "Booking ID": item.BookingId,
//       "Booking Date": item.BookingDate,
//       PNR: item.AirlinePnr,
//       Sector: item.Sector,
//       Status: item.Status ? item.Status : "Cancel Under Process",
//       "Pax Type": item.PaxType || "",
//       "Passenger Name": item.PaxName || item.LeadPax || "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "BookingHistory");
//     XLSX.writeFile(workbook, `BookingHistory_${Date.now()}.xlsx`);
//   };

//   /* --------------------------- row state ---------------------------- */
//   const getRowForm = (rowKey) => rowForms[rowKey] || EMPTY_ROW_FORM;

//   // Functional update => always uses the latest state (no stale closure).
//   const updateRowForm = (rowKey, patch) => {
//     setRowForms((prev) => ({
//       ...prev,
//       [rowKey]: { ...EMPTY_ROW_FORM, ...prev[rowKey], ...patch },
//     }));
//   };

//   const toggleRow = (rowKey) => {
//     setExpandedKey((prev) => (prev === rowKey ? null : rowKey));
//   };

//   /* ------------------------- Load Pax Fare -------------------------- */
//   const handleLoadPaxFare = async (rowKey, item) => {
//     const { details, missing } = resolvePaxDetails(item, config);

//     if (missing.length > 0) {
//       updateRowForm(rowKey, {
//         fare: null,
//         fareError: `Passenger details missing: ${missing.join(", ")}.`,
//       });
//       return;
//     }
//     if (!config.AdminKey) {
//       updateRowForm(rowKey, {
//         fare: null,
//         fareError: "AdminKey is missing from config.",
//       });
//       return;
//     }

//     updateRowForm(rowKey, { loadingFare: true, fare: null, fareError: "" });

//     try {
//       const payload = buildPayload(
//         REQ_LOAD_PAX_FARE,
//         { ...details, BookingId: item.BookingId },
//         config
//       );
//       console.log("Load Pax Fare Request:", JSON.stringify(payload, null, 2));

//       const result = await postJson(API_PAX_BOOKING, payload);
//       console.log("Load Pax Fare Response:", JSON.stringify(result, null, 2));

//       const apiError = getApiError(result);
//       const fareNum = Number(result?.PaxNetFare);

//       if (apiError) {
//         updateRowForm(rowKey, { fareError: apiError, loadingFare: false });
//       } else if (isEmptyApiResponse(result) || !(fareNum > 0)) {
//         updateRowForm(rowKey, {
//           fareError:
//             "Fare not available. The server returned an empty response for this passenger.",
//           loadingFare: false,
//         });
//       } else {
//         updateRowForm(rowKey, { fare: fareNum, loadingFare: false });
//       }
//     } catch (err) {
//       console.error("Load Pax Fare Error:", err);
//       updateRowForm(rowKey, {
//         fare: null,
//         fareError: err.message || "Failed to load Pax Fare.",
//         loadingFare: false,
//       });
//     }
//   };

//   /* --------------------------- Submit refund ------------------------ */
//   const handleSubmitCancellation = async (rowKey, item) => {
//     const form = getRowForm(rowKey);

//     const { details, missing } = resolvePaxDetails(item, config);
//     if (missing.length > 0) {
//       alert(`Cannot submit. Passenger details missing: ${missing.join(", ")}.`);
//       return;
//     }
//     if (!config.AdminKey) {
//       alert("Cannot submit. AdminKey is missing from config.");
//       return;
//     }
//     if (!(form.fare > 0)) {
//       alert("Please load the Pax Fare first.");
//       return;
//     }

//     const cancelCharge = Number(form.cancelCharge);
//     const serviceCharge = Number(form.serviceCharge);

//     if (form.cancelCharge === "" || Number.isNaN(cancelCharge) || cancelCharge < 0) {
//       alert("Please enter a valid Cancel Charge.");
//       return;
//     }
//     if (form.serviceCharge === "" || Number.isNaN(serviceCharge) || serviceCharge < 0) {
//       alert("Please enter a valid Service Charge.");
//       return;
//     }

//     const totalCharges = cancelCharge + serviceCharge;
//     if (totalCharges > form.fare) {
//       alert(
//         `Cancel Charge + Service Charge (${money(totalCharges)}) cannot be more than the Pax Fare (${money(form.fare)}).`
//       );
//       return;
//     }

//     const refundAmount = form.fare - totalCharges;

//     const ok = window.confirm(
//       [
//         "Do you want to process this refund?",
//         "",
//         `Booking: ${item.BookingId}`,
//         `Pax Fare: ${money(form.fare)}`,
//         `Cancel Charge: ${money(cancelCharge)}`,
//         `Service Charge: ${money(serviceCharge)}`,
//         `Refund Amount: ${money(refundAmount)}`,
//       ].join("\n")
//     );
//     if (!ok) return;

//     updateRowForm(rowKey, { submitting: true });

//     try {
//       const payload = buildPayload(
//         REQ_REFUND,
//         { ...details, BookingId: item.BookingId },
//         config,
//         {
//           CancelCharge: cancelCharge,
//           ServiceCharge: serviceCharge,
//           Remark: form.remark?.trim() || "Pax Refunded",
//         }
//       );
//       console.log("Submit Refund Request:", JSON.stringify(payload, null, 2));

//       const result = await postJson(API_PAX_BOOKING, payload);
//       console.log("Submit Refund Response:", JSON.stringify(result, null, 2));

//       const apiError = getApiError(result);
//       const isFailure = Boolean(result?.Error?.ErrorDesc) || isEmptyApiResponse(result);

//       if (isFailure) {
//         throw new Error(
//           apiError ||
//             "The server did not process the refund (empty response). Nothing was refunded."
//         );
//       }

//       alert(
//         `Refund request submitted.\nRefund Amount: ${money(refundAmount)}${
//           apiError ? `\n\nServer message: ${apiError}` : ""
//         }`
//       );
//       setExpandedKey(null);
//       updateRowForm(rowKey, { submitting: false });
//       fetchData(); // refresh list
//     } catch (err) {
//       console.error("Submit Refund Error:", err);
//       alert(`Failed to submit refund.\n\n${err.message || "Please try again."}`);
//       updateRowForm(rowKey, { submitting: false });
//     }
//   };

//   /* ----------------------------- render ----------------------------- */
//   if (loadingConfig) {
//     return (
//       <div className="bh-shell">
//         <Sidebar />
//         <div className="bh-container">
//           <div className="bh-state">
//             <div className="bh-spinner" />
//             <p>Loading Config...</p>
//           </div>
//         </div>
//         <Footer2 />
//       </div>
//     );
//   }

//   return (
//     <div className="bh-shell">
//       <Sidebar />

//       <div className="bh-container">
//         <div className="bh-header">
//           <span className="bh-eyebrow">Admin · Bookings</span>
//           <h2 className="bh-title">Flight Cancellation</h2>
//         </div>

//         <div className="bh-filters-card">
//           <div className="bh-filters">
//             <div className="bh-field">
//               <label className="bh-label">From date</label>
//               <input
//                 type="date"
//                 name="FromDate"
//                 value={filters.FromDate}
//                 onChange={handleChange}
//                 className="bh-input"
//               />
//             </div>

//             <div className="bh-field">
//               <label className="bh-label">To date</label>
//               <input
//                 type="date"
//                 name="ToDate"
//                 value={filters.ToDate}
//                 onChange={handleChange}
//                 className="bh-input"
//               />
//             </div>

//             <div className="bh-field">
//               <label className="bh-label">Booking ID</label>
//               <input
//                 type="text"
//                 name="BookingId"
//                 value={filters.BookingId}
//                 onChange={handleChange}
//                 placeholder="Enter Booking Id"
//                 className="bh-input"
//               />
//             </div>

//             <div className="bh-field">
//               <label className="bh-label">Airline PNR</label>
//               <input
//                 type="text"
//                 name="AirlinePnr"
//                 value={filters.AirlinePnr}
//                 onChange={handleChange}
//                 placeholder="Enter Airline PNR"
//                 className="bh-input"
//               />
//             </div>

//             <div className="bh-field">
//               <label className="bh-label">Status</label>
//               <select
//                 name="Status"
//                 value={filters.Status}
//                 onChange={handleChange}
//                 className="bh-input bh-select"
//               >
//                 <option value={0}>Pending</option>
//                 <option value={1}>Completed</option>
//               </select>
//             </div>

//             <button onClick={fetchData} className="bh-search-btn">
//               Search
//             </button>
//           </div>
//         </div>

//         <div className="bh-table-card">
//           <div className="bh-table-toolbar">
//             <button
//               onClick={handleExportExcel}
//               className="bh-export-btn"
//               disabled={data.length === 0}
//             >
//               Export to Excel
//             </button>
//           </div>

//           {loading ? (
//             <div className="bh-state">
//               <div className="bh-spinner" />
//               <p>Loading bookings…</p>
//             </div>
//           ) : error ? (
//             <div className="bh-state bh-state-error">
//               <p>{error}</p>
//             </div>
//           ) : data.length > 0 ? (
//             <>
//               <div className="bh-table-wrap">
//                 <table className="bh-table">
//                   <thead>
//                     <tr>
//                       <th>Agency</th>
//                       <th>Booking ID</th>
//                       <th>Booking Date</th>
//                       <th>PNR</th>
//                       <th>Sector</th>
//                       <th>Status</th>
//                       <th>Pax Type</th>
//                       <th>Passenger Name</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {pageRows.map((item) => {
//                       const rowKey = getRowKey(item);
//                       const isOpen = expandedKey === rowKey;
//                       const cancelStatusText = item.Status
//                         ? item.Status
//                         : "Cancel Under Process";
//                       const form = getRowForm(rowKey);
//                       const { missing } = resolvePaxDetails(item, config);
//                       const blocked = missing.length > 0;
//                       const passengerName = item.PaxName || item.LeadPax || "-";

//                       const cancelCharge = Number(form.cancelCharge) || 0;
//                       const serviceCharge = Number(form.serviceCharge) || 0;
//                       const refundPreview =
//                         form.fare > 0
//                           ? form.fare - cancelCharge - serviceCharge
//                           : null;

//                       return (
//                         <React.Fragment key={rowKey}>
//                           <tr className={isOpen ? "bh-row-active" : ""}>
//                             <td>{item.AgencyName}</td>
//                             <td className="bh-mono">{item.BookingId}</td>
//                             <td>{item.BookingDate}</td>
//                             <td className="bh-mono">{item.AirlinePnr}</td>
//                             <td>{item.Sector}</td>
//                             <td>
//                               <span
//                                 className={`bh-badge ${
//                                   item.Status
//                                     ? "bh-badge-done"
//                                     : "bh-badge-pending"
//                                 }`}
//                               >
//                                 {cancelStatusText}
//                               </span>
//                             </td>
//                             <td>{item.PaxType || "-"}</td>
//                             <td>{passengerName}</td>
//                             <td>
//                               <button
//                                 className={`bh-action-btn ${
//                                   isOpen ? "bh-action-btn-active" : ""
//                                 }`}
//                                 onClick={() => toggleRow(rowKey)}
//                               >
//                                 {isOpen ? "Close" : "Open"}
//                               </button>
//                             </td>
//                           </tr>

//                           {isOpen && (
//                             <tr className="bh-expand-row">
//                               <td colSpan={9} className="bh-expand-cell">
//                                 <div className="bh-detail-panel">
//                                   {blocked && (
//                                     <div className="bh-warning">
//                                       Passenger details are not available for
//                                       this booking ({missing.join(", ")}).
//                                       Load Pax Fare and Submit are disabled
//                                       until the passenger details are provided
//                                       by the server.
//                                     </div>
//                                   )}

//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Agency
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.AgencyName}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line bh-detail-alt">
//                                     <span className="bh-detail-label">
//                                       Booking Id
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.BookingId}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Booking Date
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.BookingDate}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line bh-detail-alt">
//                                     <span className="bh-detail-label">
//                                       Airline PNR
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.AirlinePnr || "-"}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Sector
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.Sector}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line bh-detail-alt">
//                                     <span className="bh-detail-label">
//                                       Pax Type
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {item.PaxType || "-"}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Pax Name
//                                     </span>
//                                     <span className="bh-detail-value">
//                                       {passengerName}
//                                     </span>
//                                   </div>

//                                   <div className="bh-detail-line bh-detail-alt bh-detail-fare-row">
//                                     <button
//                                       className="bh-load-fare-btn"
//                                       onClick={() =>
//                                         handleLoadPaxFare(rowKey, item)
//                                       }
//                                       disabled={form.loadingFare || blocked}
//                                     >
//                                       {form.loadingFare
//                                         ? "Loading..."
//                                         : "Load Pax Fare"}
//                                     </button>
//                                     <span className="bh-detail-value bh-fare-value">
//                                       {form.loadingFare
//                                         ? "..."
//                                         : form.fare !== null
//                                         ? money(form.fare)
//                                         : ""}
//                                     </span>
//                                   </div>
//                                   {form.fareError && (
//                                     <div className="bh-inline-error">
//                                       {form.fareError}
//                                     </div>
//                                   )}

//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Cancel Charge
//                                     </span>
//                                     <input
//                                       type="number"
//                                       min="0"
//                                       step="0.01"
//                                       className="bh-detail-input"
//                                       placeholder="Enter Cancel Charge"
//                                       value={form.cancelCharge}
//                                       onChange={(e) =>
//                                         updateRowForm(rowKey, {
//                                           cancelCharge: e.target.value,
//                                         })
//                                       }
//                                     />
//                                   </div>
//                                   <div className="bh-detail-line bh-detail-alt">
//                                     <span className="bh-detail-label">
//                                       Service Charge
//                                     </span>
//                                     <input
//                                       type="number"
//                                       min="0"
//                                       step="0.01"
//                                       className="bh-detail-input"
//                                       placeholder="Enter Service Charge"
//                                       value={form.serviceCharge}
//                                       onChange={(e) =>
//                                         updateRowForm(rowKey, {
//                                           serviceCharge: e.target.value,
//                                         })
//                                       }
//                                     />
//                                   </div>
//                                   <div className="bh-detail-line">
//                                     <span className="bh-detail-label">
//                                       Refund Amount
//                                     </span>
//                                     <span
//                                       className={`bh-detail-value bh-fare-value ${
//                                         refundPreview !== null &&
//                                         refundPreview < 0
//                                           ? "bh-negative"
//                                           : ""
//                                       }`}
//                                     >
//                                       {refundPreview !== null
//                                         ? money(refundPreview)
//                                         : "-"}
//                                     </span>
//                                   </div>
//                                   <div className="bh-detail-line bh-detail-remark-row">
//                                     <span className="bh-detail-label">
//                                       Enter Remark
//                                     </span>
//                                     <textarea
//                                       className="bh-detail-textarea"
//                                       value={form.remark}
//                                       onChange={(e) =>
//                                         updateRowForm(rowKey, {
//                                           remark: e.target.value,
//                                         })
//                                       }
//                                     />
//                                   </div>

//                                   <div className="bh-detail-submit-row">
//                                     <button
//                                       className="bh-submit-btn"
//                                       onClick={() =>
//                                         handleSubmitCancellation(rowKey, item)
//                                       }
//                                       disabled={
//                                         form.submitting ||
//                                         blocked ||
//                                         !(form.fare > 0)
//                                       }
//                                     >
//                                       {form.submitting
//                                         ? "Submitting..."
//                                         : "Submit"}
//                                     </button>
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           )}
//                         </React.Fragment>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="bh-pagination">
//                 <button
//                   className="bh-page-btn"
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                 >
//                   Previous
//                 </button>
//                 <span className="bh-page-info">
//                   Page {page} of {totalPages} · {data.length} records
//                 </span>
//                 <button
//                   className="bh-page-btn"
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="bh-state">
//               <p>No data available.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer2 />

//       <style>{`
//         @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap");

//         .bh-shell {
//           --bh-navy: #14304d;
//           --bh-navy-light: #1e4266;
//           --bh-amber: #c99a3e;
//           --bh-bg: #f6f7f9;
//           --bh-card: #ffffff;
//           --bh-border: #e6e8ec;
//           --bh-text: #1f2937;
//           --bh-text-muted: #6b7280;
//           --bh-green: rgb(0, 123, 255);
//           --bh-green-bg: #e6f5ee;
//           --bh-amber-bg: #fbf1de;
//           --bh-blue: #2563eb;
//           --bh-red: #b3441f;
//           --bh-red-bg: #fdecea;

//           display: flex;
//           min-height: 100vh;
//           background: var(--bh-bg);
//           font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
//           color: var(--bh-text);
//         }

//         .bh-container {
//           flex: 1;
//           padding: 32px 36px 60px;
//           max-width: 1280px;
//         }

//         .bh-header { margin-bottom: 24px; }

//         .bh-eyebrow {
//           display: block;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           color: var(--bh-amber);
//           margin-bottom: 6px;
//         }

//         .bh-title {
//           font-family: "Manrope", sans-serif;
//           font-weight: 800;
//           font-size: 26px;
//           color: var(--bh-navy);
//           margin: 0;
//         }

//         .bh-filters-card {
//           background: var(--bh-card);
//           border: 1px solid var(--bh-border);
//           border-radius: 14px;
//           padding: 20px 22px;
//           margin-bottom: 24px;
//           box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
//         }

//         .bh-filters {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: flex-end;
//           gap: 16px;
//         }

//         .bh-field {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           min-width: 150px;
//         }

//         .bh-label {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.03em;
//           text-transform: uppercase;
//           color: var(--bh-text-muted);
//         }

//         .bh-input {
//           font-family: inherit;
//           font-size: 14px;
//           padding: 10px 12px;
//           border: 1px solid var(--bh-border);
//           border-radius: 8px;
//           background: #fbfbfc;
//           color: var(--bh-text);
//           outline: none;
//           transition: border-color 0.15s ease, box-shadow 0.15s ease;
//         }

//         .bh-input:focus {
//           border-color: var(--bh-navy-light);
//           box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
//           background: #fff;
//         }

//         .bh-select { cursor: pointer; }

//         .bh-search-btn {
//           font-family: inherit;
//           font-weight: 700;
//           font-size: 14px;
//           color: #fff;
//           background: var(--bh-navy);
//           border: none;
//           border-radius: 8px;
//           padding: 11px 22px;
//           cursor: pointer;
//           transition: background 0.15s ease, transform 0.1s ease;
//           white-space: nowrap;
//         }

//         .bh-search-btn:hover { background: var(--bh-navy-light); }
//         .bh-search-btn:active { transform: translateY(1px); }

//         .bh-table-card {
//           background: var(--bh-card);
//           border: 1px solid var(--bh-border);
//           border-radius: 14px;
//           overflow: hidden;
//           box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
//         }

//         .bh-table-toolbar {
//           display: flex;
//           justify-content: flex-end;
//           padding: 14px 16px 0;
//         }

//         .bh-export-btn {
//           font-family: inherit;
//           font-weight: 700;
//           font-size: 13px;
//           color: #fff;
//           background: var(--bh-green);
//           border: none;
//           border-radius: 8px;
//           padding: 9px 18px;
//           cursor: pointer;
//           transition: background 0.15s ease, transform 0.1s ease, opacity 0.15s ease;
//           white-space: nowrap;
//         }

//         .bh-export-btn:hover:not(:disabled) { background: #4d5ebe; }
//         .bh-export-btn:active:not(:disabled) { transform: translateY(1px); }
//         .bh-export-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//         .bh-table-wrap { overflow-x: auto; margin-top: 10px; }

//         .bh-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 13.5px;
//         }

//         .bh-table thead th {
//           text-align: left;
//           font-family: "Manrope", sans-serif;
//           font-weight: 700;
//           font-size: 11.5px;
//           letter-spacing: 0.05em;
//           text-transform: uppercase;
//           color: #fff;
//           background: var(--bh-navy);
//           padding: 13px 16px;
//           white-space: nowrap;
//           position: sticky;
//           top: 0;
//         }

//         .bh-table tbody td {
//           padding: 13px 16px;
//           border-bottom: 1px solid var(--bh-border);
//           color: var(--bh-text);
//           white-space: nowrap;
//         }

//         .bh-table tbody tr.bh-row-active td { background: #f2f6fb; }
//         .bh-table tbody tr:hover td { background: #f9fafb; }
//         .bh-table tbody tr.bh-row-active:hover td { background: #f2f6fb; }
//         .bh-table tbody tr:last-child td { border-bottom: none; }

//         .bh-expand-row td {
//           padding: 0 !important;
//           border-bottom: 1px solid var(--bh-border);
//           background: #f8fafc !important;
//           white-space: normal !important;
//         }

//         .bh-expand-cell { padding: 0 !important; }

//         .bh-mono {
//           font-variant-numeric: tabular-nums;
//           color: var(--bh-navy-light);
//           font-weight: 600;
//         }

//         .bh-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 12px;
//           font-weight: 700;
//           padding: 5px 12px 5px 10px;
//           border-radius: 999px;
//           position: relative;
//         }

//         .bh-badge::before {
//           content: "";
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//           flex-shrink: 0;
//         }

//         .bh-badge-pending { background: var(--bh-amber-bg); color: #93691f; }
//         .bh-badge-pending::before { background: var(--bh-amber); }
//         .bh-badge-done { background: var(--bh-green-bg); color: var(--bh-green); }
//         .bh-badge-done::before { background: var(--bh-green); }

//         .bh-action-btn {
//           font-family: inherit;
//           font-size: 12.5px;
//           font-weight: 700;
//           color: #fff;
//           background: var(--bh-blue);
//           border: 1.5px solid var(--bh-blue);
//           border-radius: 7px;
//           padding: 6px 16px;
//           cursor: pointer;
//           transition: background 0.15s ease, color 0.15s ease;
//           white-space: nowrap;
//         }

//         .bh-action-btn:hover { background: #1d4ed8; }
//         .bh-action-btn-active { background: var(--bh-navy); border-color: var(--bh-navy); }
//         .bh-action-btn-active:hover { background: var(--bh-navy-light); }

//         .bh-detail-panel {
//           max-width: 620px;
//           padding: 16px 16px 20px;
//           margin: 0;
//         }

//         .bh-warning {
//           background: var(--bh-amber-bg);
//           color: #7a5413;
//           border: 1px solid #ecd9a8;
//           border-radius: 8px;
//           padding: 10px 12px;
//           font-size: 12.5px;
//           line-height: 1.5;
//           margin-bottom: 12px;
//         }

//         .bh-inline-error {
//           background: var(--bh-red-bg);
//           color: var(--bh-red);
//           font-size: 12.5px;
//           padding: 8px 12px;
//           border-bottom: 1px solid var(--bh-border);
//         }

//         .bh-negative { color: var(--bh-red); }

//         .bh-detail-line {
//           display: flex;
//           align-items: center;
//           padding: 9px 12px;
//           border-bottom: 1px solid var(--bh-border);
//           font-size: 13px;
//           gap: 16px;
//         }

//         .bh-detail-alt { background: #f1f4f8; }
//         .bh-detail-label { flex: 0 0 150px; color: var(--bh-blue); font-weight: 600; }
//         .bh-detail-value { color: var(--bh-text); font-weight: 500; }
//         .bh-detail-fare-row { align-items: center; }

//         .bh-load-fare-btn {
//           flex: 0 0 150px;
//           font-family: inherit;
//           font-size: 12.5px;
//           font-weight: 700;
//           color: #fff;
//           background: var(--bh-blue);
//           border: none;
//           border-radius: 6px;
//           padding: 7px 14px;
//           cursor: pointer;
//           transition: background 0.15s ease, opacity 0.15s ease;
//         }

//         .bh-load-fare-btn:hover:not(:disabled) { background: #1d4ed8; }
//         .bh-load-fare-btn:disabled { opacity: 0.6; cursor: not-allowed; }

//         .bh-fare-value {
//           font-weight: 700;
//           font-variant-numeric: tabular-nums;
//           min-width: 60px;
//         }

//         .bh-detail-input {
//           flex: 1;
//           max-width: 220px;
//           font-family: inherit;
//           font-size: 13px;
//           padding: 6px 10px;
//           border: 1px solid var(--bh-border);
//           border-radius: 6px;
//           outline: none;
//           background: #fff;
//           transition: border-color 0.15s ease, box-shadow 0.15s ease;
//         }

//         .bh-detail-input:focus {
//           border-color: var(--bh-navy-light);
//           box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
//         }

//         .bh-detail-remark-row { align-items: flex-start; }

//         .bh-detail-textarea {
//           flex: 1;
//           max-width: 320px;
//           min-height: 54px;
//           font-family: inherit;
//           font-size: 13px;
//           padding: 8px 10px;
//           border: 1px solid var(--bh-border);
//           border-radius: 6px;
//           outline: none;
//           resize: vertical;
//           background: #fff;
//           transition: border-color 0.15s ease, box-shadow 0.15s ease;
//         }

//         .bh-detail-textarea:focus {
//           border-color: var(--bh-navy-light);
//           box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
//         }

//         .bh-detail-submit-row { padding: 14px 12px 0; }

//         .bh-submit-btn {
//           font-family: inherit;
//           font-weight: 700;
//           font-size: 13.5px;
//           color: #fff;
//           background: var(--bh-blue);
//           border: none;
//           border-radius: 7px;
//           padding: 9px 24px;
//           cursor: pointer;
//           transition: background 0.15s ease, transform 0.1s ease;
//         }

//         .bh-submit-btn:hover:not(:disabled) { background: #1d4ed8; }
//         .bh-submit-btn:active:not(:disabled) { transform: translateY(1px); }
//         .bh-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

//         .bh-pagination {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 16px;
//           padding: 14px 16px 18px;
//           border-top: 1px solid var(--bh-border);
//         }

//         .bh-page-btn {
//           font-family: inherit;
//           font-size: 13px;
//           font-weight: 600;
//           color: var(--bh-navy);
//           background: #fff;
//           border: 1px solid var(--bh-border);
//           border-radius: 7px;
//           padding: 7px 16px;
//           cursor: pointer;
//         }

//         .bh-page-btn:hover:not(:disabled) { background: #f2f6fb; }
//         .bh-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
//         .bh-page-info { font-size: 13px; color: var(--bh-text-muted); }

//         .bh-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: 10px;
//           padding: 56px 20px;
//           color: var(--bh-text-muted);
//           font-size: 14px;
//         }

//         .bh-state-error p { color: var(--bh-red); }

//         .bh-spinner {
//           width: 26px;
//           height: 26px;
//           border: 3px solid var(--bh-border);
//           border-top-color: var(--bh-amber);
//           border-radius: 50%;
//           animation: bh-spin 0.7s linear infinite;
//         }

//         @keyframes bh-spin {
//           to { transform: rotate(360deg); }
//         }

//         @media (max-width: 720px) {
//           .bh-container { padding: 20px 16px 40px; }
//           .bh-filters { flex-direction: column; align-items: stretch; }
//           .bh-field { min-width: 0; }
//           .bh-search-btn { width: 100%; }
//           .bh-detail-label { flex: 0 0 110px; }
//           .bh-load-fare-btn { flex: 0 0 110px; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BookingHistory;

import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import { loadAgencyConfig } from "../util/loadConfig";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
const API_BOOKING_HISTORY =
  "https://api.namantechnolab.com/api/Admin/AdminBookingHistory";
const API_PAX_BOOKING =
  "https://promo.namantechnolab.com/api/Operation/PaxBookingRQ";

const REQ_LOAD_PAX_FARE = 20;
const REQ_REFUND = 21;

// BoundType values (AdminBookingHistory does not return BoundType).
// Confirmed from a working request: one-way booking FLY070520264876 => "7".
const BOUND_ONEWAY = "7";
// TODO: fill these after confirming with backend (Pramod).
// While they are null, round-trip rows stay blocked (no guessing).
const BOUND_ROUND_ONWARD = null;
const BOUND_ROUND_RETURN = null;

const PAGE_SIZE = 25;

const EMPTY_ROW_FORM = {
  fare: null, // number
  fareError: "",
  cancelCharge: "",
  serviceCharge: "",
  remark: "",
  loadingFare: false,
  submitting: false,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// One unique key per row. Round-trip bookings have 2 rows with the same
// BookingId, so BookingId/TransactionId alone is not unique.
// Multi-passenger bookings share TransactionId/BookingId/Sector, so the
// unique key (_rowKey) is assigned in fetchData using the row index.
const getRowKey = (item) => item._rowKey;

const buildRowKey = (item, index) =>
  [
    item.TransactionId,
    item.BookingId,
    item.Sector,
    item.DepartureDate,
    item.DepartureTime,
    item.PaxId,
    index,
  ].join("|");

// A "leg" = one flight segment of a booking.
const getLegKey = (item) =>
  [item.Sector, item.DepartureDate, item.DepartureTime].join("|");

const isBlank = (v) => v === null || v === undefined || v === "";

const money = (n) => Number(n).toFixed(2);

/**
 * BoundType is not returned by AdminBookingHistory, so it is worked out
 * from the sibling rows of the same BookingId:
 *  - 1 row            => one-way
 *  - 2 rows (round)   => earlier departure = onward, later = return
 * If the API starts returning BoundType, that value is used as-is.
 */
const deriveBoundType = (item, allRows = []) => {
  if (!isBlank(item.BoundType)) return item.BoundType;

  const siblings = allRows.filter((r) => r.BookingId === item.BookingId);

  // Several rows with the SAME leg = several passengers on one flight => one-way.
  const legs = new Set(siblings.map(getLegKey));
  if (legs.size <= 1) return BOUND_ONEWAY;

  // Different legs under one BookingId = round trip.
  const toTime = (r) =>
    Date.parse(`${r.DepartureDate} ${r.DepartureTime || ""}`);

  const sorted = [...siblings].sort((a, b) => {
    const ta = toTime(a);
    const tb = toTime(b);
    if (Number.isNaN(ta) || Number.isNaN(tb)) return 0; // keep API order
    return ta - tb;
  });

  return getLegKey(sorted[0]) === getLegKey(item)
    ? BOUND_ROUND_ONWARD
    : BOUND_ROUND_RETURN;
};

/**
 * Single place that decides which passenger details are sent to the API.
 * NO guessing / NO default values: if a value is missing, the action is blocked.
 *
 * `allRows` = the full list (not just the current page) so that round-trip
 * sibling rows can be found for BoundType.
 */
const resolvePaxDetails = (item, config, allRows = []) => {
  const details = {
    TransactionId: item.TransactionId,
    PaxId: item.PaxId,
    PaxType: item.PaxType,
    BoundType: deriveBoundType(item, allRows),
    AccountNo: item.AccountNo ?? config.AccountNo,
  };

  const zeroIsInvalid = ["TransactionId", "PaxId", "AccountNo"];
  const missing = Object.entries(details)
    .filter(([key, value]) => {
      if (isBlank(value)) return true;
      if (zeroIsInvalid.includes(key) && Number(value) === 0) return true;
      return false;
    })
    .map(([key]) => key);

  return { details, missing };
};

const buildPayload = (requestType, details, config, extra = {}) => ({
  APIRequestType: requestType,
  AdminKey: config.AdminKey,
  TransactionId: Number(details.TransactionId),
  BookingId: details.BookingId,
  PaxId: Number(details.PaxId),
  PaxType: String(details.PaxType),
  BoundType: String(details.BoundType),
  CancelCharge: 0,
  ServiceCharge: 0,
  Remark: null,
  AccountNo: Number(details.AccountNo),
  ...extra,
});

// The API answers HTTP 200 with an all-default object when it did not
// process anything (TransactionId 0, Status 0, no message).
const isEmptyApiResponse = (result) =>
  !result ||
  (Number(result.Status) === 0 &&
    Number(result.TransactionId) === 0 &&
    !result.Msg &&
    !result?.Error?.ErrorDesc);

const getApiError = (result) =>
  result?.Error?.ErrorDesc || result?.Msg || result?.Message || "";

const postJson = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let result = null;
  try {
    result = await response.json();
  } catch (e) {
    result = null;
  }

  if (!response.ok) {
    throw new Error(
      getApiError(result) || `Request failed (HTTP ${response.status}).`
    );
  }
  return result;
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const BookingHistory = () => {
  const [filters, setFilters] = useState({
    FromDate: "2026-02-10",
    ToDate: "2026-07-20",
    BookingId: "",
    AirlinePnr: "",
    Status: 0,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [expandedKey, setExpandedKey] = useState(null);
  const [rowForms, setRowForms] = useState({});

  // AgencyKey + PortalId + AdminKey (+ optional AccountNo) from web.config
  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
    AdminKey: "",
    AccountNo: null,
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          PortalId: cfg.PortalId || "",
          AdminKey: cfg.AdminKey || "",
          AccountNo: cfg.AccountNo ?? null,
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

  /* ------------------------- filters / list ------------------------- */
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toApiDate = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}-${m}-${y}`;
  };

  const fetchData = async () => {
    if (!config.AgencyKey || !config.PortalId) {
      setError("AgencyKey / PortalId missing from config.");
      return;
    }

    setLoading(true);
    setError(null);
    setExpandedKey(null);
    setRowForms({});
    setPage(1);

    try {
      const requestBody = {
        UserKey: null,
        AgencyKey: config.AgencyKey,
        FromDate: toApiDate(filters.FromDate),
        ToDate: toApiDate(filters.ToDate),
        TravelDate: null,
        BookingId: filters.BookingId.trim() || null,
        AirlinePnr: filters.AirlinePnr.trim() || null,
        AgencyCode: null,
        BookingStatus: Number(filters.Status),
        PortalId: Number(config.PortalId),
        IsTC: true,
        ReportType: 2,
      };
      console.log("Booking History Request:", JSON.stringify(requestBody, null, 2));

      const result = await postJson(API_BOOKING_HISTORY, requestBody);

      if (result && Array.isArray(result.BookingHistory)) {
        setData(
          result.BookingHistory.map((row, index) => ({
            ...row,
            _rowKey: buildRowKey(row, index),
          }))
        );
        if (result.BookingHistory.length === 0) setError("No records found.");
      } else {
        setData([]);
        setError("No records found.");
      }
    } catch (err) {
      console.error("Fetch booking history error:", err);
      setData([]);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageRows = useMemo(
    () => data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [data, page]
  );

  const handleExportExcel = () => {
    if (!data || data.length === 0) {
      alert("No data to export.");
      return;
    }

    const exportData = data.map((item) => ({
      Agency: item.AgencyName,
      "Booking ID": item.BookingId,
      "Booking Date": item.BookingDate,
      PNR: item.AirlinePnr,
      Sector: item.Sector,
      Status: item.Status ? item.Status : "Cancel Under Process",
      "Pax Type": item.PaxType || "",
      "Passenger Name": item.PaxName || item.LeadPax || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BookingHistory");
    XLSX.writeFile(workbook, `BookingHistory_${Date.now()}.xlsx`);
  };

  /* --------------------------- row state ---------------------------- */
  const getRowForm = (rowKey) => rowForms[rowKey] || EMPTY_ROW_FORM;

  // Functional update => always uses the latest state (no stale closure).
  const updateRowForm = (rowKey, patch) => {
    setRowForms((prev) => ({
      ...prev,
      [rowKey]: { ...EMPTY_ROW_FORM, ...prev[rowKey], ...patch },
    }));
  };

  const toggleRow = (rowKey) => {
    setExpandedKey((prev) => (prev === rowKey ? null : rowKey));
  };

  /* ------------------------- Load Pax Fare -------------------------- */
  const handleLoadPaxFare = async (rowKey, item) => {
    const { details, missing } = resolvePaxDetails(item, config, data);

    if (missing.length > 0) {
      updateRowForm(rowKey, {
        fare: null,
        fareError: `Passenger details missing: ${missing.join(", ")}.`,
      });
      return;
    }
    if (!config.AdminKey) {
      updateRowForm(rowKey, {
        fare: null,
        fareError: "AdminKey is missing from config.",
      });
      return;
    }

    updateRowForm(rowKey, { loadingFare: true, fare: null, fareError: "" });

    try {
      const payload = buildPayload(
        REQ_LOAD_PAX_FARE,
        { ...details, BookingId: item.BookingId },
        config
      );
      console.log("Load Pax Fare Request:", JSON.stringify(payload, null, 2));

      const result = await postJson(API_PAX_BOOKING, payload);
      console.log("Load Pax Fare Response:", JSON.stringify(result, null, 2));

      const apiError = getApiError(result);
      const fareNum = Number(result?.PaxNetFare);

      if (apiError) {
        updateRowForm(rowKey, { fareError: apiError, loadingFare: false });
      } else if (isEmptyApiResponse(result) || !(fareNum > 0)) {
        updateRowForm(rowKey, {
          fareError:
            "Fare not available. The server returned an empty response for this passenger.",
          loadingFare: false,
        });
      } else {
        updateRowForm(rowKey, { fare: fareNum, loadingFare: false });
      }
    } catch (err) {
      console.error("Load Pax Fare Error:", err);
      updateRowForm(rowKey, {
        fare: null,
        fareError: err.message || "Failed to load Pax Fare.",
        loadingFare: false,
      });
    }
  };

  /* --------------------------- Submit refund ------------------------ */
  const handleSubmitCancellation = async (rowKey, item) => {
    const form = getRowForm(rowKey);

    const { details, missing } = resolvePaxDetails(item, config, data);
    if (missing.length > 0) {
      alert(`Cannot submit. Passenger details missing: ${missing.join(", ")}.`);
      return;
    }
    if (!config.AdminKey) {
      alert("Cannot submit. AdminKey is missing from config.");
      return;
    }
    if (!(form.fare > 0)) {
      alert("Please load the Pax Fare first.");
      return;
    }

    const cancelCharge = Number(form.cancelCharge);
    const serviceCharge = Number(form.serviceCharge);

    if (form.cancelCharge === "" || Number.isNaN(cancelCharge) || cancelCharge < 0) {
      alert("Please enter a valid Cancel Charge.");
      return;
    }
    if (form.serviceCharge === "" || Number.isNaN(serviceCharge) || serviceCharge < 0) {
      alert("Please enter a valid Service Charge.");
      return;
    }

    const totalCharges = cancelCharge + serviceCharge;
    if (totalCharges > form.fare) {
      alert(
        `Cancel Charge + Service Charge (${money(totalCharges)}) cannot be more than the Pax Fare (${money(form.fare)}).`
      );
      return;
    }

    const refundAmount = form.fare - totalCharges;

    const ok = window.confirm(
      [
        "Do you want to process this refund?",
        "",
        `Booking: ${item.BookingId}`,
        `Pax Fare: ${money(form.fare)}`,
        `Cancel Charge: ${money(cancelCharge)}`,
        `Service Charge: ${money(serviceCharge)}`,
        `Refund Amount: ${money(refundAmount)}`,
      ].join("\n")
    );
    if (!ok) return;

    updateRowForm(rowKey, { submitting: true });

    try {
      const payload = buildPayload(
        REQ_REFUND,
        { ...details, BookingId: item.BookingId },
        config,
        {
          CancelCharge: cancelCharge,
          ServiceCharge: serviceCharge,
          Remark: form.remark?.trim() || "Pax Refunded",
        }
      );
      console.log("Submit Refund Request:", JSON.stringify(payload, null, 2));

      const result = await postJson(API_PAX_BOOKING, payload);
      console.log("Submit Refund Response:", JSON.stringify(result, null, 2));

      const apiError = getApiError(result);
      const isFailure = Boolean(result?.Error?.ErrorDesc) || isEmptyApiResponse(result);

      if (isFailure) {
        throw new Error(
          apiError ||
            "The server did not process the refund (empty response). Nothing was refunded."
        );
      }

      alert(
        `Refund request submitted.\nRefund Amount: ${money(refundAmount)}${
          apiError ? `\n\nServer message: ${apiError}` : ""
        }`
      );
      setExpandedKey(null);
      updateRowForm(rowKey, { submitting: false });
      fetchData(); // refresh list
    } catch (err) {
      console.error("Submit Refund Error:", err);
      alert(`Failed to submit refund.\n\n${err.message || "Please try again."}`);
      updateRowForm(rowKey, { submitting: false });
    }
  };

  /* ----------------------------- render ----------------------------- */
  if (loadingConfig) {
    return (
      <div className="bh-shell">
        <Sidebar />
        <div className="bh-container">
          <div className="bh-state">
            <div className="bh-spinner" />
            <p>Loading Config...</p>
          </div>
        </div>
        <Footer2 />
      </div>
    );
  }

  return (
    <div className="bh-shell">
      <Sidebar />

      <div className="bh-container">
        <div className="bh-header">
          <span className="bh-eyebrow">Admin · Bookings</span>
          <h2 className="bh-title">Flight Cancellation</h2>
        </div>

        <div className="bh-filters-card">
          <div className="bh-filters">
            <div className="bh-field">
              <label className="bh-label">From date</label>
              <input
                type="date"
                name="FromDate"
                value={filters.FromDate}
                onChange={handleChange}
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">To date</label>
              <input
                type="date"
                name="ToDate"
                value={filters.ToDate}
                onChange={handleChange}
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Booking ID</label>
              <input
                type="text"
                name="BookingId"
                value={filters.BookingId}
                onChange={handleChange}
                placeholder="Enter Booking Id"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Airline PNR</label>
              <input
                type="text"
                name="AirlinePnr"
                value={filters.AirlinePnr}
                onChange={handleChange}
                placeholder="Enter Airline PNR"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Status</label>
              <select
                name="Status"
                value={filters.Status}
                onChange={handleChange}
                className="bh-input bh-select"
              >
                <option value={0}>Pending</option>
                <option value={1}>Completed</option>
              </select>
            </div>

            <button onClick={fetchData} className="bh-search-btn">
              Search
            </button>
          </div>
        </div>

        <div className="bh-table-card">
          <div className="bh-table-toolbar">
            <button
              onClick={handleExportExcel}
              className="bh-export-btn"
              disabled={data.length === 0}
            >
              Export to Excel
            </button>
          </div>

          {loading ? (
            <div className="bh-state">
              <div className="bh-spinner" />
              <p>Loading bookings…</p>
            </div>
          ) : error ? (
            <div className="bh-state bh-state-error">
              <p>{error}</p>
            </div>
          ) : data.length > 0 ? (
            <>
              <div className="bh-table-wrap">
                <table className="bh-table">
                  <thead>
                    <tr>
                      <th>Agency</th>
                      <th>Booking ID</th>
                      <th>Booking Date</th>
                      <th>PNR</th>
                      <th>Sector</th>
                      <th>Status</th>
                      <th>Pax Type</th>
                      <th>Passenger Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((item) => {
                      const rowKey = getRowKey(item);
                      const isOpen = expandedKey === rowKey;
                      const cancelStatusText = item.Status
                        ? item.Status
                        : "Cancel Under Process";
                      const form = getRowForm(rowKey);
                      const { missing } = resolvePaxDetails(item, config, data);
                      const blocked = missing.length > 0;
                      const passengerName = item.PaxName || item.LeadPax || "-";

                      const cancelCharge = Number(form.cancelCharge) || 0;
                      const serviceCharge = Number(form.serviceCharge) || 0;
                      const refundPreview =
                        form.fare > 0
                          ? form.fare - cancelCharge - serviceCharge
                          : null;

                      return (
                        <React.Fragment key={rowKey}>
                          <tr className={isOpen ? "bh-row-active" : ""}>
                            <td>{item.AgencyName}</td>
                            <td className="bh-mono">{item.BookingId}</td>
                            <td>{item.BookingDate}</td>
                            <td className="bh-mono">{item.AirlinePnr}</td>
                            <td>{item.Sector}</td>
                            <td>
                              <span
                                className={`bh-badge ${
                                  item.Status
                                    ? "bh-badge-done"
                                    : "bh-badge-pending"
                                }`}
                              >
                                {cancelStatusText}
                              </span>
                            </td>
                            <td>{item.PaxType || "-"}</td>
                            <td>{passengerName}</td>
                            <td>
                              <button
                                className={`bh-action-btn ${
                                  isOpen ? "bh-action-btn-active" : ""
                                }`}
                                onClick={() => toggleRow(rowKey)}
                              >
                                {isOpen ? "Close" : "Open"}
                              </button>
                            </td>
                          </tr>

                          {isOpen && (
                            <tr className="bh-expand-row">
                              <td colSpan={9} className="bh-expand-cell">
                                <div className="bh-detail-panel">
                                  {blocked && (
                                    <div className="bh-warning">
                                      Passenger details are not available for
                                      this booking ({missing.join(", ")}).
                                      Load Pax Fare and Submit are disabled
                                      until the passenger details are provided
                                      by the server.
                                    </div>
                                  )}

                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Agency
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.AgencyName}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line bh-detail-alt">
                                    <span className="bh-detail-label">
                                      Booking Id
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.BookingId}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Booking Date
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.BookingDate}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line bh-detail-alt">
                                    <span className="bh-detail-label">
                                      Airline PNR
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.AirlinePnr || "-"}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Sector
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.Sector}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line bh-detail-alt">
                                    <span className="bh-detail-label">
                                      Pax Type
                                    </span>
                                    <span className="bh-detail-value">
                                      {item.PaxType || "-"}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Pax Name
                                    </span>
                                    <span className="bh-detail-value">
                                      {passengerName}
                                    </span>
                                  </div>

                                  <div className="bh-detail-line bh-detail-alt bh-detail-fare-row">
                                    <button
                                      className="bh-load-fare-btn"
                                      onClick={() =>
                                        handleLoadPaxFare(rowKey, item)
                                      }
                                      disabled={form.loadingFare || blocked}
                                    >
                                      {form.loadingFare
                                        ? "Loading..."
                                        : "Load Pax Fare"}
                                    </button>
                                    <span className="bh-detail-value bh-fare-value">
                                      {form.loadingFare
                                        ? "..."
                                        : form.fare !== null
                                        ? money(form.fare)
                                        : ""}
                                    </span>
                                  </div>
                                  {form.fareError && (
                                    <div className="bh-inline-error">
                                      {form.fareError}
                                    </div>
                                  )}

                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Cancel Charge
                                    </span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      className="bh-detail-input"
                                      placeholder="Enter Cancel Charge"
                                      value={form.cancelCharge}
                                      onChange={(e) =>
                                        updateRowForm(rowKey, {
                                          cancelCharge: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="bh-detail-line bh-detail-alt">
                                    <span className="bh-detail-label">
                                      Service Charge
                                    </span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      className="bh-detail-input"
                                      placeholder="Enter Service Charge"
                                      value={form.serviceCharge}
                                      onChange={(e) =>
                                        updateRowForm(rowKey, {
                                          serviceCharge: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="bh-detail-line">
                                    <span className="bh-detail-label">
                                      Refund Amount
                                    </span>
                                    <span
                                      className={`bh-detail-value bh-fare-value ${
                                        refundPreview !== null &&
                                        refundPreview < 0
                                          ? "bh-negative"
                                          : ""
                                      }`}
                                    >
                                      {refundPreview !== null
                                        ? money(refundPreview)
                                        : "-"}
                                    </span>
                                  </div>
                                  <div className="bh-detail-line bh-detail-remark-row">
                                    <span className="bh-detail-label">
                                      Enter Remark
                                    </span>
                                    <textarea
                                      className="bh-detail-textarea"
                                      value={form.remark}
                                      onChange={(e) =>
                                        updateRowForm(rowKey, {
                                          remark: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="bh-detail-submit-row">
                                    <button
                                      className="bh-submit-btn"
                                      onClick={() =>
                                        handleSubmitCancellation(rowKey, item)
                                      }
                                      disabled={
                                        form.submitting ||
                                        blocked ||
                                        !(form.fare > 0)
                                      }
                                    >
                                      {form.submitting
                                        ? "Submitting..."
                                        : "Submit"}
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bh-pagination">
                <button
                  className="bh-page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="bh-page-info">
                  Page {page} of {totalPages} · {data.length} records
                </span>
                <button
                  className="bh-page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="bh-state">
              <p>No data available.</p>
            </div>
          )}
        </div>
      </div>

      <Footer2 />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap");

        .bh-shell {
          --bh-navy: #14304d;
          --bh-navy-light: #1e4266;
          --bh-amber: #c99a3e;
          --bh-bg: #f6f7f9;
          --bh-card: #ffffff;
          --bh-border: #e6e8ec;
          --bh-text: #1f2937;
          --bh-text-muted: #6b7280;
          --bh-green: rgb(0, 123, 255);
          --bh-green-bg: #e6f5ee;
          --bh-amber-bg: #fbf1de;
          --bh-blue: #2563eb;
          --bh-red: #b3441f;
          --bh-red-bg: #fdecea;

          display: flex;
          min-height: 100vh;
          background: var(--bh-bg);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--bh-text);
        }

        .bh-container {
          flex: 1;
          padding: 32px 36px 60px;
          max-width: 1280px;
        }

        .bh-header { margin-bottom: 24px; }

        .bh-eyebrow {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--bh-amber);
          margin-bottom: 6px;
        }

        .bh-title {
          font-family: "Manrope", sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: var(--bh-navy);
          margin: 0;
        }

        .bh-filters-card {
          background: var(--bh-card);
          border: 1px solid var(--bh-border);
          border-radius: 14px;
          padding: 20px 22px;
          margin-bottom: 24px;
          box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
        }

        .bh-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 16px;
        }

        .bh-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 150px;
        }

        .bh-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--bh-text-muted);
        }

        .bh-input {
          font-family: inherit;
          font-size: 14px;
          padding: 10px 12px;
          border: 1px solid var(--bh-border);
          border-radius: 8px;
          background: #fbfbfc;
          color: var(--bh-text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-input:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
          background: #fff;
        }

        .bh-select { cursor: pointer; }

        .bh-search-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          background: var(--bh-navy);
          border: none;
          border-radius: 8px;
          padding: 11px 22px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
          white-space: nowrap;
        }

        .bh-search-btn:hover { background: var(--bh-navy-light); }
        .bh-search-btn:active { transform: translateY(1px); }

        .bh-table-card {
          background: var(--bh-card);
          border: 1px solid var(--bh-border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
        }

        .bh-table-toolbar {
          display: flex;
          justify-content: flex-end;
          padding: 14px 16px 0;
        }

        .bh-export-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          background: var(--bh-green);
          border: none;
          border-radius: 8px;
          padding: 9px 18px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease, opacity 0.15s ease;
          white-space: nowrap;
        }

        .bh-export-btn:hover:not(:disabled) { background: #4d5ebe; }
        .bh-export-btn:active:not(:disabled) { transform: translateY(1px); }
        .bh-export-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .bh-table-wrap { overflow-x: auto; margin-top: 10px; }

        .bh-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }

        .bh-table thead th {
          text-align: left;
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 11.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #fff;
          background: var(--bh-navy);
          padding: 13px 16px;
          white-space: nowrap;
          position: sticky;
          top: 0;
        }

        .bh-table tbody td {
          padding: 13px 16px;
          border-bottom: 1px solid var(--bh-border);
          color: var(--bh-text);
          white-space: nowrap;
        }

        .bh-table tbody tr.bh-row-active td { background: #f2f6fb; }
        .bh-table tbody tr:hover td { background: #f9fafb; }
        .bh-table tbody tr.bh-row-active:hover td { background: #f2f6fb; }
        .bh-table tbody tr:last-child td { border-bottom: none; }

        .bh-expand-row td {
          padding: 0 !important;
          border-bottom: 1px solid var(--bh-border);
          background: #f8fafc !important;
          white-space: normal !important;
        }

        .bh-expand-cell { padding: 0 !important; }

        .bh-mono {
          font-variant-numeric: tabular-nums;
          color: var(--bh-navy-light);
          font-weight: 600;
        }

        .bh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px 5px 10px;
          border-radius: 999px;
          position: relative;
        }

        .bh-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .bh-badge-pending { background: var(--bh-amber-bg); color: #93691f; }
        .bh-badge-pending::before { background: var(--bh-amber); }
        .bh-badge-done { background: var(--bh-green-bg); color: var(--bh-green); }
        .bh-badge-done::before { background: var(--bh-green); }

        .bh-action-btn {
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: var(--bh-blue);
          border: 1.5px solid var(--bh-blue);
          border-radius: 7px;
          padding: 6px 16px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .bh-action-btn:hover { background: #1d4ed8; }
        .bh-action-btn-active { background: var(--bh-navy); border-color: var(--bh-navy); }
        .bh-action-btn-active:hover { background: var(--bh-navy-light); }

        .bh-detail-panel {
          max-width: 620px;
          padding: 16px 16px 20px;
          margin: 0;
        }

        .bh-warning {
          background: var(--bh-amber-bg);
          color: #7a5413;
          border: 1px solid #ecd9a8;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12.5px;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .bh-inline-error {
          background: var(--bh-red-bg);
          color: var(--bh-red);
          font-size: 12.5px;
          padding: 8px 12px;
          border-bottom: 1px solid var(--bh-border);
        }

        .bh-negative { color: var(--bh-red); }

        .bh-detail-line {
          display: flex;
          align-items: center;
          padding: 9px 12px;
          border-bottom: 1px solid var(--bh-border);
          font-size: 13px;
          gap: 16px;
        }

        .bh-detail-alt { background: #f1f4f8; }
        .bh-detail-label { flex: 0 0 150px; color: var(--bh-blue); font-weight: 600; }
        .bh-detail-value { color: var(--bh-text); font-weight: 500; }
        .bh-detail-fare-row { align-items: center; }

        .bh-load-fare-btn {
          flex: 0 0 150px;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: var(--bh-blue);
          border: none;
          border-radius: 6px;
          padding: 7px 14px;
          cursor: pointer;
          transition: background 0.15s ease, opacity 0.15s ease;
        }

        .bh-load-fare-btn:hover:not(:disabled) { background: #1d4ed8; }
        .bh-load-fare-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .bh-fare-value {
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          min-width: 60px;
        }

        .bh-detail-input {
          flex: 1;
          max-width: 220px;
          font-family: inherit;
          font-size: 13px;
          padding: 6px 10px;
          border: 1px solid var(--bh-border);
          border-radius: 6px;
          outline: none;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-detail-input:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
        }

        .bh-detail-remark-row { align-items: flex-start; }

        .bh-detail-textarea {
          flex: 1;
          max-width: 320px;
          min-height: 54px;
          font-family: inherit;
          font-size: 13px;
          padding: 8px 10px;
          border: 1px solid var(--bh-border);
          border-radius: 6px;
          outline: none;
          resize: vertical;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-detail-textarea:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
        }

        .bh-detail-submit-row { padding: 14px 12px 0; }

        .bh-submit-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
          background: var(--bh-blue);
          border: none;
          border-radius: 7px;
          padding: 9px 24px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .bh-submit-btn:hover:not(:disabled) { background: #1d4ed8; }
        .bh-submit-btn:active:not(:disabled) { transform: translateY(1px); }
        .bh-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .bh-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 14px 16px 18px;
          border-top: 1px solid var(--bh-border);
        }

        .bh-page-btn {
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          color: var(--bh-navy);
          background: #fff;
          border: 1px solid var(--bh-border);
          border-radius: 7px;
          padding: 7px 16px;
          cursor: pointer;
        }

        .bh-page-btn:hover:not(:disabled) { background: #f2f6fb; }
        .bh-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .bh-page-info { font-size: 13px; color: var(--bh-text-muted); }

        .bh-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 56px 20px;
          color: var(--bh-text-muted);
          font-size: 14px;
        }

        .bh-state-error p { color: var(--bh-red); }

        .bh-spinner {
          width: 26px;
          height: 26px;
          border: 3px solid var(--bh-border);
          border-top-color: var(--bh-amber);
          border-radius: 50%;
          animation: bh-spin 0.7s linear infinite;
        }

        @keyframes bh-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 720px) {
          .bh-container { padding: 20px 16px 40px; }
          .bh-filters { flex-direction: column; align-items: stretch; }
          .bh-field { min-width: 0; }
          .bh-search-btn { width: 100%; }
          .bh-detail-label { flex: 0 0 110px; }
          .bh-load-fare-btn { flex: 0 0 110px; }
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;