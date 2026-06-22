import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";

export default function EditAgency() {
  const location = useLocation();
  const navigate = useNavigate();
  const agencyData = location.state || {};

  // ✅ Prefill from Flights.js state
  const [email, setEmail] = useState(agencyData.AgenyEmail || "");
  const [mobile, setMobile] = useState(agencyData.MobileNumber || "");
  const [status, setStatus] = useState(agencyData.AgencyStatus ?? true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_3 || "https://promo.namantechnolab.com/api/Agent/AgencyProfile";
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID || 11;

  // ✅ Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AgencyKey: agencyData.AgencyKey,
          PortalId: Number(PORTAL_ID),
          AgencyStatus: status,
          AgencyEmail: email,
          MobileNumber: mobile,
        }),
      });

      const data = await response.json();
      console.log("Update Response:", data);

      if (response.ok) {
        setMessage("✅ Agency updated successfully!");
        setTimeout(() => navigate("/flights", { state: { refreshed: true } }), 1500);
      } else {
        setMessage("⚠️ " + (data?.Message || "Update failed."));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="fl-wrapper" style={{ padding: "20px" }}>
        <h2>✏️ Edit Agency Profile</h2>

        {message && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            backgroundColor: message.includes("✅") ? "#e2f0d9" : "#fce4d6"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "800px" }}>
          <div>
            <label style={{ fontWeight: "bold" }}>Agency Code</label>
            <input type="text" value={agencyData.AgencyCode || "N/A"} disabled />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Status</label>
            <select value={status ? "true" : "false"} onChange={(e) => setStatus(e.target.value === "true")}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Email ID</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Mobile Number</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>

          <div style={{ gridColumn: "span 2", display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer2 />
    </>
  );
}
