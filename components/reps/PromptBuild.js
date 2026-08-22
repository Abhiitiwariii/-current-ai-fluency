"use client";

import { useState } from "react";

// The core guided-production rep (§6): assemble a strong, context-rich prompt
// by choosing the components that belong. Deterministic, checkable structure.
export default function PromptBuild({ rep, locked, onSubmit }) {
  const [picked, setPicked] = useState([]); // ordered list of option ids

  function toggle(id) {
    if (locked) return;
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  }

  const chosen = picked
    .map((id) => rep.options.find((o) => o.id === id))
    .filter(Boolean);

  return (
    <div className="animate-fade-up">
      <p className="eyebrow mb-3">Build it yourself</p>
      <h3 className="font-display text-[24px] leading-snug text-ink">
        {rep.task}
      </h3>
      <p className="mt-2 text-[14px] text-ink-soft">{rep.scenarioHint}</p>

      {/* The prompt being assembled — §21.2/21.5: mono sandbox with an amber caret,
          so "doing real AI work" feels real. */}
      <div className="mt-5 min-h-[92px] rounded-2xl border border-dashed border-line bg-well p-4 font-mono">
        <p className="mb-2 text-[11px] uppercase tracking-wide text-ink-soft">
          <span className="text-electric">▍</span> your prompt
        </p>
        {chosen.length === 0 ? (
          <p className="text-[13px] italic text-ink-soft/70">
            Tap the lines below that make this prompt strong…
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {chosen.map((o) => (
              <span key={o.id} className="token bg-amber-soft text-electric text-[13px]">
                {o.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Component bank */}
      <div className="mt-5 grid gap-2.5">
        {rep.options.map((o) => {
          const active = picked.includes(o.id);
          return (
            <button
              key={o.id}
              disabled={locked}
              onClick={() => toggle(o.id)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-[15px] transition-all ${
                active
                  ? "border-electric bg-amber-soft text-ink"
                  : "border-line bg-surface text-ink hover:border-ink-soft/40"
              } disabled:opacity-70`}
            >
              <span>{o.text}</span>
              <span
                className={`ml-3 flex h-5 w-5 flex-none items-center justify-center rounded-md border text-[12px] ${
                  active
                    ? "border-electric bg-electric text-[#1a1206]"
                    : "border-line text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          disabled={picked.length === 0}
          onClick={() => onSubmit(picked)}
          className="btn-primary mt-6 w-full"
        >
          Check my prompt
        </button>
      )}
    </div>
  );
}
