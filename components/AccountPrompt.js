"use client";

import { useState } from "react";
import { createAccount } from "@/lib/store";
import { track } from "@/lib/analytics";
import { mpSetPerson } from "@/lib/mixpanel";
import { supabase, isSupabaseConfigured, insertRow } from "@/lib/supabase";

// §10: account creation AFTER the aha — "this respects my time" first, signup
// second. Skippable (§5 forgiving; never gate the win behind a form).
// v3.2: adds an optional "Continue with Google" path (shown only when Supabase
// is configured); the local name/email path always works as a graceful floor.
// Books the account_created funnel step (§16 guardrail, §17).
export default function AccountPrompt({ streak, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const googleEnabled = isSupabaseConfigured();
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());

  function save() {
    if (!emailValid) return;
    const trimmedEmail = email.trim();
    createAccount({ name, email });
    track("account_created", { has_email: !!trimmedEmail, method: "local" });
    // Put the real name/email on the Mixpanel profile (Users view).
    mpSetPerson({ name: name.trim() || undefined, email: trimmedEmail, method: "local" });
    // v3.2: capture a typed email into Supabase too (best-effort, no-op if unconfigured).
    if (trimmedEmail) {
      insertRow("signups", {
        email: trimmedEmail,
        name: name.trim() || null,
        source: "account",
      });
    }
    setSaved(true);
    setTimeout(() => onDone?.(), 900);
  }

  // v3.2: full-page redirect to Google, back to the app root (see SUPABASE_SETUP.md).
  function continueWithGoogle() {
    track("google_signin_started");
    supabase?.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
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

      {googleEnabled && (
        <>
          <button
            onClick={continueWithGoogle}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-electric"
          >
            <span className="text-[16px]">G</span>
            Continue with Google
          </button>
          <div className="my-3 flex items-center gap-3 text-[11px] uppercase tracking-wide text-ink-soft/60">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>
        </>
      )}

      <div className={googleEnabled ? "space-y-2.5" : "mt-4 space-y-2.5"}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name (optional)"
          autoComplete="given-name"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-electric"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-electric"
        />
      </div>

      <button
        onClick={save}
        disabled={!emailValid}
        className="btn-electric mt-4 w-full py-3 text-[15px] disabled:opacity-50"
      >
        Save my progress
      </button>
      {!emailValid && email.trim() !== "" && (
        <p className="mt-1.5 text-center text-[12px] text-ink-soft/70">
          Enter a valid email to save.
        </p>
      )}
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
