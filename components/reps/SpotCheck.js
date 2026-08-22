"use client";

import { useState } from "react";

// Fast recognition warm-up (§6 "seasoned with recognition").
export default function SpotCheck({ rep, locked, onSubmit }) {
  const [sel, setSel] = useState(null);

  return (
    <div className="animate-fade-up">
      <p className="eyebrow mb-3">Warm-up</p>
      <h3 className="font-display text-[24px] leading-snug text-ink">
        {rep.prompt}
      </h3>

      <div className="mt-6 grid gap-3">
        {rep.options.map((o) => {
          const active = sel === o.id;
          return (
            <button
              key={o.id}
              disabled={locked}
              onClick={() => setSel(o.id)}
              className={`rounded-2xl border px-5 py-4 text-left text-[15px] transition-all ${
                active
                  ? "border-electric bg-amber-soft text-ink shadow-card"
                  : "border-line bg-surface text-ink hover:border-ink-soft/40"
              } disabled:opacity-70`}
            >
              {o.text}
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          disabled={!sel}
          onClick={() => onSubmit(sel)}
          className="btn-primary mt-6 w-full"
        >
          Check
        </button>
      )}
    </div>
  );
}
