


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

  // ✅ Email ticket button ke liye state
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | success | error
  const [emailMessage, setEmailMessage] = useState("");
  const [manualEmail, setManualEmail] = useState(""); // agar chaho to yaha se override karke kisi aur email pe bhej sakte ho

  // ✅ Ab saare contracts (Onward + Return) use honge, sirf first wala nahi
  const allContracts = data?.Contracts || [];
  const contract = allContracts?.[0]; // fare details ke liye onward contract (primary)
  const fare = contract?.AirlineFare;
  const passengers = data?.Flightpassenger || [];
  const agency = data?.BookedBy || {};

  // 👇 CHANGE 1: Passengers ke real email addresses nikal liye (duplicate/invalid hata ke)
  // Ye hi default recipients honge jab tak manual email na bhara ho.
  const passengerEmails = Array.from(
    new Set(
      passengers
        .map((p) => (p?.Email || "").trim())
        .filter((e) => e && e.includes("@"))
    )
  );

  // ✅ Har passenger ke liye sirf uske apne contract ke fare ka calculation - onward + return dono fares combine
  const allFares = allContracts.map(c => c?.AirlineFare).filter(Boolean);
  const totalBaseFare = allFares.reduce((sum, f) => sum + (Number(f?.BaseFare) || 0), 0);
  const totalGrossFare = allFares.reduce((sum, f) => sum + (Number(f?.GrossFare) || 0), 0);
  const totalDiscount = allFares.reduce((sum, f) => sum + (Number(f?.Discount) || 0), 0);
  const totalOtherCharges = allFares.reduce((sum, f) => {
    return sum +
      (Number(f?.TaxFare) || 0) +
      (Number(f?.PriceMeal) || 0) +
      (Number(f?.PriceBaggage) || 0) +
      (Number(f?.ServiceCharge) || 0);
  }, 0);

  const API_URL = process.env.REACT_APP_GET_API_URL;
  const AGENCY_KEY = process.env.REACT_APP_AGENCY_KEY;
  const PORTAL_ID = process.env.REACT_APP_PORTAL_ID;
  const ACCOUNT_NO = process.env.REACT_APP_ACCOUNT_NO;

  // ✅ Dovesoft transactional email API (Postman se working GET endpoint)
  const DOVESOFT_TRANSEMAIL_URL = "https://transemail.dove-soft.com/v2/email/send";
  const DOVESOFT_APIKEY = process.env.REACT_APP_DOVESOFT_TRANSEMAIL_APIKEY;

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
        APIToken: "",
        AgencyKey: AGENCY_KEY,
        AccountNo: ACCOUNT_NO,
        BookingId: id,
        AirlinePnr: null,
        IsFly: false,
        IsB2B: true,
        IsCreditNote: false,
        IsTC: true
      })
    })
      .then(async (res) => {
        const json = await res.json();

        console.log("Response:", json);

        if (json.ResponseStatus !== 1) {
          console.error(json.Error?.ErrorDesc);
          return;
        }

        setData(json);
      })
      .catch(err => {
        console.error("API Error:", err);
      });

  }, [id, API_URL, AGENCY_KEY]);

  // ✅ Ticket ka HTML content banata hai jo email body mein jayega
  // Ye page pe dikhne wale Ticketsss table ka HUBAHU (exact) replica hai — same structure, same columns, same data
  const buildTicketEmailHtml = () => {
    // Flight segments — Onward/Return dono, airline logo ke sath (email clients images hide kar sakte hain to alt text bhi diya hai)
    const segmentsRows = allContracts
      .map((c, cIdx) => {
        const cSegs = c?.AirSegments || [];
        const cPnr = c?.AirlinePnr || c?.GDSPnr || data?.AirlinePnr || "N/A";
        const tripLabelRow = `
          <tr>
            <td colspan="5" style="padding:6px;background:#eef6fc;font-weight:bold;color:#1f91cd;border:1px solid #ddd;">
              ${c?.ContractType === "Return" ? "Return Flight" : "Onward Flight"}
            </td>
          </tr>`;
        const rows = cSegs.length > 0
          ? cSegs
              .map(
                (seg) => `
                  <tr>
                    <td style="padding:6px;border:1px solid #ddd;">
                      <img src="https://your-domain.com/static/Flight_Images/${seg?.AirlineCode}.gif" alt="${seg?.AirlineCode || ""}" width="20" height="20" style="vertical-align:middle;margin-right:6px;" />
                      ${seg?.AirlineName || "N/A"} ${seg?.AirlineCode || ""}-${seg?.FlightNumber?.trim() || ""}
                    </td>
                    <td style="padding:6px;border:1px solid #ddd;">${seg?.Origen || "N/A"} • ${seg?.DepartureDateTime || "N/A"}<br/>${seg?.DepartureTime || "N/A"}</td>
                    <td style="padding:6px;border:1px solid #ddd;">${seg?.Destination || "N/A"} • ${seg?.ArrivalDateTime || "N/A"}<br/>${seg?.ArrivalTime || "N/A"}</td>
                    <td style="padding:6px;border:1px solid #ddd;">${seg?.FareClass || "N/A"}</td>
                    <td style="padding:6px;border:1px solid #ddd;">${cPnr}</td>
                  </tr>`
              )
              .join("")
          : `<tr><td colspan="5" style="padding:6px;border:1px solid #ddd;">No segments found</td></tr>`;
        return tripLabelRow + rows;
      })
      .join("");

    // Passenger table — page ke saare columns ke sath (Name, Ticket No, Mobile, Email, Cabin Bag, Check-in Bag, Meal, Seat, Refundable, Status)
    const paxRows = passengers.length > 0
      ? passengers
          .map((pax) => {
            const name = (pax?.Title || pax?.FirstName || pax?.LastName)
              ? `${pax?.Title || ""} ${pax?.FirstName || ""} ${pax?.LastName || ""}`.trim()
              : "N/A";
            return `
              <tr>
                <td style="padding:6px;border:1px solid #ddd;">${name}</td>
                <td style="padding:6px;border:1px solid #ddd;">${pax?.TicketNumber || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${pax?.ContactNo || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${pax?.Email || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${allContracts?.[0]?.AirSegments?.[0]?.BaggageAllowed?.HandBaggage || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${allContracts?.[0]?.AirSegments?.[0]?.BaggageAllowed?.CheckInBaggage || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${pax?.MealCode || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${pax?.SeatCode || "N/A"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${contract?.Refundable ? "Yes" : "No"}</td>
                <td style="padding:6px;border:1px solid #ddd;">${getBookingStatusMessage(data?.BookingStatus)}</td>
              </tr>`;
          })
          .join("")
      : `<tr><td colspan="10" style="padding:6px;border:1px solid #ddd;">No passenger data found</td></tr>`;

    return `
      <div style="border:1px solid #d1d1d1;font-family:Tahoma, Geneva, sans-serif;border-radius:4px;background:#fff;width:100%;max-width:1100px;margin:0 auto;">
        <div style="width:95%;margin:0 auto;padding-top:2%;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="20%"><img src="https://your-domain.com/tripji.png" alt="logo" width="160" /></td>
              <td align="right" style="font-size:11px;color:#333333;">
                <p style="margin:5px 0;"><strong>Address:</strong> ${agency?.AgencyAddress || "N/A"}</p>
                <p style="margin:5px 0;">+91${agency?.AgencyMobile || "N/A"} | ${agency?.AgencyEmail || "N/A"}</p>
              </td>
            </tr>
          </table>
          <hr />
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size:11px;color:#333333;"><strong>Your e-Ticket</strong></td>
              <td align="right" style="font-size:11px;color:#333333;"><strong>Booking Date:</strong> ${data?.BookingDate || "N/A"}</td>
            </tr>
          </table>
        </div>

        <div style="width:95%;margin:20px auto 0;font-size:12px;font-family:Arial, Helvetica, sans-serif;">
          <table cellpadding="3">
            <tr><td width="120"><strong>Reference ID</strong></td><td>${data?.Tsid || "N/A"}</td></tr>
            <tr><td><strong>Ticket Status</strong></td><td>${getBookingStatusMessage(data?.BookingStatus)}</td></tr>
          </table>
        </div>

        <div style="width:95%;margin:15px auto;font-size:11px;font-family:tahoma;">
          <table width="100%" border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;font-size:12px;">
            <tr>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Airline/Flight No.</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Departure</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Arrival</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Class</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Pnr</strong></td>
            </tr>
            ${segmentsRows}
          </table>
        </div>

        <div style="width:95%;margin:15px auto;">
          <p style="color:#1f91cd;font-size:15px;font-weight:bold;">Passenger - Details</p>
          <table width="100%" border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;font-size:12px;">
            <tr>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Passenger Name</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Ticket No.</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Mobile No.</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Email</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Cabin Bag</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Check-In Bag</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Meal</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Seat</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Refundable</strong></td>
              <td bgcolor="#bedff1" style="border:1px solid #ddd;"><strong>Status</strong></td>
            </tr>
            ${paxRows}
          </table>
        </div>

        <div style="width:95%;margin:15px auto;border:1px solid #ddd;">
          <table width="98%" border="0" style="font-family:Tahoma, Geneva, sans-serif;font-size:11px;padding:1%;margin:0 auto;">
            <tr>
              <td align="left"><strong style="font-size:15px;color:#1f91cd;">Fare Details</strong></td>
              <td align="right"><strong style="font-size:15px;color:#1f91cd;">Amount (INR)</strong></td>
            </tr>
            <tr><td align="left">Basic Fare :</td><td align="right">₹${allFares.length ? totalBaseFare : "N/A"}</td></tr>
            <tr><td align="left">Other Charges :</td><td align="right">₹${allFares.length ? totalOtherCharges : "N/A"}</td></tr>
            <tr><td align="left">Discount :</td><td align="right">₹ (-)${totalDiscount}</td></tr>
            <tr><td colspan="2"><hr /></td></tr>
            <tr>
              <td align="left"><strong style="font-size:14px;">Total</strong></td>
              <td align="right"><strong style="font-size:14px;">₹${allFares.length ? totalGrossFare : "N/A"}</strong></td>
            </tr>
          </table>
        </div>

        <div style="width:98%;margin:15px auto;font-size:11px;font-family:Tahoma, Geneva, sans-serif;color:#5f6061;">
          <p style="padding-left:2%;"><strong>Terms &amp; Conditions</strong></p>
          <ul>
            <li style="margin-bottom:4px;">All passengers must produce a valid photo identification proof at the time of check in.</li>
            <li style="margin-bottom:4px;">Guests will be subjected to a security screening prior to boarding the aircraft. This is mandatory per Indian Regulations.</li>
            <li style="margin-bottom:4px;">For Flights within Indian Check-in counters open 3 hours prior to departure of flights and close 1 hour prior to departure of flights. You may be denied boarding if you do not report in time.</li>
            <li style="margin-bottom:4px;">For International flights Check-in usually starts 3 hours prior to departure, and Check-in counters will be closed 75 minutes before departure time for all classes of guests.</li>
            <li style="margin-bottom:4px;">Flight timings are subject to change without prior notice. Please recheck with the carrier prior to departure.</li>
            <li style="margin-bottom:4px;">For Fare Rules/ Cancellation policy - refer to fare rules laid by the carrier.</li>
            <li style="margin-bottom:4px;">While compiling the above information, we have endeavored to ensure that all information is correct. However, no guarantee or representation is made to the accuracy or completeness of the information contained here. This information is subject to changes by airlines without notice.</li>
            <li style="margin-bottom:4px;">For bookings made under class HBO fare, each of the passenger shall be allowed to carry only one(01) piece of luggage of maximum seven(07) kg. of weight (having maximum overall dimensions of:115 cms. (L+W+H) on Boeing aircraft and 108 cms(L+W+H) on Bombardier aircraft).</li>
          </ul>
        </div>
      </div>
    `;
  };

  // 👇 CHANGE 2: Ab yeh sirf LAST-RESORT fallback hai — jab passenger ka koi email na mile
  // AND manual box bhi khali ho. Agar tum yeh safety net bhi nahi chahte, is line ko
  // "" (empty string) kar dena, ya neeche wale toEmail se hata dena.
  const FALLBACK_TEST_EMAIL = "gauravcrafter@gmail.com";

  const handleSendTicketEmail = async () => {
    // 👇 CHANGE 3: Priority order -> (1) manual override (2) passenger's real email(s) (3) fallback
    const toEmail =
      manualEmail?.trim() ||
      (passengerEmails.length > 0 ? passengerEmails.join(",") : "") ||
      FALLBACK_TEST_EMAIL;

    if (!toEmail) {
      setEmailStatus("error");
      setEmailMessage("Passenger ka email nahi mila. Neeche box mein email daal ke try karo.");
      return;
    }

    if (!DOVESOFT_APIKEY) {
      setEmailStatus("error");
      setEmailMessage("REACT_APP_DOVESOFT_TRANSEMAIL_APIKEY .env mein missing hai.");
      return;
    }

    setEmailStatus("sending");
    setEmailMessage("");

    // ✅ Ab params GET query string mein nahi, POST body mein jayenge — is se URL length limit (414 error) nahi aayega
    const params = new URLSearchParams({
      apikey: DOVESOFT_APIKEY,
      subject: `Your e-Ticket - ${data?.Tsid || id}`,
      to: toEmail,
      bodyHTML: buildTicketEmailHtml(),
      bodyText: `Your e-Ticket. Reference ID: ${data?.Tsid || "N/A"}. PNR: ${data?.AirlinePnr || contract?.AirlinePnr || "N/A"}. Status: ${getBookingStatusMessage(data?.BookingStatus)}`,
      encodingType: "0",
      from: "Noreply@bookbyown.com",
      from_name: "Bookbyown"
    });

    try {
      const res = await fetch(DOVESOFT_TRANSEMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      // ✅ Response text pehle padho, phir JSON parse karo — is se "Unexpected end of JSON input" crash nahi hoga
      const rawText = await res.text();
      let json = null;
      try {
        json = rawText ? JSON.parse(rawText) : null;
      } catch (parseErr) {
        console.error("Response JSON nahi hai:", rawText);
      }

      if (!res.ok) {
        setEmailStatus("error");
        setEmailMessage(`API Error (${res.status}): ${json?.message || rawText?.slice(0, 200) || "Unknown error"}`);
        return;
      }

      if (json?.success) {
        setEmailStatus("success");
        setEmailMessage(`Ticket ${toEmail} par bhej diya gaya hai ✅`);
      } else {
        setEmailStatus("error");
        setEmailMessage(json?.message || "Email bhejne mein error aaya.");
      }
    } catch (err) {
      console.error("Email send error:", err);
      setEmailStatus("error");
      setEmailMessage("Email bhejte waqt error aaya. Console check karo.");
    }
  };

  if (!data) {
    return (
      <>
        <Sidebar />
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
        <Footer2 />
      </>
    );
  }

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
                              <img src="tripcaliber.png" alt="logo" width={160} />
                            </td>
                            <td width={428}>
                              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td width="90%" align="right">
                                      <strong style={{ fontSize: 18, margin: 0 }}></strong>
                                      <p style={{ fontSize: 11, color: "#333333", width: 300, margin: "5px 0" }}>
                                        <strong>Address:</strong>
                                        <span>
                                          {agency?.AgencyAddress || "N/A"}
                                        </span>
                                      </p>
                                      <p style={{ fontSize: 11, color: "#333333", width: 400, margin: "5px 0" }}>
                                        <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 255 255" fill="none">
                                            <path d="M227.888 247.033L228.15 246.614L254.252 193.632L178.005 136.447L142.924 162.756C129.694 161.969 117.212 156.359 107.84 146.987C98.4685 137.615 92.8581 125.133 92.071 111.903L118.38 76.822L61.1966 0.576163L8.65798 26.4609L8.21439 26.6788L7.79589 26.9412C5.57016 28.3226 3.73501 30.2506 2.46515 32.5417C1.19528 34.8329 0.532966 37.411 0.541231 40.0305L0.54123 53.7016C0.541229 80.0429 5.72953 106.126 15.8099 130.462C25.8903 154.799 40.6654 176.911 59.2915 195.537C77.9177 214.163 100.03 228.938 124.366 239.018C148.702 249.099 174.786 254.287 201.127 254.287L214.799 254.287C217.418 254.295 219.996 253.633 222.288 252.363C224.579 251.094 226.507 249.258 227.888 247.033ZM201.127 234.708C101.32 234.708 20.1203 153.508 20.1203 53.7016L20.1203 42.6394L55.2788 25.3205L93.9078 76.8257L72.402 105.501L72.402 108.764C72.4239 128.295 80.1921 147.02 94.0025 160.83C107.813 174.64 126.537 182.409 146.068 182.43L149.331 182.43L178.006 160.925L229.508 199.549L212.186 234.708L201.127 234.708Z" fill="black" />
                                          </svg>
                                        </span>
                                        <span>+91{agency?.AgencyMobile || "N/A"}  </span> |
                                        <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 254 203" fill="none">
                                            <path d="M0 0V202.969H253.711V0H0ZM116.707 121.358C119.64 123.541 123.199 124.719 126.855 124.719C130.512 124.719 134.07 123.541 137.004 121.358L149.408 112.056L236.797 177.598V186.055H16.9141V177.598L104.303 112.056L116.707 121.358ZM126.855 107.827L16.9141 25.3711V16.9141H236.797V25.3711L126.855 107.827ZM16.9141 46.5136L90.2085 101.484L16.9141 156.455V46.5136ZM236.797 156.455L163.502 101.484L236.797 46.5136V156.455Z" fill="black" />
                                          </svg>
                                        </span>
                                        <span>{agency?.AgencyEmail || "N/A"}</span>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}><hr /></td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: 11, color: "#333333" }}>
                              <strong>Your e-Ticket</strong>
                            </td>
                            <td align="right" style={{ fontSize: 11, color: "#333333" }}>
                              <strong>Booking Date:</strong> <span>{data?.BookingDate || "N/A"}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        width="95%"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ margin: "0 auto", backgroundColor: "#fff", fontSize: 12, fontFamily: "Arial, Helvetica, sans-serif", marginTop: 50 }}
                      >
                        <tbody>
                          <tr>
                            <td width="50%">
                              <table cellPadding={3}>
                                <tbody>
                                  <tr>
                                    <td width={120}><strong>Reference ID</strong></td>
                                    <td>{data?.Tsid || "N/A"}</td>
                                  </tr>
                                  <tr>
                                    <td><strong>Ticket Status</strong></td>
                                    <td>{getBookingStatusMessage(data?.BookingStatus)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="50%" align="right">
                              <img src="../images/bar-code.jpg" style={{ width: "90%" }} alt="barcode" />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        width="95%"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ margin: "0 auto", backgroundColor: "#fff", fontSize: 11, fontFamily: "tahoma" }}
                      >
                        <tbody>
                          <tr><td style={{ borderBottom: "1px dashed #ccc" }}>&nbsp;</td></tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td>
                              <table width="100%" border={1} cellPadding={5} cellSpacing={0} style={{ fontSize: 12, marginTop: 5 }}>
                                <tbody>
                                  <tr>
                                    <td bgcolor="#bedff1"><strong>Airline/Flight No.</strong></td>
                                    <td bgcolor="#bedff1"><strong>Departure</strong></td>
                                    <td bgcolor="#bedff1"><strong>Arrival</strong></td>
                                    <td bgcolor="#bedff1"><strong>Class</strong></td>
                                    <td bgcolor="#bedff1"><strong>Pnr</strong></td>
                                  </tr>
                                  {allContracts.length > 0 ? (
                                    allContracts.map((c, cIdx) => {
                                      const cSegments = c?.AirSegments || [];
                                      const cPnr = c?.AirlinePnr || c?.GDSPnr || data?.AirlinePnr || "N/A";
                                      return (
                                        <React.Fragment key={cIdx}>
                                          <tr>
                                            <td colSpan={5} bgcolor="#eef6fc" style={{ fontWeight: "bold", color: "#1f91cd" }}>
                                              {c?.ContractType === "Return" ? "Return Flight" : "Onward Flight"}
                                            </td>
                                          </tr>
                                          {cSegments.length > 0 ? (
                                            cSegments.map((seg, idx) => (
                                              <tr key={`${cIdx}-${idx}`} style={{ paddingBottom: "2%" }}>
                                                <td width={150}>
                                                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                    <img
                                                      src={`/static/Flight_Images/${seg?.AirlineCode}.gif`}
                                                      alt={seg?.AirlineCode || "airline"}
                                                      width={23}
                                                      height={23}
                                                      style={{ objectFit: "contain" }}
                                                      onError={(e) => { e.target.style.display = "none"; }}
                                                    />
                                                    <span>
                                                      {seg?.AirlineName || "N/A"} {seg?.AirlineCode}-{seg?.FlightNumber?.trim()}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td>
                                                  {seg?.Origen || "N/A"} • {seg?.DepartureDateTime || "N/A"} <br />
                                                  {seg?.DepartureTime || "N/A"}
                                                </td>
                                                <td>
                                                  {seg?.Destination || "N/A"} • {seg?.ArrivalDateTime || "N/A"} <br />
                                                  {seg?.ArrivalTime || "N/A"}
                                                </td>
                                                <td>{seg?.FareClass || "N/A"}</td>
                                                <td>{cPnr}</td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr><td colSpan={5}>No segments found</td></tr>
                                          )}
                                        </React.Fragment>
                                      );
                                    })
                                  ) : (
                                    <tr><td colSpan={5}>No flight segments found</td></tr>
                                  )}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr><td>&nbsp;</td></tr>
                          <tr>
                            <td>
                              <table width="100%" cellSpacing={0} cellPadding={0} border={0} style={{ fontSize: 14 }}>
                                <tbody>
                                  <tr>
                                    <td width="100%">
                                      <strong style={{ color: "#1f91cd", fontSize: 15 }}>Passenger - Details</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table width="100%" border={1} cellPadding={5} cellSpacing={0} style={{ fontSize: 12, marginTop: 5 }}>
                                        <tbody>
                                          <tr>
                                            <td bgcolor="#bedff1"><strong>Passenger Name</strong></td>
                                            <td bgcolor="#bedff1"><strong>Ticket No.</strong></td>
                                            <td bgcolor="#bedff1"><strong>Mobile No.</strong></td>
                                            <td bgcolor="#bedff1"><strong>Email</strong></td>
                                            <td bgcolor="#bedff1"><strong>Cabin Bag</strong></td>
                                            <td bgcolor="#bedff1"><strong>Check-In Bag</strong></td>
                                            <td bgcolor="#bedff1"><strong>Meal</strong></td>
                                            <td bgcolor="#bedff1"><strong>Seat</strong></td>
                                            <td bgcolor="#bedff1"><strong>Refundable</strong></td>
                                            <td bgcolor="#bedff1"><strong>Status</strong></td>
                                          </tr>
                                          {passengers.length > 0 ? (
                                            passengers.map((pax) => (
                                              <tr key={pax?.PaxId} style={{ paddingBottom: "2%" }}>
                                                <td>{(pax?.Title || pax?.FirstName || pax?.LastName) ? `${pax?.Title || ""} ${pax?.FirstName || ""} ${pax?.LastName || ""}`.trim() : "N/A"}</td>
                                                <td>{pax?.TicketNumber || "N/A"}</td>
                                                <td>{pax?.ContactNo || "N/A"}</td>
                                                <td>{pax?.Email || "N/A"}</td>
                                                <td>{allContracts?.[0]?.AirSegments?.[0]?.BaggageAllowed?.HandBaggage || "N/A"}</td>
                                                <td>{allContracts?.[0]?.AirSegments?.[0]?.BaggageAllowed?.CheckInBaggage || "N/A"}</td>
                                                <td>{pax?.MealCode || "N/A"}</td>
                                                <td>{pax?.SeatCode || "N/A"}</td>
                                                <td>{contract?.Refundable ? "Yes" : "No"}</td>
                                                <td>{getBookingStatusMessage(data?.BookingStatus)}</td>
                                              </tr>
                                            ))
                                          ) : (
                                            <tr><td colSpan={10}>No passenger data found</td></tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr><td style={{ height: 7 }} /></tr>
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
                              <table width="98%" border={0} style={{ fontFamily: "Tahoma, Geneva, sans-serif", fontSize: 11, padding: "1% 1%" }}>
                                <tbody>
                                  <tr>
                                    <td align="left" valign="middle">
                                      <strong style={{ fontSize: 15, color: "#1f91cd" }}>Fare Details</strong>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      <strong style={{ fontSize: 15, color: "#1f91cd" }}>Amount (INR)</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">Basic Fare :</td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">₹{allFares.length ? totalBaseFare : "N/A"}</td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">Other Charges :</td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">₹{allFares.length ? totalOtherCharges : "N/A"}</td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">Discount :</td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">₹ (-){totalDiscount}</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} align="left" valign="middle"><hr /></td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      <strong style={{ fontSize: 14 }}>Total</strong>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      <strong style={{ fontSize: 14 }}>₹{allFares.length ? totalGrossFare : "N/A"}</strong>
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
                        style={{ marginTop: 10, margin: "2% auto", fontSize: 11, fontFamily: "Tahoma, Geneva, sans-serif", color: "#5f6061" }}
                      >
                        <tbody>
                          <tr>
                            <td align="left" style={{ fontSize: 11, fontFamily: "Tahoma, Geneva, sans-serif", color: "#5f6061", paddingLeft: "2%", paddingBottom: 2 }}>
                              <strong>Terms &amp; Conditions</strong>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <ul>
                                <li style={{ marginBottom: 4 }}>All passengers must produce a valid photo identification proof at the time of check in.</li>
                                <li style={{ marginBottom: 4 }}>Guests will be subjected to a security screening prior to boarding the aircraft. This is mandatory per Indian Regulations.</li>
                                <li style={{ marginBottom: 4 }}>For Flights within Indian Check-in counters open 3 hours prior to departure of flights and close 1 hour prior to departure of flights. You may be denied boarding if you do not report in time.</li>
                                <li style={{ marginBottom: 4 }}>For International flights Check-in usually starts 3 hours prior to departure, and Check-in counters will be closed 75 minutes before departure time for all classes of guests.</li>
                                <li style={{ marginBottom: 4 }}>Flight timings are subject to change without prior notice. Please recheck with the carrier prior to departure.</li>
                                <li style={{ marginBottom: 4 }}>For Fare Rules/ Cancellation policy - refer to fare rules laid by the carrier.</li>
                                <li style={{ marginBottom: 4 }}>While compiling the above information, we have endeavored to ensure that all information is correct. However, no guarantee or representation is made to the accuracy or completeness of the information contained here. This information is subject to changes by airlines without notice.</li>
                                <li style={{ marginBottom: 4 }}>For bookings made under class HBO fare, each of the passenger shall be allowed to carry only one(01) piece of luggage of maximum seven(07) kg. of weight (having maximum overall dimensions of:115 cms. (L+W+H) on Boeing aircraft and 108 cms(L+W+H) on Bombardier aircraft).</li>
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

      <div style={{ textAlign: "center", marginTop: 10 }}>
        {/* <div style={{ marginBottom: 10 }}>
          <input
            type="email"
            placeholder={
              passengerEmails.length > 0
                ? `Default: ${passengerEmails.join(", ")}`
                : `Passenger email nahi mila. Yahan email daalein.`
            }
            value={manualEmail}
            onChange={(e) => setManualEmail(e.target.value)}
            className="noPrint"
            style={{
              padding: "8px 12px",
              fontSize: 13,
              border: "1px solid #ccc",
              borderRadius: 3,
              width: 340,
              marginRight: 8
            }}
          />
        </div> */}

        <button onClick={() => window.print()} className="noPrint">
          Print
        </button>

        <button
          onClick={handleSendTicketEmail}
          className="noPrint"
          disabled={emailStatus === "sending"}
          style={{
            margin: "5px 0 10px 10px",
            fontSize: 14,
            padding: "10px 30px",
            background: emailStatus === "sending" ? "#7fb8e0" : "#0e6fbd",
            color: "#ffffff",
            border: 0,
            borderRadius: 2,
            cursor: emailStatus === "sending" ? "not-allowed" : "pointer"
          }}
        >
          {emailStatus === "sending" ? "Sending..." : "Email Ticket"}
        </button>

        {emailMessage && (
          <p
            className="noPrint"
            style={{
              fontSize: 13,
              marginTop: 6,
              color: emailStatus === "success" ? "#1a7f37" : "#c62828"
            }}
          >
            {emailMessage}
          </p>
        )}
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