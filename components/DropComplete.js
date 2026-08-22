"use client";

import { useState } from "react";
import { CAPABILITIES } from "@/lib/content";
import { getState } from "@/lib/store";
import ShareCard from "./ShareCard";
import AccountPrompt from "./AccountPrompt";

// Completion ritual (§6/§11): bounded end, streak booked, capability unlocked.
// No XP, no confetti-toy energy — a calm, earned "you're current."
export default function DropComplete({ streak, forgiven, capabilityId, onHome }) {
  const cap = CAPABILITIES.find((c) => c.id === capabilityId);
  // §10: prompt for an account only if there isn't one yet (after the aha).
  const [showAccount, setShowAccount] = useState(!getState().account);

  return (
    <div className="text-center">
      {/* §21.4/21.7: the completion ritual blooms amber — achievement, not content. */}
      <div className="bloom-amber mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-electric text-[28px] text-[#1a1206]">
        ✓
      </div>
      <p className="eyebrow">You’re current for today</p>
      <h2 className="mt-3 font-display text-[32px] leading-tight text-ink">
        Streak:{" "}
        <span className="inline-block animate-stamp text-electric">{streak}</span>{" "}
        {streak === 1 ? "day" : "days"} 🔥
      </h2>
      {forgiven && (
        <p className="mt-2 text-[13px] text-ink-soft">
          (You missed a day — we kept your streak. Life happens.)
        </p>
      )}

      {cap && (
        <div className="card mx-auto mt-8 max-w-sm p-6 text-left">
          <p className="eyebrow mb-2">Capability unlocked · {cap.tier}</p>
          <p className="font-display text-[20px] leading-snug text-ink">
            {cap.title}
          </p>
          <p className="mt-2 text-[14px] text-ink-soft">{cap.blurb}</p>
        </div>
      )}

      {/* Growth-loop stub (§18): share the capability just unlocked. */}
      {cap && <ShareCard capabilityId={capabilityId} job={getState().job} />}

      {/* §10: account creation AFTER the aha — skippable, never gates the win. */}
      {showAccount && (
        <AccountPrompt streak={streak} onDone={() => setShowAccount(false)} />
      )}

      <p className="mx-auto mt-8 max-w-sm text-[15px] leading-relaxed text-ink-soft">
        That’s the whole idea — small, real, done. Come back tomorrow for the
        next thing your field just learned.
      </p>

      <button onClick={onHome} className="btn-primary mt-7 w-full max-w-sm">
        Done for today
      </button>
    </div>
  );
}
