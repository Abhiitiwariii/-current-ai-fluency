"use client";

import { useState } from "react";
import { achievementFor } from "@/lib/content";
import { track } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/whatsapp";

// Growth-loop stub (§18): completion produces a status-flattering, shareable
// achievement. The visual is the cinematic "awe" register (dark, electric) —
// premium, not a toy badge (Directive B). Sharing tracks the loop even though
// virality isn't measurable at 10 users; the *loop existing* is what's tested.
export default function ShareCard({ capabilityId, job }) {
  const ach = achievementFor(capabilityId, job);
  const [copied, setCopied] = useState(false);

  // Single shareable web link (§15) — the app root. In SSR/build this is empty.
  const link =
    typeof window !== "undefined" ? window.location.origin || "" : "";
  const shareText = `${ach.hook}\n\nToday I learned: ${ach.title}. A few minutes a day on Current.\n${link}`;

  async function share() {
    track("achievement_shared", { capability: capabilityId, method: "native" });
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Current", text: shareText, url: link });
        return;
      } catch {
        /* user cancelled or unsupported — fall through to copy */
      }
    }
    copy("native-fallback");
  }

  function shareWhatsApp() {
    track("achievement_shared", { capability: capabilityId, method: "whatsapp" });
    openWhatsApp(shareText);
  }

  function copy(method = "copy") {
    track("achievement_shared", { capability: capabilityId, method });
    try {
      navigator.clipboard?.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the card is still visible to screenshot */
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-sm">
      {/* The shareable artifact itself */}
      <div className="aurora-field overflow-hidden rounded-3xl p-6 text-left text-white shadow-glow">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {ach.role} · AI fluency
        </p>
        <p className="mt-3 text-[15px] leading-snug text-white/85">
          “{ach.hook}”
        </p>
        <div className="mt-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">
            What I can now do · {ach.tier}
          </p>
          <p className="mt-1 font-display text-[19px] leading-snug text-white">
            {ach.title}
          </p>
        </div>
        <p className="mt-4 text-[12px] text-white/50">
          Learned in minutes on <span className="font-semibold text-white/80">Current</span>
        </p>
      </div>

      {/* Share actions */}
      <div className="mt-3 flex gap-2">
        <button onClick={share} className="btn-electric flex-1 py-3 text-[14px]">
          Share this win
        </button>
        <button
          onClick={() => copy("copy")}
          className="btn-ghost px-4 text-[13px]"
          aria-live="polite"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
      <button
        onClick={shareWhatsApp}
        className="btn-ghost mt-2 w-full py-3 text-[14px]"
      >
        Share on WhatsApp
      </button>
      <p className="mt-2 text-center text-[11px] text-ink-soft/70">
        Flatters what you can do — never shows a streak or a miss (§18).
      </p>
    </div>
  );
}
