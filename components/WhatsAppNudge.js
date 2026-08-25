"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { dropMessage, waLink } from "@/lib/whatsapp";

// §13.7 delivery vector — bring the daily drop into WhatsApp. Uses a real anchor
// (not window.open, which mobile browsers block for wa.me), so tapping reliably
// deep-links into the WhatsApp app on mobile / WhatsApp Web on desktop. The href
// is built after mount so the app-origin link is included without an SSR mismatch.
export default function WhatsAppNudge({ state }) {
  const [href, setHref] = useState("https://wa.me/");

  useEffect(() => {
    setHref(waLink(dropMessage(state)));
  }, [state]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_shared", { surface: "home" })}
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
    </a>
  );
}
