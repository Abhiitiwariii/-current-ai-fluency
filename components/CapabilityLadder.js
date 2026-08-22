"use client";

import { CAPABILITIES } from "@/lib/content";

// Progression shown as capabilities unlocked, never XP (§11).
export default function CapabilityLadder({ unlocked }) {
  const unlockedSet = new Set(unlocked);
  // First still-locked capability is the "next up".
  const nextIdx = CAPABILITIES.findIndex((c) => !unlockedSet.has(c.id));

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-display text-[20px] text-ink">What you can now do</h3>
        <span className="text-[13px] text-ink-soft">
          {unlockedSet.size}/{CAPABILITIES.length}
        </span>
      </div>

      <ol className="relative space-y-3 pl-6">
        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-line" />
        {CAPABILITIES.map((c, i) => {
          const isUnlocked = unlockedSet.has(c.id);
          const isNext = i === nextIdx;
          return (
            <li key={c.id} className="relative">
              <span
                className={`absolute -left-6 top-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                  isUnlocked
                    ? "border-electric bg-electric text-white"
                    : isNext
                    ? "border-electric bg-surface text-electric"
                    : "border-line bg-surface text-transparent"
                }`}
              >
                {isUnlocked ? "✓" : isNext ? "•" : ""}
              </span>
              <div
                className={`rounded-2xl border px-4 py-3 ${
                  isUnlocked
                    ? "border-line bg-surface shadow-card"
                    : isNext
                    ? "border-electric/40 bg-[#171A20]"
                    : "border-line/60 bg-transparent"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  {c.tier}
                  {isNext && !isUnlocked && (
                    <span className="ml-2 text-electric">· next up</span>
                  )}
                </p>
                <p
                  className={`mt-0.5 text-[15px] font-semibold ${
                    isUnlocked || isNext ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {c.title}
                </p>
                {(isUnlocked || isNext) && (
                  <p className="mt-0.5 text-[13px] text-ink-soft">{c.blurb}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
