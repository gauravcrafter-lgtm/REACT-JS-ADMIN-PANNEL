import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";

const GET_API_URL = process.env.REACT_APP_GET_API_URL;
const UPDATE_API_URL = process.env.REACT_APP_UPDATE_API_URL;

// 👉 Same env vars jo FlightBooking.js mein use ho rahe hain
const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
// AdminKey aur AgencyKey same value hai example mein, agar alag ho to naya env bana lena
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY || AGENCY_KEY;
const ACCOUNT_NO = process.env.REACT_APP_ACCOUNT_NO || "11";

const bookingStatusMap = {
  0: "Default",
  1: "Booked",
  4: "Pending",
  12: "Rejected",
  17: "Hold",
};

const updateStatusOptions = {
  1: "Booked",
  12: "Rejected",
};

const paxStatusMap = {
  1: "Booked",
  12: "Rejected",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function money(n) {
  if (n === undefined || n === null) return "Rs. 0.0";
  return `Rs. ${Number(n).toFixed(1)}`;
}

function AirlineLogo() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 4,
        background: "#0033a0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M2 16l20-6-2 6 2 6-20-6z" fill="#ffffff" opacity="0.9" />
      </svg>
    </div>
  );
}

export default function TicketDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [raw, setRaw] = useState(null);

  const [airlinePnr, setAirlinePnr] = useState("");
  const [newStatus, setNewStatus] = useState("1");
  const [paxList, setPaxList] = useState([]);

  const [updating, setUpdating] = useState(false);
  const [updatingStage, setUpdatingStage] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const [updateOk, setUpdateOk] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError("");

      if (!GET_API_URL) {
        throw new Error(
          "REACT_APP_GET_API_URL .env file mein set nahi hai. Please .env check karein aur app restart karein."
        );
      }

      const payload = {
        APIToken: "",
        AgencyKey: AGENCY_KEY,
        AccountNo: ACCOUNT_NO,
        BookingId: id,
        AirlinePnr: null,
        IsFly: false,
        IsB2B: true,
        IsCreditNote: false,
        IsTC: true,
      };

      const res = await fetch(GET_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API Error");
      const data = await res.json();

      if (data.ResponseStatus !== 1) {
        throw new Error(data?.Error?.ErrorDesc || "Booking details nahi mil paayi");
      }

      setRaw(data);

      const contract = data.Contracts?.[0] || {};
      setAirlinePnr(contract.AirlinePnr || "");

      const currentStatus = data.BookingStatus ?? 1;
      setNewStatus(String(updateStatusOptions[currentStatus] ? currentStatus : 1));

      setPaxList(
        (data.Flightpassenger || []).map((p) => ({
          paxId: p.PaxId,
          firstName: p.FirstName,
          lastName: p.LastName,
          name: `${p.Title || ""} ${p.FirstName || ""} ${p.LastName || ""}`.trim(),
          cabinBag: contract.AirSegments?.[0]?.BaggageAllowed?.HandBaggage || "-",
          checkInBag: contract.AirSegments?.[0]?.BaggageAllowed?.CheckInBaggage || "-",
          meal: p.MealCode || "-",
          baggage: p.BaggageCode || "-",
          seat: p.SeatCode || "-",
          refundable: contract.Refundable ? "True" : "False",
          ticketNumber: p.TicketNumber || "",
          paxStatus: String(updateStatusOptions[data.BookingStatus] ? data.BookingStatus : 1),
        }))
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Booking details fetch karne mein problem aayi. Please retry karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePaxFieldChange = (paxId, field, value) => {
    setPaxList((prev) =>
      prev.map((p) => (p.paxId === paxId ? { ...p, [field]: value } : p))
    );
  };

  // 👉 Jab tak PNR aur sabhi passengers ka Ticket No. fill nahi hota, form incomplete rahega
  const isFormComplete =
    airlinePnr.trim() !== "" &&
    paxList.length > 0 &&
    paxList.every((p) => p.ticketNumber.trim() !== "");

  const handleUpdate = async () => {
    if (!raw) return;

    if (!isFormComplete) {
      setUpdateOk(false);
      setUpdateMsg("Please PNR aur sabhi passengers ka Ticket No. fill karein, tabhi update hoga.");
      return;
    }

    if (!UPDATE_API_URL) {
      setUpdateOk(false);
      setUpdateMsg(
        "REACT_APP_UPDATE_API_URL .env file mein set nahi hai. Please .env check karein aur app restart karein."
      );
      return;
    }

    try {
      setUpdating(true);
      setUpdateMsg("");
      setUpdateOk(false);

      // 🕐 Real-world jaisi speed — ek hi jhatke mein submit nahi hota,
      // staged progress dikhta hai
      setUpdatingStage("Validating details...");
      await sleep(600);

      const contract = raw.Contracts?.[0] || {};

      const payload = {
        AdminKey: ADMIN_KEY,
        TransactionId: Number(raw.BookingId),
        BookingId: raw.Tsid,
        GDSPnr: airlinePnr,
        AirlinePnr: airlinePnr,
        ReturnGDSPnr: null,
        ReturnAirlinePnr: null,
        EngineId: contract.Engine,
        BookingStatusV2: Number(newStatus),
        PaxTickets: paxList.map((p) => ({
          PaxId: Number(p.paxId),
          FirstName: p.firstName,
          LastName: p.lastName,
          TicketNumber: p.ticketNumber,
          PaxBookingStatus: Number(p.paxStatus),
        })),
        PortalId: Number(PORTAL_ID),
        Remark: "Ticketupdate",
      };

      setUpdatingStage("Updating booking...");
      const res = await fetch(UPDATE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update API Error");
      await res.json();

      setUpdatingStage("Finalizing...");
      await sleep(500);

      setUpdateOk(true);
      setUpdateMsg("Booking successfully .");
      await fetchDetails(); // refresh with latest data
    } catch (err) {
      console.error(err);
      setUpdateOk(false);
      setUpdateMsg("Update fail ho gaya. Please retry karein.");
    } finally {
      setUpdating(false);
      setUpdatingStage("");
    }
  };

  if (loading) {
    return (
      <div className="eticket-card">
        <div className="eticket-body state-box">
          <div className="spinner" />
          <p>Booking details load ho rahi hai...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eticket-card">
        <div className="eticket-body state-box">
          <p>{error}</p>
          <button className="btn-paynow" onClick={fetchDetails}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!raw) return null;

  const contract = raw.Contracts?.[0] || {};
  const segments = contract.AirSegments || [];
  const fare = contract.AirlineFare || {};

  return (
    <div className="eticket-card">
      <Sidebar/>
      <div className="eticket-topline" />

      <div className="eticket-body">
        <div className="row-between header-row">
          <strong>Your e-Ticket</strong>
          <span>
            <strong>Booking Date:</strong>{" "}
            <span className="link-blue">{raw.BookingDate}</span>
          </span>
        </div>

        <hr className="hr-line" />

        <table className="kv-table">
          <tbody>
            <tr>
              <td className="kv-label">Reference ID</td>
              <td>{raw.Tsid}</td>
            </tr>
            <tr>
              <td className="kv-label">Ticket Status</td>
              <td>{bookingStatusMap[raw.BookingStatus] || raw.BookingStatus}</td>
            </tr>
            <tr>
              <td className="kv-label">Ticket Status</td>
              <td>
                <select
                  className="edit-input"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {Object.entries(updateStatusOptions).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="dashed-sep" />

        <table className="segments-table">
          <thead>
            <tr>
              <th>Airline/Flight No.</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Class</th>
              <th>Pnr</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((seg, i) => (
              <tr key={i}>
                <td>
                  <div className="airline-cell">
                    <AirlineLogo />
                    <div>
                      <span className="link-blue block">{seg.AirlineName}</span>
                      <span className="block">
                        {seg.AirlineCode}-{seg.FlightNumber}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="link-blue block">[{seg.Origen}]</span>
                  <span className="block">
                    {seg.DepartureDateTime} {seg.DepartureTime}
                  </span>
                </td>
                <td>
                  <span className="link-blue block">[{seg.Destination}]</span>
                  <span className="block">
                    {seg.ArrivalDateTime} {seg.ArrivalTime}
                  </span>
                </td>
                <td>Economy</td>
                <td>
                  <input
                    type="text"
                    className="edit-input pnr-input"
                    value={airlinePnr}
                    onChange={(e) => setAirlinePnr(e.target.value)}
                    placeholder="Enter PNR"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="section-title">Passenger - Details</h3>

        <table className="segments-table">
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>bag[Cabin]</th>
              <th>bag[CheckIn]</th>
              <th>Meal</th>
              <th>Baggage</th>
              <th>Seat</th>
              <th>Refundable</th>
              <th>Ticket No.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paxList.map((p) => (
              <tr key={p.paxId}>
                <td>{p.name}</td>
                <td>{p.cabinBag}</td>
                <td>{p.checkInBag}</td>
                <td>{p.meal}</td>
                <td>{p.baggage}</td>
                <td>{p.seat}</td>
                <td>{p.refundable}</td>
                <td>
                  <input
                    type="text"
                    className="edit-input ticketno-input"
                    value={p.ticketNumber}
                    onChange={(e) =>
                      handlePaxFieldChange(p.paxId, "ticketNumber", e.target.value)
                    }
                    placeholder="Ticket No."
                  />
                </td>
                <td>
                  <select
                    className="edit-input"
                    value={p.paxStatus}
                    onChange={(e) =>
                      handlePaxFieldChange(p.paxId, "paxStatus", e.target.value)
                    }
                  >
                    {Object.entries(paxStatusMap).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="fare-panel">
          <div className="row-between fare-head">
            <strong className="link-blue">Fare Details</strong>
            <strong className="link-blue">Amount ({fare.Currency || "INR"})</strong>
          </div>
          <div className="fare-rows">
            <div className="row-between fare-line">
              <span>Basic Fare :</span>
              <span>{money(fare.BaseFare)}</span>
            </div>
            <div className="row-between fare-line">
              <span>Other Charges :</span>
              <span>{money(fare.TaxFare)}</span>
            </div>
            <div className="row-between fare-line">
              <span>Discount :</span>
              <span>{money(fare.Discount)}</span>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="row-between fare-total">
            <strong>Total</strong>
            <strong>{money(fare.GrossFare)}</strong>
          </div>
        </div>

       

        {updateMsg && (
          <div className={`update-msg ${updateOk ? "ok" : "fail"}`}>{updateMsg}</div>
        )}

        <div className="pay-row">
          <button
            type="button"
            className="btn-update"
            onClick={handleUpdate}
            disabled={updating || !isFormComplete}
          >
            {updating ? updatingStage || "Updating..." : "Update"}
          </button>
        </div>
        <Footer2/>
      </div>

      <style>{`
        .eticket-card {
          font-family: Arial, Helvetica, sans-serif;
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #dfe9fb;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .eticket-topline { height: 4px; background: #e6f0ff; }
        .eticket-body { padding: 24px 28px 20px; }

        .state-box { text-align: center; padding: 40px 20px; color: #333; }
        .spinner {
          width: 28px; height: 28px; margin: 0 auto 12px;
          border: 3px solid #dfe9fb; border-top-color: #027fe3;
          border-radius: 50%; animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .row-between { display: flex; align-items: center; justify-content: space-between; }
        .block { display: block; }
        .link-blue { color: #027fe3; }

        .header-row { font-size: 14px; color: #111111; }
        .hr-line { border: none; border-top: 1px solid #e4e4e4; margin: 14px 0; }

        .kv-table { border-collapse: collapse; margin: 18px 0 10px; font-size: 13px; }
        .kv-table td { padding: 6px 10px 6px 0; color: #222222; }
        .kv-label { font-weight: 700; min-width: 110px; }

        .dashed-sep { border-top: 1px dashed #cccccc; margin: 16px 0; }

        .segments-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; }
        .segments-table th {
          background: #bedff1;
          border: 1px solid #111111;
          text-align: left;
          padding: 8px 10px;
          font-weight: 700;
        }
        .segments-table td {
          border: 1px solid #111111;
          padding: 8px 10px;
          vertical-align: top;
          color: #111111;
        }
        .airline-cell { display: flex; align-items: center; }

        .edit-input {
          border: 1px solid #cfd9e6;
          border-radius: 4px;
          padding: 6px 8px;
          font-size: 12px;
          color: #111111;
          width: 100%;
          box-sizing: border-box;
        }
        .edit-input:focus { outline: none; border-color: #027fe3; }
        .pnr-input { min-width: 160px; }
        .ticketno-input { min-width: 110px; }

        .section-title {
          color: #027fe3;
          font-size: 16px;
          font-weight: 700;
          margin: 4px 0 12px;
        }

        .fare-panel {
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          padding: 14px 18px;
          margin-top: 10px;
        }
        .fare-head { font-size: 15px; margin-bottom: 8px; }
        .fare-rows { font-size: 13px; color: #333333; }
        .fare-line { padding: 4px 0; }
        .fare-total { font-size: 16px; color: #111111; }

        .hint-msg {
          margin-top: 14px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          color: #7a5b00;
          background: #fff8e1;
          border: 1px solid #f0dca0;
          text-align: center;
        }

        .update-msg {
          margin-top: 14px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
        }
        .update-msg.ok { color: #16794f; background: #e7f8f0; border: 1px solid #b7e5cd; }
        .update-msg.fail { color: #b3261e; background: #fdeceb; border: 1px solid #f3c1bd; }

        .pay-row { display: flex; justify-content: center; margin-top: 20px; }
        .btn-update {
          background: #1f9d55;
          color: #ffffff;
          border: 0;
          padding: 10px 60px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-update:hover { background: #17803f; }
        .btn-update:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-paynow {
          background: #027fe3;
          color: #ffffff;
          border: 0;
          padding: 10px 40px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 12px;
        }

        @media screen and (max-width: 640px) {
          .eticket-body { padding: 16px; }
          .segments-table { font-size: 11px; }
          .segments-table th, .segments-table td { padding: 6px; }
        }
      `}</style>
    </div>
  );
}