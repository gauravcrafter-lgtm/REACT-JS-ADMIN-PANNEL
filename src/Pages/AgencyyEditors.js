import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AgencyyEditors = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const agencyKey = location.state?.AgencyKey;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Agency Editor Page</h2>

      <p>
        <strong>Agency Key:</strong> {agencyKey}
      </p>

      <div style={{ marginTop: "20px" }}>
        <label>Agency Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Agency Name"
          style={{ width: "300px", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>City</label>
        <br />
        <input
          type="text"
          placeholder="Enter City"
          style={{ width: "300px", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginTop: "25px" }}>
        <button
          style={{
            padding: "10px 20px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AgencyyEditors;