"use client";

import { useEffect, useState } from "react";
import { track, getUserId } from "@/lib/analytics";
import { mpSetPerson } from "@/lib/mixpanel";
import { sendFeedbackOnWhatsApp } from "@/lib/whatsapp";
import { getState } from "@/lib/store";
import { supabase, isSupabaseConfigured, insertRow } from "@/lib/supabase";

// FeedbackForm (v3.2) — a light "what do you like / what would you change" prompt.
// Dual-write, best-effort: always logs locally via track() (so it rides the
// existing Metrics JSON/CSV export), and additionally inserts to Supabase when
// configured. Failures are swallowed — the user always sees a thank-you.
export default function FeedbackForm({ onClose, defaultEmail = "" }) {
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [email, setEmail] = useState("");
  const [knownEmail, setKnownEmail] = useState(defaultEmail || "");
  const [sent, setSent] = useState(false);
  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const hasText = !!(likes.trim() || dislikes.trim());
  // Show Google only when Supabase is configured and we don't already know an email.
  const googleEnabled = isSupabaseConfigured() && !knownEmail;

  // A Google email can arrive late (session hydrates after the OAuth return); when
  // it does, pre-fill so the user never types it.
  useEffect(() => {
    if (defaultEmail) {
      setKnownEmail(defaultEmail);
      setEmail((cur) => cur || defaultEmail);
    }
  }, [defaultEmail]);

  // On mount: fall back to any saved account email + restore a draft left behind
  // before a Google redirect.
  useEffect(() => {
    const a = getState().account;
    if (a?.email) {
      setKnownEmail((cur) => cur || a.email);
      setEmail((cur) => cur || a.email);
    }
    try {
      const raw = localStorage.getItem("current.feedback.draft");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.likes) setLikes(d.likes);
        if (d.dislikes) setDislikes(d.dislikes);
        localStorage.removeItem("current.feedback.draft");
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist the typed draft, then send them to Google. On return the form can be
  // reopened and the email is pre-filled from their account (no typing).
  function continueWithGoogle() {
    track("google_signin_started", { surface: "feedback" });
    try {
      localStorage.setItem(
        "current.feedback.draft",
        JSON.stringify({ likes, dislikes })
      );
      // Flag so the app auto-reopens this form on return from Google.
      localStorage.setItem("current.feedback.pending", "1");
    } catch {
      /* storage blocked — draft just won't restore */
    }
    supabase?.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  // Log the feedback everywhere (local funnel + Supabase + Mixpanel). Shared by
  // both the in-app Send and the "Send on WhatsApp" paths, tagged by `channel`.
  function persist(l, d, e, channel) {
    track("feedback_submitted", {
      has_likes: !!l,
      has_dislikes: !!d,
      has_email: !!e,
      channel,
    });
    // Best-effort Supabase capture (no-op if unconfigured).
    insertRow("feedback", {
      user_id: getUserId(),
      likes: l || null,
      dislikes: d || null,
      email: e || null,
    });
    if (e) insertRow("signups", { email: e, source: "feedback" });
    // Attach the email to the Mixpanel profile (Users view).
    if (e) mpSetPerson({ email: e, method: "feedback" });
  }

  // In-app send: requires a valid email (the acquisition step) + some text.
  function submit() {
    if (!emailValid || !hasText) return;
    persist(likes.trim(), dislikes.trim(), email.trim(), "in_app");
    setSent(true);
    setTimeout(() => onClose?.(), 1100);
  }

  // WhatsApp send: only needs some text (email optional — WhatsApp already
  // identifies them by their chat). Logs the same, then opens WhatsApp addressed
  // to the founder with the feedback pre-filled.
  function submitWhatsApp() {
    if (!hasText) return;
    const l = likes.trim();
    const d = dislikes.trim();
    const e = emailValid ? email.trim() : "";
    persist(l, d, e, "whatsapp");
    sendFeedbackOnWhatsApp({ likes: l, dislikes: d, email: e });
    setSent(true);
    setTimeout(() => onClose?.(), 1100);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-sm p-6 text-left"
        onClick={(ev) => ev.stopPropagation()}
      >
        {sent ? (
          <div className="py-6 text-center">
            <p className="font-display text-[20px] text-ink">Thank you ✓</p>
            <p className="mt-1 text-[14px] text-ink-soft">
              This is exactly what shapes the next drops.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-1">Tell us straight</p>
            <p className="font-display text-[19px] leading-snug text-ink">
              What do you think of Current?
            </p>

            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold text-ink">
                  What do you like?
                </span>
                <textarea
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  rows={2}
                  placeholder="The part that clicked…"
                  className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-electric"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[13px] font-semibold text-ink">
                  What would you change?
                </span>
                <textarea
                  value={dislikes}
                  onChange={(e) => setDislikes(e.target.value)}
                  rows={2}
                  placeholder="What felt off, or missing…"
                  className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-electric"
                />
              </label>
              {googleEnabled && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={continueWithGoogle}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-electric"
                  >
                    <span className="text-[16px]">G</span>
                    Use my Google email — no typing
                  </button>
                  <div className="my-2 flex items-center gap-3 text-[11px] uppercase tracking-wide text-ink-soft/60">
                    <span className="h-px flex-1 bg-line" />
                    or enter it
                    <span className="h-px flex-1 bg-line" />
                  </div>
                </div>
              )}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                autoComplete="email"
                className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-electric"
              />
              {knownEmail && (
                <p className="text-[12px] text-ink-soft/70">
                  Using your saved email — edit it if you like.
                </p>
              )}
            </div>

            <button
              onClick={submit}
              disabled={!emailValid || !hasText}
              className="btn-electric mt-4 w-full py-3 text-[15px] disabled:opacity-50"
            >
              Send feedback
            </button>
            {!emailValid && email.trim() !== "" && (
              <p className="mt-1.5 text-center text-[12px] text-ink-soft/70">
                Enter a valid email so we can follow up.
              </p>
            )}
            <button
              onClick={submitWhatsApp}
              disabled={!hasText}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-electric disabled:opacity-50"
            >
              <span aria-hidden className="text-[16px]">💬</span>
              Send on WhatsApp
            </button>
            <p className="mt-1.5 text-center text-[12px] text-ink-soft/70">
              Prefer WhatsApp? Send it straight to us — email optional.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full text-center text-[12px] text-ink-soft/70 hover:text-ink-soft"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
