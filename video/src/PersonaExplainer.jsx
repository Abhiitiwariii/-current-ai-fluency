import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { PERSONAS, BRAND, CTA } from "./data";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Segoe UI', -apple-system, Helvetica, Arial, sans-serif";

// ── helpers (snappier reveals: shorter duration + distance) ──────────────────
function fadeUp(frame, start, dist = 16, dur = 10) {
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
}
function fadeOut(frame, start, dur = 12) {
  return interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function Background() {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 900], [0, 30]);
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.obsidian }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at ${28 + drift * 0.2}% 42%, rgba(245,166,35,0.16), rgba(18,16,12,0) 70%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "overlay" }}>
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function Chrome({ role }) {
  return (
    <>
      <div style={{ position: "absolute", top: 60, left: 80, fontFamily: SANS, fontSize: 22, letterSpacing: 6, fontWeight: 700, color: BRAND.amber }}>
        CURRENT
      </div>
      <div style={{ position: "absolute", top: 62, right: 80, fontFamily: SANS, fontSize: 20, letterSpacing: 2, color: BRAND.creamSoft }}>
        {role}
      </div>
      {/* watermark */}
      <div style={{ position: "absolute", bottom: 50, width: "100%", textAlign: "center", fontFamily: SANS, fontSize: 20, letterSpacing: 3, color: "rgba(244,239,230,0.38)" }}>
        Created by Abhilash
      </div>
    </>
  );
}

// ── beats ────────────────────────────────────────────────────────────────────
function Intro({ role }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut(frame, 78) }}>
      <div style={{ ...fadeUp(frame, 2), textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontSize: 26, letterSpacing: 4, color: BRAND.creamSoft, marginBottom: 22 }}>
          HOW AI ACTUALLY HELPS IN
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 108, lineHeight: 1.02, color: BRAND.cream, transform: `scale(${0.95 + pop * 0.05})` }}>
          {role.split(" & ")[0]}
          <span style={{ color: BRAND.amber }}> work</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Problem({ p }) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut(frame, 128) }}>
      <div style={{ textAlign: "center", maxWidth: 1300 }}>
        <div style={{ ...fadeUp(frame, 4), fontFamily: SANS, fontSize: 28, letterSpacing: 3, color: BRAND.creamSoft, marginBottom: 26 }}>
          THE OLD WAY
        </div>
        <div style={{ ...fadeUp(frame, 14), fontFamily: SERIF, fontSize: 66, lineHeight: 1.15, color: BRAND.cream }}>
          {p.problem}
        </div>
        <div style={{ ...fadeUp(frame, 28), fontFamily: SANS, fontSize: 40, fontWeight: 700, color: BRAND.amber, marginTop: 30 }}>
          {p.problemTime}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Transform({ p }) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 235, textAlign: "center", opacity: fadeOut(frame, 52) }}>
        <div style={{ ...fadeUp(frame, 0), fontFamily: SANS, fontSize: 28, letterSpacing: 3, color: BRAND.amber, marginBottom: 20 }}>
          WITH AI — ONE PROMPT
        </div>
        <div style={{ ...fadeUp(frame, 8), fontFamily: "'Courier New', monospace", fontSize: 38, color: BRAND.cream, background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.35)", borderRadius: 16, padding: "16px 28px" }}>
          “{p.input}”
        </div>
      </div>

      <div style={{ position: "absolute", top: 300, width: 1100 }}>
        {p.outputs.map((line, i) => {
          const start = 52 + i * 38;
          return (
            <div key={i} style={{ ...fadeUp(frame, start, 14, 8), display: "flex", alignItems: "center", gap: 22, marginBottom: 24 }}>
              <div style={{ flex: "none", width: 46, height: 46, borderRadius: 12, background: BRAND.amber, color: "#1a1206", fontSize: 28, fontWeight: 800, fontFamily: SANS, display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✓
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 46, color: BRAND.cream }}>{line}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function Proof({ p }) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut(frame, 150) }}>
      <div style={{ textAlign: "center", maxWidth: 1400 }}>
        <div style={{ ...fadeUp(frame, 2), fontFamily: SANS, fontSize: 30, fontWeight: 700, letterSpacing: 2, color: BRAND.amber, marginBottom: 40 }}>
          {p.payoff}
        </div>
        <div style={{ ...fadeUp(frame, 14), fontFamily: SERIF, fontSize: 56, lineHeight: 1.2, color: BRAND.cream }}>
          <span style={{ color: BRAND.amber }}>{p.proofWho}</span> {p.proof}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function CtaOutro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...fadeUp(frame, 2), fontFamily: SERIF, fontSize: 72, lineHeight: 1.15, color: BRAND.cream }}>
          {CTA.line}
        </div>
        <div style={{ ...fadeUp(frame, 14), fontFamily: SANS, fontSize: 36, color: BRAND.amber, marginTop: 22 }}>
          {CTA.sub}
        </div>
        <div style={{ ...fadeUp(frame, 26), fontFamily: SANS, fontSize: 28, color: BRAND.creamSoft, marginTop: 14 }}>
          {CTA.feedback}
        </div>
        <div style={{ ...fadeUp(frame, 46), marginTop: 58, transform: `scale(${0.98 + pop * 0.02})` }}>
          <div style={{ fontFamily: SERIF, fontSize: 60, color: BRAND.cream }}>Current</div>
          <div style={{ fontFamily: SANS, fontSize: 24, letterSpacing: 6, color: BRAND.creamSoft, marginTop: 12 }}>
            AI FLUENCY, DAILY
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const PersonaExplainer = ({ job }) => {
  const p = PERSONAS[job] || PERSONAS.marketing;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("ambient.wav")} volume={0.85} />
      <Background />
      <Chrome role={p.role} />
      <Sequence from={0} durationInFrames={95}>
        <Intro role={p.role} />
      </Sequence>
      <Sequence from={88} durationInFrames={150}>
        <Problem p={p} />
      </Sequence>
      <Sequence from={225} durationInFrames={330}>
        <Transform p={p} />
      </Sequence>
      <Sequence from={545} durationInFrames={175}>
        <Proof p={p} />
      </Sequence>
      <Sequence from={705} durationInFrames={195}>
        <CtaOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
