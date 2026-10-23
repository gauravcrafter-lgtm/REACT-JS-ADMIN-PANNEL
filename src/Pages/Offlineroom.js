import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/Depositrequest.css";

export default function OfflineRoom() {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]); // Default empty jaisa screenshot mein hai

  const handleSearch = () => {
    // Room search logic
    console.log("Searching room...", { selectedHotel, roomName });
  };

  const handleReset = () => {
    setSelectedHotel("");
    setRoomName("");
  };

  return (
    <div>
      <Sidebar />

      <div className="dr-wrapper">
        {/* ── Header with Add Button ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="dr-page-title">Offline Hotel Room Panel</div>
            <div className="dr-page-sub">Manage offline hotel rooms</div>
          </div>
          <button
            className="dr-search-btn"
            style={{ backgroundColor: "#007bff", width: "auto", padding: "10px 20px" }}
            onClick={() => navigate("/add-offline-room")} // Route path
          >
            + Add Room
          </button>
        </div>

        {/* ── Filter Card ── */}
        <div className="dr-filter-card" style={{ marginTop: "20px" }}>
          <div className="dr-filter-title">🔍 Search &amp; filter</div>
          
          <div className="dr-filter-row" style={{ alignItems: "flex-end" }}>
            <div className="dr-field" style={{ flex: 1 }}>
              <label>Hotel</label>
              <select
                className="dateInput"
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                style={{ height: "38px", width: "100%", border: "1px solid #ced4da", borderRadius: "4px" }}
              >
                <option value="">All Hotels</option>
                <option value="Taj Hotel">Taj Hotel</option>
                <option value="Raju Hotel">Raju Hotel</option>
              </select>
            </div>

            <div className="dr-field" style={{ flex: 1 }}>
              <label>Room name</label>
              <input
                type="text"
                className="dateInput"
                placeholder="Room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
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
            <div className="dr-table-title">📂 Offline room list</div>
            <div style={{ fontSize: "13px", color: "#6c757d" }}>{rooms.length} records</div>
          </div>

          <div className="dr-table-scroll">
            <table className="dr-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel</th>
                  <th>Room ID</th>
                  <th>Room Type</th>
                  <th>Book Hash</th>
                  <th>Guests</th>
                  <th>Meal Basis</th>
                  <th>Room Price</th>
                  <th>Total Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length > 0 ? (
                  rooms.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{r.Hotel}</td>
                      <td>{r.RoomID}</td>
                      <td>{r.RoomType}</td>
                      <td>{r.BookHash}</td>
                      <td>{r.Guests}</td>
                      <td>{r.MealBasis}</td>
                      <td>{r.RoomPrice}</td>
                      <td>{r.TotalPrice}</td>
                      <td>{r.Description}</td>
                      <td>
                        <button className="dr-search-btn" style={{ padding: "4px 10px", fontSize: "12px" }}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center", padding: "30px", color: "#6c757d" }}>
                      No Data Found
                    </td>
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