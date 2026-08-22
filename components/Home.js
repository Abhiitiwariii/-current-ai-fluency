"use client";

import { jobLabel, getDrop } from "@/lib/content";
import { coverFor, textureBackground } from "@/lib/cover";
import CapabilityLadder from "./CapabilityLadder";

// Home: forgiving streak, today's drop, capability ladder, stay-current teaser.
export default function Home({
  state,
  onStartDrop,
  onStartAudio,
  onResumeRep,
  onOpenMetrics,
  onReset,
}) {
  const drop = getDrop(state.job);
  const doneToday = state.completedDrops.includes(drop.id);
  const repWaiting = !doneToday && state.queuedDropId === drop.id;
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

        {/* Today's drop */}
        <section className="mt-8">
          {doneToday ? (
            <div className="card p-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[22px] text-paper">
                ✓
              </div>
              <p className="font-display text-[22px] text-ink">
                You’re current for today
              </p>
              <p className="mt-1 text-[14px] text-ink-soft">
                Next drop unlocks tomorrow. Streak’s safe.
              </p>
              <button
                onClick={onStartDrop}
                className="btn-ghost mt-4 text-[13px]"
              >
                Replay today’s drop
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
                  Now that you’re stationary, build the prompt yourself — that’s
                  where the skill sticks, and where you unlock the capability.
                </p>
                <button onClick={onResumeRep} className="btn-electric mt-4 w-full">
                  Do the queued rep →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={onStartDrop}
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
                  {drop.dateLabel} · 90 sec
                </p>
                <h2 className="relative mt-3 font-display text-[26px] leading-tight">
                  {drop.theme}
                </h2>
                <p className="relative mt-2 text-[14px] text-white/70">
                  One “whoa”, then you make it obey. →
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
              "The 90-sec workflow that replaced a manual weekly report",
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

        {/* Demo utility */}
        <div className="mt-16 flex items-center justify-center gap-4 border-t border-line pt-6 text-center">
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
        </div>
      </div>
    </main>
  );
}
