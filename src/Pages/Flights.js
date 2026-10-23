


// import React, { useEffect, useState, useCallback } from "react";
// import Sidebar from "./Sidebar";
// import "../CSS/Flight.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import Footer2 from "./Footer2";
// import * as XLSX from "xlsx";
// import { loadAgencyConfig } from "../util/loadConfig";

// export default function Flights() {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [agentCode, setAgentCode] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [agencyName, setAgencyName] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const [appliedFilters, setAppliedFilters] = useState({
//     agentCode: "",
//     loginEmail: "",
//     agencyName: "",
//     mobileNo: "",
//     statusFilter: "",
//   });

//   const [config, setConfig] = useState({
//     AdminKey: "",
//     PortalId: "",
//   });
//   const [loadingConfig, setLoadingConfig] = useState(true);
//   const [configReady, setConfigReady] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const API_URL = process.env.REACT_APP_API_3;

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const cfg = await loadAgencyConfig();
//         setConfig({
//           AdminKey: cfg.AdminKey || "",
//           PortalId: cfg.PortalId || "",
//         });
//         setConfigReady(true);
//       } catch (err) {
//         console.error("Config load failed:", err);
//         setError("Config load failed. Please refresh.");
//         setLoading(false);
//       } finally {
//         setLoadingConfig(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const extractArray = (obj) => {
//     if (Array.isArray(obj)) return obj;
//     if (!obj || typeof obj !== "object") return [];

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
//     for (const key of Object.keys(obj)) {
//       if (Array.isArray(obj[key])) return obj[key];
//     }
//     return [];
//   };

//   const fetchFlights = useCallback(async () => {
//     if (!config.AdminKey || !config.PortalId) {
//       setError("AdminKey / PortalId missing from config");
//       setLoading(false);
//       return;
//     }

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
//           AdminKey: config.AdminKey,
//           IsB2B: true,
//           PortalId: Number(config.PortalId),
//           AgencyStatus: null,
//           EmailId: null,
//           MobileNumber: null,
//         }),
//       });

//       const data = await response.json();
//       console.log("RAW API RESPONSE (PortalAgency):", data);

//       if (response.ok) {
//         const arr = extractArray(data);
//         setFlights(arr || []);
//         if (!arr || arr.length === 0) {
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
//   }, [API_URL, config.AdminKey, config.PortalId]);

//   useEffect(() => {
//     if (configReady) {
//       fetchFlights();
//     }
//   }, [configReady, fetchFlights]);

//   useEffect(() => {
//     if (location.state?.refresh && configReady) {
//       fetchFlights();
//       navigate("/flights", { replace: true });
//     }
//   }, [location.state?.refresh, fetchFlights, navigate, configReady]);

//   const handleSearch = () => {
//     setAppliedFilters({
//       agentCode,
//       loginEmail,
//       agencyName,
//       mobileNo,
//       statusFilter,
//     });
//   };

//   const handleClear = () => {
//     setAgentCode("");
//     setLoginEmail("");
//     setAgencyName("");
//     setMobileNo("");
//     setStatusFilter("");
//     setAppliedFilters({
//       agentCode: "",
//       loginEmail: "",
//       agencyName: "",
//       mobileNo: "",
//       statusFilter: "",
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

//   const handleExportExcel = () => {
//     if (!filtered.length) {
//       alert("No data to export");
//       return;
//     }

//     const exportRows = filtered.map((a) => ({
//       "Agency Code": a.AgencyCode || "",
//       "Agency Email": a.AgenyEmail || "",
//       "Agency Name": a.AgencyName || "",
//       "Agency Mobile": a.MobileNumber || "",
//       "Agency Type": a.AgencyType || "N/A",
//       "Credit Limit": a.CreditBalance ?? "",
//       Limit: a.Limit ?? "",
//       Status: a.AgencyStatus ? "Active" : "In Active",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportRows);
//     worksheet["!cols"] = [
//       { wch: 14 },
//       { wch: 26 },
//       { wch: 20 },
//       { wch: 16 },
//       { wch: 14 },
//       { wch: 14 },
//       { wch: 12 },
//       { wch: 12 },
//     ];

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Agencies");
//     const dateStr = new Date().toISOString().slice(0, 10);
//     XLSX.writeFile(workbook, `Agency-Master-${dateStr}.xlsx`);
//   };

//   const getInitials = (name) => {
//     if (!name) return "?";
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();
//   };

//   if (loadingConfig) {
//     return (
//       <>
//         <Sidebar />
//         <div className="fl-wrapper">
//           <div className="fl-loading">
//             <div className="fl-spinner" /> Loading Config...
//           </div>
//         </div>
//         <Footer2 />
//       </>
//     );
//   }

//   return (
//     <>
//       <Sidebar />

//       <div className="fl-wrapper">
//         {/* ── Header ── */}
//         <div className="fl-header">
//           <div className="fl-header-left">
//             <div className="fl-page-title">
//               <span>🏢</span> Agency Master
//             </div>
//             <div className="fl-page-sub">
//               Manage all registered agencies & their status
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//             <button className="fl-btn-edit" onClick={handleExportExcel}>
//               ⬇ Export Excel
//             </button>
//             <button
//               className="fl-btn-update"
//               onClick={() => navigate("/add-agency")}
//             >
//               + Add Agency
//             </button>
//           </div>
//         </div>

//         {/* ── Stats ── */}
//         <div className="fl-stats">
//           <div className="fl-stat-card">
//             <div className="fl-stat-icon blue">📋</div>
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
//             <div className="fl-stat-icon red">⛔</div>
//             <div>
//               <div className="fl-stat-value">{inactiveCount}</div>
//               <div className="fl-stat-label">Inactive</div>
//             </div>
//           </div>

//           <div className="fl-stat-card">
//             <div className="fl-stat-icon gold">🔍</div>
//             <div>
//               <div className="fl-stat-value">{filtered.length}</div>
//               <div className="fl-stat-label">Showing</div>
//             </div>
//           </div>
//         </div>

//         {/* ── Table Card ── */}
//         <div className="fl-table-card">
//           {/* Topbar with filters */}
//           <div className="fl-table-topbar">
//             <div className="fl-table-title">
//               Agency List ({filtered.length})
//             </div>

//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Agency Code..."
//                 value={agentCode}
//                 onChange={(e) => setAgentCode(e.target.value)}
//               />
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Email..."
//                 value={loginEmail}
//                 onChange={(e) => setLoginEmail(e.target.value)}
//               />
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Agency Name..."
//                 value={agencyName}
//                 onChange={(e) => setAgencyName(e.target.value)}
//               />
//               <input
//                 className="fl-search-box"
//                 type="text"
//                 placeholder="Mobile..."
//                 value={mobileNo}
//                 onChange={(e) => setMobileNo(e.target.value)}
//               />
//               <select
//                 className="fl-search-box"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 style={{ width: "140px", cursor: "pointer" }}
//               >
//                 <option value="">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>

//               <button className="fl-btn-edit" onClick={handleSearch}>
//                 Search
//               </button>
//               <button className="fl-btn-update" onClick={handleClear}>
//                 Clear
//               </button>
//             </div>
//           </div>

//           {/* Loading / Error / Table */}
//           {loading ? (
//             <div className="fl-loading">
//               <div className="fl-spinner" /> Loading Agencies...
//             </div>
//           ) : error ? (
//             <div className="fl-error">⚠ {error}</div>
//           ) : filtered.length === 0 ? (
//             <div className="fl-empty">No agencies found</div>
//           ) : (
//             <>
//               {/* Desktop Table */}
//               <div className="fl-table-scroll">
//                 <table className="fl-table">
//                   <thead>
//                     <tr>
//                       <th>Agency</th>
//                       <th>Email</th>
//                       <th>Mobile</th>
//                       <th>Type</th>
//                       <th>Credit Limit</th>
//                       <th>Limit</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filtered.map((a, idx) => (
//                       <tr key={a.AgencyCode || idx}>
//                         <td>
//                           <div className="fl-agency-cell">
//                             <div className="fl-agency-avatar">
//                               {getInitials(a.AgencyName)}
//                             </div>
//                             <div>
//                               <div className="fl-agency-name">
//                                 {a.AgencyName || "-"}
//                               </div>
//                               <div className="fl-agency-code">
//                                 {a.AgencyCode || "-"}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>{a.AgenyEmail || "-"}</td>
//                         <td>{a.MobileNumber || "-"}</td>
//                         <td>{a.AgencyType || "N/A"}</td>
//                         <td>
//                           <span className="fl-balance">
//                             {a.CreditBalance ?? "-"}
//                           </span>
//                         </td>
//                         <td>
//                           <span className="fl-balance">{a.Limit ?? "-"}</span>
//                         </td>
//                         <td>
//                           <span
//                             className={`fl-badge ${
//                               a.AgencyStatus ? "active" : "inactive"
//                             }`}
//                           >
//                             {a.AgencyStatus ? "Active" : "Inactive"}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             className="fl-btn-edit"
//                             onClick={() =>
//                               navigate(`/edit-agency/${a.AgencyCode}`, {
//                                 state: { agency: a },
//                               })
//                             }
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile Card View */}
//               <div className="fl-card-view">
//                 {filtered.map((a, idx) => (
//                   <div className="fl-mobile-card" key={a.AgencyCode || idx}>
//                     <div className="fl-mobile-card-header">
//                       <div className="fl-mobile-card-title">
//                         {a.AgencyName || "-"}
//                       </div>
//                       <span
//                         className={`fl-badge ${
//                           a.AgencyStatus ? "active" : "inactive"
//                         }`}
//                       >
//                         {a.AgencyStatus ? "Active" : "Inactive"}
//                       </span>
//                     </div>

//                     <div className="fl-mobile-card-row">
//                       <b>Code</b>
//                       <span>{a.AgencyCode || "-"}</span>
//                     </div>
//                     <div className="fl-mobile-card-row">
//                       <b>Email</b>
//                       <span>{a.AgenyEmail || "-"}</span>
//                     </div>
//                     <div className="fl-mobile-card-row">
//                       <b>Mobile</b>
//                       <span>{a.MobileNumber || "-"}</span>
//                     </div>
//                     <div className="fl-mobile-card-row">
//                       <b>Type</b>
//                       <span>{a.AgencyType || "N/A"}</span>
//                     </div>
//                     <div className="fl-mobile-card-row">
//                       <b>Credit</b>
//                       <span className="fl-balance">
//                         {a.CreditBalance ?? "-"}
//                       </span>
//                     </div>

//                     <div className="fl-mobile-card-actions">
//                       <button
//                         className="fl-btn-edit"
//                         onClick={() =>
//                           navigate(`/edit-agency/${a.AgencyCode}`, {
//                             state: { agency: a },
//                           })
//                         }
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         <Footer2 />
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import "../CSS/Flight.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer2 from "./Footer2";
import * as XLSX from "xlsx";
import { loadAgencyConfig } from "../util/loadConfig";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [agentCode, setAgentCode] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    agentCode: "",
    loginEmail: "",
    agencyName: "",
    mobileNo: "",
    statusFilter: "",
  });

  const [config, setConfig] = useState({
    AdminKey: "",
    PortalId: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [configReady, setConfigReady] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = process.env.REACT_APP_API_3;

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AdminKey: cfg.AdminKey || "",
          PortalId: cfg.PortalId || "",
        });
        setConfigReady(true);
      } catch (err) {
        console.error("Config load failed:", err);
        setError("Config load failed. Please refresh.");
        setLoading(false);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const extractArray = (obj) => {
    if (Array.isArray(obj)) return obj;
    if (!obj || typeof obj !== "object") return [];

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
    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) return obj[key];
    }
    return [];
  };

  const fetchFlights = useCallback(async () => {
    if (!config.AdminKey || !config.PortalId) {
      setError("AdminKey / PortalId missing from config");
      setLoading(false);
      return;
    }

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
          AdminKey: config.AdminKey,
          IsB2B: true,
          PortalId: Number(config.PortalId),
          AgencyStatus: null,
          EmailId: null,
          MobileNumber: null,
        }),
      });

      const data = await response.json();
      console.log("RAW API RESPONSE (PortalAgency):", data);

      if (response.ok) {
        const arr = extractArray(data);
        setFlights(arr || []);
        if (!arr || arr.length === 0) {
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
  }, [API_URL, config.AdminKey, config.PortalId]);

  useEffect(() => {
    if (configReady) {
      fetchFlights();
    }
  }, [configReady, fetchFlights]);

  useEffect(() => {
    if (location.state?.refresh && configReady) {
      fetchFlights();
      navigate("/flights", { replace: true });
    }
  }, [location.state?.refresh, fetchFlights, navigate, configReady]);

  // ✅ FIX: EditAgency ko AgencyKey chahiye (state.AgencyKey), isliye wahi bhej rahe hain.
  // sessionStorage mein bhi save karte hain taaki edit page refresh par bhi chale.
  const handleEdit = (a) => {
    const agencyKey = a.AgencyKey || "";

    if (!agencyKey) {
      console.warn(
        "AgencyKey list API response mein nahi mila. Row object:",
        a
      );
    }

    try {
      sessionStorage.setItem(`agencyKey_${a.AgencyCode}`, agencyKey);
    } catch (e) {
      // storage unavailable, ignore
    }

    navigate(`/edit-agency/${a.AgencyCode}`, {
      state: { AgencyKey: agencyKey, agency: a },
    });
  };

  const handleSearch = () => {
    setAppliedFilters({
      agentCode,
      loginEmail,
      agencyName,
      mobileNo,
      statusFilter,
    });
  };

  const handleClear = () => {
    setAgentCode("");
    setLoginEmail("");
    setAgencyName("");
    setMobileNo("");
    setStatusFilter("");
    setAppliedFilters({
      agentCode: "",
      loginEmail: "",
      agencyName: "",
      mobileNo: "",
      statusFilter: "",
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
      Limit: a.Limit ?? "",
      Status: a.AgencyStatus ? "Active" : "In Active",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    worksheet["!cols"] = [
      { wch: 14 },
      { wch: 26 },
      { wch: 20 },
      { wch: 16 },
      { wch: 14 },
      { wch: 14 },
      { wch: 12 },
      { wch: 12 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agencies");
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Agency-Master-${dateStr}.xlsx`);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  if (loadingConfig) {
    return (
      <>
        <Sidebar />
        <div className="fl-wrapper">
          <div className="fl-loading">
            <div className="fl-spinner" /> Loading Config...
          </div>
        </div>
        <Footer2 />
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <div className="fl-wrapper">
        {/* ── Header ── */}
        <div className="fl-header">
          <div className="fl-header-left">
            <div className="fl-page-title">
              <span>🏢</span> Agency Master
            </div>
            <div className="fl-page-sub">
              Manage all registered agencies & their status
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button className="fl-btn-edit" onClick={handleExportExcel}>
              ⬇ Export Excel
            </button>
            <button
              className="fl-btn-update"
              onClick={() => navigate("/add-agency")}
            >
              + Add Agency
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="fl-stats">
          <div className="fl-stat-card">
            <div className="fl-stat-icon blue">📋</div>
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
            <div className="fl-stat-icon red">⛔</div>
            <div>
              <div className="fl-stat-value">{inactiveCount}</div>
              <div className="fl-stat-label">Inactive</div>
            </div>
          </div>

          <div className="fl-stat-card">
            <div className="fl-stat-icon gold">🔍</div>
            <div>
              <div className="fl-stat-value">{filtered.length}</div>
              <div className="fl-stat-label">Showing</div>
            </div>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="fl-table-card">
          {/* Topbar with filters */}
          <div className="fl-table-topbar">
            <div className="fl-table-title">
              Agency List ({filtered.length})
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <input
                className="fl-search-box"
                type="text"
                placeholder="Agency Code..."
                value={agentCode}
                onChange={(e) => setAgentCode(e.target.value)}
              />
              <input
                className="fl-search-box"
                type="text"
                placeholder="Email..."
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="fl-search-box"
                type="text"
                placeholder="Agency Name..."
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
              />
              <input
                className="fl-search-box"
                type="text"
                placeholder="Mobile..."
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
              <select
                className="fl-search-box"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: "140px", cursor: "pointer" }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="fl-btn-edit" onClick={handleSearch}>
                Search
              </button>
              <button className="fl-btn-update" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>

          {/* Loading / Error / Table */}
          {loading ? (
            <div className="fl-loading">
              <div className="fl-spinner" /> Loading Agencies...
            </div>
          ) : error ? (
            <div className="fl-error">⚠ {error}</div>
          ) : filtered.length === 0 ? (
            <div className="fl-empty">No agencies found</div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="fl-table-scroll">
                <table className="fl-table">
                  <thead>
                    <tr>
                      <th>Agency</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Type</th>
                      <th>Credit Limit</th>
                      <th>Limit</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, idx) => (
                      <tr key={a.AgencyCode || idx}>
                        <td>
                          <div className="fl-agency-cell">
                            <div className="fl-agency-avatar">
                              {getInitials(a.AgencyName)}
                            </div>
                            <div>
                              <div className="fl-agency-name">
                                {a.AgencyName || "-"}
                              </div>
                              <div className="fl-agency-code">
                                {a.AgencyCode || "-"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{a.AgenyEmail || "-"}</td>
                        <td>{a.MobileNumber || "-"}</td>
                        <td>{a.AgencyType || "N/A"}</td>
                        <td>
                          <span className="fl-balance">
                            {a.CreditBalance ?? "-"}
                          </span>
                        </td>
                        <td>
                          <span className="fl-balance">{a.Limit ?? "-"}</span>
                        </td>
                        <td>
                          <span
                            className={`fl-badge ${
                              a.AgencyStatus ? "active" : "inactive"
                            }`}
                          >
                            {a.AgencyStatus ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="fl-btn-edit"
                            onClick={() => handleEdit(a)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="fl-card-view">
                {filtered.map((a, idx) => (
                  <div className="fl-mobile-card" key={a.AgencyCode || idx}>
                    <div className="fl-mobile-card-header">
                      <div className="fl-mobile-card-title">
                        {a.AgencyName || "-"}
                      </div>
                      <span
                        className={`fl-badge ${
                          a.AgencyStatus ? "active" : "inactive"
                        }`}
                      >
                        {a.AgencyStatus ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="fl-mobile-card-row">
                      <b>Code</b>
                      <span>{a.AgencyCode || "-"}</span>
                    </div>
                    <div className="fl-mobile-card-row">
                      <b>Email</b>
                      <span>{a.AgenyEmail || "-"}</span>
                    </div>
                    <div className="fl-mobile-card-row">
                      <b>Mobile</b>
                      <span>{a.MobileNumber || "-"}</span>
                    </div>
                    <div className="fl-mobile-card-row">
                      <b>Type</b>
                      <span>{a.AgencyType || "N/A"}</span>
                    </div>
                    <div className="fl-mobile-card-row">
                      <b>Credit</b>
                      <span className="fl-balance">
                        {a.CreditBalance ?? "-"}
                      </span>
                    </div>

                    <div className="fl-mobile-card-actions">
                      <button
                        className="fl-btn-edit"
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Footer2 />
      </div>
    </>
  );
}