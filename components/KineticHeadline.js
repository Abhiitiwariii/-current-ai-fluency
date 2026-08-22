"use client";

// §21.9: staggered word-by-word reveal for the HOOK headline only (awe + cover).
// Each word rises and settles in sequence — cinematic, editorial. Banned in the
// "do" surfaces (reps/controls); this component is only used in the hook.
// Reduced-motion: the global CSS rule collapses the animation to an instant show.
export default function KineticHeadline({ text, className = "", stagger = 90, delay = 120 }) {
  const words = String(text).split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block whitespace-nowrap">
          <span
            className="kinetic-word"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
