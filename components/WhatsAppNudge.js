"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { dropMessage, waLink } from "@/lib/whatsapp";

// §13.7 delivery/share vector — get today's drop + the app link into WhatsApp.
// Primary: the native share sheet (navigator.share) — on mobile it opens the OS
// share menu, so you can pick WhatsApp AND a friend to send to. Fallback: a real
// wa.me anchor (mobile blocks window.open for wa.me), href built after mount so
// the app-origin link is included without an SSR hydration mismatch.
export default function WhatsAppNudge({ state }) {
  const [href, setHref] = useState("https://wa.me/");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setHref(waLink(dropMessage(state)));
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [state]);

  function onClick(e) {
    track("whatsapp_shared", { surface: "home", method: canShare ? "share" : "wa.me" });
    if (canShare) {
      // Prevent the anchor navigation; use the native sheet instead.
      e.preventDefault();
      navigator
        .share({ title: "Current", text: dropMessage(state) })
        .catch(() => {
          // user cancelled or share failed — open wa.me as a fallback
          window.open(href, "_blank", "noopener,noreferrer");
        });
    }
    // else: let the wa.me anchor href open normally
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span>
        <span className="block text-[15px] font-semibold text-ink">
          📲 Share your drop on WhatsApp
        </span>
        <span className="block text-[13px] text-ink-soft">
          Send today’s link to a friend or teammate — it lands where you
          already are
        </span>
      </span>
      <span className="text-ink-soft">→</span>
    </a>
  );
}
