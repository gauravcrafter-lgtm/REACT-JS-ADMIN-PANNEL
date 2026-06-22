import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
export default function Viewticket() {
  const [bookingId, setBookingId] = useState("");
  const [txnId, setTxnId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTicket = async () => {
    if (!txnId) {
      alert("Transaction Id Enter Karo");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://api.namantechnolab.com/api/Agent/NamoTxn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            APIRequestType: 4,
            TxnId: txnId,
            AgencyKey: "02ad68f3-9ae6-4148-85b1-e61d1f03991f",
            IsGenerated: false,
            IsAssigned: false,
            EmailId: null,
            BookingType: null,
            PortalId: 11,
            IsTC: true,
          }),
        }
      );

      const data = await response.json();
      setTicketData(data);
    } catch (error) {
      console.log(error);
      alert("Error Aayi");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <Sidebar/>
   <div
  style={{
    minHeight: "100vh",
    background: "#dce6f2",
    padding: "20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "25px",
      color: "#1f2937",
      fontSize: "30px",
      fontWeight: "700",
    }}
  >
    🎫 View Ticket
  </h2>

  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      display: "flex",
      gap: "20px",
      alignItems: "end",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      width: "65%",
      margin: "0 auto",
    }}
  >
    <div style={{ flex: 1 }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Booking Id
      </label>

      <input
        type="text"
        placeholder="Enter Booking Id"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        style={{
          width: "100%",
          height: "42px",
          padding: "0 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          outline: "none",
        }}
      />
    </div>

    <div style={{ flex: 1 }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Transaction Id
      </label>

      <input
        type="text"
        placeholder="Enter Transaction Id"
        value={txnId}
        onChange={(e) => setTxnId(e.target.value)}
        style={{
          width: "100%",
          height: "42px",
          padding: "0 12px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          outline: "none",
        }}
      />
    </div>

    <button
      onClick={getTicket}
      style={{
        height: "42px",
        minWidth: "120px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      {loading ? "Loading..." : "Ticket"}
    </button>
  </div>
<div style={{ marginTop: "20px" }}>
  Content
</div>
{ticketData && (

   <div>
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
                                    <strong style={{ fontSize: 18, margin: 0 }}>
                                      TRIPCALIBER
                                    </strong>
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
                         {ticketData?.AgencyDetails?.Address},
                         {ticketData?.AgencyDetails?.City},
                         {ticketData?.AgencyDetails?.State} 
                         {ticketData?.AgencyDetails?.PinCode}
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
                                     <span>
                                   {ticketData?.AgencyDetails?.MobileNumber}
                                   </span> |
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
                                      <span>
  {ticketData?.AgencyDetails?.EmailId || "N/A"}
</span>
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
                            <strong>Booking Date:</strong>{" "}
                                                 <span>
                         {new Date(
                          ticketData?.BookingDate?.split("/").reverse().join("-")
                                      ).toLocaleDateString("en-GB", {
                                       weekday: "short",
                                      day: "2-digit",
                                       month: "short",
                                         year: "numeric",
                                                    })}
                                                    </span>
                                                     {" | "}
                                                  <strong>Booking Time:</strong>{" "}
                                                         <span>N/A</span>
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
                                 <td>{ticketData?.BookingId}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Ticket Status</strong>
                                  </td>
                                <td>{ticketData?.BookingStatus || "Booked"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td width="50%" align="right">
                            <img
                              src="../images/bar-code.jpg"
                              style={{ width: "90%" }}
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
                                          <td>
                                            <img
                                              src="../Flight/images/icon-flight/indigo.png"
                                              width={30}
                                              height={30}
                                            />
                                          </td>
                                          <td>
                                            <span>Indigo</span>
                                            <br />
                                            <span>{ticketData?.PaxList?.[0]?.AirlineCode}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td>
                                <span>
  {ticketData?.PaxList?.[0]?.BookedSector?.split("-")[0]}
</span>
&nbsp;
<span>
  [{ticketData?.PaxList?.[0]?.BookedSector?.split("-")[0]}]
</span>

<br />

<span>
  {ticketData?.PaxList?.[0]?.TravelDate}
</span>
&nbsp;

<span>
  {ticketData?.PaxList?.[0]?.DepartureTime || "10:55"}
</span>
                                  </td>
                                  <td>
                                  
  <span>
    {ticketData?.PaxList?.[0]?.BookedSector?.split("-")[1]}
  </span>
  &nbsp;
  <span>
    [{ticketData?.PaxList?.[0]?.BookedSector?.split("-")[1]}]
  </span>

  <br />

  <span>
    {ticketData?.PaxList?.[0]?.TravelDate}
  </span>
  &nbsp;

  <span>
    {ticketData?.PaxList?.[0]?.ArrivalTime || "13:00"}
  </span>

                                  </td>
                                  <td>
                                    <span>{ticketData?.CabinClass || "Economy"}</span>
                                  </td>
                                  <td>
                                   <span>{ticketData?.AirlinePnr}</span>
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
                                            <span>Mr.</span>{" "}
                                            <span>{ticketData.PaxList?.[0]?.PaxName}</span>
                                          </td>
                                          <td>
                                         {ticketData?.PaxList?.[0]?.TicketNumber}
                                          </td>
                                          <td>
                                          {ticketData?.PriceBaggage || "NA"}
                                          </td>
                                          <td>
                                            <span>{ticketData?.BaggageCharge || "NA"}</span>
                                          </td>
                                          <td>
                                            <span></span>{ticketData?.MealCharge || "NA"}
                                          </td>
                                          <td>
                                            <span>{ticketData?.PriceSeat || "NA"}</span>
                                          </td>
                                          <td>
                                            <span>Yes</span>
                                          </td>
                                          <td>
                                            <span>{ticketData?.BookingStatusV2 || "Unknown"}</span>
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
                                       Rs. {Number(ticketData?.TotalBasicFare || 0).toFixed(2)}
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="middle">
                                    Other Charges :
                                  </td>
                                  <td>&nbsp;</td>
                                  <td align="right" valign="middle">
                                      Rs. {(
        Number(ticketData?.ServiceCharge || 0) +
        Number(ticketData?.IGST || 0)
      ).toFixed(2)}
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="middle">
                                    Discount :
                                  </td>
                                  <td>&nbsp;</td>
                                  <td align="right" valign="middle">
                                    Rs. (-) {Number(ticketData?.Discount || 0).toFixed(2)}
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
                                    Rs.{" "}
        {Number(ticketData?.TotalFare || ticketData?.NetFare || 0).toFixed(2)}
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
                                prior to boarding the aircraft. This is
                                mandatory per Indian Regulations.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                For Flights within Indian Check-in counters open
                                3 hours prior to departure of flights and close
                                1 hour prior to departure of flights. You may be
                                denied boarding if you do not report in time.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                For International flights Check-in usually
                                starts 3 hours prior to departure, and Check- in
                                counters will be closed 75 minutes before
                                departure time for all classes of guests.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                Flight timings are subject to change without
                                prior notice. Please recheck with the carrier
                                prior to departure.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                For Fare Rules/ Cancellation policty-refer to
                                fare rules laid by the carrier.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                While compliling the all above information, we
                                have endeavored to ensure that all information
                                is correct. However, no guarantee or
                                representation is made to the accuracy or
                                completenses of the information contained here.
                                This information is cubject to changes by
                                airlines without notice.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                For bookints made under class HBO fare, each of
                                the passenger shall be allowed to carry only
                                one(01) piece of luggage of maximum seven(07)
                                kg. of weight (having maximum overall dimensions
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
      <button onclick="window.print();" className="noPrint">
        Print
      </button>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n            .noPrint {\n                margin: 5px 0 30px 0;\n                font-size: 14px;\n                padding: 10px 30px;\n                background: #0e6fbd;\n                color: #ffffff;\n                border: 0;\n                border-radius: 2px;\n                cursor: pointer;\n            }\n\n            @media print {\n                .noPrint {\n                    display: none;\n                }\n            }\n        "
      }}
    />
  </div>
  )}
</div>
<Footer2/>
</div>
  );
}