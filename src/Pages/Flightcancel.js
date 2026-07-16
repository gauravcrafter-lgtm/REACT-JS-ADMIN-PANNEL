import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";

const BookingHistory = () => {
  const [filters, setFilters] = useState({
    FromDate: "10-02-2026",
    ToDate: "20-07-2026",
    BookingId: "",
    AirlinePnr: "",
    Status: 0,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Which row's detail panel is currently open (by index), and the form
  // values typed inside that panel (cancel charge, service charge, remark, fare).
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [rowForms, setRowForms] = useState({});

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.namantechnolab.com/api/Admin/AdminBookingHistory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserKey: null,
            AgencyKey: "02AD68F3-9AE6-4148-85B1-E61D1F03991F",
            FromDate: filters.FromDate,
            ToDate: filters.ToDate,
            TravelDate: null,
            BookingId: filters.BookingId,
            AirlinePnr: filters.AirlinePnr,
            AgencyCode: null,
            BookingStatus: filters.Status,
            ReportType: 2,
            PortalId: 11,
            IsTC: true,
          }),
        }
      );

      const result = await response.json();
      console.log("API Result:", result);

      if (result && Array.isArray(result.BookingHistory)) {
        setData(result.BookingHistory);
      } else {
        setError("No records found.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRowForm = (index) =>
    rowForms[index] || { fare: null, cancelCharge: "", serviceCharge: "", remark: "" };

  const toggleRow = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleRowFieldChange = (index, field, value) => {
    setRowForms((prev) => ({
      ...prev,
      [index]: { ...getRowForm(index), [field]: value },
    }));
  };

  const handleLoadPaxFare = (index) => {
    // No fare endpoint is wired up yet — showing the placeholder amount
    // the panel is meant to display until that API is connected.
    handleRowFieldChange(index, "fare", "00.00");
  };

  const handleSubmitCancellation = (index, item) => {
    const form = getRowForm(index);
    const payload = {
      BookingId: item.BookingId,
      AirlinePnr: item.AirlinePnr,
      CancelCharge: form.cancelCharge,
      ServiceCharge: form.serviceCharge,
      Remark: form.remark,
    };
    // Wire this up to the real submit endpoint when it's ready.
    console.log("Submitting cancellation:", payload);
    alert("Cancellation details submitted.");
    setExpandedIndex(null);
  };

  return (
    <div className="bh-shell">
      <Sidebar />

      <div className="bh-container">
        <div className="bh-header">
          <span className="bh-eyebrow">Admin · Bookings</span>
          <h2 className="bh-title">Flight Cancellation</h2>
        </div>

        {/* Filters */}
        <div className="bh-filters-card">
          <div className="bh-filters">
            <div className="bh-field">
              <label className="bh-label">From date</label>
              <input
                type="text"
                name="FromDate"
                value={filters.FromDate}
                onChange={handleChange}
                placeholder="From Date"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">To date</label>
              <input
                type="text"
                name="ToDate"
                value={filters.ToDate}
                onChange={handleChange}
                placeholder="To Date"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Booking ID</label>
              <input
                type="text"
                name="BookingId"
                value={filters.BookingId}
                onChange={handleChange}
                placeholder="Enter Booking Id"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Airline PNR</label>
              <input
                type="text"
                name="AirlinePnr"
                value={filters.AirlinePnr}
                onChange={handleChange}
                placeholder="Enter Airline PNR"
                className="bh-input"
              />
            </div>

            <div className="bh-field">
              <label className="bh-label">Status</label>
              <select
                name="Status"
                value={filters.Status}
                onChange={handleChange}
                className="bh-input bh-select"
              >
                <option value={0}>----- Select -----</option>
                <option value={0}>Pending</option>
                <option value={1}>Completed</option>
              </select>
            </div>

            <button onClick={fetchData} className="bh-search-btn">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bh-table-card">
          {loading ? (
            <div className="bh-state">
              <div className="bh-spinner" />
              <p>Loading bookings…</p>
            </div>
          ) : error ? (
            <div className="bh-state bh-state-error">
              <p>{error}</p>
            </div>
          ) : data.length > 0 ? (
            <div className="bh-table-wrap">
              <table className="bh-table">
                <thead>
                  <tr>
                    <th>Agency</th>
                    <th>Cancel ID</th>
                    <th>Cancel Date</th>
                    <th>PNR</th>
                    <th>Sector</th>
                    <th>Status</th>
                    <th>Pax Type</th>
                    <th>Passenger Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const isOpen = expandedIndex === index;
                    const form = getRowForm(index);
                    const cancelStatusText = item.Status
                      ? item.Status
                      : "Cancel Under Process";

                    return (
                      <React.Fragment key={index}>
                        <tr className={isOpen ? "bh-row-active" : ""}>
                          <td>{item.AgencyName}</td>
                          <td className="bh-mono">{item.BookingId}</td>
                          <td>{item.BookingDate}</td>
                          <td className="bh-mono">{item.AirlinePnr}</td>
                          <td>{item.Sector}</td>
                          <td>
                            <span
                              className={`bh-badge ${
                                item.Status ? "bh-badge-done" : "bh-badge-pending"
                              }`}
                            >
                              {cancelStatusText}
                            </span>
                          </td>
                          <td>{item.PaxType}</td>
                          <td>{item.PaxName}</td>
                          <td>
                            <button
                              className={`bh-action-btn ${isOpen ? "bh-action-btn-active" : ""}`}
                              onClick={() => toggleRow(index)}
                            >
                              {isOpen ? "Close" : "Open"}
                            </button>
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="bh-detail-row">
                            <td colSpan={9}>
                              <div className="bh-detail-panel">
                                <div className="bh-detail-line">
                                  <span className="bh-detail-label">Agency</span>
                                  <span className="bh-detail-value">{item.AgencyName}</span>
                                </div>
                                <div className="bh-detail-line bh-detail-alt">
                                  <span className="bh-detail-label">Booking Id</span>
                                  <span className="bh-detail-value">{item.BookingId}</span>
                                </div>
                                <div className="bh-detail-line">
                                  <span className="bh-detail-label">Date</span>
                                  <span className="bh-detail-value">{item.BookingDate}</span>
                                </div>
                                <div className="bh-detail-line bh-detail-alt">
                                  <span className="bh-detail-label">AirlinePnr</span>
                                  <span className="bh-detail-value">{item.AirlinePnr}</span>
                                </div>
                                <div className="bh-detail-line">
                                  <span className="bh-detail-label">Cancel Status</span>
                                  <span className="bh-detail-value">Cancelled Booking List</span>
                                </div>
                                <div className="bh-detail-line bh-detail-alt">
                                  <span className="bh-detail-label">Pax Type</span>
                                  <span className="bh-detail-value">{item.PaxType}</span>
                                </div>
                                <div className="bh-detail-line">
                                  <span className="bh-detail-label">Pax Name</span>
                                  <span className="bh-detail-value">{item.PaxName}</span>
                                </div>

                                <div className="bh-detail-line bh-detail-alt bh-detail-fare-row">
                                  <button
                                    className="bh-load-fare-btn"
                                    onClick={() => handleLoadPaxFare(index)}
                                  >
                                    Load Pax Fare
                                  </button>
                                  <span className="bh-detail-value">
                                    {form.fare !== null ? form.fare : ""}
                                  </span>
                                </div>

                                <div className="bh-detail-line">
                                  <span className="bh-detail-label">Cancel Charge</span>
                                  <input
                                    type="text"
                                    className="bh-detail-input"
                                    placeholder="Enter Cancel Charge"
                                    value={form.cancelCharge}
                                    onChange={(e) =>
                                      handleRowFieldChange(index, "cancelCharge", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="bh-detail-line bh-detail-alt">
                                  <span className="bh-detail-label">Service Charge</span>
                                  <input
                                    type="text"
                                    className="bh-detail-input"
                                    placeholder="Enter Service Charge"
                                    value={form.serviceCharge}
                                    onChange={(e) =>
                                      handleRowFieldChange(index, "serviceCharge", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="bh-detail-line bh-detail-remark-row">
                                  <span className="bh-detail-label">Enter Remark</span>
                                  <textarea
                                    className="bh-detail-textarea"
                                    value={form.remark}
                                    onChange={(e) =>
                                      handleRowFieldChange(index, "remark", e.target.value)
                                    }
                                  />
                                </div>

                                <div className="bh-detail-submit-row">
                                  <button
                                    className="bh-submit-btn"
                                    onClick={() => handleSubmitCancellation(index, item)}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bh-state">
              <p>No data available.</p>
            </div>
          )}
        </div>
      </div>

      <Footer2 />

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap");

        .bh-shell {
          --bh-navy: #14304d;
          --bh-navy-light: #1e4266;
          --bh-amber: #c99a3e;
          --bh-bg: #f6f7f9;
          --bh-card: #ffffff;
          --bh-border: #e6e8ec;
          --bh-text: #1f2937;
          --bh-text-muted: #6b7280;
          --bh-green: #1f8a5f;
          --bh-green-bg: #e6f5ee;
          --bh-amber-bg: #fbf1de;
          --bh-blue: #2563eb;

          display: flex;
          min-height: 100vh;
          background: var(--bh-bg);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--bh-text);
        }

        .bh-container {
          flex: 1;
          padding: 32px 36px 60px;
          max-width: 1280px;
        }

        .bh-header {
          margin-bottom: 24px;
        }

        .bh-eyebrow {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--bh-amber);
          margin-bottom: 6px;
        }

        .bh-title {
          font-family: "Manrope", sans-serif;
          font-weight: 800;
          font-size: 26px;
          color: var(--bh-navy);
          margin: 0;
        }

        .bh-filters-card {
          background: var(--bh-card);
          border: 1px solid var(--bh-border);
          border-radius: 14px;
          padding: 20px 22px;
          margin-bottom: 24px;
          box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
        }

        .bh-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 16px;
        }

        .bh-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 150px;
        }

        .bh-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--bh-text-muted);
        }

        .bh-input {
          font-family: inherit;
          font-size: 14px;
          padding: 10px 12px;
          border: 1px solid var(--bh-border);
          border-radius: 8px;
          background: #fbfbfc;
          color: var(--bh-text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-input:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
          background: #fff;
        }

        .bh-select {
          cursor: pointer;
        }

        .bh-search-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          background: var(--bh-navy);
          border: none;
          border-radius: 8px;
          padding: 11px 22px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
          white-space: nowrap;
        }

        .bh-search-btn:hover {
          background: var(--bh-navy-light);
        }

        .bh-search-btn:active {
          transform: translateY(1px);
        }

        .bh-table-card {
          background: var(--bh-card);
          border: 1px solid var(--bh-border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(20, 48, 77, 0.04);
        }

        .bh-table-wrap {
          overflow-x: auto;
        }

        .bh-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }

        .bh-table thead th {
          text-align: left;
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 11.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #fff;
          background: var(--bh-navy);
          padding: 13px 16px;
          white-space: nowrap;
          position: sticky;
          top: 0;
        }

        .bh-table tbody td {
          padding: 13px 16px;
          border-bottom: 1px solid var(--bh-border);
          color: var(--bh-text);
          white-space: nowrap;
        }

        .bh-table tbody tr.bh-row-active td {
          background: #f2f6fb;
        }

        .bh-table tbody tr:not(.bh-detail-row):hover td {
          background: #f9fafb;
        }

        .bh-table tbody tr.bh-row-active:hover td {
          background: #f2f6fb;
        }

        .bh-table tbody tr:last-child td {
          border-bottom: none;
        }

        .bh-mono {
          font-variant-numeric: tabular-nums;
          color: var(--bh-navy-light);
          font-weight: 600;
        }

        .bh-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px 5px 10px;
          border-radius: 999px;
          position: relative;
        }

        .bh-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .bh-badge-pending {
          background: var(--bh-amber-bg);
          color: #93691f;
        }

        .bh-badge-pending::before {
          background: var(--bh-amber);
        }

        .bh-badge-done {
          background: var(--bh-green-bg);
          color: var(--bh-green);
        }

        .bh-badge-done::before {
          background: var(--bh-green);
        }

        .bh-action-btn {
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: var(--bh-blue);
          border: 1.5px solid var(--bh-blue);
          border-radius: 7px;
          padding: 6px 16px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .bh-action-btn:hover {
          background: #1d4ed8;
        }

        .bh-action-btn-active {
          background: var(--bh-navy);
          border-color: var(--bh-navy);
        }

        .bh-action-btn-active:hover {
          background: var(--bh-navy-light);
        }

        /* Expanded detail panel, styled like a compact form/spec sheet */
        .bh-detail-row td {
          padding: 0;
          background: #fafbfc;
          border-bottom: 1px solid var(--bh-border);
        }

        .bh-detail-panel {
          max-width: 620px;
          padding: 16px 16px 20px;
          white-space: normal;
        }

        .bh-detail-line {
          display: flex;
          align-items: center;
          padding: 9px 12px;
          border-bottom: 1px solid var(--bh-border);
          font-size: 13px;
          gap: 16px;
        }

        .bh-detail-alt {
          background: #f1f4f8;
        }

        .bh-detail-label {
          flex: 0 0 150px;
          color: var(--bh-blue);
          font-weight: 600;
        }

        .bh-detail-value {
          color: var(--bh-text);
          font-weight: 500;
        }

        .bh-detail-fare-row {
          align-items: center;
        }

        .bh-load-fare-btn {
          flex: 0 0 150px;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: var(--bh-blue);
          border: none;
          border-radius: 6px;
          padding: 7px 14px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .bh-load-fare-btn:hover {
          background: #1d4ed8;
        }

        .bh-detail-input {
          flex: 1;
          max-width: 220px;
          font-family: inherit;
          font-size: 13px;
          padding: 6px 10px;
          border: 1px solid var(--bh-border);
          border-radius: 6px;
          outline: none;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-detail-input:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
        }

        .bh-detail-remark-row {
          align-items: flex-start;
        }

        .bh-detail-textarea {
          flex: 1;
          max-width: 320px;
          min-height: 54px;
          font-family: inherit;
          font-size: 13px;
          padding: 8px 10px;
          border: 1px solid var(--bh-border);
          border-radius: 6px;
          outline: none;
          resize: vertical;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .bh-detail-textarea:focus {
          border-color: var(--bh-navy-light);
          box-shadow: 0 0 0 3px rgba(30, 66, 102, 0.12);
        }

        .bh-detail-submit-row {
          padding: 14px 12px 0;
        }

        .bh-submit-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
          background: var(--bh-blue);
          border: none;
          border-radius: 7px;
          padding: 9px 24px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .bh-submit-btn:hover {
          background: #1d4ed8;
        }

        .bh-submit-btn:active {
          transform: translateY(1px);
        }

        .bh-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 56px 20px;
          color: var(--bh-text-muted);
          font-size: 14px;
        }

        .bh-state-error p {
          color: #b3441f;
        }

        .bh-spinner {
          width: 26px;
          height: 26px;
          border: 3px solid var(--bh-border);
          border-top-color: var(--bh-amber);
          border-radius: 50%;
          animation: bh-spin 0.7s linear infinite;
        }

        @keyframes bh-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 720px) {
          .bh-container {
            padding: 20px 16px 40px;
          }

          .bh-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .bh-field {
            min-width: 0;
          }

          .bh-search-btn {
            width: 100%;
          }

          .bh-detail-label {
            flex: 0 0 110px;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;