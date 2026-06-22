import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { txnId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ DEFINE FUNCTION FIRST (BEFORE useEffect)
  const getInvoice = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching invoice for txnId:", txnId);
      debugger; // ✅ NOW THIS WILL RUN

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
      debugger; // ✅ WILL STOP HERE when data arrives

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
  if (!invoiceData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>No invoice data available</h3>
      </div>
    );
  }

  return (
    <>
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
            maxWidth: 1100,
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
                  style={{
                    margin: "0 auto",
                    background: "#fff",
                    borderRadius: 13,
                  }}
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
                            marginTop: "2%",
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
                                            margin: "5px 0",
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
                                            color: "#666666",
                                            width: 400,
                                            margin: "5px 0",
                                          }}
                                        >
                                          <span>+91 98104 37029</span> |
                                          <span>account@tripcaliber.com</span>
                                        </p>
                                        <p
                                          style={{
                                            fontSize: 11,
                                            color: "#666666",
                                            width: 300,
                                            margin: "5px 0",
                                          }}
                                        >
                                          <strong>GST No:</strong>
                                          <span>AKSASF321SADF</span>
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
                            marginTop: 20,
                          }}
                        >
                          <tbody>
                            <tr>
                              <td width="100%">
                                <table
                                  cellPadding={4}
                                  style={{ marginTop: 0, width: "100%" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td width={120}>
                                        <strong>Invoice No.</strong>
                                      </td>
                                      <td>
                                        {invoiceData.InvoiceNumber || "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Invoice Date</strong>
                                      </td>
                                      <td>
                                        {invoiceData.InvoiceDate || "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>PNR No.</strong>
                                      </td>
                                      <td>{invoiceData.AirlinePnr || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Booked By</strong>
                                      </td>
                                      <td>
                                        {invoiceData.BookedBy || "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Buyer Email Id</strong>
                                      </td>
                                      <td>
                                        {invoiceData.AgencyDetails?.EmailId ||
                                          "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Buyer GSTIN No.</strong>
                                      </td>
                                      <td>
                                        {invoiceData.AgencyDetails
                                          ?.GSTNNumber || "N/A"}
                                      </td>
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
                            fontFamily: "tahoma",
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
                                          style={{
                                            fontSize: 12,
                                            marginTop: 5,
                                          }}
                                        >
                                          <thead>
                                            <tr>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Ticket No.</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>
                                                  Passenger Name
                                                </strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Travel Date</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Description</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Basic Fare</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>YQ Tax</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Taxes</strong>
                                              </th>
                                              <th
                                                style={{
                                                  backgroundColor: "#bedff1",
                                                }}
                                              >
                                                <strong>Total</strong>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr
                                              style={{ paddingBottom: "2%" }}
                                            >
                                              <td>G88BGI</td>
                                              <td>Mr. LOKESH SHARMA</td>
                                              <td>10/07/2024</td>
                                              <td>
                                                SG-8171 DEL-GOX
                                                <br />
                                                10/07/2024
                                              </td>
                                              <td>3970</td>
                                              <td>0</td>
                                              <td>1182</td>
                                              <td>5152</td>
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
                          cellPadding={10}
                          style={{
                            margin: "2% auto",
                            backgroundColor: "#fff",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td width="50%" align="left" valign="top">
                                <strong
                                  style={{
                                    fontSize: 15,
                                    color: "#1f91cd",
                                  }}
                                >
                                  Amount in word
                                </strong>
                                <br />
                                <strong style={{ fontSize: 13 }}>
                                  (INR Four thousand, nine hundred seventy-two and
                                  00 Paisa)
                                </strong>
                              </td>
                              <td align="left" valign="top">
                                <table
                                  width="100%"
                                  border={0}
                                  style={{
                                    fontFamily: "Tahoma, Geneva, sans-serif",
                                    fontSize: 11,
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td align="left" valign="middle">
                                        <strong
                                          style={{
                                            fontSize: 15,
                                            color: "#1f91cd",
                                          }}
                                        >
                                          Fare Details
                                        </strong>
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        <strong
                                          style={{
                                            fontSize: 15,
                                            color: "#1f91cd",
                                          }}
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
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Meal Charge(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Seat Charge(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Total Amount
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        5152.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Commission(-)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        202.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Discount(-)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Gross Amount
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        4950.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Service Charge(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        10.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        TDS(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        10.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        CGST @ 0%(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        SGST @ 0%(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.00
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        IGST @ 18%(+)
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        1.80
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Round off
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        0.20
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3}>
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
                                          Rs. 4972.00
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
                            color: "#5f6061",
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
                                  paddingBottom: 2,
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
                                    Approval. Refund Cancellation are subject to
                                    Airfine Approval
                                  </li>
                                  <li style={{ marginBottom: 4 }}>
                                    Kindly check all details carefully to avoid
                                    unnecessary complications.
                                  </li>
                                  <li style={{ marginBottom: 4 }}>
                                    Cheque must be drawn in favour of TripCaliber.
                                  </li>
                                  <li style={{ marginBottom: 4 }}>
                                    Late Payment Interest @24% per annum will be
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
          <button
            onClick={() => window.print()}
            className="noPrint"
            style={{
              margin: "5px 0 30px 0",
              fontSize: "14px",
              padding: "10px 30px",
              background: "#0e6fbd",
              color: "#ffffff",
              border: 0,
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            🖨️ Print
          </button>
        </div>
      </div>
    </>
  );
};

export default Invoice;