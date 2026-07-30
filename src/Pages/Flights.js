
// import React, { useEffect, useState, useCallback } from "react";
// import Sidebar from "./Sidebar";
// import "../CSS/Flight.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Footer2 from "./Footer2";

// export default function Flights() {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ── Filter input states (what the user is typing) ──
//   const [agentCode, setAgentCode] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [agencyName, setAgencyName] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // ── Applied filters (only updated when "Search" is clicked) ──
//   const [appliedFilters, setAppliedFilters] = useState({
//     agentCode: "",
//     loginEmail: "",
//     agencyName: "",
//     mobileNo: "",
//     statusFilter: "",
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   const API_URL = process.env.REACT_APP_API_3;
//   const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
//   const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

//   // 🔍 Response ke andar jo bhi array field ho usko dhoondh ke nikal deta hai,
//   // chahe backend kisi bhi naam se bheje (AgencyList, Agencylist, List, data, Data, result, etc.)
//   const extractArray = (obj) => {
//     if (Array.isArray(obj)) return obj;
//     if (!obj || typeof obj !== "object") return [];

//     // known/likely keys pehle try karo
//     const knownKeys = [
//       "data",
//       "Data",
//       "result",
//       "Result",
//       "AgencyList",
//       "Agencylist",
//       "List",
//       "Agencies",
//       "AgencyMaster",
//     ];
//     for (const key of knownKeys) {
//       if (Array.isArray(obj[key])) return obj[key];
//     }

//     // fallback: object ke andar jo bhi pehla array mile wahi le lo
//     for (const key of Object.keys(obj)) {
//       if (Array.isArray(obj[key])) return obj[key];
//     }

//     return [];
//   };

//   const fetchFlights = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           APIToken: null,
//           AgencyKey: null,
//           AgencyCode: null,
//           AdminKey: ADMIN_KEY,
//           IsB2B: true,
//           PortalId: Number(PORTAL_ID),
//           AgencyStatus: null,
//           EmailId: null,
//           MobileNumber: null,
//         }),
//       });

//       const data = await response.json();
//       console.log("RAW API RESPONSE (PortalAgency):", data); // 🔍 DEBUG - actual key naam yahin se pata chalega

//       if (response.ok) {
//         const arr = extractArray(data);
//         setFlights(arr || []);
//         if (!arr || arr.length === 10) {
//           setError("No Data Found");
//         }
//       } else {
//         setError(data?.Message || "No Data Found");
//       }
//     } catch (err) {
//       console.error("Agency fetch failed:", err);
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [API_URL, ADMIN_KEY, PORTAL_ID]);

//   // initial load
//   useEffect(() => {
//     fetchFlights();
//   }, [fetchFlights]);

//   useEffect(() => {
//     if (location.state?.refresh) {
//       fetchFlights();
//       navigate("/flights", { replace: true });
//     }
//   }, [location.state?.refresh, fetchFlights, navigate]);

//   const handleSearch = () => {
//     setAppliedFilters({
//       agentCode,
//       loginEmail,
//       agencyName,
//       mobileNo,
//       statusFilter,
//     });
//   };

//   const filtered = flights.filter((a) => {
//     const matchesAgentCode =
//       !appliedFilters.agentCode ||
//       (a.AgencyCode || "")
//         .toLowerCase()
//         .includes(appliedFilters.agentCode.toLowerCase());

//     const matchesEmail =
//       !appliedFilters.loginEmail ||
//       (a.AgenyEmail || "")
//         .toLowerCase()
//         .includes(appliedFilters.loginEmail.toLowerCase());

//     const matchesAgencyName =
//       !appliedFilters.agencyName ||
//       (a.AgencyName || "")
//         .toLowerCase()
//         .includes(appliedFilters.agencyName.toLowerCase());

//     const matchesMobile =
//       !appliedFilters.mobileNo ||
//       (a.MobileNumber || "")
//         .toString()
//         .toLowerCase()
//         .includes(appliedFilters.mobileNo.toLowerCase());

//     const matchesStatus =
//       appliedFilters.statusFilter === "" ||
//       (appliedFilters.statusFilter === "active" && a.AgencyStatus) ||
//       (appliedFilters.statusFilter === "inactive" && !a.AgencyStatus);

//     return (
//       matchesAgentCode &&
//       matchesEmail &&
//       matchesAgencyName &&
//       matchesMobile &&
//       matchesStatus
//     );
//   });

//   const activeCount = flights.filter((a) => a.AgencyStatus).length;
//   const inactiveCount = flights.filter((a) => !a.AgencyStatus).length;

//   return (
//     <>
//       <Sidebar />

//       <div className="fl-wrapper">
//         <div className="fl-header">
//           <div className="fl-header-left">
//             <div className="fl-page-title">
//               <span>🤝</span> Agency Master
//             </div>
//             <div className="fl-page-sub">
//               Manage all registered agencies
//             </div>
//           </div>
//         </div>

//         <div className="fl-stats">
//           <div className="fl-stat-card">
//             <div className="fl-stat-icon blue">🏢</div>
//             <div>
//               <div className="fl-stat-value">{flights.length}</div>
//               <div className="fl-stat-label">Total Agencies</div>
//             </div>
//           </div>

//           <div className="fl-stat-card">
//             <div className="fl-stat-icon green">✅</div>
//             <div>
//               <div className="fl-stat-value">{activeCount}</div>
//               <div className="fl-stat-label">Active</div>
//             </div>
//           </div>

//           <div className="fl-stat-card">
//             <div className="fl-stat-icon red">❌</div>
//             <div>
//               <div className="fl-stat-value">{inactiveCount}</div>
//               <div className="fl-stat-label">Inactive</div>
//             </div>
//           </div>
//         </div>

//         {/* ── Filter Row (matches Agency Master reference) ── */}
//         <div className="fl-table-card" style={{ marginBottom: "16px" }}>
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "16px",
//               alignItems: "flex-end",
//               padding: "16px",
//             }}
//           >
//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <label style={{ fontSize: "13px", fontWeight: 600 }}>Agent Code</label>
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Enter Agency Code"
//                 value={agentCode}
//                 onChange={(e) => setAgentCode(e.target.value)}
//               />
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <label style={{ fontSize: "13px", fontWeight: 600 }}>Login Email</label>
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Enter Email Id"
//                 value={loginEmail}
//                 onChange={(e) => setLoginEmail(e.target.value)}
//               />
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <label style={{ fontSize: "13px", fontWeight: 600 }}>agencyName</label>
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Enter Agency Name"
//                 value={agencyName}
//                 onChange={(e) => setAgencyName(e.target.value)}
//               />
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <label style={{ fontSize: "13px", fontWeight: 600 }}>Mobile No.</label>
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Enter Booking Id"
//                 value={mobileNo}
//                 onChange={(e) => setMobileNo(e.target.value)}
//               />
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               <label style={{ fontSize: "13px", fontWeight: 600 }}>Status</label>
//               <select
//                 className="fl-search-box"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">----- Select -----</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">In Active</option>
//               </select>
//             </div>

//             <button
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: 600,
//               }}
//               onClick={handleSearch}
//             >
//               🔍 Search
//             </button>
//           </div>
//         </div>

//         <div className="fl-table-card">
//           <div className="fl-table-topbar">
//             <div className="fl-table-title">
//               All Agencies ({filtered.length})
//             </div>
//           </div>

//           {loading && (
//             <div className="fl-loading">
//               <div className="fl-spinner" />
//               Loading agencies...
//             </div>
//           )}

//           {!loading && error && (
//             <div className="fl-error">⚠️ {error}</div>
//           )}

//           {!loading && !error && filtered.length === 0 && (
//             <div className="fl-empty">No agencies found.</div>
//           )}

//           {!loading && !error && filtered.length > 0 && (
//             <div className="fl-table-scroll">
//               <table className="fl-table">
//                 <thead>
//                   <tr>
//                     <th>Agency Code</th>
//                     <th>Agency Email</th>
//                     <th>AgencyType</th>
//                     <th>Agency Name</th>
//                     <th>Agency Mobile</th>
//                     <th>Agency Type</th>
//                     <th>Credit Limit</th>
//                     <th>Limit</th>
//                     <th>Status</th>
//                     <th>Edit</th>
//                     <th>Balance Update</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filtered.map((a, i) => (
//                     <tr key={i}>
//                       <td>{a.AgencyCode}</td>
//                       <td>{a.AgenyEmail}</td>
//                       <td>
//                         <span className="fl-agency-type-text">
//                           {a.AgencyType || "N/A"}
//                         </span>
//                       </td>
//                       <td>{a.AgencyName}</td>
//                       <td>{a.MobileNumber}</td>
//                       <td>
//                         <span className="fl-agency-type-text">
//                           {a.AgencyType || "N/A"}
//                         </span>
//                       </td>
//                       <td>₹ {a.CreditBalance}</td>
//                       <td>₹ {a.Limit}</td>

//                       <td>
//                         <span className={`fl-badge ${a.AgencyStatus ? "active" : "inactive"}`}>
//                           {a.AgencyStatus ? "Active" : "In Active"}
//                         </span>
//                       </td>

//                       <td>
//                         <button
//                           style={{
//                             padding: "8px 16px",
//                             backgroundColor: "#007bff",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                           }}
//                           onClick={() => navigate("/edit-agency", { state: { AgencyKey: a.AgencyKey } })}
//                         >
//                           Edit
//                         </button>
//                       </td>

//                       <td>
//                         <button
//                           style={{
//                             padding: "8px 16px",
//                             backgroundColor: "#007bff",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                           }}
//                           onClick={() => navigate("/update-agency", { state: { AgencyKey: a.AgencyKey } })}
//                         >
//                           Update
//                         </button>
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


import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import "../CSS/Flight.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer2 from "./Footer2";
import * as XLSX from "xlsx";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Filter input states (what the user is typing) ──
  const [agentCode, setAgentCode] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ── Applied filters (only updated when "Search" is clicked) ──
  const [appliedFilters, setAppliedFilters] = useState({
    agentCode: "",
    loginEmail: "",
    agencyName: "",
    mobileNo: "",
    statusFilter: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = process.env.REACT_APP_API_3;
  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

  // 🔍 Response ke andar jo bhi array field ho usko dhoondh ke nikal deta hai,
  // chahe backend kisi bhi naam se bheje (AgencyList, Agencylist, List, data, Data, result, etc.)
  const extractArray = (obj) => {
    if (Array.isArray(obj)) return obj;
    if (!obj || typeof obj !== "object") return [];

    // known/likely keys pehle try karo
    const knownKeys = [
      "data",
      "Data",
      "result",
      "Result",
      "AgencyList",
      "Agencylist",
      "List",
      "Agencies",
      "AgencyMaster",
    ];
    for (const key of knownKeys) {
      if (Array.isArray(obj[key])) return obj[key];
    }

    // fallback: object ke andar jo bhi pehla array mile wahi le lo
    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) return obj[key];
    }

    return [];
  };

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          APIToken: null,
          AgencyKey: null,
          AgencyCode: null,
          AdminKey: ADMIN_KEY,
          IsB2B: true,
          PortalId: Number(PORTAL_ID),
          AgencyStatus: null,
          EmailId: null,
          MobileNumber: null,
        }),
      });

      const data = await response.json();
      console.log("RAW API RESPONSE (PortalAgency):", data); // 🔍 DEBUG - actual key naam yahin se pata chalega

      if (response.ok) {
        const arr = extractArray(data);
        setFlights(arr || []);
        if (!arr || arr.length === 10) {
          setError("No Data Found");
        }
      } else {
        setError(data?.Message || "No Data Found");
      }
    } catch (err) {
      console.error("Agency fetch failed:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [API_URL, ADMIN_KEY, PORTAL_ID]);

  // initial load
  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchFlights();
      navigate("/flights", { replace: true });
    }
  }, [location.state?.refresh, fetchFlights, navigate]);

  const handleSearch = () => {
    setAppliedFilters({
      agentCode,
      loginEmail,
      agencyName,
      mobileNo,
      statusFilter,
    });
  };

  const filtered = flights.filter((a) => {
    const matchesAgentCode =
      !appliedFilters.agentCode ||
      (a.AgencyCode || "")
        .toLowerCase()
        .includes(appliedFilters.agentCode.toLowerCase());

    const matchesEmail =
      !appliedFilters.loginEmail ||
      (a.AgenyEmail || "")
        .toLowerCase()
        .includes(appliedFilters.loginEmail.toLowerCase());

    const matchesAgencyName =
      !appliedFilters.agencyName ||
      (a.AgencyName || "")
        .toLowerCase()
        .includes(appliedFilters.agencyName.toLowerCase());

    const matchesMobile =
      !appliedFilters.mobileNo ||
      (a.MobileNumber || "")
        .toString()
        .toLowerCase()
        .includes(appliedFilters.mobileNo.toLowerCase());

    const matchesStatus =
      appliedFilters.statusFilter === "" ||
      (appliedFilters.statusFilter === "active" && a.AgencyStatus) ||
      (appliedFilters.statusFilter === "inactive" && !a.AgencyStatus);

    return (
      matchesAgentCode &&
      matchesEmail &&
      matchesAgencyName &&
      matchesMobile &&
      matchesStatus
    );
  });

  const activeCount = flights.filter((a) => a.AgencyStatus).length;
  const inactiveCount = flights.filter((a) => !a.AgencyStatus).length;

  // ── Export currently filtered agencies to an Excel file ──
  const handleExportExcel = () => {
    if (!filtered.length) {
      alert("No data to export");
      return;
    }

    const exportRows = filtered.map((a) => ({
      "Agency Code": a.AgencyCode || "",
      "Agency Email": a.AgenyEmail || "",
      "Agency Name": a.AgencyName || "",
      "Agency Mobile": a.MobileNumber || "",
      "Agency Type": a.AgencyType || "N/A",
      "Credit Limit": a.CreditBalance ?? "",
      "Limit": a.Limit ?? "",
      "Status": a.AgencyStatus ? "Active" : "In Active",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    // Column widths thoda readable rakhne ke liye
    worksheet["!cols"] = [
      { wch: 14 }, // Agency Code
      { wch: 26 }, // Agency Email
      { wch: 20 }, // Agency Name
      { wch: 16 }, // Agency Mobile
      { wch: 14 }, // Agency Type
      { wch: 14 }, // Credit Limit
      { wch: 12 }, // Limit
      { wch: 12 }, // Status
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agencies");

    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Agency-Master-${dateStr}.xlsx`);
  };

  return (
    <>
      <Sidebar />

      <div className="fl-wrapper">
        <div className="fl-header">
          <div className="fl-header-left">
            <div className="fl-page-title">
              <span>🤝</span> Agency Master
            </div>
            <div className="fl-page-sub">
              Manage all registered agencies
            </div>
          </div>
        </div>

        <div className="fl-stats">
          <div className="fl-stat-card">
            <div className="fl-stat-icon blue">🏢</div>
            <div>
              <div className="fl-stat-value">{flights.length}</div>
              <div className="fl-stat-label">Total Agencies</div>
            </div>
          </div>

          <div className="fl-stat-card">
            <div className="fl-stat-icon green">✅</div>
            <div>
              <div className="fl-stat-value">{activeCount}</div>
              <div className="fl-stat-label">Active</div>
            </div>
          </div>

          <div className="fl-stat-card">
            <div className="fl-stat-icon red">❌</div>
            <div>
              <div className="fl-stat-value">{inactiveCount}</div>
              <div className="fl-stat-label">Inactive</div>
            </div>
          </div>
        </div>

        {/* ── Filter Row (matches Agency Master reference) ── */}
        <div className="fl-table-card" style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "flex-end",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600 }}>Agent Code</label>
              <input
                className="fl-search-box"
                type="text"
                placeholder="Enter Agency Code"
                value={agentCode}
                onChange={(e) => setAgentCode(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600 }}>Login Email</label>
              <input
                className="fl-search-box"
                type="text"
                placeholder="Enter Email Id"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600 }}>agencyName</label>
              <input
                className="fl-search-box"
                type="text"
                placeholder="Enter Agency Name"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600 }}>Mobile No.</label>
              <input
                className="fl-search-box"
                type="text"
                placeholder="Enter Booking Id"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 600 }}>Status</label>
              <select
                className="fl-search-box"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">----- Select -----</option>
                <option value="active">Active</option>
                <option value="inactive">In Active</option>
              </select>
            </div>

            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
              }}
              onClick={handleSearch}
            >
              🔍 Search
            </button>
          </div>
        </div>

        <div className="fl-table-card">
          <div
            className="fl-table-topbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div className="fl-table-title">
              All Agencies ({filtered.length})
            </div>

            <button
              onClick={handleExportExcel}
              disabled={!filtered.length}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                backgroundColor: filtered.length ? "#007bff" : "#9fc4f5",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: filtered.length ? "pointer" : "not-allowed",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              📊 Export to Excel
            </button>
          </div>

          {loading && (
            <div className="fl-loading">
              <div className="fl-spinner" />
              Loading agencies...
            </div>
          )}

          {!loading && error && (
            <div className="fl-error">⚠️ {error}</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="fl-empty">No agencies found.</div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="fl-table-scroll">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>Agency Code</th>
                    <th>Agency Email</th>
                    <th>AgencyType</th>
                    <th>Agency Name</th>
                    <th>Agency Mobile</th>
                    <th>Agency Type</th>
                    <th>Credit Limit</th>
                    <th>Limit</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Balance Update</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={i}>
                      <td>{a.AgencyCode}</td>
                      <td>{a.AgenyEmail}</td>
                      <td>
                        <span className="fl-agency-type-text">
                          {a.AgencyType || "N/A"}
                        </span>
                      </td>
                      <td>{a.AgencyName}</td>
                      <td>{a.MobileNumber}</td>
                      <td>
                        <span className="fl-agency-type-text">
                          {a.AgencyType || "N/A"}
                        </span>
                      </td>
                      <td>₹ {a.CreditBalance}</td>
                      <td>₹ {a.Limit}</td>

                      <td>
                        <span className={`fl-badge ${a.AgencyStatus ? "active" : "inactive"}`}>
                          {a.AgencyStatus ? "Active" : "In Active"}
                        </span>
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
                          }}
                          onClick={() => navigate("/edit-agency", { state: { AgencyKey: a.AgencyKey } })}
                        >
                          Edit
                        </button>
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
                          }}
                          onClick={() => navigate("/update-agency", { state: { AgencyKey: a.AgencyKey } })}
                        >
                          Update
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