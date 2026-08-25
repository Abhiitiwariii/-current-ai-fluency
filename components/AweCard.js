"use client";

import AweDemo from "./AweDemo";
import KineticHeadline from "./KineticHeadline";
import PersonaArt from "./PersonaArt";
import { coverFor, textureBackground } from "@/lib/cover";

// The cinematic "whoa" (§7: calm frame, electric moment). Awe opens, action closes.
export default function AweCard({ awe, theme, job, onContinue }) {
  // §21.8: today's seeded cover — tint colors the glow only (amber stays UI accent),
  // layout scales the title emphasis, texture is a low-contrast field behind it.
  const cover = coverFor(theme);
  const titleBig = cover.layout !== "artifact"; // title- and split-dominant run larger
  return (
    <div>
      {/* §21.7 The Bloom — the awe artifact arrives out of the obsidian dark. */}
      <div
        className="bloom aurora-field relative overflow-hidden rounded-3xl p-8 text-white shadow-glow"
        style={{ boxShadow: `0 0 0 1px ${cover.tint.edge}, 0 24px 70px -20px ${cover.tint.halo}` }}
      >
        {/* §21.8 generative texture — low-contrast, seeded, behind the title */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{ background: textureBackground(cover.texture, cover.tint.halo) }}
        />
        <div
          className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full blur-3xl"
          style={{ background: cover.tint.halo }}
        />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          {theme}
        </p>
        {/* §21.9 kinetic type lives in the hook: large Fraunces, staggered word reveal. */}
        <h2
          className={`relative mt-4 font-display leading-[1.05] text-white ${
            titleBig ? "text-[34px]" : "text-[26px]"
          }`}
        >
          <KineticHeadline text={awe.headline} />
        </h2>

        {/* The awe actually plays: input -> thinking -> streamed output */}
        <div className="relative mt-6">
          {awe.input && awe.outputs ? (
            <AweDemo input={awe.input} outputs={awe.outputs} />
          ) : (
            <div className="space-y-4 text-[15px]">
              {/* v3.1: per-persona illustration so text-only tiers aren't blank. */}
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <PersonaArt job={job} className="h-32 w-full" />
              </div>
              <div className="rounded-2xl bg-white/10 px-5 py-4">
                <span className="mt-1 block text-white/90">{awe.after}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-7 text-center text-[16px] leading-relaxed text-ink">
        {awe.turn}
      </p>
      <button onClick={onContinue} className="btn-electric mt-5 w-full py-4">
        Your turn →
      </button>
    </div>
  );
}
