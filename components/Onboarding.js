"use client";

import { useEffect, useState } from "react";
import { JOBS, getDrop } from "@/lib/content";
import { track } from "@/lib/analytics";
import AweDemo from "@/components/AweDemo";
import KineticHeadline from "@/components/KineticHeadline";

export default function Onboarding({ onStart }) {
  const [job, setJob] = useState(null);
  const drop = job ? getDrop(job) : null;

  // §17: funnel entry. Fires once when the cold-start screen mounts.
  useEffect(() => {
    track("onboarding_started");
  }, []);

  function selectJob(jobId) {
    setJob(jobId);
    // job_selected → the tailored awe demo renders immediately, so log both.
    track("job_selected", { job: jobId });
    track("awe_card_viewed", { drop_id: getDrop(jobId).id, source: "onboarding" });
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-xl px-6 pb-24 pt-16">
        <p className="eyebrow mb-4">Current · AI fluency, daily</p>

        {!job && (
          <div className="animate-fade-up">
            <h1 className="font-display text-[40px] leading-[1.05] tracking-tight text-ink">
              Don’t get{" "}
              <span className="italic text-electric">left behind</span>.
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              AI is changing your job faster than any course can keep up. Ninety
              seconds a day keeps you genuinely fluent — not in theory, in your
              actual work.
            </p>

            <div className="mt-10">
              <p className="text-[15px] font-semibold text-ink">
                First, what do you do?
              </p>
              <p className="mb-4 text-[14px] text-ink-soft">
                We’ll tailor today’s demo to your world.
              </p>
              <div className="grid gap-3">
                {JOBS.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => selectJob(j.id)}
                    className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span>
                      <span className="block text-[16px] font-semibold text-ink">
                        {j.label}
                      </span>
                      <span className="block text-[13px] text-ink-soft">
                        {j.hint}
                      </span>
                    </span>
                    <span className="text-ink-soft transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {job && (
          <div className="animate-scale-in">
            <button
              onClick={() => setJob(null)}
              className="mb-6 text-[13px] font-medium text-ink-soft hover:text-ink"
            >
              ← different role
            </button>

            {/* The minute-one "whoa" — value before any signup */}
            <div className="aurora-field overflow-hidden rounded-3xl p-7 text-white shadow-glow">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Watch this
              </p>
              <h2 className="mt-3 font-display text-[26px] leading-tight">
                <KineticHeadline text={drop.awe.headline} />
              </h2>
              <div className="mt-5">
                <AweDemo
                  key={job}
                  input={drop.awe.input}
                  outputs={drop.awe.outputs}
                />
              </div>
            </div>

            <p className="mt-7 text-center text-[16px] leading-relaxed text-ink">
              Impressive — but the skill isn’t watching it.
              <br />
              <span className="text-ink-soft">
                It’s making it do that on command. Your turn.
              </span>
            </p>

            <button
              onClick={() => onStart(job)}
              className="btn-electric mt-6 w-full py-4 text-[16px]"
            >
              Start my first drop
            </button>
            <p className="mt-3 text-center text-[12px] text-ink-soft">
              90 seconds · no account needed to try
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
