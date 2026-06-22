import React from "react";

function LoginFooter() {
  const footerStyle = {
    backgroundColor: "#1e2a33",
    color: "#d1d5db",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    fontSize: "14px",
    width: "100%"
  };

  const brandStyle = {
    fontWeight: "bold"
  };

  return (
    <footer style={footerStyle}>
      <div>© 2025 - 2026 SRFlySky</div>

      <div>
        Powered By: <span style={brandStyle}>Naman Technolab</span>
      </div>
    </footer>
  );
}

export default LoginFooter;