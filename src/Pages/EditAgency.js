// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function EditAgency() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const agencyKey = location.state?.AgencyKey;

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [formData, setFormData] = useState({});

//   const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

//   // ================= FETCH PROFILE =================
//   useEffect(() => {
//     const fetchAgency = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           "https://promo.namantechnolab.com/api/Agent/AgencyProfile",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               APIToken: null,
//               AgencyKey: agencyKey,
//               IsB2B: true,
//               PortalId: 11,
//               IsTC: false,
//             }),
//           }
//         );
// debugger;

//         const data = await response.json();
//    console.log("API Response:", data);
//         setFormData({
//           ...data,
//           Password: "123456",
//             AgencyStatus: data.AgencyStatus ?? true,
//         });
//       } catch (err) {
//         console.log(err);
//         alert("Failed to load agency");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (agencyKey) fetchAgency();
//   }, [agencyKey]);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
// const handleStatusChange = (e) => {
//   setFormData((prev) => ({
//     ...prev,
//     AgencyStatus: e.target.value === "true",
//   }));
// };
//   // ================= UPDATE =================
//   const handleUpdate = async () => {
//     try {
//       setSaving(true);

//       const payload = {
//         Tital: null,
//         FirstName: formData.FirstName,
//         LastName: formData.LastName,
//         MobileNo: formData.MobileNumber,
//         LandLine: formData.PhoneNumber || "NA",
//         EmailId: formData.AgenyEmail,
//         Address: formData.AgencyAgddress,
//         City: formData.AgencyCity,
//         State: formData.AgencyState,
//         Country: formData.AgencyCountry,
//         PinCode: formData.PinCode,
//         AgencyName: formData.AgencyName,
//         Password: formData.Password || "123456",
//         GSTN: formData.GSTNumber,
//         PanNo: formData.PanNumber,
//         PanCard: "NA",
//         GSTCertificate: "NA",
//         AddressCertificate: "NA",
//         IsActive: formData.AgencyStatus,
//         AdminKey: ADMIN_KEY,
//         AgencyKey: formData.AgencyKey,
//         IsAdd: false,
//         AgencyCode: formData.AgencyCode,
//         PortalId: formData.PortalId,
//         IsTC: true,
//       };

//       const response = await fetch(
//         "https://api.namantechnolab.com/api/Agent/RegisterAgent",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       // ⚠️ IMPORTANT FIX (HTML ERROR PROTECTION)
//       const text = await response.text();
// debugger;
//       let result;
//       try {
//         result = JSON.parse(text);
//         console.log("API Response:", result);
//       } catch {
//         throw new Error("Server error (not JSON response)");
//       }
//  console.log("API Response:", result);
//       if (response.ok) {
//         alert("Updated Successfully");

//         navigate("/flights", {
//           state: { refresh: true },
//         });
//       } else {
//         alert(result?.Message || "Update Failed");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Update Failed / CORS / Server Issue");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <h3>Loading...</h3>;

//  return (
//   <div className="agency-page">
//     <div className="agency-card">
//       <h2>Edit Agency</h2>

//       <div className="form-grid">
//         <div className="form-group">
//           <label>Agency Name</label>
//           <input
//             name="AgencyName"
//             value={formData.AgencyName || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>First Name</label>
//           <input
//             name="FirstName"
//             value={formData.FirstName || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Last Name</label>
//           <input
//             name="LastName"
//             value={formData.LastName || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             name="AgenyEmail"
//             value={formData.AgenyEmail || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>Mobile Number</label>
//           <input
//             name="MobileNumber"
//             value={formData.MobileNumber || ""}
//             onChange={handleChange}
//           />
//         </div>

//         {/* New Status Field */}
//         <div className="form-group">
//           <label>Status</label>

//           <div className="status-group">
//             <label className="radio-label">
//               <input
//                 type="radio"
//                 name="AgencyStatus"
//                 value="true"
//                 checked={formData.AgencyStatus === true}
//                 onChange={handleStatusChange}
//               />
//               Active
//             </label>

//             <label className="radio-label">
//               <input
//                 type="radio"
//                 name="AgencyStatus"
//                 value="false"
//                 checked={formData.AgencyStatus === false}
//                 onChange={handleStatusChange}
//               />
//               Inactive
//             </label>
//           </div>
//         </div>

//         <div className="form-group full-width">
//           <label>Address</label>
//           <textarea
//             name="AgencyAgddress"
//             rows="4"
//             value={formData.AgencyAgddress || ""}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <button
//         className="update-btn"
//         onClick={handleUpdate}
//         disabled={saving}
//       >
//         {saving ? "Updating..." : "Update Agency"}
//       </button>
//     </div>
//   </div>
// );
// }



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

  // Functionality: Fetch Profile
  useEffect(() => {
    const fetchAgency = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://promo.namantechnolab.com/api/Agent/AgencyProfile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ APIToken: null, AgencyKey: agencyKey, IsB2B: true, PortalId: 11, IsTC: false }),
        });
        const data = await response.json();
        setFormData({ ...data, Password: "123456", AgencyStatus: data.AgencyStatus ?? true });
      } catch (err) { alert("Failed to load agency"); }
      finally { setLoading(false); }
    };
    if (agencyKey) fetchAgency();
  }, [agencyKey]);

  // Functionality: Handle Changes
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleStatusChange = (e) => setFormData((prev) => ({ ...prev, AgencyStatus: e.target.value === "true" }));

  // Functionality: Update Agency
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const payload = {
        Tital: null, FirstName: formData.FirstName, LastName: formData.LastName, MobileNo: formData.MobileNumber,
        LandLine: formData.PhoneNumber || "NA", EmailId: formData.AgenyEmail, Address: formData.AgencyAgddress,
        City: formData.AgencyCity, State: formData.AgencyState, Country: formData.AgencyCountry, PinCode: formData.PinCode,
        AgencyName: formData.AgencyName, Password: formData.Password || "123456", GSTN: formData.GSTNumber,
        PanNo: formData.PanNumber, PanCard: "NA", GSTCertificate: "NA", AddressCertificate: "NA",
        IsActive: formData.AgencyStatus, AdminKey: ADMIN_KEY, AgencyKey: formData.AgencyKey, IsAdd: false,
        AgencyCode: formData.AgencyCode, PortalId: formData.PortalId, IsTC: true,
      };
      const response = await fetch("https://api.namantechnolab.com/api/Agent/RegisterAgent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok) { alert("Updated Successfully"); navigate("/flights", { state: { refresh: true } }); }
      else { alert(result?.Message || "Update Failed"); }
    } catch (err) { alert("Update Failed / Server Issue"); }
    finally { setSaving(false); }
  };

  if (loading) return <div style={styles.loader}>Loading...</div>;

  return (
    <div style={styles.page}>
      <Sidebar/>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Agency</h2>
        <div style={styles.formGrid}>
          {["AgencyName", "FirstName", "LastName", "AgenyEmail", "MobileNumber"].map((field) => (
            <div key={field} style={styles.group}>
              <label style={styles.label}>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input style={styles.input} name={field} value={formData[field] || ""} onChange={handleChange} />
            </div>
          ))}
          <div style={styles.group}>
            <label style={styles.label}>Status</label>
            <div style={styles.radioGroup}>
              <label><input type="radio" name="status" value="true" checked={formData.AgencyStatus === true} onChange={handleStatusChange} /> Active</label>
              <label><input type="radio" name="status" value="false" checked={formData.AgencyStatus === false} onChange={handleStatusChange} /> Inactive</label>
            </div>
          </div>
          <div style={{ ...styles.group, gridColumn: "span 2" }}>
            <label style={styles.label}>Address</label>
            <textarea style={styles.textarea} name="AgencyAgddress" rows="3" value={formData.AgencyAgddress || ""} onChange={handleChange} />
          </div>
        </div>
        <button style={styles.button} onClick={handleUpdate} disabled={saving}>
          {saving ? "Updating..." : "Update Agency"}
        </button>
      </div>
      <Footer2/>
    </div>
  );
}

const styles = {
  page: { padding: "30px", backgroundColor: "#f4f7f6", minHeight: "100vh", display: "flex", justifyContent: "center" },
  card: { backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", width: "100%", maxWidth: "700px" },
  title: { marginBottom: "20px", color: "#333" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  group: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#555" },
  input: { padding: "12px", border: "1px solid #ddd", borderRadius: "5px" },
  textarea: { padding: "12px", border: "1px solid #ddd", borderRadius: "5px", resize: "none" },
  radioGroup: { display: "flex", gap: "20px", marginTop: "10px" },
  button: { marginTop: "25px", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
  loader: { textAlign: "center", marginTop: "50px" }
};