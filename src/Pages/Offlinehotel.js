import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Depositrequest.css"; // Aap chahe toh alag CSS file bhi bana sakte hain

export default function OfflineHotel() {
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [hotels, setHotels] = useState([
    {
      id: 1,
      Hotel: "Taj Hotel",
      City: "Haridwar",
      State: "uttarakhand",
      Country: "India",
      Address: "Post Office JWALAPUR, HARIDWAR",
      PostalCode: "249407",
      Rating: "3.0 ⭐",
      Latitude: "31.235200",
      Longitude: "79.235204",
      CheckIn: "00:26",
      CheckOut: "23:21"
    },
    {
      id: 2,
      Hotel: "Raju Hotel",
      City: "Bhabua, Kaimur City",
      State: "Bihar",
      Country: "India",
      Address: "Chainpur",
      PostalCode: "821101",
      Rating: "2.0 ⭐",
      Latitude: "30.235200",
      Longitude: "78.235204",
      CheckIn: "12:00",
      CheckOut: "23:57"
    }
  ]);

  const handleSearch = () => {
    // Search logic yahan likhein
    console.log("Searching for:", hotelName);
  };

  const handleReset = () => {
    setHotelName("");
  };

  return (
    <div>
      <Sidebar />

      <div className="dr-wrapper">
        {/* ── Header with Add Button ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="dr-page-title">Offline Hotel Ticket Panel</div>
            <div className="dr-page-sub">Manage offline hotel booking tickets</div>
          </div>
          <button
            className="dr-search-btn"
            style={{ backgroundColor: "#007bff", width: "auto", padding: "10px 20px" }}
            onClick={() => navigate("/add-offline-hotel")} // Apne route ke hisab se change karein
          >
            + Add hotel
          </button>
        </div>

        {/* ── Filter Card ── */}
        <div className="dr-filter-card" style={{ marginTop: "20px" }}>
          <div className="dr-filter-title">🔍 Search &amp; filter</div>
          <div className="dr-filter-row" style={{ alignItems: "flex-end" }}>
            <div className="dr-field" style={{ flex: 1 }}>
              <label>Hotel name</label>
              <input
                type="text"
                className="dateInput"
                placeholder="Hotel name"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                style={{ height: "38px", padding: "0 10px", width: "100%", border: "1px solid #ced4da", borderRadius: "4px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="dr-search-btn" onClick={handleSearch} style={{ backgroundColor: "#007f5f" }}>
                🔍 Search
              </button>
              <button className="dr-search-btn" onClick={handleReset} style={{ backgroundColor: "#495057" }}>
                🔄 Reset
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button style={{ padding: "6px 14px", backgroundColor: "#198754", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              📥 Export Excel
            </button>
            <button style={{ padding: "6px 14px", backgroundColor: "#212529", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
              🖨️ Print
            </button>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="dr-table-card" style={{ marginTop: "20px" }}>
          <div className="dr-table-topbar" style={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
            <div className="dr-table-title">📂 Offline ticket list</div>
            <div style={{ fontSize: "13px", color: "#6c757d" }}>{hotels.length} records</div>
          </div>

          <div className="dr-table-scroll">
            <table className="dr-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Address</th>
                  <th>Postal Code</th>
                  <th>Rating</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                </tr>
              </thead>
              <tbody>
                {hotels.length > 0 ? (
                  hotels.map((h, i) => (
                    <tr key={h.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 700 }}>{h.Hotel}</td>
                      <td>{h.City}</td>
                      <td>{h.State}</td>
                      <td>{h.Country}</td>
                      <td>{h.Address}</td>
                      <td>{h.PostalCode}</td>
                      <td>{h.Rating}</td>
                      <td style={{ fontFamily: "monospace" }}>{h.Latitude}</td>
                      <td style={{ fontFamily: "monospace" }}>{h.Longitude}</td>
                      <td>{h.CheckIn}</td>
                      <td>{h.CheckOut}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <Footer2 />
    </div>
  );
}