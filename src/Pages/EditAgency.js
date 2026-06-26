import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditAgency() {
  const location = useLocation();
  const navigate = useNavigate();

  const agencyKey = location.state?.AgencyKey;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://promo.namantechnolab.com/api/Agent/AgencyProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              APIToken: null,
              AgencyKey: agencyKey,
              IsB2B: true,
              PortalId: 11,
              IsTC: false,
            }),
          }
        );
debugger;

        const data = await response.json();
   console.log("API Response:", data);
        setFormData({
          ...data,
          Password: "123456",
            AgencyStatus: data.AgencyStatus ?? true,
        });
      } catch (err) {
        console.log(err);
        alert("Failed to load agency");
      } finally {
        setLoading(false);
      }
    };

    if (agencyKey) fetchAgency();
  }, [agencyKey]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleStatusChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    AgencyStatus: e.target.value === "true",
  }));
};
  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      setSaving(true);

      const payload = {
        Tital: null,
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        MobileNo: formData.MobileNumber,
        LandLine: formData.PhoneNumber || "NA",
        EmailId: formData.AgenyEmail,
        Address: formData.AgencyAgddress,
        City: formData.AgencyCity,
        State: formData.AgencyState,
        Country: formData.AgencyCountry,
        PinCode: formData.PinCode,
        AgencyName: formData.AgencyName,
        Password: formData.Password || "123456",
        GSTN: formData.GSTNumber,
        PanNo: formData.PanNumber,
        PanCard: "NA",
        GSTCertificate: "NA",
        AddressCertificate: "NA",
        IsActive: formData.AgencyStatus,
        AdminKey: ADMIN_KEY,
        AgencyKey: formData.AgencyKey,
        IsAdd: false,
        AgencyCode: formData.AgencyCode,
        PortalId: formData.PortalId,
        IsTC: true,
      };
debugger;
      const response = await fetch(
        "https://api.namantechnolab.com/api/Agent/RegisterAgent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // ⚠️ IMPORTANT FIX (HTML ERROR PROTECTION)
      const text = await response.text();
debugger;
      let result;
      try {
        result = JSON.parse(text);
        console.log("API Response:", result);
      } catch {
        throw new Error("Server error (not JSON response)");
      }
 console.log("API Response:", result);
      if (response.ok) {
        alert("Updated Successfully");

        navigate("/flights", {
          state: { refresh: true },
        });
      } else {
        alert(result?.Message || "Update Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Update Failed / CORS / Server Issue");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <h3>Loading...</h3>;

 return (
  <div className="agency-page">
    <div className="agency-card">
      <h2>Edit Agency</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Agency Name</label>
          <input
            name="AgencyName"
            value={formData.AgencyName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            name="FirstName"
            value={formData.FirstName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="LastName"
            value={formData.LastName || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="AgenyEmail"
            value={formData.AgenyEmail || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            name="MobileNumber"
            value={formData.MobileNumber || ""}
            onChange={handleChange}
          />
        </div>

        {/* New Status Field */}
        <div className="form-group">
          <label>Status</label>

          <div className="status-group">
            <label className="radio-label">
              <input
                type="radio"
                name="AgencyStatus"
                value="true"
                checked={formData.AgencyStatus === true}
                onChange={handleStatusChange}
              />
              Active
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="AgencyStatus"
                value="false"
                checked={formData.AgencyStatus === false}
                onChange={handleStatusChange}
              />
              Inactive
            </label>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            name="AgencyAgddress"
            rows="4"
            value={formData.AgencyAgddress || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="update-btn"
        onClick={handleUpdate}
        disabled={saving}
      >
        {saving ? "Updating..." : "Update Agency"}
      </button>
    </div>
  </div>
);
}