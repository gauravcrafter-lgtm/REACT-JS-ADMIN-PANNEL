// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Dashboard from './Dashboard';
// import Footer2 from './Footer2';



// function Ticketsss() {


//   const [data, setData] = useState(null);
//   const { id } = useParams();
//   const fare = data?.Contracts?.[0]?.AirlineFare;

//   const API_URL = process.env.REACT_APP_API_TICKETSSS;
//   const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
//     const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;


//   useEffect(() => {

//     if (!API_URL) {
//       console.error("API_URL missing in .env");
//       return;
//     }

//     fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//       "APIToken":"",
// "AgencyKey":"02ad68f3-9ae6-4148-85b1-e61d1f03991f",
// "AccountNo":"11",
// "BookingId":id,
// "AirlinePnr":null,
// "IsFly":false,
// "IsB2B":true,
// "IsCreditNote":false,
// "IsTC":true

//       })
//     })
//       .then(async (res) => {
//         console.log("STATUS:", res.status);

//         const data = await res.json();

//         console.log("RESPONSE:", data);
//         setData(data);
//       })
//       .catch(err => {
//         console.error("API Error:", err);
//       });

//   }, [id, API_URL, AGENCY_KEY]);

//   if (!data) return <h2>Loading...</h2>;

//   return (
//    <div>
//     <Sidebar/>
//   <table
//     style={{
//       border: "1px solid #d1d1d1",
//       fontFamily: "Tahoma, Geneva, sans-serif",
//       borderRadius: 4,
//       margin: "0 auto 10px",
//       background: "#fff",
//       overflow: "hidden",
//       width: "100%",
//       maxWidth: 1100
//     }}
//   >
//     <tbody>
//       <tr>
//         <td>
//           <table
//             width="100%"
//             border={0}
//             cellPadding={0}
//             cellSpacing={0}
//             style={{ margin: "0 auto", background: "#fff", borderRadius: 13 }}
//           >
//             <tbody>
//               <tr>
//                 <td>
//                   <table
//                     width="95%"
//                     border={0}
//                     cellPadding={0}
//                     cellSpacing={0}
//                     style={{
//                       margin: "0 auto",
//                       backgroundColor: "#fff",
//                       marginTop: "2%"
//                     }}
//                   >
//                     <tbody>
//                       <tr>
//                         <td width="20%">
//                           <img
//                             src="https://www.tripcaliber.com/Content/Images/logo.png"
//                             alt="logo"
//                             width={160}
//                           />
//                         </td>
//                         <td width={428}>
//                           <table
//                             width="100%"
//                             border={0}
//                             cellPadding={0}
//                             cellSpacing={0}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td width="90%" align="right">
//                                   <strong style={{ fontSize: 18, margin: 0 }}>
                                         

//                                </strong>
//                                   <p
//                                     style={{
//                                       fontSize: 11,
//                                       color: "#333333",
//                                       width: 300,
//                                       margin: "5px 0"
//                                     }}
//                                   >
//                                     <strong>Address:</strong>
//                                     <span>
//                                       FF-55, GALLERIA TOWER, RIVER HEIGHTS RD,
//                                       RAJ NAGAR EXTN, GHAZIABAD, U.P.- 201017
//                                     </span>
//                                   </p>
//                                   <p
//                                     style={{
//                                       fontSize: 11,
//                                       color: "#333333",
//                                       width: 400,
//                                       margin: "5px 0"
//                                     }}
//                                   >
//                                     <span>
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width={12}
//                                         height={12}
//                                         viewBox="0 0 255 255"
//                                         fill="none"
//                                       >
//                                         <path
//                                           d="M227.888 247.033L228.15 246.614L254.252 193.632L178.005 136.447L142.924 162.756C129.694 161.969 117.212 156.359 107.84 146.987C98.4685 137.615 92.8581 125.133 92.071 111.903L118.38 76.822L61.1966 0.576163L8.65798 26.4609L8.21439 26.6788L7.79589 26.9412C5.57016 28.3226 3.73501 30.2506 2.46515 32.5417C1.19528 34.8329 0.532966 37.411 0.541231 40.0305L0.54123 53.7016C0.541229 80.0429 5.72953 106.126 15.8099 130.462C25.8903 154.799 40.6654 176.911 59.2915 195.537C77.9177 214.163 100.03 228.938 124.366 239.018C148.702 249.099 174.786 254.287 201.127 254.287L214.799 254.287C217.418 254.295 219.996 253.633 222.288 252.363C224.579 251.094 226.507 249.258 227.888 247.033ZM201.127 234.708C101.32 234.708 20.1203 153.508 20.1203 53.7016L20.1203 42.6394L55.2788 25.3205L93.9078 76.8257L72.402 105.501L72.402 108.764C72.4239 128.295 80.1921 147.02 94.0025 160.83C107.813 174.64 126.537 182.409 146.068 182.43L149.331 182.43L178.006 160.925L229.508 199.549L212.186 234.708L201.127 234.708Z"
//                                           fill="black"
//                                         />
//                                       </svg>
//                                     </span>
//                                     <span>+91{data?.Flightpassenger?.[0]?.ContactNo}  </span> |
//                                     <span>
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width={12}
//                                         height={12}
//                                         viewBox="0 0 254 203"
//                                         fill="none"
//                                       >
//                                         <path
//                                           d="M0 0V202.969H253.711V0H0ZM116.707 121.358C119.64 123.541 123.199 124.719 126.855 124.719C130.512 124.719 134.07 123.541 137.004 121.358L149.408 112.056L236.797 177.598V186.055H16.9141V177.598L104.303 112.056L116.707 121.358ZM126.855 107.827L16.9141 25.3711V16.9141H236.797V25.3711L126.855 107.827ZM16.9141 46.5136L90.2085 101.484L16.9141 156.455V46.5136ZM236.797 156.455L163.502 101.484L236.797 46.5136V156.455Z"
//                                           fill="black"
//                                         />
//                                       </svg>
//                                     </span>
//                                     <span>{data?.Flightpassenger?.[0]?.Email}</span>
//                                   </p>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={2}>
//                           <hr />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style={{ fontSize: 11, color: "#333333" }}>
//                           <strong>Your e-Ticket</strong>
//                         </td>
//                         <td
//                           align="right"
//                           style={{ fontSize: 11, color: "#333333" }}
//                         >
//                           <strong>Booking Date:</strong> <span>{data?.BookingDate}</span>{" "}
//                           <strong>Booking Time:</strong>
//  <span>
// {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalTime}
// </span>                        </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table
//                     width="95%"
//                     border={0}
//                     cellPadding={0}
//                     cellSpacing={0}
//                     style={{
//                       margin: "0 auto",
//                       backgroundColor: "#fff",
//                       fontSize: 12,
//                       fontFamily: "Arial, Helvetica, sans-serif",
//                       marginTop: 50
//                     }}
//                   >
//                     <tbody>
//                       <tr>
//                         <td width="50%">
//                           <table cellPadding={3}>
//                             <tbody>
//                               <tr>
//                                 <td width={120}>
//                                   <strong>Reference ID</strong>
//                                 </td>
//                                 <td><td>{data?.Tsid || "N/A"}</td></td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <strong>Ticket Status</strong>
//                                 </td>
//                                 <td>{data.BookingStatus}</td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                         <td width="50%" align="right">
//                           <img
//                             src="../images/bar-code.jpg"
//                             style={{ width: "90%" }}
//                           />
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table
//                     width="95%"
//                     border={0}
//                     cellPadding={0}
//                     cellSpacing={0}
//                     style={{
//                       margin: "0 auto",
//                       backgroundColor: "#fff",
//                       fontSize: 11,
//                       fontFamily: "tahoma"
//                     }}
//                   >
//                     <tbody>
//                       <tr>
//                         <td style={{ borderBottom: "1px dashed #ccc" }}>
//                           &nbsp;
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>&nbsp;</td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <table
//                             width="100%"
//                             border={1}
//                             cellPadding={5}
//                             cellSpacing={0}
//                             style={{ fontSize: 12, marginTop: 5 }}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td bgcolor="#bedff1">
//                                   <strong>Airline/Flight No.</strong>
//                                 </td>
//                                 <td bgcolor="#bedff1">
//                                   <strong>Departure</strong>
//                                 </td>
//                                 <td bgcolor="#bedff1">
//                                   <strong>Arrival</strong>
//                                 </td>
//                                 <td bgcolor="#bedff1">
//                                   <strong>Class</strong>
//                                 </td>
//                                 <td bgcolor="#bedff1">
//                                   <strong>Pnr</strong>
//                                 </td>
//                               </tr>
//                               <tr style={{ paddingBottom: "2%" }}>
//                                 <td width={150}>
//                                   <table>
//                                     <tbody>
//                                       <tr>
//                                         <td>
//                                           {/* <img
//                                             // src="../Flight/images/icon-flight/indigo.png"
//                                             width={30}
//                                             height={30}
//                                           /> */}
//                                         </td>
//                                         <td>
//                                               {data?.Contracts?.[0]?.AirSegments?.[0]?.AirlineName}{" "}
//   {data?.Contracts?.[0]?.AirSegments?.[0]?.AirlineCode}-
//   {data?.Contracts?.[0]?.AirSegments?.[0]?.FlightNumber}
//                                         </td>
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </td>
//                                 <td>
//                                     {data?.Contracts?.[0]?.AirSegments?.[0]?.DepartureDateTime} {" "}
//                                     <br></br>
//     {data?.Contracts?.[0]?.AirSegments?.[0]?.DepartureTime}
//                                 </td>
//                                 <td>
//                                   {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalDateTime} {" "}
//                                   <br />
//                                   {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalTime}
                                 
//                                 </td>
//                                 <td>
//                                   <span>    {data?.Contracts?.[0]?.AirSegments?.[0]?.FareClass || "N/A"}
// </span>
//                                 </td>
//                                 <td>
//                                   <span>    {data?.Contracts?.[0]?.GDSPnr || "N/A"}
// </span>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>&nbsp;</td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <table
//                             width="100%"
//                             cellSpacing={0}
//                             cellPadding={0}
//                             border={0}
//                             style={{ fontSize: 14 }}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td width="100%">
//                                   <strong
//                                     style={{ color: "#1f91cd", fontSize: 15 }}
//                                   >
//                                     Passenger - Details
//                                   </strong>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td>
//                                   <table
//                                     width="100%"
//                                     border={1}
//                                     cellPadding={5}
//                                     cellSpacing={0}
//                                     style={{ fontSize: 12, marginTop: 5 }}
//                                   >
//                                     <tbody>
//                                       <tr>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Passenger Name</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Ticket No.</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>bag[Cabin]</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>bag[CheckIn]</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Meal</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Seat</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Refundable</strong>
//                                         </td>
//                                         <td bgcolor="#bedff1">
//                                           <strong>Status</strong>
//                                         </td>
//                                       </tr>
//                                       <tr style={{ paddingBottom: "2%" }}>
//                                         <td>
//                                           {data?.Flightpassenger?.[0]?.Title}{" "}
//                                           {data?.Flightpassenger?.[0]?.FirstName}{" "}
//                                           {data?.Flightpassenger?.[0]?.LastName}
//                                         </td>
//                                         <td>
//                                           <span>    {data?.Flightpassenger?.[0]?.TicketNumber || "N/A"}
// </span>
//                                         </td>
//                                         <td>
//                                           <span>    {data?.Flightpassenger?.[0]?.BaggageCode?.split("|")?.[0] || "N/A"}
// </span>
//                                         </td>
//                                         <td>
//                                           <span>       {data?.Flightpassenger?.[0]?.BaggageCode?.split("|")?.[0] || "N/A"}

// </span>
//                                         </td>
//                                         <td>
//                                           <span>    {data?.Flightpassenger?.[0]?.MealCode || "N/A"}
// </span>
//                                         </td>
//                                         <td>
//                                           <span>    {data?.Flightpassenger?.[0]?.SeatCode || "N/A"}
// </span>
//                                         </td>
//                                         <td>
//                                           <span>    {data?.Contracts?.[0]?.Refundable ? "Yes" : "No"}
// </span>
//                                         </td>
//                                         <td>
//                                           <span>    {data?.BookingStatus === 4 ? "Confirmed" : "Pending"}
// </span>
//                                         </td>
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td style={{ height: 7 }} />
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table
//                     width="95%"
//                     border={1}
//                     cellSpacing={0}
//                     cellPadding={0}
//                     style={{ margin: "2% auto", backgroundColor: "#fff" }}
//                   >
//                     <tbody>
//                       <tr>
//                         <td width="100%" align="left" valign="top">
//                           <table
//                             width="98%"
//                             border={0}
//                             style={{
//                               fontFamily: "Tahoma, Geneva, sans-serif",
//                               fontSize: 11,
//                               padding: "1% 1%"
//                             }}
//                           >
//                             <tbody>
//                               <tr>
//                                 <td align="left" valign="middle">
//                                   <strong
//                                     style={{ fontSize: 15, color: "#1f91cd" }}
//                                   >
//                                     Fare Details
//                                   </strong>
//                                 </td>
//                                 <td>&nbsp;</td>
//                                 <td align="right" valign="middle">
//                                   <strong
//                                     style={{ fontSize: 15, color: "#1f91cd" }}
//                                   >
//                                     Amount (INR)
//                                   </strong>
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td align="left" valign="middle">
//                                   Basic Fare :
//                                 </td>
//                                 <td>&nbsp;</td>
//                                 <td align="right" valign="middle">
                                  
// ₹{fare?.BaseFare}
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td align="left" valign="middle">
//                                   Other Charges :
//                                 </td>
//                                 <td>&nbsp;</td>
//                                 <td align="right" valign="middle">
//                                     ₹{fare?.TaxFare}
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td align="left" valign="middle">
//                                   Discount :
//                                 </td>
//                                 <td>&nbsp;</td>
//                                 <td align="right" valign="middle">
//       ₹ (-){fare?.Discount}
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td colSpan={3} align="left" valign="middle">
//                                   <hr />
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td align="left" valign="middle">
//                                   <strong style={{ fontSize: 14 }}>
//                                     Total
//                                   </strong>
//                                 </td>
//                                 <td>&nbsp;</td>
//                                 <td align="right" valign="middle">
//                                   <strong style={{ fontSize: 14 }}>
//         ₹{fare?.GrossFare}
//                                   </strong>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <table
//                     width="98%"
//                     border={0}
//                     style={{
//                       marginTop: 10,
//                       margin: "2% auto",
//                       fontSize: 11,
//                       fontFamily: "Tahoma, Geneva, sans-serif",
//                       color: "#5f6061"
//                     }}
//                   >
//                     <tbody>
//                       <tr>
//                         <td
//                           align="left"
//                           style={{
//                             fontSize: 11,
//                             fontFamily: "Tahoma, Geneva, sans-serif",
//                             color: "#5f6061",
//                             paddingLeft: "2%",
//                             paddingBottom: 2
//                           }}
//                         >
//                           <strong>Terms &amp; Conditions</strong>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td align="left">
//                           <ul>
//                             <li style={{ marginBottom: 4 }}>
//                               All passengers must produce a valid photo
//                               identification proof at the time of check in.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               Guests will be subjected to a security screening
//                               prior to boarding the aircraft. This is mandatory
//                               per Indian Regulations.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               For Flights within Indian Check-in counters open 3
//                               hours prior to departure of flights and close 1
//                               hour prior to departure of flights. You may be
//                               denied boarding if you do not report in time.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               For International flights Check-in usually starts
//                               3 hours prior to departure, and Check- in counters
//                               will be closed 75 minutes before departure time
//                               for all classes of guests.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               Flight timings are subject to change without prior
//                               notice. Please recheck with the carrier prior to
//                               departure.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               For Fare Rules/ Cancellation policty-refer to fare
//                               rules laid by the carrier.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               While compliling the all above information, we
//                               have endeavored to ensure that all information is
//                               correct. However, no guarantee or representation
//                               is made to the accuracy or completenses of the
//                               information contained here. This information is
//                               cubject to changes by airlines without notice.
//                             </li>
//                             <li style={{ marginBottom: 4 }}>
//                               For bookints made under class HBO fare, each of
//                               the passenger shall be allowed to carry only
//                               one(01) piece of luggage of maximum seven(07) kg.
//                               of weight (having maximum overall dimensions
//                               of:115 cms. (L+W+H) on Boeigng aircarft and 108
//                               cms(L+W+H) on Bombardier aircarft).
//                             </li>
//                           </ul>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </tbody>
//   </table>
//   <div style={{ textAlign: "center" }}>
//     <button onclick="window.print();" className="noPrint">
//       Print
//     </button>
//   </div>
//   <style
//     dangerouslySetInnerHTML={{
//       __html:
//         "\n            .noPrint {\n                margin: 5px 0 30px 0;\n                font-size: 14px;\n                padding: 10px 30px;\n                background: #0e6fbd;\n                color: #ffffff;\n                border: 0;\n                border-radius: 2px;\n                cursor: pointer;\n            }\n\n            @media print {\n                .noPrint {\n                    display: none;\n                }\n            }\n        "
//     }}
//   />
//   <Footer2/>
// </div>




//   )
// }

// export default Ticketsss;
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from './Dashboard';
import Footer2 from './Footer2';

// 🔄 Helper function for status mapping
const getBookingStatusMessage = (status) => {
  switch (Number(status)) {
    case 0: return "Default";
    case 1: return "Booked";
    case 2: return "Cancelled";
    case 3: return "Reschedule";
    case 4: return "Pending";
    case 5: return "Fail";
    case 6: return "Cancelled Booking List";
    case 7: return "Cancel Under Process";
    case 8: return "Partial Cancel";
    case 9: return "Refund";
    case 10: return "Payment Pending";
    case 11: return "Reschedule Under Process";
    case 12: return "Rejected";
    case 13: return "InProgress";
    case 14: return "Refund Under Process";
    case 15: return "No Action";
    case 16: return "Partial Reschedule";
    case 17: return "Hold";
    case 18: return "Hold Under Process";
    case 19: return "Reject Onward";
    case 20: return "Reject Return";
    case 21: return "Ticket Pending";
    case 22: return "Ticket Released";
    default: return "Unknown Status";
  }
};

function Ticketsss() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const fare = data?.Contracts?.[0]?.AirlineFare;

  const API_URL = process.env.REACT_APP_API_TICKETSSS;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;

  useEffect(() => {
    if (!API_URL) {
      console.error("API_URL missing in .env");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "APIToken": "",
        "AgencyKey": "02ad68f3-9ae6-4148-85b1-e61d1f03991f",
        "AccountNo": "11",
        "BookingId": id,
        "AirlinePnr": null,
        "IsFly": false,
        "IsB2B": true,
        "IsCreditNote": false,
        "IsTC": true
      })
    })
      .then(async (res) => {
        console.log("STATUS:", res.status);
        const data = await res.json();
        console.log("RESPONSE:", data);
        setData(data);
      })
      .catch(err => {
        console.error("API Error:", err);
      });

  }, [id, API_URL, AGENCY_KEY]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <Sidebar />
      <table
        style={{
          border: "1px solid #d1d1d1",
          fontFamily: "Tahoma, Geneva, sans-serif",
          borderRadius: 4,
          margin: "0 auto 10px",
          background: "#fff",
          overflow: "hidden",
          width: "100%",
          maxWidth: 1100
        }}
      >
        <tbody>
          <tr>
            <td>
              <table
                width="100%"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                style={{ margin: "0 auto", background: "#fff", borderRadius: 13 }}
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="95%"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          margin: "0 auto",
                          backgroundColor: "#fff",
                          marginTop: "2%"
                        }}
                      >
                        <tbody>
                          <tr>
                            <td width="20%">
                              <img
                                src="https://www.tripcaliber.com/Content/Images/logo.png"
                                alt="logo"
                                width={160}
                              />
                            </td>
                            <td width={428}>
                              <table
                                width="100%"
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                              >
                                <tbody>
                                  <tr>
                                    <td width="90%" align="right">
                                      <strong style={{ fontSize: 18, margin: 0 }}></strong>
                                      <p
                                        style={{
                                          fontSize: 11,
                                          color: "#333333",
                                          width: 300,
                                          margin: "5px 0"
                                        }}
                                      >
                                        <strong>Address:</strong>
                                        <span>
                                          FF-55, GALLERIA TOWER, RIVER HEIGHTS RD,
                                          RAJ NAGAR EXTN, GHAZIABAD, U.P.- 201017
                                        </span>
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 11,
                                          color: "#333333",
                                          width: 400,
                                          margin: "5px 0"
                                        }}
                                      >
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={12}
                                            height={12}
                                            viewBox="0 0 255 255"
                                            fill="none"
                                          >
                                            <path
                                              d="M227.888 247.033L228.15 246.614L254.252 193.632L178.005 136.447L142.924 162.756C129.694 161.969 117.212 156.359 107.84 146.987C98.4685 137.615 92.8581 125.133 92.071 111.903L118.38 76.822L61.1966 0.576163L8.65798 26.4609L8.21439 26.6788L7.79589 26.9412C5.57016 28.3226 3.73501 30.2506 2.46515 32.5417C1.19528 34.8329 0.532966 37.411 0.541231 40.0305L0.54123 53.7016C0.541229 80.0429 5.72953 106.126 15.8099 130.462C25.8903 154.799 40.6654 176.911 59.2915 195.537C77.9177 214.163 100.03 228.938 124.366 239.018C148.702 249.099 174.786 254.287 201.127 254.287L214.799 254.287C217.418 254.295 219.996 253.633 222.288 252.363C224.579 251.094 226.507 249.258 227.888 247.033ZM201.127 234.708C101.32 234.708 20.1203 153.508 20.1203 53.7016L20.1203 42.6394L55.2788 25.3205L93.9078 76.8257L72.402 105.501L72.402 108.764C72.4239 128.295 80.1921 147.02 94.0025 160.83C107.813 174.64 126.537 182.409 146.068 182.43L149.331 182.43L178.006 160.925L229.508 199.549L212.186 234.708L201.127 234.708Z"
                                              fill="black"
                                            />
                                          </svg>
                                        </span>
                                        <span>+91{data?.Flightpassenger?.[0]?.ContactNo}  </span> |
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={12}
                                            height={12}
                                            viewBox="0 0 254 203"
                                            fill="none"
                                          >
                                            <path
                                              d="M0 0V202.969H253.711V0H0ZM116.707 121.358C119.64 123.541 123.199 124.719 126.855 124.719C130.512 124.719 134.07 123.541 137.004 121.358L149.408 112.056L236.797 177.598V186.055H16.9141V177.598L104.303 112.056L116.707 121.358ZM126.855 107.827L16.9141 25.3711V16.9141H236.797V25.3711L126.855 107.827ZM16.9141 46.5136L90.2085 101.484L16.9141 156.455V46.5136ZM236.797 156.455L163.502 101.484L236.797 46.5136V156.455Z"
                                              fill="black"
                                            />
                                          </svg>
                                        </span>
                                        <span>{data?.Flightpassenger?.[0]?.Email}</span>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <hr />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, color: "#333333" }}>
                              <strong>Your e-Ticket</strong>
                            </td>
                            <td
                              align="right"
                              style={{ fontSize: 11, color: "#333333" }}
                            >
                              <strong>Booking Date:</strong> <span>{data?.BookingDate}</span>{" "}
                              <strong>Booking Time:</strong>
                              <span>
                                {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalTime}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        width="95%"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          margin: "0 auto",
                          backgroundColor: "#fff",
                          fontSize: 12,
                          fontFamily: "Arial, Helvetica, sans-serif",
                          marginTop: 50
                        }}
                      >
                        <tbody>
                          <tr>
                            <td width="50%">
                              <table cellPadding={3}>
                                <tbody>
                                  <tr>
                                    <td width={120}>
                                      <strong>Reference ID</strong>
                                    </td>
                                    <td><td>{data?.Tsid || "N/A"}</td></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Ticket Status</strong>
                                    </td>
                                    {/* 📦 Bound Dynamic Status Map Here */}
                                    <td>{getBookingStatusMessage(data?.BookingStatus)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="50%" align="right">
                              <img
                                src="../images/bar-code.jpg"
                                style={{ width: "90%" }}
                                alt="barcode"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        width="95%"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          margin: "0 auto",
                          backgroundColor: "#fff",
                          fontSize: 11,
                          fontFamily: "tahoma"
                        }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ borderBottom: "1px dashed #ccc" }}>
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                width="100%"
                                border={1}
                                cellPadding={5}
                                cellSpacing={0}
                                style={{ fontSize: 12, marginTop: 5 }}
                              >
                                <tbody>
                                  <tr>
                                    <td bgcolor="#bedff1">
                                      <strong>Airline/Flight No.</strong>
                                    </td>
                                    <td bgcolor="#bedff1">
                                      <strong>Departure</strong>
                                    </td>
                                    <td bgcolor="#bedff1">
                                      <strong>Arrival</strong>
                                    </td>
                                    <td bgcolor="#bedff1">
                                      <strong>Class</strong>
                                    </td>
                                    <td bgcolor="#bedff1">
                                      <strong>Pnr</strong>
                                    </td>
                                  </tr>
                                  <tr style={{ paddingBottom: "2%" }}>
                                    <td width={150}>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td></td>
                                            <td>
                                              {data?.Contracts?.[0]?.AirSegments?.[0]?.AirlineName}{" "}
                                              {data?.Contracts?.[0]?.AirSegments?.[0]?.AirlineCode}-
                                              {data?.Contracts?.[0]?.AirSegments?.[0]?.FlightNumber}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                    <td>
                                      {data?.Contracts?.[0]?.AirSegments?.[0]?.DepartureDateTime} {" "}
                                      <br></br>
                                      {data?.Contracts?.[0]?.AirSegments?.[0]?.DepartureTime}
                                    </td>
                                    <td>
                                      {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalDateTime} {" "}
                                      <br />
                                      {data?.Contracts?.[0]?.AirSegments?.[0]?.ArrivalTime}
                                    </td>
                                    <td>
                                      <span>    {data?.Contracts?.[0]?.AirSegments?.[0]?.FareClass || "N/A"}</span>
                                    </td>
                                    <td>
                                      <span>    {data?.Contracts?.[0]?.GDSPnr || "N/A"}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                width="100%"
                                cellSpacing={0}
                                cellPadding={0}
                                border={0}
                                style={{ fontSize: 14 }}
                              >
                                <tbody>
                                  <tr>
                                    <td width="100%">
                                      <strong
                                        style={{ color: "#1f91cd", fontSize: 15 }}
                                      >
                                        Passenger - Details
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        width="100%"
                                        border={1}
                                        cellPadding={5}
                                        cellSpacing={0}
                                        style={{ fontSize: 12, marginTop: 5 }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td bgcolor="#bedff1">
                                              <strong>Passenger Name</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>Ticket No.</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>bag[Cabin]</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>bag[CheckIn]</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>Meal</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>Seat</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>Refundable</strong>
                                            </td>
                                            <td bgcolor="#bedff1">
                                              <strong>Status</strong>
                                            </td>
                                          </tr>
                                          <tr style={{ paddingBottom: "2%" }}>
                                            <td>
                                              {data?.Flightpassenger?.[0]?.Title}{" "}
                                              {data?.Flightpassenger?.[0]?.FirstName}{" "}
                                              {data?.Flightpassenger?.[0]?.LastName}
                                            </td>
                                            <td>
                                              <span>    {data?.Flightpassenger?.[0]?.TicketNumber || "N/A"}</span>
                                            </td>
                                            <td>
                                              <span>    {data?.Flightpassenger?.[0]?.BaggageCode?.split("|")?.[0] || "N/A"}</span>
                                            </td>
                                            <td>
                                              <span>       {data?.Flightpassenger?.[0]?.BaggageCode?.split("|")?.[0] || "N/A"}</span>
                                            </td>
                                            <td>
                                              <span>    {data?.Flightpassenger?.[0]?.MealCode || "N/A"}</span>
                                            </td>
                                            <td>
                                              <span>    {data?.Flightpassenger?.[0]?.SeatCode || "N/A"}</span>
                                            </td>
                                            <td>
                                              <span>    {data?.Contracts?.[0]?.Refundable ? "Yes" : "No"}</span>
                                            </td>
                                            <td>
                                              {/* 📦 Bound Dynamic Status Map inside Passenger Details Column too */}
                                              <span>{getBookingStatusMessage(data?.BookingStatus)}</span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ height: 7 }} />
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        width="95%"
                        border={1}
                        cellSpacing={0}
                        cellPadding={0}
                        style={{ margin: "2% auto", backgroundColor: "#fff" }}
                      >
                        <tbody>
                          <tr>
                            <td width="100%" align="left" valign="top">
                              <table
                                width="98%"
                                border={0}
                                style={{
                                  fontFamily: "Tahoma, Geneva, sans-serif",
                                  fontSize: 11,
                                  padding: "1% 1%"
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" valign="middle">
                                      <strong
                                        style={{ fontSize: 15, color: "#1f91cd" }}
                                      >
                                        Fare Details
                                      </strong>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      <strong
                                        style={{ fontSize: 15, color: "#1f91cd" }}
                                      >
                                        Amount (INR)
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Basic Fare :
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      ₹{fare?.BaseFare}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Other Charges :
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      ₹{fare?.TaxFare}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Discount :
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      ₹ (-){fare?.Discount}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} align="left" valign="middle">
                                      <hr />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      <strong style={{ fontSize: 14 }}>
                                        Total
                                      </strong>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      <strong style={{ fontSize: 14 }}>
                                        ₹{fare?.GrossFare}
                                      </strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        width="98%"
                        border={0}
                        style={{
                          marginTop: 10,
                          margin: "2% auto",
                          fontSize: 11,
                          fontFamily: "Tahoma, Geneva, sans-serif",
                          color: "#5f6061"
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              style={{
                                fontSize: 11,
                                fontFamily: "Tahoma, Geneva, sans-serif",
                                color: "#5f6061",
                                paddingLeft: "2%",
                                paddingBottom: 2
                              }}
                            >
                              <strong>Terms &amp; Conditions</strong>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <ul>
                                <li style={{ marginBottom: 4 }}>
                                  All passengers must produce a valid photo
                                  identification proof at the time of check in.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  Guests will be subjected to a security screening
                                  prior to boarding the aircraft. This is mandatory
                                  per Indian Regulations.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  For Flights within Indian Check-in counters open 3
                                  hours prior to departure of flights and close 1
                                  hour prior to departure of flights. You may be
                                  denied boarding if you do not report in time.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  For International flights Check-in usually starts
                                  3 hours prior to departure, and Check- in counters
                                  will be closed 75 minutes before departure time
                                  for all classes of guests.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  Flight timings are subject to change without prior
                                  notice. Please recheck with the carrier prior to
                                  departure.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  For Fare Rules/ Cancellation policty-refer to fare
                                  rules laid by the carrier.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  While compliling the all above information, we
                                  have endeavored to ensure that all information is
                                  correct. However, no guarantee or representation
                                  is made to the accuracy or completenses of the
                                  information contained here. This information is
                                  cubject to changes by airlines without notice.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  For bookints made under class HBO fare, each of
                                  the passenger shall be allowed to carry only
                                  one(01) piece of luggage of maximum seven(07) kg.
                                  of weight (having maximum overall dimensions
                                  of:115 cms. (L+W+H) on Boeigng aircarft and 108
                                  cms(L+W+H) on Bombardier aircarft).
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        {/* 🛠️ Changed onclick to onClick for proper React integration */}
        <button onClick={() => window.print()} className="noPrint">
          Print
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n            .noPrint {\n                margin: 5px 0 30px 0;\n                font-size: 14px;\n                padding: 10px 30px;\n                background: #0e6fbd;\n                color: #ffffff;\n                border: 0;\n                border-radius: 2px;\n                cursor: pointer;\n            }\n\n            @media print {\n                .noPrint {\n                    display: none;\n                }\n            }\n        "
        }}
      />
      <Footer2 />
    </div>
  );
}

export default Ticketsss;