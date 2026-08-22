"use client";

import { useEffect, useRef, useState } from "react";

// The "watch AI do it" moment, simulated (no video assets): the input appears,
// the model "thinks", then the deliverable streams out chunk by chunk.
// Autoplays on mount; replayable. This is what makes the awe actually *play*.
export default function AweDemo({ input, outputs, autoPlay = true }) {
  // phase: idle -> input -> thinking -> streaming -> done
  const [phase, setPhase] = useState("idle");
  const [shown, setShown] = useState(0); // how many output chunks are visible
  const timers = useRef([]);

  function clearTimers() {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }

  function run() {
    clearTimers();
    setShown(0);
    setPhase("input");

    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(650, () => setPhase("thinking"));
    at(1650, () => setPhase("streaming"));

    // stream each chunk ~600ms apart
    outputs.forEach((_, i) => {
      at(1650 + (i + 1) * 620, () => setShown(i + 1));
    });
    at(1650 + outputs.length * 620 + 300, () => setPhase("done"));
  }

  useEffect(() => {
    if (autoPlay) run();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const started = phase !== "idle";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
      {/* Fake tool chrome */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 text-[11px] uppercase tracking-wide text-white/30">
          AI assistant
        </span>
      </div>

      {/* Input line */}
      <div className="flex items-start gap-2 text-[14px]">
        <span className="mt-0.5 text-white/40">›</span>
        <span className="text-white/85">
          {started ? (
            input
          ) : (
            <span className="text-white/40">preparing…</span>
          )}
          {phase === "input" && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/[0.06]" />
          )}
        </span>
      </div>

      {/* Thinking / streaming output */}
      <div className="mt-3 min-h-[132px] border-t border-white/10 pt-3">
        {phase === "thinking" && (
          <div className="flex items-center gap-2 text-[13px] text-white/50">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/[0.06]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/[0.06] [animation-delay:0.15s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/[0.06] [animation-delay:0.3s]" />
            </span>
            Generating…
          </div>
        )}

        {(phase === "streaming" || phase === "done") && (
          <ul className="space-y-1.5">
            {outputs.slice(0, shown).map((line, i) => (
              <li
                key={i}
                className="animate-fade-up text-[13.5px] leading-snug text-white/90"
              >
                {line}
              </li>
            ))}
            {phase === "streaming" && shown < outputs.length && (
              <li className="text-[13.5px] text-white/40">
                <span className="inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/[0.06]" />
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Replay */}
      {phase === "done" && (
        <button
          onClick={run}
          className="mt-3 text-[12px] font-medium text-white/50 transition-colors hover:text-white/90"
        >
          ↻ Replay
        </button>
      )}
    </div>
  );
}
