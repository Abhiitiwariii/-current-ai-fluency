// notify.js — the "Swiggy-voice" notification engine (v2 Q5).
//
// Delivery: an IN-APP notification surface for now (zero infra, works on the
// live site, and finally lets the §17 `notification_tapped` funnel step fire).
// The real Web Push path (service worker + push backend) is stubbed at the
// bottom so this upgrades to true re-engagement later without rearchitecting.
//
// Voice: witty, sensory, a little cheeky — the eye-catching copy that earns the
// tap. Persona- and streak-aware so it feels written for THIS user, today.

import { jobLabel } from "./content";

// Copy variants. Each is a full notification: { emoji, title, body }.
// `{role}` / `{streak}` are filled at render time.
const IDLE_LINES = [
  {
    emoji: "🧠",
    title: "Your brain called. It’s hungry.",
    body: "A hot serving of AI, ready now. Tap in before it gets cold.",
  },
  {
    emoji: "⚡",
    title: "The AI skill your team’s still Googling…",
    body: "…you can have in minutes. Skip the line →",
  },
  {
    emoji: "🍿",
    title: "One “whoa”, then you make it obey.",
    body: "Today’s drop is plated. {role}-grade. Dig in.",
  },
  {
    emoji: "🎬",
    title: "Watch AI do your job in 8 seconds.",
    body: "Then steal the move. Today’s drop is live.",
  },
  {
    emoji: "🔥",
    title: "Don’t let the streak go stale.",
    body: "One rep keeps it warm. A few minutes, that’s the whole ask.",
  },
];

const STREAK_LINES = [
  {
    emoji: "🔥",
    title: "{streak}-day streak, chef’s kiss.",
    body: "Keep it sizzling — today’s drop is one tap away.",
  },
  {
    emoji: "🏆",
    title: "Day {streak}. You’re basically fluent.",
    body: "One more rep and today’s capability is yours.",
  },
  {
    emoji: "⏳",
    title: "Your {streak}-day streak is getting cold.",
    body: "Reheat it in minutes. Tap before midnight.",
  },
];

const ALMOST_LINES = [
  {
    emoji: "🎓",
    title: "One capability from the certificate.",
    body: "The AI-Fluency certificate is basically printing. Finish it →",
  },
  {
    emoji: "🥇",
    title: "So close you can taste it.",
    body: "One last drop and you’re certified AI-fluent. Finish strong.",
  },
];

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function fill(line, role, streak) {
  const sub = (s) => s.replace("{role}", role).replace("{streak}", String(streak));
  return { emoji: line.emoji, title: sub(line.title), body: sub(line.body) };
}

// Choose the most relevant notification for the current state. Deterministic-ish
// per day so a re-render doesn't flicker to a different line mid-session.
export function nextNotification(state) {
  const role = jobLabel(state.job);
  const streak = state.streak || 0;
  const unlocked = (state.capabilities || []).length;
  const seed = new Date().getDate() + streak + unlocked;

  let line;
  if (unlocked >= 4) {
    line = pick(ALMOST_LINES, seed); // one capability from the certificate
  } else if (streak >= 2) {
    line = pick(STREAK_LINES, seed);
  } else {
    line = pick(IDLE_LINES, seed);
  }
  return fill(line, role, streak);
}

// Whether to show the in-app notification banner right now. Suppressed once the
// user has already engaged today (they don't need a nudge mid-session).
export function shouldShowNudge(state) {
  return !!state && !!state.onboarded && (state.capabilities || []).length < 5;
}

// ─────────────────────────────────────────────────────────────────────────────
// Web Push upgrade path (stub). Wire these to a service worker + push backend to
// turn the in-app nudge into a real OS notification. Left intentionally inert so
// the app never asks for permission it can't honor in the current no-backend MVP.
// ─────────────────────────────────────────────────────────────────────────────
export async function requestPushPermission() {
  // TODO(web-push): register /sw.js, call Notification.requestPermission(),
  // then pushManager.subscribe({ applicationServerKey }). Requires a backend to
  // store the subscription and send. iOS Safari needs an installed PWA.
  return { supported: false, reason: "web-push backend not wired in MVP" };
}

export function scheduleWebPush(/* notification, whenISO */) {
  // TODO(web-push): POST the subscription + payload + send-time to the push
  // service. No-op today.
  return false;
}
