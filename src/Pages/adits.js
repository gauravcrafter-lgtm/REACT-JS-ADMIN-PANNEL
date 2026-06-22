import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Adits() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // ✅ ENV variables
  const UPDATE_API = process.env.REACT_APP_UPDATE_API;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

  const [formData, setFormData] = useState({
    AgencyName: data?.AgencyName || "",
    BookingId: data?.BookingId || "",
    AirlinePnr: data?.AirlinePnr || "",
    Sector: data?.Sector || "",
  });

  // ❗ Safety (direct URL open case)
  if (!data) {
    return <h3 style={{ textAlign: "center" }}>❌ No Data Found</h3>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        TransactionId: data.TransactionId,
        AgencyKey: AGENCY_KEY,
        PortalId: Number(PORTAL_ID),

        ...formData,
      };

      console.log("UPDATE PAYLOAD:", payload);

      const response = await fetch(UPDATE_API, {
        method: "POST", // ya PUT (API pe depend karta hai)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Update failed");

      const result = await response.json();
      console.log("UPDATE RESPONSE:", result);

      alert("✅ Updated Successfully");

      navigate("/flightbooking");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Booking</h2>

      <input
        name="AgencyName"
        value={formData.AgencyName}
        onChange={handleChange}
        placeholder="Agency Name"
      />

      <input
        name="BookingId"
        value={formData.BookingId}
        onChange={handleChange}
        placeholder="Booking ID"
      />

      <input
        name="AirlinePnr"
        value={formData.AirlinePnr}
        onChange={handleChange}
        placeholder="PNR"
      />

      <input
        name="Sector"
        value={formData.Sector}
        onChange={handleChange}
        placeholder="Sector"
      />

      <br /><br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}