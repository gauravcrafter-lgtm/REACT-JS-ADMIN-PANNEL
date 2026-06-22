import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Usermaster.css";

export default function Usermaster() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");
  const [search, setSearch] = useState("");

  const API_URL   = process.env.REACT_APP_API_USERMASTER;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            FromDate: null,
            ToDate: null,
            MarkupRq: null,
            APIRequestType: 16,
            AgencyKey: AGENCY_KEY,
            AccountNo: PORTAL_ID,
          }),
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data.UserMasterRs)) {
          setUsers(data.UserMasterRs);
        } else {
          setUsers([]);
          setError(data?.Message || "No Data Found");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL, PORTAL_ID, AGENCY_KEY]);

  const filtered = users.filter((u) =>
    !search ||
    (u.UserName || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.Email || u.UserEmail || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.Mobile || u.UserMobile || "").includes(search)
  );

  return (
    <div>
      <Sidebar />

      <div className="um-wrapper">

        {/* ── Header ── */}
        <div className="um-header">
          <div>
            <div className="um-page-title">
              <span>👥</span> User Master
            </div>
            <div className="um-page-sub">Manage all registered users</div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="um-stats">
          <div className="um-stat-card">
            <div className="um-stat-icon">👥</div>
            <div>
              <div className="um-stat-value">{users.length}</div>
              <div className="um-stat-label">Total Users</div>
            </div>
          </div>
          <div className="um-stat-card">
            <div className="um-stat-icon">🔍</div>
            <div>
              <div className="um-stat-value">{filtered.length}</div>
              <div className="um-stat-label">Showing</div>
            </div>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="um-table-card">

          <div className="um-table-topbar">
            <div className="um-table-title">All Users ({filtered.length})</div>
            <input
              className="um-search-box"
              placeholder="🔍  Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && (
            <div className="um-loading">
              <div className="um-spinner" /> Loading users...
            </div>
          )}

          {!loading && error && (
            <div className="um-error">⚠️ {error}</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="um-empty">No users found.</div>
          )}

          {/* Desktop Table */}
          {!loading && !error && filtered.length > 0 && (
            <div className="um-table-scroll">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Date of Join</th>
                    <th>Email</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--um-text-3)", fontFamily: "'DM Mono',monospace", fontSize: "12px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="um-user-cell">
                          <div className="um-user-avatar">
                            {(u.UserName || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="um-user-name">{u.UserName}</div>
                        </div>
                      </td>
                      <td>
                        <span className="um-date-chip">
                          📅 {u.JoinDate || u.DOR || "—"}
                        </span>
                      </td>
                      <td style={{ color: "var(--um-text-2)" }}>
                        {u.Email || u.UserEmail || "—"}
                      </td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px" }}>
                        {u.Mobile || u.UserMobile || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="um-card-view">
              {filtered.map((u, i) => (
                <div key={i} className="um-mobile-card">
                  <div className="um-mobile-card-header">
                    <div className="um-user-avatar" style={{ width: 40, height: 40, fontSize: 15 }}>
                      {(u.UserName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="um-mobile-name">{u.UserName}</div>
                  </div>
                  <div className="um-mobile-card-row">
                    <b>Date of Join</b>
                    <span>{u.JoinDate || u.DOR || "—"}</span>
                  </div>
                  <div className="um-mobile-card-row">
                    <b>Email</b>
                    <span>{u.Email || u.UserEmail || "—"}</span>
                  </div>
                  <div className="um-mobile-card-row">
                    <b>Mobile</b>
                    <span>{u.Mobile || u.UserMobile || "—"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer2 />
    </div>
  );
}