// import React, { useState, useEffect, useCallback } from "react";
// import Sidebar from "./Sidebar";
// import Footer2 from "./Footer2";
// import { loadAgencyConfig } from "../util/loadConfig";

// // ==== CONFIG ====
// const GET_OFFLINE_TICKET_API = process.env.REACT_APP_HOTEL_TICKET_API;
// const GET_BOOKING_LIST_API = process.env.REACT_APP_HOTEL_BOOKING_LIST_API;
// const UPDATE_BOOKING_API =
//   "https://api.hotel.namantechnolab.com/api/Static/UpdateAdminBooking";
// const UPDATE_BOOKING_METHOD = "PUT";

// // ==== STATUS MAP ====
// const LIST_STATUS_MAP = {
//   1: "Confirmed",
//   4: "Pending",
//   6: "Cancelled",
// };
// const getListStatusLabel = (bookingStatus) =>
//   LIST_STATUS_MAP[bookingStatus] || "Pending";

// const EDIT_STATUS_OPTIONS = [
//   { value: 1, label: "Confirmed" },
//   { value: 4, label: "Pending" },
//   { value: 6, label: "Cancelled" },
// ];

// const getTicketStatusLabel = (bookingStatus) => {
//   if (bookingStatus === 1) return "Confirmed";
//   if (bookingStatus === 0) return "Pending";
//   return "Cancelled";
// };

// const badgeClass = {
//   Confirmed: "hbh-badge hbh-badge-booked",
//   Pending: "hbh-badge hbh-badge-pending",
//   Cancelled: "hbh-badge hbh-badge-cancelled",
// };

// const formatDate = (isoStr) => {
//   if (!isoStr || isoStr.startsWith("0001")) return "-";
//   const d = new Date(isoStr);
//   if (isNaN(d.getTime())) return "-";
//   return d.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const toLocalYMD = (d) => {
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const toInputDate = (isoStr) => {
//   if (!isoStr || isoStr.startsWith("0001")) return "";
//   const d = new Date(isoStr);
//   if (isNaN(d.getTime())) return "";
//   return toLocalYMD(d);
// };

// const getDefaultDateRange = () => {
//   const to = new Date();
//   const from = new Date();
//   from.setDate(from.getDate() - 30);
//   return { from: toLocalYMD(from), to: toLocalYMD(to) };
// };

// const HBH_STYLES = `
// .hbh-page {
//   min-height: 100vh;
//   background: #f3f5f9;
//   padding: 24px 24px 24px 214px;
//   font-family: "Segoe UI", Roboto, Arial, sans-serif;
//   color: #1e293b;
//   box-sizing: border-box;
// }
// .hbh-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: #eef1f6;
//   border-radius: 14px;
//   padding: 22px 26px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
//   gap: 16px;
// }
// .hbh-header h1 {
//   font-size: 24px;
//   font-weight: 700;
//   margin: 0;
//   color: #0f172a;
// }
// .hbh-header p {
//   font-size: 13px;
//   color: #64748b;
//   margin: 4px 0 0;
// }
// .hbh-stats {
//   display: flex;
//   gap: 12px;
// }
// .hbh-stat-card {
//   background: #ffffff;
//   border-radius: 10px;
//   padding: 8px 20px;
//   text-align: center;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
//   min-width: 80px;
// }
// .hbh-stat-label {
//   font-size: 11px;
//   letter-spacing: 0.05em;
//   color: #94a3b8;
//   font-weight: 600;
// }
// .hbh-stat-value {
//   font-size: 20px;
//   font-weight: 700;
// }
// .hbh-stat-value.total { color: #2563eb; }
// .hbh-stat-value.booked { color: #16a34a; }
// .hbh-stat-value.pending { color: #d97706; }
// .hbh-card {
//   background: #ffffff;
//   border-radius: 14px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
//   margin-bottom: 20px;
// }
// .hbh-filter-card {
//   padding: 22px 26px;
// }
// .hbh-filter-title {
//   font-size: 11px;
//   letter-spacing: 0.05em;
//   color: #94a3b8;
//   font-weight: 700;
//   margin-bottom: 16px;
// }
// .hbh-filter-row {
//   display: flex;
//   align-items: flex-end;
//   gap: 16px;
//   flex-wrap: wrap;
// }
// .hbh-field {
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// }
// .hbh-field label {
//   font-size: 13px;
//   font-weight: 600;
//   color: #334155;
// }
// .hbh-field input,
// .hbh-field select {
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   padding: 9px 12px;
//   font-size: 13px;
//   color: #1e293b;
//   outline: none;
//   min-width: 150px;
//   background: #fff;
// }
// .hbh-field input:focus,
// .hbh-field select:focus {
//   border-color: #2563eb;
//   box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
// }
// .hbh-field input::placeholder {
//   color: #b8c2d1;
// }
// .hbh-actions {
//   display: flex;
//   gap: 10px;
//   margin-left: auto;
// }
// .hbh-btn {
//   border: none;
//   border-radius: 8px;
//   padding: 9px 16px;
//   font-size: 13px;
//   font-weight: 600;
//   cursor: pointer;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   white-space: nowrap;
// }
// .hbh-btn:disabled {
//   opacity: 0.6;
//   cursor: not-allowed;
// }
// .hbh-btn-primary {
//   background: #2563eb;
//   color: #fff;
// }
// .hbh-btn-primary:hover:not(:disabled) {
//   background: #1d4ed8;
// }
// .hbh-btn-outline {
//   background: #fff;
//   border: 1px solid #e2e8f0;
//   color: #475569;
// }
// .hbh-btn-outline:hover:not(:disabled) {
//   background: #f8fafc;
// }
// .hbh-table-card {
//   overflow: hidden;
// }
// .hbh-table-header {
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   padding: 16px 26px;
//   gap: 16px;
//   flex-wrap: wrap;
// }
// .hbh-table-count {
//   font-size: 13px;
//   color: #334155;
// }
// .hbh-table-count b {
//   font-weight: 700;
// }
// .hbh-table-hint {
//   font-size: 12px;
//   color: #b8c2d1;
// }
// .hbh-table-wrap {
//   overflow-x: auto;
// }
// .hbh-table {
//   width: 100%;
//   border-collapse: collapse;
//   font-size: 13px;
// }
// .hbh-table thead tr {
//   border-top: 1px solid #f1f5f9;
//   border-bottom: 1px solid #f1f5f9;
//   text-align: left;
// }
// .hbh-table th {
//   padding: 12px 20px;
//   font-size: 11px;
//   letter-spacing: 0.04em;
//   color: #94a3b8;
//   font-weight: 600;
//   white-space: nowrap;
// }
// .hbh-table td {
//   padding: 14px 20px;
//   border-bottom: 1px solid #f8fafc;
//   color: #334155;
//   white-space: nowrap;
// }
// .hbh-table tbody tr:hover {
//   background: #f8fafc;
// }
// .hbh-idx {
//   color: #94a3b8;
// }
// .hbh-hotel-name {
//   font-weight: 600;
//   color: #1e293b;
// }
// .hbh-booking-link {
//   color: #2563eb;
//   font-weight: 600;
// }
// .hbh-badge {
//   display: inline-block;
//   padding: 4px 12px;
//   border-radius: 999px;
//   font-size: 12px;
//   font-weight: 600;
// }
// .hbh-badge-booked {
//   background: #d1fae5;
//   color: #047857;
// }
// .hbh-badge-pending {
//   background: #fef3c7;
//   color: #b45309;
// }
// .hbh-badge-cancelled {
//   background: #fee2e2;
//   color: #b91c1c;
// }
// .hbh-row-btn {
//   border-radius: 6px;
//   padding: 6px 14px;
//   font-size: 12px;
//   font-weight: 600;
//   cursor: pointer;
//   border: 1px solid transparent;
// }
// .hbh-btn-ticket {
//   background: #f1f5f9;
//   color: #334155;
// }
// .hbh-btn-ticket:hover {
//   background: #e2e8f0;
// }
// .hbh-btn-edit {
//   background: #dbeafe;
//   color: #1d4ed8;
//   margin-left: 6px;
// }
// .hbh-btn-edit:hover {
//   background: #bfdbfe;
// }
// .hbh-empty {
//   text-align: center;
//   padding: 56px 20px;
//   color: #94a3b8;
// }
// .hbh-empty-icon {
//   font-size: 34px;
//   margin-bottom: 10px;
// }
// .hbh-empty-title {
//   font-size: 15px;
//   font-weight: 700;
//   color: #475569;
// }
// .hbh-modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(15, 23, 42, 0.45);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 999;
//   padding: 16px;
// }
// .hbh-modal {
//   background: #fff;
//   border-radius: 14px;
//   width: 100%;
//   max-width: 640px;
//   max-height: 90vh;
//   overflow-y: auto;
//   box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
// }
// .hbh-modal-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 18px 24px;
//   border-bottom: 1px solid #f1f5f9;
// }
// .hbh-modal-header h2 {
//   font-size: 16px;
//   margin: 0;
//   color: #1e293b;
// }
// .hbh-modal-close {
//   border: none;
//   background: none;
//   font-size: 22px;
//   line-height: 1;
//   color: #94a3b8;
//   cursor: pointer;
// }
// .hbh-modal-close:hover {
//   color: #475569;
// }
// .hbh-modal-body {
//   padding: 22px 24px;
// }
// .hbh-modal-loading,
// .hbh-modal-error {
//   text-align: center;
//   padding: 40px 0;
//   color: #94a3b8;
// }
// .hbh-modal-error {
//   color: #dc2626;
// }
// .hbh-page-loading {
//   text-align: center;
//   padding: 60px 20px;
//   color: #64748b;
//   font-size: 14px;
// }
// .hbh-edit-modal {
//   max-width: 560px;
// }
// .hbh-edit-header {
//   padding: 20px 24px;
//   border-bottom: 1px solid #f1f5f9;
//   background: linear-gradient(135deg, #eef2ff 0%, #eff6ff 100%);
//   border-radius: 14px 14px 0 0;
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
// }
// .hbh-edit-header-left {
//   display: flex;
//   gap: 12px;
//   align-items: flex-start;
// }
// .hbh-edit-header-icon {
//   width: 40px;
//   height: 40px;
//   border-radius: 10px;
//   background: #2563eb;
//   color: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
//   flex-shrink: 0;
// }
// .hbh-edit-header h2 {
//   font-size: 16px;
//   margin: 0;
//   color: #0f172a;
// }
// .hbh-edit-header-sub {
//   font-size: 12px;
//   color: #64748b;
//   margin-top: 3px;
// }
// .hbh-edit-header-sub b {
//   color: #334155;
// }
// .hbh-edit-body {
//   padding: 22px 24px 24px;
// }
// .hbh-edit-section-title {
//   font-size: 11px;
//   letter-spacing: 0.06em;
//   color: #94a3b8;
//   font-weight: 700;
//   margin: 0 0 12px;
//   text-transform: uppercase;
// }
// .hbh-edit-section-title:not(:first-child) {
//   margin-top: 22px;
// }
// .hbh-edit-form {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 14px 16px;
// }
// .hbh-edit-field {
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// }
// .hbh-edit-field.full {
//   grid-column: 1 / -1;
// }
// .hbh-edit-field label {
//   font-size: 12px;
//   font-weight: 600;
//   color: #334155;
//   display: flex;
//   align-items: center;
//   gap: 5px;
// }
// .hbh-edit-field input,
// .hbh-edit-field select {
//   border: 1.5px solid #e2e8f0;
//   border-radius: 9px;
//   padding: 10px 12px;
//   font-size: 13px;
//   color: #1e293b;
//   outline: none;
//   background: #fbfcfe;
//   transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
// }
// .hbh-edit-field input:hover,
// .hbh-edit-field select:hover {
//   border-color: #cbd5e1;
// }
// .hbh-edit-field input:focus,
// .hbh-edit-field select:focus {
//   border-color: #2563eb;
//   box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
//   background: #fff;
// }
// .hbh-edit-field input:disabled,
// .hbh-edit-field select:disabled {
//   background: #f1f5f9;
//   color: #94a3b8;
//   cursor: not-allowed;
// }
// .hbh-edit-amount-wrap {
//   position: relative;
// }
// .hbh-edit-amount-wrap span {
//   position: absolute;
//   left: 12px;
//   top: 50%;
//   transform: translateY(-50%);
//   font-size: 13px;
//   color: #94a3b8;
//   font-weight: 600;
// }
// .hbh-edit-amount-wrap input {
//   padding-left: 26px;
// }
// .hbh-status-pills {
//   display: flex;
//   gap: 8px;
//   grid-column: 1 / -1;
// }
// .hbh-status-pill {
//   flex: 1;
//   border: 1.5px solid #e2e8f0;
//   background: #fff;
//   border-radius: 9px;
//   padding: 9px 10px;
//   font-size: 12.5px;
//   font-weight: 600;
//   color: #64748b;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 6px;
//   transition: all 0.15s;
// }
// .hbh-status-pill:hover:not(:disabled) {
//   border-color: #cbd5e1;
// }
// .hbh-status-pill .dot {
//   width: 7px;
//   height: 7px;
//   border-radius: 50%;
//   background: #cbd5e1;
// }
// .hbh-status-pill.active-confirmed {
//   border-color: #16a34a;
//   background: #f0fdf4;
//   color: #047857;
// }
// .hbh-status-pill.active-confirmed .dot { background: #16a34a; }
// .hbh-status-pill.active-pending {
//   border-color: #d97706;
//   background: #fffbeb;
//   color: #b45309;
// }
// .hbh-status-pill.active-pending .dot { background: #d97706; }
// .hbh-status-pill.active-cancelled {
//   border-color: #dc2626;
//   background: #fef2f2;
//   color: #b91c1c;
// }
// .hbh-status-pill.active-cancelled .dot { background: #dc2626; }
// .hbh-status-pill:disabled {
//   cursor: not-allowed;
//   opacity: 0.7;
// }
// .hbh-edit-footer {
//   grid-column: 1 / -1;
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 8px;
//   padding-top: 18px;
//   border-top: 1px solid #f1f5f9;
// }
// .hbh-edit-msg {
//   grid-column: 1 / -1;
//   font-size: 13px;
//   font-weight: 500;
//   padding: 10px 14px;
//   border-radius: 9px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }
// .hbh-edit-msg.success {
//   background: #d1fae5;
//   color: #047857;
// }
// .hbh-edit-msg.error {
//   background: #fee2e2;
//   color: #b91c1c;
// }
// .hbh-voucher {
//   background: #fff;
// }
// .hbh-voucher-topbar {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 16px 24px;
//   border-bottom: 1px solid #f1f5f9;
// }
// .hbh-voucher-brand {
//   display: flex;
//   align-items: center;
//   font-size: 18px;
//   font-weight: 800;
//   color: #1e293b;
//   letter-spacing: 0.02em;
// }
// .hbh-voucher-qr {
//   width: 56px;
//   height: 56px;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
// }
// .hbh-voucher-pnr-row {
//   padding: 14px 24px 0;
// }
// .hbh-voucher-pnr {
//   font-size: 13px;
//   font-weight: 700;
//   color: #1e293b;
// }
// .hbh-voucher-status {
//   font-size: 13px;
//   font-weight: 700;
//   margin-top: 4px;
// }
// .hbh-voucher-status.confirmed { color: #16a34a; }
// .hbh-voucher-status.pending { color: #d97706; }
// .hbh-voucher-status.cancelled { color: #dc2626; }
// .hbh-voucher-box {
//   margin: 16px 24px 24px;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   overflow: hidden;
// }
// .hbh-voucher-box-head {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: #f8fafc;
//   padding: 10px 16px;
//   border-bottom: 1px solid #e2e8f0;
// }
// .hbh-voucher-box-head-title {
//   font-size: 13px;
//   font-weight: 700;
//   color: #94a3b8;
// }
// .hbh-voucher-box-head-date {
//   font-size: 12px;
//   color: #94a3b8;
// }
// .hbh-voucher-body {
//   display: flex;
//   gap: 16px;
//   padding: 16px;
// }
// .hbh-voucher-details {
//   flex: 1;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 10px;
// }
// .hbh-voucher-row {
//   display: flex;
//   gap: 8px;
//   font-size: 13px;
// }
// .hbh-voucher-row-label {
//   min-width: 130px;
//   font-weight: 700;
//   color: #1e293b;
// }
// .hbh-voucher-row-value {
//   color: #334155;
// }
// .hbh-voucher-booked-by {
//   width: 150px;
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   padding: 10px;
//   text-align: center;
//   font-size: 11px;
//   color: #64748b;
//   height: fit-content;
// }
// .hbh-voucher-booked-by b {
//   display: block;
//   font-size: 11px;
//   color: #1e293b;
//   margin-bottom: 6px;
// }
// .hbh-voucher-booked-by .txn {
//   margin-top: 8px;
//   font-weight: 700;
//   color: #2563eb;
//   font-size: 12px;
//   word-break: break-all;
// }
// .hbh-voucher-table-wrap {
//   padding: 0 16px 16px;
// }
// .hbh-voucher-table {
//   width: 100%;
//   border-collapse: collapse;
//   font-size: 12px;
// }
// .hbh-voucher-table th {
//   background: #f8fafc;
//   text-align: left;
//   padding: 8px 10px;
//   border: 1px solid #e2e8f0;
//   color: #475569;
//   font-weight: 700;
// }
// .hbh-voucher-table td {
//   padding: 8px 10px;
//   border: 1px solid #e2e8f0;
//   color: #334155;
// }
// .hbh-voucher-footer {
//   border-top: 1px solid #f1f5f9;
//   padding: 20px 24px;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 16px;
// }
// .hbh-voucher-footer-col h4 {
//   font-size: 12px;
//   color: #1e293b;
//   margin: 0 0 8px;
// }
// .hbh-voucher-footer-col a,
// .hbh-voucher-footer-col p {
//   display: block;
//   font-size: 11px;
//   color: #64748b;
//   margin-bottom: 6px;
//   text-decoration: none;
// }
// .hbh-voucher-social {
//   display: flex;
//   gap: 8px;
// }
// .hbh-voucher-social span {
//   width: 22px;
//   height: 22px;
//   border-radius: 50%;
//   background: #1e293b;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   color: #fff;
//   font-size: 11px;
// }
// .hbh-voucher-copyright {
//   border-top: 1px solid #f1f5f9;
//   padding: 12px 24px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 11px;
//   color: #94a3b8;
// }
// .hbh-logo {
//   height: 70px;
//   width: auto;
//   display: block;
//   object-fit: contain;
// }
// @media (max-width: 640px) {
//   .hbh-page {
//     padding-left: 24px;
//   }
//   .hbh-actions {
//     margin-left: 0;
//     width: 100%;
//   }
//   .hbh-stats {
//     width: 100%;
//     justify-content: space-between;
//   }
//   .hbh-voucher-body {
//     flex-direction: column;
//   }
//   .hbh-voucher-booked-by {
//     width: 100%;
//   }
//   .hbh-voucher-footer {
//     grid-template-columns: 1fr 1fr;
//   }
//   .hbh-edit-form {
//     grid-template-columns: 1fr;
//   }
// }
// `;

// async function fetchBookingList({
//   fromDate,
//   toDate,
//   bookingId,
//   pnr,
//   transactionId,
//   AgencyKey,
//   PortalId,
//   AdminKey,
// }) {
//   try {
//     const res = await fetch(GET_BOOKING_LIST_API, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         fromDate: fromDate || null,
//         toDate: toDate || null,
//         bookingId: bookingId || null,
//         pnr: pnr || null,
//         transactionId: transactionId || null,
//         AgencyKey: AgencyKey || null,
//         PortalId: PortalId ? Number(PortalId) : null,
//         AdminKey: AdminKey || null,
//       }),
//     });
//     if (!res.ok) return [];
//     const data = await res.json();

//     const list = Array.isArray(data)
//       ? data
//       : data?.Data ||
//         data?.data ||
//         data?.BookingList ||
//         data?.List ||
//         data?.Result ||
//         [];

//     return list;
//   } catch (err) {
//     return [];
//   }
// }

// async function fetchTicketById(transactionId) {
//   try {
//     const res = await fetch(
//       `${GET_OFFLINE_TICKET_API}?transactionId=${transactionId}`
//     );
//     if (!res.ok) return null;
//     const data = await res.json();
//     if (!data || !data.HotelName) return null;
//     return { ...data, TransactionId: data.TransactionId || transactionId };
//   } catch (err) {
//     return null;
//   }
// }

// async function updateAdminBooking(payload) {
//   console.log("[UpdateAdminBooking] sending payload:", payload);
//   try {
//     const res = await fetch(UPDATE_BOOKING_API, {
//       method: UPDATE_BOOKING_METHOD,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     console.log(
//       "[UpdateAdminBooking] HTTP status:",
//       res.status,
//       res.statusText
//     );

//     const rawText = await res.text();
//     console.log("[UpdateAdminBooking] raw response body:", rawText);

//     let data = null;
//     try {
//       data = rawText ? JSON.parse(rawText) : null;
//     } catch (parseErr) {
//       console.error(
//         "[UpdateAdminBooking] response JSON parse failed:",
//         parseErr
//       );
//       return {
//         IsSuccess: false,
//         Message: `Could not understand the server response (status ${res.status}). Check the console.`,
//       };
//     }

//     if (!res.ok) {
//       return {
//         IsSuccess: false,
//         Message:
//           (data && data.Message) || `Update fail (HTTP ${res.status}).`,
//       };
//     }

//     if (!data) {
//       return { IsSuccess: false, Message: "Server se khaali response aaya." };
//     }

//     return data;
//   } catch (err) {
//     console.error(
//       "[UpdateAdminBooking] fetch threw an error (likely CORS/network):",
//       err
//     );
//     return {
//       IsSuccess: false,
//       Message: "Network/CORS error. Console (F12) mein exact error dekho.",
//     };
//   }
// }

// export default function HotelBookingHistory() {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [bookingIdFilter, setBookingIdFilter] = useState("");
//   const [status, setStatus] = useState("All Status");

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadError, setLoadError] = useState("");

//   // ✅ web.config se
//   const [config, setConfig] = useState({
//     AgencyKey: "",
//     PortalId: "",
//     AdminKey: "",
//   });
//   const [loadingConfig, setLoadingConfig] = useState(true);
//   const [configReady, setConfigReady] = useState(false);

//   const [ticketModalOpen, setTicketModalOpen] = useState(false);
//   const [ticketLoading, setTicketLoading] = useState(false);
//   const [ticketError, setTicketError] = useState("");
//   const [ticketData, setTicketData] = useState(null);

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editSaving, setEditSaving] = useState(false);
//   const [editMsg, setEditMsg] = useState({ type: "", text: "" });
//   const [editForm, setEditForm] = useState({
//     transactionId: null,
//     pnr: "",
//     customerName: "",
//     checkInDate: "",
//     checkOutDate: "",
//     amount: "",
//     bookingStatus: 4,
//     hotelName: "",
//     bookingId: "",
//   });

//   useEffect(() => {
//     const fetchConfig = async () => {
//       try {
//         const cfg = await loadAgencyConfig();
//         setConfig({
//           AgencyKey: cfg.AgencyKey || "",
//           PortalId: cfg.PortalId || "",
//           AdminKey: cfg.AdminKey || "",
//         });
//         setConfigReady(true);
//       } catch (err) {
//         console.error("Config load failed:", err);
//         setLoadError("Config load failed. Please refresh.");
//       } finally {
//         setLoadingConfig(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const loadBookings = useCallback(
//     async (filters) => {
//       setLoading(true);
//       setLoadError("");
//       try {
//         const list = await fetchBookingList({
//           ...filters,
//           AgencyKey: config.AgencyKey,
//           PortalId: config.PortalId,
//           AdminKey: config.AdminKey,
//         });
//         setBookings(list);
//       } catch (err) {
//         setLoadError(
//           "Could not load bookings. Please check your connection and try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [config.AgencyKey, config.PortalId, config.AdminKey]
//   );

//   useEffect(() => {
//     if (!configReady) return;
//     const { from, to } = getDefaultDateRange();
//     setFromDate(from);
//     setToDate(to);
//     loadBookings({
//       fromDate: from,
//       toDate: to,
//       bookingId: null,
//       pnr: null,
//       transactionId: null,
//     });
//   }, [configReady, loadBookings]);

//   const filteredBookings = bookings.filter((b) => {
//     const matchesStatus =
//       status === "All Status"
//         ? true
//         : getListStatusLabel(b.BookingStatus) === status;

//     const idQuery = bookingIdFilter.trim().toLowerCase();
//     const matchesBookingId = idQuery
//       ? [b.BookingId, b.PNR, b.CustomerName]
//           .filter(Boolean)
//           .some((v) => String(v).toLowerCase().includes(idQuery))
//       : true;

//     let matchesDate = true;
//     if (b.CheckInDate && !String(b.CheckInDate).startsWith("0001")) {
//       const checkIn = new Date(b.CheckInDate);
//       if (!isNaN(checkIn.getTime())) {
//         if (fromDate)
//           matchesDate = matchesDate && checkIn >= new Date(fromDate);
//         if (toDate) matchesDate = matchesDate && checkIn <= new Date(toDate);
//       }
//     }

//     return matchesStatus && matchesBookingId && matchesDate;
//   });

//   const totalCount = filteredBookings.length;
//   const bookedCount = filteredBookings.filter(
//     (b) => getListStatusLabel(b.BookingStatus) === "Confirmed"
//   ).length;
//   const pendingCount = filteredBookings.filter(
//     (b) => getListStatusLabel(b.BookingStatus) === "Pending"
//   ).length;

//   const handleSearch = () => {
//     loadBookings({
//       fromDate: fromDate || null,
//       toDate: toDate || null,
//       bookingId: bookingIdFilter.trim() || null,
//       pnr: null,
//       transactionId: null,
//     });
//   };

//   const handleReset = () => {
//     const { from, to } = getDefaultDateRange();
//     setFromDate(from);
//     setToDate(to);
//     setBookingIdFilter("");
//     setStatus("All Status");
//     loadBookings({
//       fromDate: from,
//       toDate: to,
//       bookingId: null,
//       pnr: null,
//       transactionId: null,
//     });
//   };

//   const handleViewTicket = async (transactionId) => {
//     setTicketModalOpen(true);
//     setTicketLoading(true);
//     setTicketError("");
//     setTicketData(null);

//     const data = await fetchTicketById(transactionId);
//     if (data) {
//       setTicketData(data);
//     } else {
//       setTicketError("Could not load the ticket. Please try again.");
//     }
//     setTicketLoading(false);
//   };

//   const closeModal = () => {
//     setTicketModalOpen(false);
//     setTicketData(null);
//     setTicketError("");
//   };

//   const handleEditClick = (b) => {
//     setEditMsg({ type: "", text: "" });
//     setEditForm({
//       transactionId: b.TransactionId,
//       pnr: b.PNR || "",
//       customerName: b.CustomerName || "",
//       checkInDate: toInputDate(b.CheckInDate),
//       checkOutDate: toInputDate(b.CheckOutDate),
//       amount: b.Amount ?? "",
//       bookingStatus: b.BookingStatus ?? 4,
//       hotelName: b.HotelName || "",
//       bookingId: b.BookingId || "",
//     });
//     setEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     if (editSaving) return;
//     setEditModalOpen(false);
//     setEditMsg({ type: "", text: "" });
//   };

//   const handleEditFieldChange = (field, value) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEditSubmit = async () => {
//     setEditSaving(true);
//     setEditMsg({ type: "", text: "" });

//     const payload = {
//       transactionId: editForm.transactionId,
//       pnr: editForm.pnr.trim(),
//       customerName: editForm.customerName.trim(),
//       checkInDate: editForm.checkInDate,
//       checkOutDate: editForm.checkOutDate,
//       amount: Number(editForm.amount) || 0,
//       bookingStatus: Number(editForm.bookingStatus),
//       AgencyKey: config.AgencyKey || undefined,
//       PortalId: config.PortalId ? Number(config.PortalId) : undefined,
//       AdminKey: config.AdminKey || undefined,
//     };

//     const res = await updateAdminBooking(payload);

//     if (res.IsSuccess) {
//       setEditMsg({
//         type: "success",
//         text: res.Message || "Booking updated successfully.",
//       });

//       setBookings((prev) =>
//         prev.map((b) =>
//           b.TransactionId === editForm.transactionId
//             ? {
//                 ...b,
//                 PNR: payload.pnr,
//                 CustomerName: payload.customerName,
//                 CheckInDate: payload.checkInDate,
//                 CheckOutDate: payload.checkOutDate,
//                 Amount: payload.amount,
//                 BookingStatus: payload.bookingStatus,
//               }
//             : b
//         )
//       );

//       setTimeout(() => {
//         setEditModalOpen(false);
//         setEditMsg({ type: "", text: "" });
//       }, 1000);
//     } else {
//       setEditMsg({
//         type: "error",
//         text: res.Message || "Update failed. Please try again.",
//       });
//     }

//     setEditSaving(false);
//   };

//   const handleExportExcel = () => {
//     const headers = [
//       "#",
//       "Hotel Name",
//       "Booking ID",
//       "Passenger",
//       "Checkin",
//       "Checkout",
//       "Status",
//     ];
//     const rows = filteredBookings.map((b, idx) => [
//       idx + 1,
//       b.HotelName,
//       b.BookingId,
//       b.CustomerName,
//       formatDate(b.CheckInDate),
//       formatDate(b.CheckOutDate),
//       getListStatusLabel(b.BookingStatus),
//     ]);

//     const csvContent =
//       headers.join(",") +
//       "\n" +
//       rows.map((r) => r.map((cell) => `"${cell ?? ""}"`).join(",")).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "hotel_booking_history.csv";
//     link.click();
//   };

//   if (loadingConfig) {
//     return (
//       <div className="hbh-page">
//         <Sidebar />
//         <style>{HBH_STYLES}</style>
//         <div className="hbh-page-loading">Loading Config...</div>
//         <Footer2 />
//       </div>
//     );
//   }

//   return (
//     <div className="hbh-page">
//       <Sidebar />
//       <style>{HBH_STYLES}</style>

//       <div className="hbh-header">
//         <div>
//           <h1>Hotel Bookings</h1>
//           <p>Real-time overview of all hotel reservations</p>
//         </div>
//         <div className="hbh-stats">
//           <div className="hbh-stat-card">
//             <div className="hbh-stat-label">TOTAL</div>
//             <div className="hbh-stat-value total">{totalCount}</div>
//           </div>
//           <div className="hbh-stat-card">
//             <div className="hbh-stat-label">BOOKED</div>
//             <div className="hbh-stat-value booked">{bookedCount}</div>
//           </div>
//           <div className="hbh-stat-card">
//             <div className="hbh-stat-label">PENDING</div>
//             <div className="hbh-stat-value pending">{pendingCount}</div>
//           </div>
//         </div>
//       </div>

//       <div className="hbh-card hbh-filter-card">
//         <div className="hbh-filter-title">SEARCH &amp; FILTER</div>
//         <div className="hbh-filter-row">
//           <div className="hbh-field">
//             <label>From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
//           <div className="hbh-field">
//             <label>To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
//           <div className="hbh-field">
//             <label>Booking ID</label>
//             <input
//               type="text"
//               placeholder="e.g. TJ2088182184089"
//               value={bookingIdFilter}
//               onChange={(e) => setBookingIdFilter(e.target.value)}
//             />
//           </div>
//           <div className="hbh-field">
//             <label>Status</label>
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option>All Status</option>
//               <option>Confirmed</option>
//               <option>Pending</option>
//               <option>Cancelled</option>
//             </select>
//           </div>

//           <div className="hbh-actions">
//             <button
//               className="hbh-btn hbh-btn-primary"
//               onClick={handleExportExcel}
//               disabled={loading || filteredBookings.length === 0}
//             >
//               📊 Export Excel
//             </button>
//             <button
//               className="hbh-btn hbh-btn-primary"
//               onClick={handleSearch}
//               disabled={loading}
//             >
//               🔍 {loading ? "Searching..." : "Search"}
//             </button>
//             <button
//               className="hbh-btn hbh-btn-outline"
//               onClick={handleReset}
//               disabled={loading}
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="hbh-card hbh-table-card">
//         <div className="hbh-table-header">
//           <div>
//             <div className="hbh-table-count">
//               <b>{filteredBookings.length}</b> bookings found
//             </div>
//           </div>
//           <div className="hbh-table-hint">
//             Scroll horizontally on smaller screens
//           </div>
//         </div>

//         {loading ? (
//           <div className="hbh-page-loading">Loading bookings from API...</div>
//         ) : loadError ? (
//           <div className="hbh-page-loading">{loadError}</div>
//         ) : (
//           <div className="hbh-table-wrap">
//             <table className="hbh-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>HOTEL</th>
//                   <th>BOOKING ID</th>
//                   <th>PASSENGER</th>
//                   <th>CHECKIN</th>
//                   <th>CHECKOUT</th>
//                   <th>STATUS</th>
//                   <th>TICKET</th>
//                   <th>ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredBookings.map((b, idx) => (
//                   <tr key={b.TransactionId || b.BookingId || idx}>
//                     <td className="hbh-idx">{idx + 1}</td>
//                     <td className="hbh-hotel-name">{b.HotelName}</td>
//                     <td>
//                       <span className="hbh-booking-link">{b.BookingId}</span>
//                     </td>
//                     <td>{b.CustomerName}</td>
//                     <td>{formatDate(b.CheckInDate)}</td>
//                     <td>{formatDate(b.CheckOutDate)}</td>
//                     <td>
//                       <span
//                         className={
//                           badgeClass[getListStatusLabel(b.BookingStatus)] ||
//                           "hbh-badge hbh-badge-pending"
//                         }
//                       >
//                         {getListStatusLabel(b.BookingStatus)}
//                       </span>
//                     </td>
//                     <td>
//                       <button
//                         className="hbh-row-btn hbh-btn-ticket"
//                         onClick={() => handleViewTicket(b.TransactionId)}
//                       >
//                         Ticket
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="hbh-row-btn hbh-btn-edit"
//                         onClick={() => handleEditClick(b)}
//                       >
//                         ✏️ Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredBookings.length === 0 && (
//                   <tr>
//                     <td colSpan={9} className="hbh-empty">
//                       <div className="hbh-empty-icon">🧳</div>
//                       <div className="hbh-empty-title">No bookings found</div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {editModalOpen && (
//         <div className="hbh-modal-overlay" onClick={closeEditModal}>
//           <div
//             className="hbh-modal hbh-edit-modal"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="hbh-edit-header">
//               <div className="hbh-edit-header-left">
//                 <div className="hbh-edit-header-icon">✏️</div>
//                 <div>
//                   <h2>Edit Booking</h2>
//                   <div className="hbh-edit-header-sub">
//                     {editForm.hotelName && (
//                       <>
//                         <b>{editForm.hotelName}</b> ·{" "}
//                       </>
//                     )}
//                     {editForm.bookingId || "—"}
//                   </div>
//                 </div>
//               </div>
//               <button className="hbh-modal-close" onClick={closeEditModal}>
//                 &times;
//               </button>
//             </div>

//             <div className="hbh-edit-body">
//               <div className="hbh-edit-form">
//                 {editMsg.text && (
//                   <div className={`hbh-edit-msg ${editMsg.type}`}>
//                     {editMsg.type === "success" ? "✅" : "⚠️"} {editMsg.text}
//                   </div>
//                 )}

//                 <div className="hbh-edit-field full">
//                   <div className="hbh-edit-section-title">
//                     Guest &amp; Reference
//                   </div>
//                 </div>

//                 <div className="hbh-edit-field">
//                   <label>PNR</label>
//                   <input
//                     type="text"
//                     value={editForm.pnr}
//                     onChange={(e) =>
//                       handleEditFieldChange("pnr", e.target.value)
//                     }
//                     disabled={editSaving}
//                   />
//                 </div>

//                 <div className="hbh-edit-field">
//                   <label>Customer Name</label>
//                   <input
//                     type="text"
//                     value={editForm.customerName}
//                     onChange={(e) =>
//                       handleEditFieldChange("customerName", e.target.value)
//                     }
//                     disabled={editSaving}
//                   />
//                 </div>

//                 <div className="hbh-edit-field full">
//                   <div className="hbh-edit-section-title">Stay Details</div>
//                 </div>

//                 <div className="hbh-edit-field">
//                   <label>📅 Check In</label>
//                   <input
//                     type="date"
//                     value={editForm.checkInDate}
//                     onChange={(e) =>
//                       handleEditFieldChange("checkInDate", e.target.value)
//                     }
//                     disabled={editSaving}
//                   />
//                 </div>

//                 <div className="hbh-edit-field">
//                   <label>📅 Check Out</label>
//                   <input
//                     type="date"
//                     value={editForm.checkOutDate}
//                     onChange={(e) =>
//                       handleEditFieldChange("checkOutDate", e.target.value)
//                     }
//                     disabled={editSaving}
//                   />
//                 </div>

//                 <div className="hbh-edit-field">
//                   <label>Amount</label>
//                   <div className="hbh-edit-amount-wrap">
//                     <span>₹</span>
//                     <input
//                       type="number"
//                       value={editForm.amount}
//                       onChange={(e) =>
//                         handleEditFieldChange("amount", e.target.value)
//                       }
//                       disabled={editSaving}
//                     />
//                   </div>
//                 </div>

//                 <div className="hbh-edit-field full">
//                   <div className="hbh-edit-section-title">Booking Status</div>
//                 </div>

//                 <div className="hbh-status-pills">
//                   {EDIT_STATUS_OPTIONS.map((opt) => {
//                     const isActive =
//                       Number(editForm.bookingStatus) === opt.value;
//                     const activeClass =
//                       opt.label === "Confirmed"
//                         ? "active-confirmed"
//                         : opt.label === "Pending"
//                           ? "active-pending"
//                           : "active-cancelled";
//                     return (
//                       <button
//                         type="button"
//                         key={opt.value}
//                         className={`hbh-status-pill ${isActive ? activeClass : ""}`}
//                         onClick={() =>
//                           handleEditFieldChange("bookingStatus", opt.value)
//                         }
//                         disabled={editSaving}
//                       >
//                         <span className="dot" />
//                         {opt.label}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="hbh-edit-footer">
//                   <button
//                     className="hbh-btn hbh-btn-outline"
//                     onClick={closeEditModal}
//                     disabled={editSaving}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="hbh-btn hbh-btn-primary"
//                     onClick={handleEditSubmit}
//                     disabled={editSaving}
//                   >
//                     {editSaving ? "Updating..." : "💾 Update Booking"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {ticketModalOpen && (
//         <div className="hbh-modal-overlay" onClick={closeModal}>
//           <div
//             className="hbh-modal hbh-voucher"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="hbh-modal-header">
//               <h2>Hotel Voucher</h2>
//               <button className="hbh-modal-close" onClick={closeModal}>
//                 &times;
//               </button>
//             </div>

//             {ticketLoading && (
//               <div className="hbh-modal-loading">Loading ticket...</div>
//             )}

//             {ticketError && (
//               <div className="hbh-modal-error">{ticketError}</div>
//             )}

//             {!ticketLoading && !ticketError && ticketData && (
//               <>
//                 <div className="hbh-voucher-topbar">
//                   <div className="hbh-voucher-brand">
//                     <img
//                       src="/tripcaliber.png"
//                       alt="TripJi Logo"
//                       className="hbh-logo"
//                     />
//                   </div>
//                   <div className="hbh-voucher-qr" />
//                 </div>

//                 <div className="hbh-voucher-pnr-row">
//                   <div className="hbh-voucher-pnr">
//                     Hotel PNR: {ticketData.TicketNumber}
//                   </div>
//                   <div
//                     className={
//                       "hbh-voucher-status " +
//                       (getTicketStatusLabel(ticketData.BookingStatus) ===
//                       "Confirmed"
//                         ? "confirmed"
//                         : getTicketStatusLabel(ticketData.BookingStatus) ===
//                             "Pending"
//                           ? "pending"
//                           : "cancelled")
//                     }
//                   >
//                     Status:{" "}
//                     {getTicketStatusLabel(ticketData.BookingStatus) ===
//                     "Confirmed"
//                       ? "Booking Confirmed"
//                       : getTicketStatusLabel(ticketData.BookingStatus) ===
//                           "Pending"
//                         ? "Booking Pending"
//                         : "Booking Cancelled"}
//                   </div>
//                 </div>

//                 <div className="hbh-voucher-box">
//                   <div className="hbh-voucher-box-head">
//                     <div className="hbh-voucher-box-head-title">
//                       Hotel Ticket
//                     </div>
//                     <div className="hbh-voucher-box-head-date">
//                       Booking Date: {formatDate(ticketData.BookingDate)}
//                     </div>
//                   </div>

//                   <div className="hbh-voucher-body">
//                     <div className="hbh-voucher-details">
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           DESTINATION:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.CityName}, {ticketData.CountryName}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           HOTEL NAME:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.HotelName}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           HOTEL ADDRESS:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.HotelAddress}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">CHECK IN:</div>
//                         <div className="hbh-voucher-row-value">
//                           {formatDate(ticketData.CheckinDate)}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           CHECK OUT:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {formatDate(ticketData.CheckoutDate)}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           NO. OF ROOMS:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.NumberOfRooms}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">ADULTS:</div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.NumberOfAdults}
//                         </div>
//                       </div>
//                       <div className="hbh-voucher-row">
//                         <div className="hbh-voucher-row-label">
//                           CHILDREN:
//                         </div>
//                         <div className="hbh-voucher-row-value">
//                           {ticketData.NumberOfChild}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="hbh-voucher-booked-by">
//                       <b>BOOKED BY:</b>
//                       TripCaliber
//                       <div className="txn">
//                         TXN ID: {ticketData.TicketNumber}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="hbh-voucher-table-wrap">
//                     <table className="hbh-voucher-table">
//                       <thead>
//                         <tr>
//                           <th>Room No#</th>
//                           <th>Room Type/Board</th>
//                           <th>Guest Name</th>
//                           <th>Adults</th>
//                           <th>Children</th>
//                           <th>Room Rate</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>ROOM 1</td>
//                           <td>{ticketData.RoomType || "-"}</td>
//                           <td>{ticketData.PassengerName}</td>
//                           <td>{ticketData.NumberOfAdults}</td>
//                           <td>{ticketData.NumberOfChild}</td>
//                           <td>
//                             {Number(ticketData.TotalPrice || 0).toLocaleString(
//                               "en-IN"
//                             )}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 <div className="hbh-voucher-footer">
//                   <div className="hbh-voucher-footer-col">
//                     <h4>Company</h4>
//                     <a href="#">About Us</a>
//                     <a href="#">Blog</a>
//                     <a href="#">Privacy Policy</a>
//                     <a href="#">Terms of Use</a>
//                     <a href="#">Refund &amp; Cancellation Policy</a>
//                   </div>
//                   <div className="hbh-voucher-footer-col">
//                     <h4>Services</h4>
//                     <a href="#">Flight Booking</a>
//                     <a href="#">Hotel Booking</a>
//                   </div>
//                   <div className="hbh-voucher-footer-col">
//                     <h4>Help And Support</h4>
//                     <a href="#">Contact Us</a>
//                     <a href="#">Agent Login</a>
//                   </div>
//                   <div className="hbh-voucher-footer-col">
//                     <h4>Keep In Touch</h4>
//                     <div className="hbh-voucher-social">
//                       <span>f</span>
//                       <span>x</span>
//                       <span>in</span>
//                       <span>yt</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="hbh-voucher-copyright">
//                   <span>© 2025 - 2026 TripCaliber</span>
//                   <span>Powered By: Naman Technolab</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <Footer2 />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import Footer2 from "./Footer2";
import "../CSS/FlightBooking.css";
import { loadAgencyConfig } from "../util/loadConfig";

// ==== CONFIG ====
const API_URL = "https://api.hotel.namantechnolab.com/api/hotel/GetAllBookingHistory";
const GET_OFFLINE_TICKET_API = process.env.REACT_APP_HOTEL_TICKET_API;
const UPDATE_BOOKING_API =
  "https://api.hotel.namantechnolab.com/api/Static/UpdateAdminBooking";
const UPDATE_BOOKING_METHOD = "PUT";

// Edit modal options (same codes as old HotelBookingHistory)
const EDIT_STATUS_OPTIONS = [
  { value: 1, label: "Confirmed", cls: "active-confirmed" },
  { value: 4, label: "Pending", cls: "active-pending" },
  { value: 6, label: "Cancelled", cls: "active-cancelled" },
];

const getTicketStatusLabel = (s) => {
  if (Number(s) === 1) return "Confirmed";
  if (Number(s) === 0) return "Pending";
  return "Cancelled";
};

// ==== HELPERS ====
const toLocalYMD = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const toInputDate = (isoStr) => {
  if (!isoStr || String(isoStr).startsWith("0001")) return "";
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return "";
  return toLocalYMD(d);
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr || String(dateStr).startsWith("0001")) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

async function fetchTicketById(transactionId) {
  try {
    const res = await fetch(
      `${GET_OFFLINE_TICKET_API}?transactionId=${transactionId}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.HotelName) return null;
    return { ...data, TransactionId: data.TransactionId || transactionId };
  } catch (err) {
    return null;
  }
}

async function updateAdminBooking(payload) {
  try {
    const res = await fetch(UPDATE_BOOKING_API, {
      method: UPDATE_BOOKING_METHOD,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const rawText = await res.text();
    let data = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch (parseErr) {
      return {
        IsSuccess: false,
        Message: `Could not understand the server response (status ${res.status}).`,
      };
    }

    if (!res.ok) {
      return {
        IsSuccess: false,
        Message: (data && data.Message) || `Update failed (HTTP ${res.status}).`,
      };
    }
    if (!data) return { IsSuccess: false, Message: "Empty response from server." };
    return data;
  } catch (err) {
    console.error("[UpdateAdminBooking] error (likely CORS/network):", err);
    return { IsSuccess: false, Message: "Network/CORS error. Check console (F12)." };
  }
}

// Modal / voucher styles (page itself uses FlightBooking.css fb- classes)
const MODAL_STYLES = `
.hbm-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;z-index:999;padding:16px}
.hbm-modal{background:#fff;border-radius:14px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,.2)}
.hbm-modal.edit{max-width:560px}
.hbm-modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #f1f5f9}
.hbm-modal-header h2{font-size:16px;margin:0;color:#1e293b}
.hbm-close{border:none;background:none;font-size:22px;line-height:1;color:#94a3b8;cursor:pointer}
.hbm-close:hover{color:#475569}
.hbm-state{text-align:center;padding:40px 0;color:#94a3b8}
.hbm-state.error{color:#dc2626}

.hbm-edit-header{padding:20px 24px;border-bottom:1px solid #f1f5f9;background:linear-gradient(135deg,#eef2ff 0%,#eff6ff 100%);border-radius:14px 14px 0 0;display:flex;align-items:flex-start;justify-content:space-between}
.hbm-edit-header-left{display:flex;gap:12px;align-items:flex-start}
.hbm-edit-icon{width:40px;height:40px;border-radius:10px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.hbm-edit-header h2{font-size:16px;margin:0;color:#0f172a}
.hbm-edit-sub{font-size:12px;color:#64748b;margin-top:3px}
.hbm-edit-sub b{color:#334155}
.hbm-edit-body{padding:22px 24px 24px}
.hbm-form{display:grid;grid-template-columns:1fr 1fr;gap:14px 16px}
.hbm-section{grid-column:1/-1;font-size:11px;letter-spacing:.06em;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-top:6px}
.hbm-field{display:flex;flex-direction:column;gap:6px}
.hbm-field label{font-size:12px;font-weight:600;color:#334155}
.hbm-field input{border:1.5px solid #e2e8f0;border-radius:9px;padding:10px 12px;font-size:13px;color:#1e293b;outline:none;background:#fbfcfe;transition:border-color .15s,box-shadow .15s}
.hbm-field input:hover{border-color:#cbd5e1}
.hbm-field input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12);background:#fff}
.hbm-field input:disabled{background:#f1f5f9;color:#94a3b8;cursor:not-allowed}
.hbm-amount{position:relative}
.hbm-amount span{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:#94a3b8;font-weight:600}
.hbm-amount input{padding-left:26px;width:100%;box-sizing:border-box}
.hbm-pills{display:flex;gap:8px;grid-column:1/-1}
.hbm-pill{flex:1;border:1.5px solid #e2e8f0;background:#fff;border-radius:9px;padding:9px 10px;font-size:12.5px;font-weight:600;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .15s}
.hbm-pill:hover:not(:disabled){border-color:#cbd5e1}
.hbm-pill .dot{width:7px;height:7px;border-radius:50%;background:#cbd5e1}
.hbm-pill.active-confirmed{border-color:#16a34a;background:#f0fdf4;color:#047857}
.hbm-pill.active-confirmed .dot{background:#16a34a}
.hbm-pill.active-pending{border-color:#d97706;background:#fffbeb;color:#b45309}
.hbm-pill.active-pending .dot{background:#d97706}
.hbm-pill.active-cancelled{border-color:#dc2626;background:#fef2f2;color:#b91c1c}
.hbm-pill.active-cancelled .dot{background:#dc2626}
.hbm-pill:disabled{cursor:not-allowed;opacity:.7}
.hbm-footer{grid-column:1/-1;display:flex;justify-content:flex-end;gap:10px;margin-top:8px;padding-top:18px;border-top:1px solid #f1f5f9}
.hbm-msg{grid-column:1/-1;font-size:13px;font-weight:500;padding:10px 14px;border-radius:9px}
.hbm-msg.success{background:#d1fae5;color:#047857}
.hbm-msg.error{background:#fee2e2;color:#b91c1c}

.hbm-topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #f1f5f9}
.hbm-logo{height:70px;width:auto;display:block;object-fit:contain}
.hbm-qr{width:56px;height:56px;border:1px solid #e2e8f0;border-radius:6px}
.hbm-pnr-row{padding:14px 24px 0}
.hbm-pnr{font-size:13px;font-weight:700;color:#1e293b}
.hbm-vstatus{font-size:13px;font-weight:700;margin-top:4px}
.hbm-vstatus.confirmed{color:#16a34a}
.hbm-vstatus.pending{color:#d97706}
.hbm-vstatus.cancelled{color:#dc2626}
.hbm-vbox{margin:16px 24px 24px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden}
.hbm-vbox-head{display:flex;align-items:center;justify-content:space-between;background:#f8fafc;padding:10px 16px;border-bottom:1px solid #e2e8f0}
.hbm-vbox-title{font-size:13px;font-weight:700;color:#94a3b8}
.hbm-vbox-date{font-size:12px;color:#94a3b8}
.hbm-vbody{display:flex;gap:16px;padding:16px}
.hbm-vdetails{flex:1;display:grid;gap:10px}
.hbm-vrow{display:flex;gap:8px;font-size:13px}
.hbm-vlabel{min-width:130px;font-weight:700;color:#1e293b}
.hbm-vvalue{color:#334155}
.hbm-vbooked{width:150px;border:1px solid #e2e8f0;border-radius:8px;padding:10px;text-align:center;font-size:11px;color:#64748b;height:fit-content}
.hbm-vbooked b{display:block;font-size:11px;color:#1e293b;margin-bottom:6px}
.hbm-vbooked .txn{margin-top:8px;font-weight:700;color:#2563eb;font-size:12px;word-break:break-all}
.hbm-vtable-wrap{padding:0 16px 16px;overflow-x:auto}
.hbm-vtable{width:100%;border-collapse:collapse;font-size:12px}
.hbm-vtable th{background:#f8fafc;text-align:left;padding:8px 10px;border:1px solid #e2e8f0;color:#475569;font-weight:700}
.hbm-vtable td{padding:8px 10px;border:1px solid #e2e8f0;color:#334155}
.hbm-copyright{border-top:1px solid #f1f5f9;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#94a3b8}

.hbm-btn{border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer}
.hbm-btn:disabled{opacity:.6;cursor:not-allowed}
.hbm-btn.primary{background:#2563eb;color:#fff}
.hbm-btn.primary:hover:not(:disabled){background:#1d4ed8}
.hbm-btn.outline{background:#fff;border:1px solid #e2e8f0;color:#475569}
.hbm-btn.outline:hover:not(:disabled){background:#f8fafc}
.hbm-actions{display:flex;gap:6px;align-items:center}
.hbf-title{font-size:12px;letter-spacing:.06em;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:14px}
.hbf-row{display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap}
.hbf-field{display:flex;flex-direction:column;gap:8px}
.hbf-field label{font-size:12px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:.03em}
.hbf-field .react-datepicker-wrapper{width:100%}
.hbf-input{width:195px;box-sizing:border-box;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;font-size:14px;color:#1e293b;background:#f8fafc;outline:none;transition:border-color .15s,box-shadow .15s,background .15s}
.hbf-input::placeholder{color:#94a3b8}
.hbf-input:focus{border-color:#1e3a8a;background:#fff;box-shadow:0 0 0 3px rgba(30,58,138,.12)}
.hbf-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;color:#fff;background:#1e3a8a;cursor:pointer;transition:background .15s,opacity .15s}
.hbf-btn:hover:not(:disabled){background:#172e6e}
.hbf-btn:disabled{opacity:.55;cursor:not-allowed}

@media (max-width:640px){
  .hbm-form{grid-template-columns:1fr}
  .hbm-vbody{flex-direction:column}
  .hbm-vbooked{width:100%}
}
`;

export default function HotelBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [toDate, setToDate] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);

  const [config, setConfig] = useState({
    AgencyKey: "",
    PortalId: "",
    AdminKey: "",
  });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [configReady, setConfigReady] = useState(false);

  // Ticket modal
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketError, setTicketError] = useState("");
  const [ticketData, setTicketData] = useState(null);

  // Edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg, setEditMsg] = useState({ type: "", text: "" });
  const [editForm, setEditForm] = useState({
    transactionId: null,
    pnr: "",
    customerName: "",
    checkInDate: "",
    checkOutDate: "",
    amount: "",
    bookingStatus: 4,
    hotelName: "",
    bookingId: "",
  });

  const today = new Date();

  // Hotel BookingStatus mapping (list view)
  const statusMap = {
    0: "Default",
    1: "Booked",
    2: "Confirmed",
    3: "Cancelled",
    4: "Pending",
    5: "Failed",
    6: "Booked",
    12: "Rejected",
    17: "Hold",
  };

  const statusClass = {
    Booked: "booked",
    Confirmed: "booked",
    Pending: "pending",
    Cancelled: "rejected",
    Failed: "rejected",
    Rejected: "rejected",
    Hold: "hold",
    Default: "default",
  };

  // Config load
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const cfg = await loadAgencyConfig();
        setConfig({
          AgencyKey: cfg.AgencyKey || "",
          PortalId: cfg.PortalId || "",
          AdminKey: cfg.AdminKey || "",
        });
        setConfigReady(true);
      } catch (err) {
        console.error("Config load failed:", err);
        setConfigReady(true);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const formatDateForAPI = (date) => {
    if (!date) return null;
    return toLocalYMD(new Date(date));
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    if (date && toDate && date > toDate) setToDate(date);
  };

  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const id = item.TransactionId ?? item.BookingId;
      if (id == null || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const fetchBookings = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both From and To dates.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        FromDate: formatDateForAPI(fromDate),
        ToDate: formatDateForAPI(toDate),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      let bookingArray = [];

      if (Array.isArray(data)) bookingArray = data;
      else if (Array.isArray(data?.data)) bookingArray = data.data;
      else if (Array.isArray(data?.BookingHistory)) bookingArray = data.BookingHistory;

      setBookings(removeDuplicates(bookingArray));
    } catch (err) {
      console.error(err);
      setError("Hotel bookings fetch karne mein problem aayi. Please retry karein.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (configReady) fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configReady]);

  // ===== Ticket modal =====
  const handleViewTicket = async (transactionId) => {
    setTicketModalOpen(true);
    setTicketLoading(true);
    setTicketError("");
    setTicketData(null);

    const data = await fetchTicketById(transactionId);
    if (data) setTicketData(data);
    else setTicketError("Could not load the ticket. Please try again.");
    setTicketLoading(false);
  };

  const closeTicketModal = () => {
    setTicketModalOpen(false);
    setTicketData(null);
    setTicketError("");
  };

  // ===== Edit modal =====
  const handleEditClick = (b) => {
    setEditMsg({ type: "", text: "" });
    setEditForm({
      transactionId: b.TransactionId,
      pnr: b.PNR || b.TicketNumber || "",
      customerName: b.CustomerName || "",
      checkInDate: toInputDate(b.CheckInDate || b.Fromdate),
      checkOutDate: toInputDate(b.CheckOutDate || b.Todate),
      amount: b.Amount ?? b.TotalPrice ?? "",
      bookingStatus: b.BookingStatus ?? 4,
      hotelName: b.HotelName || "",
      bookingId: b.BookingId || "",
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (editSaving) return;
    setEditModalOpen(false);
    setEditMsg({ type: "", text: "" });
  };

  const handleEditFieldChange = (field, value) =>
    setEditForm((prev) => ({ ...prev, [field]: value }));

  const handleEditSubmit = async () => {
    setEditSaving(true);
    setEditMsg({ type: "", text: "" });

    const payload = {
      transactionId: editForm.transactionId,
      pnr: editForm.pnr.trim(),
      customerName: editForm.customerName.trim(),
      checkInDate: editForm.checkInDate,
      checkOutDate: editForm.checkOutDate,
      amount: Number(editForm.amount) || 0,
      bookingStatus: Number(editForm.bookingStatus),
      AgencyKey: config.AgencyKey || undefined,
      PortalId: config.PortalId ? Number(config.PortalId) : undefined,
      AdminKey: config.AdminKey || undefined,
    };

    const res = await updateAdminBooking(payload);

    if (res.IsSuccess) {
      setEditMsg({
        type: "success",
        text: res.Message || "Booking updated successfully.",
      });

      // Update row locally (keeps both old & new field names in sync)
      setBookings((prev) =>
        prev.map((b) =>
          b.TransactionId === editForm.transactionId
            ? {
                ...b,
                PNR: payload.pnr,
                CustomerName: payload.customerName,
                CheckInDate: payload.checkInDate,
                CheckOutDate: payload.checkOutDate,
                Fromdate: payload.checkInDate,
                Todate: payload.checkOutDate,
                Amount: payload.amount,
                TotalPrice: payload.amount,
                BookingStatus: payload.bookingStatus,
              }
            : b
        )
      );

      setTimeout(() => {
        setEditModalOpen(false);
        setEditMsg({ type: "", text: "" });
      }, 1000);
    } else {
      setEditMsg({
        type: "error",
        text: res.Message || "Update failed. Please try again.",
      });
    }

    setEditSaving(false);
  };

  // ===== Export =====
  const handleExportExcel = () => {
    if (bookings.length === 0) return;

    const excelRows = bookings.map((b) => ({
      "Booking ID": b.BookingId || "",
      "Customer Name": b.CustomerName || "",
      Email: b.CustomerEmail || "",
      Mobile: b.CustomerMobile || "",
      "Hotel Name": b.HotelName || "",
      "Hotel Address": b.HotelAddress || "",
      "Check-in": b.Fromdate || "",
      "Check-out": b.Todate || "",
      Rooms: b.NumberOfRooms || 0,
      Adults: b.NumberOfAdults || 0,
      Child: b.NumberOfChild || 0,
      "Total Price": Number(b.TotalPrice || 0),
      "Booking Date": b.Bookingdate || "",
      Status: statusMap[Number(b.BookingStatus)] || b.BookingStatus || "Unknown",
      "Transaction ID": b.TransactionId || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    worksheet["!cols"] = [
      { wch: 18 }, { wch: 22 }, { wch: 24 }, { wch: 14 }, { wch: 32 },
      { wch: 40 }, { wch: 12 }, { wch: 12 }, { wch: 8 }, { wch: 8 },
      { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 14 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hotel Bookings");

    const fileFrom = fromDate ? formatDateForAPI(fromDate) : "all";
    const fileTo = toDate ? formatDateForAPI(toDate) : "all";
    XLSX.writeFile(workbook, `HotelBookings_${fileFrom}_to_${fileTo}.xlsx`);
  };

  const bookedCount = bookings.filter((b) => {
    const s = statusMap[Number(b.BookingStatus)];
    return s === "Booked" || s === "Confirmed";
  }).length;

  const pendingCount = bookings.filter(
    (b) => statusMap[Number(b.BookingStatus)] === "Pending"
  ).length;

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (Number(b.TotalPrice) || 0),
    0
  );

  if (loadingConfig) {
    return (
      <div className="fb-page">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={`fb-main ${collapsed ? "collapsed" : ""}`}>
          <div className="fb-state-box loading">
            <div className="fb-spinner" />
            <p>Loading Config...</p>
          </div>
          <Footer2 />
        </div>
      </div>
    );
  }

  const ticketStatusLabel = ticketData
    ? getTicketStatusLabel(ticketData.BookingStatus)
    : "";

  return (
    <div className="fb-page">
      <style>{MODAL_STYLES}</style>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`fb-main ${collapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <div className="fb-header">
          <div className="fb-header-left">
            <h1>Hotel Bookings</h1>
            <p>Hotel Booking History</p>
          </div>
          <div className="fb-stats">
            <div className="fb-stat-card primary">
              <span>Total</span>
              <strong>{bookings.length}</strong>
            </div>
            <div className="fb-stat-card green">
              <span>Booked</span>
              <strong>{bookedCount}</strong>
            </div>
            <div className="fb-stat-card amber">
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>
            <div className="fb-stat-card primary">
              <span>Revenue</span>
              <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="fb-filter-card">
          <div className="hbf-title">Filter Records</div>
          <div className="hbf-row">
            <div className="hbf-field">
              <label>From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={handleFromDateChange}
                dateFormat="dd-MM-yyyy"
                maxDate={today}
                className="hbf-input"
                placeholderText="Select From Date"
              />
            </div>

            <div className="hbf-field">
              <label>To Date</label>
              <DatePicker
                selected={toDate}
                onChange={setToDate}
                dateFormat="dd-MM-yyyy"
                minDate={fromDate}
                maxDate={today}
                className="hbf-input"
                placeholderText="Select To Date"
              />
            </div>

            <button onClick={fetchBookings} className="hbf-btn" disabled={loading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>

            <button
              onClick={handleExportExcel}
              className="hbf-btn"
              disabled={bookings.length === 0}
            >
              📤 Export Excel
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="fb-state-box loading">
            <div className="fb-spinner" />
            <p>Loading hotel bookings...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="fb-state-box error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button onClick={fetchBookings} className="fb-retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && bookings.length > 0 && (
          <div className="fb-table-card">
            <div className="fb-table-meta">
              <span>
                <strong>{bookings.length}</strong> bookings found
              </span>
              <span className="fb-table-hint">
                Scroll horizontally on smaller screens
              </span>
            </div>
            <div className="fb-table-scroll">
              <table className="fb-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Hotel</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Rooms</th>
                    <th>Guests</th>
                    <th>Price</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    <th>Ticket</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => {
                    const statusLabel =
                      statusMap[Number(b.BookingStatus)] || "Unknown";
                    const cls = statusClass[statusLabel] || "default";
                    const guests =
                      (Number(b.NumberOfAdults) || 0) +
                      (Number(b.NumberOfChild) || 0);

                    return (
                      <tr key={b.TransactionId || b.BookingId || `row-${index}`}>
                        <td className="fb-index">{index + 1}</td>
                        <td className="fb-booking-id">{b.BookingId || "—"}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>
                            {b.CustomerName || "—"}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#8899aa",
                              marginTop: 2,
                            }}
                          >
                            {b.CustomerMobile || b.CustomerEmail || ""}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, maxWidth: 220 }}>
                            {b.HotelName || "—"}
                          </div>
                        </td>
                        <td>{formatDisplayDate(b.Fromdate || b.CheckInDate)}</td>
                        <td>{formatDisplayDate(b.Todate || b.CheckOutDate)}</td>
                        <td style={{ textAlign: "center" }}>
                          {b.NumberOfRooms ?? "—"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {guests > 0 ? guests : "—"}
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#8899aa",
                              display: "block",
                            }}
                          >
                            {b.NumberOfAdults || 0}A / {b.NumberOfChild || 0}C
                          </span>
                        </td>
                        <td>
                          <span className="fb-booking-id">
                            ₹{Number(b.TotalPrice || 0).toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td>{formatDisplayDate(b.Bookingdate)}</td>
                        <td>
                          <span className={`fb-pill ${cls}`}>{statusLabel}</span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleViewTicket(b.TransactionId)}
                            className="fb-action-btn"
                          >
                            Ticket
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditClick(b)}
                            className="fb-action-btn edit"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && bookings.length === 0 && (
          <div className="fb-state-box empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#c8d6e8"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6M4 20h16M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
            <p>No hotel bookings found for the selected filters</p>
          </div>
        )}

        <Footer2 />
      </div>

      {/* ===== Edit Modal ===== */}
      {editModalOpen && (
        <div className="hbm-overlay" onClick={closeEditModal}>
          <div className="hbm-modal edit" onClick={(e) => e.stopPropagation()}>
            <div className="hbm-edit-header">
              <div className="hbm-edit-header-left">
                <div className="hbm-edit-icon">✏️</div>
                <div>
                  <h2>Edit Booking</h2>
                  <div className="hbm-edit-sub">
                    {editForm.hotelName && (
                      <>
                        <b>{editForm.hotelName}</b> ·{" "}
                      </>
                    )}
                    {editForm.bookingId || "—"}
                  </div>
                </div>
              </div>
              <button className="hbm-close" onClick={closeEditModal}>
                &times;
              </button>
            </div>

            <div className="hbm-edit-body">
              <div className="hbm-form">
                {editMsg.text && (
                  <div className={`hbm-msg ${editMsg.type}`}>
                    {editMsg.type === "success" ? "✅" : "⚠️"} {editMsg.text}
                  </div>
                )}

                <div className="hbm-section">Guest &amp; Reference</div>

                <div className="hbm-field">
                  <label>PNR</label>
                  <input
                    type="text"
                    value={editForm.pnr}
                    onChange={(e) => handleEditFieldChange("pnr", e.target.value)}
                    disabled={editSaving}
                  />
                </div>

                <div className="hbm-field">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    value={editForm.customerName}
                    onChange={(e) =>
                      handleEditFieldChange("customerName", e.target.value)
                    }
                    disabled={editSaving}
                  />
                </div>

                <div className="hbm-section">Stay Details</div>

                <div className="hbm-field">
                  <label>📅 Check In</label>
                  <input
                    type="date"
                    value={editForm.checkInDate}
                    onChange={(e) =>
                      handleEditFieldChange("checkInDate", e.target.value)
                    }
                    disabled={editSaving}
                  />
                </div>

                <div className="hbm-field">
                  <label>📅 Check Out</label>
                  <input
                    type="date"
                    value={editForm.checkOutDate}
                    onChange={(e) =>
                      handleEditFieldChange("checkOutDate", e.target.value)
                    }
                    disabled={editSaving}
                  />
                </div>

                <div className="hbm-field">
                  <label>Amount</label>
                  <div className="hbm-amount">
                    <span>₹</span>
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        handleEditFieldChange("amount", e.target.value)
                      }
                      disabled={editSaving}
                    />
                  </div>
                </div>

                <div className="hbm-section">Booking Status</div>

                <div className="hbm-pills">
                  {EDIT_STATUS_OPTIONS.map((opt) => {
                    const isActive = Number(editForm.bookingStatus) === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        className={`hbm-pill ${isActive ? opt.cls : ""}`}
                        onClick={() =>
                          handleEditFieldChange("bookingStatus", opt.value)
                        }
                        disabled={editSaving}
                      >
                        <span className="dot" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="hbm-footer">
                  <button
                    className="hbm-btn outline"
                    onClick={closeEditModal}
                    disabled={editSaving}
                  >
                    Cancel
                  </button>
                  <button
                    className="hbm-btn primary"
                    onClick={handleEditSubmit}
                    disabled={editSaving}
                  >
                    {editSaving ? "Updating..." : "💾 Update Booking"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Ticket / Voucher Modal ===== */}
      {ticketModalOpen && (
        <div className="hbm-overlay" onClick={closeTicketModal}>
          <div className="hbm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hbm-modal-header">
              <h2>Hotel Voucher</h2>
              <button className="hbm-close" onClick={closeTicketModal}>
                &times;
              </button>
            </div>

            {ticketLoading && <div className="hbm-state">Loading ticket...</div>}
            {ticketError && <div className="hbm-state error">{ticketError}</div>}

            {!ticketLoading && !ticketError && ticketData && (
              <>
                <div className="hbm-topbar">
                  <img
                    src="/tripcaliber.png"
                    alt="TripJi Logo"
                    className="hbm-logo"
                  />
                  <div className="hbm-qr" />
                </div>

                <div className="hbm-pnr-row">
                  <div className="hbm-pnr">Hotel PNR: {ticketData.TicketNumber}</div>
                  <div className={`hbm-vstatus ${ticketStatusLabel.toLowerCase()}`}>
                    Status: Booking {ticketStatusLabel}
                  </div>
                </div>

                <div className="hbm-vbox">
                  <div className="hbm-vbox-head">
                    <div className="hbm-vbox-title">Hotel Ticket</div>
                    <div className="hbm-vbox-date">
                      Booking Date: {formatDisplayDate(ticketData.BookingDate)}
                    </div>
                  </div>

                  <div className="hbm-vbody">
                    <div className="hbm-vdetails">
                      {[
                        ["DESTINATION:", `${ticketData.CityName}, ${ticketData.CountryName}`],
                        ["HOTEL NAME:", ticketData.HotelName],
                        ["HOTEL ADDRESS:", ticketData.HotelAddress],
                        ["CHECK IN:", formatDisplayDate(ticketData.CheckinDate)],
                        ["CHECK OUT:", formatDisplayDate(ticketData.CheckoutDate)],
                        ["NO. OF ROOMS:", ticketData.NumberOfRooms],
                        ["ADULTS:", ticketData.NumberOfAdults],
                        ["CHILDREN:", ticketData.NumberOfChild],
                      ].map(([label, value]) => (
                        <div className="hbm-vrow" key={label}>
                          <div className="hbm-vlabel">{label}</div>
                          <div className="hbm-vvalue">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="hbm-vbooked">
                      <b>BOOKED BY:</b>
                      TripCaliber
                      <div className="txn">TXN ID: {ticketData.TicketNumber}</div>
                    </div>
                  </div>

                  <div className="hbm-vtable-wrap">
                    <table className="hbm-vtable">
                      <thead>
                        <tr>
                          <th>Room No#</th>
                          <th>Room Type/Board</th>
                          <th>Guest Name</th>
                          <th>Adults</th>
                          <th>Children</th>
                          <th>Room Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ROOM 1</td>
                          <td>{ticketData.RoomType || "-"}</td>
                          <td>{ticketData.PassengerName}</td>
                          <td>{ticketData.NumberOfAdults}</td>
                          <td>{ticketData.NumberOfChild}</td>
                          <td>
                            {Number(ticketData.TotalPrice || 0).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="hbm-copyright">
                  <span>© 2025 - 2026 TripCaliber</span>
                  <span>Powered By: Naman Technolab</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}