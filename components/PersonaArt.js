"use client";

import { DEFAULT_JOB, jobLabel } from "@/lib/content";

// PersonaArt (v3.1) — a code-drawn, theme-aware (obsidian + amber) editorial
// illustration of "how AI helps in <role> work", one distinct scene per persona.
// SINGLE SOURCE for both the video-screen poster (behind the play button) and the
// quiet awe cards on the text-only tiers (0/2/3/4), which used to be blank text.
//
// Shipped as an SVG fallback because this environment has no image-gen keys.
// To swap in real generated/photo art later, replace the <svg> per job here —
// call sites (VideoHook, AweCard) don't change.

const AMBER = "#f5a623";
const CREAM = "#f4efe6";
const OBSIDIAN = "#12100c";

// The AI "source" on the left of every scene: an amber orb emitting beams into
// the persona's artifact on the right. The shared metaphor = AI → your work.
function Orb() {
  return (
    <g>
      <g stroke={AMBER} strokeWidth="1.2" opacity="0.45">
        <line x1="76" y1="90" x2="150" y2="56" />
        <line x1="76" y1="90" x2="150" y2="90" />
        <line x1="76" y1="90" x2="150" y2="124" />
      </g>
      <circle cx="60" cy="90" r="28" fill="none" stroke={AMBER} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="60" cy="90" r="17" fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="1.5" />
      <text
        x="60"
        y="94"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={AMBER}
        fontFamily="ui-monospace, 'JetBrains Mono', monospace"
      >
        AI
      </text>
    </g>
  );
}

// Per-persona artifact motif (right side, roughly x:168–300, y:44–140).
const SCENES = {
  // Marketing — megaphone broadcasting into campaign lines.
  marketing: (
    <g>
      <rect x="168" y="82" width="12" height="18" rx="2" fill={AMBER} fillOpacity="0.25" stroke={AMBER} strokeWidth="1.2" />
      <path d="M180 78 L212 64 L212 118 L180 104 Z" fill={AMBER} fillOpacity="0.16" stroke={AMBER} strokeWidth="1.6" />
      <path d="M220 72 q11 18 0 36" fill="none" stroke={AMBER} strokeWidth="1.3" opacity="0.7" />
      <path d="M230 63 q18 27 0 54" fill="none" stroke={AMBER} strokeWidth="1.1" opacity="0.35" />
      <rect x="248" y="66" width="48" height="9" rx="2" fill={CREAM} fillOpacity="0.55" />
      <rect x="248" y="86" width="40" height="9" rx="2" fill={CREAM} fillOpacity="0.32" />
      <rect x="248" y="106" width="44" height="9" rx="2" fill={CREAM} fillOpacity="0.32" />
    </g>
  ),
  // Operations — an owner/date tracker with one flagged gap.
  ops: (
    <g>
      <rect x="168" y="54" width="130" height="74" rx="6" fill={CREAM} fillOpacity="0.05" stroke={CREAM} strokeOpacity="0.22" />
      <line x1="168" y1="72" x2="298" y2="72" stroke={CREAM} strokeOpacity="0.18" />
      {[80, 98, 116].map((y, i) => (
        <g key={y}>
          <circle cx="180" cy={y} r="4" fill="none" stroke={i === 2 ? AMBER : CREAM} strokeOpacity={i === 2 ? 1 : 0.5} strokeWidth="1.4" />
          {i !== 2 && <path d={`M177.6 ${y} l1.8 1.9 l3.4 -3.8`} fill="none" stroke={AMBER} strokeWidth="1.4" />}
          <rect x="192" y={y - 4} width="58" height="8" rx="2" fill={CREAM} fillOpacity={i === 2 ? 0.18 : 0.4} />
          <rect x="258" y={y - 4} width="30" height="8" rx="2" fill={i === 2 ? AMBER : CREAM} fillOpacity={i === 2 ? 0.35 : 0.28} />
        </g>
      ))}
      <text x="292" y="119" textAnchor="end" fontSize="9" fontWeight="700" fill={AMBER} fontFamily="ui-monospace, monospace">!</text>
    </g>
  ),
  // HR — people glyphs answering into a plain-language bubble.
  hr: (
    <g>
      {[176, 200, 224].map((x, i) => (
        <g key={x} opacity={0.4 + i * 0.2}>
          <circle cx={x} cy="70" r="7" fill="none" stroke={CREAM} strokeOpacity="0.6" strokeWidth="1.3" />
          <path d={`M${x - 10} 92 q10 -14 20 0`} fill="none" stroke={CREAM} strokeOpacity="0.6" strokeWidth="1.3" />
        </g>
      ))}
      <path d="M172 106 h116 a6 6 0 0 1 6 6 v18 a6 6 0 0 1 -6 6 h-92 l-12 10 v-10 h-6 a6 6 0 0 1 -6 -6 v-18 a6 6 0 0 1 6 -6 Z" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.4" />
      <rect x="182" y="116" width="70" height="7" rx="2" fill={CREAM} fillOpacity="0.55" />
      <rect x="182" y="128" width="52" height="7" rx="2" fill={CREAM} fillOpacity="0.32" />
    </g>
  ),
  // Sales — a funnel narrowing to a rising "next call" arrow.
  sales: (
    <g>
      <path d="M172 58 L268 58 L238 92 L238 122 L202 122 L202 92 Z" fill={AMBER} fillOpacity="0.10" stroke={CREAM} strokeOpacity="0.35" strokeWidth="1.3" />
      <line x1="172" y1="58" x2="268" y2="58" stroke={AMBER} strokeWidth="1.6" />
      <line x1="184" y1="72" x2="256" y2="72" stroke={CREAM} strokeOpacity="0.3" strokeWidth="1.1" />
      <g stroke={AMBER} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M262 122 L286 92" />
        <path d="M276 92 L286 92 L286 102" />
      </g>
    </g>
  ),
  // Finance — bars plus a trend line resolving to a clean memo edge.
  finance: (
    <g>
      <line x1="170" y1="128" x2="300" y2="128" stroke={CREAM} strokeOpacity="0.3" strokeWidth="1.2" />
      {[
        [182, 40],
        [204, 66],
        [226, 52],
        [248, 84],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={128 - h} width="13" height={h} rx="2" fill={AMBER} fillOpacity="0.22" stroke={AMBER} strokeOpacity="0.5" strokeWidth="1" />
      ))}
      <polyline points="182,96 204,78 226,86 248,52 288,44" fill="none" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="288" cy="44" r="3" fill={AMBER} />
    </g>
  ),
};

export default function PersonaArt({ job, className = "" }) {
  const key = SCENES[job] ? job : DEFAULT_JOB;
  const gid = `pa-glow-${key}`;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`How AI helps in ${jobLabel(key)} work`}
    >
      <defs>
        <radialGradient id={gid} cx="28%" cy="48%" r="75%">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.12" />
          <stop offset="100%" stopColor={OBSIDIAN} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill={OBSIDIAN} />
      <rect width="320" height="180" fill={`url(#${gid})`} />
      <Orb />
      {SCENES[key]}
    </svg>
  );
}
