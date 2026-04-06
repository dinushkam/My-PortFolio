import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { HomeInfo, Loader } from "../components";
import { Bird, Island, Plane, Sky, Pirate } from "../models";

/* ─────────────────────────────────────────────
   Floating particles data (generated once)
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 1.5 + (i * 0.37 % 4),
  x: (i * 17 + 5) % 100,
  y: (i * 23 + 8) % 100,
  dur: 6 + (i * 1.3 % 10),
  delay: (i * 0.9) % 8,
  opacity: 0.15 + (i * 0.03 % 0.45),
  color: i % 3 === 0 ? "#7dd3fc" : i % 3 === 1 ? "#f6c453" : "#ff3b5c",
}));

const STARS = [
  { x:8,  y:12, s:2.5, op:0.6, dur:3   },
  { x:18, y:28, s:1.5, op:0.4, dur:5   },
  { x:30, y:8,  s:2,   op:0.5, dur:4   },
  { x:72, y:15, s:3,   op:0.55,dur:3.5 },
  { x:85, y:30, s:1.5, op:0.4, dur:6   },
  { x:92, y:10, s:2,   op:0.5, dur:4.5 },
  { x:55, y:5,  s:2.5, op:0.6, dur:3.8 },
  { x:40, y:22, s:1.5, op:0.35,dur:7   },
  { x:62, y:35, s:2,   op:0.4, dur:5.5 },
  { x:10, y:70, s:1.5, op:0.3, dur:8   },
  { x:78, y:60, s:1.5, op:0.3, dur:6.5 },
  { x:48, y:78, s:2,   op:0.35,dur:5   },
];

/* ─────────────────────────────────────────────
   Cinematic loader
───────────────────────────────────────────── */
const SceneLoader = ({ progress }) => (
  <div style={{
    position:"absolute", inset:0, zIndex:40,
    display:"flex", alignItems:"center", justifyContent:"center",
    background:"linear-gradient(160deg,#020b18 0%,#041b33 55%,#063a66 100%)",
  }}>
    {/* blobs */}
    {[
      { w:420,h:320, top:"-90px", left:"-110px", color:"rgba(125,211,252,.18)", dur:"9s" },
      { w:360,h:290, bottom:"-70px", right:"-90px", color:"rgba(246,196,83,.15)", dur:"11s" },
      { w:290,h:230, top:"38%", left:"52%", color:"rgba(255,59,92,.10)", dur:"13s" },
    ].map((b,i) => (
      <div key={i} style={{
        position:"absolute", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none",
        width:b.w, height:b.h, top:b.top, bottom:b.bottom, left:b.left, right:b.right,
        background:`radial-gradient(circle, ${b.color}, transparent 70%)`,
        animation:`blobDrift ${b.dur} ease-in-out infinite ${i%2===0?"":"reverse"}`,
      }} />
    ))}

    <div style={{
      position:"relative", zIndex:1,
      display:"flex", flexDirection:"column", alignItems:"center", gap:16,
      animation:"loaderRise 0.7s cubic-bezier(.22,1,.36,1) both",
    }}>
      {/* ring */}
      <div style={{ position:"relative", width:84, height:84, animation:"ringFloat 3s ease-in-out infinite" }}>
        <svg viewBox="0 0 80 80" fill="none" style={{ width:"100%", height:"100%", transform:"rotate(-90deg)" }}>
          <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle cx="40" cy="40" r="34"
            stroke="url(#loaderGrad)"
            strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${Math.PI * 68 * (progress / 100)} ${Math.PI * 68}`}
            strokeDashoffset={Math.PI * 68 * 0.25}
            style={{ transition:"stroke-dasharray 0.3s ease" }}
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#f6c453" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>🏝️</span>
      </div>

      {/* name */}
      <div style={{ textAlign:"center" }}>
        <p style={{
          fontFamily:"'Poppins',sans-serif", fontWeight:800,
          fontSize:"clamp(26px,6vw,40px)", letterSpacing:"-0.03em",
          background:"linear-gradient(135deg,#7dd3fc 0%,#f6c453 60%,#ff3b5c 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundClip:"text", margin:0,
        }}>Dinushka<span style={{ WebkitTextFillColor:"#f6c453" }}>.</span></p>
        <p style={{
          fontSize:11, color:"rgba(255,255,255,.4)", letterSpacing:".12em",
          textTransform:"uppercase", fontFamily:"'Work Sans',sans-serif", margin:"6px 0 0",
        }}>Preparing the island experience</p>
      </div>

      {/* bar */}
      <div style={{ width:160, height:3, borderRadius:99, background:"rgba(255,255,255,.08)", overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:99, width:`${progress}%`,
          background:"linear-gradient(90deg,#7dd3fc,#f6c453)",
          transition:"width 0.3s ease",
        }} />
      </div>
    </div>

    <style>{`
      @keyframes blobDrift {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(28px,18px) scale(1.06); }
      }
      @keyframes loaderRise {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes ringFloat {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-8px); }
      }
    `}</style>
  </div>
);

/* ─────────────────────────────────────────────
   Stage progress dots
───────────────────────────────────────────── */
const StageDots = ({ current, total = 5 }) => (
  <div style={{ display:"flex", gap:5, alignItems:"center" }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{
        height:6, borderRadius:3,
        width: i + 1 === current ? 22 : 6,
        background: i + 1 === current
          ? "linear-gradient(90deg,#7dd3fc,#f6c453)"
          : "rgba(255,255,255,.22)",
        transition:"all 0.35s cubic-bezier(.34,1.56,.64,1)",
      }} />
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Main Home component
───────────────────────────────────────────── */
const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating]     = useState(false);
  const [screenWidth, setScreenWidth]   = useState(window.innerWidth);
  const [sceneReady, setSceneReady]     = useState(false);
  const [progress, setProgress]         = useState(0);
  const progressRef = useRef(null);

  /* Simulated progress so loader never looks stuck */
  useEffect(() => {
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 16;
      if (p >= 88) { clearInterval(progressRef.current); p = 88; }
      setProgress(Math.min(p, 88));
    }, 200);
    return () => clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSceneCreated = () => {
    clearInterval(progressRef.current);
    setProgress(100);
    setTimeout(() => setSceneReady(true), 500);
  };

  const isMobile = screenWidth < 640;

  const sceneConfig = useMemo(() => {
    if (screenWidth < 480) return {
      islandScale:[30,30,30], islandPosition:[0,-6.5,-43.4],
      planeScale:[0.08,0.08,0.08], planePosition:[1.7,-1.0,0],
      pirateScale:[0.16,0.16,0.16], pirateOffset:[-1.45,-0.15,0.8],
    };
    if (screenWidth < 640) return {
      islandScale:[34,34,34], islandPosition:[0,-5.8,-43.4],
      planeScale:[0.09,0.09,0.09], planePosition:[2.0,-1.2,0],
      pirateScale:[0.18,0.18,0.18], pirateOffset:[-1.6,-0.1,0.8],
    };
    if (screenWidth < 768) return {
      islandScale:[40,40,40], islandPosition:[0,-4.8,-43.4],
      planeScale:[0.11,0.11,0.11], planePosition:[2.4,-1.5,0],
      pirateScale:[0.21,0.21,0.21], pirateOffset:[-1.9,-0.05,0.9],
    };
    if (screenWidth < 1024) return {
      islandScale:[50,50,50], islandPosition:[0,-2.8,-43.4],
      planeScale:[0.14,0.14,0.14], planePosition:[2.8,-2.1,0],
      pirateScale:[0.25,0.25,0.25], pirateOffset:[-2.3,0.1,1],
    };
    return {
      islandScale:[65,65,65], islandPosition:[0,0,-43.4],
      planeScale:[0.2,0.2,0.2], planePosition:[3,-3,0],
      pirateScale:[0.3,0.3,0.3], pirateOffset:[-3,0.5,1],
    };
  }, [screenWidth]);

  const piratePosition = [
    sceneConfig.planePosition[0] + sceneConfig.pirateOffset[0],
    sceneConfig.planePosition[1] + sceneConfig.pirateOffset[1],
    sceneConfig.planePosition[2] + sceneConfig.pirateOffset[2],
  ];

  return (
    <>
    <style>{`
      @keyframes starTwinkle {
        0%,100% { opacity:var(--op,.3); transform:scale(1); }
        50%      { opacity:calc(var(--op,.3)*2.2); transform:scale(1.7); }
      }
      @keyframes particleFloat {
        0%,100% { transform:translateY(0) translateX(0); }
        33%      { transform:translateY(-18px) translateX(8px); }
        66%      { transform:translateY(-8px) translateX(-7px); }
      }
      @keyframes auroraDrift {
        0%   { transform:translateY(0) scaleX(0.85); opacity:.55; }
        100% { transform:translateY(38px) scaleX(1.12); opacity:1; }
      }
      @keyframes badgeIn {
        from { opacity:0; transform:translateX(-18px); }
        to   { opacity:1; transform:translateX(0); }
      }
      @keyframes dotBeat {
        0%,100% { box-shadow:0 0 0 3px rgba(74,222,128,.22); }
        50%      { box-shadow:0 0 0 7px rgba(74,222,128,.08); }
      }
      @keyframes infoIn {
        from { opacity:0; transform:translateY(18px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `}</style>

    <section style={{
      position:"relative", width:"100%", overflow:"hidden",
      height:"calc(100vh - 80px)", minHeight:560,
    }}>

      {/* ── 1. Base gradient ── */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(160deg,#020b18 0%,#041b33 55%,#063a66 100%)",
      }} />

      {/* ── 2. Aurora bands ── */}
      {[
        { top:"20%", h:90,  color:"rgba(125,211,252,.12)", dur:"14s", delay:"0s"  },
        { top:"44%", h:70,  color:"rgba(246,196,83,.09)",  dur:"18s", delay:"-5s" },
        { top:"67%", h:55,  color:"rgba(255,59,92,.07)",   dur:"22s", delay:"-9s" },
      ].map((a,i) => (
        <div key={i} style={{
          position:"absolute", left:"-20%", right:"-20%",
          top:a.top, height:a.h, borderRadius:99,
          filter:`blur(${a.h}px)`,
          background:`linear-gradient(90deg,transparent,${a.color},transparent)`,
          animation:`auroraDrift ${a.dur} ease-in-out infinite alternate ${a.delay}`,
          pointerEvents:"none",
        }} />
      ))}

      {/* ── 3. Radial colour blobs ── */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 55% 45% at 12% 18%,rgba(125,211,252,.14),transparent),radial-gradient(ellipse 50% 40% at 90% 16%,rgba(246,196,83,.12),transparent),radial-gradient(ellipse 45% 40% at 62% 90%,rgba(255,59,92,.09),transparent)",
      }} />

      {/* ── 4. Subtle grid ── */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)",
        backgroundSize:"48px 48px",
        maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)",
        WebkitMaskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black,transparent)",
      }} />

      {/* ── 5. Stars ── */}
      {STARS.map((s,i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%", pointerEvents:"none",
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.s, height:s.s, background:"#fff",
          "--op":s.op,
          animation:`starTwinkle ${s.dur}s ease-in-out infinite ${i*0.6}s`,
        }} />
      ))}

      {/* ── 6. Floating particles ── */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position:"absolute", borderRadius:"50%", pointerEvents:"none",
          left:`${p.x}%`, top:`${p.y}%`,
          width:p.size, height:p.size,
          background:p.color, opacity:p.opacity,
          animation:`particleFloat ${p.dur}s ease-in-out infinite ${p.delay}s`,
        }} />
      ))}

      {/* ── 7. Corner ornament TL ── */}
      <svg style={{ position:"absolute", top:0, left:0, width:160, height:160, pointerEvents:"none" }} viewBox="0 0 160 160" fill="none">
        <path d="M0 0 L160 0 L160 3 L3 3 L3 160 L0 160 Z" fill="rgba(125,211,252,0.14)" />
        <path d="M0 0 L90 0 L90 1.5 L1.5 1.5 L1.5 90 L0 90 Z" fill="rgba(125,211,252,0.08)" />
        <circle cx="3" cy="3" r="5" fill="rgba(125,211,252,0.35)" />
        <circle cx="3" cy="3" r="2.5" fill="rgba(125,211,252,0.75)" />
      </svg>

      {/* ── 7b. Corner ornament TR ── */}
      <svg style={{ position:"absolute", top:0, right:0, width:160, height:160, pointerEvents:"none", transform:"scaleX(-1)" }} viewBox="0 0 160 160" fill="none">
        <path d="M0 0 L160 0 L160 3 L3 3 L3 160 L0 160 Z" fill="rgba(246,196,83,0.10)" />
        <circle cx="3" cy="3" r="5" fill="rgba(246,196,83,0.30)" />
        <circle cx="3" cy="3" r="2.5" fill="rgba(246,196,83,0.65)" />
      </svg>

      {/* ── 8. Bottom atmospheric glow ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:220, pointerEvents:"none",
        background:"linear-gradient(to top,rgba(4,27,51,.7),transparent)",
      }} />

      {/* ── 9. Vignette ── */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(2,8,20,.6) 100%)",
      }} />

      {/* ── Name / status badge ── */}
      {sceneReady && (
        <div style={{
          position:"absolute",
          top: isMobile ? 14 : 20,
          left: isMobile ? 12 : 20,
          zIndex:10,
          display:"flex", alignItems:"center", gap:10,
          padding: isMobile ? "6px 12px 6px 8px" : "8px 16px 8px 10px",
          borderRadius:999,
          background:"rgba(255,255,255,.07)",
          border:"1px solid rgba(255,255,255,.13)",
          backdropFilter:"blur(14px)",
          WebkitBackdropFilter:"blur(14px)",
          animation:"badgeIn 0.6s cubic-bezier(.22,1,.36,1) 0.3s both",
        }}>
          <div style={{
            width:8, height:8, borderRadius:"50%",
            background:"#4ade80",
            boxShadow:"0 0 0 3px rgba(74,222,128,.22)",
            animation:"dotBeat 2s ease-in-out infinite",
            flexShrink:0,
          }} />
          <div>
            <div style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:600,
              fontSize: isMobile ? 11 : 13,
              background:"linear-gradient(90deg,#7dd3fc,#f6c453)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text",
            }}>Dinushka Malshan</div>
            {!isMobile && (
              <div style={{
                fontSize:10, color:"rgba(255,255,255,.4)",
                letterSpacing:".08em", textTransform:"uppercase",
                fontFamily:"'Work Sans',sans-serif",
              }}>CS Undergraduate · Available</div>
            )}
          </div>
        </div>
      )}

      {/* ── 3-D Canvas ── */}
      <Canvas
        style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}
        className={isRotating ? "cursor-grabbing" : "cursor-grab"}
        camera={{ near:0.1, far:1000 }}
        dpr={[1, screenWidth < 768 ? 1.5 : 2]}
        flat
        onCreated={handleSceneCreated}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10,5,10]} intensity={2} />
          <spotLight position={[0,50,10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={sceneConfig.islandPosition}
            rotation={[0.1, 5, 0]}
            scale={sceneConfig.islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={sceneConfig.planePosition}
            rotation={[0, Math.PI / 8, 0]}
            scale={sceneConfig.planeScale}
          />
          <Pirate
            isRunning={isRotating}
            position={piratePosition}
            rotation={[0, Math.PI / 2, 0]}
            scale={sceneConfig.pirateScale}
          />
        </Suspense>
      </Canvas>

      {/* ── Info bubble — bottom-left, fully responsive ── */}
      <div style={{
        position:"absolute", zIndex:10,
        /* responsive positioning */
        bottom: isMobile ? 72 : 28,
        left: isMobile ? 10 : 24,
        right: isMobile ? 10 : "auto",
        maxWidth: isMobile ? "none" : 480,
        opacity: sceneReady ? 1 : 0,
        transform: sceneReady ? "translateY(0)" : "translateY(18px)",
        transition:"opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s",
        pointerEvents: sceneReady ? "auto" : "none",
      }}>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* ── HUD bottom-right ── */}
      <div style={{
        position:"absolute", zIndex:10,
        bottom: isMobile ? 14 : 28,
        right: isMobile ? 10 : 24,
        display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8,
        opacity: sceneReady ? 1 : 0,
        transition:"opacity 0.55s ease 0.45s",
      }}>
        {/* drag hint */}
        <div style={{
          display:"flex", alignItems:"center", gap:6,
          padding:"5px 11px", borderRadius:999,
          background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(255,255,255,.10)",
          backdropFilter:"blur(8px)",
        }}>
          <span style={{ fontSize:11 }}>✦</span>
          <span style={{
            fontSize:10, color:"rgba(255,255,255,.45)",
            letterSpacing:".10em", textTransform:"uppercase",
            fontFamily:"'Work Sans',sans-serif",
          }}>
            {isMobile ? "swipe" : "drag"} to explore
          </span>
        </div>
        <StageDots current={currentStage} total={5} />
      </div>

      {/* ── Cinematic loader overlay ── */}
      {!sceneReady && <SceneLoader progress={progress} />}

    </section>
    </>
  );
};

export default Home;