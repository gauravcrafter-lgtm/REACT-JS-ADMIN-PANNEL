import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import "../CSS/Flight.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer2 from "./Footer2";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = process.env.REACT_APP_API_3;
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
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data.data)) arr = data.data;
        else if (Array.isArray(data.Data)) arr = data.Data;
        else if (Array.isArray(data.result)) arr = data.result;

        setFlights(arr || []);
      } else {
        setError(data?.Message || "No Data Found");
      }
    } catch {
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

  const filtered = flights.filter(
    (a) =>
      !search ||
      a.AgencyName?.toLowerCase().includes(search.toLowerCase()) ||
      a.AgencyCode?.toLowerCase().includes(search.toLowerCase()) ||
      a.AgenyEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = flights.filter((a) => a.AgencyStatus).length;
  const inactiveCount = flights.filter((a) => !a.AgencyStatus).length;

  return (
    <>
      <Sidebar />

      <div className="fl-wrapper">
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

        <div className="fl-table-card">
          <div className="fl-table-topbar">
            <div className="fl-table-title">
              All Agencies ({filtered.length})
            </div>

            <input
              className="fl-search-box"
              placeholder="🔍 Search agency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                    <th>#</th>
                    <th>Agency</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Balance</th>
                    <th>Limit</th>
                    <th>Agency Type</th> {/* <-- Naya Column Header */}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={i}>
                      <td>{String(i + 1).padStart(2, "0")}</td>

                      <td>
                        <div className="fl-agency-cell">
                          <div className="fl-agency-avatar">
                            {(a.AgencyName || "A").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fl-agency-name">
                              {a.AgencyName}
                            </div>
                            <div className="fl-agency-code">
                              {a.AgencyCode}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>{a.AgenyEmail}</td>
                      <td>{a.MobileNumber}</td>
                      <td>₹ {a.CreditBalance}</td>
                      <td>₹ {a.Limit}</td>

                      {/* <-- Naya Column Data */}
                      <td>
                        <span className="fl-agency-type-text">
                          {a.AgencyType || "N/A"} 
                        </span>
                      </td>

                      <td>
                        <span className={`fl-badge ${a.AgencyStatus ? "active" : "inactive"}`}>
                          {a.AgencyStatus ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px"
                            }}
                            onClick={() => navigate("/edit-agency", { state: { AgencyKey: a.AgencyKey } })}
                          >
                            Edit
                          </button>

                          <button
                            style={{
                              padding: "8px 16px",
                             backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px"
                            }}
                            onClick={() => navigate("/update-agency", { state: { AgencyKey: a.AgencyKey } })}
                          >
                            Update
                          </button>
                        </div>
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