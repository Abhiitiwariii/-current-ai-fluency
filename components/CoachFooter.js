"use client";

// Forgiving coaching, never punishment (§5). Even a "not yet" is warm and useful.
export default function CoachFooter({ result, onContinue }) {
  if (!result) return null;
  const good = result.correct;
  return (
    <div
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
