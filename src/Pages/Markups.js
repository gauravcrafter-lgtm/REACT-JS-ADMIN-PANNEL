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
// export default Markups;import React, { useMemo, useState } from "react";

import React, { Component, useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
const AGENCY_CODE = process.env.REACT_APP_AGENCY_CODE;

const DELETE_API_URL = process.env.REACT_APP_API_DELETE_URL;

// -----------------------------------------------------------------------------

const DELETE_API_ENABLED = false;

const ENGINE_OPTIONS = [
  { id: 51, name: "kafila" },
  { id: 33, name: "TripJack" },
  { id: 49, name: "FlyShop" },
  { id: 50, name: "airiq" },
];

const PAGE_SIZE = 10;
const LOCAL_STORAGE_KEY = "markups:local-cache:v1";
const MAX_RETRIES = 2;

const INITIAL_FORM = {
  processType: "1",
  serviceType: "1",
  engineType: "",
  airlineCode: "",
  isDomestic: "true",
  statusType: "0",
  value: "",
};

function engineName(id) {
  return ENGINE_OPTIONS.find((e) => String(e.id) === String(id))?.name ?? "Unknown";
}

// -----------------------------------------------------------------------------
// Local persistence (interim substitute for a real list endpoint)
// -----------------------------------------------------------------------------
function loadLocalMarkups() {
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalMarkups(list) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch {
    
  }
}

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


async function postWithRetry(payload, { signal, attempt = 0, url = API_BASE_URL } = {}) {
  if (!url) {
    throw new ApiError(
      "API URL is not set. Check your .env file and restart the dev server.",
      0,
      null
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  if (signal) signal.addEventListener("abort", () => controller.abort());

  try {
    console.log("[Markups] Request →", url, payload);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let data = null;
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    }

    console.log("[Markups] Response ←", url, "status:", response.status, "data:", data);

    if (!response.ok) {
      throw new ApiError(
        data?.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);

    console.error("[Markups] Request failed →", url, err);

    const isAbort = err.name === "AbortError";
    const isNetworkError = !isAbort && !(err instanceof ApiError);
    const shouldRetry = (isAbort || isNetworkError) && attempt < MAX_RETRIES;

    if (shouldRetry) {
      await sleep(500 * 2 ** attempt); // 500ms, then 1000ms
      return postWithRetry(payload, { signal, attempt: attempt + 1, url });
    }

    if (isAbort) {
      throw new ApiError("Request timed out. Please check your connection and try again.", 0, null);
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError(err.message || "Network error. Please check your connection.", 0, null);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function createMarkup(formData, opts = {}) {
  const payload = {
    MarkupRq: {
      BookingType: parseInt(formData.serviceType, 10),
      MarkupValue: parseFloat(formData.value),
      CalType: parseInt(formData.statusType, 10),
      AdminKey: ADMIN_KEY,
      IsB2B: formData.processType === "1",
      ProcessType: parseInt(formData.processType, 10),
      EngineType: parseInt(formData.engineType, 10),
      IsDomestic: formData.isDomestic === "true",
      AgencyCode: AGENCY_CODE,
      Status: "1",
      Code: formData.airlineCode.trim().toUpperCase(),
    },
  };
  return postWithRetry(payload, opts);
}

async function deleteMarkupApi(item, opts = {}) {
  const payload = {
    MarkupRq: {
      AdminKey: ADMIN_KEY,
      AgencyCode: AGENCY_CODE,
      Id: item.id, // TODO: confirm the real field name (Id / MarkupId / Code, etc.)
    },
  };
  return postWithRetry(payload, { ...opts, url: DELETE_API_URL }); // 👈 uses the separate delete URL
}

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------
function validate(formData) {
  const errors = {};

  if (!formData.engineType) {
    errors.engineType = "Please select an engine.";
  }

  const code = formData.airlineCode.trim();
  if (!code) {
    errors.airlineCode = "Airline code is required.";
  } else if (!/^[A-Za-z0-9]{1,6}$/.test(code)) {
    errors.airlineCode = "Use 1-6 letters/numbers only.";
  }

  if (formData.value === "" || formData.value === null) {
    errors.value = "Value is required.";
  } else {
    const num = Number(formData.value);
    if (Number.isNaN(num)) {
      errors.value = "Value must be a number.";
    } else if (num < 0) {
      errors.value = "Value cannot be negative.";
    } else if (formData.statusType === "1" && num > 100) {
      errors.value = "Percentage cannot exceed 100.";
    }
  }

  return errors;
}

// -----------------------------------------------------------------------------
// Error boundary
// -----------------------------------------------------------------------------
class MarkupsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Markups crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.page}>
          <div style={styles.container}>
            <div style={{ ...styles.banner, ...styles.bannerError }}>
              Something went wrong loading this page.{" "}
              <button type="button" style={styles.secondaryBtn} onClick={this.handleReset}>
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ConfigWarning() {
  const missing = [];
  if (!API_BASE_URL) missing.push("REACT_APP_API_BASE_URL");
  if (!ADMIN_KEY) missing.push("REACT_APP_ADMIN_KEY");
  if (!AGENCY_CODE) missing.push("REACT_APP_AGENCY_CODE");
  if (DELETE_API_ENABLED && !DELETE_API_URL) missing.push("REACT_APP_API_DELETE_URL");
  if (missing.length === 0) return null;

  return (
    <div style={{ ...styles.banner, ...styles.bannerError }} role="alert">
      Missing environment variable(s): {missing.join(", ")}. Add them to your
      .env file and restart the dev server.
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const MarkupsInner = () => {
  const [markupList, setMarkupList] = useState(() => loadLocalMarkups());
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    saveLocalMarkups(markupList);
  }, [markupList]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    setSubmitSuccess("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await createMarkup(formData);
      console.log("[Markups] Add markup succeeded:", result);
      setSubmitSuccess("Markup added successfully.");
      setMarkupList((prev) => [
        ...prev,
        { ...formData, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
      ]);
      setFormData(INITIAL_FORM);
    } catch (err) {
      console.error("[Markups] Add markup failed:", err);
      setSubmitError(
        err instanceof ApiError ? err.message : "Could not add the markup. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  
  const handleDelete = async (item) => {
    const confirmed = window.confirm("Delete this markup? This cannot be undone.");
    if (!confirmed) return;

    setDeleteError("");

    if (!DELETE_API_ENABLED) {
      setMarkupList((prev) => prev.filter((m) => m.id !== item.id));
      return;
    }

    setDeletingId(item.id);
    try {
      const result = await deleteMarkupApi(item);
      console.log("[Markups] Delete markup succeeded:", result);
      setMarkupList((prev) => prev.filter((m) => m.id !== item.id));
    } catch (err) {
      console.error("[Markups] Delete markup failed:", err);
      setDeleteError(
        err instanceof ApiError ? err.message : "Could not delete the markup. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredList = useMemo(() => {
    if (!search.trim()) return markupList;
    const q = search.trim().toLowerCase();
    return markupList.filter((item) =>
      [item.airlineCode, engineName(item.engineType)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [markupList, search]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedList = filteredList.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div>
      <Sidebar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Markup</h2>

          <ConfigWarning />

          <form style={styles.box} onSubmit={handleSubmit} noValidate>
            {submitError && (
              <div style={{ ...styles.banner, ...styles.bannerError }} role="alert" aria-live="assertive">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div style={{ ...styles.banner, ...styles.bannerSuccess }} role="status" aria-live="polite">
                {submitSuccess}
              </div>
            )}

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="processType">Process Type*</label>
                <select id="processType" name="processType" style={styles.select} value={formData.processType} onChange={handleChange}>
                  <option value="1">B2B</option>
                  <option value="0">B2C</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="serviceType">Service Type*</label>
                <select id="serviceType" name="serviceType" style={styles.select} value={formData.serviceType} onChange={handleChange}>
                  <option value="1">Flight</option>
                  <option value="2">Hotel</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="engineType">Engine Type*</label>
                <select
                  id="engineType"
                  name="engineType"
                  style={{ ...styles.select, ...(fieldErrors.engineType ? styles.inputError : {}) }}
                  value={formData.engineType}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.engineType)}
                >
                  <option value="">Select Engine</option>
                  {ENGINE_OPTIONS.map((eng) => (
                    <option key={eng.id} value={eng.id}>{eng.name}</option>
                  ))}
                </select>
                {fieldErrors.engineType && <span style={styles.errorText}>{fieldErrors.engineType}</span>}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="airlineCode">Airline Code*</label>
              <input
                id="airlineCode"
                name="airlineCode"
                style={{ ...styles.input, ...(fieldErrors.airlineCode ? styles.inputError : {}) }}
                value={formData.airlineCode}
                onChange={handleChange}
                placeholder="e.g. AI"
                maxLength={6}
                aria-invalid={Boolean(fieldErrors.airlineCode)}
              />
              {fieldErrors.airlineCode && <span style={styles.errorText}>{fieldErrors.airlineCode}</span>}
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="isDomestic">IsDomestic*</label>
                <select id="isDomestic" name="isDomestic" style={styles.select} value={formData.isDomestic} onChange={handleChange}>
                  <option value="true">Domestic</option>
                  <option value="false">International</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="statusType">Status*</label>
                <select id="statusType" name="statusType" style={styles.select} value={formData.statusType} onChange={handleChange}>
                  <option value="0">Fixed</option>
                  <option value="1">Percentage</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="value">Value*</label>
                <input
                  id="value"
                  name="value"
                  type="number"
                  step="0.01"
                  min="0"
                  style={{ ...styles.input, ...(fieldErrors.value ? styles.inputError : {}) }}
                  value={formData.value}
                  onChange={handleChange}
                  aria-invalid={Boolean(fieldErrors.value)}
                />
                {fieldErrors.value && <span style={styles.errorText}>{fieldErrors.value}</span>}
              </div>
            </div>

            <div style={styles.formFooter}>
              <button type="submit" style={{ ...styles.submitBtn, ...(submitting ? styles.btnDisabled : {}) }} disabled={submitting}>
                {submitting ? "Adding\u2026" : "Submit"}
              </button>
            </div>
          </form>

          <div style={styles.listBox}>
            <div style={styles.boxHeaderCenter}>
              <h3 style={{ margin: "0 0 10px" }}>Markup List</h3>
              {/* <input
                type="search"
                style={styles.searchInput}
                placeholder="Search by code or engine"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                aria-label="Search markups"
              /> */}
            </div>

            {deleteError && (
              <div style={{ ...styles.banner, ...styles.bannerError }} role="alert">
                {deleteError}
              </div>
            )}

            {pagedList.length === 0 ? (
              <div style={styles.emptyState}>
                {search ? "No markups match your search." : "No markups yet. Add one using the form above."}
              </div>
            ) : (
              <>
                <div style={styles.tableWrapCenter}>
                  <table style={styles.table}>
                    <thead style={styles.thead}>
                      <tr>
                        <th style={styles.th}>Process Type</th>
                        <th style={styles.th}>Service Type</th>
                        <th style={styles.th}>Is Domestic</th>
                        <th style={styles.th}>Markup Value</th>
                        <th style={styles.th}>Markup Type</th>
                        <th style={styles.th}>API Engine</th>
                        <th style={styles.th}>Airline Code</th>
                        <th style={styles.th}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedList.map((item) => (
                        <tr key={item.id} style={styles.tr}>
                          <td style={styles.td}>{item.processType === "1" ? "B2B" : "B2C"}</td>
                          <td style={styles.td}>{item.serviceType === "1" ? "Flight" : "Hotel"}</td>
                          <td style={styles.td}>{item.isDomestic === "true" || item.isDomestic === true ? "Domestic" : "International"}</td>
                          <td style={styles.td}>{item.value}</td>
                          <td style={styles.td}>{item.statusType === "0" ? "Fixed" : "Percentage"}</td>
                          <td style={styles.td}>{engineName(item.engineType)}</td>
                          <td style={styles.td}>{item.airlineCode}</td>
                          <td style={styles.td}>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              style={{ ...styles.delBtn, ...(deletingId === item.id ? styles.btnDisabled : {}) }}
                              disabled={deletingId === item.id}
                            >
                              {deletingId === item.id ? "Deleting\u2026" : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div style={styles.paginationCenter}>
                    <button
                      type="button"
                      style={{ ...styles.pageBtn, ...(safePage === 1 ? styles.btnDisabled : {}) }}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                    >
                      Prev
                    </button>
                    <span>Page {safePage} of {totalPages}</span>
                    <button
                      type="button"
                      style={{ ...styles.pageBtn, ...(safePage === totalPages ? styles.btnDisabled : {}) }}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
};

const Markups = () => (
  <MarkupsErrorBoundary>
    <MarkupsInner />
  </MarkupsErrorBoundary>
);

const styles = {
  page: { padding: "24px", backgroundColor: "#f8f9fa", minHeight: "100vh" },
  container: { maxWidth: "1100px", margin: "0 auto" },
  heading: { marginBottom: "20px", fontSize: "22px", fontWeight: 600, color: "#1f2328" },
  box: { background: "#fff", padding: "20px", marginBottom: "20px", border: "1px solid #dee2e6", borderRadius: "6px" },
  // 👉 Markup List section — center of the page, thoda narrower aur khud center mein
  listBox: {
    background: "#fff",
    padding: "24px",
    marginTop: "10px",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1000px",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" },
  boxHeaderCenter: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px", textAlign: "center" },
  row: { display: "flex", gap: "20px", flexWrap: "wrap" },
  field: { flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", marginBottom: "15px" },
  label: { fontSize: "13px", fontWeight: 600, color: "#495057", marginBottom: "6px" },
  input: { padding: "9px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", background: "#fff" },
  select: { padding: "9px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", background: "#fff" },
  inputError: { borderColor: "#dc3545" },
  errorText: { color: "#dc3545", fontSize: "12px", marginTop: "4px" },
  formFooter: { display: "flex", alignItems: "center", gap: "16px", marginTop: "10px" },
  submitBtn: { padding: "10px 25px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: 600 },
  secondaryBtn: { padding: "6px 12px", background: "#fff", color: "#0d6efd", border: "1px solid #0d6efd", borderRadius: "4px", cursor: "pointer", fontSize: "12px", marginLeft: "8px" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  banner: { padding: "10px 14px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px" },
  bannerError: { background: "#f8d7da", color: "#842029", border: "1px solid #f5c2c7" },
  bannerSuccess: { background: "#d1e7dd", color: "#0f5132", border: "1px solid #badbcc" },
  searchInput: { padding: "8px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "13px", width: "220px" },
  tableWrap: { overflowX: "auto" },
  tableWrapCenter: { overflowX: "auto", width: "100%", display: "flex", justifyContent: "center" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  thead: { background: "#343a40", color: "#fff" },
  th: { padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid #eee" },
  td: { padding: "10px 12px", borderBottom: "1px solid #eee" },
  delBtn: { background: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  emptyState: { textAlign: "center", padding: "40px 20px", color: "#6c757d", fontSize: "14px" },
  pagination: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", marginTop: "14px", fontSize: "13px" },
  paginationCenter: { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "14px", fontSize: "13px" },
  pageBtn: { padding: "5px 10px", border: "1px solid #ccc", background: "#fff", borderRadius: "4px", cursor: "pointer" },
};

export default Markups;