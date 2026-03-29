import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import profileImage from "./assets/profile2.jpeg";
import week1Image from "./assets/week1.png";
import week1Image2 from "./assets/week2.png";
import week3Image from "./assets/week3.JPG";
import week5Image from "./assets/week5.JPG";
import week4Image from "./assets/week4.png";
import ojtVid from "./assets/ojtvid.MOV";
import MediaPage from "./MediaPage";

// ── SCRAPBOOK PHOTO IMPORTS ───────────────────────────────────────────────────
// Week 1 photos — from scrap1 folder
import scrap1_a from "./assets/scrap1/1.jpg";
import scrap1_b from "./assets/scrap1/2.jpg";
import scrap1_c from "./assets/scrap1/3.png";
import scrap1_d from "./assets/scrap1/4.jpg";
import scrap1_e from "./assets/scrap1/5.png";

// Food & Perks photos — from food folder (all 12)
import food_a from "./assets/food/1.png";
import food_b from "./assets/food/2.jpg";
import food_c from "./assets/food/3.jpg";
import food_d from "./assets/food/4.jpg";
import food_e from "./assets/food/5.jpg";
import food6 from "./assets/food/food6.png";
import food7 from "./assets/food/food7.png";
import food8 from "./assets/food/food8.JPG";
import food9 from "./assets/food/food9.png";

// Tasks / Tech Stack photos — from tasks folder
import task_a from "./assets/tasks/1.png";
import task_b from "./assets/tasks/2.jpg";
import task_c from "./assets/tasks/3.jpg";
import task_d from "./assets/tasks/4.png";

// Team photos — from team folder
import team_a from "./assets/team/1.jpg";
import team_b from "./assets/team/2.jpg";
import team_c from "./assets/team/3.jpg";
import team_d from "./assets/team/4.jpg";

const SCRAP_IMGS = [scrap1_a, scrap1_b, scrap1_c, scrap1_d, scrap1_e, food_a, food_b, food_c, food_d, task_a, task_b, task_c, task_d, team_a, team_b, team_c, team_d];

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
        { date: "March 05, 2026 (Thursday)", task: "<strong>Front-end only:</strong><br>Fixed color and font consistency<br>Adjusted text elements that were not clearly visible<br>Tested the functionality for adding tables and seats<br>Fixed buttons that were not working properly" },
        { date: "March 06, 2026 (Friday)", task: "Fixed adding and deleting of seats and tables (layout editing)<br>Synced seat layout changes between admin and client sides, including seat reservations" },
      ],
      deliverables: ["Landing Page", "All Venues Page", "Reservation Page", "Admin Login Page", "Admin Dashboard", "Seat Map Layout"],
    },
  },
  {
    id: 3,
    title: "Authentication & Database Integration",
    excerpt: "Backend Development with Real-time Reservation System",
    author: "Sarah C. Abane",
    date: "March 9-13 2026",
    category: "WEEK 3",
    imageUrl: week3Image,
    modal: {
      overview: "Backend integration with authentication, database connectivity, and real-time reservation system development.",
      days: [
        { date: "March 9, 2026 (Monday)", task: "Tried implementing authentication<br>Connected the login functionality<br>Installed Postman and tested the authentication process.", blocker: "n/a" },
        { date: "March 10, 2026 (Tuesday)", task: "Displayed the reservation data from the database on the admin dashboard panels and tables.<br>Modified the client-side flowchart to improve UX clarity.", blocker: "n/a" },
        { date: "March 11, 2026 (Wednesday)", task: "Linked the Seat Map, Admin Dashboard, and Alabang Reserve modules.<br>Seat and table reservations are now successfully stored in the database, making the dashboard information accurate and updated.<br>Added Super Admin role in the database/auth roles and implemented fixes.", blocker: "n/a" },
        { date: "March 12, 2026 (Thursday)", task: "Fixed UI for Landing Page, All Venues Page, and Reservation Page.<br>Fixed role based permissions for Admin and Super Admin.", blocker: "n/a" },
        { date: "March 13, 2026 (Friday)", task: "Completed Main Wing and Tower Wing rooms in the seatmap and enabled reservation linking between client and admin.<br>Added notification icon in the navbar for reservation alerts and system activity updates", blocker: "n/a" },
      ],
      deliverables: ["Authentication System", "Database Integration", "Admin Dashboard", "Real-time Notifications", "Role-based Permissions"],
    },
  },
  {
    id: 4,
    title: "Real-time Features & UI Improvements",
    excerpt: "WebSocket Integration, Notification System & Dashboard Enhancements",
    author: "Sarah C. Abane",
    date: "March 16-20 2026",
    category: "WEEK 4",
    imageUrl: week4Image,
    modal: {
      overview: "Enhanced real-time functionality with WebSocket integration, improved dashboard responsiveness, and fixed UI/UX issues.",
      days: [
        { date: "March 16, 2026 (Monday)", task: "Fixed errors in connection between Reservation Page and Admin Side and corrected color legends for Pending, Available, and Reserved seats<br>Designed notification feature layout in Figma", blocker: "n/a" },
        { date: "March 17, 2026 (Tuesday)", task: "Developed and database-connected Notification Dashboard for reservation/notification monitoring", blocker: "n/a" },
        { date: "March 18, 2026 (Wednesday)", task: "Integrated WebSocket for real-time updates and added live reservation alerts with status indicators", blocker: "n/a" },
        { date: "March 19, 2026 (Thursday)", task: "Added pagination with Previous/Next buttons and page selection.<br>Fixed time display to accurate 12-hour format.<br>Improved dashboard responsiveness with better scrolling and layout adjustments", blocker: "n/a" },
        { date: "March 20, 2026 (Friday)", task: "Fixed Alert pop-ups, update in real time (no page refresh/reload needed).<br>Fixed issue where venue displays '—' initially but shows correctly after refresh", blocker: "n/a" },
      ],
      deliverables: ["WebSocket Integration", "Real-time Notifications", "Dashboard Responsiveness", "Pagination System", "UI/UX Fixes"],
    },
  },
  {
    id: 5,
    title: "Notification Management & Code Optimization",
    excerpt: "Dashboard Features, Pagination & Performance Improvements",
    author: "Sarah C. Abane",
    date: "March 23-27 2026",
    category: "WEEK 5",
    imageUrl: week5Image,
    modal: {
      overview: "Enhanced notification system with management features and optimized code structure for better performance.",
      days: [
        { date: "March 25, 2026 (Wednesday)", task: "Added edit function and delete function to remove individual notifications. Integrated pagination for notifications", blocker: "n/a" },
        { date: "March 26, 2026 (Thursday)", task: "Implemented auto-delete in Admin Dashboard when seats/tables are removed.", blocker: "n/a" },
        { date: "March 27, 2026 (Friday)", task: "Applied code splitting in some files", blocker: "n/a" },
      ],
      deliverables: ["Notification Management", "Pagination", "Auto-delete Features", "Code Splitting"],
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

// ── GALLERY DATA — 4 themed pages ─────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    id: 1,
    week: "Week 1",
    date: "Feb 23 – Mar 6, 2026",
    label: "From Research to Real Code",
    caption:
      "Started my OJT on Feb 23 with orientation, then straight into research - studying existing seat and table management systems and building comparison tables. By Thursday I was already designing flowcharts for both admin and client sides. Friday meant diving into Figma for UI/UX design. The next week, I moved into actual development with Laravel and React, building the landing page, all-venues page, and interactive seat map. They even invited me to a hotel event - super happy with all the funny moments and amazing food! No blockers so far, and they also taught me WebSocket and Docker.",
    tag: "Research · Flowchart · Laravel · React",
    theme: "week",
    sticker: "✦",
    captions: [
      "my name plate! ▬",
      "figma designs 🎨",
      "flowchart done ✍️",
      "orientation day! 🌸 ",
      "hotel event!! 🎉",
    ],
    photos: [scrap1_a, scrap1_b, scrap1_c, scrap1_d, scrap1_e],
  },
  {
    id: 2,
    week: "Hotel Life",
    date: "Feb 2026 onwards",
    label: "Perks, Food & The Little Things",
    caption:
      "Got my locker key on day one - felt so official! The food stubs were a daily highlight because the food here is absolutely amazing every single day. The staff are incredibly kind and welcoming, but they're very strict about grooming standards - hair must be neat, uniform must be perfect, nails must be clean. It's a five-star hotel after all, even interns have to represent the brand! 🗝️🍱",
    tag: "Locker Key · Food Stubs · Hotel Grooming",
    theme: "food",
    sticker: "♡",
    captions: [
        "my locker key! 🔑",
        "adobo 🍖",
        "yumm 🥪",
        "food stub!",
        "lumpiaa ✨",
        "daily meal 🍽️",
        "more food stubs 😍",
        "cakee ♡",
        "grateful 🙏",
      ], photos: [food_a, food_b, food_c, food_d, food_e, food6, food7, food8, food9],
  },
  {
    id: 3,
    week: "The Stack",
    date: "Mar 2–20, 2026",
    label: "REST APIs, MySQL & Real-time Magic",
    caption:
      "The tech stack was challenging but exciting - Laravel on the backend, React on the frontend, REST API connecting everything, and MySQL as the database. They went further and taught me WebSocket for real-time reservation updates and Docker for containerization. So far, no blockers at all - just pure learning every single day. From frontend to backend, database connections to real-time features, it's been an incredible journey of growth.",
    tag: "Laravel · REST API · MySQL · WebSocket · Docker",
    theme: "tasks",
    sticker: "✿",
    captions: [
      "Laravel + React 💻",
      "REST API done ✓",
      "MySQL wired 🗄️",
      "WebSocket ⚡",
      "Docker deploy 🐳",
    ],
    photos: [task_a, task_b, task_c, task_d],
  },
  {
    id: 4,
    week: "The Team",
    date: "Mar 2026",
    label: "Solo Week & Bellesoft Fam",
    caption:
      "My second week was solo - the other interns were on sem break, so I was by myself. But it never felt lonely because I always ended up hanging out at the Bellesoft department office. They always included me in everything and made me feel like I belonged. When the other interns came back, we clicked right away. Everyone is so kind and welcoming - I never felt out of place even for a moment. The Bellesoft team became like family!",
    tag: "Bellesoft · Teamwork · Good Vibes Only",
    theme: "team",
    sticker: "★",
    captions: [
      "solo week 🤍",
      "bellesoft office ✦",
      "always included 😊",
      "team is back! 🎉",
      "best group ever ✿",
    ],
    photos: [team_a, team_b, team_c, team_d],
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
  position:relative;
  overflow:hidden;
}
.video-label {
  display:inline-flex; align-items:center; gap:8px;
  font-family:'Dancing Script',cursive; font-size:1.1rem;
  color:var(--primary); margin-bottom:12px;
  position:relative; z-index:2;
}
.video-section h2 {
  font-family:'Playfair Display',serif;
  font-size:clamp(2rem,4.5vw,3.2rem); margin-bottom:40px;
  position:relative; z-index:2;
}

/* ══ THREE VIDEO STRIP ═══════════════════════════════════════════ */
.three-video-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px,3vw,44px);
  position: relative;
  z-index: 2;
  margin-bottom: 0;
}

/* ── SIDE POLAROID ── */
@keyframes floatPolaroidL { 0%,100%{transform:rotate(-6deg) translateY(0)} 50%{transform:rotate(-6deg) translateY(-10px)} }
@keyframes floatPolaroidR { 0%,100%{transform:rotate(5deg) translateY(0)} 50%{transform:rotate(5deg) translateY(-8px)} }
@keyframes floatCenter    { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(-2deg)} }
@keyframes polaroidPop    { 0%{opacity:0;transform:rotate(var(--init-rot)) translateY(30px) scale(.88)} 100%{opacity:1;transform:rotate(var(--init-rot)) translateY(0) scale(1)} }
@keyframes filmPop        { 0%{opacity:0;transform:scale(.9) translateY(24px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
@keyframes stampPop       { 0%{opacity:0;transform:rotate(12deg) scale(2)} 60%{transform:rotate(12deg) scale(.92)} 100%{opacity:1;transform:rotate(12deg) scale(1)} }
@keyframes floatSticker   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes tapeShimmer    { 0%,100%{opacity:.7} 50%{opacity:1} }

.side-polaroid-wrap {
  flex-shrink: 0;
  position: relative;
}
.side-polaroid-wrap.left-wrap  { animation: floatPolaroidL 5.5s ease-in-out 0.3s infinite; }
.side-polaroid-wrap.right-wrap { animation: floatPolaroidR 6s ease-in-out 0.8s infinite; }

.polaroid-tape {
  position: absolute;
  top: -11px; left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 52px; height: 18px;
  background: rgba(255,210,170,.75);
  border-radius: 2px;
  z-index: 10;
  animation: tapeShimmer 3s ease-in-out infinite;
}
.polaroid-tape::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,.3) 3px,rgba(255,255,255,.3) 4px);
  border-radius: 2px;
}

.side-polaroid {
  background: white;
  padding: 8px 8px 38px;
  border-radius: 3px;
  box-shadow:
    4px 6px 20px rgba(45,31,26,.2),
    0 0 0 1.5px rgba(193,124,116,.12),
    inset 0 0 0 1px rgba(255,255,255,.8);
  position: relative;
  cursor: pointer;
  transition: box-shadow .3s;
}
.side-polaroid:hover {
  box-shadow: 8px 16px 40px rgba(45,31,26,.28), 0 0 0 1.5px rgba(193,124,116,.2);
}
.side-polaroid video {
  width: clamp(118px,13vw,152px);
  height: clamp(168px,19vw,215px);
  object-fit: cover;
  border-radius: 1px;
  display: block;
  background: #1a0f0d;
  pointer-events: none;
}
.side-play-overlay {
  position: absolute;
  top: 8px; left: 8px;
  right: 8px;
  height: clamp(168px,19vw,215px);
  display: flex; align-items: center; justify-content: center;
  transition: opacity .2s;
}
.side-play-overlay.hidden { opacity: 0; pointer-events: none; }
.side-play-btn {
  width: 44px; height: 44px;
  background: rgba(255,255,255,.9);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,.22);
  transition: transform .2s;
}
.side-play-btn:hover { transform: scale(1.1); }
.polaroid-caption {
  font-family: 'Dancing Script', cursive;
  font-size: .88rem; color: var(--muted);
  text-align: center;
  position: absolute; bottom: 9px; left: 0; right: 0;
}
.polaroid-badge {
  position: absolute;
  bottom: -14px; right: -12px;
  background: var(--secondary);
  border: 2.5px solid white;
  border-radius: 50%;
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(193,124,116,.22);
  z-index: 2;
}
.polaroid-corner-sticker {
  position: absolute;
  font-size: .95rem;
  top: -16px; right: -14px;
  animation: floatSticker 4s ease-in-out 0.5s infinite;
  pointer-events: none;
  z-index: 3;
}

/* ── CENTER FILM STRIP ── */
.center-film-wrap {
  animation: floatCenter 5s ease-in-out 0.5s infinite;
  position: relative;
  z-index: 3;
  flex-shrink: 0;
}
.film-strip-player {
  background: #1c0f0c;
  border-radius: 12px;
  padding: 10px 8px;
  position: relative;
  cursor: pointer;
  box-shadow:
    0 32px 80px rgba(45,31,26,.45),
    0 0 0 1px rgba(255,150,100,.12),
    0 0 0 3px rgba(193,124,116,.08),
    inset 0 1px 0 rgba(255,255,255,.06);
  animation: filmPop .8s cubic-bezier(.2,1.2,.4,1) .1s both;
  transition: box-shadow .3s;
}
.film-strip-player:hover {
  box-shadow:
    0 40px 100px rgba(45,31,26,.55),
    0 0 0 1px rgba(255,150,100,.2),
    0 0 0 4px rgba(193,124,116,.12),
    inset 0 1px 0 rgba(255,255,255,.08);
}
.film-sprockets {
  position: absolute;
  top: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
}
.film-sprockets.left  { left: 0; transform: translateX(-1px); }
.film-sprockets.right { right: 0; transform: translateX(1px); }
.sprocket {
  width: 9px; height: 7px;
  background: #fdf8f5;
  border-radius: 1px;
  opacity: .8;
}
.film-label-top {
  height: 22px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  margin-bottom: 4px;
}
.film-label-top span {
  font-family: 'Dancing Script', cursive;
  font-size: .7rem;
  color: rgba(255,220,200,.6);
  letter-spacing: 3px;
  text-transform: uppercase;
}
.film-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(255,200,150,.35);
  flex-shrink: 0;
}
.film-strip-player video {
  width: clamp(200px,22vw,258px);
  height: clamp(285px,31vw,364px);
  object-fit: cover;
  display: block;
  border-radius: 4px;
  background: #1a0f0d;
  pointer-events: none;
}
.film-label-bottom {
  height: 20px;
  display: flex; align-items: center; justify-content: center;
  margin-top: 4px;
}
.film-label-bottom span {
  font-family: 'Dancing Script', cursive;
  font-size: .66rem;
  color: rgba(255,220,200,.4);
  letter-spacing: 3.5px;
}
.film-play-overlay {
  position: absolute;
  top: 32px; left: 8px; right: 8px;
  height: clamp(285px,31vw,364px);
  display: flex; align-items: center; justify-content: center;
  transition: opacity .2s;
}
.film-play-overlay.hidden { opacity: 0; pointer-events: none; }
.film-play-btn {
  width: 60px; height: 60px;
  background: rgba(255,255,255,.92);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 28px rgba(0,0,0,.3);
  transition: transform .25s, background .2s;
}
.film-play-btn:hover { transform: scale(1.1); background: white; }

.film-corner {
  position: absolute;
  width: 14px; height: 14px;
  border-color: rgba(193,124,116,.45);
  border-style: solid;
  pointer-events: none;
}
.film-corner.tl { top: 6px; left: 14px; border-width: 2px 0 0 2px; border-radius: 2px 0 0 0; }
.film-corner.tr { top: 6px; right: 14px; border-width: 2px 2px 0 0; border-radius: 0 2px 0 0; }
.film-corner.bl { bottom: 6px; left: 14px; border-width: 0 0 2px 2px; border-radius: 0 0 0 2px; }
.film-corner.br { bottom: 6px; right: 14px; border-width: 0 2px 2px 0; border-radius: 0 0 2px 0; }

.film-corner-sticker {
  position: absolute;
  font-size: 1.05rem;
  pointer-events: none;
  animation: floatSticker 3.8s ease-in-out infinite;
}
.film-corner-sticker.tl { top: -20px; left: -20px; animation-delay: .3s; }
.film-corner-sticker.tr { top: -16px; right: -22px; animation-delay: .7s; }
.film-corner-sticker.bl { bottom: -16px; left: -16px; animation-delay: 1s; }
.film-stamp {
  position: absolute;
  top: 12px; right: -20px;
  background: var(--primary);
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: .66rem;
  padding: 3px 9px;
  border-radius: 2px;
  transform: rotate(12deg);
  letter-spacing: 1px;
  animation: stampPop .55s cubic-bezier(.22,1,.36,1) .8s both;
  box-shadow: 0 2px 8px rgba(193,124,116,.35);
  pointer-events: none;
  z-index: 5;
}

.video-btn {
  display:inline-flex; align-items:center; gap:12px;
  background:var(--primary); color:white;
  padding:16px 36px; border-radius:50px; border:none; cursor:pointer;
  font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700;
  box-shadow:0 8px 28px rgba(193,124,116,.4);
  transition:transform .3s, box-shadow .3s;
  letter-spacing:.3px; margin-top:36px;
  position:relative; z-index:2;
}
.video-btn:hover { transform:translateY(-4px) scale(1.03); box-shadow:0 14px 40px rgba(193,124,116,.5); }
.video-btn:active { transform:scale(.97); }

/* ══════════════════════════════════════════════════════
   VIDEO SECTION STICKERS
══════════════════════════════════════════════════════ */
@keyframes vsFloat1 { 0%,100%{transform:translateY(0) rotate(-14deg)} 50%{transform:translateY(-8px) rotate(-14deg)} }
@keyframes vsFloat2 { 0%,100%{transform:translateY(0) rotate(10deg)} 50%{transform:translateY(-10px) rotate(10deg)} }
@keyframes vsFloat3 { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-6px) rotate(-6deg)} }
@keyframes vsFloat4 { 0%,100%{transform:translateY(0) rotate(16deg)} 50%{transform:translateY(-12px) rotate(16deg)} }
@keyframes vsFloat5 { 0%,100%{transform:translateY(0) rotate(-20deg)} 50%{transform:translateY(-7px) rotate(-20deg)} }
@keyframes vsFloat6 { 0%,100%{transform:translateY(0) rotate(5deg)} 50%{transform:translateY(-9px) rotate(5deg)} }
@keyframes vsStickerPop {
  0%   { opacity:0; transform:scale(0) rotate(-30deg); }
  70%  { transform:scale(1.2) rotate(5deg); }
  100% { opacity:1; transform:scale(1); }
}
@keyframes vsTwinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.75)} }

.vs-sticker {
  position:absolute;
  pointer-events:none;
  user-select:none;
  line-height:1;
  animation: vsStickerPop .65s cubic-bezier(.22,1,.36,1) both;
  z-index:1;
}
.vs-svg-sticker {
  position:absolute;
  pointer-events:none;
  user-select:none;
  z-index:1;
}
.vs-s-l1 { left:28px; top:12%; font-size:32px; animation-name:vsStickerPop,vsFloat1; animation-duration:.65s,4.2s; animation-delay:.1s,.75s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-l2 { left:12px; top:32%; font-size:26px; animation-name:vsStickerPop,vsFloat2; animation-duration:.65s,5s; animation-delay:.22s,.88s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-l3 { left:46px; top:52%; font-size:24px; animation-name:vsStickerPop,vsFloat3; animation-duration:.65s,3.8s; animation-delay:.36s,1s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-l4 { left:8px; top:70%; font-size:20px; animation-name:vsStickerPop,vsFloat4; animation-duration:.65s,4.6s; animation-delay:.5s,1.1s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-l5 { left:52px; top:84%; font-size:18px; animation-name:vsStickerPop,vsFloat5; animation-duration:.65s,5.5s; animation-delay:.64s,1.3s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-tape-l { left:20px; top:43%; animation:vsFloat3 5s ease-in-out 1.4s infinite; opacity:.78; }
.vs-sparkle-l { left:62px; top:6%; animation:vsTwinkle 2s ease-in-out .5s infinite; }
.vs-s-r1 { right:30px; top:10%; font-size:28px; animation-name:vsStickerPop,vsFloat2; animation-duration:.65s,4.5s; animation-delay:.15s,.78s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-r2 { right:14px; top:28%; font-size:22px; animation-name:vsStickerPop,vsFloat1; animation-duration:.65s,6s; animation-delay:.28s,.92s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-r3 { right:48px; top:48%; font-size:26px; animation-name:vsStickerPop,vsFloat6; animation-duration:.65s,3.6s; animation-delay:.42s,1.05s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-r4 { right:18px; top:66%; font-size:24px; animation-name:vsStickerPop,vsFloat3; animation-duration:.65s,4.8s; animation-delay:.56s,1.2s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-s-r5 { right:44px; top:82%; font-size:18px; animation-name:vsStickerPop,vsFloat5; animation-duration:.65s,5.2s; animation-delay:.7s,1.35s; animation-fill-mode:both,none; animation-iteration-count:1,infinite; animation-timing-function:cubic-bezier(.22,1,.36,1),ease-in-out; }
.vs-tape-r { right:24px; top:37%; animation:vsFloat2 4.5s ease-in-out 1.6s infinite; opacity:.78; }
.vs-sparkle-r { right:58px; top:15%; animation:vsTwinkle 2.4s ease-in-out .8s infinite; }

@media(max-width:768px){
  .three-video-strip { gap: 10px; }
  .side-polaroid video { width:90px !important; height:128px !important; }
  .side-play-overlay { height:128px !important; }
  .film-strip-player video { width:160px !important; height:226px !important; }
  .film-play-overlay { height:226px !important; }
}
@media(max-width:520px){
  .side-polaroid-wrap { display:none; }
  .center-film-wrap { margin:0 auto; }
}
@media(max-width:480px){
  .vs-sticker, .vs-svg-sticker { display:none; }
}

/* ══════════════════════════════════════════════════════
   SCRAPBOOK — KEYFRAMES
══════════════════════════════════════════════════════ */
@keyframes sbPageSlide  { from { opacity:0; transform:translateY(60px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes sbJournalIn  { from { opacity:0; transform:translateX(-40px) rotate(-1deg); } to { opacity:1; transform:translateX(0) rotate(0deg); } }
@keyframes sbCollageIn  { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
@keyframes photoDrop    { 0%{ opacity:0; transform:translateY(-60px) rotate(var(--r,0deg)) scale(.85); } 70%{ transform:translateY(6px) rotate(var(--r,0deg)) scale(1.02); } 100%{ opacity:1; transform:translateY(0) rotate(var(--r,0deg)) scale(1); } }
@keyframes photoFloat   { 0%,100%{ transform:rotate(var(--r,0deg)) translateY(0); } 50%{ transform:rotate(var(--r,0deg)) translateY(-7px); } }
@keyframes stickerIn    { 0%{ opacity:0; transform:scale(0) rotate(-180deg); } 70%{ transform:scale(1.3) rotate(15deg); } 100%{ opacity:1; transform:scale(1) rotate(0deg); } }
@keyframes stickerWobble{ 0%,100%{ transform:rotate(0deg) scale(1); } 25%{ transform:rotate(-12deg) scale(1.1); } 75%{ transform:rotate(10deg) scale(1.05); } }
@keyframes inkDraw      { from{ width:0; } to{ width:100%; } }
@keyframes lineReveal   { from{ opacity:0; transform:translateX(-12px); } to{ opacity:1; transform:translateX(0); } }
@keyframes stampIn      { 0%{ opacity:0; transform:scale(2) rotate(-8deg); } 60%{ transform:scale(.92) rotate(1deg); } 100%{ opacity:1; transform:scale(1) rotate(-1deg); } }
@keyframes numPop       { 0%{ opacity:0; transform:scale(2.5); } 100%{ opacity:1; transform:scale(1); } }

/* ══════════════════════════════════════════════════════
   SCRAPBOOK — SECTION WRAPPER
══════════════════════════════════════════════════════ */
.scrapbook-section {
  padding: clamp(48px,8vw,100px) 0;
  background: var(--bg);
  overflow: hidden;
}
.scrapbook-header {
  max-width: 1200px; margin: 0 auto;
  padding: 0 clamp(16px,4vw,40px);
  margin-bottom: clamp(40px,6vw,72px);
  text-align: center;
}
.scrapbook-header-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Dancing Script', cursive; font-size: 1.15rem;
  color: var(--primary); margin-bottom: 10px;
}
.scrapbook-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem,4vw,3rem); color: var(--text);
  position: relative; display: inline-block;
}
.scrapbook-header h2::after {
  content: '';
  position: absolute; bottom: -6px; left: 0;
  height: 3px; background: var(--primary); border-radius: 2px;
  width: 0;
  transition: width 1s ease .4s;
}
.scrapbook-header.header-visible h2::after { width: 100%; }

/* ══════════════════════════════════════════════════════
   SCRAPBOOK — PAGE GRID
══════════════════════════════════════════════════════ */
.scrapbook-page {
  max-width: 1200px; margin: 0 auto;
  padding: 0 clamp(16px,4vw,40px);
  margin-bottom: clamp(72px,11vw,130px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px,5vw,64px);
  align-items: center;
  opacity: 0;
}
.scrapbook-page.visible {
  animation: sbPageSlide .8s cubic-bezier(.22,1,.36,1) both;
  opacity: 1;
}
.scrapbook-page.visible .scrapbook-journal {
  animation: sbJournalIn .75s cubic-bezier(.22,1,.36,1) .15s both;
}
.scrapbook-page.visible .scrapbook-collage {
  animation: sbCollageIn .75s cubic-bezier(.22,1,.36,1) .15s both;
}

/* ══════════════════════════════════════════════════════
   SCRAPBOOK — JOURNAL (text side)
══════════════════════════════════════════════════════ */
.scrapbook-journal {
  padding: clamp(22px,3vw,38px);
  background: white;
  border-radius: 4px;
  box-shadow: 5px 5px 0 rgba(193,124,116,.13), 0 12px 48px rgba(45,31,26,.09);
  position: relative;
  border-top: 3px solid var(--primary);
  overflow: hidden;
  transition: box-shadow .3s ease, transform .3s ease;
}
.scrapbook-journal:hover {
  box-shadow: 8px 8px 0 rgba(193,124,116,.2), 0 20px 60px rgba(45,31,26,.12);
  transform: translateY(-3px) rotate(.3deg);
}
.scrapbook-journal::before {
  content: '';
  position: absolute; top: 0; left: 36px;
  width: 2px; height: 100%;
  background: rgba(193,124,116,.13);
}
.scrapbook-journal::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 31px,
    rgba(193,124,116,.055) 31px,
    rgba(193,124,116,.055) 32px
  );
  pointer-events: none;
}
.scrapbook-week-stamp {
  display: inline-block;
  padding: 4px 14px;
  border: 2px solid var(--primary);
  border-radius: 4px;
  font-size: .68rem; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 16px;
  position: relative; z-index: 1;
}
.scrapbook-page.visible .scrapbook-week-stamp {
  animation: stampIn .55s cubic-bezier(.22,1,.36,1) .4s both;
}
.scrapbook-journal-date {
  font-family: 'Dancing Script', cursive;
  font-size: 1rem; color: var(--muted);
  display: block; margin-bottom: 10px;
  position: relative; z-index: 1;
}
.scrapbook-page.visible .scrapbook-journal-date {
  animation: lineReveal .5s ease .55s both;
}
.scrapbook-journal-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem,2.2vw,1.75rem);
  color: var(--text); font-weight: 700;
  line-height: 1.25; margin-bottom: 14px;
  position: relative; z-index: 1;
}
.scrapbook-journal-title::after {
  content: '';
  display: block; height: 2px;
  background: var(--primary); border-radius: 1px;
  margin-top: 6px; width: 0;
}
.scrapbook-page.visible .scrapbook-journal-title::after {
  animation: inkDraw .6s ease .7s both;
  animation-fill-mode: forwards;
  width: auto;
}
.scrapbook-page.visible .scrapbook-journal-title {
  animation: lineReveal .5s ease .6s both;
}
.scrapbook-journal-body {
  font-family: 'Dancing Script', cursive;
  font-size: 1.12rem; color: var(--muted);
  line-height: 2;
  padding-left: 24px;
  margin-bottom: 20px;
  position: relative; z-index: 1;
}
.scrapbook-page.visible .scrapbook-journal-body {
  animation: lineReveal .5s ease .75s both;
}
.scrapbook-journal-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 14px;
  background: var(--secondary); color: var(--primary);
  border-radius: 20px; font-size: .78rem; font-weight: 700;
  font-family: 'Lato', sans-serif; letter-spacing: .5px;
  margin-right: 6px; margin-bottom: 6px;
  position: relative; z-index: 1;
  transition: transform .2s, background .2s;
}
.scrapbook-journal-tag:hover { transform: scale(1.08) rotate(-2deg); background: var(--primary-light); }
.scrapbook-page.visible .scrapbook-journal-tag {
  animation: lineReveal .5s ease .85s both;
}
.scrapbook-journal-num {
  font-family: 'Playfair Display', serif;
  font-size: 5rem; font-weight: 700;
  color: var(--secondary); line-height: 1;
  position: absolute; bottom: 12px; right: 18px;
  user-select: none; z-index: 0;
}
.scrapbook-page.visible .scrapbook-journal-num {
  animation: numPop .6s cubic-bezier(.22,1,.36,1) .9s both;
}

/* ══════════════════════════════════════════════════════
   SCRAPBOOK — COLLAGE (photo side)
   Standard layout: 5 photos in 2 rows
   Food layout: dynamic grid of all photos
══════════════════════════════════════════════════════ */
.scrapbook-collage {
  position: relative;
  width: 460px;
  max-width: 100%;
  height: 560px;
  overflow: visible;
}

/* ── Food grid collage override ── */
.scrapbook-collage.food-grid {
  height: auto;
  min-height: 560px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-content: flex-start;
  padding: 14px 0 24px;
}

.sc-photo {
  position: absolute;
  background: white;
  padding: 9px 9px 30px;
  box-shadow: 0 10px 36px rgba(45,31,26,.17), 0 2px 8px rgba(45,31,26,.08);
  border-radius: 2px;
  cursor: pointer;
  transition: box-shadow .3s ease, transform .2s ease;
}
.sc-photo:hover {
  box-shadow: 0 20px 56px rgba(45,31,26,.25);
  z-index: 20 !important;
  transform: scale(1.05) rotate(0deg) !important;
}
.sc-photo img {
  display: block; object-fit: cover; border-radius: 1px;
  pointer-events: none;
}
.sc-photo-caption {
  font-family: 'Dancing Script', cursive;
  font-size: .84rem; color: var(--muted);
  text-align: center; margin-top: 7px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* ── Food grid photo card (non-absolute) ── */
.sc-food-photo {
  position: relative;
  background: white;
  padding: 8px 8px 28px;
  border-radius: 2px;
  box-shadow: 0 8px 28px rgba(45,31,26,.16), 0 2px 6px rgba(45,31,26,.08);
  cursor: pointer;
  flex-shrink: 0;
  transition: box-shadow .3s ease, transform .2s ease;
}
.sc-food-photo:hover {
  box-shadow: 0 20px 52px rgba(45,31,26,.26);
  z-index: 20;
}
.sc-food-photo img {
  display: block;
  object-fit: cover;
  border-radius: 1px;
  width: 100px;
  height: 80px;
  pointer-events: none;
}
.sc-food-photo-caption {
  font-family: 'Dancing Script', cursive;
  font-size: .78rem; color: var(--muted);
  text-align: center; margin-top: 6px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 100px;
}
.sc-food-tape {
  position: absolute;
  top: -9px; left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 44px; height: 15px;
  background: rgba(255,210,170,.75);
  border-radius: 2px;
  z-index: 10;
  animation: tapeShimmer 3s ease-in-out infinite;
}
.sc-food-tape::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.3) 3px, rgba(255,255,255,.3) 4px);
  border-radius: 2px;
}
.sc-food-sticker-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.3rem;
  padding-top: 4px;
  letter-spacing: 6px;
}

.sc-tape {
  position: absolute;
  width: 54px; height: 19px;
  background: rgba(255,220,170,.72);
  border-radius: 2px;
  z-index: 10;
  animation: tapeShimmer 3s ease-in-out infinite;
}
.sc-tape::after {
  content:'';
  position:absolute; inset:0;
  background: repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.3) 3px, rgba(255,255,255,.3) 4px);
  border-radius: 2px;
}
.sc-sticker {
  position: absolute;
  font-size: 1.5rem;
  z-index: 11;
  filter: drop-shadow(0 3px 6px rgba(0,0,0,.18));
  cursor: default;
  user-select: none;
}
.sc-sticker:hover { animation: stickerWobble .5s ease both; }

/* ── ROW 1: LEFT ── */
.sc-sub1 {
  width: 146px;
  top: 10px; left: 0px;
  transform: rotate(3.5deg);
  --r: 3.5deg; z-index: 2;
}
.sc-sub1 img { width: 130px; height: 100px; }
.scrapbook-page.visible .sc-sub1 {
  animation: photoDrop .7s cubic-bezier(.22,1,.36,1) .45s both, photoFloat 6.2s ease-in-out 1.5s infinite;
}

/* ── ROW 1: CENTER (main) ── */
.sc-main {
  width: 146px;
  top: 0px; left: 157px;
  transform: rotate(-2deg);
  --r: -2deg; z-index: 3;
}
.sc-main img { width: 130px; height: 106px; }
.scrapbook-page.visible .sc-main {
  animation: photoDrop .7s cubic-bezier(.22,1,.36,1) .3s both, photoFloat 5.5s ease-in-out 1.2s infinite;
}

/* ── ROW 1: RIGHT ── */
.sc-sub2 {
  width: 146px;
  top: 10px; left: 314px;
  transform: rotate(-3.5deg);
  --r: -3.5deg; z-index: 2;
}
.sc-sub2 img { width: 130px; height: 100px; }
.scrapbook-page.visible .sc-sub2 {
  animation: photoDrop .7s cubic-bezier(.22,1,.36,1) .6s both, photoFloat 4.8s ease-in-out 1.8s infinite;
}

/* ── ROW 2: BOTTOM LEFT ── */
.sc-sub3 {
  width: 220px;
  top: 195px; left: 0px;
  transform: rotate(-2.5deg);
  --r: -2.5deg; z-index: 2;
}
.sc-sub3 img { width: 204px; height: 148px; }
.scrapbook-page.visible .sc-sub3 {
  animation: photoDrop .7s cubic-bezier(.22,1,.36,1) .75s both, photoFloat 5.8s ease-in-out 2s infinite;
}

/* ── ROW 2: BOTTOM RIGHT ── */
.sc-sub4 {
  width: 220px;
  top: 200px; left: 240px;
  transform: rotate(2.5deg);
  --r: 2.5deg; z-index: 2;
}
.sc-sub4 img { width: 204px; height: 148px; }
.scrapbook-page.visible .sc-sub4 {
  animation: photoDrop .7s cubic-bezier(.22,1,.36,1) .9s both, photoFloat 6.5s ease-in-out 2.2s infinite;
}

/* ── Tape positions ── */
.sc-tape-1 { top:-7px; left:157px; transform:rotate(-4deg); animation-delay:.1s; }
.sc-tape-2 { top:-7px; left:10px;  transform:rotate(5deg);  animation-delay:.4s; }
.sc-tape-3 { top:-7px; left:324px; transform:rotate(-7deg); animation-delay:.7s; }
.sc-tape-4 { top:188px; left:20px;  transform:rotate(3deg);  animation-delay:.5s; }
.sc-tape-5 { top:193px; left:252px; transform:rotate(-5deg); animation-delay:.6s; }

.sc-sticker-1 { top: 178px; left: 50%; transform: translateX(-50%); }
.sc-sticker-2 { top: 8px; right: -14px; font-size:1rem; }
.scrapbook-page.visible .sc-sticker-1 { animation: stickerIn .6s cubic-bezier(.22,1,.36,1) 1s both; }
.scrapbook-page.visible .sc-sticker-2 { animation: stickerIn .6s cubic-bezier(.22,1,.36,1) 1.2s both; }

@media(max-width:768px){
  .scrapbook-collage { width: 320px; height: 420px; }
  .scrapbook-collage.food-grid { height: auto; min-height: 320px; }
  .sc-sub1  { width:104px; top:8px;  left:0px;   } .sc-sub1 img  { width:88px; height:72px; }
  .sc-main  { width:104px; top:0px;  left:108px; } .sc-main img  { width:88px; height:76px; }
  .sc-sub2  { width:104px; top:8px;  left:216px; } .sc-sub2 img  { width:88px; height:72px; }
  .sc-sub3  { width:154px; top:142px; left:0px;  } .sc-sub3 img  { width:138px; height:106px; }
  .sc-sub4  { width:154px; top:146px; left:166px;} .sc-sub4 img  { width:138px; height:106px; }
  .sc-tape-1 { left:108px; }
  .sc-tape-3 { left:220px; }
  .sc-tape-4 { top:135px; left:14px; }
  .sc-tape-5 { top:139px; left:174px; }
  .sc-sticker-1 { top:132px; }
  .sc-sticker-2 { right:0px; }
  .sc-food-photo img { width: 76px; height: 62px; }
  .sc-food-photo-caption { max-width: 76px; }
}

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
  .scrapbook-page { grid-template-columns:1fr; }
  .scrapbook-collage { min-height:380px; margin-bottom:16px; }
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
const IconCamera  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconSparkle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IconInsta   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;

// ── WASHI TAPE SVG ────────────────────────────────────────────────────────────
const WashiTape = () => (
  <svg width="56" height="20" viewBox="0 0 56 20">
    <rect x="0" y="0" width="56" height="20" rx="3" fill="rgba(255,200,170,0.72)"/>
    <line x1="0" y1="5"  x2="56" y2="5"  stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
    <line x1="0" y1="10" x2="56" y2="10" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
    <line x1="0" y1="15" x2="56" y2="15" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
  </svg>
);

// ── SPARKLE SVG ───────────────────────────────────────────────────────────────
const SparkleSvg = ({ size = 24, opacity = 0.85 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z"
      fill="#c17c74"
      opacity={opacity}
    />
  </svg>
);

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
              <div className="modal-section-title">Accomplishments</div>
              {modal.days.map((d, i) => (
                <div className="modal-day" key={i}>
                  <div className="modal-day-header">
                    <div className="modal-day-dot" />
                    <div className="modal-day-date">{d.date}</div>
                  </div>
                  <div className="modal-day-body">
                    <div className="modal-day-task" dangerouslySetInnerHTML={{ __html: d.task }} />
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
          <a href="#video" className="btn-primary">▶ Watch My OJT Journey</a>
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

// ── SCRAPBOOK PAGE ────────────────────────────────────────────────────────────
const SCRAPBOOK_STICKERS = ["♡", "✦", "✿", "★", "✈"];
const SCRAPBOOK_CAPTIONS = [
  ["First day! ✨", "Locker key! 🏷🔑️", "Flowcharts ✍️", "Orientation~", "UI/UX start 🎨"],
  ["Landing page 🖥️", "All venues!", "Admin side ✨", "Seat map 🗺️", "Fixed bugs 🐛"],
  ["Auth time 🔐", "DB connected!", "Live data~", "Role perms ✅", "Notif icon 🔔"],
  ["WebSockets! ⚡", "Notifs 🔔", "Responsive!", "Pagination 📄", "Real-time ✓"],
  ["Paginate ✓", "Auto-delete!", "Code split 🔧", "Optimized 🚀", "Week done! 🎉"],
];

// Rotation angles for polaroid tilt — varied per slot
const PHOTO_ROTS = [3.5, -2, -3.5, 2.2, -1.8, 3.1, -2.8, 1.6, -3.2, 2.7, -1.2, 3.4];
// Filter styles cycling per photo for visual variety
const PHOTO_FILTERS = [
  "none",
  "sepia(30%) brightness(1.05)",
  "grayscale(25%) contrast(1.07)",
  "brightness(1.06) saturate(1.1)",
  "none",
  "sepia(20%) brightness(1.04)",
  "grayscale(30%) contrast(1.05)",
  "brightness(1.08) saturate(1.08)",
  "none",
  "sepia(25%) brightness(1.03)",
  "grayscale(20%) contrast(1.06)",
  "brightness(1.05) saturate(1.12)",
];

function ScrapbookPage({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Use item.captions if available, otherwise fall back to SCRAPBOOK_CAPTIONS
  const caps = item.captions || SCRAPBOOK_CAPTIONS[index] || ["memory ♡", "this week~", "progress!", "learning 📚"];
  const sticker = item.sticker || SCRAPBOOK_STICKERS[index % SCRAPBOOK_STICKERS.length];

  // Use item.photos if provided, otherwise fall back to SCRAP_IMGS offset
  const isFood = item.theme === "food";
  const photos = item.photos && item.photos.length > 0
    ? item.photos
    : [
        SCRAP_IMGS[index % SCRAP_IMGS.length],
        SCRAP_IMGS[(index + 1) % SCRAP_IMGS.length],
        SCRAP_IMGS[(index + 2) % SCRAP_IMGS.length],
        SCRAP_IMGS[(index + 3) % SCRAP_IMGS.length],
        SCRAP_IMGS[(index + 4) % SCRAP_IMGS.length],
      ];

  // ── FOOD GRID COLLAGE (all 12 photos in a wrap grid) ──────────────────────
  const foodCollage = (
    <div className="scrapbook-collage food-grid">
      {photos.map((photo, pi) => {
        const rot = PHOTO_ROTS[pi % PHOTO_ROTS.length];
        const filter = PHOTO_FILTERS[pi % PHOTO_FILTERS.length];
        return (
          <div
            key={pi}
            className="sc-food-photo"
            style={{ transform: `rotate(${rot}deg)` }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = `rotate(0deg) scale(1.08)`;
              e.currentTarget.style.zIndex = "20";
              e.currentTarget.style.boxShadow = "0 20px 52px rgba(45,31,26,.26)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = `rotate(${rot}deg)`;
              e.currentTarget.style.zIndex = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {/* washi tape on each photo */}
            <div className="sc-food-tape" />
            <img
              src={photo}
              alt={caps[pi] || `photo ${pi + 1}`}
              style={{ filter }}
              onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
            />
            <div className="sc-food-photo-caption">
              {caps[pi] || "♡"}
            </div>
          </div>
        );
      })}
      {/* Bottom sticker row */}
      <div className="sc-food-sticker-row">
        {["♡", "✦", "✿", "♡", "✦"].map((s, i) => (
          <span key={i} style={{
            fontSize: "1.1rem",
            color: "var(--primary)",
            opacity: 0.5 + (i % 2) * 0.3,
            animation: `floatSticker ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );

  // ── STANDARD 5-PHOTO COLLAGE ───────────────────────────────────────────────
  const [tilt, setTilt] = useState({});
  const handleMouseMove = (e, baseRot) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
    setTilt({ rotateX: -y, rotateY: x, base: baseRot });
  };
  const handleMouseLeave = () => setTilt({});
  const tiltStyle = (baseRot) =>
    tilt.base === baseRot && Object.keys(tilt).length > 0
      ? { transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) rotate(${baseRot}deg) scale(1.07)`, transition: "transform .1s ease", zIndex: 20 }
      : {};

  const standardCollage = (
    <div className="scrapbook-collage">
      <div className="sc-tape sc-tape-1" />
      <div className="sc-tape sc-tape-2" />
      <div className="sc-tape sc-tape-3" />
      <div className="sc-tape sc-tape-4" />
      <div className="sc-tape sc-tape-5" />

      {/* ROW 1: left */}
      <div className="sc-photo sc-sub1"
        onMouseMove={e => handleMouseMove(e, "3.5deg")}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle("3.5deg")}
      >
        <img src={photos[1]} alt={item.label}
          style={{ filter: "sepia(35%) brightness(1.06)" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
        />
        <div className="sc-photo-caption">{caps[1]}</div>
      </div>

      {/* ROW 1: center (main) */}
      <div className="sc-photo sc-main"
        onMouseMove={e => handleMouseMove(e, "-2deg")}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle("-2deg")}
      >
        <img src={photos[0]} alt={item.label}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
        />
        <div className="sc-photo-caption">{caps[0]}</div>
      </div>

      {/* ROW 1: right */}
      <div className="sc-photo sc-sub2"
        onMouseMove={e => handleMouseMove(e, "-3.5deg")}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle("-3.5deg")}
      >
        <img src={photos[2]} alt={item.label}
          style={{ filter: "grayscale(45%) contrast(1.08)" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
        />
        <div className="sc-photo-caption">{caps[2]}</div>
      </div>

      {/* ROW 2: bottom left */}
      <div className="sc-photo sc-sub3"
        onMouseMove={e => handleMouseMove(e, "-2.5deg")}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle("-2.5deg")}
      >
        <img src={photos[3]} alt={item.label}
          style={{ filter: "brightness(1.04) saturate(1.1)" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
        />
        <div className="sc-photo-caption">{caps[3]}</div>
      </div>

      {/* ROW 2: bottom right */}
      <div className="sc-photo sc-sub4"
        onMouseMove={e => handleMouseMove(e, "2.5deg")}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle("2.5deg")}
      >
        <img src={photos[4] || photos[0]} alt={item.label}
          style={{ filter: "brightness(1.04) saturate(1.1)" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"; }}
        />
        <div className="sc-photo-caption">{caps[4] || caps[0]}</div>
      </div>

      <div className="sc-sticker sc-sticker-1">{sticker}</div>
      <div className="sc-sticker sc-sticker-2">✦</div>
    </div>
  );

  const collage = isFood ? foodCollage : standardCollage;

  const journal = (
    <div className="scrapbook-journal">
      <div className="scrapbook-week-stamp">{item.week}</div>
      <span className="scrapbook-journal-date">{item.date}</span>
      <h3 className="scrapbook-journal-title">{item.label}</h3>
      <p className="scrapbook-journal-body">{item.caption}</p>
      <span className="scrapbook-journal-tag">✓ {item.tag}</span>
      <div className="scrapbook-journal-num">0{index + 1}</div>
    </div>
  );

  return (
    <div
      className={`scrapbook-page${visible ? " visible" : ""}`}
      ref={ref}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {index % 2 === 0 ? <>{journal}{collage}</> : <>{collage}{journal}</>}
    </div>
  );
}

// ── PHOTO GALLERY (Scrapbook) ─────────────────────────────────────────────────
function PhotoGallery() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="scrapbook-section">
      <div ref={headerRef} className={`scrapbook-header${headerVisible ? " header-visible" : ""}`}>
        <div className="scrapbook-header-label" style={{fontSize: '1.7rem', fontWeight: 'bold'}}><IconSparkle /> Behind the Scenes <IconSparkle /></div>
   
      </div>
      {GALLERY_ITEMS.map((item, i) => (
        <ScrapbookPage key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}

// ── SIDE POLAROID VIDEO PLAYER ────────────────────────────────────────────────
function SidePolaroidPlayer({ src, caption, wrapClass, badge }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div className={`side-polaroid-wrap ${wrapClass}`}>
      <div className="polaroid-tape" />
      <div className="side-polaroid" onClick={toggle}>
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        <div className={`side-play-overlay${playing ? " hidden" : ""}`}>
          <div className="side-play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
        <div className="polaroid-badge">{badge}</div>
        <div className="polaroid-caption">{caption}</div>
      </div>
      <div className="polaroid-corner-sticker">✦</div>
    </div>
  );
}

// ── CENTER FILM STRIP PLAYER ──────────────────────────────────────────────────
function FilmStripPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const sprockets = Array(6).fill(0);

  return (
    <div className="center-film-wrap">
      <div className="film-strip-player" onClick={toggle}>
        <div className="film-sprockets left">
          {sprockets.map((_, i) => <div className="sprocket" key={i} />)}
        </div>
        <div className="film-sprockets right">
          {sprockets.map((_, i) => <div className="sprocket" key={i} />)}
        </div>
        <div className="film-label-top">
          <div className="film-dot" />
          <span>OJT JOURNEY</span>
          <div className="film-dot" />
        </div>
        <video
          ref={videoRef}
          src={src}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        <div className="film-label-bottom">
          <span>BELLEVUE MANILA · 2026</span>
        </div>
        <div className={`film-play-overlay${playing ? " hidden" : ""}`}>
          <div className="film-play-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--primary)">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
        <div className="film-corner tl" />
        <div className="film-corner tr" />
        <div className="film-corner bl" />
        <div className="film-corner br" />
        <div className="film-corner-sticker tl">✦</div>
        <div className="film-corner-sticker tr">♡</div>
        <div className="film-corner-sticker bl">✿</div>
        <div className="film-stamp">bellesoft ✦</div>
      </div>
    </div>
  );
}

// ── VIDEO / JOURNEY SECTION ───────────────────────────────────────────────────
function VideoSection({ onNavigate }) {
  return (
    <>
      <section id="video" className="video-section anim-fade-up" style={{ animationDelay:".15s" }}>

        {/* ══ LEFT STICKERS ══ */}
        <div className="vs-sticker vs-s-l1">🌸</div>
        <div className="vs-sticker vs-s-l2">✿</div>
        <div className="vs-sticker vs-s-l3">♡</div>
        <div className="vs-sticker vs-s-l4">✦</div>
        <div className="vs-sticker vs-s-l5">⭒</div>
        <div className="vs-svg-sticker vs-tape-l"><WashiTape /></div>
        <div className="vs-svg-sticker vs-sparkle-l"><SparkleSvg size={24} opacity={0.85} /></div>

        {/* ══ RIGHT STICKERS ══ */}
        <div className="vs-sticker vs-s-r1">🌺</div>
        <div className="vs-sticker vs-s-r2">✧</div>
        <div className="vs-sticker vs-s-r3">☽</div>
        <div className="vs-sticker vs-s-r4">✿</div>
        <div className="vs-sticker vs-s-r5">𓂂</div>
        <div className="vs-svg-sticker vs-tape-r"><WashiTape /></div>
        <div className="vs-svg-sticker vs-sparkle-r"><SparkleSvg size={20} opacity={0.7} /></div>

        {/* ══ HEADER ══ */}
        <div className="video-label"><IconSparkle /> At The Bellevue Manila <IconSparkle /></div>
        <h2>My OJT Journey</h2>

        {/* ══ THREE VIDEO STRIP ══ */}
        <div className="three-video-strip">
          <SidePolaroidPlayer
            src={ojtVid}
            caption="orientation day ♡"
            wrapClass="left-wrap"
            badge="🎬"
          />
          <FilmStripPlayer src={ojtVid} />
          <SidePolaroidPlayer
            src={ojtVid}
            caption="coding away~ ✨"
            wrapClass="right-wrap"
            badge="🌸"
          />
        </div>

        <button className="video-btn" onClick={onNavigate}>
          Episodes / Events 🎬
        </button>
      </section>
      <PhotoGallery />
    </>
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
      <VideoSection onNavigate={onNavigateToMedia} />
      <Footer />
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("main");

  if (page === "media") {
    return <MediaPage onBack={() => { setPage("main"); window.scrollTo(0,0); }} />;
  }

  return <MainPage onNavigateToMedia={() => { setPage("media"); window.scrollTo(0,0); }} />;
}