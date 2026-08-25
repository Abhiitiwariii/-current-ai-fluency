"use client";

import { track } from "@/lib/analytics";
import { dropMessage, openWhatsApp } from "@/lib/whatsapp";

// §13.7 delivery vector — bring the daily drop into WhatsApp, the app the target
// segment already lives in. Real scheduled push needs the Business API + backend
// (stubbed, §13.7/§14); this is the honest client-side version: pre-fill WhatsApp
// with today's drop + the single shared link, to send to self or a peer (§18).
export default function WhatsAppNudge({ state }) {
  function send() {
    const url = openWhatsApp(dropMessage(state));
    track("whatsapp_shared", { surface: "home", url_ok: !!url });
  }

  return (
    <button
      onClick={send}
      className="mt-3 flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span>
        <span className="block text-[15px] font-semibold text-ink">
          📲 Get your drop on WhatsApp
        </span>
        <span className="block text-[13px] text-ink-soft">
          Send today’s link to yourself or a teammate — it lands where you
          already are
        </span>
      </span>
      <span className="text-ink-soft">→</span>
    </button>
  );
}
