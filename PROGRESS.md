# Build Progress — Case Study 5 · "Current"

_Last saved: 2026-08-26 · pick up in a fresh session anytime._

## 🚀 LIVE (2026-08-26) — deployed & fully configured
**https://current-ai-fluency.vercel.app** — latest build deployed (auto-deploys on push to `main`).
- **Supabase wired in production** (env vars present via the Vercel–Supabase integration); Google
  login + feedback/email capture active. Auth redirect URL added in Supabase for the Vercel origin.
- **Own 30s persona hook videos** on the project's YouTube channel (embedding fixed by passing the
  page `origin` to the standard `youtube.com/embed` — nocookie/origin-less URLs threw Error 153).
- **Email capture:** "Save my progress" is persistent on Home (below the streak) + on the completion
  screen. Local save now **requires a valid email**; Google captures a verified email automatically.
  Rows land in `auth.users` (Google) and the `signups` table (source google/account/feedback);
  comments in `feedback`. Anon key is insert-only (RLS).
- Feedback surfaced on Home (enlarged link) + completion screen.

---

## ✅ DONE (2026-08-25 · v3.2) — 1-min videos · Google login · Feedback · Supabase (ready-to-connect)
Grilled → locked → built. `npm run build` exits 0 (4 routes). Bundle 28.2→**181 kB First Load**
(the `@supabase/supabase-js` client loads via `store.js`). **Local-only + not smoke-tested on
screen yet.** Ran `npm install` (added `@supabase/supabase-js ^2.45.4`).

1. **✅ 1-minute video hooks.** `VIDEO_BY_JOB` in `lib/content.js`: every clip window is now
   `start:15 → end:75` (was 105). Scrub-past-`end` caveat still applies (YT embed limit). Comments
   updated (`content.js`, `VideoHook.js`).

2. **✅ Supabase — ready-to-connect (no keys required to run).** New `lib/supabase.js`: builds the
   client **only** when `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` are both set,
   else exports `null`. `isSupabaseConfigured()` + best-effort `insertRow(table,row)` (no-op /
   swallow on error, never blocks UI). Schema committed at
   `supabase/migrations/0001_feedback_signups.sql` (`feedback` + `signups`, anon **insert-only**
   RLS). `.env.example` + `SUPABASE_SETUP.md` document the manual steps (create project, run SQL,
   enable Google provider, add redirect URLs, set env in Vercel).

3. **✅ Google login — added alongside the local save (§10 AccountPrompt).** When Supabase is
   configured, `AccountPrompt` shows **"Continue with Google"** →
   `signInWithOAuth({ redirectTo: window.location.origin })`. `app/page.js` hydrates the session on
   mount (incl. the OAuth return) → `createAccountFromGoogle(user)` fills the existing `account`
   field (`provider:"google"`), fires `account_created {method:"google"}`. `signOut()` added to
   `store.js`; a conditional **"Sign out"** link shows in the Home footer for Google accounts.
   Local name/email path unchanged and still the graceful floor when keys are absent. Typed emails
   on the local path now also best-effort insert to `signups`.

4. **✅ Feedback button.** New `components/FeedbackForm.js` — "What do you like?" / "What would you
   change?" + optional email, opened from a **Home-footer "Feedback"** link (overlay). Dual-write:
   always `track('feedback_submitted', …)` locally (so it rides the existing Metrics JSON/CSV
   export) **and** best-effort `insertRow('feedback', …)` (+ `signups` if email given). New events:
   `feedback_opened/submitted/dismissed`, `google_signin_started` (none added to `FUNNEL`).
   Added `getUserId()` export to `lib/analytics.js` so feedback rows carry the same anon id.

**Env note:** `npm audit` shows 2 high-severity advisories in **`next` + `postcss`** (pre-existing,
NOT from Supabase; mostly self-hosted/SSR DoS classes that barely apply to a static Vercel export).
Only fix is a breaking `next@16` bump (`audit fix --force`) — deliberately NOT applied.

---

## ✅ DONE (2026-08-25 · v3.1) — all four queued changes built, `npm run build` exits 0 (4 routes)
The grilled-and-locked block below is now **built and build-verified**. Bundle grew 24.4→28.2 kB
(rep content + PersonaArt). **Not yet smoke-tested on screen / redeployed** — still local only.

1. **✅ Onboarding: streaming-demo screen cut.** `Onboarding.js` rewritten — flow is now
   **persona picker → VideoHook → `onStart(job)` straight into the first drop** (the `phase === "demo"`
   awe-demo beat is gone; removed the `AweDemo`/`KineticHeadline`/`getDrop`/`TEASER_TIER` deps).
   Tier 0 (Foundations) is still the first drop; `DropSession` still skips the video on tier 0, so
   no double-clip. The flashy streaming demo still lives in the Prompting drop (tier 1).

2. **✅ "90 seconds" product claim dropped from all app copy.** Swept `lib/content.js` (marketing
   caption + achievement `hook`), `Certificate.js` (×2 + the canvas footer), `Home.js` (tier label
   + teaser line), `Onboarding.js` (intro headline; the "· no account" line was in the deleted
   demo beat), `ShareCard.js` (×2), `VideoHook.js` (caption fallback), `lib/notify.js` (6 lines).
   Replaced with "a few minutes a day" / "in minutes" / removed. The only remaining "90s" are two
   **internal code comments** describing the ~90-second video clip window (accurate, not app copy).
   Internal docs (`ACQUISITION.md`/`README.md`/`research/*`) untouched.

3. **✅ 5 reps per drop, persona-specific, kinds varied.** Every tier is now 5 reps (was
   0=2,1=3,2=2,3=2,4=2). No new grading — reused `spot-check`/`prompt-build`/`assemble`; added
   per-job content maps in `lib/content.js` (`CLAIM_BY_JOB`, `WEAK_ASK_BY_JOB`, `BRIEF2_BY_JOB`,
   `EVAL2_BY_JOB`, `WORKFLOW2_BY_JOB`) + templated reps built from the `DOMAIN` nouns. Kind order
   per tier avoids adjacent repeats (no 5-MCQs-in-a-row). ProgressBar counts are dynamic, so the
   longer drops just show more steps automatically.

4. **✅ Per-persona PersonaArt on the video poster + the quiet awe cards.** New
   `components/PersonaArt.js` — code-drawn, theme-aware (obsidian+amber) SVG, one distinct
   editorial scene per persona (shared "AI orb → your artifact" metaphor). **SVG fallback shipped**
   as agreed (env still has no image-gen keys). `job` is now carried on the drop object (single
   source); wired into `VideoHook` (poster base behind the play button, YT thumbnail blends over
   it via `mix-blend-luminosity`) and `AweCard` (illustration banner on the text-only tiers 0/2/3/4,
   which were the "blank" screens). Swap in real assets later without touching call sites.

**Next:** smoke-test on screen (dev server), then commit + push to `main` to redeploy (Vercel
auto-deploys). This is still the one blocker to going live.

---

## 🆕 v3 session (2026-08-25) — real videos + WhatsApp vector; MORE FEATURES QUEUED

### ✅ Done + build-verified this session (`npm run build` exits 0, 4 routes)

**A. Real per-persona YouTube videos + 90s clips + video-first onboarding**
- Swapped the invalid placeholder id out for **5 real, public, embeddable TED/TEDx talks** (oEmbed-verified + live-smoke-tested by user). In `lib/content.js` `VIDEO_BY_JOB`:
  - marketing `3MwMII8n1qM` (Jessica Apotheker, TED) · ops `reUZRyXxUs4` (Andrew Ng, TED) ·
    hr `ljmsrGdlo9A` (Todd Carlisle, TEDx) · sales `5NlmdoHzmrw` (Hans-Christian Boos, TEDx) ·
    finance `WHxZr-X-hVI` (Matthew Dixon, TEDx). *(sales = softest topical fit; top swap candidate.)*
- **~90s clip window:** each entry has `start:15 / end:105` (skips TED intro/applause). `VideoHook.js`
  embed URL now appends `&start=&end=`. NOTE: `end` caps default playback, a user can still scrub past it
  (embed limitation — fine short of self-hosting).
- **Video is now the FIRST screen after persona click:** `Onboarding.js` is a two-beat reveal —
  pick persona → **VideoHook** (beat 1) → awe demo + "Start my first drop" (beat 2). To avoid the same
  clip playing twice back-to-back, `DropSession.js` **suppresses the video on tier 0** (`tierIndex !== 0`);
  tiers 1–4 still show their hook. (tier 0 only ever runs right after onboarding, so nothing else loses it.)

**B. Feature #1 — WhatsApp delivery/share (§13.7)** — first of the "other spec features" pass
- `lib/whatsapp.js` — `wa.me` share vector + `dropMessage(state)` in the Swiggy-voice (reuses `notify.js`).
  Real *scheduled* WhatsApp Business-API delivery left **stubbed** (`subscribeWhatsAppDelivery`), like Web Push.
- `components/WhatsAppNudge.js` on **Home** ("📲 Get your drop on WhatsApp" → opens WhatsApp pre-filled
  with today's drop + the single shared link).
- **ShareCard** — added "Share on WhatsApp" to the §18 growth loop.
- Tracks `whatsapp_shared` (not added to FUNNEL, like `achievement_shared`).

### ⏭ QUEUED — remaining "other spec features" to build next session (client-side, no backend)
Ordered by risk. **Do these on a fresh/compacted context — this session hit ~91%.**
1. **Offline / low-data drop (§13.4)** — installable PWA (manifest + service worker) caching today's drop.
   *Highest risk / most context-hungry — SW cache gremlins the day before submission. Do first on clean context.*
2. **Energy-adaptive "Sharp / Tired" mode chooser (§13.6)** — explicit choice at drop start; low risk,
   extends the existing audio/passive path (`AudioDrop.js` already covers the tired low-bandwidth path).
- Not planned (need backend / previously cut): real LLM grading, real Web Push, WhatsApp *scheduled* push,
  cohort mode (user dropped it earlier), auth/backend, live content pipeline, paywall.

### ⚠️ NOT YET REDEPLOYED — the one blocker to going live
All of the above is **local only**. `git` has uncommitted changes; **Vercel still serves the pre-video build**.
To ship: commit + push to `main` (auto-deploys). Live link: https://current-ai-fluency.vercel.app/
Dev server was run on **:3001** during this session (3000 was busy) and has since been **stopped**.

---


## 🆕 v2 feature pass (2026-08-24) — all four asks integrated, build clean
Grilled → locked → built. `npm run build` exits 0 (4 routes); verified onboarding,
notification banner, and tier progression on screen. **Not yet redeployed to Vercel.**

1. **🎬 YouTube video hook (in-screen, per persona)** — `components/VideoHook.js`
   plays as the motivating hook BEFORE the simulated awe demo, then awe → reps.
   Poster-first (loads the YT thumbnail; iframe only after tap), youtube-nocookie,
   and an always-available "Skip/Continue" + "Open on YouTube ↗" so a blocked/dead
   embed never dead-ends the flow. New phase `video` in `DropSession`.
   - **⚠ ACTION NEEDED:** `VIDEO_BY_JOB` in `lib/content.js` uses ONE placeholder id
     (`_ZvnjBdN4hs`, currently invalid → gray poster). Paste 5 real per-persona
     links and set each `yt` to the 11-char id — one-line swap each. Everything
     else keeps working meanwhile.
2. **🧩 Per-persona questions (all reps)** — previously only awe + prompt-build were
   tailored; now every rep in every tier is persona-flavored (marketing/ops/hr/
   sales/finance) via per-job content maps in `lib/content.js`. Same skill ladder,
   same forgiving grading — no new rep components.
3. **🎓 Final AI-Fluency certificate** — the single drop is now a **5-tier track**
   (`getDrop(job, tierIndex)`), one capability per completed drop, advancing
   **in-session** (binge-able for the demo; streak still bumps once/day via the
   unchanged forgiving `bumpStreak`). After all 5 → `components/Certificate.js`:
   named + dated editorial cert, **PNG download via canvas** (no external lib) +
   share. Surfaced on `DropComplete` and `Home`. Tiers: Foundations · Prompting
   (flagship, keeps the rich streaming demo) · Evaluating · Workflows · Building.
4. **🔔 Swiggy-voice notifications** — `lib/notify.js` copy engine (persona- +
   streak- + progress-aware, witty) rendered as an in-app OS-style alert
   (`components/NotificationBanner.js`) on Home. Tapping it **finally fires
   `notification_tapped`** (was a documented intentional-0) and routes into the
   drop. Real Web Push (`requestPushPermission`/`scheduleWebPush`) is **stubbed**
   behind it — inert until a SW + push backend is wired.

**Analytics:** `FUNNEL` gained `video_started`, `certificate_earned`; `notification_tapped`
now fires. Also logged: `video_skipped/opened_external`, `notification_shown/dismissed`,
`certificate_downloaded/shared`.

**Product-model shift (flag for grading):** the "one drop/day" model is now a
binge-able 5-lesson track so the certificate is reachable in one sitting. Daily
cadence still rewarded by the streak. Video + notifications partly re-open surfaces
§15 had cut to vision-not-v1 — intentional for v2.

**Files:** new — `components/VideoHook.js`, `Certificate.js`, `NotificationBanner.js`,
`lib/notify.js`. Changed — `lib/content.js` (tracks/personas/video/cert data),
`lib/store.js` (`completeDrop` → `programComplete`), `lib/analytics.js` (funnel),
`app/page.js` (tier plumbing + certificate view), `components/DropSession.js`
(video phase + tier), `Home.js`, `DropComplete.js`, `Onboarding.js` (teaser = tier 1),
`AudioDrop.js` (tier).

**Next session (build):** redeploy to Vercel (auto-deploys on push to `main`),
swap in the 5 real YouTube ids, then smoke-test the production URL.

---

## 🚀 Deployment (2026-08-23)
- **GitHub:** pushed to **https://github.com/Abhiitiwariii/-current-ai-fluency** (private,
  `main`, 45 files; `.docx` course brief + node_modules/.next excluded).
- **Vercel:** imported from that GitHub repo + deployed by user (auto-deploy on push to
  `main` is now wired). **⚠️ TODO: paste the live `*.vercel.app` URL into `ACQUISITION.md`**
  (the recruit messages need it) and smoke-test the production URL.
- Deploy method note: `npm run build` vs `npm run dev` clobber the same `.next` — never
  build while dev is live (stop dev first).


## What this is
A working MVP prototype of **Current** — a daily, awe-driven AI-fluency habit for
non-technical **mid-career professionals**. Built to the locked concept in
[`research/outputs/product-spec.md`](research/outputs/product-spec.md).
**Premium/editorial aesthetic — deliberately NOT a Duolingo clone.**

Stack: **Next.js 14 (App Router) + React 18 + Tailwind**, state in **localStorage**.

## ✅ Done (working + verified)
- **Onboarding (minute-one)** — one sharp "what's your job?" → tailored first demo.
- **Live awe demo** — simulates AI generating: input → "thinking" → output **streams
  out chunk by chunk**, autoplays + replay. Tailored per role. (`components/AweDemo.js`)
- **Core loop** — awe → guided-production rep (build the prompt) → order-the-workflow
  rep → **forgiving coaching** (no hearts/punishment) → completion.
- **Completion + progression** — "you're current, streak +1" + **capability unlocked**
  (capabilities, not XP). Forgiving streak with one grace day.
- **🎧 Commute / audio mode (§13.1)** — hands-free spoken drop (browser speech synth),
  listening = **micro-win** that keeps the streak (§13.2), hands-on rep **queues** for
  when stationary. Also the "tired mode" low-bandwidth path (§13.6).
- **Home** — streak, capability ladder, "fresh this week" teaser, Metrics + Reset links.
- **📊 Event instrumentation + metrics (§16/§17/§20)** — `lib/analytics.js` logs the
  full §17 funnel to localStorage (user_id/session_id/timestamp); `components/Metrics.js`
  derives activation %, D1-return, rep-abandon, time-to-first-aha, reps/active-user, the
  ordered funnel, and a raw event log with **CSV/JSON export** for the §19 feedback sheet.
  Reachable from Home → "Metrics".
- **🔗 Shareable achievement card (§18)** — completion produces a status-flattering
  card (`components/ShareCard.js`) showing the *capability just unlocked* (never a streak
  or a miss); native Web Share + copy-link fallback; single app-root link; tracks
  `achievement_shared`. Shown on `DropComplete` only when a new capability was earned.
- **👤 Account creation after the aha (§10)** — skippable "save your {streak}-day streak"
  (name + optional email) on completion (`components/AccountPrompt.js`), local-only, fires
  `account_created` / `account_skipped`. Closes the funnel's post-aha conversion step
  (§16 guardrail) — only `notification_tapped` remains an intentional 0 now.
- Persists across reloads. `npm run build` compiles clean (4 routes); dev server 200.
- Patched `next` security advisory → **14.2.35**.
- **🎨 §21 "Editorial Obsidian" design system (phase 1 — the re-skin)** — spec §21 was
  added to product-spec.md; implemented the foundation: dark obsidian palette + **amber**
  accent (replaced light-paper + purple/aurora), Fraunces/Inter/**JetBrains Mono** fonts,
  the **Bloom** keyframes (§21.7), amber glow shadows, 3% **film-grain** overlay, dark card
  surfaces across all 15 components. `tailwind.config.js` + `globals.css` + `layout.js`
  rewritten; component color classes swept light→dark. Build clean; verified on screen
  (awe card, reps, commute mode all obsidian+amber+serif).
  - **Phase 2 DONE (§21.2/21.4/21.7/21.8):** `.bloom` reveal on the awe artifact +
    **amber-bloom** completion check; **streak digit stamps** in amber (§21.4); prompt
    sandbox now in **JetBrains Mono** with an amber caret + amber-soft chips (§21.2 — "real
    AI work feels real"); **seeded daily cover** tint (`lib/cover.js`, 5 obsidian tints)
    glows the awe/share/home covers, amber stays the constant UI accent (§21.8). Also fixed
    all leftover light-purple selection/feedback hexes (`#F4F2FF`/`#4b3fbf`/green) → amber/
    good tokens. Verified on screen end-to-end.
  - **Phase 2b DONE (§21.8/21.9):** staggered word-by-word **kinetic type** on the hook
    headlines (`components/KineticHeadline.js`, used in AweCard + onboarding awe only —
    "type performs in the hook, informs in the work" §21.9; a11y-safe via aria-label). Daily
    cover now also seeds a **generative texture** (rays/beam/grain) + a **layout** emphasis
    (title/artifact/split scales the headline) behind the awe + home covers (`lib/cover.js`).
  - **§21 design system COMPLETE** — obsidian base, amber accent, Fraunces/Inter/mono, the
    Bloom, film grain, seeded daily cover (tint+texture+layout), kinetic hook type. Build
    exit 0; verified on screen.

## ⚠️ Scope note (course-correction 2026-08-22 eve)
Spec **§15 CUTS** audio/commute, offline, WhatsApp, cohort to *vision-not-v1*. The
audio/commute mode above was built before that cut was reconciled — it's real and works,
but it's **out of the graded MVP slice**. The graded deliverable is **Part II (§15–§20):
Build → Acquire → Activate → Retain → Metrics → Events → Insights → Iterate.** Roadmap
below now tracks Part II, not the India-context vision features.

## ⏭ Next up (graded Part II)
1. **DEPLOY** — the one blocker to a real test. `npx vercel` → prod URL = the single
   shareable link (§15). Clear the event log after deploy so real users start clean.
   Steps + recruit copy + the §19 feedback sheet are all in **`ACQUISITION.md`**.
2. **Recruit ~10 mid-career marketers** using the messages in `ACQUISITION.md`; book
   3–4 live watches (§19).
3. **Run the test + fill the Product & Feedback Sheet**, then write the §20 "what I
   changed after users" insight (explicitly graded).
4. Optional polish: `notification_tapped` has no surface in the MVP — leave documented
   as an intentional 0, or add a relevance-toned nudge stub.

## Still deferred (spec "next steps", not oversights)
Real accounts/backend · real LLM grading (reps are deterministic by design, §9) ·
live content pipeline (§8) · **India-context vision features** (audio*, offline, WhatsApp,
cohort — §13/§12, explicitly cut by §15). *audio already built, kept but out-of-slice.

## How to resume
```powershell
cd "C:\Users\tabhi\Downloads\Case Study 5"
npm run dev          # → http://localhost:3000
```
Then in a fresh Claude session, point it at this folder and this file:
> "Read PROGRESS.md + research/outputs/product-spec.md (§15–§20), then build the
>  shareable achievement card (§18)."

## Map (where things live)
```
app/            layout, globals, single-page controller (page.js: home|drop|drop-reps|audio|metrics)
components/      Onboarding, Home, DropSession, AweCard, AweDemo, CoachFooter,
                 DropComplete, CapabilityLadder, ProgressBar, AudioDrop, Metrics, reps/*
lib/            content.js (content) · grading.js (§9) · store.js (localStorage, streak) ·
                 analytics.js (§17 event log + §16/§20 metrics)
research/       discovery + locked product spec (Part I concept · Part II §15–20 graded)
```
