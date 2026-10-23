import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAgencyConfig } from "../utils/loadAgencyConfig";

export default function Adits() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  const UPDATE_API = process.env.REACT_APP_UPDATE_API;

  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
  });

  const [loadingConfig, setLoadingConfig] = useState(true);

  const [formData, setFormData] = useState({
    AgencyName: data?.AgencyName || "",
    BookingId: data?.BookingId || "",
    AirlinePnr: data?.AirlinePnr || "",
    Sector: data?.Sector || "",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();

        setConfig({
          AgencyKey: cfg.AgencyKey,
          PortalId: cfg.PortalId,
        });
      } catch (error) {
        console.error("Config load failed:", error);
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfig();
  }, []);

  if (!data) {
    return (
      <h3 style={{ textAlign: "center" }}>
        ❌ No Data Found
      </h3>
    );
  }

  if (loadingConfig) {
    return (
      <h3 style={{ textAlign: "center" }}>
        Loading Config...
      </h3>
    );
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
        AgencyKey: config.AgencyKey,
        PortalId: Number(config.PortalId),

        AgencyName: formData.AgencyName,
        BookingId: formData.BookingId,
        AirlinePnr: formData.AirlinePnr,
        Sector: formData.Sector,
      };

      console.log("UPDATE PAYLOAD:", payload);

      const response = await fetch(UPDATE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const result = await response.json();

      console.log("UPDATE RESPONSE:", result);

      alert("✅ Updated Successfully");

      navigate("/flightbooking");
    } catch (error) {
      console.error(error);
      alert("❌ Update Failed");
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

      <br />
      <br />

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