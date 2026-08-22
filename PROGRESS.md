# Build Progress — Case Study 5 · "Current"

_Last saved: 2026-08-22 (evening) · pick up in a fresh session anytime._

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
