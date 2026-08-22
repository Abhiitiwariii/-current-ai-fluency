"use client";

import { useState } from "react";
import { createAccount } from "@/lib/store";
import { track } from "@/lib/analytics";

// §10: account creation AFTER the aha — "this respects my time" first, signup
// second. Skippable (§5 forgiving; never gate the win behind a form). Local-only.
// Books the account_created funnel step (§16 guardrail, §17).
export default function AccountPrompt({ streak, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    createAccount({ name, email });
    track("account_created", { has_email: !!email.trim() });
    setSaved(true);
    setTimeout(() => onDone?.(), 900);
  }

  if (saved) {
    return (
      <div className="card mx-auto mt-6 max-w-sm p-6 text-center">
        <p className="font-display text-[20px] text-ink">
          Saved{name.trim() ? `, ${name.trim()}` : ""} ✓
        </p>
        <p className="mt-1 text-[14px] text-ink-soft">
          Your {streak}-day streak is locked in.
        </p>
      </div>
    );
  }

  return (
    <div className="card mx-auto mt-6 max-w-sm p-6 text-left">
      <p className="eyebrow mb-1">Keep this going</p>
      <p className="font-display text-[19px] leading-snug text-ink">
        Save your {streak}-day streak
      </p>
      <p className="mt-1.5 text-[13px] text-ink-soft">
        So tomorrow’s drop finds you — and your progress is never lost.
      </p>

      <div className="mt-4 space-y-2.5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-electric"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-electric"
        />
      </div>

      <button onClick={save} className="btn-electric mt-4 w-full py-3 text-[15px]">
        Save my progress
      </button>
      <button
        onClick={() => {
          track("account_skipped");
          onDone?.();
        }}
        className="mt-2 w-full text-center text-[12px] text-ink-soft/70 hover:text-ink-soft"
      >
        Not now
      </button>
    </div>
  );
}
