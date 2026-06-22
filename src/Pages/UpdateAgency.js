import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";

export default function UpdateAgency() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Maan lete hain ki pichle page se booking ka data aa raha hai
  const bookingData = location.state || {};

  // Naye fields ke hisab se states (Aap inko inputs ke sath bind kar sakte hain)
  const [ticketNumber, setTicketNumber] = useState(bookingData.PaxTickets?.[0]?.TicketNumber || "54354534");
  const [remark, setRemark] = useState("Ticketupdate");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    try {
      // 1. API URL ko change kiya
      const response = await fetch("https://api.namantechnolab.com/api/Operation/UpdateBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. Request Body ko naye format ke hisab se update kiya
        body: JSON.stringify({
          AdminKey: process.env.REACT_APP_ADMIN_KEY || "02ad68f3-9ae6-4148-85b1-e61d1f03991f",
          TransactionId: Number(bookingData.TransactionId) || 9125,
          BookingId: bookingData.BookingId || "FLY160620269125",
          GDSPnr: bookingData.GDSPnr || "8jhkjktuu6",
          AirlinePnr: bookingData.AirlinePnr || "8jhkjktuu6",
          ReturnGDSPnr: bookingData.ReturnGDSPnr || null,
          ReturnAirlinePnr: bookingData.ReturnAirlinePnr || null,
          EngineId: Number(bookingData.EngineId) || 33,
          BookingStatusV2: Number(bookingData.BookingStatusV2) || 1,
          PaxTickets: [
            {
              PaxId: Number(bookingData.PaxTickets?.[0]?.PaxId) || 3478786,
              FirstName: bookingData.PaxTickets?.[0]?.FirstName || "DONST",
              LastName: bookingData.PaxTickets?.[0]?.LastName || "ISSUE",
              TicketNumber: ticketNumber, // Dynamic state se aa raha hai
              PaxBookingStatus: Number(bookingData.PaxTickets?.[0]?.PaxBookingStatus) || 1
            }
          ],
          PortalId: Number(process.env.REACT_APP_PORTAL_ID) || 11,
          Remark: remark // Dynamic state se aa raha hai
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Booking updated successfully");
        setTimeout(() => navigate("/flights", { state: { refreshed: true } }), 1500);
      } else {
        setMessage("⚠️ " + (data?.Message || "Update failed"));
      }
    } catch (error) {
      setMessage("⚠️ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="fl-wrapper" style={{ padding: "20px" }}>
        <h2>✏️ Update Booking</h2>
        {message && <div style={{ marginBottom: "15px" }}>{message}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Booking ID</label>
            <input
              type="text"
              value={bookingData.BookingId || "FLY160620269125"}
              disabled
              style={{ width: "100%", padding: "8px", backgroundColor: "#f5f5f5" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Ticket Number</label>
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Remark</label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{ padding: "10px 20px", backgroundColor: "#2c3e50", color: "#fff", border: "none", borderRadius: "4px" }}
          >
            {loading ? "Updating..." : "Update Booking"}
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "4px" }}
          >
            Cancel
          </button>
        </div>
      </div>
      <Footer2 />
    </>
  );
}