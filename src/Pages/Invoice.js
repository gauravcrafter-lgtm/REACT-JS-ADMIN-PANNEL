import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import { loadAgencyConfig } from "../util/loadConfig";

const Invoice = () => {
  const { txnId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pax, setPax] = useState(1);

  // ✅ web.config se
  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [configReady, setConfigReady] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          PortalId: cfg.PortalId || "",
        });
        setConfigReady(true);
      } catch (err) {
        console.error("Config load failed:", err);
        setError("Config load failed. Please refresh.");
        setLoading(false);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const getInvoice = async () => {
    if (!config.AgencyKey || !config.PortalId) {
      setError("AgencyKey / PortalId missing from config");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Fetching invoice for txnId:", txnId);

      const payload = {
        APIRequestType: 4,
        TxnId: txnId,
        AgencyKey: config.AgencyKey,           // ✅ config se
        IsGenerated: false,
        IsAssigned: false,
        EmailId: null,
        BookingType: null,
        PortalId: Number(config.PortalId),     // ✅ config se
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
    } catch (err) {
      console.error("❌ Error fetching invoice:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Config ready + txnId dono hone par fetch
  useEffect(() => {
    if (configReady && txnId) {
      console.log("📍 useEffect triggered with txnId:", txnId);
      getInvoice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configReady, txnId]);

  if (loadingConfig || loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "18px" }}>
        <h3>⏳ Loading Invoice...</h3>
      </div>
    );
  }

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

  const additionalCharges =
    (Number(invoiceData?.ServiceCharge) || 0) +
    (Number(invoiceData?.TDS) || 0) +
    (Number(invoiceData?.CGST) || 0) +
    (Number(invoiceData?.SGST) || 0) +
    (Number(invoiceData?.IGST) || 0);

  const grossAmount = Number(invoiceData?.NetFare) || 0;
  const finalNetAmount = grossAmount + additionalCharges;
  const roundedNetAmount = Math.round(finalNetAmount);
  const roundOff = roundedNetAmount - finalNetAmount;

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
                              <img src="tripcaliber.png" alt="logo" width={160} />
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
                                      <strong
                                        style={{ fontSize: 18, margin: 0 }}
                                      >
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
                                          {invoiceData?.HostAddress}
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
                                        <span>{invoiceData?.HostMobile}</span>{" "}
                                        <span>{invoiceData?.HostEmail}</span>
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
                                        <span>
                                          {invoiceData?.GSTNo || "-"}
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
                                        invoiceData?.AgencyDetails
                                          ?.AgencyName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Buyer Email Id</strong>
                                    </td>
                                    <td>
                                      {invoiceData?.AgencyDetails?.EmailId}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Buyer GSTIN No.</strong>
                                    </td>
                                    <td>
                                      {
                                        invoiceData?.AgencyDetails
                                          ?.GSTNNumber
                                      }
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
                                            <th bgcolor="#bedff1">
                                              <strong>Ticket No.</strong>
                                            </th>
                                            <th bgcolor="#bedff1">
                                              <strong>
                                                Passenger Name
                                              </strong>
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
                                          {invoiceData?.PaxList?.map(
                                            (paxItem, index) => (
                                              <tr
                                                key={index}
                                                style={{
                                                  paddingBottom: "2%",
                                                }}
                                              >
                                                <td>
                                                  <span>
                                                    {paxItem?.TicketNumber}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.PaxName}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.TravelDate}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.AirlineCode}-
                                                    {paxItem?.FlightNumber}
                                                    <br />
                                                    {paxItem?.BookedSector}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.PaxFare}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.PaxYQ}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.FareTax}
                                                  </span>
                                                </td>
                                                <td>
                                                  <span>
                                                    {paxItem?.TotalPaxFare}
                                                  </span>
                                                </td>
                                              </tr>
                                            )
                                          )}
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
                                style={{ fontSize: 15, color: "#1f91cd" }}
                              >
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
                                  fontFamily:
                                    "Tahoma, Geneva, sans-serif",
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
                                      {Number(
                                        invoiceData?.PriceBaggage || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Meal Charge(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.PriceMeal || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Seat Charge(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.PriceSeat || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Total Amount
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.TotalFare || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Commission(-)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.Discount || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Discount(-)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.DiscountOnPromo || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Gross Amount
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.NetFare || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Service Charge(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.ServiceCharge || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      TDS(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.TDS || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      CGST @ 0%(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.CGST || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      SGST @ 0%(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.SGST || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      IGST @ 18%(+)
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {Number(
                                        invoiceData?.IGST || 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="middle">
                                      Round off
                                    </td>
                                    <td>&nbsp;</td>
                                    <td align="right" valign="middle">
                                      {roundOff.toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={3}
                                      align="left"
                                      valign="middle"
                                    >
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
                                        Rs. {roundedNetAmount.toFixed(2)}
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
                                fontFamily:
                                  "Tahoma, Geneva, sans-serif",
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
                                  This is computer generated invoice
                                  signature not required
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  All cases disputes are subject to
                                  Airfine Approval. 3) Refund
                                  Cancellation are subject to Airfine
                                  Approval
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  Kindly check all details carefully to
                                  avoid unnecessary complications.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  Cheque must be drawn in favour of
                                  TripCliber.
                                </li>
                                <li style={{ marginBottom: 4 }}>
                                  Late Payment Interest @24% per 24
                                  annual will be charged on all
                                  outstanding bill after due date.
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
        <button onClick={() => window.print()} className="noPrint">
          Print
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .noPrint {
              margin: 5px 0 30px 0;
              font-size: 14px;
              padding: 10px 30px;
              background: #0e6fbd;
              color: #ffffff;
              border: 0;
              border-radius: 2px;
              cursor: pointer;
            }
            @media print {
              .noPrint {
                display: none;
              }
            }
          `,
        }}
      />
      <Footer2 />
    </div>
  );
};

export default Invoice;