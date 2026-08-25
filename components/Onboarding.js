"use client";

import { useEffect, useState } from "react";
import { JOBS, videoForJob } from "@/lib/content";
import { track } from "@/lib/analytics";
import VideoHook from "@/components/VideoHook";

// Minute-one flow (v3.1): persona picker → motivating video → straight into the
// first drop (Foundations, tier 0). The video is the hook now; the old simulated
// awe-demo beat was cut (two passive "watch" screens back-to-back was one too many).
export default function Onboarding({ onStart }) {
  const [job, setJob] = useState(null);
  const video = job ? videoForJob(job) : null;

  // §17: funnel entry. Fires once when the cold-start screen mounts.
  useEffect(() => {
    track("onboarding_started");
  }, []);

  function selectJob(jobId) {
    setJob(jobId);
    track("job_selected", { job: jobId });
  }

  function resetJob() {
    setJob(null);
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
              AI is changing your job faster than any course can keep up. A few
              minutes a day keeps you genuinely fluent — not in theory, in your
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
              onClick={resetJob}
              className="mb-6 text-[13px] font-medium text-ink-soft hover:text-ink"
            >
              ← different role
            </button>

            {/* The motivating video, then straight into the first drop. */}
            <VideoHook
              video={video}
              theme="onboarding"
              job={job}
              onContinue={() => onStart(job)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
