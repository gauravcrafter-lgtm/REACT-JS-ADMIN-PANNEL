import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import "../CSS/Flight.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer2 from "./Footer2";

export default function Flights() {
  const [flights, setFlights]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const API_URL  = process.env.REACT_APP_API_3;
  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

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
      let arr = [];
      if (response.ok) {
        if      (Array.isArray(data))        arr = data;
        else if (Array.isArray(data.data))   arr = data.data;
        else if (Array.isArray(data.Data))   arr = data.Data;
        else if (Array.isArray(data.result)) arr = data.result;
        setFlights(arr);
      } else {
        setError(data?.Message || "No Data Found");
      }
    } catch {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [API_URL, ADMIN_KEY, PORTAL_ID]);

  useEffect(() => { fetchFlights(); }, [fetchFlights]);

  useEffect(() => {
    if (location.state?.refreshed) fetchFlights();
  }, [location.state?.refreshed]);

  // Filtered list
  const filtered = flights.filter((a) =>
    !search ||
    a.AgencyName?.toLowerCase().includes(search.toLowerCase()) ||
    a.AgencyCode?.toLowerCase().includes(search.toLowerCase()) ||
    a.AgenyEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount   = flights.filter((a) => a.AgencyStatus).length;
  const inactiveCount = flights.filter((a) => !a.AgencyStatus).length;

  return (
    <>
      <Sidebar />

      <div className="fl-wrapper">

        {/* ── Header ── */}
        <div className="fl-header">
          <div className="fl-header-left">
            <div className="fl-page-title">
              <span>🏢</span> Agency List
            </div>
            <div className="fl-page-sub">
              Manage all registered agencies
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
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

        {/* ── Table Card ── */}
        <div className="fl-table-card">

          {/* Topbar */}
          <div className="fl-table-topbar">
            <div className="fl-table-title">
              All Agencies ({filtered.length})
            </div>
            <input
              className="fl-search-box"
              placeholder="🔍  Search agency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="fl-loading">
              <div className="fl-spinner" />
              Loading agencies...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="fl-error">⚠️ {error}</div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="fl-empty">No agencies found.</div>
          )}

          {/* ── Desktop Table ── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="fl-table-scroll">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Agency</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Balance</th>
                    <th>Limit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--fl-text-3)", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="fl-agency-cell">
                          <div className="fl-agency-avatar">
                            {(a.AgencyName || "A").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fl-agency-name">{a.AgencyName}</div>
                            <div className="fl-agency-code">{a.AgencyCode}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "var(--fl-text-2)" }}>{a.AgenyEmail}</td>
                      <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>{a.MobileNumber}</td>
                      <td>
                        <span className="fl-balance">₹ {a.CreditBalance}</span>
                      </td>
                      <td>
                        <span className="fl-balance">₹ {a.Limit}</span>
                      </td>
                      <td>
                        <span className={`fl-badge ${a.AgencyStatus ? "active" : "inactive"}`}>
                          {a.AgencyStatus ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="fl-btn-edit"
                          onClick={() => navigate("/Threeinone", { state: a })}
                        >
                          Edit
                        </button>
                        <button
                          className="fl-btn-update"
                          onClick={() => navigate("/edit-agency", { state: a })}
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

          {/* ── Mobile Cards ── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="fl-card-view">
              {filtered.map((a, i) => (
                <div key={i} className="fl-mobile-card">
                  <div className="fl-mobile-card-header">
                    <div>
                      <div className="fl-mobile-card-title">{a.AgencyName}</div>
                      <div style={{ fontSize: "12px", color: "var(--fl-text-3)", fontFamily: "'DM Mono', monospace" }}>
                        {a.AgencyCode}
                      </div>
                    </div>
                    <span className={`fl-badge ${a.AgencyStatus ? "active" : "inactive"}`}>
                      {a.AgencyStatus ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="fl-mobile-card-row"><b>Email</b> <span>{a.AgenyEmail}</span></div>
                  <div className="fl-mobile-card-row"><b>Mobile</b> <span>{a.MobileNumber}</span></div>
                  <div className="fl-mobile-card-row"><b>Balance</b> <span>₹ {a.CreditBalance}</span></div>
                  <div className="fl-mobile-card-row"><b>Limit</b> <span>₹ {a.Limit}</span></div>
                  <div className="fl-mobile-card-actions">
                    
                    <button
  className="fl-btn-edit"
  onClick={() => navigate("/Update-agency", { state: a })}
>
  Edit
</button>
<button
  className="fl-btn-update"
  onClick={() => navigate("/edit-agency", { state: a })}
>
  Update
</button>
    </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer2 />
    </>
  );
}
