import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
const Invoice = () => {
  const { txnId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pax, setPax] = useState(1); // Ensure this line exists!

  // ✅ DEFINE FUNCTION FIRST (BEFORE useEffect)
  const getInvoice = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching invoice for txnId:", txnId);

      const payload = {
        APIRequestType: 4,
        TxnId: txnId,
        AgencyKey: "f9829bb6-efa4-47dd-8c31-2a72e4dab443",
        IsGenerated: false,
        IsAssigned: false,
        EmailId: null,
        BookingType: null,
        PortalId: 11,
        IsTC: true,
      };

      console.log("📤 Sending payload:", payload);

      const response = await fetch(
        "https://api.namantechnolab.com/api/Agent/NamoTxn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("📊 API Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Invoice data received:", data);

      setInvoiceData(data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching invoice:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // ✅ NOW useEffect IS DEFINED (AFTER getInvoice)
  useEffect(() => {
    if (txnId) {
      console.log("📍 useEffect triggered with txnId:", txnId);
      getInvoice();
    }
  }, [txnId]); // ✅ Dependency on txnId only

  // ✅ Show Loading State
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        <h3>⏳ Loading Invoice...</h3>
        <p>Transaction ID: {txnId}</p>
      </div>
    );
  }

  // ✅ Show Error State
  if (error) {
    return (
     
      <div
      
        style={{
          textAlign: "center",
          padding: "50px",
          fontSize: "18px",
          color: "red",
        }}
      >
        <h3>❌ Error: {error}</h3>
        <button
          onClick={getInvoice}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0e6fbd",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  // ✅ Show Invoice Data
  // if (!invoiceData) {
  //   return (
  //     <div style={{ textAlign: "center", padding: "50px" }}>
  //       <h3>No invoice data available</h3>
  //     </div>
  //   );
  // }

  return (
     <div>
       <Sidebar/>
//     <table
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
                                        color: "#666666",
                                        width: 300,
                                        margin: "5px 0"
                                      }}
                                    >
                                      <strong>Address:</strong>
                                      <span>
                                      <span>{invoiceData?.HostAddress}</span>
                                      </span>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: 11,
                                        color: "#666666",
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
<span>{invoiceData?.HostMobile}</span>                                      <span>
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
<span>{invoiceData?.HostEmail}</span>                                    </p>
                                    <p
                                      style={{
                                        fontSize: 11,
                                        color: "#666666",
                                        width: 300,
                                        margin: "5px 0"
                                      }}
                                    >
                                      <strong>GST No:</strong>
                                      <span>{invoiceData?.GSTNo || "-"}</span>
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
                          <td
                            style={{ fontSize: 16, color: "#333333" }}
                            width="100%"
                            align="center"
                            colSpan={2}
                          >
                            <strong>Tax Invoice</strong>
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
                        marginTop: 20
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="100%">
                            <table cellPadding={4} style={{ marginTop: 0 }}>
                              <tbody>
  <tr>
    <td width={120}>
      <strong>Invoice No.</strong>
    </td>
    <td>{invoiceData?.InvoiceNumber}</td>
  </tr>

  <tr>
    <td>
      <strong>Invoice Date</strong>
    </td>
    <td>{invoiceData?.InvoiceDate}</td>
  </tr>

  <tr>
    <td>
      <strong>PNR No.</strong>
    </td>
    <td>{invoiceData?.AirlinePnr}</td>
  </tr>

  <tr>
    <td>
      <strong>Booked By</strong>
    </td>
    <td>
      {invoiceData?.BookedBy ||
        invoiceData?.AgencyDetails?.AgencyName}
    </td>
  </tr>

  <tr>
    <td>
      <strong>Buyer Email Id</strong>
    </td>
    <td>{invoiceData?.AgencyDetails?.EmailId}</td>
  </tr>

  <tr>
    <td>
      <strong>Buyer GSTIN No.</strong>
    </td>
    <td>{invoiceData?.AgencyDetails?.GSTNNumber}</td>
  </tr>
</tbody>
                            </table>
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
                                  <td>
                                    <table
                                      width="100%"
                                      border={1}
                                      cellPadding={5}
                                      cellSpacing={0}
                                      style={{ fontSize: 12, marginTop: 5 }}
                                      
                                    >
                                      <thead>
                                        
                                        <tr>
                                          <th bgcolor="#bedff1">
                                            <strong>Ticket No.</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Passenger Name</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Travel Date</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Description</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Basic Fare</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>YQ Tax</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Taxes</strong>
                                          </th>
                                          <th bgcolor="#bedff1">
                                            <strong>Total</strong>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
  {invoiceData?.PaxList?.map((pax, index) => (
    <tr key={index} style={{ paddingBottom: "2%" }}>
      <td>
        <span>{pax?.TicketNumber}</span>
      </td>
      <td>
        <span>{pax?.PaxName}</span>
      </td>
      <td>
        <span>{pax?.TravelDate}</span>
      </td>
      <td>
        <span>
          {pax?.AirlineCode}-{pax?.FlightNumber}
          <br />
          {pax?.BookedSector}
        </span>
      </td>
      <td>
        <span>{pax?.PaxFare}</span>
      </td>
      <td>
        <span>{pax?.PaxYQ}</span>
      </td>
      <td>
        <span>{pax?.FareTax}</span>
      </td>
      <td>
        <span>{pax?.TotalPaxFare}</span>
      </td>
    </tr>
  ))}
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
                      cellPadding={10}
                      style={{ margin: "2% auto", backgroundColor: "#fff" }}
                    >
                      <tbody>
                        <tr>
                          <td width="50%" align="left" valign="top">
                            <strong style={{ fontSize: 15, color: "#1f91cd" }}>
                              Amount in word
                            </strong>
                            <br />
                            <strong style={{ fontSize: 13 }}>
                                 (INR {invoiceData?.CurrencyText} Only)
                            </strong>
                          </td>
                          <td align="left" valign="top">
                            <table
                              width="100%"
                              border={0}
                              style={{
                                fontFamily: "Tahoma, Geneva, sans-serif",
                                fontSize: 11
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
      Baggage Charge(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.PriceBaggage || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Meal Charge(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.PriceMeal || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Seat Charge(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.PriceSeat || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Total Amount
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.TotalFare || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Commission(-)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.Discount || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Discount(-)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.DiscountOnPromo || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Gross Amount
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.NetFare || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Service Charge(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.ServiceCharge || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      TDS(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.TDS || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      CGST @ 0%(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.CGST || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      SGST @ 0%(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.SGST || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      IGST @ 18%(+)
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {Number(invoiceData?.IGST || 0).toFixed(2)}
    </td>
  </tr>

  <tr>
    <td align="left" valign="middle">
      Round off
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      {(Math.round(Number(invoiceData?.NetFare || 0)) - Number(invoiceData?.NetFare || 0)).toFixed(2)}
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
        Net Amount
      </strong>
    </td>
    <td>&nbsp;</td>
    <td align="right" valign="middle">
      <strong style={{ fontSize: 14 }}>
        Rs. {Number(invoiceData?.NetFare || 0).toFixed(2)}
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
                                This is computer generated invoice signature not
                                required
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                All cases disputes are subject to Airfine
                                Approval. 3) Refund Cancellation are subject to
                                Airfine Approval
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                Kindly check all details carefully to avoid
                                unnecessary complications.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                Cheque must be drawn in favour of TripCliber.
                              </li>
                              <li style={{ marginBottom: 4 }}>
                                Late Payment Interest @24% per 24 annual will be
                                charged on all outstanding bill after due date.
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
          "\n            .noPrint {\n                margin: 5px 0 30px 0;\n                font-size: 14px;\n                padding: 10px 30px;\n                background: #0e6fbd;\n                color: #ffffff;\n                border: 0;\n                border-radius: 2px;\n                cursor:pointer;\n            }\n            @media print {\n                .noPrint {\n                    display: none;\n                }\n            }\n        "
      }}
    />
    <Footer2/>
  </div>
  );
};

export default Invoice;

