"use client";

import { useMemo, useState } from "react";

// Chain steps into a mini-workflow (§6/§11). Tap steps in order (tap-to-order
// is more robust on mobile than drag). Forgiving: reset anytime before Check.
export default function Assemble({ rep, locked, onSubmit }) {
  const [order, setOrder] = useState([]); // ordered step ids

  // Present the steps shuffled so ordering is a real task, but stable per mount.
  const shuffled = useMemo(() => {
    const arr = [...rep.steps];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(id) {
    if (locked || order.includes(id)) return;
    setOrder((o) => [...o, id]);
  }

  const textFor = (id) => rep.steps.find((s) => s.id === id)?.text;

  return (
    <div className="animate-fade-up">
      <p className="eyebrow mb-3">Put it in order</p>
      <h3 className="font-display text-[24px] leading-snug text-ink">
        {rep.task}
      </h3>
      <p className="mt-2 text-[14px] text-ink-soft">{rep.scenarioHint}</p>

      {/* Ordered result */}
      <div className="mt-5 space-y-2">
        {order.map((id, i) => (
          <div
            key={id}
            className="flex items-center gap-3 rounded-2xl border border-electric bg-amber-soft px-4 py-3"
          >
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-electric text-[13px] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-[15px] text-ink">{textFor(id)}</span>
          </div>
        ))}
        {order.length === 0 && (
          <p className="text-[14px] italic text-ink-soft/70">
            Tap the steps below in the right order…
          </p>
        )}
      </div>

      {/* Remaining choices */}
      <div className="mt-5 grid gap-2.5">
        {shuffled
          .filter((s) => !order.includes(s.id))
          .map((s) => (
            <button
              key={s.id}
              disabled={locked}
              onClick={() => pick(s.id)}
              className="rounded-2xl border border-line bg-surface px-4 py-3 text-left text-[15px] text-ink transition-all hover:border-ink-soft/40 disabled:opacity-70"
            >
              {s.text}
            </button>
          ))}
      </div>

      {!locked && (
        <div className="mt-6 flex gap-3">
          {order.length > 0 && (
            <button
              onClick={() => setOrder([])}
              className="btn-ghost flex-none"
            >
              Reset
            </button>
          )}
          <button
            disabled={order.length !== rep.steps.length}
            onClick={() => onSubmit(order)}
            className="btn-primary flex-1"
          >
            Check the workflow
          </button>
        </div>
      )}
    </div>
  );
}
