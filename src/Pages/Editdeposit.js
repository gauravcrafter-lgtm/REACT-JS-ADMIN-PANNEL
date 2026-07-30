import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditDeposit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const TransactionId = location.state?.TransactionId;

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Editable fields only
  const [status, setStatus] = useState(0);
  const [txnNumber, setTxnNumber] = useState("");
  const [remark, setRemark] = useState("");

  // Status codes: 0 = Confirm, 1 = Pending, 2 = Reject
  const statusOptions = [
    { value: 0, label: "Confirm" },
    { value: 1, label: "Pending" },
    { value: 2, label: "Reject" },
  ];

  useEffect(() => {
    if (!TransactionId) {
      setError("No transaction selected.");
      setLoading(false);
      return;
    }
    fetchDepositDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TransactionId]);

  const fetchDepositDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.namantechnolab.com/api/Admin/AdminDepositHistory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            AgencyKey: process.env.REACT_APP_AGENCY_KEY,
            BookingId: String(TransactionId),
            AgencyCode: null,
            TransactionType: 0,
            PaymentStatus: 3,
            FromDate: "01-04-2024",
            ToDate: "31-12-2030",
            PortalId: Number(process.env.REACT_APP_PORTAL_ID),
            IsTC: true,
          }),
        }
      );

      const result = await response.json();
      const found =
        Array.isArray(result?.DeHistory) &&
        result.DeHistory.find(
          (item) => String(item.TransactionId) === String(TransactionId)
        );

      if (found) {
        setRecord(found);
        setStatus(Number(found.PaymentStatus) || 0);
        setTxnNumber(found.BankRefId || "");
        setRemark(found.Remark || "");
      } else {
        setError("Transaction not found.");
      }
    } catch (err) {
      setError("Error fetching transaction details.");
    } finally {
      setLoading(false);
    }
  };
const handleUpdate = async () => {
  setUpdating(true);

  try {
    const payload = {
      TransactionId: Number(TransactionId),
      PaymentStatus: Number(status),
      TransactionType: 0,
      Remark: remark,
      TxnNumber: txnNumber,
      TxnAmount: null,
      AgencyKey: null,
      AdminKey: process.env.REACT_APP_ADMIN_KEY,
      PortalId: Number(process.env.REACT_APP_PORTAL_ID),
      IsTC: false,
    };

    // 👇 Ye logs add karo
    console.log("========== UPDATE DEBUG ==========");
    console.log("Record:", record);
    console.log("TransactionId:", TransactionId);
    console.log("AdminKey:", process.env.REACT_APP_ADMIN_KEY);
    console.log("PortalId:", process.env.REACT_APP_PORTAL_ID);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(
      "https://api.namantechnolab.com/api/Admin/UpdateBalanceRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log("Response:", JSON.stringify(result, null, 2));

    if (result?.Status === 1) {
      alert("Fund details updated successfully.");
      navigate(-1);
    } else {
      alert(result?.Error?.ErrorDesc || "Update Failed");
    }
  } catch (err) {
    console.error("Update Error:", err);
  } finally {
    setUpdating(false);
  }
};
  return (
    <div className="ed-overlay">
      <div className="ed-card">
        <div className="ed-header">
          <h2 className="ed-title">TravelAgent Fund Details</h2>
          <button className="ed-close-btn" onClick={() => navigate(-1)}>
            ✕
          </button>
        </div>

        <div className="ed-divider" />

        {loading ? (
          <div className="ed-state">
            <div className="ed-spinner" />
            <p>Loading fund details…</p>
          </div>
        ) : error ? (
          <div className="ed-state ed-state-error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="ed-body">
            <div className="ed-grid">
              <div className="ed-field">
                <label className="ed-label">Payment Mode</label>
                <div className="ed-value-box">{record.PaymentMode || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">TXN Type</label>
                <div className="ed-value-box">{record.TransactionType || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">Bank Ref/Check No.</label>
                <div className="ed-value-box">{record.CheckNumber || "-"}</div>
              </div>

              <div className="ed-field">
                <label className="ed-label">TXN ID</label>
                <div className="ed-value-box">{record.TransactionId || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">Date</label>
                <div className="ed-value-box">{record.DepositDate || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">Time</label>
                <div className="ed-value-box">{record.DepositTime || "-"}</div>
              </div>

              <div className="ed-field">
                <label className="ed-label">Bank Name</label>
                <div className="ed-value-box">{record.BankName || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">Branch Name</label>
                <div className="ed-value-box">{record.BranchName || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">City Name</label>
                <div className="ed-value-box">{record.CityName || "-"}</div>
              </div>

              <div className="ed-field">
                <label className="ed-label">Status</label>
                <select
                  className="ed-input"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ed-field">
                <label className="ed-label">Fund Amount</label>
                <div className="ed-value-box">{record.DepositAmount || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">TA Ref. ID</label>
                <div className="ed-value-box">{record.BankRefId || "-"}</div>
              </div>

              <div className="ed-field">
                <label className="ed-label">Under Account</label>
                <div className="ed-value-box">{record.Maid || "-"}</div>
              </div>
              <div className="ed-field">
                <label className="ed-label">Txn Number</label>
                <input
                  type="text"
                  className="ed-input"
                  placeholder="Txn Number"
                  value={txnNumber}
                  onChange={(e) => setTxnNumber(e.target.value)}
                />
              </div>
              <div className="ed-field">
                <label className="ed-label">Staff Ref. ID</label>
                <div className="ed-value-box">{record.StaffRemark || "-"}</div>
              </div>
            </div>

            <div className="ed-field ed-full">
              <label className="ed-label">Msp Remarks</label>
              <textarea
                className="ed-textarea"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>

            <div className="ed-submit-row">
              <button
                className="ed-update-btn"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Updating…" : "Update"}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ed-overlay {
          min-height: 100vh;
          background: #f4f5f7;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
        }

        .ed-card {
          width: 100%;
          max-width: 1180px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .ed-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px 18px;
        }

        .ed-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
        }

        .ed-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #cfe0fb;
          background: #fff;
          color: #1f2937;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .ed-close-btn:hover {
          background: #f0f6ff;
        }

        .ed-divider {
          height: 1px;
          background: #e6e8ec;
        }

        .ed-body {
          padding: 26px 28px 32px;
        }

        .ed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px 24px;
          margin-bottom: 22px;
        }

        .ed-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ed-full {
          width: 100%;
        }

        .ed-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #4b5563;
        }

        .ed-value-box {
          padding: 10px 12px;
          background: #efefef;
          border: 1px solid #e2e2e2;
          border-radius: 6px;
          font-size: 14px;
          color: #1f2937;
          min-height: 20px;
        }

        .ed-input {
          padding: 10px 12px;
          background: #fff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          color: #1f2937;
          font-family: inherit;
          outline: none;
        }

        .ed-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .ed-textarea {
          width: 100%;
          min-height: 90px;
          padding: 10px 12px;
          background: #fff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          color: #1f2937;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
        }

        .ed-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .ed-submit-row {
          display: flex;
          justify-content: center;
          margin-top: 26px;
        }

        .ed-update-btn {
          font-family: inherit;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          background: #2563eb;
          border: none;
          border-radius: 6px;
          padding: 11px 34px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .ed-update-btn:hover {
          background: #1d4ed8;
        }

        .ed-update-btn:active {
          transform: translateY(1px);
        }

        .ed-update-btn:disabled {
          background: #93b4f0;
          cursor: not-allowed;
        }

        .ed-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 60px 20px;
          color: #6b7280;
          font-size: 14px;
        }

        .ed-state-error p {
          color: #b3441f;
        }

        .ed-spinner {
          width: 26px;
          height: 26px;
          border: 3px solid #e6e8ec;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: ed-spin 0.7s linear infinite;
        }

        @keyframes ed-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 800px) {
          .ed-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .ed-grid {
            grid-template-columns: 1fr;
          }
          .ed-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default EditDeposit;
