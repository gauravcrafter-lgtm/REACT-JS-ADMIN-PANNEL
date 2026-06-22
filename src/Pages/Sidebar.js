import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/Sidebar.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Agency",
    icon: "✈️",
    subMenu: [
      { label: "Agency Ledger", path: "/agencyledger" },
      { label: "Agency Master", path: "/flights" },
      { label: "View Ticket",   path: "/viewticket"  },
    ],
  },
  {
    label: "Account",
    icon: "🧾",
    subMenu: [
      { label: "User Master",      path: "/usermaster"     },
      { label: "Deposit Request",  path: "/depositrequest" },
    ],
  },
  {
    label: "Report",
    icon: "📊",
    subMenu: [
      { label: "Flight Booking", path: "/flightbooking" },
    ],
  },
  {
    label: "Gateway Report",
    path: "/gatewayreport",
    icon: "🗂️",
  },
];

export default function AdminSidebar({ children }) {
  const [collapsed, setCollapsed]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const navigate  = useNavigate();
  const location  = useLocation();

  const toggleSubmenu = (label) =>
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));

  const isActive = (path) => location.pathname === path;

  const SIDEBAR_WIDTH = collapsed ? 62 : 210;

  return (
    <>
      {/* ── Mobile Header ── */}
      <div className="mobileHeader">
        <button onClick={() => setMobileOpen(true)}>☰</button>
        <h3>Admin Panel</h3>
      </div>

      {/* ── Overlay ── */}
      {mobileOpen && (
        <div className="overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}>

        {/* Top */}
        <div className="topSection">
          {!collapsed && (
            <h2 className="logo">
              Admin<span>.</span>
            </h2>
          )}
          <button className="collapseBtn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Menu */}
        <div className="menu">
          {menuItems.map((item, idx) => (
            <div key={idx}>
              <div
                className={`menuItem ${!item.subMenu && isActive(item.path) ? "active" : ""}`}
                onClick={() =>
                  item.subMenu ? toggleSubmenu(item.label) : navigate(item.path)
                }
              >
                <span className="icon">{item.icon}</span>
                {!collapsed && <span className="label">{item.label}</span>}
                {!collapsed && item.subMenu && (
                  <span className="submenuArrow">
                    {openSubmenus[item.label] ? "▼" : "▶"}
                  </span>
                )}
              </div>

              {item.subMenu && openSubmenus[item.label] && !collapsed && (
                <div className="subMenu">
                  {item.subMenu.map((sub, i) => (
                    <div
                      key={i}
                      className="subMenuItem"
                      onClick={() => navigate(sub.path)}
                      style={isActive(sub.path) ? { color: "#e8a020" } : {}}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="sidebarFooter">Naman Technolab © 2025</div>
        )}
      </div>

      {/* ── Main Content ── */}
      <div style={{ marginLeft: SIDEBAR_WIDTH, transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        {children}
      </div>
    </>
  );
}