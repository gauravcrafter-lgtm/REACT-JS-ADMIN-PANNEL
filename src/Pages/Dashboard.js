import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer2 from "./Footer2";
import Sidebar from "./Sidebar";
import "../CSS/Dashboard.css";

const CARD_ICONS = {
  "Agency Master":       "🏢",
  "User Master":         "👥",
  "Deposit Request":     "💳",
  "Agency Ledger":       "📒",
  "Visa Services":       "🛂",
  "Gateway Report":      "📊",
  "Flight Booking":      "✈️",
  "Ticketsss":           "🎫",
  "Edit":                "✏️",
  "Flight Cancellation": "🚫",
  "Bus Cancellation":    "🚌",
  "View Ticket":         "🔍",
  "Hotel Cancellation":  "🏨",
  "Markup":              "💹",
};

const dashboardItems = [
  { label: "Agency Master",       path: "/Flights"         },
  { label: "User Master",         path: "/Usermaster"      },
  { label: "Deposit Request",     path: "/Depositrequest"  },
  { label: "Agency Ledger",       path: "/Agencyledger"    },
  { label: "Visa Services",       path: null               },
  { label: "Gateway Report",      path: "/Gatewayreport"   },
  { label: "Flight Booking",      path: "/flightbooking"   },
  { label: "Ticketsss",           path: null               },
  { label: "Edit",                path: "/Edit"            },
  { label: "Flight Cancellation", path: null               },
  { label: "Bus Cancellation",    path: null               },
  { label: "View Ticket",         path: "/Viewticket"      },
  { label: "Hotel Cancellation",  path: null               },
  { label: "Markup",              path: "/Markups"         },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // ── Browser back button block karo ──
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    // ── Session check ──
    const checkSession = () => {
      const expiry = localStorage.getItem("sessionExpiry");
      if (!expiry || new Date().getTime() > parseInt(expiry)) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        localStorage.removeItem("sessionExpiry");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60 * 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("sessionExpiry");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cancelLogout = () => setShowLogoutModal(false);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        {/* ── Top Header ── */}
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <img
              src="https://www.tripcaliber.com/Content/Images/logo.webp"
              alt="Naman Technolab Logo"
              className="header-logo"
            />
            <div className="header-greeting">Welcome back 👋</div>
          </div>

          <div className="header-actions">
            <button className="btn-logout" onClick={handleLogoutClick}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* ── Section Title ── */}
        <div className="dashboard-section-title">Dashboard</div>
        <div className="dashboard-section-sub">
          {dashboardItems.length} modules available · Select a module to get started
        </div>

        {/* ── Grid ── */}
        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-icon">
                <span>{CARD_ICONS[item.label] || "📌"}</span>
              </div>
              <div className="card-label">{item.label}</div>
              <button
                className="btn-open"
                onClick={() => item.path && navigate(item.path)}
                style={!item.path ? { opacity: 0.45, cursor: "not-allowed" } : {}}
                disabled={!item.path}
              >
                Open
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Logout Modal ── */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={cancelLogout}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🚪</div>
            <div className="modal-title">   Do you want to Logout ? </div>
            <div className="modal-sub">
          
            </div>
            <div className="modal-actions">
              <button className="btn-confirm" onClick={confirmLogout}>
                Yes
              </button>
              <button className="btn-cancel" onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer2 />
    </div>
  );
}