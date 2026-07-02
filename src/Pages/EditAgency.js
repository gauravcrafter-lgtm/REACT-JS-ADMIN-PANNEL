import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from './Footer2';

export default function EditAgency() {
  const location = useLocation();
  const navigate = useNavigate();
  const agencyKey = location.state?.AgencyKey;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

  useEffect(() => {
    // 🔍 CONSOLE LOG: agencyKey check - null aane ka reason yahan pata chalega
    console.log("=== EditAgency Mounted ===");
    console.log("location.state:", location.state);
    console.log("agencyKey received:", agencyKey, "| typeof:", typeof agencyKey);

    const fetchAgency = async () => {
      try {
        setLoading(true);
        console.log("Calling AgencyProfile API with AgencyKey:", agencyKey);
        const response = await fetch("https://promo.namantechnolab.com/api/Agent/AgencyProfile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            APIToken: null,
            AgencyKey: agencyKey,
            IsB2B: true,
            PortalId: 11,
            IsTC: false
          }),
        });

        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        console.log("Fetched Agency Data:", data);
        console.log("AgencyType raw value/type:", data.AgencyType, typeof data.AgencyType);

        // ✅ FIX: AgencyType ko as-is number (string form) rakho, dropdown value se match karne ke liye
        // Agar API se number aa raha hai (0/1/2) to seedha string bana do.
        const incomingType =
          data.AgencyType !== null && data.AgencyType !== undefined
            ? String(data.AgencyType)
            : "";

        setFormData({
          ...data,
          Password: data.Password || "123456",
          AgencyStatus: data.AgencyStatus ?? true,
          AgencyType: incomingType,
        });
      } catch (err) {
        alert("Failed to load agency data.");
      } finally {
        setLoading(false);
      }
    };

    if (agencyKey) fetchAgency();
    else alert("Invalid Agency Key");
  }, [agencyKey]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleStatusChange = (e) =>
    setFormData((prev) => ({ ...prev, AgencyStatus: e.target.value === "true" }));

  const handleUpdate = async () => {
    setSaving(true);

    // ✅ FIX: dropdown se select ki hui value (string "0"/"1"/"2") ko number mein convert karo
    // aur wahi payload mein bhejo — hardcoded 0 hata diya gaya hai
    const agencyTypeNumber =
      formData.AgencyType !== "" && formData.AgencyType !== undefined
        ? Number(formData.AgencyType)
        : 0;

    const agencyTypeLabel =
      agencyTypeNumber === 1 ? "Distributor" :
      agencyTypeNumber === 2 ? "Agent" : "Admin";

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
      AgencyType: agencyTypeNumber, // 👈 FIX: ab actual selected value jaa rahi hai, hardcoded 0 nahi
    };

    console.log("Sending Payload to RegisterAgent:", payload);

    try {
      const response = await fetch("https://api.namantechnolab.com/api/Agent/RegisterAgent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("API Response Result:", result);

      if (response.ok) {
        alert(`Agency Updated Successfully to: ${agencyTypeLabel}`);
        navigate("/flights", { state: { refresh: true } });
      } else {
        alert(`API Error: ${result?.Message || "Update Failed"}`);
      }
    } catch (err) {
      alert("Server Connection Error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.loader}>Loading Agency Profile...</div>;

  // Plain text-input fields (same handleChange, nothing functional changed)
  const textFields = [
    "FirstName",
    "LastName",
    "AgenyEmail",
    "MobileNumber",
    "PhoneNumber",
    "AgencyName",
    "AgencyCity",
    "AgencyState",
    "AgencyCountry",
    "PinCode",
    "GSTNumber",
    "PanNumber",
  ];

  const fieldLabel = (field) => field.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Agency Profile</h2>
        <div style={styles.formGrid}>
          {textFields.map((field) => (
            <div key={field} style={styles.group}>
              <label style={styles.label}>{fieldLabel(field)}</label>
              <input style={styles.input} name={field} value={formData[field] || ""} onChange={handleChange} />
            </div>
          ))}

          <div style={{ ...styles.group, gridColumn: "span 2" }}>
            <label style={styles.label}>Address</label>
            <textarea
              style={styles.textarea}
              name="AgencyAgddress"
              rows="1"
              value={formData.AgencyAgddress || ""}
              onChange={handleChange}
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Agency Type</label>
            <select
              style={styles.selectHighlight}
              name="AgencyType"
              value={formData.AgencyType ?? ""}
              onChange={handleChange}
            >
              <option value="">Select Agency Type</option>
              <option value="1">Distributor</option>
              <option value="2">Agent</option>
            </select>
          </div>
        </div>

        <div style={styles.imagesRow}>
          <div style={styles.imageGroup}>
            <label style={styles.imageLabel}>PAN Card Image</label>
          </div>
          <div style={styles.imageGroup}>
            <label style={styles.imageLabel}>GST Certificate Image</label>
          </div>
          <div style={styles.imageGroup}>
            <label style={styles.imageLabel}>Address Proof Image</label>
          </div>
        </div>

        <div style={styles.footerRow}>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Status:</span>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="true"
                checked={formData.AgencyStatus === true}
                onChange={handleStatusChange}
              /> Active
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="status"
                value="false"
                checked={formData.AgencyStatus === false}
                onChange={handleStatusChange}
              /> InActive
            </label>
          </div>

          <button style={styles.button} onClick={handleUpdate} disabled={saving}>
            {saving ? "Saving Changes..." : "Update"}
          </button>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

const styles = {
  page: { padding: "30px", backgroundColor: "#f4f7f6", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start" },
  card: { backgroundColor: "#ffffff", padding: "35px 40px", borderRadius: "12px", boxShadow: "0 8px 25px rgba(0,0,0,0.12)", width: "100%", maxWidth: "1390px", marginTop: "20px" },
  title: { marginBottom: "30px", color: "#222", textAlign: "center", fontSize: "28px", fontWeight: "600" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "35px 25px", rowGap: "35px" },

  // Floating-label bordered box, like the screenshot
  group: { display: "flex", flexDirection: "column", position: "relative", marginTop: "10px" },
  label: {
    position: "absolute",
    top: "-10px",
    left: "14px",
    background: "#fff",
    padding: "0 6px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "14px 15px",
    border: "1px solid #c9c9c9",
    borderRadius: "8px",
    fontSize: "15px",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "14px 15px",
    border: "1px solid #c9c9c9",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "15px",
    width: "100%",
    minHeight: "50px",
    boxSizing: "border-box",
  },
  selectHighlight: {
    padding: "14px 15px",
    border: "2px solid #e74c3c",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#e74c3c",
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    marginTop: "35px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  imageGroup: { display: "flex", flexDirection: "column" },
  imageLabel: { fontWeight: "600", fontSize: "15px", color: "#333" },

  footerRow: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  statusRow: { display: "flex", alignItems: "center", gap: "20px" },
  statusLabel: { fontWeight: "700", fontSize: "16px", color: "#222" },
  radioLabel: { display: "flex", alignItems: "center", gap: "6px", fontSize: "15px" },

  button: {
    padding: "12px 30px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  loader: { textAlign: "center", marginTop: "50px", fontSize: "22px", fontWeight: "600" },
};
