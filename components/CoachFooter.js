"use client";

import { useEffect, useRef } from "react";

// Forgiving coaching, never punishment (§5). Even a "not yet" is warm and useful.
// The bar is fixed to the viewport bottom, so it reports its real height up to the
// parent (onHeight) — the rep view pads its content by exactly that, so a long
// coaching line never sits on top of the lower answer options.
export default function CoachFooter({ result, onContinue, onHeight }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!result || !ref.current) {
      onHeight?.(0);
      return;
    }
    const el = ref.current;
    const report = () => onHeight?.(el.offsetHeight);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => {
      ro.disconnect();
      onHeight?.(0);
    };
  }, [result, onHeight]);

  if (!result) return null;
  const good = result.correct;
  return (
    <div
      ref={ref}
      className={`animate-fade-up fixed inset-x-0 bottom-0 border-t ${
        good ? "border-aurora/40 bg-good/10" : "border-electric/30 bg-amber-soft"
      }`}
    >
      <div className="mx-auto flex max-w-xl flex-col gap-3 px-6 py-5">
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-[15px] font-bold text-white ${
              good ? "bg-aurora" : "bg-electric"
            }`}
          >
            {good ? "✓" : "↻"}
          </span>
          <div>
            <p
              className={`text-[15px] font-semibold ${
                good ? "text-good" : "text-electric"
              }`}
            >
              {good ? "Nailed it." : "Almost — here’s the tweak"}
            </p>
            <p className="mt-0.5 text-[14px] leading-snug text-ink-soft">
              {result.coach}
            </p>
          </div>
        </div>
        <button
          onClick={onContinue}
          className={good ? "btn-electric w-full" : "btn-primary w-full"}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
