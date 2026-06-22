import React from 'react'
import Dashboard from './Dashboard'
import Sidebar from "./Sidebar"; // 👈 Sidebar import
import Footer2 from './Footer2';


export default function Edit() {
  
  return (
    <div>
  <div className="container">
     {/* ✅ Sidebar */}
          <Sidebar />
   
  <div>
    <form
      action="/BizAdminLogin/UpdateFlightBookingDetails"
      data-ajax="true"
      data-ajax-failure="OnFailure"
      data-ajax-method="POST"
      data-ajax-success="OnSuccess"
      id="form0"
      method="post"
    >
      {" "}
      <div className="printable">
        <table
          style={{
            border: "1px solid #d1d1d1",
            fontFamily: "Tahoma, Geneva, sans-serif",
            borderRadius: 4,
            margin: "0 auto 10px",
            background: "#fff",
            overflow: "hidden",
            width: "100%"
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
                    borderRadius: 13
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
                            marginTop: "2%"
                          }}
                        >
                          <tbody>
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
                                <span> Sunday, 05 April 2026 </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <input
                          type="hidden"
                          name="TransactionId"
                          defaultValue={1908}
                        />
                        <input
                          type="hidden"
                          name="BookingId"
                          defaultValue="FLY050420261908"
                        />
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
                                      <td>FLY050420261908</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Ticket Status</strong>
                                      </td>
                                      <td>Pending</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <input
                                  type="hidden"
                                  name="BookingStatusV2"
                                  defaultValue={4}
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
                                      <td
                                        bgcolor="#bedff1"
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <strong>Airline/Flight No.</strong>
                                      </td>
                                      <td
                                        bgcolor="#bedff1"
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <strong>Departure</strong>
                                      </td>
                                      <td
                                        bgcolor="#bedff1"
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <strong>Arrival</strong>
                                      </td>
                                      <td
                                        bgcolor="#bedff1"
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <strong>Class</strong>
                                      </td>
                                      <td
                                        bgcolor="#bedff1"
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <strong>Pnr</strong>
                                      </td>
                                    </tr>
                                    <tr style={{ paddingBottom: "2%" }}>
                                      <td
                                        width={150}
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <table cellPadding={2}>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <img src="/assets/Flight_Images/QP.gif" />
                                              </td>
                                              <td>
                                                <span>Akasa Air</span>
                                                <br />
                                                <span>QP-1831</span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <span />
                                        &nbsp;<span>[DEL]</span>
                                        <br />
                                        <span>14/04/2026</span>&nbsp;
                                        <span>06:50</span>
                                      </td>
                                      <td
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <span />
                                        &nbsp;<span>[NMI]</span>
                                        <br />
                                        <span>14/04/2026</span>&nbsp;
                                        <span>09:10</span>
                                      </td>
                                      <td
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <span>Economy</span>
                                      </td>
                                      <td
                                        style={{ border: "1px solid #111111" }}
                                      >
                                        <input
                                          type="text"
                                          className="form-control editclass"
                                          name="AirlinePnr"
                                          defaultValue=""
                                          required=""
                                          style={{ border: "1px solid" }}
                                        />
                                      </td>
                                    </tr>
                                    <input
                                      type="hidden"
                                      name="EngineId"
                                      defaultValue={33}
                                    />
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
                                          style={{
                                            color: "#1f91cd",
                                            fontSize: 15
                                          }}
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
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Passenger Name</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>bag[Cabin]</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>bag[CheckIn]</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Meal</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Baggage</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Seat</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Refundable</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Ticket No.</strong>
                                              </td>
                                              <td
                                                bgcolor="#bedff1"
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <strong>Status</strong>
                                              </td>
                                            </tr>
                                            <input
                                              type="hidden"
                                              name="PaxTickets[0].PaxId"
                                              defaultValue={3477999}
                                            />
                                            <input
                                              type="hidden"
                                              name="PaxTickets[0].FirstName"
                                              defaultValue="DFSDF"
                                            />
                                            <input
                                              type="hidden"
                                              name="PaxTickets[0].LastName"
                                              defaultValue="SDFSD"
                                            />
                                            <tr style={{ paddingBottom: "2%" }}>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span>Mr</span>{" "}
                                                <span>DFSDF SDFSD</span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span>7 KG</span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span>15 Kg</span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span> - </span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span> --15 Kg|7 Kg KG</span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span> - </span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <span>True</span>
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <input
                                                  type="text"
                                                  className="form-control editclass"
                                                  name="PaxTickets[0].TicketNumber"
                                                  defaultValue=""
                                                  required=""
                                                  style={{
                                                    border: "1px solid"
                                                  }}
                                                />
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid #111111"
                                                }}
                                              >
                                                <select
                                                  className="form-control editclass"
                                                  name="PaxTickets[0].PaxBookingStatus"
                                                  required=""
                                                  style={{
                                                    border: "1px solid"
                                                  }}
                                                >
                                                  <option value={1}>
                                                    Booked
                                                  </option>
                                                  <option value={0} selected="">
                                                    Pending
                                                  </option>
                                                  <option value={2}>
                                                    Reject
                                                  </option>
                                                </select>
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
                              <td width="100%" align="center" valign="top">
                                <table
                                  width="97%"
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
                                          style={{
                                            fontSize: 15,
                                            color: "#1f91cd"
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
                                            color: "#1f91cd"
                                          }}
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
                                        Rs.4650.0
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Other Charges :
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        Rs. 1724.0
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" valign="middle">
                                        Discount :
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        Rs. 0.0
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
                                          Total
                                        </strong>
                                      </td>
                                      <td>&nbsp;</td>
                                      <td align="right" valign="middle">
                                        <strong style={{ fontSize: 14 }}>
                                          Rs. 6374.0
                                        </strong>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="button"
          onclick="ChangetoEdit()"
          className="btn btn-primary noPrint editbtn d-none"
          defaultValue="Edit"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <input
          type="submit"
          className="btn btn-primary noPrint editclasssdsf"
          defaultValue="Update"
        />
      </div>
    </form>{" "}
  </div>
 
 </div>
<Footer2/>
</div>

  )
}




