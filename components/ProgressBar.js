"use client";

export default function ProgressBar({ value, total, onExit }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="flex items-center gap-4">
      {onExit && (
        <button
          onClick={onExit}
          aria-label="Close"
          className="text-[20px] leading-none text-ink-soft transition-colors hover:text-ink"
        >
          ✕
        </button>
      )}
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-paper-dim">
        <div
          className="h-full rounded-full bg-electric transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
