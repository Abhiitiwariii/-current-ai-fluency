"use client";

import { useEffect, useMemo, useState } from "react";
import { nextNotification, shouldShowNudge } from "@/lib/notify";
import { track } from "@/lib/analytics";

// NotificationBanner (v2 Q5) — an in-app "push notification" styled like an OS
// lock-screen alert. Swiggy-voice copy from lib/notify. Tapping it fires the
// §17 `notification_tapped` funnel step (previously an intentional 0) and routes
// into today's drop. Dismiss suppresses it for the session.
export default function NotificationBanner({ state, onTap }) {
  const [dismissed, setDismissed] = useState(false);
  const note = useMemo(() => nextNotification(state), [state.streak, state.capabilities?.length]);
  const show = shouldShowNudge(state) && !dismissed;

  useEffect(() => {
    if (show) track("notification_shown", { title: note.title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!show) return null;

  function tap() {
    track("notification_tapped", { title: note.title });
    onTap();
  }

  function dismiss(e) {
    e.stopPropagation();
    track("notification_dismissed", { title: note.title });
    setDismissed(true);
  }

  return (
    <div className="mb-6">
      <button
        onClick={tap}
        className="group flex w-full items-start gap-3 rounded-2xl border border-electric/40 bg-[#171A20] px-4 py-3.5 text-left shadow-glow transition-transform hover:-translate-y-0.5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/20 text-[20px]">
          {note.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-electric">
              Current
            </span>
            <span className="text-[11px] text-white/40">now</span>
          </span>
          <span className="mt-0.5 block truncate text-[14px] font-semibold text-white">
            {note.title}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-white/70">
            {note.body}
          </span>
        </span>
        <span
          onClick={dismiss}
          role="button"
          aria-label="Dismiss"
          className="shrink-0 rounded-full px-2 py-0.5 text-[16px] text-white/40 hover:text-white/80"
        >
          ×
        </span>
      </button>
    </div>
  );
}
