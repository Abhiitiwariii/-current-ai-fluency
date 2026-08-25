"use client";

import { useState } from "react";
import { CAPABILITIES } from "@/lib/content";
import { getState } from "@/lib/store";
import { track } from "@/lib/analytics";
import ShareCard from "./ShareCard";
import AccountPrompt from "./AccountPrompt";
import FeedbackForm from "./FeedbackForm";

// Completion ritual (§6/§11): bounded end, streak booked, capability unlocked.
// No XP, no confetti-toy energy — a calm, earned "you're current."
export default function DropComplete({
  streak,
  forgiven,
  capabilityId,
  programComplete,
  onHome,
  onCertificate,
}) {
  const cap = CAPABILITIES.find((c) => c.id === capabilityId);
  // §10: prompt for an account only if there isn't one yet (after the aha).
  const [showAccount, setShowAccount] = useState(!getState().account);
  const [showFeedback, setShowFeedback] = useState(false);

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

      {/* v2: cleared all five capabilities → the certificate is earned. */}
      {programComplete && (
        <div className="bloom-amber card mx-auto mt-8 max-w-sm border-electric/40 p-6 text-center">
          <p className="eyebrow mb-1">🎓 All five capabilities</p>
          <p className="font-display text-[22px] leading-snug text-ink">
            You’re AI-fluent — for real.
          </p>
          <p className="mt-2 text-[14px] text-ink-soft">
            Every working AI skill, done. Claim the certificate with your name on it.
          </p>
          <button onClick={onCertificate} className="btn-electric mt-4 w-full">
            Claim my certificate →
          </button>
        </div>
      )}

      {/* Growth-loop stub (§18): share the capability just unlocked. */}
      {cap && !programComplete && (
        <ShareCard capabilityId={capabilityId} job={getState().job} />
      )}

      {/* §10: account creation AFTER the aha — skippable, never gates the win. */}
      {showAccount && (
        <AccountPrompt streak={streak} onDone={() => setShowAccount(false)} />
      )}

      {/* v3.2: feedback invite right at the save moment, so people notice they
          can weigh in — not only tucked in the Home footer. */}
      <button
        onClick={() => {
          track("feedback_opened", { source: "complete" });
          setShowFeedback(true);
        }}
        className="mx-auto mt-6 block text-[13px] font-medium text-electric hover:opacity-80"
      >
        💬 Got a minute? Tell us what you think →
      </button>

      {showFeedback && (
        <FeedbackForm
          onClose={() => {
            track("feedback_dismissed", { source: "complete" });
            setShowFeedback(false);
          }}
        />
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
