import React from "react";
import "../CSS/Loginsec.css";

 function Loginsec() {
  return (
    <div className="featuresSection">

      {/* LEFT SIDE */}
      <div className="featuresLeft">

        <div className="featureCard">
          <span className="icon">🔒</span>
          <div>
            <h3>Secure Online Transaction</h3>
            <p>
              Security and privacy of your transaction are protected by RapidSSL authorized
            </p>
          </div>
        </div>

        <div className="featureCard">
          <span className="icon">🔍</span>
          <div>
            <h3>Most Extensive Search Results</h3>
            <p>
              Comparing cheap flights and hotels has never been this easy.
            </p>
          </div>
        </div>

        <div className="featureCard">
          <span className="icon">📄</span>
          <div>
            <h3>Manage Your Booking Online</h3>
            <p>
              Log in to access your e-ticket on all your devices, retrieve booking.
            </p>
          </div>
        </div>

        <div className="featureCard">
          <span className="icon">👤</span>
          <div>
            <h3>Customer Services</h3>
            <p>
              Need help? Contact us any time via phone or email.
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="featuresRight">
  <img
    src="logicsec.png "
    alt="New Programmer Illustration"
  />
</div>
      </div>

    
  );
}
export default Loginsec;
