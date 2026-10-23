import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import { loadAgencyConfig } from "../util/loadConfig";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ✅ web.config se PortalId
  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  const emptyForm = {
    couponCode: "",
    description: "",
    discountType: "Fixed",
    discountValue: "",
    minimumAmount: "",
    maximumDiscount: "",
    startDate: "",
    expiryDate: "",
    usageLimit: "",
    portalId: "", // config load hone ke baad set hoga
  };
  const [form, setForm] = useState(emptyForm);

  // Config load
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          PortalId: cfg.PortalId || "",
        });
        // form me default PortalId set
        setForm((prev) => ({
          ...prev,
          portalId: cfg.PortalId || "",
        }));
      } catch (err) {
        console.error("Config load failed:", err);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  // Demo coupon list
  const loadDemoCoupons = () => {
    setLoading(true);
    setCoupons([
      {
        couponId: 1,
        couponCode: "FLAT500",
        description: "Flat 500 off",
        discountType: "Fixed",
        discountValue: 500,
        minimumAmount: 3000,
        maximumDiscount: 500,
        startDate: "2026-09-24T00:00:00",
        expiryDate: "2026-12-31T23:59:59",
        usageLimit: 100,
        portalId: 1,
      },
      {
        couponId: 2,
        couponCode: "SAVE10",
        description: "10% off on Hotel Bookings",
        discountType: "Percentage",
        discountValue: 10,
        minimumAmount: 2000,
        maximumDiscount: 1000,
        startDate: "2026-09-01T00:00:00",
        expiryDate: "2026-10-31T23:59:59",
        usageLimit: 50,
        portalId: 1,
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadDemoCoupons();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getStatus = (expiryDate) => {
    if (!expiryDate) return "Active";
    return new Date(expiryDate) >= new Date() ? "Active" : "Expired";
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.couponCode.trim()) return "Coupon code is required";
    if (!form.description.trim()) return "description is required";
    if (!form.discountValue || Number(form.discountValue) <= 0)
      return "Discount value must be greater than 0";
    if (!form.minimumAmount) return "minimum amount is required";
    if (!form.maximumDiscount) return "Maximum discount is required";
    if (!form.startDate || !form.expiryDate)
      return "Start and expiry dates are required";
    if (new Date(form.expiryDate) < new Date(form.startDate))
      return "Expiry date cannot be before start date";
    if (!form.usageLimit) return "Usage limit is required";
    // ✅ PortalId config se aana chahiye
    if (!config.PortalId && !form.portalId) return "Portal ID missing from config";
    return "";
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }
    setFormError("");

    const payload = {
      couponId: Date.now(),
      couponCode: form.couponCode.trim().toUpperCase(),
      description: form.description.trim(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minimumAmount: Number(form.minimumAmount),
      maximumDiscount: Number(form.maximumDiscount),
      startDate: form.startDate,
      expiryDate: form.expiryDate,
      usageLimit: Number(form.usageLimit),
      // ✅ hamesha config se
      portalId: Number(config.PortalId || form.portalId),
    };

    setSaving(true);
    setCoupons((prev) => [payload, ...prev]);
    // reset form but keep PortalId from config
    setForm({
      ...emptyForm,
      portalId: config.PortalId || "",
    });
    setShowModal(false);
    setSaving(false);
  };

  const colors = {
    primary: "#eb2026",
    navy: "#003580",
    bg: "#f4f6fa",
    border: "#e6e9f0",
    text: "#1a1a1a",
    muted: "#6b7280",
    success: "#0f9d58",
    successBg: "#e6f6ec",
    expiredBg: "#fdecec",
  };

  if (loadingConfig) {
    return (
      <div style={{ display: "flex", background: colors.bg, minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ textAlign: "center", padding: 40 }}>Loading Config...</h3>
          <Footer2 />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", background: colors.bg, minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 28px", flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 20, color: colors.text }}>
                Coupon List
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: colors.muted }}>
                {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} total
                {config.PortalId ? ` · Portal ${config.PortalId}` : ""}
              </p>
            </div>
            <button
              onClick={() => {
                setForm({
                  ...emptyForm,
                  portalId: config.PortalId || "",
                });
                setFormError("");
                setShowModal(true);
              }}
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "9px 18px",
                background: colors.primary,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              + Add Coupon
            </button>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: colors.muted,
                }}
              >
                Loading coupons...
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                  }}
                >
                  <thead>
                    <tr style={{ background: colors.navy }}>
                      {[
                        "Coupon Code",
                        "Description",
                        "Type",
                        "Value",
                        "Min. Amount",
                        "Max. Discount",
                        "Valid From",
                        "Expires On",
                        "Usage Limit",
                        "Portal ID",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "10px 12px",
                            color: "#fff",
                            textAlign: "left",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.length === 0 ? (
                      <tr>
                        <td
                          colSpan={11}
                          style={{
                            padding: 24,
                            textAlign: "center",
                            color: colors.muted,
                          }}
                        >
                          No coupons found
                        </td>
                      </tr>
                    ) : (
                      coupons.map((c, i) => {
                        const status = getStatus(c.expiryDate);
                        return (
                          <tr
                            key={c.couponId ?? i}
                            style={{
                              borderBottom: `1px solid ${colors.border}`,
                              background: i % 2 === 0 ? "#fff" : "#fafbfd",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px 12px",
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: colors.navy,
                              }}
                            >
                              {c.couponCode}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {c.description}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {c.discountType}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {c.discountType === "Percentage"
                                ? `${c.discountValue}%`
                                : `₹${c.discountValue}`}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              ₹{c.minimumAmount}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              ₹{c.maximumDiscount}
                            </td>
                            <td
                              style={{
                                padding: "10px 12px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatDate(c.startDate)}
                            </td>
                            <td
                              style={{
                                padding: "10px 12px",
                                whiteSpace: "nowrap",
                                color: colors.primary,
                              }}
                            >
                              {formatDate(c.expiryDate)}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {c.usageLimit}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {c.portalId}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              <span
                                style={{
                                  padding: "2px 10px",
                                  borderRadius: 12,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  background:
                                    status === "Active"
                                      ? colors.successBg
                                      : colors.expiredBg,
                                  color:
                                    status === "Active"
                                      ? colors.success
                                      : colors.primary,
                                }}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Footer2 />
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              width: 540,
              maxWidth: "92%",
              maxHeight: "88vh",
              overflowY: "auto",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div
              style={{
                background: colors.navy,
                color: "#fff",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: 15 }}>Add New Coupon</strong>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCoupon} style={{ padding: 20 }}>
              {formError && (
                <div
                  style={{
                    background: colors.expiredBg,
                    color: colors.primary,
                    fontSize: 12,
                    padding: "8px 12px",
                    borderRadius: 4,
                    marginBottom: 14,
                  }}
                >
                  {formError}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <Field
                  label="Coupon Code"
                  name="couponCode"
                  value={form.couponCode}
                  onChange={handleFormChange}
                  placeholder="FLAT500"
                  required
                />

                {/* ✅ Portal ID — config se, read-only */}
                <label style={{ display: "block", fontSize: 12, color: "#374151" }}>
                  <span
                    style={{
                      display: "block",
                      marginBottom: 4,
                      fontWeight: 600,
                    }}
                  >
                    Portal ID
                  </span>
                  <input
                    type="text"
                    value={config.PortalId || form.portalId || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "1px solid #e6e9f0",
                      fontSize: 13,
                      boxSizing: "border-box",
                      background: "#f4f6fa",
                      color: "#6b7280",
                    }}
                  />
                </label>

                <div style={{ gridColumn: "1 / -1" }}>
                  <Field
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Flat 500 off"
                    required
                  />
                </div>

                <Field
                  label="Discount Type"
                  name="discountType"
                  value={form.discountType}
                  onChange={handleFormChange}
                  as="select"
                  options={["Fixed", "Percentage"]}
                />
                <Field
                  label="Discount Value"
                  name="discountValue"
                  value={form.discountValue}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="500"
                  required
                />

                <Field
                  label="Minimum Amount"
                  name="minimumAmount"
                  value={form.minimumAmount}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="3000"
                  required
                />
                <Field
                  label="Maximum Discount"
                  name="maximumDiscount"
                  value={form.maximumDiscount}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="500"
                  required
                />

                <Field
                  label="Valid From"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleFormChange}
                  type="date"
                  required
                />
                <Field
                  label="Expires On"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleFormChange}
                  type="date"
                  required
                />

                <Field
                  label="Usage Limit"
                  name="usageLimit"
                  value={form.usageLimit}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="100"
                  required
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormError("");
                  }}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 4,
                    border: `1px solid ${colors.border}`,
                    background: "#fff",
                    color: colors.text,
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 4,
                    border: "none",
                    background: colors.primary,
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  as,
  options,
  required,
  placeholder,
}) => (
  <label style={{ display: "block", fontSize: 12, color: "#374151" }}>
    <span style={{ display: "block", marginBottom: 4, fontWeight: 600 }}>
      {label}
    </span>
    {as === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 4,
          border: "1px solid #e6e9f0",
          fontSize: 13,
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 4,
          border: "1px solid #e6e9f0",
          fontSize: 13,
          boxSizing: "border-box",
        }}
      />
    )}
  </label>
);

export default CouponList;