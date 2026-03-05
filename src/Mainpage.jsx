import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import profileImage from "./assets/profile2.jpeg";
import week1Image from "./assets/week1.png";
import week1Image2 from "./assets/week2.png";
import MediaPage from "./MediaPage";

// ── WEEK DATA WITH DAILY TASKS ────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    title: "Laying the Foundation",
    excerpt: "Research, System Analysis & Flowchart Design",
    author: "Sarah C. Abane",
    date: "February 23-27 2026",
    category: "WEEK 1",
    imageUrl: week1Image,
    modal: {
      overview: "Focused on understanding the seat and table management domain, analyzing existing systems, and designing the core system flowchart.",
      days: [
        { date: "February 23, 2026 (Monday)", task: "Orientation with Sir Jinno and Sir Teddy", blocker: "n/a" },
        { date: "February 24, 2026 (Tuesday)", task: "R&D - Researched existing applications and websites related to seat and table management systems.", blocker: "n/a" },
        { date: "February 25, 2026 (Wednesday)", task: "Created a comparison table among existing systems and identified key functionalities.", blocker: "n/a" },
        { date: "February 26, 2026 (Thursday)", task: "Started the flowchart design (both for client and admin side).", blocker: "n/a" },
        { date: "February 27, 2026 (Friday)", task: "Finished Flowchart, Started UI/UX Design.", blocker: "n/a" },
      ],
      deliverables: ["R&D Research Document", "Application Comparison Table", "System Flowchart (Admin & Client)", "Initial UI/UX Wireframes"],
    },
  },
  {
    id: 2,
    title: "System Development Phase",
    excerpt: "Frontend Development for Admin & Client Side",
    author: "Sarah C. Abane",
    date: "March 2-6 2026",
    category: "WEEK 2",
    imageUrl: week1Image2,
    modal: {
      overview: "Started project development; building the client-side landing page and admin interface.",
      days: [
        { date: "March 02, 2026 (Monday)", task: "Started project development; building the client-side landing page", blocker: "n/a" },
        { date: "March 03, 2026 (Tuesday)", task: "Polished the landing page on the client side. Coded the All Venues page. Started coding one of the seat and table layouts.", blocker: "n/a" },
        { date: "March 04, 2026 (Wednesday)", task: "Focused on front-end development. Developed the admin side, including: Admin login page, Admin dashboard, Seat map layout", blocker: "n/a" },
        { date: "March 05, 2026 (Thursday)", task: "", blocker: "n/a" },
        { date: "March 06, 2026 (Friday)", task: "", blocker: "n/a" },
      ],
      deliverables: ["Landing Page", "All Venues Page", "Reservation Page", "Admin Login Page", "Admin Dashboard", "Seat Map Layout"],
    },
  },
  // ── EDIT HERE ─────────────────────────────
  {
    id: 3,
    title: "Backend Integration",
    excerpt: "API Development & Database Design",
    author: "Sarah C. Abane",
    date: "March 9-13 2026",
    category: "WEEK 3",
    imageUrl: week1Image2,
    modal: {
      overview: "Focused on building the backend APIs and connecting the frontend to the database.",
      days: [
        { date: "March 9, 2026 (Monday)", task: "Designed database schema for reservations and seats.", blocker: "n/a" },
        { date: "March 10, 2026 (Tuesday)", task: "Built REST API endpoints for CRUD operations.", blocker: "n/a" },
        { date: "March 11, 2026 (Wednesday)", task: "Connected frontend forms to backend API.", blocker: "n/a" },
        { date: "March 12, 2026 (Thursday)", task: "Implemented authentication middleware.", blocker: "n/a" },
        { date: "March 13, 2026 (Friday)", task: "Testing and debugging API responses.", blocker: "n/a" },
      ],
      deliverables: ["Database Schema", "REST API", "Authentication System"],
    },
  },
  {
    id: 4,
    title: "Feature Development",
    excerpt: "Real-time Updates & Reservation Logic",
    author: "Sarah C. Abane",
    date: "March 16-20 2026",
    category: "WEEK 4",
    imageUrl: week1Image2,
    modal: {
      overview: "Implemented core business logic — real-time seat availability, reservation approval flow, and admin controls.",
      days: [
        { date: "March 16, 2026 (Monday)", task: "Implemented real-time seat status updates using WebSockets.", blocker: "n/a" },
        { date: "March 17, 2026 (Tuesday)", task: "Built reservation approval flow for admin.", blocker: "n/a" },
        { date: "March 18, 2026 (Wednesday)", task: "Added expiration timer for pending reservations.", blocker: "n/a" },
        { date: "March 19, 2026 (Thursday)", task: "Implemented queueing for conflicting seat requests.", blocker: "n/a" },
        { date: "March 20, 2026 (Friday)", task: "UI refinements and responsive testing.", blocker: "n/a" },
      ],
      deliverables: ["Real-time Seat Updates", "Admin Approval Panel", "Queueing System"],
    },
  },
  {
    id: 5,
    title: "Testing & QA",
    excerpt: "System Testing, Bug Fixing & Optimization",
    author: "Sarah C. Abane",
    date: "March 23-27 2026",
    category: "WEEK 5",
    imageUrl: week1Image2,
    modal: {
      overview: "Dedicated testing week — unit tests, integration testing, performance tuning, and fixing reported issues.",
      days: [
        { date: "March 23, 2026 (Monday)", task: "Wrote unit tests for API endpoints.", blocker: "n/a" },
        { date: "March 24, 2026 (Tuesday)", task: "Integration testing between frontend and backend.", blocker: "n/a" },
        { date: "March 25, 2026 (Wednesday)", task: "Performance profiling and query optimization.", blocker: "n/a" },
        { date: "March 26, 2026 (Thursday)", task: "Fixed bugs from QA review.", blocker: "n/a" },
        { date: "March 27, 2026 (Friday)", task: "Final round of testing and documentation.", blocker: "n/a" },
      ],
      deliverables: ["Test Reports", "Bug Fix Log", "Performance Metrics"],
    },
  },
  {
    id: 6,
    title: "Deployment & Handoff",
    excerpt: "Deployment, Documentation & Presentation",
    author: "Sarah C. Abane",
    date: "March 30 – April 3 2026",
    category: "WEEK 6",
    imageUrl: week1Image2,
    modal: {
      overview: "Final stretch — deploying the system, writing documentation, and preparing for the internship presentation.",
      days: [
        { date: "March 30, 2026 (Monday)", task: "Deployed system to staging environment.", blocker: "n/a" },
        { date: "March 31, 2026 (Tuesday)", task: "Wrote technical and user documentation.", blocker: "n/a" },
        { date: "April 1, 2026 (Wednesday)", task: "Prepared presentation slides and demo walkthrough.", blocker: "n/a" },
        { date: "April 2, 2026 (Thursday)", task: "Final demo with supervisor review.", blocker: "n/a" },
        { date: "April 3, 2026 (Friday)", task: "Handoff and closing documentation.", blocker: "n/a" },
      ],
      deliverables: ["Deployed System", "Technical Documentation", "Presentation Deck"],
    },
  },
  {
    id: 7,
    title: "Week 7",
    excerpt: "Coming soon...",
    author: "Sarah C. Abane",
    date: "April 6-10 2026",
    category: "WEEK 7",
    imageUrl: week1Image2,
    modal: null,
  },
  {
    id: 8,
    title: "Week 8",
    excerpt: "Coming soon...",
    author: "Sarah C. Abane",
    date: "April 13-17 2026",
    category: "WEEK 8",
    imageUrl: week1Image2,
    modal: null,
  },
  {
    id: 9,
    title: "Week 9",
    excerpt: "Coming soon...",
    author: "Sarah C. Abane",
    date: "April 20-24 2026",
    category: "WEEK 9",
    imageUrl: week1Image2,
    modal: null,
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary: #c17c74;
  --primary-light: rgba(193,124,116,0.12);
  --accent: #fdf0ec;
  --secondary: #fce4dc;
  --bg: #fdf8f5;
  --white: #ffffff;
  --text: #2d1f1a;
  --muted: #8c6a62;
  --border: rgba(193,124,116,0.15);
  --radius: 16px;
}

html { scroll-behavior: smooth; }
body {
  font-family: 'Lato', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
}
::selection { background: var(--primary-light); }

/* ── Animations ── */
@keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeLeft { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn  { from { opacity:0; transform:scale(0.88) rotate(4deg); } to { opacity:1; transform:scale(1) rotate(0deg); } }
@keyframes float    { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-10px); } }
@keyframes pulse    { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.6; transform:scale(1.15); } }
@keyframes modalIn  { from { opacity:0; transform:scale(.94) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
@keyframes backdropIn { from { opacity:0; } to { opacity:1; } }

.anim-fade-up  { animation: fadeUp  .8s ease both; }
.anim-fade-left{ animation: fadeLeft .8s ease both; }
.anim-scale-in { animation: scaleIn 1s cubic-bezier(.2,1.2,.4,1) both; }

/* ── Glass Nav ── */
.glass-nav {
  background: rgba(253,248,245,.9);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 20px rgba(193,124,116,.08);
}

/* ── HEADER ── */
.site-header {
  position: fixed; top:0; left:0; right:0;
  z-index: 50;
  transition: all .3s ease;
  padding: 20px 0;
}
.site-header.scrolled { padding: 12px 0; }
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 0 clamp(16px,4vw,40px);
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
}
.nav-logo {
  font-family: 'Playfair Display',serif;
  font-size: clamp(1.2rem,2.5vw,1.7rem);
  font-weight: 700; color: var(--primary);
  text-decoration: none;
  display: flex; align-items: center; gap: 8px; white-space: nowrap;
}
.nav-logo-sub { font-family:'Dancing Script',cursive; font-size:.9rem; color:var(--muted); }
.nav-links { display:flex; align-items:center; gap:clamp(14px,2.5vw,32px); list-style:none; }
.nav-links a {
  font-family:'Dancing Script',cursive; font-size:clamp(.95rem,1.2vw,1.1rem);
  color:rgba(45,31,26,.65); text-decoration:none; position:relative; transition:color .25s;
}
.nav-links a::after {
  content:''; position:absolute; bottom:-3px; left:0;
  width:0; height:2px; background:var(--primary); border-radius:2px;
  transition:width .3s; opacity:.5;
}
.nav-links a:hover { color:var(--primary); }
.nav-links a:hover::after { width:100%; }
.nav-cta {
  background:var(--primary); color:white !important;
  padding:8px 22px; border-radius:30px;
  font-family:'Dancing Script',cursive !important; font-size:1.1rem !important;
  box-shadow:0 4px 14px rgba(193,124,116,.35);
  transition:transform .25s, box-shadow .25s !important;
  border:none; cursor:pointer;
}
.nav-cta:hover { transform:rotate(2deg) !important; }
.hamburger { display:none; background:none; border:none; cursor:pointer; padding:4px; color:var(--primary); }
.mobile-menu {
  position:fixed; inset:0; z-index:60;
  background:rgba(253,248,245,.98);
  display:flex; flex-direction:column; padding:32px;
}
.mobile-menu.hidden { display:none; }
.mobile-menu nav { display:flex; flex-direction:column; gap:28px; margin-top:48px; }
.mobile-menu nav a { font-family:'Dancing Script',cursive; font-size:2.2rem; color:rgba(45,31,26,.65); text-decoration:none; }
.mobile-menu-top { display:flex; justify-content:space-between; align-items:center; }

/* ── HERO ── */
.hero {
  padding-top:clamp(100px,14vw,140px); padding-bottom:clamp(48px,8vw,96px);
  max-width:1200px; margin:0 auto;
  padding-left:clamp(16px,4vw,40px); padding-right:clamp(16px,4vw,40px);
  display:grid; grid-template-columns:1fr 1fr;
  gap:clamp(28px,5vw,64px); align-items:center;
}
.hero-badge {
  display:inline-block; padding:6px 18px;
  background:var(--accent); border-radius:30px;
  font-family:'Dancing Script',cursive; font-size:1.1rem; color:var(--primary);
  margin-bottom:22px; transform:rotate(-2deg);
}
.hero h1 {
  font-family:'Playfair Display',serif;
  font-size:clamp(3rem,7vw,6rem); line-height:.95;
  margin-bottom:24px; color:var(--text);
}
.hero h1 em { color:var(--primary); font-style:italic; }
.hero-desc {
  font-family:'Dancing Script',cursive;
  font-size:clamp(1rem,1.6vw,1.2rem); color:var(--muted);
  line-height:1.75; max-width:460px; margin-bottom:36px;
}
.hero-desc strong { color:var(--primary); font-weight:600; }
.hero-btns { display:flex; flex-wrap:wrap; gap:14px; }
.btn-primary {
  background:var(--primary); color:white;
  padding:14px 28px; border-radius:14px;
  font-family:'Dancing Script',cursive; font-size:1.35rem;
  border:none; cursor:pointer;
  box-shadow:0 8px 24px rgba(193,124,116,.35);
  display:flex; align-items:center; gap:10px;
  transition:transform .25s; text-decoration:none;
}
.btn-primary:hover { transform:translateY(-3px); }
.btn-outline {
  background:transparent; color:var(--primary);
  padding:14px 28px; border-radius:14px;
  border:2px solid var(--border);
  font-family:'Dancing Script',cursive; font-size:1.35rem;
  cursor:pointer; transition:background .25s; text-decoration:none;
}
.btn-outline:hover { background:var(--white); }
.hero-img-wrap { position:relative; display:flex; justify-content:center; align-items:center; }
.hero-img-card {
  background:white; padding:12px; border-radius:var(--radius);
  box-shadow:0 20px 60px rgba(193,124,116,.2), 0 0 0 2px var(--border);
  transform:rotate(3deg); position:relative; z-index:2; max-width:360px; width:100%;
}
.hero-img-card img { width:100%; border-radius:8px; display:block; }
.hero-heart {
  position:absolute; bottom:-16px; right:-16px;
  background:var(--secondary); padding:14px; border-radius:50%;
  box-shadow:0 4px 16px rgba(193,124,116,.3); border:3px solid white;
  z-index:3; font-size:1.8rem; transform:rotate(-12deg);
  animation:float 3s ease-in-out infinite;
}
.hero-blob {
  position:absolute; width:220px; height:220px;
  background:var(--accent); border-radius:50%; filter:blur(50px);
  opacity:.6; top:10px; left:-30px; z-index:0;
}

/* ── WEEKLY BLOG SECTION ── */
.works-section {
  padding:clamp(40px,7vw,96px) 0;
  max-width:1200px; margin:0 auto;
}
.works-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:0 clamp(16px,4vw,40px); margin-bottom:40px;
}
.works-header h2 {
  font-family:'Playfair Display',serif;
  font-size:clamp(1.8rem,3.5vw,2.8rem); color:var(--text);
}

/* ── Carousel ── */
.slider-container { position:relative; }
.slider-arrow {
  position:absolute; top:42%; transform:translateY(-50%);
  z-index:10; width:48px; height:48px; border-radius:50%;
  border:2px solid rgba(193,124,116,.25); background:white;
  color:var(--primary); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 6px 24px rgba(193,124,116,.2);
  transition:background .2s, transform .2s, box-shadow .2s, opacity .2s;
  opacity:.88;
}
.slider-arrow:hover {
  background:var(--primary); color:white;
  transform:translateY(-50%) scale(1.1);
  box-shadow:0 10px 32px rgba(193,124,116,.35); opacity:1;
}
.slider-arrow:active { transform:translateY(-50%) scale(.96); }
.slider-arrow.left  { left:clamp(4px,1.5vw,16px); }
.slider-arrow.right { right:clamp(4px,1.5vw,16px); }
.slider-arrow:disabled { opacity:.25; cursor:default; pointer-events:none; }

.slider-outer {
  overflow:hidden;
  padding:24px clamp(56px,7vw,80px) 32px;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%);
  mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%);
}
.slider-inner {
  display:flex; gap:clamp(20px,2.8vw,28px);
  transition:transform .65s cubic-bezier(.25,.46,.45,.94);
  will-change:transform;
}

/* ── Post Card ── */
.post-card {
  flex:0 0 clamp(240px,27vw,320px);
  background:white; border-radius:var(--radius); padding:20px;
  position:relative; border:1.5px solid var(--border);
  box-shadow:0 4px 20px rgba(193,124,116,.08);
  transition:opacity .45s ease, filter .45s ease, transform .35s ease, box-shadow .35s ease;
  cursor:pointer;
}
.post-card.active {
  box-shadow:0 16px 48px rgba(193,124,116,.22);
  border-color:rgba(193,124,116,.35); transform:translateY(-4px);
}
.post-card:not(.active) { opacity:.42; filter:blur(3px); pointer-events:none; }
.post-card.active:hover { transform:translateY(-8px); }

.post-card-num {
  position:absolute; top:-14px; left:-14px;
  width:36px; height:36px; background:var(--secondary);
  border-radius:50%; border:2px solid white;
  box-shadow:0 2px 8px rgba(193,124,116,.2);
  display:flex; align-items:center; justify-content:center;
  font-family:'Dancing Script',cursive; font-size:1rem; color:var(--primary); z-index:2;
}
.post-card-img {
  width:100%; aspect-ratio:4/5; border-radius:10px;
  object-fit:cover; display:block; margin-bottom:18px;
  filter:grayscale(50%); transition:filter .5s;
}
.post-card.active .post-card-img { filter:grayscale(0%); }
.post-card-meta { display:flex; align-items:center; margin-bottom:10px; }
.post-card-cat {
  font-size:.66rem; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; color:var(--primary);
  background:var(--primary-light); padding:3px 10px;
  border-radius:4px; margin-right:8px;
}
.post-card-date { font-family:'Dancing Script',cursive; font-size:.88rem; color:var(--muted); }
.post-card h3 {
  font-family:'Playfair Display',serif;
  font-size:clamp(1rem,1.4vw,1.18rem); line-height:1.4;
  margin-bottom:8px; color:var(--text); transition:color .2s; font-weight:700;
}
.post-card.active:hover h3 { color:var(--primary); }
.post-card p {
  font-family:'Dancing Script',cursive; font-size:.92rem;
  color:var(--muted); line-height:1.65;
  display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;
  overflow:hidden; margin-bottom:16px;
}
.post-card-footer {
  padding-top:14px; border-top:1.5px dashed var(--border);
  display:flex; justify-content:space-between; align-items:center;
}
.post-card-footer span {
  font-family:'Dancing Script',cursive; font-size:.92rem;
  font-weight:700; letter-spacing:.5px; color:var(--text);
}

/* ── MODAL BACKDROP ── */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 999;
  background: rgba(45, 31, 26, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(12px, 3vw, 32px);
  animation: backdropIn .25s ease both;
  overflow: hidden;
}

/* ── MODAL BOX ── */
.modal-box {
  background: var(--bg);
  border-radius: 24px;
  width: 100%;
  max-width: 660px;
  max-height: 88vh;
  overflow-y: auto;
  box-shadow: 0 40px 100px rgba(45,31,26,.3), 0 0 0 1px rgba(193,124,116,.15);
  animation: modalIn .35s cubic-bezier(.2,1.2,.4,1) both;
  position: relative;
  margin: 0 auto;
  flex-shrink: 0;
}
.modal-box::-webkit-scrollbar { width: 5px; }
.modal-box::-webkit-scrollbar-track { background: transparent; }
.modal-box::-webkit-scrollbar-thumb { background: var(--secondary); border-radius: 3px; }

.modal-header {
  background:linear-gradient(135deg,var(--secondary) 0%,var(--accent) 100%);
  padding:clamp(24px,4vw,36px) clamp(20px,4vw,36px) clamp(20px,3vw,28px);
  border-radius:24px 24px 0 0;
  position:relative;
}
.modal-close {
  position:absolute; top:16px; right:16px;
  width:36px; height:36px; border-radius:50%;
  background:white; border:1.5px solid var(--border);
  color:var(--muted); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:background .2s, color .2s, transform .2s;
  box-shadow:0 2px 8px rgba(193,124,116,.12);
}
.modal-close:hover { background:var(--primary); color:white; transform:rotate(90deg); }
.modal-week-badge {
  display:inline-block; padding:5px 16px;
  background:var(--primary); color:white;
  border-radius:20px; font-size:.72rem; font-weight:700;
  letter-spacing:2px; text-transform:uppercase;
  margin-bottom:12px;
}
.modal-date-badge {
  font-family:'Dancing Script',cursive;
  font-size:clamp(1.1rem,2vw,1.4rem); color:var(--muted);
  margin-bottom:10px; display:block;
}
.modal-title {
  font-family:'Playfair Display',serif;
  font-size:clamp(1.5rem,3vw,2rem); color:var(--text);
  font-weight:700; margin-bottom:6px; line-height:1.2;
}
.modal-subtitle {
  font-family:'Dancing Script',cursive;
  font-size:clamp(1rem,1.8vw,1.2rem); color:var(--muted);
}
.modal-body { padding:clamp(20px,4vw,32px); }
.modal-section { margin-bottom:28px; }
.modal-section-title {
  font-family:'Playfair Display',serif;
  font-size:.85rem; font-weight:700;
  letter-spacing:1.5px; text-transform:uppercase;
  color:var(--primary); margin-bottom:14px;
  padding-bottom:8px; border-bottom:1.5px dashed var(--border);
}
.modal-overview {
  font-family:'Dancing Script',cursive;
  font-size:1.05rem; color:var(--muted);
  line-height:1.75; background:var(--accent);
  border-radius:12px; padding:16px 20px;
  border-left:3px solid var(--primary);
}
.modal-day {
  background:white; border-radius:12px;
  border:1.5px solid var(--border);
  margin-bottom:10px; overflow:hidden;
  transition:box-shadow .2s;
}
.modal-day:hover { box-shadow:0 4px 16px rgba(193,124,116,.12); }
.modal-day-header {
  padding:11px 16px;
  background:linear-gradient(90deg,var(--accent),var(--bg));
  border-bottom:1px solid var(--border);
  display:flex; align-items:center; gap:10px;
}
.modal-day-dot {
  width:8px; height:8px; border-radius:50%;
  background:var(--primary); flex-shrink:0;
}
.modal-day-date {
  font-family:'Playfair Display',serif;
  font-size:.82rem; font-weight:700; color:var(--text);
}
.modal-day-body { padding:11px 16px; }
.modal-day-task {
  font-family:'Lato',sans-serif;
  font-size:.88rem; color:var(--text); line-height:1.65;
}
.modal-day-blocker {
  font-family:'Dancing Script',cursive;
  font-size:.82rem; color:var(--muted);
  margin-top:5px; display:flex; align-items:center; gap:4px;
}
.modal-deliverables { display:flex; flex-wrap:wrap; gap:8px; }
.modal-tag {
  padding:5px 14px; border-radius:20px;
  background:var(--secondary); color:var(--primary);
  font-size:.78rem; font-weight:700; letter-spacing:.5px;
  font-family:'Lato',sans-serif;
}

/* ── VIDEO / JOURNEY SECTION ── */
.video-section {
  padding:clamp(40px,7vw,96px) clamp(16px,4vw,40px);
  background:rgba(255,255,255,.55); backdrop-filter:blur(12px);
  border-top:2px dashed var(--border); border-bottom:2px dashed var(--border);
  text-align:center;
}
.video-label {
  display:inline-flex; align-items:center; gap:8px;
  font-family:'Dancing Script',cursive; font-size:1.1rem;
  color:var(--primary); margin-bottom:12px;
}
.video-section h2 {
  font-family:'Playfair Display',serif;
  font-size:clamp(2rem,4.5vw,3.2rem); margin-bottom:36px;
}
.video-frame {
  max-width:860px; margin:0 auto; position:relative;
  border-radius:20px; overflow:hidden;
  box-shadow:0 24px 64px rgba(193,124,116,.18);
  border:2px solid var(--border); background:white; padding:10px;
}
.video-frame img { width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:12px; display:block; }
.video-overlay {
  position:absolute; inset:10px; border-radius:12px;
  background:rgba(0,0,0,.15); display:flex; align-items:center; justify-content:center;
  transition:background .3s; cursor:pointer;
}
.video-overlay:hover { background:rgba(0,0,0,.35); }
.video-play {
  font-size:5rem; color:white;
  filter:drop-shadow(0 4px 16px rgba(0,0,0,.3));
  animation:pulse 2s ease-in-out infinite; line-height:1;
}
.video-btn {
  display:inline-flex; align-items:center; gap:12px;
  background:var(--primary); color:white;
  padding:16px 36px; border-radius:50px; border:none; cursor:pointer;
  font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700;
  box-shadow:0 8px 28px rgba(193,124,116,.4);
  transition:transform .3s, box-shadow .3s;
  letter-spacing:.3px; margin-top:32px;
}
.video-btn:hover { transform:translateY(-4px) scale(1.03); box-shadow:0 14px 40px rgba(193,124,116,.5); }
.video-btn:active { transform:scale(.97); }

/* ── FOOTER ── */
.footer {
  padding:clamp(48px,7vw,96px) clamp(16px,4vw,40px) clamp(28px,4vw,48px);
  text-align:center;
}
.footer h2 { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3.5vw,2.8rem); margin-bottom:10px; }
.footer-sub { font-family:'Dancing Script',cursive; font-size:1.15rem; color:var(--muted); margin-bottom:36px; line-height:1.7; max-width:520px; margin-left:auto; margin-right:auto; }
.footer-socials { display:flex; justify-content:center; flex-wrap:wrap; gap:28px; margin-bottom:40px; }
.footer-socials a {
  font-family:'Dancing Script',cursive; font-size:1.2rem;
  color:var(--primary); text-decoration:none;
  transition:transform .2s; display:inline-block;
}
.footer-socials a:hover { transform:translateY(-3px); }
.footer-copy { font-family:'Dancing Script',cursive; font-size:.9rem; color:var(--muted); }

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .hero { grid-template-columns:1fr; }
  .hero-img-wrap { display:none; }
  .hamburger { display:block; }
  .nav-links, .nav-right { display:none; }
  .post-card { flex:0 0 80vw !important; }
  .post-card:not(.active) { opacity:.42; filter:blur(3px); pointer-events:none; }
  .slider-outer { padding:20px 48px 28px; }
  .slider-arrow { width:38px; height:38px; }
  .slider-arrow.left { left:4px; }
  .slider-arrow.right { right:4px; }
  .modal-box { border-radius:18px; }
  .modal-header { border-radius:18px 18px 0 0; }
}
@media(min-width:769px) and (max-width:1023px){
  .post-card { flex:0 0 clamp(240px,38vw,300px); }
  .slider-outer { padding:20px 64px 28px; }
}

/* ── PAGE WRAPPER ── */
#root, #app { display:flex; flex-direction:column; align-items:center; width:100%; }
.page-wrap { width:100%; max-width:1440px; margin:0 auto; overflow-x:hidden; }
.page-center { max-width:1200px; margin:0 auto; padding:0 clamp(16px,4vw,40px); width:100%; }
`;

// ── UTILS ─────────────────────────────────────────────────────────────────────
function fmtDate(d) {
  if (typeof d === "string") return d;
  try { return new Intl.DateTimeFormat("en-US", { month:"short", year:"numeric" }).format(new Date(d)); }
  catch { return ""; }
}

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const IconMenu    = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconX       = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconArrowR  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>;
const IconArrowL  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const IconPlay    = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IconCamera  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconSparkle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IconInsta   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;

// ── MODAL ─────────────────────────────────────────────────────────────────────
function WeekModal({ post, onClose }) {
  const { modal, category, date, title, excerpt } = post;

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose} aria-label="Close"><IconX /></button>
          <div className="modal-week-badge">{category}</div>
          <span className="modal-date-badge">{date}</span>
          <h2 className="modal-title">{title}</h2>
          <p className="modal-subtitle">{excerpt}</p>
        </div>
        <div className="modal-body">
          {modal.overview && (
            <div className="modal-section">
              <div className="modal-section-title">Overview</div>
              <div className="modal-overview">{modal.overview}</div>
            </div>
          )}
          {modal.days && modal.days.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Daily Tasks</div>
              {modal.days.map((d, i) => (
                <div className="modal-day" key={i}>
                  <div className="modal-day-header">
                    <div className="modal-day-dot" />
                    <div className="modal-day-date">{d.date}</div>
                  </div>
                  <div className="modal-day-body">
                    <div className="modal-day-task">{d.task}</div>
                    {d.blocker && d.blocker !== "n/a" && (
                      <div className="modal-day-blocker">⚠️ Blocker: {d.blocker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {modal.deliverables && modal.deliverables.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Deliverables</div>
              <div className="modal-deliverables">
                {modal.deliverables.map((d, i) => (
                  <span className="modal-tag" key={i}>✓ {d}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["About", "Weekly Blog", "Events", "Contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled glass-nav" : ""}`}>
        <div className="nav-inner">
          <button className="hamburger" onClick={() => setMenuOpen(true)}><IconMenu /></button>
          <a href="/" className="nav-logo">
            <IconSparkle /> Sarah C. Abane
            <span className="nav-logo-sub">— blog</span>
          </a>
          <ul className="nav-links">
            {links.map(l => <li key={l}><a href={`#${l.toLowerCase().replace(" ","-")}`}>{l}</a></li>)}
          </ul>
          <div className="nav-right" style={{ display:"flex", alignItems:"center", gap:14 }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:"var(--primary)" }}><IconInsta /></button>
            <button className="nav-cta">Welcome! 👋</button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? "" : " hidden"}`}>
        <div className="mobile-menu-top">
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", fontWeight:700, color:"var(--primary)" }}>Explore</span>
          <button onClick={() => setMenuOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--primary)" }}><IconX /></button>
        </div>
        <nav>{links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>)}</nav>
      </div>
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="anim-fade-left" style={{ animationDelay:".1s" }}>
        <div className="hero-badge">welcome to my OJT blog! ✨</div>
        <h1>Hello and <em>Hola!</em></h1>
        <p className="hero-desc">
          I'm a 4th year student at Bicol University completing my 486-hour OJT at{" "}
          <strong>The Bellevue Manila</strong> under the{" "}
          <strong>Bellesoft Department</strong> as a full stack intern. This weekly blog shares my hands-on experiences, lessons learned, and growth in real-world development.
        </p>
        <div className="hero-btns">
          <a href="#video" className="btn-primary"><IconPlay /> Watch My OJT Journey</a>
          <a href="#weekly-blog" className="btn-outline">Read Blog</a>
        </div>
      </div>
      <div className="hero-img-wrap anim-scale-in" style={{ animationDelay:".3s" }}>
        <div className="hero-blob" />
        <div className="hero-img-card">
          <img
            src={profileImage}
            alt="Sarah C. Abane"
            onError={e => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"; }}
          />
          <div className="hero-heart">♡</div>
        </div>
      </div>
    </section>
  );
}

// ── POST CARD ─────────────────────────────────────────────────────────────────
function PostCard({ post, index, active, onReadEntry }) {
  return (
    <article className={`post-card${active ? " active" : ""}`}>
      <div className="post-card-num">0{index + 1}</div>
      <img className="post-card-img" src={post.imageUrl} alt={post.title} loading="lazy"
        onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"; }} />
      <div className="post-card-meta">
        <span className="post-card-cat">{post.category}</span>
        <span className="post-card-date">{fmtDate(post.date)}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="post-card-footer">
        <span
          onClick={active && post.modal ? onReadEntry : undefined}
          style={{ cursor: active && post.modal ? "pointer" : "default", opacity: active && post.modal ? 1 : .5 }}
        >
          Read Entry →
        </span>
        <IconCamera />
      </div>
    </article>
  );
}

// ── WEEKLY BLOG ───────────────────────────────────────────────────────────────
function WeeklyBlog({ posts }) {
  const [cur, setCur] = useState(0);
  const [openModal, setOpenModal] = useState(null);
  const outerRef = useRef(null);
  const trackRef = useRef(null);

  const recalc = useCallback((idx) => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track || !track.children[idx]) return;
    const outerW = outer.offsetWidth;
    const card   = track.children[idx];
    const offset = card.offsetLeft - (outerW / 2 - card.offsetWidth / 2);
    track.style.transform = `translateX(-${Math.max(0, offset)}px)`;
  }, []);

  const goTo = useCallback((raw) => {
    const c = Math.max(0, Math.min(raw, posts.length - 1));
    setCur(c);
    requestAnimationFrame(() => recalc(c));
  }, [posts.length, recalc]);

  useEffect(() => {
    const h = () => recalc(cur);
    window.addEventListener("resize", h, { passive:true });
    return () => window.removeEventListener("resize", h);
  }, [cur, recalc]);

  useEffect(() => { recalc(cur); }, []);

  const canPrev = cur > 0;
  const canNext = cur < posts.length - 1;

  return (
    <section id="weekly-blog" className="works-section anim-fade-up" style={{ animationDelay:".2s" }}>
      <div className="works-header">
        <h2>Weekly Blog</h2>
      </div>
      <div className="slider-container">
        <button className="slider-arrow left" onClick={() => goTo(cur - 1)} disabled={!canPrev} aria-label="Previous">
          <IconArrowL />
        </button>
        <div className="slider-outer" ref={outerRef}>
          <div className="slider-inner" ref={trackRef}>
            {posts.map((p, i) => (
              <PostCard
                key={p.id + "-" + i}
                post={p}
                index={i}
                active={i === cur}
                onReadEntry={() => p.modal && setOpenModal(p)}
              />
            ))}
          </div>
        </div>
        <button className="slider-arrow right" onClick={() => goTo(cur + 1)} disabled={!canNext} aria-label="Next">
          <IconArrowR />
        </button>
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:24 }}>
        {posts.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Week ${i+1}`}
            style={{
              width: i === cur ? 24 : 9, height:9, borderRadius:5,
              border:"none", padding:0, cursor:"pointer",
              background: i === cur ? "var(--primary)" : "var(--secondary)",
              transition:"all .3s ease",
            }}
          />
        ))}
      </div>
      {openModal && (
        <WeekModal post={openModal} onClose={() => setOpenModal(null)} />
      )}
    </section>
  );
}

// ── VIDEO / JOURNEY SECTION ───────────────────────────────────────────────────
function VideoSection({ onNavigate }) {
  return (
    <section id="video" className="video-section anim-fade-up" style={{ animationDelay:".15s" }}>
      <div className="video-label"><IconSparkle /> At The Bellevue Manila <IconSparkle /></div>
      <h2>My OJT Journey</h2>
      <div className="video-frame">
        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80" alt="Video thumbnail" />
        <div className="video-overlay" role="button" aria-label="Play video">
          <div className="video-play">▶</div>
        </div>
      </div>
      {/* ── THIS IS THE BUTTON THAT NAVIGATES TO MEDIAPAGE ── */}
      <button className="video-btn" onClick={onNavigate}>
        Episodes / Events 🎬
      </button>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <h2>Thank You!</h2>
      <p className="footer-sub">Thank you for reviewing my internship portfolio. This blog showcases my learning and progress during my OJT at Bellevue Manila.</p>
      <div className="footer-socials">
        <a href="https://www.linkedin.com/in/sarahabane/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/zcrsam" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:abanesarah6@gmail.com">Gmail</a>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Sarah C. Abane</p>
    </footer>
  );
}

// ── MAIN PAGE COMPONENT ───────────────────────────────────────────────────────
function MainPage({ onNavigateToMedia }) {
  return (
    <div className="page-wrap">
      <style>{css}</style>
      <SiteHeader />
      <div className="page-center"><Hero /></div>
      <WeeklyBlog posts={POSTS} />
      {/* onNavigate wires the button → MediaPage */}
      <VideoSection onNavigate={onNavigateToMedia} />
      <Footer />
    </div>
  );
}

// ── ROOT APP — handles page routing ──────────────────────────────────────────
// This is the default export your project should use.
// In your entry point (main.tsx / index.tsx), render: <App />
export default function App() {
  const [page, setPage] = useState("main");

  if (page === "media") {
    return <MediaPage onBack={() => { setPage("main"); window.scrollTo(0,0); }} />;
  }

  return <MainPage onNavigateToMedia={() => { setPage("media"); window.scrollTo(0,0); }} />;
}