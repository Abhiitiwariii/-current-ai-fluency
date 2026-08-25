// analytics.js — lightweight event logger (§17).
// No backend by design for the 5–15 user test: this is the "Google-Sheet logger"
// the spec names, persisted to localStorage. Every event carries user_id,
// session_id, timestamp (§17). computeMetrics() derives the §16/§20 funnel.

const EVENTS_KEY = "current.events.v1";
const IDS_KEY = "current.ids.v1";

// Funnel-ordered schema (§17). Keeping the canonical list here documents intent
// and lets the dashboard render stages even before any event has fired.
export const FUNNEL = [
  "onboarding_started",
  "job_selected",
  "video_started", // v2: YouTube hook played before the awe
  "awe_card_viewed",
  "rep_started",
  "rep_completed", // = activation (§16)
  "account_created", // not wired in MVP (no signup) — stays 0, documented gap
  "streak_incremented",
  "session_completed",
  "notification_tapped", // v2: NOW FIRES via the in-app Swiggy-voice nudge (was 0)
  "certificate_earned", // v2: all five capabilities unlocked
  "day2_return",
];

function isBrowser() {
  return typeof window !== "undefined";
}

function uid() {
  // Short, dependency-free id. Good enough to disambiguate 5–15 users/sessions.
  return Math.random().toString(36).slice(2, 10);
}

// Persistent user_id (survives reloads) + per-load session_id.
let sessionId = uid();

function ids() {
  if (!isBrowser()) return { user_id: "ssr", session_id: sessionId };
  try {
    const raw = window.localStorage.getItem(IDS_KEY);
    let stored = raw ? JSON.parse(raw) : null;
    if (!stored || !stored.user_id) {
      stored = { user_id: uid(), firstSeen: new Date().toISOString() };
      window.localStorage.setItem(IDS_KEY, JSON.stringify(stored));
    }
    return { user_id: stored.user_id, session_id: sessionId, firstSeen: stored.firstSeen };
  } catch {
    return { user_id: "anon", session_id: sessionId };
  }
}

// v3.2: expose the persistent user_id so other features (e.g. feedback rows)
// can tag records with the same anonymous id used across the event log.
export function getUserId() {
  return ids().user_id;
}

function readEvents() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeEvents(list) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(list));
  } catch {
    /* storage blocked — logging is best-effort, never breaks the app */
  }
}

// track(event, props?) — appends one funnel event. Idempotency is intentionally
// NOT enforced (repeat opens are signal); dedupe happens in computeMetrics.
export function track(event, props = {}) {
  if (!isBrowser()) return;
  const { user_id, session_id } = ids();
  const row = {
    event,
    user_id,
    session_id,
    timestamp: new Date().toISOString(),
    ...props,
  };
  const list = readEvents();
  list.push(row);
  writeEvents(list);
  return row;
}

export function getEvents() {
  return readEvents();
}

export function resetEvents() {
  writeEvents([]);
  if (isBrowser()) {
    try {
      window.localStorage.removeItem(IDS_KEY);
    } catch {
      /* ignore */
    }
  }
  sessionId = uid();
}

// Detect a return-on-a-later-calendar-day and log day2_return once per day.
// Called on app load. Uses event history (session-agnostic) so it survives the
// per-load session_id reset.
export function markVisit() {
  if (!isBrowser()) return;
  const today = new Date().toISOString().slice(0, 10);
  const events = readEvents();
  const days = new Set(events.map((e) => e.timestamp.slice(0, 10)));
  const alreadyLoggedToday = events.some(
    (e) => e.event === "day2_return" && e.timestamp.slice(0, 10) === today
  );
  // Only a genuine return: there is prior activity on an earlier day.
  const hasEarlierDay = [...days].some((d) => d < today);
  if (hasEarlierDay && !alreadyLoggedToday) {
    track("day2_return", { day: today });
  }
}

// --- Metrics (§16, §20) ---------------------------------------------------
// Derives the graded funnel from the raw event log. Counts are by UNIQUE user
// where that's the meaningful denominator (activation, retention).

function usersWith(events, name) {
  return new Set(events.filter((e) => e.event === name).map((e) => e.user_id));
}

export function computeMetrics() {
  const events = readEvents();

  const onboarders = usersWith(events, "onboarding_started");
  const repStarters = usersWith(events, "rep_started");
  const activators = usersWith(events, "rep_completed"); // activation (§16)
  const returners = usersWith(events, "day2_return");

  const denom = onboarders.size || 1;

  // time-to-first-aha: per user, ms from onboarding_started → first rep_completed.
  const firstBy = (name) => {
    const map = {};
    for (const e of events) {
      if (e.event !== name) continue;
      const t = new Date(e.timestamp).getTime();
      if (map[e.user_id] == null || t < map[e.user_id]) map[e.user_id] = t;
    }
    return map;
  };
  const startTimes = firstBy("onboarding_started");
  const ahaTimes = firstBy("rep_completed");
  const ttfa = [];
  for (const u of Object.keys(ahaTimes)) {
    if (startTimes[u] != null) ttfa.push((ahaTimes[u] - startTimes[u]) / 1000);
  }
  const medianTtfa = median(ttfa);

  // rep-abandon rate: abandons / (abandons + completes), event-level.
  const abandons = events.filter((e) => e.event === "rep_abandoned").length;
  const completes = events.filter((e) => e.event === "rep_completed").length;
  const abandonRate = abandons + completes ? abandons / (abandons + completes) : 0;

  // North star proxy: weekly reps completed per active user (§16). In a short
  // window we report total reps completed / active users.
  const activeUsers = activators.size || 1;
  const repsPerActive = completes / activeUsers;

  return {
    totalEvents: events.length,
    uniqueUsers: usersWith(events, "onboarding_started").size ||
      new Set(events.map((e) => e.user_id)).size,
    activationRate: activators.size / denom, // % first awe→rep loop (§16)
    d1Return: returners.size / denom, // retention proxy (§20)
    repStartRate: repStarters.size / denom,
    abandonRate,
    medianTtfaSec: medianTtfa,
    repsPerActiveUser: repsPerActive,
    funnel: FUNNEL.map((name) => ({ name, users: usersWith(events, name).size })),
  };
}

function median(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
