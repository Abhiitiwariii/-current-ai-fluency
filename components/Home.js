"use client";

import { useState } from "react";
import { jobLabel, getDrop, TRACK_LENGTH } from "@/lib/content";
import { coverFor, textureBackground } from "@/lib/cover";
import { track } from "@/lib/analytics";
import CapabilityLadder from "./CapabilityLadder";
import NotificationBanner from "./NotificationBanner";
import WhatsAppNudge from "./WhatsAppNudge";
import FeedbackForm from "./FeedbackForm";
import AccountPrompt from "./AccountPrompt";

// Home: forgiving streak, today's drop, capability ladder, stay-current teaser.
// v2: the drop advances tier-by-tier (one capability per drop); once all five
// are cleared, the AI-Fluency certificate is claimable here.
export default function Home({
  state,
  onStartDrop,
  onStartAudio,
  onResumeRep,
  onOpenCertificate,
  onOpenMetrics,
  onSignOut,
  onReset,
}) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const hasAccount = !!state.account || savedLocally;
  const isGoogle = state.account?.provider === "google";
  const unlocked = state.capabilities.length;
  const programComplete = unlocked >= TRACK_LENGTH;
  const tier = Math.min(unlocked, TRACK_LENGTH - 1);
  const drop = getDrop(state.job, tier);
  const repWaiting = !programComplete && state.queuedDropId === drop.id;
  const cover = coverFor(drop.theme); // §21.8 seeded daily tint

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-xl px-6 pb-24 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Current</p>
            <p className="mt-1 text-[15px] text-ink-soft">
              for {jobLabel(state.job)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 shadow-card">
            <span className="text-[18px]">🔥</span>
            <span className="text-[16px] font-bold text-ink">
              {state.streak}
            </span>
            <span className="text-[13px] text-ink-soft">day streak</span>
          </div>
        </div>

        {/* v3.2: persistent save/sign-in — so people can save progress (and share
            their email via Google) without finishing a drop first. */}
        {!hasAccount && (
          <button
            onClick={() => setShowSave(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-electric/40 bg-surface px-5 py-3 text-[15px] font-semibold text-ink shadow-card transition-all hover:-translate-y-0.5 hover:border-electric"
          >
            <span className="text-[16px]">✦</span>
            Save my progress
          </button>
        )}

        {/* v2: Swiggy-voice in-app notification nudge (fires notification_tapped). */}
        {!programComplete && (
          <div className="mt-8">
            <NotificationBanner state={state} onTap={() => onStartDrop()} />
          </div>
        )}

        {/* Today's drop / track progress */}
        <section className={programComplete ? "mt-8" : "mt-2"}>
          {programComplete ? (
            <div className="aurora-field overflow-hidden rounded-3xl p-7 text-center text-white shadow-glow">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-electric text-[26px] text-[#1a1206]">
                🎓
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-electric">
                AI Fluency · complete
              </p>
              <p className="mt-2 font-display text-[24px] leading-tight text-white">
                All five capabilities, done.
              </p>
              <p className="mt-1.5 text-[14px] text-white/70">
                Your certificate has your name on it. Show it off.
              </p>
              <button
                onClick={onOpenCertificate}
                className="btn-electric mt-5 w-full"
              >
                View my certificate →
              </button>
              <button
                onClick={() => onStartDrop(0)}
                className="mt-3 text-[13px] text-white/60 hover:text-white/90"
              >
                Replay the track
              </button>
            </div>
          ) : repWaiting ? (
            // §13.1: they listened on the go; the hands-on rep is queued.
            <div className="card overflow-hidden p-0">
              <div className="border-b border-line bg-[#171A20] px-6 py-4">
                <p className="text-[13px] font-semibold text-electric">
                  🎧 You listened on the go — streak safe.
                </p>
              </div>
              <div className="p-6">
                <h2 className="font-display text-[22px] leading-tight text-ink">
                  One rep is waiting for you
                </h2>
                <p className="mt-1.5 text-[14px] text-ink-soft">
                  Now that you’re stationary, do the rep yourself — that’s where
                  the skill sticks, and where you unlock the capability.
                </p>
                <button onClick={onResumeRep} className="btn-electric mt-4 w-full">
                  Do the queued rep →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => onStartDrop()}
                style={{ boxShadow: `0 0 0 1px ${cover.tint.edge}, 0 24px 70px -22px ${cover.tint.halo}` }}
                className="aurora-field group relative block w-full overflow-hidden rounded-3xl p-7 text-left text-white transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{ background: textureBackground(cover.texture, cover.tint.halo) }}
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-14 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: cover.tint.halo }}
                />
                <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Capability {tier + 1} of {TRACK_LENGTH}
                </p>
                <h2 className="relative mt-3 font-display text-[26px] leading-tight">
                  {drop.theme}
                </h2>
                <p className="relative mt-2 text-[14px] text-white/70">
                  Watch, one “whoa”, then you make it obey. →
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-night transition-transform group-hover:translate-x-1">
                  Start today’s drop →
                </span>
              </button>

              {/* §13.1 audio mode + §13.6 low-bandwidth path */}
              <button
                onClick={onStartAudio}
                className="mt-3 flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span>
                  <span className="block text-[15px] font-semibold text-ink">
                    🎧 On the move? Commute mode
                  </span>
                  <span className="block text-[13px] text-ink-soft">
                    Listen hands-free ({drop.audio.durationHint}) · streak still
                    counts
                  </span>
                </span>
                <span className="text-ink-soft">→</span>
              </button>

              {/* §13.7 WhatsApp delivery vector — meet them where they live */}
              <WhatsAppNudge state={state} />
            </div>
          )}
        </section>

        {/* Capability ladder */}
        <section className="mt-12">
          <CapabilityLadder unlocked={state.capabilities} />
        </section>

        {/* Stay-current feed teaser (deferred surface) */}
        <section className="mt-12">
          <h3 className="mb-4 font-display text-[20px] text-ink">
            Fresh this week
          </h3>
          <div className="space-y-3 opacity-60">
            {[
              "The workflow that replaced a manual weekly report",
              "One prompt pattern that cut a task from an hour to 5 minutes",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4"
              >
                <span className="text-[15px] text-ink">{t}</span>
                <span className="chip">soon</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prominent feedback CTA */}
        <div className="mt-14 rounded-3xl border border-electric/30 bg-surface p-6 text-center shadow-card">
          <p className="font-display text-[20px] leading-snug text-ink">
            How’s Current working for you?
          </p>
          <p className="mt-1 text-[14px] text-ink-soft">
            Tell us what you love and what you’d change — 30 seconds.
          </p>
          <button
            onClick={() => {
              track("feedback_opened");
              setShowFeedback(true);
            }}
            className="btn-electric mt-4 inline-flex items-center gap-2 px-7 py-3.5 text-[16px]"
          >
            💬 Share your feedback
          </button>
        </div>

        {/* Demo utility */}
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-line pt-6 text-center">
          {programComplete && (
            <>
              <button
                onClick={onOpenCertificate}
                className="text-[12px] text-ink-soft/70 hover:text-ink-soft"
              >
                Certificate
              </button>
              <span className="text-ink-soft/30">·</span>
            </>
          )}
          <button
            onClick={onOpenMetrics}
            className="text-[12px] text-ink-soft/70 hover:text-ink-soft"
          >
            Metrics
          </button>
          <span className="text-ink-soft/30">·</span>
          <button
            onClick={onReset}
            className="text-[12px] text-ink-soft/70 hover:text-ink-soft"
          >
            Reset demo (clear progress)
          </button>
          {isGoogle && (
            <>
              <span className="text-ink-soft/30">·</span>
              <button
                onClick={onSignOut}
                className="text-[12px] text-ink-soft/70 hover:text-ink-soft"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>

      {showFeedback && (
        <FeedbackForm
          onClose={() => {
            track("feedback_dismissed");
            setShowFeedback(false);
          }}
        />
      )}

      {showSave && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowSave(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AccountPrompt
              streak={state.streak}
              onDone={() => {
                setShowSave(false);
                setSavedLocally(true);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
