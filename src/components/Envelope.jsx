import { useEffect, useRef } from "react";

const STATES = {
  idle: {
    flap: false,
    sealColor: ["#a09cf5", "#7F77DD"],
    bodyTop: "#f0ecff", bodyBot: "#e4deff",
    flapTop: "#ddd8ff", flapBot: "#c9c2f8",
    bodyStroke: "#b8b0f0",
    msg: "Waiting for your message...",
    lines: false, postmark: false, icon: false, star: true,
  },
  typing: {
    flap: true,
    sealColor: ["#6db8f5", "#378ADD"],
    bodyTop: "#eef6ff", bodyBot: "#dceeff",
    flapTop: "#cce4ff", flapBot: "#b0d4ff",
    bodyStroke: "#85b7eb",
    msg: "Opening up for your words...",
    lines: true, postmark: false, icon: false, star: true,
  },
  valid: {
    flap: true,
    sealColor: ["#4dd4a0", "#1D9E75"],
    bodyTop: "#edfaf4", bodyBot: "#d6f5e8",
    flapTop: "#c2edd8", flapBot: "#a0e0c4",
    bodyStroke: "#5DCAA5",
    msg: "Looks great — ready to send!",
    lines: true, postmark: false, icon: true, star: false,
  },
  sending: {
    flap: false,
    sealColor: ["#f5c842", "#BA7517"],
    bodyTop: "#fffbee", bodyBot: "#fff3cc",
    flapTop: "#fce9a0", flapBot: "#f5d870",
    bodyStroke: "#EF9F27",
    msg: "Sealing and sending...",
    lines: false, postmark: true, icon: false, star: true,
  },
  success: {
    flap: false,
    sealColor: ["#4dd4a0", "#1D9E75"],
    bodyTop: "#edfaf4", bodyBot: "#d6f5e8",
    flapTop: "#c2edd8", flapBot: "#a0e0c4",
    bodyStroke: "#5DCAA5",
    msg: "Delivered! Talk to you soon.",
    lines: false, postmark: true, icon: true, star: false,
  },
  error: {
    flap: false,
    sealColor: ["#f08080", "#E24B4A"],
    bodyTop: "#fff5f5", bodyBot: "#ffe8e8",
    flapTop: "#ffd0d0", flapBot: "#ffb8b8",
    bodyStroke: "#f09595",
    msg: "Something went wrong. Try again.",
    lines: false, postmark: false, icon: false, star: true,
  },
};

const STATE_MAP = {
  idle: "idle",
  walk: "typing",
  hit: "sending",
  success: "success",
  error: "error",
  valid: "valid",
};

export function Envelope({ currentAnimation }) {
  const outerRef       = useRef(null);
  const particleRef    = useRef(null);
  const g1Ref          = useRef(null);
  const g2Ref          = useRef(null);
  const fg1Ref         = useRef(null);
  const fg2Ref         = useRef(null);
  const sg1Ref         = useRef(null);
  const sg2Ref         = useRef(null);
  const bodyRef        = useRef(null);
  const flapRef        = useRef(null);
  const flapShapeRef   = useRef(null);
  const envLeftRef     = useRef(null);
  const envRightRef    = useRef(null);
  const envBottomRef   = useRef(null);
  const sealGroupRef   = useRef(null);
  const linesRef       = useRef(null);
  const postmarkRef    = useRef(null);
  const sealIconRef    = useRef(null);
  const sealStarRef    = useRef(null);
  const msgRef         = useRef(null);
  const pillRef        = useRef(null);

  const stateName = STATE_MAP[currentAnimation] || "idle";

  useEffect(() => {
    const c = STATES[stateName];
    if (!c) return;

    const set = (ref, attr, val) => ref.current?.setAttribute(attr, val);
    const css = (ref, prop, val) => { if (ref.current) ref.current.style[prop] = val; };

    set(g1Ref,  "stop-color", c.bodyTop);
    set(g2Ref,  "stop-color", c.bodyBot);
    set(fg1Ref, "stop-color", c.flapTop);
    set(fg2Ref, "stop-color", c.flapBot);
    set(sg1Ref, "stop-color", c.sealColor[0]);
    set(sg2Ref, "stop-color", c.sealColor[1]);
    set(bodyRef,      "stroke", c.bodyStroke);
    set(envLeftRef,   "stroke", c.bodyStroke);
    set(envRightRef,  "stroke", c.bodyStroke);
    set(envBottomRef, "stroke", c.bodyStroke);
    set(flapShapeRef, "stroke", c.bodyStroke);

    if (flapRef.current) {
      flapRef.current.style.transform = c.flap ? "rotateX(165deg)" : "rotateX(0deg)";
      flapRef.current.style.opacity   = c.flap ? "0.25" : "1";
    }

    css(sealGroupRef, "opacity", c.flap ? "0" : "1");
    css(linesRef,     "opacity", c.lines    ? "1" : "0");
    css(postmarkRef,  "opacity", c.postmark ? "1" : "0");
    css(sealIconRef,  "opacity", c.icon     ? "1" : "0");
    css(sealStarRef,  "opacity", c.star     ? "1" : "0");

    if (pillRef.current) pillRef.current.textContent = stateName;
    if (msgRef.current)  msgRef.current.textContent  = c.msg;

    const outer = outerRef.current;
    if (!outer) return;
    outer.classList.remove("env-bounce", "env-shake", "env-fly");
    void outer.offsetWidth;

    if (stateName === "success") { spawnParticles(); outer.classList.add("env-fly"); }
    else if (stateName === "error") outer.classList.add("env-shake");
    else if (stateName !== "idle")  outer.classList.add("env-bounce");
  }, [stateName]);

  function spawnParticles() {
    const container = particleRef.current;
    if (!container) return;
    container.innerHTML = "";
    const items  = ["✦", "★", "✉", "♥", "◆", "✿"];
    const colors = ["#a09cf5","#4dd4a0","#6db8f5","#f5c842","#f08080","#fff"];
    for (let i = 0; i < 10; i++) {
      const d = document.createElement("div");
      d.style.cssText = `
        position:absolute;
        font-size:15px;
        opacity:0;
        left:${15 + Math.random() * 230}px;
        top:${20 + Math.random() * 100}px;
        color:${colors[i % colors.length]};
        animation:envPFloat ${1 + Math.random() * 0.5}s ease-out ${i * 0.08}s forwards;
        pointer-events:none;
      `;
      d.textContent = items[i % items.length];
      container.appendChild(d);
    }
    setTimeout(() => { if (container) container.innerHTML = ""; }, 2200);
  }

  const c = STATES[stateName];

  return (
    <>
      <style>{`
        @keyframes envPFloat {
          0%   { opacity:1; transform:translateY(0) scale(1) rotate(0deg); }
          100% { opacity:0; transform:translateY(-70px) scale(0.3) rotate(360deg); }
        }
        @keyframes envBounceAnim {
          0%,100%{ transform:translateY(0); }
          45%    { transform:translateY(-18px); }
          70%    { transform:translateY(-7px); }
        }
        @keyframes envShakeAnim {
          0%,100%{ transform:rotate(0deg); }
          20%    { transform:rotate(-6deg); }
          50%    { transform:rotate(6deg); }
          75%    { transform:rotate(-4deg); }
        }
        @keyframes envFlyAnim {
          0%   { transform:translate(0,0) scale(1) rotate(0deg); opacity:1; }
          100% { transform:translate(160px,-120px) scale(0.2) rotate(25deg); opacity:0; }
        }
        .env-bounce { animation: envBounceAnim 0.55s cubic-bezier(.34,1.56,.64,1); }
        .env-shake  { animation: envShakeAnim 0.45s ease; }
        .env-fly    { animation: envFlyAnim 0.9s cubic-bezier(.55,0,.1,1) forwards; }
        .env-flap {
          transform-origin: 130px 40px;
          transition: transform 0.55s cubic-bezier(.34,1.56,.64,1), opacity 0.4s ease;
        }
        .env-seal-group,
        .env-lines,
        .env-postmark { transition: opacity 0.4s ease; }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-4 py-6 select-none">
        <div style={{ position: "relative", width: 260, height: 180 }}>
          <div ref={outerRef} style={{ width: 260, height: 180 }}>
            <svg width="260" height="180" viewBox="0 0 260 180" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="envBodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop ref={g1Ref}  offset="0%"   stopColor={c.bodyTop} />
                  <stop ref={g2Ref}  offset="100%" stopColor={c.bodyBot} />
                </linearGradient>
                <linearGradient id="envFlapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop ref={fg1Ref} offset="0%"   stopColor={c.flapTop} />
                  <stop ref={fg2Ref} offset="100%" stopColor={c.flapBot} />
                </linearGradient>
                <linearGradient id="envSealGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop ref={sg1Ref} offset="0%"   stopColor={c.sealColor[0]} />
                  <stop ref={sg2Ref} offset="100%" stopColor={c.sealColor[1]} />
                </linearGradient>
                <filter id="envDropShadow">
                  <feDropShadow dx="0" dy="6" stdDeviation="10"
                    floodColor="#000" floodOpacity="0.18" />
                </filter>
              </defs>

              <g filter="url(#envDropShadow)">
                <rect ref={bodyRef}
                  x="8" y="40" width="244" height="130" rx="10"
                  fill="url(#envBodyGrad)" stroke={c.bodyStroke} strokeWidth="1"
                />
                <path ref={envLeftRef}
                  d="M8,40 L130,118 L8,170"
                  fill="#d8d4f7" stroke={c.bodyStroke} strokeWidth="0.5"
                />
                <path ref={envRightRef}
                  d="M252,40 L130,118 L252,170"
                  fill="#d0cbf5" stroke={c.bodyStroke} strokeWidth="0.5"
                />
                <path ref={envBottomRef}
                  d="M8,170 L130,105 L252,170"
                  fill="#dbd6f8" stroke={c.bodyStroke} strokeWidth="0.5"
                />

                <g ref={flapRef} className="env-flap">
                  <path ref={flapShapeRef}
                    d="M8,40 L130,40 L252,40 L130,118 Z"
                    fill="url(#envFlapGrad)" stroke={c.bodyStroke} strokeWidth="1"
                  />
                  <path d="M8,40 L130,115 L252,40"
                    fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"
                  />
                </g>

                <g ref={linesRef} className="env-lines"
                  style={{ opacity: c.lines ? 1 : 0 }}
                >
                  <rect x="50" y="90"  width="80"  height="5" rx="2.5" fill="rgba(150,140,230,0.35)" />
                  <rect x="50" y="101" width="110" height="5" rx="2.5" fill="rgba(150,140,230,0.25)" />
                  <rect x="50" y="112" width="60"  height="5" rx="2.5" fill="rgba(150,140,230,0.2)"  />
                </g>

                <g ref={sealGroupRef} className="env-seal-group"
                  style={{ opacity: c.flap ? 0 : 1 }}
                >
                  <circle cx="130" cy="113" r="16"
                    fill="url(#envSealGrad)"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                  />
                  <circle cx="130" cy="113" r="11"
                    fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
                  />
                  <path ref={sealIconRef}
                    d="M124,113 L128,117 L136,109"
                    fill="none" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ opacity: c.icon ? 1 : 0, transition: "opacity 0.3s" }}
                  />
                  <path ref={sealStarRef}
                    d="M130,106 L131.8,111.2 L137,111.2 L132.8,114.3 L134.6,119.5 L130,116.4 L125.4,119.5 L127.2,114.3 L123,111.2 L128.2,111.2 Z"
                    fill="rgba(255,255,255,0.85)"
                    style={{ opacity: c.star ? 1 : 0, transition: "opacity 0.3s" }}
                  />
                </g>

                <g opacity="0.9">
                  <rect x="208" y="50" width="34" height="28" rx="3"
                    fill="none" stroke={c.bodyStroke}
                    strokeWidth="1" strokeDasharray="2,1"
                  />
                  <rect x="212" y="54" width="26" height="16" rx="1" fill="rgba(255,255,255,0.5)" />
                  <path d="M212,62 Q218,55 225,62 Q231,69 237,62"
                    fill="none" stroke={c.sealColor[1]} strokeWidth="1.2"
                  />
                  <circle cx="222" cy="65" r="2" fill={c.sealColor[1]} opacity="0.6" />
                  <circle cx="228" cy="65" r="2" fill={c.sealColor[1]} opacity="0.6" />
                </g>

                <g ref={postmarkRef} className="env-postmark"
                  style={{ opacity: c.postmark ? 1 : 0 }}
                >
                  <circle cx="40" cy="62" r="18"
                    fill="none" stroke="#BA7517" strokeWidth="1.5" opacity="0.5"
                  />
                  <line x1="22" y1="62" x2="58" y2="62"
                    stroke="#BA7517" strokeWidth="1" opacity="0.5"
                  />
                  <text x="40" y="58" textAnchor="middle"
                    fontSize="7" fill="#BA7517" opacity="0.7" fontFamily="monospace"
                  >SENT</text>
                  <text x="40" y="70" textAnchor="middle"
                    fontSize="6" fill="#BA7517" opacity="0.6" fontFamily="monospace"
                  >2025</text>
                </g>
              </g>
            </svg>
          </div>

          <div ref={particleRef} style={{
            position: "absolute", top: 0, left: 0,
            width: 260, height: 180,
            pointerEvents: "none", overflow: "visible",
          }} />
        </div>

        <span ref={pillRef} style={{
          fontSize: 11,
          fontFamily: "var(--font-mono, monospace)",
          padding: "3px 12px",
          borderRadius: 20,
          border: "0.5px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.5)",
          background: "rgba(255,255,255,0.06)",
          transition: "all 0.3s",
        }}>
          {stateName}
        </span>

        <p ref={msgRef} style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          textAlign: "center",
          maxWidth: 240,
          minHeight: 18,
          fontFamily: "var(--font-sans, sans-serif)",
          transition: "opacity 0.3s",
        }}>
          {c.msg}
        </p>
      </div>
    </>
  );
}