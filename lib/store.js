// store.js — localStorage persistence with a tiny subscribe API.
// Pattern mirrors the prior profileStore approach (get/set/subscribe).
// Spec alignment: forgiving streak (§5) — a missed day is grace-forgiven once,
// never a guilt reset on the first slip.

const KEY = "current.state.v1";

const DEFAULT_STATE = {
  onboarded: false,
  job: null,
  streak: 0,
  lastActiveDate: null, // "YYYY-MM-DD"
  graceUsed: false, // one free forgiveness before a reset
  completedDrops: [], // drop ids fully completed (awe + hands-on rep)
  capabilities: [], // unlocked capability ids
  queuedDropId: null, // §13.1: rep queued after an audio micro-win, awaiting a stationary moment
  account: null, // §10: created AFTER the aha — { name, email, createdAt }. Local-only (no backend).
};

const listeners = new Set();

function isBrowser() {
  return typeof window !== "undefined";
}

export function getState() {
  if (!isBrowser()) return { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function write(next) {
  if (isBrowser()) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage may be blocked; keep the app working in-memory */
    }
  }
  listeners.forEach((fn) => fn(next));
  return next;
}

export function setState(patch) {
  return write({ ...getState(), ...patch });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetState() {
  return write({ ...DEFAULT_STATE });
}

// --- date helpers (local time) ---
function todayStr(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
function daysBetween(a, b) {
  const ms = new Date(b + "T00:00:00") - new Date(a + "T00:00:00");
  return Math.round(ms / 86400000);
}

// Forgiving streak update (§5). Returns the new streak + whether grace kicked in.
export function bumpStreak(state) {
  const today = todayStr();
  const last = state.lastActiveDate;

  if (!last) return { streak: 1, lastActiveDate: today, graceUsed: false, forgiven: false };
  const gap = daysBetween(last, today);

  if (gap <= 0) {
    // already active today — streak unchanged
    return { streak: state.streak || 1, lastActiveDate: today, graceUsed: state.graceUsed, forgiven: false };
  }
  if (gap === 1) {
    return { streak: (state.streak || 0) + 1, lastActiveDate: today, graceUsed: state.graceUsed, forgiven: false };
  }
  // Missed one or more days.
  if (gap === 2 && !state.graceUsed) {
    // one grace forgiveness: treat like a continued streak
    return { streak: (state.streak || 0) + 1, lastActiveDate: today, graceUsed: true, forgiven: true };
  }
  // reset — but always land on a positive, encouraging 1 (never 0/guilt)
  return { streak: 1, lastActiveDate: today, graceUsed: false, forgiven: false };
}

export function completeOnboarding(job) {
  return setState({ onboarded: true, job });
}

// Marks a drop complete: unlocks its capability + advances the forgiving streak.
// bumpStreak is safe to call again the same day (gap<=0 leaves the streak
// unchanged), so an audio micro-win followed by the queued rep never double-counts.
export function completeDrop(dropId, capabilityId) {
  const s = getState();
  const streakInfo = bumpStreak(s);
  const completedDrops = s.completedDrops.includes(dropId)
    ? s.completedDrops
    : [...s.completedDrops, dropId];
  const capabilities =
    capabilityId && !s.capabilities.includes(capabilityId)
      ? [...s.capabilities, capabilityId]
      : s.capabilities;

  setState({
    completedDrops,
    capabilities,
    streak: streakInfo.streak,
    lastActiveDate: streakInfo.lastActiveDate,
    graceUsed: streakInfo.graceUsed,
    // finishing the hands-on rep clears any queued rep for this drop
    queuedDropId: s.queuedDropId === dropId ? null : s.queuedDropId,
  });
  return {
    streak: streakInfo.streak,
    forgiven: streakInfo.forgiven,
    newCapability: capabilities.length > s.capabilities.length,
  };
}

// §13.1 + §13.2: a hands/eyes-free audio listen is a complete daily micro-win —
// streak counts now; the hands-on rep is QUEUED for the next stationary moment.
// Capability is NOT unlocked yet — that's earned by doing the rep.
export function completeAudioMicroWin(dropId) {
  const s = getState();
  // If they already fully completed this drop, listening is just a replay.
  if (s.completedDrops.includes(dropId)) {
    return { streak: s.streak, forgiven: false, queued: false };
  }
  const streakInfo = bumpStreak(s);
  setState({
    streak: streakInfo.streak,
    lastActiveDate: streakInfo.lastActiveDate,
    graceUsed: streakInfo.graceUsed,
    queuedDropId: dropId,
  });
  return { streak: streakInfo.streak, forgiven: streakInfo.forgiven, queued: true };
}

export function clearQueue() {
  return setState({ queuedDropId: null });
}

// §10: account creation happens AFTER the aha (value before signup). Local-only
// by design — no backend/auth in the MVP; this books the "converted after aha"
// funnel step (§16/§17). Idempotent: a second call won't overwrite the original.
export function createAccount({ name, email }) {
  const s = getState();
  if (s.account) return s.account;
  const account = {
    name: (name || "").trim() || "there",
    email: (email || "").trim() || null,
    createdAt: new Date().toISOString(),
  };
  setState({ account });
  return account;
}
