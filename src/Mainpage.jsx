import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile4Image from "./assets/profile1.png";
import profile1Image from "./assets/profile2.jpeg";
import profile2Image from "./assets/profile.jpg";
import profile5Image from "./assets/week4.png";


import "@fontsource/league-spartan";
import "@fontsource/league-spartan/700.css";

gsap.registerPlugin(ScrollTrigger);

const WEEKS = [
  { label: "Week 1", bg: "#1a1a1a" },
  { label: "Week 2", bg: "#2b2b2b" },
  { label: "Week 3", bg: "#1e1e1e" },
  { label: "Week 4", bg: "#333333" },
  { label: "Week 5", bg: "#252525" },
  { label: "Week 6", bg: "#1c1c1c" },
  { label: "Week 7", bg: "#2a2a2a" },
  { label: "Week 8", bg: "#222222" },
];

const ROTATIONS = [-6, 4, -3, 7, -5, 3, -4, 6, -7, 2, -2, 5];

function PolaroidCard({ week, rotation, index, onClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      rotation: rotation + Math.sin(index * 0.8) * 2,
      duration: 2 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top center",
    });
  }, [rotation, index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.1,
      boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
      duration: 0.3,
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "10px 10px 28px 10px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
        cursor: "pointer",
        flexShrink: 0,
        width: 140,
        userSelect: "none",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 120,
          height: 100,
          backgroundColor: week.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span style={{ color: "#555", fontSize: 11, opacity: 0.4 }}>photo</span>
      </div>
      <span
        style={{
          marginTop: 10,
          fontSize: 11,
          fontFamily: "'League Spartan', sans-serif",
          letterSpacing: "0.05em",
          color: "#555",
          textTransform: "uppercase",
        }}
      >
        {week.label}
      </span>
    </div>
  );
}

function ClipSVG({ style }) {
  return (
    <svg
      viewBox="0 0 18 36"
      width={18}
      height={36}
      style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 3, ...style }}
    >
      <rect x={6} y={0} width={6} height={14} rx={2} fill="#c8a96e" />
      <rect x={4} y={12} width={10} height={6} rx={1} fill="#b8914a" />
      <rect x={5} y={16} width={8} height={12} rx={1} fill="#c8a96e" />
    </svg>
  );
}

function PolaroidRow({ weeks, speed, direction, rowIndex }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = [useRef(false), (v) => { paused.current = v; }];
  const animRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = 170;
    const totalWidth = itemWidth * weeks.length;

    gsap.set(track, { x: direction === "rtl" ? -totalWidth : 0 });

    const tween = gsap.to(track, {
      x: direction === "rtl" ? 0 : -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          if (direction === "rtl") {
            return ((val % totalWidth) + totalWidth) % totalWidth - totalWidth + "px";
          }
          return (((val % -totalWidth) - totalWidth) % -totalWidth) + "px";
        },
      },
    });

    animRef.current = tween;

    const pauseHandler = () => { tween.pause(); };
    const resumeHandler = () => { tween.resume(); };

    track.addEventListener("mouseenter", pauseHandler);
    track.addEventListener("mouseleave", resumeHandler);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pauseHandler);
      track.removeEventListener("mouseleave", resumeHandler);
    };
  }, [weeks, speed, direction]);

  const doubled = [...weeks, ...weeks];

  return (
    <div style={{ overflow: "hidden", width: "100%", paddingTop: 28, paddingBottom: 16, position: "relative" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 30,
          width: "max-content",
          position: "relative",
        }}
      >
        {doubled.map((week, i) => (
          <div key={i} style={{ position: "relative", paddingTop: 22 }}>
            <ClipSVG />
            <PolaroidCard
              week={week}
              rotation={ROTATIONS[i % ROTATIONS.length]}
              index={i}
              onClick={() => alert(`Navigate to ${week.label} blog post`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Mainpage() {
  const heroRef = useRef(null);

  // Container refs (handle position/movement)
  const heroLeftImgRef = useRef(null);
  const heroRightTopRef = useRef(null);
  const heroRightBottomRef = useRef(null);
  const heroLeftPeekRef = useRef(null);
  const heroRightLargeRef = useRef(null);

  // Inner <img> refs (handle zoom — scale on the img inside overflow:hidden clips beautifully)
  const heroLeftImgInnerRef = useRef(null);
  const heroRightTopInnerRef = useRef(null);
  const heroRightBottomInnerRef = useRef(null);
  const heroLeftPeekInnerRef = useRef(null);
  const heroRightLargeInnerRef = useRef(null);

  const heroTextRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSarahRef = useRef(null);
  const heroMainTextRef = useRef(null);
  const heroTopRightTextRef = useRef(null);
  const heroLeftTextRef = useRef(null);

  const section2Ref = useRef(null);
  const lineRef = useRef(null);
  const lineBoxRef = useRef(null);
  const infoTextRef = useRef(null);
  const infoNameRef = useRef(null);
  const infoBellevueRef = useRef(null);
  const infoLeftImgRef = useRef(null);

  const section3Ref = useRef(null);
  const blogTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // LEFT MAIN PORTRAIT — container flies left, inner img zooms in
      if (heroLeftImgRef.current) {
        heroTl.to(heroLeftImgRef.current, { x: "-200vw", opacity: 0, ease: "none" }, 0);
      }
      if (heroLeftImgInnerRef.current) {
        heroTl.to(heroLeftImgInnerRef.current, { scale: 2.5, ease: "none" }, 0);
      }

      // TOP CENTER — container flies up, inner img zooms in
      if (heroRightTopRef.current) {
        heroTl.to(heroRightTopRef.current, { y: "-200vh", opacity: 0, ease: "none" }, 0);
      }
      if (heroRightTopInnerRef.current) {
        heroTl.to(heroRightTopInnerRef.current, { scale: 2.5, ease: "none" }, 0);
      }

      // BOTTOM CENTER — container flies down, inner img zooms in
      if (heroRightBottomRef.current) {
        heroTl.to(heroRightBottomRef.current, { y: "200vh", opacity: 0, ease: "none" }, 0);
      }
      if (heroRightBottomInnerRef.current) {
        heroTl.to(heroRightBottomInnerRef.current, { scale: 2.5, ease: "none" }, 0);
      }

      // LEFT PEEK — container flies left, inner img zooms in
      if (heroLeftPeekRef.current) {
        heroTl.to(heroLeftPeekRef.current, { x: "-200vw", opacity: 0, ease: "none" }, 0);
      }
      if (heroLeftPeekInnerRef.current) {
        heroTl.to(heroLeftPeekInnerRef.current, { scale: 2.5, ease: "none" }, 0);
      }

      // RIGHT LARGE — container flies right, inner img zooms in
      if (heroRightLargeRef.current) {
        heroTl.to(heroRightLargeRef.current, { x: "200vw", opacity: 0, ease: "none" }, 0);
      }
      if (heroRightLargeInnerRef.current) {
        heroTl.to(heroRightLargeInnerRef.current, { scale: 2.5, ease: "none" }, 0);
      }

      // "sarah" text zooms up
      if (heroSarahRef.current) {
        heroTl.to(heroSarahRef.current, { scale: 3, opacity: 1, ease: "none" }, 0);
      }

      if (heroTextRef.current) {
        heroTl.to(heroTextRef.current, { opacity: 0, ease: "none" }, 0);
      }
      if (heroMainTextRef.current) {
        heroTl.to(heroMainTextRef.current, { x: "-200vw", opacity: 0, ease: "none" }, 0);
      }
      if (heroTopRightTextRef.current) {
        heroTl.to(heroTopRightTextRef.current, { x: "200vw", opacity: 0, ease: "none" }, 0);
      }
      if (heroLeftTextRef.current) {
        heroTl.to(heroLeftTextRef.current, { x: "-200vw", opacity: 0, ease: "none" }, 0);
      }

      // SECTION 2 setup
      if (infoTextRef.current && infoNameRef.current && infoBellevueRef.current) {
        gsap.set([infoTextRef.current, infoNameRef.current, infoBellevueRef.current], { opacity: 0, y: 40 });
      }
      if (infoLeftImgRef.current) {
        gsap.set(infoLeftImgRef.current, { opacity: 0, x: -50 });
      }
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      }
      if (lineBoxRef.current) {
        gsap.set(lineBoxRef.current, { opacity: 0, x: -20 });
      }

      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: "top 70%",
        onEnter: () => {
          if (infoLeftImgRef.current) {
            gsap.to(infoLeftImgRef.current, { opacity: 1, x: 0, duration: 1, ease: "power2.out" });
          }
          if (infoTextRef.current && infoNameRef.current && infoBellevueRef.current) {
            gsap.to([infoTextRef.current, infoNameRef.current, infoBellevueRef.current], {
              opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power2.out",
            });
          }
          if (lineRef.current) {
            gsap.to(lineRef.current, {
              scaleX: 1, duration: 1.2, ease: "power2.out", delay: 0.4,
              onComplete: () => {
                if (lineBoxRef.current) {
                  gsap.to(lineBoxRef.current, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.7)" });
                }
              },
            });
          }
        },
      });

      if (blogTitleRef.current) {
        gsap.set(blogTitleRef.current, { opacity: 0, y: 30 });
      }
      ScrollTrigger.create({
        trigger: section3Ref.current,
        start: "top 75%",
        onEnter: () => {
          if (blogTitleRef.current) {
            gsap.to(blogTitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
          }
        },
      });

    });

    return () => ctx.revert();
  }, []);

  const weeks1 = WEEKS.slice(0, 5);
  const weeks2 = WEEKS.slice(3);

  return (
    <div
      style={{
        fontFamily: "'League Spartan', sans-serif",
        backgroundColor: "#f5f0e8",
        overflowX: "hidden",
      }}
    >
      {/* SECTION 1 — HERO */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          backgroundColor: "#ede8d8",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Small peek image — far left bottom */}
        <div
          ref={heroLeftPeekRef}
          style={{
            position: "absolute",
            left: "-5%", bottom: "4%",
            width: "12%", height: "40%",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <img
            ref={heroLeftPeekInnerRef}
            src={profile4Image}
            alt="Sarah Abane"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transformOrigin: "center center" }}
          />
        </div>

        {/* LARGE main portrait — center-left */}
        <div
          ref={heroLeftImgRef}
          style={{
            position: "absolute",
            left: "11%", top: "-10%",
            width: "25%", height: "80%",
            overflow: "hidden",
            boxShadow: "4px 4px 24px rgba(0,0,0,0.22)",
            zIndex: 3,
          }}
        >
          <img
            ref={heroLeftImgInnerRef}
            src={profile1Image}
            alt="Sarah Abane"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transformOrigin: "center center" }}
          />
        </div>

        {/* Text in left part of main picture area */}
        <div
          ref={heroLeftTextRef}
          style={{
            position: "absolute",
            left: "3%", top: "4%",
            width: "12%",
            textAlign: "left",
            fontSize: "21px",
            color: "#565656",
            lineHeight: 1.3,
            zIndex: 4,
          }}
        >
          <b>ojt blog</b>
        </div>

        {/* Text below main portrait - right aligned */}
        <div
          ref={heroMainTextRef}
          style={{
            position: "absolute",
            left: "21%", top: "74%",
            width: "14.5%",
            textAlign: "right",
            fontSize: "12.5px",
            color: "#666",
            lineHeight: 1.4,
            zIndex: 4,
          }}
        >
          This blog shares my hands-on experiences, lessons learned, and growth in real-world development.
        </div>

        {/* Top center image */}
        <div
          ref={heroRightTopRef}
          style={{
            position: "absolute",
            left: "46%", top: "-11%",
            width: "21%", height: "50%",
            overflow: "hidden",
            boxShadow: "3px 3px 14px rgba(0,0,0,0.18)",
            zIndex: 3,
          }}
        >
          <img
            ref={heroRightTopInnerRef}
            src={profile2Image}
            alt="Sarah Abane"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "15% 0%", display: "block", transformOrigin: "center center" }}
          />
        </div>

        {/* "sarah" — center */}
        <div
          ref={heroTitleRef}
          style={{
            position: "absolute",
            left: "43%", top: "44%",
            zIndex: 4,
          }}
        >
          <div
            ref={heroSarahRef}
            style={{
              fontSize: "clamp(40px, 5.5vw, 78px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "0em",
              color: "#1a1a1a",
            }}
          >
            <b> sarah </b>
          </div>
        </div>

        {/* Bottom center image */}
        <div
          ref={heroRightBottomRef}
          style={{
            position: "absolute",
            right: "38%", bottom: "-4%",
            width: "22%", height: "45%",
            overflow: "hidden",
            boxShadow: "3px 3px 14px rgba(0,0,0,0.18)",
            zIndex: 3,
          }}
        >
          
        </div>

        {/* Top right image — large */}
        <div
          ref={heroRightLargeRef}
          style={{
            position: "absolute",
            right: "4%", top: "12%",
            width: "23%", height: "60%",
            overflow: "hidden",
            boxShadow: "3px 3px 14px rgba(0,0,0,0.18)",
            zIndex: 3,
          }}
        >
          <img
            ref={heroRightLargeInnerRef}
            src={profile4Image}
            alt="Sarah Abane"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transformOrigin: "center center" }}
          />
        </div>

        {/* Text below top right image */}
        <div
          ref={heroTopRightTextRef}
          style={{
            position: "absolute",
            right: "12.5%", top: "75%",
            width: "14%",
            textAlign: "left",
            fontSize: "20px",
            color: "#666",
            lineHeight: 0.8,
            zIndex: 4,
          }}
        >
          <b> The Bellevue Manila </b>
          <br />
          <span style={{ fontSize: "12.5px" }}>
            Completed 486 hour ojt under Bellesoft Department as a Full Stack Intern
          </span>
        </div>

        <div style={{ position: "absolute", right: "3%", bottom: "6%", zIndex: 4, textAlign: "left" }} />
      </section>

      {/* SECTION 2 — INFO */}
      {/* SECTION 2 — INFO */}
<section
  ref={section2Ref}
  style={{
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "stretch",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* LEFT — Centered overlapping duplicate portraits */}
  <div
    ref={infoLeftImgRef}
    style={{
      flex: "0 0 45%",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#000",
    }}
  >
    {/* BACK duplicate — scaled slightly larger, very dark + blurred */}
    <div style={{
      position: "absolute",
      top: "0%", left: "0%",
      width: "100%", height: "100%",
      overflow: "hidden",
      zIndex: 1,
      opacity: 0.25,
      filter: "blur(4px) brightness(0.4)",
      transform: "scale(1.08)",
    }}>
      <img
        src={profile5Image}
        alt=""
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 15%",
          display: "block",
        }}
      />
    </div>

    {/* MID duplicate — slightly offset upward, semi-transparent */}
    <div style={{
      position: "absolute",
      top: "-6%", left: "0%",
      width: "100%", height: "100%",
      overflow: "hidden",
      zIndex: 2,
      opacity: 0.4,
      filter: "blur(1.5px) brightness(0.55)",
    }}>
      <img
        src={profile5Image}
        alt=""
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 15%",
          display: "block",
        }}
      />
    </div>

    {/* MAIN portrait — sharp, centered, full brightness */}
    <div style={{
      position: "absolute",
      top: "0%", left: "0%",
      width: "100%", height: "100%",
      overflow: "hidden",
      zIndex: 3,
    }}>
      <img
        src={profile5Image}
        alt="Sarah Abane"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 15%",
          display: "block",
        }}
      />
    </div>

    {/* Top fade */}
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: "22%",
      background: "linear-gradient(to bottom, #000 0%, transparent 100%)",
      zIndex: 4,
      pointerEvents: "none",
    }} />

    {/* Bottom fade */}
    <div style={{
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: "22%",
      background: "linear-gradient(to top, #000 0%, transparent 100%)",
      zIndex: 4,
      pointerEvents: "none",
    }} />

    {/* Right edge fade */}
    <div style={{
      position: "absolute",
      top: 0, right: 0, bottom: 0,
      width: "15%",
      background: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 100%)",
      zIndex: 4,
      pointerEvents: "none",
    }} />
  </div>

  {/* RIGHT — Clean beige info panel */}
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px 56px",
      gap: 0,
      fontFamily: "'League Spartan', sans-serif",
      position: "relative",
      backgroundColor: "#c5c4c2",
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}
  >
    {/* Top-right "Weekly Blog" label */}
    <div style={{
      position: "absolute",
      top: 28, right: 40,
      fontSize: 12,
      letterSpacing: "0.1em",
      color: "#1a1a1a",
      fontWeight: 700,
      fontFamily: "'League Spartan', sans-serif",
    }}>
      Weekly Blog
    </div>

    {/* 4TH YEAR */}
    <div ref={infoTextRef} style={{ marginBottom: 6 }}>
      <span style={{
        fontSize: "35px",
        letterSpacing: "0.38em",
        color: "#8a8a8a",
        textTransform: "uppercase",
        fontWeight: 600,
      }}> <b> 4th Year </b>
        
      </span>
    </div>

    {/* SARAH C. ABANE */}
    <div ref={infoNameRef} style={{ marginBottom: 28 }}>
      <h2 style={{
        fontSize: "clamp(40px, 5.8vw, 72px)",
        fontWeight: 900,
        letterSpacing: "0.07em",
        color: "#1a1a1a",
        lineHeight: 1.0,
        margin: "0 0 20px 0",
        textTransform: "uppercase",
      }}>
        Sarah C. Abane
      </h2>
      <div style={{
        fontSize: "13px",
        color: "#555",
        lineHeight: 1.7,
        maxWidth: "400px",
        fontWeight: 500,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 5, color: "#333", fontSize: "21.5px" }}>
          Full Stack Intern
        </div>
        Developed comprehensive Seat and Table Reservation System for The
        Bellevue Manila's restaurant operations, implementing real-time booking
        management, customer interface, and administrative dashboard for
        seamless dining reservations
      </div>
    </div>

    {/* Divider line */}
    <div style={{ position: "relative", height: 1.5, marginBottom: 32 }}>
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1.5,
          backgroundColor: "#c5bfb0",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
    </div>

    {/* THE BELLEVUE MANILA */}
    <div ref={infoBellevueRef}>
      <span style={{
        fontSize: 16,
        letterSpacing: "0.3em",
        color: "#1a1a1a",
        textTransform: "uppercase",
        fontWeight: 700,
        display: "block",
        marginBottom: 6,
      }}>
        The Bellevue Manila
      </span>
      <span style={{
        fontSize: 12,
        letterSpacing: "0.12em",
        color: "#888",
        fontWeight: 400,
        fontStyle: "italic",
      }}>
        Bellesoft Department
      </span>
    </div>
  </div>
</section>

      {/* SECTION 3 — POLAROID GALLERY */}
      <section
        ref={section3Ref}
        style={{
          minHeight: "80vh",
          backgroundColor: "#f5f0e8",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c9b0' fill-opacity='0.18'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          padding: "60px 0 80px",
          overflow: "hidden",
        }}
      >
        <div ref={blogTitleRef} style={{ textAlign: "center", marginBottom: 16 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              color: "#1a1a1a",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            BLOG
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 10 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#777", textTransform: "uppercase", cursor: "pointer" }}>
              Weekly Blog
            </span>
            <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#777", textTransform: "uppercase", cursor: "pointer" }}>
              Daily Report
            </span>
          </div>
        </div>

        <div style={{ position: "relative", marginBottom: 8 }}>
          <svg viewBox="0 0 1200 20" preserveAspectRatio="none" style={{ width: "100%", height: 20, display: "block" }}>
            <path d="M 0 10 Q 300 2, 600 10 Q 900 18, 1200 10" stroke="#8a6a3a" strokeWidth="2" fill="none" opacity="0.6" />
          </svg>
        </div>

        <PolaroidRow weeks={weeks1} speed={40} direction="ltr" rowIndex={0} />

        <div style={{ position: "relative", marginBottom: 8, marginTop: 20 }}>
          <svg viewBox="0 0 1200 20" preserveAspectRatio="none" style={{ width: "100%", height: 20, display: "block" }}>
            <path d="M 0 10 Q 300 18, 600 10 Q 900 2, 1200 10" stroke="#8a6a3a" strokeWidth="2" fill="none" opacity="0.6" />
          </svg>
        </div>

        <PolaroidRow weeks={weeks2} speed={32} direction="rtl" rowIndex={1} />
      </section>
    </div>
  );
}