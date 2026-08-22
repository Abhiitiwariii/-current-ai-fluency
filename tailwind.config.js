/** @type {import('tailwindcss').Config} */
// Design system: §21 "Editorial Obsidian" — dark premium base, one amber accent,
// light-as-electric in awe. Token NAMES are kept stable (paper/ink/electric) so the
// whole app re-skins through this remap; their VALUES now encode the obsidian system.
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — near-black, layered by elevation (§21.1)
        paper: "#0A0B0D", // app background (was the light frame; now obsidian)
        "paper-dim": "#171A20",
        surface: "#111318", // cards / elevated
        well: "#171A20", // inputs, sandbox, wells
        line: "rgba(255,255,255,0.08)", // hairline borders
        "line-strong": "rgba(255,255,255,0.14)",
        // Text (§21.1)
        ink: "#F5F6F7", // hi (was dark; now high-contrast light)
        "ink-soft": "#A0A6B0", // mid
        "ink-lo": "#6B7280", // low
        // Accent — molten amber (streak, progress, CTAs). `electric` kept as an
        // alias so existing bg-electric/text-electric/btn-electric become amber.
        electric: "#F2A93B",
        "electric-bright": "#F6BE63",
        amber: "#F2A93B",
        "amber-soft": "rgba(242,169,59,0.14)",
        "amber-glow": "rgba(242,169,59,0.45)",
        // "Electric" awe = luminance, not color — cool white-hot bloom
        bloom: "rgba(230,244,255,0.9)",
        "bloom-halo": "rgba(140,190,255,0.28)",
        // Feedback
        good: "#3ECF8E",
        warn: "#E8B04B",
        // Legacy obsidian aliases (still referenced in a few places)
        night: "#0A0B0D",
        "night-soft": "#111318",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Depth from light + deep shadow, not heavy gray drop-shadows (§21.3)
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 24px 60px -24px rgba(0,0,0,0.7)",
        lift: "0 1px 0 rgba(255,255,255,0.04) inset, 0 32px 80px -28px rgba(0,0,0,0.8)",
        glow: "0 0 0 1px rgba(242,169,59,0.25), 0 20px 60px -12px rgba(242,169,59,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // The Bloom — the app's signature reveal (§21.7): light arriving from dark
        bloom: {
          "0%": {
            opacity: "0",
            transform: "scale(0.94)",
            filter: "brightness(0.6)",
            boxShadow: "0 0 0 0 rgba(140,190,255,0.28)",
          },
          "60%": {
            opacity: "1",
            filter: "brightness(1.15)",
            boxShadow: "0 0 120px 24px rgba(140,190,255,0.28)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "brightness(1)",
            boxShadow: "0 0 48px 4px rgba(140,190,255,0.14)",
          },
        },
        // Achievement variant — amber bloom (§21.7 warmth switch)
        "bloom-amber": {
          "0%": { opacity: "0", transform: "scale(0.94)", filter: "brightness(0.6)", boxShadow: "0 0 0 0 rgba(242,169,59,0.45)" },
          "60%": { opacity: "1", filter: "brightness(1.15)", boxShadow: "0 0 120px 24px rgba(242,169,59,0.45)" },
          "100%": { opacity: "1", transform: "scale(1)", filter: "brightness(1)", boxShadow: "0 0 48px 4px rgba(242,169,59,0.18)" },
        },
        // Streak digit stamp (§21.4 completion ritual)
        stamp: {
          "0%": { opacity: "0", transform: "scale(1.4)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
        bloom: "bloom 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "bloom-amber": "bloom-amber 0.6s cubic-bezier(0.16,1,0.3,1) both",
        stamp: "stamp 0.32s cubic-bezier(0.22,1.4,0.4,1) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
