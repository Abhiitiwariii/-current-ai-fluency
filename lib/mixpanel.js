// mixpanel.js — optional, gated analytics mirror.
//
// The app's funnel is logged to localStorage (see analytics.js), which only ever
// shows the CURRENT browser. To see drop-off across ALL users, every event that
// flows through analytics.track() is also mirrored here to Mixpanel.
//
// Gated exactly like supabase.js: when NEXT_PUBLIC_MIXPANEL_TOKEN is absent
// (the default), every function is a no-op and nothing here throws or blocks the
// UI. The localStorage log stays the floor, so ad-blockers that drop Mixpanel's
// API never lose the local copy.
//
// The project token is a PUBLIC, write-only key (like the Supabase anon key) —
// safe to embed in the client bundle. Set it in .env.local and in Vercel:
//   NEXT_PUBLIC_MIXPANEL_TOKEN

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let mp = null; // the mixpanel-browser instance, once loaded
let initTried = false; // ensure() only ever runs its async body once
const queue = []; // calls made before the async import resolves

export function isMixpanelConfigured() {
  return !!TOKEN;
}

// Lazy, browser-only, load-once init. mixpanel-browser is imported dynamically so
// it never runs during SSR / the static build (it touches window at init time).
async function ensure() {
  if (initTried) return;
  initTried = true;
  if (typeof window === "undefined" || !TOKEN) return;
  try {
    const mod = await import("mixpanel-browser");
    const mixpanel = mod.default || mod;
    mixpanel.init(TOKEN, {
      persistence: "localStorage",
      track_pageview: false, // we send explicit funnel events, not auto pageviews
    });
    mp = mixpanel;
    flush();
  } catch {
    /* import/init failed (offline, blocked) — stay a no-op, never throw */
  }
}

function flush() {
  if (!mp) return;
  while (queue.length) {
    const [type, a, b] = queue.shift();
    try {
      if (type === "track") mp.track(a, b);
      else if (type === "identify") mp.identify(a);
      else if (type === "register") mp.register(a);
      else if (type === "reset") mp.reset();
    } catch {
      /* best-effort */
    }
  }
}

// Each public call either runs immediately (once mp is ready) or queues until it
// is, then kicks off ensure(). All are cheap no-ops when unconfigured.
function call(type, a, b) {
  if (!TOKEN || typeof window === "undefined") return;
  if (mp) {
    try {
      if (type === "track") mp.track(a, b);
      else if (type === "identify") mp.identify(a);
      else if (type === "register") mp.register(a);
      else if (type === "reset") mp.reset();
    } catch {
      /* best-effort */
    }
  } else {
    queue.push([type, a, b]);
    ensure();
  }
}

export function mpTrack(event, props) {
  call("track", event, props);
}

// Align Mixpanel's identity to our persistent anon user_id so its funnels group
// users the same way the local metrics do.
export function mpIdentify(userId) {
  call("identify", userId);
}

// Super-properties (e.g. the chosen persona) — attached to every later event so
// funnels can be broken down by them.
export function mpRegister(props) {
  call("register", props);
}

// Give a fresh Mixpanel identity when the demo's local event log is reset.
export function mpReset() {
  call("reset");
}
