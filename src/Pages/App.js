// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import Flights from "./Flights";
// import Usermaster from "./Usermaster";
// import Depositrequest from "./Depositrequest";
// import Agencyledger from "./Agencyledger";
// import Gatewayreport from "./Gatewayreport";
// import Flightbooking from "./Flightbooking";
// import Edit from "./Edit";
// import Ticketsss from "./Ticketsss";
// import Threeinone from "./Threeinone";
// import Viewticket from "./Viewticket";
// import Markups from "./Markups";
// import Update from "./Update";


// function App() {
//   const ProtectedRoute = ({ children }) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     return isLoggedIn ? children : <Navigate to="/login" replace />;
//   };

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="/Flights"       element={<Flights />} />
//       <Route path="/Usermaster"    element={<Usermaster />} />
//       <Route path="/Depositrequest" element={<Depositrequest />} />
//       <Route path="/Agencyledger"  element={<Agencyledger />} />
//       <Route path="/Gatewayreport" element={<Gatewayreport />} />
//       <Route path="/Flightbooking" element={<Flightbooking />} />
//       <Route path="/Viewticket"    element={<Viewticket />} />
//       <Route path="/Markups"       element={<Markups />} />
//       <Route path="/Edit"          element={<Edit />} />
//       <Route path="/Threeinone"    element={<Threeinone />} />
//       <Route path="/ticket/:id"    element={<Ticketsss />} />
//             <Route path="/Update"    element={<Update />} />


//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import Flights from "./Flights";
// import Usermaster from "./Usermaster";
// import Depositrequest from "./Depositrequest";
// import Agencyledger from "./Agencyledger";
// import Gatewayreport from "./Gatewayreport";
// import Flightbooking from "./Flightbooking";
// import Ticketsss from "./Ticketsss";
// import Viewticket from "./Viewticket";
// import Markups from "./Markups";
// import EditAgency from "./EditAgency";     
// import UpdateAgency from "./UpdateAgency"; 
// import Invoice from "./Invoice"; 


// // ✅ 1. ProtectedRoute ko App ke BAHAR banayein aur Outlet ka use karein
// const ProtectedRoute = () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   // Agar logged in hai toh child routes (Outlet) dikhao, nahi toh login par bhej do
//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
// };

// function App() {
//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/login" element={<Login />} />

//       {/* ✅ 2. Saare Private Routes ko iske andar wrap kar dein */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/flights" element={<Flights />} />
//         <Route path="/usermaster" element={<Usermaster />} />
//         <Route path="/depositrequest" element={<Depositrequest />} />
//         <Route path="/agencyledger" element={<Agencyledger />} />
//         <Route path="/gatewayreport" element={<Gatewayreport />} />
//         <Route path="/flightbooking" element={<Flightbooking />} />
//         <Route path="/viewticket" element={<Viewticket />} />
//         <Route path="/markups" element={<Markups />} />
//         <Route path="/ticket/:id" element={<Ticketsss />} />
//         <Route path="/edit-agency" element={<EditAgency />} />
//         <Route path="/update-agency" element={<UpdateAgency />} />
//          <Route path="/Invoice/:txnId" element={<Invoice />} />

//       </Route>

//       {/* Default redirect */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Flights from "./Flights";
import Usermaster from "./Usermaster";
import Depositrequest from "./Depositrequest";
import Agencyledger from "./Agencyledger";
import Gatewayreport from "./Gatewayreport";
import Flightbooking from "./Flightbooking";
import Ticketsss from "./Ticketsss";
import Viewticket from "./Viewticket";
import Markups from "./Markups";
import EditAgency from "./EditAgency";
import UpdateAgency from "./UpdateAgency";
import Invoice from "./Invoice";


// Protected Route
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/usermaster" element={<Usermaster />} />
        <Route path="/depositrequest" element={<Depositrequest />} />
        <Route path="/agencyledger" element={<Agencyledger />} />
        <Route path="/gatewayreport" element={<Gatewayreport />} />
        <Route path="/flightbooking" element={<Flightbooking />} />
        <Route path="/viewticket" element={<Viewticket />} />
        <Route path="/markups" element={<Markups />} />




        {/* Agency Flow */}
        <Route path="/edit-agency" element={<EditAgency />} />
        <Route path="/update-agency" element={<UpdateAgency />} />

        {/* Invoice */}
        <Route path="/invoice/:txnId" element={<Invoice />} />
          {/* Ticket */}
        <Route path="/ticket/:id" element={<Ticketsss />} />

      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;