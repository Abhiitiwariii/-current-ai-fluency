// §21.8 The daily cover — seeded, never random. seed = date + topic → deterministic
// (same day looks identical for everyone, screenshot-shareable). The tint colors ONLY
// the cover's luminance/glow; amber stays the constant UI accent (§21.8).

// 5 curated, obsidian-compatible tints (ember / signal-cyan / viridian / magenta-ink / gold).
const TINTS = [
  { id: "ember", halo: "rgba(242,120,59,0.22)", edge: "rgba(242,120,59,0.35)" },
  { id: "cyan", halo: "rgba(59,190,242,0.20)", edge: "rgba(59,190,242,0.32)" },
  { id: "viridian", halo: "rgba(59,224,168,0.18)", edge: "rgba(59,224,168,0.30)" },
  { id: "magenta", halo: "rgba(214,89,190,0.18)", edge: "rgba(214,89,190,0.30)" },
  { id: "gold", halo: "rgba(242,200,59,0.20)", edge: "rgba(242,200,59,0.32)" },
];

// 3 cover compositions (§21.8) — title-dominant / artifact-dominant / split.
const LAYOUTS = ["title", "artifact", "split"];

// 3 generative textures behind the title (low-contrast), keyed off the tint edge.
const TEXTURES = ["rays", "beam", "grain"];

// Build the CSS background for a texture, tinted by the day's edge color.
export function textureBackground(texture, edge) {
  switch (texture) {
    case "rays":
      return `repeating-conic-gradient(from 210deg at 85% -10%, ${edge} 0deg 2deg, transparent 2deg 14deg)`;
    case "beam":
      return `radial-gradient(140% 60% at 15% -20%, ${edge}, transparent 55%)`;
    default: // grain — a faint diagonal weave
      return `repeating-linear-gradient(120deg, ${edge} 0 1px, transparent 1px 7px)`;
  }
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Deterministic for a given topic on a given calendar day.
export function coverFor(topic) {
  const day = new Date().toISOString().slice(0, 10);
  const seed = hash(`${topic}·${day}`);
  return {
    tint: TINTS[seed % TINTS.length],
    layout: LAYOUTS[Math.floor(seed / 5) % LAYOUTS.length],
    texture: TEXTURES[Math.floor(seed / 25) % TEXTURES.length],
    seed,
  };
}
