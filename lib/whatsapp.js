// whatsapp.js — WhatsApp as a delivery + growth vector (§13.7 / §18).
//
// The spec's "WhatsApp-delivered drops" (§13.7) means PUSHING the daily drop
// into WhatsApp on a schedule — that needs the WhatsApp Business API + a backend
// and an explicit feasibility check (§13.7 / §14), so real scheduled delivery
// stays STUBBED like Web Push (see notify.js). What's real and client-side today:
// open WhatsApp pre-filled so a user can pull today's drop into the app they
// already live in, or hand the single shared link to a peer (the §18 loop).

import { nextNotification } from "./notify";

// wa.me with no number opens WhatsApp's "share to any chat" picker (web + app).
export function waLink(text) {
  return `https://wa.me/?text=${encodeURIComponent(text || "")}`;
}

export function appLink() {
  if (typeof window === "undefined") return "";
  return window.location.origin || "";
}

// The daily-drop delivery message, in the Swiggy-voice (reuses notify.js copy)
// so what lands in WhatsApp reads exactly like the in-app nudge.
export function dropMessage(state) {
  const n = nextNotification(state);
  const link = appLink();
  return `${n.emoji} ${n.title}\n${n.body}${link ? `\n\n${link}` : ""}`;
}

// Opens WhatsApp with the message; returns the URL used (also handy for tests).
export function openWhatsApp(text) {
  const url = waLink(text);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
}

// ─────────────────────────────────────────────────────────────────────────────
// Real scheduled WhatsApp delivery (stub). Wire to the WhatsApp Business/Cloud
// API + a backend that stores opt-ins and sends templated drops at the learned
// daily windows (§13.5). Left inert so the MVP never implies a delivery it can't
// honor — mirrors the Web Push stub in notify.js.
// ─────────────────────────────────────────────────────────────────────────────
export function subscribeWhatsAppDelivery(/* phone, windows */) {
  // TODO(whatsapp): validate Business API feasibility (§13.7/§14), capture the
  // opt-in + phone server-side, schedule template messages. No-op today.
  return { supported: false, reason: "WhatsApp Business API not wired in MVP" };
}
