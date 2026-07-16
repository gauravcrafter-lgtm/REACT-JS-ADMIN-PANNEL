import React from "react";
import "../CSS/Footer2.css";

export default function Footer2() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1e2a33",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        boxSizing: "border-box",

        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <div style={{ color: "grey" }}>
        © 2025 - 2026 BOOKBYOWN
      </div>

      <div style={{ whiteSpace: "nowrap", color: "grey" }}>
        Powered By:
        <a
          href="https://namantechnolab.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: "bold",
            color: "grey",
            textDecoration: "none",
            marginLeft: "8px"
          }}
        >
          Naman Technolab
        </a>
      </div>
    </div>
  );
}