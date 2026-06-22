// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";

// const Markups = () => {
//   const [value, setValue] = useState("");
//   const [apiResponse, setApiResponse] = useState(null);

//   useEffect(() => {
//     fetchMarkupData();
//   }, []);

//   const fetchMarkupData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.namantechnolab.com/api/Admin/AdminOperation",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             FromDate: null,
//             ToDate: null,
//             MarkupRq: null,
//             APIRequestType: 0,
//             AgencyKey: "02AD68F3-9AE6-4148-85B1-E61D1F03991F",
//             AccountNo: 11,
//           }),
//         }
//       );

//       const result = await response.json();

//       console.log("API Response:", result);
//       setApiResponse(result);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };
//   const engineTypes = [
//   { id: 1, name: "Amadeus" },
//   { id: 2, name: "Galileo" },
//   { id: 3, name: "SpiceJet" },
//   { id: 4, name: "GoIndigo" },
//   { id: 5, name: "GoAir" },
//   { id: 6, name: "GoAirAPI" },
//   { id: 7, name: "SpicetJetSpecial" },
//   { id: 8, name: "GoIndigoSpecial" },
//   { id: 9, name: "GoAirSpecial" },
//   { id: 10, name: "ITSpecial" },
//   { id: 11, name: "Arzoo" },
//   { id: 12, name: "PaytronicIndia" },
//   { id: 13, name: "InstaPay" },
//   { id: 14, name: "RedBus" },
//   { id: 15, name: "Rechargemy" },
//   { id: 16, name: "MarsAPI" },
//   { id: 17, name: "EMT" },
//   { id: 18, name: "TBO" },
//   { id: 19, name: "GoAllTrip" },
//   { id: 20, name: "FixedDeparture" },
//   { id: 21, name: "IRCTC" },
//   { id: 22, name: "MoneyTransfer" },
//   { id: 23, name: "AzmyaRecharge" },
//   { id: 24, name: "MultiLink" },
//   { id: 25, name: "JustClick" },
//   { id: 26, name: "OtherFlightSupplier" },
//   { id: 27, name: "AccountVarification" },
//   { id: 28, name: "UAPI" },
//   { id: 29, name: "GMT" },
//   { id: 30, name: "GMT_LccInter" },
//   { id: 31, name: "GMT_GDS_Inter" },
//   { id: 32, name: "Default" },
//   { id: 33, name: "TripJack" },
//   { id: 34, name: "AirIndia_UAPI" },
//   { id: 35, name: "Vistara_UAPI" },
//   { id: 36, name: "Indigo_UAPI" },
//   { id: 37, name: "AirAsia" },
//   { id: 38, name: "XMLHUB" },
//   { id: 39, name: "NDC" },
//   { id: 40, name: "FlyBig" },
//   { id: 41, name: "AkasaAir" },
//   { id: 42, name: "AlliceAir" },
//   { id: 43, name: "Fly24API" }
// ];

//   return (
//     <div>
//       <Sidebar />

//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>Markup</h2>
//           <hr />

//           <div style={styles.box}>
//             <div style={styles.field}>
//               <label style={styles.label}>Process Type*</label>
//               <select style={styles.input}>
//                 <option>B2B</option>
//                 <option>B2C</option>
//               </select>
//             </div>

//             <div style={styles.field}>
//               <label style={styles.label}>Service Type*</label>
//               <select style={styles.input}>
//                 <option>Flight</option>
//                 <option>Hotel</option>
//                 <option>Bus</option>
//               </select>
//             </div>

            

//      <div style={styles.field}>
//   <label style={styles.label}>Engine Type*</label>
//   <select style={styles.input}>
//     <option value="">Select Engine Type</option>

//     {engineTypes.map((item) => (
//       <option key={item.id} value={item.id}>
//         {item.name}
//       </option>
//     ))}
//   </select>
// </div>

//             <div style={styles.field}>
//               <label style={styles.label}>Enter Airline Code</label>
//               <input
//                 type="text"
//                 placeholder="SG,6E"
//                 style={styles.input}
//               />
//             </div>

//             <div style={styles.row}>
//               <div style={styles.smallField}>
//                 <label style={styles.label}>IsDomestic*</label>
//                 <select style={styles.input}>
//                   <option>Domestic</option>
//                   <option>International</option>
//                 </select>
//               </div>

//               <div style={styles.smallField}>
//                 <label style={styles.label}>Status*</label>
//                 <select style={styles.input}>
//                   <option>Percentage</option>
//                   <option>Fixed</option>
//                 </select>
//               </div>

//               <div style={styles.smallField}>
//                 <label style={styles.label}>Value*</label>
//                 <input
//                   type="number"
//                   placeholder="Value"
//                   value={value}
//                   onChange={(e) => setValue(e.target.value)}
//                   style={styles.input}
//                 />
//               </div>
//             </div>

//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <button style={styles.btn}>Submit</button>
//             </div>

//           </div>
//         </div>
//       </div>

//       <Footer2 />
//     </div>
//   );
// };

// const styles = {
//   page: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "30px",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "1000px",
//   },
//   heading: {
//     fontSize: "36px",
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   box: {
//     marginTop: "20px",
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   field: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },
//   label: {
//     fontSize: "14px",
//     fontWeight: "600",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "14px",
//   },
//   row: {
//     display: "flex",
//     gap: "20px",
//     marginTop: "10px",
//     flexWrap: "wrap",
//   },
//   smallField: {
//     flex: 1,
//     minWidth: "220px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   btn: {
//     marginTop: "25px",
//     background: "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "12px 35px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "600",
//     width: "200px",
//   },
// };

// export default Markups;


// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";

// const Markups = () => {
//   const [value, setValue] = useState("");
//   const [apiResponse, setApiResponse] = useState(null);
  
  
//   useEffect(() => {
//     fetchMarkupData();
//   }, []);

//   const fetchMarkupData = async () => {
//     try {
//       const response = await fetch(
//         "https://api.namantechnolab.com/api/Admin/AdminOperation",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             FromDate: null,
//             ToDate: null,
//             MarkupRq: null,
//             APIRequestType: 0,
//             AgencyKey: "02AD68F3-9AE6-4148-85B1-E61D1F03991F",
//             AccountNo: 11,
//           }),
//         }
//       );

//       const result = await response.json();

//       console.log("API Response:", result);
//       setApiResponse(result);
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };
//   const engineTypes = [
//   { id: 1, name: "Amadeus" },
//   { id: 2, name: "Galileo" },
//   { id: 3, name: "SpiceJet" },
//   { id: 4, name: "GoIndigo" },
//   { id: 5, name: "GoAir" },
//   { id: 6, name: "GoAirAPI" },
//   { id: 7, name: "SpicetJetSpecial" },
//   { id: 8, name: "GoIndigoSpecial" },
//   { id: 9, name: "GoAirSpecial" },
//   { id: 10, name: "ITSpecial" },
//   { id: 11, name: "Arzoo" },
//   { id: 12, name: "PaytronicIndia" },
//   { id: 13, name: "InstaPay" },
//   { id: 14, name: "RedBus" },
//   { id: 15, name: "Rechargemy" },
//   { id: 16, name: "MarsAPI" },
//   { id: 17, name: "EMT" },
//   { id: 18, name: "TBO" },
//   { id: 19, name: "GoAllTrip" },
//   { id: 20, name: "FixedDeparture" },
//   { id: 21, name: "IRCTC" },
//   { id: 22, name: "MoneyTransfer" },
//   { id: 23, name: "AzmyaRecharge" },
//   { id: 24, name: "MultiLink" },
//   { id: 25, name: "JustClick" },
//   { id: 26, name: "OtherFlightSupplier" },
//   { id: 27, name: "AccountVarification" },
//   { id: 28, name: "UAPI" },
//   { id: 29, name: "GMT" },
//   { id: 30, name: "GMT_LccInter" },
//   { id: 31, name: "GMT_GDS_Inter" },
//   { id: 32, name: "Default" },
//   { id: 33, name: "TripJack" },
//   { id: 34, name: "AirIndia_UAPI" },
//   { id: 35, name: "Vistara_UAPI" },
//   { id: 36, name: "Indigo_UAPI" },
//   { id: 37, name: "AirAsia" },
//   { id: 38, name: "XMLHUB" },
//   { id: 39, name: "NDC" },
//   { id: 40, name: "FlyBig" },
//   { id: 41, name: "AkasaAir" },
//   { id: 42, name: "AlliceAir" },
//   { id: 43, name: "Fly24API" }
// ];
//   // ... (engineTypes array and fetchMarkupData remains same as your code)

//   return (
//     <div>
//       <Sidebar />
//       <div className="container mt-4">
//         <div className="bg-white border p-4 shadow-sm">
//           <h4>Markup</h4>
//           <hr />

//           <div className="row mb-3">
//             <div className="col-md-3">
//               <label className="fw-bold">Process Type<span className="text-danger">*</span></label>
//               <select className="form-control">
//                 <option>--Select--</option>
//                 <option value="0">B2C</option>
//                 <option value="1">B2B</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <label className="fw-bold">Service Type<span className="text-danger">*</span></label>
//               <select className="form-control">
//                 <option>--Select--</option>
//                 <option value="1">Flight</option>
//                 <option value="5">Bus</option>
//                 <option value="2">Hotel</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <label className="fw-bold">Engine Type<span className="text-danger">*</span></label>
//               <select className="form-control">
//                 <option value="">--Select--</option>
//                 {engineTypes.map((item) => (
//                   <option key={item.id} value={item.id}>{item.name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-4">
//               <label className="fw-bold">Enter Code</label>
//               <input type="text" className="form-control" placeholder="Enter Code" />
//             </div>
//             <div className="col-md-4">
//               <label className="fw-bold">Status</label>
//               <select className="form-control">
//                 <option value="">--Select Status--</option>
//                 <option value="1">Active</option>
//                 <option value="0">Inactive</option>
//               </select>
//             </div>
//           </div>

//           <div className="row mb-3">
//             <div className="col-md-3">
//               <label className="fw-bold">IsDomestic<span className="text-danger">*</span></label>
//               <select className="form-control">
//                 <option value="true">Domestic</option>
//                 <option value="false">International</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <label className="fw-bold">Status Type<span className="text-danger">*</span></label>
//               <select className="form-control">
//                 <option>--Select--</option>
//                 <option value="0">Fixed</option>
//                 <option value="1">Percentage</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <label className="fw-bold">Value<span className="text-danger">*</span></label>
//               <input type="number" className="form-control" placeholder="Value" onChange={(e) => setValue(e.target.value)} />
//             </div>
//           </div>

//           <button type="button" className="btn btn-primary px-4">
//             Submit
//           </button>

//           <hr className="my-4" />

//           {/* Table Section */}
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-light">
//                 <tr>
//                   <th>Process Type</th>
//                   <th>Service Type</th>
//                   <th>Engine Type</th>
//                   <th>Is Domestic</th>
//                   <th>Markup Value</th>
//                   <th>Markup Type</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>B2C</td>
//                   <td>Flight</td>
//                   <td>Test Engine</td>
//                   <td>Domestic</td>
//                   <td>{value || "5"}</td>
//                   <td>Percentage</td>
//                   <td>
//                     <button className="btn btn-danger btn-sm">Delete</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </div>
//   );
// };

// export default Markups;



// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";

// const Markups = () => {
//   const [markupList, setMarkupList] = useState([]); // Table ke liye data
//   const [formData, setFormData] = useState({
//     processType: "1", // 1 for B2B, 0 for B2C
//     serviceType: "1",
//     engineType: "",
//     airlineCode: "",
//     isDomestic: "true",
//     statusType: "0", // 0 for Fixed, 1 for Percentage
//     value: ""
//   });

//   // Input change handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
// // Submit Handler
//   const handleSubmit = async () => {
//     // .env variables se values fetch karna
//     const API_URL = process.env.REACT_APP_API_BASE_URL;
//     const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
//     const AGENCY_CODE = process.env.REACT_APP_AGENCY_CODE;

//     const payload = {
//       FromDate: null,
//       ToDate: null,
//       MarkupRq: {
//         BookingType: parseInt(formData.serviceType),
//         MarkupValue: parseFloat(formData.value),
//         CalType: parseInt(formData.statusType),
//         AdminId: null,
//         AdminKey: ADMIN_KEY, // .env se
//         IsB2B: formData.processType === "1",
//         ProcessType: parseInt(formData.processType),
//         EngineType: parseInt(formData.engineType),
//         IsDomestic: formData.isDomestic === "true",
//         AccountNo: 11,
//         AgencyCode: AGENCY_CODE, // .env se
//         Status: "1",
//         Code: formData.airlineCode
//       },
//       APIRequestType: 17,
//       AgencyKey: null,
//       AccountNo: 0
//     };

//     try {
//       const response = await fetch(API_URL, { // .env se API URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await response.json();
      
//       if (result) {
//         // API success hone par local state update karein
//         setMarkupList([...markupList, { ...formData, id: Date.now() }]);
//         alert("Markup Added Successfully!");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       alert("Error adding markup!");
//     }
//   };

//   const deleteMarkup = (id) => {
//     setMarkupList(markupList.filter((item) => item.id !== id));
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>Markup </h2>
          
//           <div style={styles.box}>
//             <div style={styles.row}>
//               <div style={styles.smallField}>
//                 <label>Process Type</label>
//                 <select name="processType" style={styles.input} onChange={handleChange}>
//                   <option value="1">B2B</option>
//                   <option value="0">B2C</option>
//                 </select>
//               </div>
//               <div style={styles.smallField}>
//                 <label>Service Type</label>
//                 <select name="serviceType" style={styles.input} onChange={handleChange}>
//                   <option value="1">Flight</option>
//                   <option value="2">Hotel</option>
//                   <option value="5">Bus</option>
//                 </select>
//               </div>
//               <div style={styles.smallField}>
//                 <label>Engine Type</label>
//                 <select name="engineType" style={styles.input} onChange={handleChange}>
//                   <option value="">Select Engine</option>
//                   <option value="13">InstaPay</option>
//                   <option value="33">TripJack</option>
//                 </select>
//               </div>
//             </div>

//             <div style={{...styles.row, marginTop: "20px"}}>
//               <div style={styles.smallField}>
//                 <label>Airline Code</label>
//                 <input name="airlineCode" type="text" style={styles.input} onChange={handleChange} />
//               </div>
//               <div style={styles.smallField}>
//                 <label>Value</label>
//                 <input name="value" type="number" style={styles.input} onChange={handleChange} />
//               </div>
//             </div>

//             <button style={styles.btn} onClick={handleSubmit}>Submit</button>
//           </div>

//           {/* Table Section */}
//           <div style={styles.box}>
//             <table style={{width: "100%", textAlign: "left"}}>
//               <thead>
//                 <tr>
//                   <th>Process</th><th>Service</th><th>Value</th><th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {markupList.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.processType === "1" ? "B2B" : "B2C"}</td>
//                     <td>{item.serviceType}</td>
//                     <td>{item.value}</td>
//                     <td><button onClick={() => deleteMarkup(item.id)} style={{color: 'red'}}>Delete</button></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </div>
//   );
// };

// // Styles yahan purane wale use kar sakte hain
// const styles = {  page: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "30px",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "1000px",
//   },
//   heading: {
//     fontSize: "36px",
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   box: {
//     marginTop: "20px",
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   field: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },
//   label: {
//     fontSize: "14px",
//     fontWeight: "600",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "14px",
//   },
//   row: {
//     display: "flex",
//     gap: "20px",
//     marginTop: "10px",
//     flexWrap: "wrap",
//   },
//   smallField: {
//     flex: 1,
//     minWidth: "220px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   btn: {
//     marginTop: "25px",
//     background: "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "12px 35px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "600",
//     width: "200px",
//   }, };
// export default Markups;


// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";

// const Markups = () => {
//   const [markupList, setMarkupList] = useState([]); // Table ke liye data
//   const [formData, setFormData] = useState({
//     processType: "1", // 1 for B2B, 0 for B2C
//     serviceType: "1",
//     engineType: "",
//     airlineCode: "",
//     isDomestic: "true",
//     statusType: "0", // 0 for Fixed, 1 for Percentage
//     value: ""
//   });

//   // Input change handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
// // Submit Handler
//   const handleSubmit = async () => {
//     // .env variables se values fetch karna
//     const API_URL = process.env.REACT_APP_API_BASE_URL;
//     const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
//     const AGENCY_CODE = process.env.REACT_APP_AGENCY_CODE;

//     const payload = {
//       FromDate: null,
//       ToDate: null,
//       MarkupRq: {
//         BookingType: parseInt(formData.serviceType),
//         MarkupValue: parseFloat(formData.value),
//         CalType: parseInt(formData.statusType),
//         AdminId: null,
//         AdminKey: ADMIN_KEY, // .env se
//         IsB2B: formData.processType === "1",
//         ProcessType: parseInt(formData.processType),
//         EngineType: parseInt(formData.engineType),
//         IsDomestic: formData.isDomestic === "true",
//         AccountNo: 11,
//         AgencyCode: AGENCY_CODE, // .env se
//         Status: "1",
//         Code: formData.airlineCode
//       },
//       APIRequestType: 17,
//       AgencyKey: null,
//       AccountNo: 0
//     };

//     try {
//       const response = await fetch(API_URL, { // .env se API URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await response.json();
//       
//       if (result) {
//         // API success hone par local state update karein
//         setMarkupList([...markupList, { ...formData, id: Date.now() }]);
//         alert("Markup Added Successfully!");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       alert("Error adding markup!");
//     }
//   };

//   const deleteMarkup = (id) => {
//     setMarkupList(markupList.filter((item) => item.id !== id));
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h2 style={styles.heading}>Markup </h2>
//           
//           <div style={styles.box}>
//             <div style={styles.row}>
//               <div style={styles.smallField}>
//                 <label>Process Type</label>
//                 <select name="processType" style={styles.input} onChange={handleChange}>
//                   <option value="1">B2B</option>
//                   <option value="0">B2C</option>
//                 </select>
//               </div>
//               <div style={styles.smallField}>
//                 <label>Service Type</label>
//                 <select name="serviceType" style={styles.input} onChange={handleChange}>
//                   <option value="1">Flight</option>
//                   <option value="2">Hotel</option>
//                   <option value="5">Bus</option>
//                 </select>
//               </div>
//               <div style={styles.smallField}>
//                 <label>Engine Type</label>
//                 <select name="engineType" style={styles.input} onChange={handleChange}>
//                   <option value="">Select Engine</option>
//                   <option value="13">InstaPay</option>
//                   <option value="33">TripJack</option>
//                 </select>
//               </div>
//             </div>

//             <div style={{...styles.row, marginTop: "20px"}}>
//               <div style={styles.smallField}>
//                 <label>Airline Code</label>
//                 <input name="airlineCode" type="text" style={styles.input} onChange={handleChange} />
//               </div>
//               <div style={styles.smallField}>
//                 <label>Value</label>
//                 <input name="value" type="number" style={styles.input} onChange={handleChange} />
//               </div>
//             </div>

//             <button style={styles.btn} onClick={handleSubmit}>Submit</button>
//           </div>

//           {/* Table Section */}
//           <div style={styles.box}>
//             <table style={{width: "100%", textAlign: "left"}}>
//               <thead>
//                 <tr>
//                   <th>Process</th><th>Service</th><th>Value</th><th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {markupList.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.processType === "1" ? "B2B" : "B2C"}</td>
//                     <td>{item.serviceType}</td>
//                     <td>{item.value}</td>
//                     <td><button onClick={() => deleteMarkup(item.id)} style={{color: 'red'}}>Delete</button></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </div>
//   );
// };

// // Styles yahan purane wale use kar sakte hain
// const styles = {  page: {
//     display: "flex",
//     justifyContent: "center",
//     padding: "30px",
//   },
//   container: {
//     width: "100%",
//     maxWidth: "1000px",
//   },
//   heading: {
//     fontSize: "36px",
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   box: {
//     marginTop: "20px",
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   field: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },
//   label: {
//     fontSize: "14px",
//     fontWeight: "600",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "14px",
//   },
//   row: {
//     display: "flex",
//     gap: "20px",
//     marginTop: "10px",
//     flexWrap: "wrap",
//   },
//   smallField: {
//     flex: 1,
//     minWidth: "220px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   btn: {
//     marginTop: "25px",
//     background: "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "12px 35px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "600",
//     width: "200px",
//   }, };
// export default Markups;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";

// Engine Type options array
const engineOptions = [
  { id: 1, name: "Amadeus" }, { id: 2, name: "Galileo" }, { id: 3, name: "SpiceJet" },
  { id: 4, name: "GoIndigo" }, { id: 5, name: "GoAir" }, { id: 6, name: "GoAirAPI" },
  { id: 7, name: "SpicetJetSpecial" }, { id: 8, name: "GoIndigoSpecial" }, { id: 9, name: "GoAirSpecial" },
  { id: 10, name: "ITSpecial" }, { id: 11, name: "Arzoo" }, { id: 12, name: "PaytronicIndia" },
  { id: 13, name: "InstaPay" }, { id: 14, name: "RedBus" }, { id: 15, name: "Rechargemy" },
  { id: 16, name: "MarsAPI" }, { id: 17, name: "EMT" }, { id: 18, name: "TBO" },
  { id: 19, name: "GoAllTrip" }, { id: 20, name: "FixedDeparture" }, { id: 21, name: "IRCTC" },
  { id: 22, name: "MoneyTransfer" }, { id: 23, name: "AzmyaRecharge" }, { id: 24, name: "MultiLink" },
  { id: 25, name: "JustClick" }, { id: 26, name: "OtherFlightSupplier" }, { id: 27, name: "AccountVarification" },
  { id: 28, name: "UAPI" }, { id: 29, name: "GMT" }, { id: 30, name: "GMT_LccInter" },
  { id: 31, name: "GMT_GDS_Inter" }, { id: 32, name: "Default" }, { id: 33, name: "TripJack" },
  { id: 34, name: "AirIndia_UAPI" }, { id: 35, name: "Vistara_UAPI" }, { id: 36, name: "Indigo_UAPI" },
  { id: 37, name: "AirAsia" }, { id: 38, name: "XMLHUB" }, { id: 39, name: "NDC" },
  { id: 40, name: "FlyBig" }, { id: 41, name: "AkasaAir" }, { id: 42, name: "AlliceAir" },
  { id: 43, name: "Fly24API" }
];

const Markups = () => {
  const [markupList, setMarkupList] = useState([]);
  const [formData, setFormData] = useState({
    processType: "1",
    serviceType: "Flight", // Default value
    engineType: "",
    airlineCode: "",
    isDomestic: "true",
    statusType: "0",
    value: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      FromDate: null,
      ToDate: null,
      MarkupRq: {
        BookingType: formData.serviceType === "Flight" ? 1 : formData.serviceType === "Hotel" ? 2 : 5,
        MarkupValue: parseFloat(formData.value),
        CalType: parseInt(formData.statusType),
        AdminId: null,
        AdminKey: process.env.REACT_APP_ADMIN_KEY,
        IsB2B: formData.processType === "1",
        ProcessType: parseInt(formData.processType),
        EngineType: parseInt(formData.engineType),
        IsDomestic: formData.isDomestic === "true",
        AccountNo: 11,
        AgencyCode: process.env.REACT_APP_AGENCY_CODE,
        Status: "1",
        Code: formData.airlineCode
      },
      APIRequestType: 17,
      AgencyKey: null,
      AccountNo: 0
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      
      if (result) {
        setMarkupList([...markupList, { ...formData, id: Date.now() }]);
        alert("Markup Added Successfully!");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error adding markup!");
    }
  };

  const deleteMarkup = (id) => {
    setMarkupList(markupList.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Sidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Markup </h2>
          
          <div style={styles.box}>
            <div style={styles.row}>
              <div style={styles.smallField}>
                <label>Process Type</label>
                <select name="processType" style={styles.input} onChange={handleChange}>
                  <option value="1">B2B</option>
                  <option value="0">B2C</option>
                </select>
              </div>
              <div style={styles.smallField}>
                <label>Service Type</label>
                <select name="serviceType" style={styles.input} onChange={handleChange}>
                  <option value="Flight">Flight</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
              <div style={styles.smallField}>
                <label>Engine Type</label>
                <select name="engineType" style={styles.input} onChange={handleChange}>
                  <option value="">Select Engine</option>
                  {engineOptions.map((eng) => (
                    <option key={eng.id} value={eng.id}>{eng.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{...styles.row, marginTop: "20px"}}>
              <div style={styles.smallField}>
                <label>Airline Code</label>
                <input name="airlineCode" type="text" style={styles.input} onChange={handleChange} />
              </div>
              <div style={styles.smallField}>
                <label>Value </label>
                <input 
                    name="value" 
                    type="number" 
                    min="1" 
                    max="10" 
                    style={styles.input} 
                    onChange={handleChange} 
                />
              </div>
            </div>

            <button style={styles.btn} onClick={handleSubmit}>Submit</button>
          </div>

          <div style={styles.box}>
            <table style={{width: "100%", textAlign: "left"}}>
              <thead>
                <tr>
                  <th>Process</th><th>Service</th><th>Engine</th><th>Value</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {markupList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.processType === "1" ? "B2B" : "B2C"}</td>
                    <td>{item.serviceType}</td>
                    <td>{engineOptions.find(e => e.id == item.engineType)?.name || "N/A"}</td>
                    <td>{item.value}</td>
                    <td><button onClick={() => deleteMarkup(item.id)} style={{color: 'red'}}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

const styles = { 
  page: { display: "flex", justifyContent: "center", padding: "30px", backgroundColor: "#f8f9fa" },
  container: { width: "100%", maxWidth: "1000px" },
  heading: { fontSize: "32px", textAlign: "center", marginBottom: "20px" },
  box: { marginTop: "20px", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  input: { width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "5px" },
  row: { display: "flex", gap: "20px", flexWrap: "wrap" },
  smallField: { flex: 1, minWidth: "220px", display: "flex", flexDirection: "column" },
  btn: { marginTop: "25px", background: "#0d6efd", color: "#fff", border: "none", padding: "12px 35px", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }
};

export default Markups;