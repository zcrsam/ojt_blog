import { useState, useEffect, useRef } from "react";
import React from "react";
// MediaPage — import via: import MediaPage from "./MediaPage"

// ─────────────────────────────────────────────────────────────────────────────
// VLOG DATA
// ─────────────────────────────────────────────────────────────────────────────
const VLOGS = [
  { id:"v1", title:"Day in My Life",               emoji:"🎒", tag:"vlog",        duration:"12:34", thumb:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80", desc:"A candid look at my daily routine as a full-stack intern at The Bellevue Manila — from the morning commute to late-night debugging." },
  { id:"v2", title:"What I Recommend",             emoji:"💡", tag:"tips",        duration:"08:20", thumb:"https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80", desc:"The tools, habits, and mindset shifts I'd tell every OJT student before day one. Honest advice, no fluff." },
  { id:"v3", title:"Journey: Byahe to Deployment", emoji:"🚌", tag:"documentary", duration:"24:10", thumb:"https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?w=800&q=80", desc:"From the long commute on EDSA to pushing my first feature live on production — the full internship journey in one video." },
  { id:"v4", title:"Events at Bellevue",           emoji:"🎉", tag:"events",      duration:"15:45", thumb:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", desc:"Behind the scenes of grand hotel events — weddings, corporate nights, and how the IT team keeps everything running smoothly." },
  { id:"v5", title:"My Week at Bellevue",          emoji:"📅", tag:"weekly",      duration:"18:02", thumb:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", desc:"A weekly vlog series capturing the highs, the bugs, the breakthroughs, and the people who made it all worth it." },
];

const WEEK_DATES = [
  "Feb 23–27 2026","Mar 2–6 2026","Mar 9–13 2026",
  "Mar 16–20 2026","Mar 23–27 2026","Mar 30–Apr 3 2026",
  "Apr 6–10 2026","Apr 13–17 2026","Apr 20–24 2026",
];
const DAY_LABELS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

// ─────────────────────────────────────────────────────────────────────────────
// PERSISTENCE — localStorage with base64 so data survives page refresh
// ─────────────────────────────────────────────────────────────────────────────
function lsKey(wi, di) { return `ojt_media_w${wi + 1}_d${di + 1}`; }

function loadItems(wi, di) {
  try {
    const raw = localStorage.getItem(lsKey(wi, di));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function persistItems(wi, di, items) {
  try {
    localStorage.setItem(lsKey(wi, di), JSON.stringify(items));
  } catch (e) { console.warn("Storage full:", e); }
}

function fileToBase64(file) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = (e) => res(e.target.result);
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
}
html{scroll-behavior:smooth;}
body{font-family:'Lato',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}
::selection{background:var(--primary-light);}

@keyframes fadeUp {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn {from{opacity:0}to{opacity:1}}
@keyframes pulse  {0%,100%{opacity:.5}50%{opacity:1}}
.anim-up{animation:fadeUp .7s ease both;}

/* PAGE */
.mp-page{
  min-height:100vh;background:var(--bg);
  display:flex;flex-direction:column;align-items:center;
}

/* TOPBAR */
.mp-topbar{
  position:fixed;top:0;left:0;right:0;z-index:50;
  background:rgba(253,248,245,.92);backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);padding:14px 0;
  box-shadow:0 2px 20px rgba(193,124,116,.07);
}
.mp-topbar-inner{
  max-width:1200px;margin:0 auto;
  padding:0 clamp(16px,4vw,40px);
  display:flex;align-items:center;
}
.mp-logo{
  font-family:'Playfair Display',serif;font-size:1.4rem;
  font-weight:700;color:var(--primary);
  display:flex;align-items:center;gap:8px;
}
.mp-logo-sub{font-family:'Dancing Script',cursive;font-size:.9rem;color:var(--muted);}

/* CENTERED CONTENT COLUMN */
.mp-content{
  width:100%;
  max-width:1200px;
  padding:0 clamp(16px,4vw,40px);
}

/* BACK BUTTON — centered under navbar */
.mp-back-row{
  padding-top:clamp(82px,13vw,106px);
  padding-bottom:0;
  display:flex;
  justify-content:center;
}
.mp-back-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:#fff;border:1.5px solid var(--border);cursor:pointer;
  font-family:'Dancing Script',cursive;font-size:1.1rem;
  color:var(--primary);padding:8px 24px 8px 18px;
  border-radius:30px;transition:background .2s,box-shadow .2s;
  box-shadow:0 2px 12px rgba(193,124,116,.1);
}
.mp-back-btn:hover{background:var(--accent);box-shadow:0 4px 18px rgba(193,124,116,.18);}

/* HERO — fully centered */
.mp-hero{
  padding:clamp(28px,5vw,52px) 0 clamp(32px,5vw,56px);
  text-align:center;
  display:flex;flex-direction:column;align-items:center;
}
.mp-hero-badge{
  display:inline-block;padding:5px 18px;
  background:var(--secondary);border-radius:30px;
  font-family:'Dancing Script',cursive;font-size:1rem;color:var(--primary);
  margin-bottom:18px;transform:rotate(-1deg);
}
.mp-hero h1{
  font-family:'Playfair Display',serif;
  font-size:clamp(2.4rem,6vw,5rem);line-height:.95;
  color:var(--text);margin-bottom:18px;
}
.mp-hero h1 em{color:var(--primary);font-style:italic;}
.mp-hero-sub{
  font-family:'Dancing Script',cursive;
  font-size:clamp(1rem,1.8vw,1.3rem);color:var(--muted);
  max-width:560px;line-height:1.75;
}

/* SECTION */
.mp-section{padding:clamp(28px,5vw,60px) 0;}
.mp-section-head{
  display:flex;align-items:baseline;gap:14px;
  margin-bottom:28px;padding-bottom:14px;
  border-bottom:2px dashed var(--border);
}
.mp-section-head h2{
  font-family:'Playfair Display',serif;
  font-size:clamp(1.6rem,3vw,2.4rem);color:var(--text);
}
.mp-section-sub{font-family:'Dancing Script',cursive;font-size:1rem;color:var(--muted);}

/* PASSWORD MODAL */
.pw-backdrop{
  position:fixed;inset:0;z-index:400;
  background:rgba(45,31,26,.55);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;
  padding:20px;animation:fadeIn .2s ease both;
}
.pw-box{
  background:var(--bg);border-radius:20px;
  padding:clamp(28px,4vw,40px);
  width:100%;max-width:380px;
  box-shadow:0 40px 80px rgba(45,31,26,.25);
  animation:fadeUp .3s ease both;
  position:relative;text-align:center;
}
.pw-box h3{
  font-family:'Playfair Display',serif;
  font-size:1.4rem;color:var(--text);margin-bottom:8px;
}
.pw-box p{
  font-family:'Dancing Script',cursive;
  font-size:1rem;color:var(--muted);margin-bottom:22px;line-height:1.6;
}
.pw-input{
  width:100%;padding:12px 16px;
  border:1.5px solid var(--border);border-radius:12px;
  background:#fff;color:var(--text);
  font-family:'Lato',sans-serif;font-size:1rem;
  outline:none;margin-bottom:10px;
  transition:border-color .2s;
  text-align:center;letter-spacing:3px;
}
.pw-input:focus{border-color:var(--primary);}
.pw-error{
  font-family:'Dancing Script',cursive;font-size:.9rem;
  color:#e05c5c;margin-bottom:10px;display:block;
  animation:fadeIn .2s ease;
}
.pw-actions{display:flex;gap:10px;margin-top:4px;}
.pw-confirm{
  flex:1;padding:11px;background:var(--primary);color:#fff;
  border:none;border-radius:12px;cursor:pointer;
  font-family:'Dancing Script',cursive;font-size:1.05rem;
  transition:transform .2s,box-shadow .2s;
  box-shadow:0 4px 14px rgba(193,124,116,.3);
}
.pw-confirm:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(193,124,116,.4);}
.pw-cancel{
  padding:11px 18px;background:#fff;color:var(--muted);
  border:1.5px solid var(--border);border-radius:12px;cursor:pointer;
  font-family:'Dancing Script',cursive;font-size:1.05rem;
  transition:background .2s;
}
.pw-cancel:hover{background:var(--accent);}

/* VLOG GRID */
.vlog-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:24px;
}
.vlog-card{
  background:#fff;border-radius:20px;overflow:hidden;
  border:1.5px solid var(--border);
  box-shadow:0 4px 20px rgba(193,124,116,.07);
  transition:transform .3s,box-shadow .3s;cursor:pointer;
}
.vlog-card:hover{transform:translateY(-6px);box-shadow:0 16px 44px rgba(193,124,116,.18);}
.vlog-thumb{position:relative;aspect-ratio:16/9;overflow:hidden;}
.vlog-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s;}
.vlog-card:hover .vlog-thumb img{transform:scale(1.06);}
.vlog-play-btn{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  background:rgba(45,31,26,.18);transition:background .3s;
}
.vlog-card:hover .vlog-play-btn{background:rgba(45,31,26,.42);}
.vlog-play-circle{
  width:52px;height:52px;border-radius:50%;
  background:rgba(255,255,255,.92);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(0,0,0,.2);
  transition:transform .3s;color:var(--primary);
}
.vlog-card:hover .vlog-play-circle{transform:scale(1.12);}
.vlog-duration{
  position:absolute;bottom:10px;right:12px;
  background:rgba(45,31,26,.75);color:#fff;
  font-size:.72rem;font-weight:700;padding:3px 9px;
  border-radius:6px;letter-spacing:.5px;
}
.vlog-emoji{position:absolute;top:12px;left:14px;font-size:1.5rem;}
.vlog-body{padding:18px 20px 20px;}
.vlog-tag{
  display:inline-block;padding:3px 12px;
  background:var(--primary-light);color:var(--primary);
  border-radius:20px;font-size:.68rem;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;
}
.vlog-body h3{
  font-family:'Playfair Display',serif;
  font-size:1.1rem;font-weight:700;color:var(--text);
  margin-bottom:8px;line-height:1.35;
}
.vlog-body p{
  font-family:'Dancing Script',cursive;
  font-size:.9rem;color:var(--muted);line-height:1.65;
}

/* DIVIDER */
.mp-divider{border:none;border-top:2px dashed var(--border);margin:0;}

/* WEEK TABS */
.week-tabs-wrap{
  overflow-x:auto;padding-bottom:4px;margin-bottom:24px;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%);
  mask-image:linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%);
}
.week-tabs{display:flex;gap:8px;min-width:max-content;}
.week-tab{
  padding:8px 20px;border-radius:30px;
  border:1.5px solid var(--border);background:#fff;
  font-family:'Dancing Script',cursive;font-size:1rem;
  color:var(--muted);cursor:pointer;transition:all .25s;white-space:nowrap;
}
.week-tab:hover{background:var(--accent);color:var(--primary);border-color:rgba(193,124,116,.3);}
.week-tab.active{
  background:var(--primary);color:#fff;border-color:var(--primary);
  box-shadow:0 4px 14px rgba(193,124,116,.35);
}
.week-date-range{
  font-family:'Dancing Script',cursive;font-size:1.05rem;
  color:var(--muted);margin-bottom:20px;
  display:flex;align-items:center;gap:8px;
}

/* DAY ACCORDION */
.day-block{margin-bottom:10px;}
.day-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:13px 20px;background:#fff;border-radius:14px;
  border:1.5px solid var(--border);
  cursor:pointer;transition:background .2s,border-color .2s;
  box-shadow:0 2px 10px rgba(193,124,116,.05);
}
.day-header:hover{background:var(--accent);border-color:rgba(193,124,116,.3);}
.day-header.open{border-radius:14px 14px 0 0;border-bottom-color:transparent;background:var(--accent);}
.day-header-left{display:flex;align-items:center;gap:12px;}
.day-dot{width:10px;height:10px;border-radius:50%;background:var(--primary);flex-shrink:0;}
.day-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:var(--text);}
.day-count{
  font-family:'Dancing Script',cursive;font-size:.88rem;color:var(--muted);
  background:var(--secondary);padding:2px 10px;border-radius:20px;
}
.day-chevron{width:18px;height:18px;color:var(--muted);transition:transform .3s;}
.day-header.open .day-chevron{transform:rotate(180deg);}
.day-body{
  background:#fff;border:1.5px solid rgba(193,124,116,.2);
  border-top:none;border-radius:0 0 14px 14px;padding:18px;display:none;
}
.day-body.open{display:block;}

/* MEDIA GRID */
.media-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(130px,1fr));
  gap:10px;margin-bottom:16px;
}
.media-item{
  aspect-ratio:1;border-radius:12px;overflow:hidden;
  border:1.5px solid var(--border);position:relative;
  cursor:pointer;transition:transform .3s,box-shadow .3s;
  background:var(--accent);
}
.media-item:hover{transform:scale(1.04);box-shadow:0 8px 24px rgba(193,124,116,.2);}
.media-item img,.media-item video{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;
}
.media-item-badge{
  position:absolute;bottom:6px;right:7px;
  background:rgba(45,31,26,.7);color:#fff;
  font-size:.6rem;font-weight:700;padding:2px 7px;
  border-radius:5px;text-transform:uppercase;letter-spacing:.5px;
  pointer-events:none;
}
.media-item-del{
  position:absolute;top:5px;right:5px;
  background:rgba(193,124,116,.85);color:#fff;border:none;
  width:22px;height:22px;border-radius:50%;cursor:pointer;
  font-size:.9rem;align-items:center;justify-content:center;
  display:none;transition:background .2s;line-height:1;
  padding:0;
}
.media-item:hover .media-item-del{display:flex;}
.media-item-del:hover{background:var(--primary);}

/* EMPTY SLOT */
.media-empty-slot{
  aspect-ratio:1;border-radius:12px;
  border:2px dashed rgba(193,124,116,.25);
  background:rgba(253,240,236,.5);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:4px;color:var(--muted);
  font-family:'Dancing Script',cursive;font-size:.78rem;
  animation:pulse 2s ease infinite;
}

/* UPLOAD ROW */
.upload-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.media-upload-label{
  display:inline-flex;align-items:center;gap:8px;
  padding:9px 20px;background:var(--primary);color:#fff;
  border-radius:30px;cursor:pointer;border:none;
  font-family:'Dancing Script',cursive;font-size:.95rem;
  transition:transform .2s,box-shadow .2s;
  box-shadow:0 4px 14px rgba(193,124,116,.25);
}
.media-upload-label:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(193,124,116,.35);}
.media-save-btn{
  display:inline-flex;align-items:center;gap:7px;
  padding:9px 20px;background:#fff;color:var(--primary);
  border:1.5px solid var(--border);border-radius:30px;cursor:pointer;
  font-family:'Dancing Script',cursive;font-size:.95rem;
  transition:background .2s,box-shadow .2s;
  box-shadow:0 2px 10px rgba(193,124,116,.08);
}
.media-save-btn:hover{background:var(--accent);}
.media-save-btn:disabled{opacity:.45;cursor:default;}
.save-toast{
  font-family:'Dancing Script',cursive;font-size:.9rem;
  color:var(--primary);padding:6px 14px;
  background:var(--secondary);border-radius:20px;
  animation:fadeIn .3s ease;
}

/* LIGHTBOX */
.lightbox-backdrop{
  position:fixed;inset:0;z-index:300;
  background:rgba(20,10,8,.9);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;
  padding:20px;animation:fadeIn .2s ease both;
}
.lightbox-media{
  max-width:90vw;max-height:80vh;
  border-radius:16px;object-fit:contain;
  box-shadow:0 40px 100px rgba(0,0,0,.5);
}
.lightbox-close{
  position:absolute;top:20px;right:24px;
  background:rgba(255,255,255,.15);border:none;cursor:pointer;
  width:44px;height:44px;border-radius:50%;color:#fff;
  display:flex;align-items:center;justify-content:center;
  transition:background .2s;
}
.lightbox-close:hover{background:rgba(255,255,255,.3);}
.lightbox-actions{
  position:absolute;bottom:24px;
  display:flex;gap:12px;
}
.lightbox-btn{
  display:inline-flex;align-items:center;gap:7px;
  background:var(--primary);color:#fff;border:none;cursor:pointer;
  padding:10px 22px;border-radius:30px;
  font-family:'Dancing Script',cursive;font-size:.95rem;
  box-shadow:0 4px 20px rgba(0,0,0,.3);transition:transform .2s;
  text-decoration:none;
}
.lightbox-btn:hover{transform:translateY(-3px);}
.lightbox-btn.secondary{background:rgba(255,255,255,.18);}
.lightbox-btn.secondary:hover{background:rgba(255,255,255,.28);}

/* FOOTER */
.mp-footer{
  text-align:center;padding:clamp(32px,5vw,56px) 0;
  border-top:2px dashed var(--border);
}
.mp-footer p{font-family:'Dancing Script',cursive;font-size:1rem;color:var(--muted);}

/* RESPONSIVE */
@media(max-width:768px){
  .vlog-grid{grid-template-columns:1fr;}
  .media-grid{grid-template-columns:repeat(auto-fill,minmax(90px,1fr));}
  .mp-logo-sub{display:none;}
  .upload-row{flex-direction:column;align-items:flex-start;}
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const IcoBack     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoPlay     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>;
const IcoStar     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IcoChevron  = () => <svg className="day-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>;
const IcoX        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoCamera   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IcoSave     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IcoDownload = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD MODAL
// ─────────────────────────────────────────────────────────────────────────────
const CORRECT_PASSWORD = "ojt2026"; // ← change this to your password

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

  const handleKey = (e) => { if (e.key === "Enter") handleConfirm(); };

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
          onKeyDown={handleKey}
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
// DAY BLOCK — password-protected upload & delete
// ─────────────────────────────────────────────────────────────────────────────
function DayBlock({ weekIdx, dayIdx, dayLabel }) {
  const [open, setOpen]         = useState(false);
  const [items, setItems]       = useState(() => loadItems(weekIdx, dayIdx));
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast]       = useState(false);
  const [saving, setSaving]     = useState(false);

  // Password modal state
  const [pwModal, setPwModal]   = useState(null); // null | { action, onConfirm }
  const pendingFilesRef         = React.useRef(null);
  const pendingDeleteRef        = React.useRef(null);
  const fileInputRef            = React.useRef(null);

  useEffect(() => {
    setItems(loadItems(weekIdx, dayIdx));
    setOpen(false);
  }, [weekIdx, dayIdx]);

  // ── Upload flow ──────────────────────────────────────────────────────────
  const handleUploadClick = () => {
    // Ask for password first, then trigger file picker
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
    persistItems(weekIdx, dayIdx, updated);
    if (!open) setOpen(true);
    e.target.value = "";
  };

  // ── Delete flow ──────────────────────────────────────────────────────────
  const handleDeleteClick = (idx) => {
    pendingDeleteRef.current = idx;
    setPwModal({
      action: "delete this item",
      onConfirm: () => {
        setPwModal(null);
        const idx = pendingDeleteRef.current;
        const updated = items.filter((_, i) => i !== idx);
        setItems(updated);
        persistItems(weekIdx, dayIdx, updated);
        // Close lightbox if deleting the open item
        setLightbox(null);
        pendingDeleteRef.current = null;
      },
    });
  };

  const handleSave = () => {
    setSaving(true);
    persistItems(weekIdx, dayIdx, items);
    setTimeout(() => {
      setSaving(false);
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    }, 300);
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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        style={{ display:"none" }}
        onChange={handleFilesPicked}
      />

      {/* Password modal (portal-style inline) */}
      {pwModal && (
        <PasswordModal
          action={pwModal.action}
          onConfirm={pwModal.onConfirm}
          onCancel={() => setPwModal(null)}
        />
      )}

      {/* Accordion header */}
      <div
        className={`day-header${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="day-header-left">
          <div className="day-dot" />
          <span className="day-name">{dayLabel}</span>
          <span className="day-count">{items.length} {items.length === 1 ? "item" : "items"}</span>
        </div>
        <IcoChevron />
      </div>

      {/* Accordion body */}
      <div className={`day-body${open ? " open" : ""}`}>
        {items.length > 0 && (
          <div className="media-grid">
            {items.map((item, i) => (
              <div className="media-item" key={i}>
                {item.type === "video"
                  ? <video src={item.dataUrl} muted playsInline />
                  : <img src={item.dataUrl} alt={item.name || `photo ${i+1}`} />
                }
                <span className="media-item-badge">{item.type === "video" ? "▶ vid" : "📷"}</span>
                {/* Delete button — password protected */}
                <button
                  className="media-item-del"
                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(i); }}
                  title="Delete (requires password)"
                >×</button>
                {/* Click to lightbox */}
                <div
                  style={{ position:"absolute", inset:0, cursor:"pointer" }}
                  onClick={() => setLightbox({ ...item, idx: i })}
                />
              </div>
            ))}
            {items.length < 4 && Array.from({ length: Math.min(2, 4 - items.length) }).map((_, i) => (
              <div className="media-empty-slot" key={`ghost${i}`}>
                <span style={{ fontSize:"1.3rem", opacity:.35 }}>+</span>
                <span>add</span>
              </div>
            ))}
          </div>
        )}

        {/* Upload + Save row */}
        <div className="upload-row">
          {/* Password-gated upload button */}
          <button className="media-upload-label" onClick={handleUploadClick}>
            <IcoCamera /> Add Photos / Videos
          </button>

          {items.length > 0 && (
            <button className="media-save-btn" onClick={handleSave} disabled={saving}>
              <IcoSave /> {saving ? "Saving…" : "Save"}
            </button>
          )}

          {toast && <span className="save-toast">✓ Saved!</span>}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><IcoX /></button>
          {lightbox.type === "video"
            ? <video src={lightbox.dataUrl} className="lightbox-media" controls autoPlay onClick={e => e.stopPropagation()} />
            : <img src={lightbox.dataUrl} className="lightbox-media" alt="preview" onClick={e => e.stopPropagation()} />
          }
          <div className="lightbox-actions">
            <button
              className="lightbox-btn"
              onClick={(e) => { e.stopPropagation(); handleDownload(lightbox); }}
            >
              <IcoDownload /> Download
            </button>
            <button
              className="lightbox-btn secondary"
              onClick={(e) => { e.stopPropagation(); handleDeleteClick(lightbox.idx); }}
            >
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
function WeeklyMediaSection() {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="mp-section">
      <div className="mp-section-head">
        <h2>Photos &amp; Videos</h2>
        <span className="mp-section-sub">by week &amp; day · auto-saved</span>
      </div>

      {/* Week tabs */}
      <div className="week-tabs-wrap">
        <div className="week-tabs">
          {WEEK_DATES.map((_, i) => (
            <button
              key={i}
              className={`week-tab${i === activeWeek ? " active" : ""}`}
              onClick={() => setActiveWeek(i)}
            >
              Week {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Date range label */}
      <div className="week-date-range">
        <IcoStar />
        <span>{WEEK_DATES[activeWeek]}</span>
      </div>

      {/* Mon–Fri day blocks */}
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
function VlogSection() {
  return (
    <div className="mp-section">
      <div className="mp-section-head">
        <h2>Vlog Series</h2>
        <span className="mp-section-sub">5 videos · click to watch</span>
      </div>
      <div className="vlog-grid">
        {VLOGS.map((v, i) => (
          <div className="vlog-card" key={v.id} style={{ animationDelay:`${i * .08}s` }}>
            <div className="vlog-thumb">
              <img src={v.thumb} alt={v.title}
                onError={e => { e.target.src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"; }} />
              <div className="vlog-play-btn">
                <div className="vlog-play-circle"><IcoPlay /></div>
              </div>
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
// TOPBAR — logo left-aligned
// ─────────────────────────────────────────────────────────────────────────────
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
export default function MediaPage({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="mp-page">
      <style>{css}</style>

      {/* Navbar — left-aligned logo */}
      <Topbar />

      {/* Single centered column for ALL content */}
      <div className="mp-content">

        {/* Back button below navbar */}
        <div className="mp-back-row">
          <button className="mp-back-btn" onClick={onBack}>
            <IcoBack /> Back to Blog
          </button>
        </div>

        {/* Hero — centered text */}
        <div className="mp-hero anim-up">
          <div className="mp-hero-badge">📸 Behind the Scenes</div>
          <h1>Vlogs &amp; <em>Memories</em></h1>
          <p className="mp-hero-sub">
            All my OJT vlogs, daily photos, and weekly memories from my internship at The Bellevue Manila — organized and easy to browse.
          </p>
        </div>

        {/* Vlogs */}
        <VlogSection />

        <hr className="mp-divider" />

        {/* Weekly Photos & Videos */}
        <WeeklyMediaSection />

        {/* Footer */}
        <footer className="mp-footer">
          <p>© {new Date().getFullYear()} Sarah C. Abane · Made with ♡ during OJT at Bellevue Manila</p>
        </footer>

      </div>
    </div>
  );
}