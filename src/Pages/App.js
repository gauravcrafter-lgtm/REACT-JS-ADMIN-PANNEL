
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
import Flightcancel from "./Flightcancel";
import EditBooking from "./Editpagedit";




// Protected Route
const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/Login" element={<Login />} />

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
        <Route path="/Editpagedit/:id" element={<EditBooking />} />
        






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