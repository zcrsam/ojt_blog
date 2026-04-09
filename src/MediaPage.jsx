// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import ojtVid from "./assets/ojtvid.MOV";
// MediaPage — import via: import MediaPage from "./MediaPage"

// ─────────────────────────────────────────────────────────────────────────────
// VLOG DATA
// ─────────────────────────────────────────────────────────────────────────────
// Video data for the vlog section
const VLOGS = [
  {
    id: "v1",
    title: "Reservation System",
    tag: "Client Side",
    duration: "",
    src: ojtVid,
    desc: "Client-side interface for venue browsing, seat selection, and reservation booking with real-time availability updates."
  },
  {
    id: "v2",
    title: "Reservation System",
    tag: "Admin Side",
    duration: "",
    src: ojtVid,
    desc: "Administrative dashboard for managing venues, seat layouts, reservations, and user accounts with comprehensive analytics."
  },
  {
    id: "v3",
    title: "Reservation System",
    tag: "Notification Monitor",
    duration: "",
    src: ojtVid,
    desc: "Real-time notification system for reservation alerts, status updates, and system monitoring with WebSocket integration."
  },
];

// Document names and date ranges for the media section
const WEEK_DATES = [
  "Timesheet - Attendance Sheet", 
  "Report - Whole Report",   
  "Documentation - Technical Documentation",
  "Presentation - Project Presentation", 
  "Evaluation - Performance Evaluation", 
  "Certificate - Completion Certificate",
  "Portfolio - Project Portfolio",  
  "Final Report - Comprehensive Final Report", 
  "Summary - Executive Summary",
];
// Labels for different day types in each week
const DAY_LABELS = ["Pictures/Videos"];

// ─────────────────────────────────────────────────────────────────────────────
// INDEXEDDB PERSISTENCE
// ─────────────────────────────────────────────────────────────────────────────
// IndexedDB configuration for persistent media storage
const DB_NAME    = "ojtMediaDB";
const DB_VERSION = 1;
const STORE_NAME = "mediaItems";

// Opens IndexedDB connection and creates object store if needed
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror   = (e) => reject(e.target.error);
  });
}

// Generates unique key for storing media items by week and day
function dbKey(wi, di) { return `ojt_w${wi + 1}_d${di + 1}`; }

// Loads media items from IndexedDB, falls back to localStorage
async function dbLoad(wi, di) {
  try {
    const db = await openDB();
    return await new Promise((resolve, reject) => {
      const tx  = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(dbKey(wi, di));
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror   = () => reject(req.error);
    });
  } catch (e) {
    try {
      const raw = localStorage.getItem(dbKey(wi, di));
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}

// Saves media items to IndexedDB, falls back to localStorage
async function dbSave(wi, di, items) {
  try {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const tx  = db.transaction(STORE_NAME, "readwrite");
      const req = tx.objectStore(STORE_NAME).put(items, dbKey(wi, di));
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
    return true;
  } catch (e) {
    try {
      localStorage.setItem(dbKey(wi, di), JSON.stringify(items));
      return true;
    } catch { return false; }
  }
}

// Converts file to base64 for storage
function fileToBase64(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload  = (e) => res(e.target.result);
    r.readAsDataURL(file);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --primary:#c17c74;
  --primary-light:rgba(193,124,116,.12);
  --accent:#fdf0ec;
  --secondary:#fce4dc;
  --bg:#fdf8f5;
  --text:#2d1f1a;
  --muted:#8c6a62;
  --border:rgba(193,124,116,.15);
  --radius:16px;
  --max-w:1200px;
  --px:clamp(16px,5vw,48px);
}
html{ scroll-behavior:smooth; height:100%; }
body{
  font-family:'Lato',sans-serif;
  background:var(--bg); color:var(--text);
  overflow-x:hidden; min-height:100%;
  display:flex; flex-direction:column; align-items:center;
}
#root{ width:100%; display:flex; flex-direction:column; align-items:center; }
::selection{ background:var(--primary-light); }

@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes pulse  { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes shimmer{ 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.anim-up{ animation:fadeUp .7s ease both; }

/* PAGE */
.mp-page{ width:100%; min-height:100vh; background:var(--bg); display:flex; flex-direction:column; align-items:center; }

/* TOPBAR */
.mp-topbar{
  position:fixed;top:0;left:0;right:0;z-index:50;
  background:rgba(253,248,245,.92);
  backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
  box-shadow:0 2px 20px rgba(193,124,116,.07);
}
.mp-topbar-inner{
  width:100%; max-width:var(--max-w); margin:0 auto;
  padding:14px var(--px); display:flex; align-items:center;
}
.mp-logo{
  font-family:'Playfair Display',serif;
  font-size:clamp(1.1rem,2.5vw,1.4rem); font-weight:700; color:var(--primary);
  display:flex; align-items:center; gap:8px; white-space:nowrap;
}
.mp-logo-sub{ font-family:'Dancing Script',cursive; font-size:clamp(.75rem,1.5vw,.9rem); color:var(--muted); }

/* CONTENT COLUMN */
.mp-content{
  width:100%; max-width:var(--max-w);
  padding:0 var(--px); margin:0 auto;
  display:flex; flex-direction:column; align-items:center;
}
.mp-content > *{ width:100%; }

/* BACK */
.mp-back-row{ padding-top:clamp(78px,12vw,104px); padding-bottom:4px; display:flex; justify-content:flex-start; }
.mp-back-btn{
  display:inline-flex; align-items:center; gap:8px;
  background:#fff; border:1.5px solid var(--border); cursor:pointer;
  font-family:'Dancing Script',cursive; font-size:1.1rem; color:var(--primary);
  padding:8px 24px 8px 18px; border-radius:30px;
  transition:background .2s,box-shadow .2s;
  box-shadow:0 2px 12px rgba(193,124,116,.1); white-space:nowrap;
}
.mp-back-btn:hover{ background:var(--accent); box-shadow:0 4px 18px rgba(193,124,116,.18); }

/* HERO */
.mp-hero{ padding:clamp(24px,4vw,52px) 0 clamp(28px,4vw,56px); text-align:center; display:flex; flex-direction:column; align-items:center; }
.mp-hero-badge{
  display:inline-block; padding:5px 18px;
  background:var(--secondary); border-radius:30px;
  font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,1rem);
  color:var(--primary); margin-bottom:18px; transform:rotate(-1deg);
}
.mp-hero h1{ font-family:'Playfair Display',serif; font-size:clamp(2rem,7vw,5rem); line-height:.95; color:var(--text); margin-bottom:18px; }
.mp-hero h1 em{ color:var(--primary); font-style:italic; }
.mp-hero-sub{ font-family:'Dancing Script',cursive; font-size:clamp(.95rem,1.8vw,1.3rem); color:var(--muted); max-width:min(560px,90%); line-height:1.75; }

/* SECTION */
.mp-section{ padding:clamp(24px,4vw,60px) 0; width:100%; }
.mp-section-head{
  display:flex; align-items:baseline; gap:clamp(8px,1.5vw,14px);
  margin-bottom:clamp(18px,3vw,28px); padding-bottom:14px;
  border-bottom:2px dashed var(--border); flex-wrap:wrap;
}
.mp-section-head h2{ font-family:'Playfair Display',serif; font-size:clamp(1.4rem,3.5vw,2.4rem); color:var(--text); }
.mp-section-sub{ font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.4vw,1rem); color:var(--muted); white-space:nowrap; }

/* PASSWORD MODAL */
.pw-backdrop{
  position:fixed;inset:0;z-index:400;
  background:rgba(45,31,26,.55);
  backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
  display:flex; align-items:center; justify-content:center;
  padding:clamp(12px,4vw,20px); animation:fadeIn .2s ease both;
}
.pw-box{
  background:var(--bg); border-radius:20px; padding:clamp(22px,4vw,40px);
  width:100%; max-width:min(380px,96vw);
  box-shadow:0 40px 80px rgba(45,31,26,.25);
  animation:fadeUp .3s ease both; position:relative; text-align:center;
}
.pw-box h3{ font-family:'Playfair Display',serif; font-size:clamp(1.1rem,2.5vw,1.4rem); color:var(--text); margin-bottom:8px; }
.pw-box p{ font-family:'Dancing Script',cursive; font-size:clamp(.9rem,1.5vw,1rem); color:var(--muted); margin-bottom:22px; line-height:1.6; }
.pw-input{
  width:100%; padding:12px 16px;
  border:1.5px solid var(--border); border-radius:12px;
  background:#fff; color:var(--text);
  font-family:'Lato',sans-serif; font-size:1rem;
  outline:none; margin-bottom:10px; transition:border-color .2s;
  text-align:center; letter-spacing:3px;
}
.pw-input:focus{ border-color:var(--primary); }
.pw-error{ font-family:'Dancing Script',cursive; font-size:.9rem; color:#e05c5c; margin-bottom:10px; display:block; animation:fadeIn .2s ease; }
.pw-actions{ display:flex; gap:10px; margin-top:4px; }
.pw-confirm{
  flex:1; padding:11px; background:var(--primary); color:#fff;
  border:none; border-radius:12px; cursor:pointer;
  font-family:'Dancing Script',cursive; font-size:1.05rem;
  transition:transform .2s,box-shadow .2s; box-shadow:0 4px 14px rgba(193,124,116,.3);
}
.pw-confirm:hover{ transform:translateY(-2px); box-shadow:0 8px 20px rgba(193,124,116,.4); }
.pw-cancel{
  padding:11px 18px; background:#fff; color:var(--muted);
  border:1.5px solid var(--border); border-radius:12px; cursor:pointer;
  font-family:'Dancing Script',cursive; font-size:1.05rem; transition:background .2s;
}
.pw-cancel:hover{ background:var(--accent); }

/* VLOG GRID */
.vlog-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));
  gap:clamp(14px,2.5vw,24px); width:100%;
}
.vlog-card{
  background:#fff; border-radius:20px; overflow:visible;
  border:1.5px solid var(--border);
  box-shadow:0 4px 20px rgba(193,124,116,.07);
  transition:transform .3s,box-shadow .3s;
}
.vlog-card:hover{ transform:translateY(-6px); box-shadow:0 16px 44px rgba(193,124,116,.18); }

/* ── VLOG THUMB FIX ──
   The video sits in a normal block container — no fixed height, no
   overflow:hidden — so the browser's native control bar is never clipped.
   We round the top corners on the video itself. */
.vlog-thumb{
  position:relative;
  background:#000;
  border-radius:12px 12px 0 0;
  overflow:visible;
}
.vlog-thumb video{
  width:100%;
  height:auto;
  aspect-ratio:20/9;
  object-fit:cover;
  display:block;
  border-radius:12px 12px 0 0;
  /* Ensure controls are always reachable */
  position:relative;
  z-index:1;
}
.vlog-emoji{
  position:absolute; top:12px; left:14px;
  font-size:1.5rem; z-index:2; pointer-events:none;
}
/* Push duration badge above the native control bar (~40px tall) */
.vlog-duration{
  position:absolute; bottom:52px; right:12px;
  background:rgba(45,31,26,.75); color:#fff;
  font-size:.72rem; font-weight:700; padding:3px 9px;
  border-radius:6px; letter-spacing:.5px; z-index:2; pointer-events:none;
}
.vlog-body{ padding:clamp(12px,2vw,18px) clamp(14px,2.5vw,20px) clamp(14px,2.5vw,20px); }
.vlog-tag{
  display:inline-block; padding:3px 12px;
  background:var(--primary-light); color:var(--primary);
  border-radius:20px; font-size:.68rem; font-weight:700;
  letter-spacing:1.5px; text-transform:uppercase; margin-bottom:10px;
}
.vlog-body h3{ font-family:'Playfair Display',serif; font-size:clamp(.95rem,1.8vw,1.1rem); font-weight:700; color:var(--text); margin-bottom:8px; line-height:1.35; }
.vlog-body p{ font-family:'Dancing Script',cursive; font-size:clamp(.8rem,1.4vw,.9rem); color:var(--muted); line-height:1.65; }

/* DIVIDER */
.mp-divider{ border:none; border-top:2px dashed var(--border); margin:0; width:100%; }

/* WEEK TABS */
.week-tabs-wrap{
  overflow-x:auto; padding-bottom:6px; margin-bottom:clamp(16px,2.5vw,24px);
  -webkit-overflow-scrolling:touch; scrollbar-width:thin; scrollbar-color:var(--primary-light) transparent;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,black 3%,black 97%,transparent 100%);
  mask-image:linear-gradient(to right,transparent 0%,black 3%,black 97%,transparent 100%);
}
.week-tabs-wrap::-webkit-scrollbar{ height:3px; }
.week-tabs-wrap::-webkit-scrollbar-thumb{ background:var(--primary-light); border-radius:3px; }
.week-tabs{ display:flex; gap:clamp(6px,1vw,8px); min-width:max-content; padding:2px 0; }
.week-tab{
  padding:8px clamp(12px,2vw,20px); border-radius:30px;
  border:1.5px solid var(--border); background:#fff;
  font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,1rem);
  color:var(--muted); cursor:pointer; transition:all .25s; white-space:nowrap;
}
.week-tab:hover{ background:var(--accent); color:var(--primary); border-color:rgba(193,124,116,.3); }
.week-tab.active{ background:var(--primary); color:#fff; border-color:var(--primary); box-shadow:0 4px 14px rgba(193,124,116,.35); }
.week-date-range{ font-family:'Dancing Script',cursive; font-size:clamp(.9rem,1.6vw,1.05rem); color:var(--muted); margin-bottom:clamp(14px,2.5vw,20px); display:flex; align-items:center; gap:8px; }

/* DAY ACCORDION */
.day-block{ margin-bottom:clamp(7px,1.2vw,10px); }
.day-header{
  display:flex; align-items:center; justify-content:space-between;
  padding:clamp(10px,1.8vw,13px) clamp(14px,2.5vw,20px);
  background:#fff; border-radius:14px; border:1.5px solid var(--border);
  cursor:pointer; transition:background .2s,border-color .2s;
  box-shadow:0 2px 10px rgba(193,124,116,.05); gap:10px;
}
.day-header:hover{ background:var(--accent); border-color:rgba(193,124,116,.3); }
.day-header.open{ border-radius:14px 14px 0 0; border-bottom-color:transparent; background:var(--accent); }
.day-header-left{ display:flex; align-items:center; gap:clamp(8px,1.5vw,12px); min-width:0; }
.day-dot{ width:10px; height:10px; border-radius:50%; background:var(--primary); flex-shrink:0; }
.day-name{ font-family:'Playfair Display',serif; font-size:clamp(.85rem,1.5vw,.95rem); font-weight:700; color:var(--text); white-space:nowrap; }
.day-count{ font-family:'Dancing Script',cursive; font-size:clamp(.8rem,1.3vw,.88rem); color:var(--muted); background:var(--secondary); padding:2px 10px; border-radius:20px; white-space:nowrap; }
.day-chevron{ width:18px; height:18px; flex-shrink:0; color:var(--muted); transition:transform .3s; }
.day-header.open .day-chevron{ transform:rotate(180deg); }
.day-body{
  background:#fff; border:1.5px solid rgba(193,124,116,.2);
  border-top:none; border-radius:0 0 14px 14px;
  overflow:hidden; max-height:0;
  transition:max-height .4s ease, padding .3s ease;
  padding-left:clamp(12px,2.5vw,18px); padding-right:clamp(12px,2.5vw,18px);
  padding-top:0; padding-bottom:0;
}
.day-body.open{ max-height:2000px; padding:clamp(12px,2.5vw,18px); }

/* MEDIA GRID */
.media-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(clamp(80px,12vw,130px),1fr));
  gap:clamp(7px,1.2vw,10px); margin-bottom:clamp(12px,2vw,16px);
}
.media-item{
  aspect-ratio:1; border-radius:12px; overflow:hidden;
  border:1.5px solid var(--border); position:relative; cursor:pointer;
  transition:transform .3s,box-shadow .3s; background:var(--accent);
}
.media-item:hover{ transform:scale(1.04); box-shadow:0 8px 24px rgba(193,124,116,.2); }
.media-item img,.media-item video{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.media-item-badge{ position:absolute; bottom:6px; right:7px; background:rgba(45,31,26,.7); color:#fff; font-size:.6rem; font-weight:700; padding:2px 7px; border-radius:5px; text-transform:uppercase; letter-spacing:.5px; pointer-events:none; }
.media-item-del{
  position:absolute; top:5px; right:5px;
  background:rgba(193,124,116,.85); color:#fff; border:none;
  width:22px; height:22px; border-radius:50%; cursor:pointer;
  font-size:.9rem; align-items:center; justify-content:center;
  display:none; transition:background .2s; line-height:1; padding:0;
}
.media-item:hover .media-item-del{ display:flex; }
.media-item-del:hover{ background:var(--primary); }

/* EMPTY SLOT */
.media-empty-slot{
  aspect-ratio:1; border-radius:12px;
  border:2px dashed rgba(193,124,116,.25); background:rgba(253,240,236,.5);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:4px; color:var(--muted);
  font-family:'Dancing Script',cursive; font-size:clamp(.65rem,1.2vw,.78rem);
  animation:pulse 2s ease infinite;
}

/* UPLOAD ROW */
.upload-row{ display:flex; align-items:center; gap:clamp(7px,1.5vw,10px); flex-wrap:wrap; }
.media-upload-label{
  display:inline-flex; align-items:center; gap:8px;
  padding:clamp(7px,1.2vw,9px) clamp(14px,2.5vw,20px);
  background:var(--primary); color:#fff;
  border-radius:30px; cursor:pointer; border:none;
  font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,.95rem);
  transition:transform .2s,box-shadow .2s; box-shadow:0 4px 14px rgba(193,124,116,.25); white-space:nowrap;
}
.media-upload-label:hover{ transform:translateY(-2px); box-shadow:0 8px 20px rgba(193,124,116,.35); }
.media-save-btn{
  display:inline-flex; align-items:center; gap:7px;
  padding:clamp(7px,1.2vw,9px) clamp(14px,2.5vw,20px);
  background:#fff; color:var(--primary);
  border:1.5px solid var(--border); border-radius:30px; cursor:pointer;
  font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,.95rem);
  transition:background .2s,box-shadow .2s; box-shadow:0 2px 10px rgba(193,124,116,.08); white-space:nowrap;
}
.media-save-btn:hover{ background:var(--accent); }
.media-save-btn:disabled{ opacity:.45; cursor:default; }
.save-toast{ font-family:'Dancing Script',cursive; font-size:.9rem; color:var(--primary); padding:6px 14px; background:var(--secondary); border-radius:20px; animation:fadeIn .3s ease; }
.save-toast.error{ color:#e05c5c; background:#fde8e8; }

/* LIGHTBOX */
.lightbox-backdrop{
  position:fixed; inset:0; z-index:300;
  background:rgba(20,10,8,.9);
  backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center;
  padding:clamp(12px,4vw,20px); animation:fadeIn .2s ease both;
}
.lightbox-media{ max-width:min(90vw,900px); max-height:80vh; border-radius:16px; object-fit:contain; box-shadow:0 40px 100px rgba(0,0,0,.5); }
.lightbox-close{
  position:absolute; top:clamp(12px,2vw,20px); right:clamp(14px,3vw,24px);
  background:rgba(255,255,255,.15); border:none; cursor:pointer;
  width:44px; height:44px; border-radius:50%; color:#fff;
  display:flex; align-items:center; justify-content:center; transition:background .2s;
}
.lightbox-close:hover{ background:rgba(255,255,255,.3); }
.lightbox-actions{ position:absolute; bottom:clamp(14px,3vw,24px); display:flex; gap:clamp(8px,1.5vw,12px); flex-wrap:wrap; justify-content:center; }
.lightbox-btn{
  display:inline-flex; align-items:center; gap:7px;
  background:var(--primary); color:#fff; border:none; cursor:pointer;
  padding:clamp(8px,1.5vw,10px) clamp(14px,2.5vw,22px); border-radius:30px;
  font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,.95rem);
  box-shadow:0 4px 20px rgba(0,0,0,.3); transition:transform .2s; text-decoration:none; white-space:nowrap;
}
.lightbox-btn:hover{ transform:translateY(-3px); }
.lightbox-btn.secondary{ background:rgba(255,255,255,.18); }
.lightbox-btn.secondary:hover{ background:rgba(255,255,255,.28); }

/* FOOTER */
.mp-footer{ text-align:center; padding:clamp(28px,5vw,56px) 0; border-top:2px dashed var(--border); width:100%; }
.mp-footer p{ font-family:'Dancing Script',cursive; font-size:clamp(.85rem,1.5vw,1rem); color:var(--muted); }

/* BREAKPOINTS */
@media(max-width:900px){ .vlog-grid{ grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr)); } }
@media(max-width:600px){
  :root{ --px:16px; }
  .vlog-grid{ grid-template-columns:1fr; }
  .media-grid{ grid-template-columns:repeat(auto-fill,minmax(clamp(70px,22vw,110px),1fr)); }
  .mp-logo-sub{ display:none; }
  .upload-row{ flex-direction:column; align-items:stretch; }
  .media-upload-label,.media-save-btn{ justify-content:center; }
  .lightbox-actions{ bottom:10px; }
}
@media(max-width:380px){
  .week-tab{ padding:7px 12px; font-size:.8rem; }
  .day-count{ display:none; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const IcoBack     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoStar     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IcoChevron  = () => <svg className="day-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>;
const IcoX        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoCamera   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IcoSave     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IcoDownload = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD MODAL
// ─────────────────────────────────────────────────────────────────────────────
// Password for protected actions (add/delete)
const CORRECT_PASSWORD = "ojt2026";

// Password protection modal for sensitive operations
function PasswordModal({ action, onConfirm, onCancel }) {
  const [pw, setPw]       = useState("");
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (pw === CORRECT_PASSWORD) {
      onConfirm();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="pw-backdrop" onClick={onCancel}>
      <div className="pw-box" onClick={e => e.stopPropagation()}>
        <h3>🔒 Password Required</h3>
        <p>Enter the password to <strong>{action}</strong>.</p>
        <input
          className="pw-input"
          type="password"
          placeholder="••••••••"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleConfirm()}
          autoFocus
        />
        {error && <span className="pw-error">❌ Wrong password, try again.</span>}
        <div className="pw-actions">
          <button className="pw-cancel" onClick={onCancel}>Cancel</button>
          <button className="pw-confirm" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DAY BLOCK
// ─────────────────────────────────────────────────────────────────────────────
// Individual day block component for media management
function DayBlock({ weekIdx, dayIdx, dayLabel }) {
  // State management for the day block
  const [open, setOpen]         = useState(false);        // Accordion open/closed
  const [items, setItems]       = useState([]);         // Media items array
  const [loaded, setLoaded]     = useState(false);      // Loading state
  const [lightbox, setLightbox] = useState(null);       // Lightbox viewer
  const [toast, setToast]       = useState(null);       // Toast notifications
  const [saving, setSaving]     = useState(false);      // Save operation state
  const [pwModal, setPwModal]   = useState(null);       // Password modal
  // Refs for operations
  const pendingDeleteRef        = useRef(null);         // Pending delete index
  const fileInputRef            = useRef(null);         // File input element
  const toastTimer              = useRef(null);         // Toast timer

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setItems([]);
    setOpen(false);
    dbLoad(weekIdx, dayIdx).then(data => {
      if (!cancelled) {
        setItems(data);
        setLoaded(true);
      }
    });
    return () => { cancelled = true; };
  }, [weekIdx, dayIdx]);

  const showToast = (msg, ok = true) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, ok });
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const autoSave = useCallback(async (newItems) => {
    await dbSave(weekIdx, dayIdx, newItems);
  }, [weekIdx, dayIdx]);

  const handleUploadClick = () => {
    setPwModal({
      action: "add photos / videos",
      onConfirm: () => {
        setPwModal(null);
        fileInputRef.current?.click();
      },
    });
  };

  const handleFilesPicked = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const converted = await Promise.all(files.map(async (f) => {
      const dataUrl = await fileToBase64(f);
      return { dataUrl, type: f.type.startsWith("video") ? "video" : "photo", name: f.name };
    }));
    const updated = [...items, ...converted];
    setItems(updated);
    await autoSave(updated);
    if (!open) setOpen(true);
    showToast(`✓ ${converted.length} file${converted.length > 1 ? "s" : ""} added & saved!`);
    e.target.value = "";
  };

  const handleDeleteClick = (idx) => {
    pendingDeleteRef.current = idx;
    setPwModal({
      action: "delete this item",
      onConfirm: async () => {
        setPwModal(null);
        const i = pendingDeleteRef.current;
        const updated = items.filter((_, index) => index !== i);
        setItems(updated);
        await autoSave(updated);
        setLightbox(null);
        pendingDeleteRef.current = null;
        showToast("🗑 Deleted & saved.");
      },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await dbSave(weekIdx, dayIdx, items);
    setSaving(false);
    showToast(
      ok
        ? "✓ Saved! Your photos will still be here after refresh."
        : "⚠ Save failed — storage may be full.",
      ok
    );
  };

  const handleDownload = (item) => {
    const a = document.createElement("a");
    a.href = item.dataUrl;
    a.download = item.name || `ojt-media-${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="day-block">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFilesPicked}
      />

      {pwModal && (
        <PasswordModal
          action={pwModal.action}
          onConfirm={pwModal.onConfirm}
          onCancel={() => setPwModal(null)}
        />
      )}

      {/* ── HEADER ── */}
      <div
        className={`day-header${open ? " open" : ""}`}
        onClick={() => loaded && setOpen(o => !o)}
        style={{ cursor: loaded ? "pointer" : "default" }}
      >
        <div className="day-header-left">
          <div className="day-dot" />
          <span className="day-name">{dayLabel}</span>
          {loaded
            ? <span className="day-count">{items.length} {items.length === 1 ? "item" : "items"}</span>
            : <span className="day-count" style={{ opacity: .4 }}>loading…</span>
          }
        </div>
        <IcoChevron />
      </div>

      {/* ── BODY ── */}
      <div className={`day-body${open ? " open" : ""}`}>
        {items.length > 0 && (
          <div className="media-grid">
            {items.map((item, i) => (
              <div className="media-item" key={i}>
                {item.type === "video"
                  ? <video src={item.dataUrl} muted playsInline />
                  : <img src={item.dataUrl} alt={item.name || `photo ${i + 1}`} />
                }
                <span className="media-item-badge">
                  {item.type === "video" ? "▶ vid" : "📷"}
                </span>
                <button
                  className="media-item-del"
                  onClick={e => { e.stopPropagation(); handleDeleteClick(i); }}
                  title="Delete (requires password)"
                >×</button>
                <div
                  style={{ position: "absolute", inset: 0, cursor: "pointer" }}
                  onClick={() => setLightbox({ ...item, idx: i })}
                />
              </div>
            ))}
            {items.length < 4 &&
              Array.from({ length: Math.min(2, 4 - items.length) }).map((_, i) => (
                <div className="media-empty-slot" key={`ghost${i}`}>
                  <span style={{ fontSize: "1.3rem", opacity: .35 }}>+</span>
                  <span>add</span>
                </div>
              ))
            }
          </div>
        )}

        <div className="upload-row">
          <button className="media-upload-label" onClick={handleUploadClick}>
            <IcoCamera /> Add Photos / Videos
          </button>
          {items.length > 0 && (
            <button className="media-save-btn" onClick={handleSave} disabled={saving}>
              <IcoSave /> {saving ? "Saving…" : "Save"}
            </button>
          )}
          {toast && (
            <span className={`save-toast${toast.ok ? "" : " error"}`}>
              {toast.msg}
            </span>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><IcoX /></button>
          {lightbox.type === "video"
            ? <video src={lightbox.dataUrl} className="lightbox-media" controls autoPlay onClick={e => e.stopPropagation()} />
            : <img src={lightbox.dataUrl} className="lightbox-media" alt="preview" onClick={e => e.stopPropagation()} />
          }
          <div className="lightbox-actions">
            <button className="lightbox-btn" onClick={e => { e.stopPropagation(); handleDownload(lightbox); }}>
              <IcoDownload /> Download
            </button>
            <button className="lightbox-btn secondary" onClick={e => { e.stopPropagation(); handleDeleteClick(lightbox.idx); }}>
              🗑 Delete
            </button>
            <button className="lightbox-btn secondary" onClick={() => setLightbox(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WEEKLY MEDIA SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Weekly media section with week tabs
function WeeklyMediaSection() {
  const [activeWeek, setActiveWeek] = useState(0);  // Currently selected week

  return (
    <div className="mp-section">
      <div className="mp-section-head">
        <h2>Documents</h2>
       
      </div>

      <div className="week-tabs-wrap">
        <div className="week-tabs">
          {WEEK_DATES.map((docName, i) => (
            <button
              key={i}
              className={`week-tab${i === activeWeek ? " active" : ""}`}
              onClick={() => setActiveWeek(i)}
            >
              {docName.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="week-date-range">
        <IcoStar />
        <span>{WEEK_DATES[activeWeek]}</span>
      </div>

      {DAY_LABELS.map((label, di) => (
        <DayBlock
          key={`w${activeWeek}-d${di}`}
          weekIdx={activeWeek}
          dayIdx={di}
          dayLabel={label}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VLOG SECTION
// ─────────────────────────────────────────────────────────────────────────────
// Video section component
function VlogSection() {
  return (
    <div className="mp-section">
      <div className="mp-section-head">
        <h2>Seat and Table Reservation</h2>
       
      </div>
      <div className="vlog-grid">
        {VLOGS.map((v, i) => (
          <div className="vlog-card" key={v.id} style={{ animationDelay: `${i * .08}s` }}>
            <div className="vlog-thumb">
              <video
                src={v.src}
                controls
                playsInline
                preload="metadata"
              />
              <span className="vlog-emoji">{v.emoji}</span>
              <span className="vlog-duration">{v.duration}</span>
            </div>
            <div className="vlog-body">
              <span className="vlog-tag">{v.tag}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
// Navigation topbar component
function Topbar() {
  return (
    <nav className="mp-topbar">
      <div className="mp-topbar-inner">
        <span className="mp-logo">
          <IcoStar /> Sarah C. Abane
          <span className="mp-logo-sub">— media</span>
        </span>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
// Main MediaPage component export
export default function MediaPage({ onBack }) {
  // Scroll to top on page load
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="mp-page">
      <style>{css}</style>
      <Topbar />

      <div className="mp-content">
        <div className="mp-back-row">
          <button className="mp-back-btn" onClick={onBack}>
            <IcoBack /> Back to Blog
          </button>
        </div>

        <div className="mp-hero anim-up">
          <div className="mp-hero-badge">📸 Behind the Scenes</div>
          <h1><em>Internship Project & Documents</em></h1>
          <p className="mp-hero-sub">
            All my OJT documents, projects, and weekly tasks from my internship at The Bellevue Manila — organized and easy to browse.
          </p>
        </div>

        <VlogSection />

        <hr className="mp-divider" />

        <WeeklyMediaSection />

        <footer className="mp-footer">
          <p>© {new Date().getFullYear()} Sarah C. Abane · Made with ♡ during OJT at Bellevue Manila</p>
        </footer>
      </div>
    </div>
  );
}