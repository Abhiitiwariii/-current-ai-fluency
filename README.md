# Current — an AI-fluency habit for mid-career professionals

> Case Study 5 · working MVP prototype
> Built from the locked concept in [`research/outputs/product-spec.md`](research/outputs/product-spec.md).

**Current** is a daily, awe-driven habit that keeps time-poor, non-technical
mid-career professionals genuinely fluent at *using* AI in their real work.
It borrows the *motivational psychology* of best-in-class habit apps but owns an
original, premium experience — **not** a Duolingo lookalike.

---

## The problem (and the wedge)

Mid-career professionals in marketing, ops, HR, sales, and finance feel real
obsolescence anxiety: AI is changing their jobs weekly and no course keeps up.
They have budget and motivation but almost no time. **Current** sells
*anxiety relief as a pull, not a fear* — 90 seconds a day to stay fluent.

## The core bet

Teach **practical fluency** (they can *use* AI to do their job better), framed as
**staying current** — which is endless, and so earns a daily habit and a
subscription where a finite "learn AI" course would not.

## The loop this prototype demonstrates

1. **Minute-one onboarding** — one sharp question ("what do you do?") tailors the
   very first demo. Value before signup.
2. **Awe opens** — a cinematic "watch AI do *your* job's task" moment (~30%).
3. **Action closes** — that same awe converts into a hands-on **guided-production
   rep**: you assemble the strong prompt yourself (~70%). No orphan awe.
4. **Forgiving coaching** — wrong answers get a warm tweak, never punishment.
   No hearts, no lives, no public leaderboard.
5. **Completion ritual** — "you're current for today, streak +1" and a **capability
   unlocked** (progression shown as *what you can now do*, never XP).
6. **Forgiving streak** — miss a day and grace keeps your streak once. Life happens.
7. **🎧 Commute / audio mode (§13.1)** — a hands-free ~70-sec spoken drop (browser
   speech synthesis). Listening is a **micro-win** that keeps your streak (§13.2),
   and the hands-on rep **queues for when you're stationary** rather than nagging
   you to tap while moving. Also serves as the spec's low-bandwidth "tired mode."

## Design directives (from the spec)

- **Borrow psychology, own experience.** Loss-aversion streaks, variable reward,
  completion rituals — as *principles*, never as a visual clone.
- **No toy aesthetic.** Reference class is premium productivity/finance software:
  calm editorial frame, refined type, generous whitespace — with **cinematic,
  electric "awe" moments**. Warmth lives in the copy, not a cartoon skin.

---

## Run it

```bash
cd "Case Study 5"
npm install
npm run dev
```

Open http://localhost:3000

> Fonts (Fraunces + Inter) are fetched via `next/font/google` at first build,
> so the initial `npm run dev`/`build` needs internet access. They degrade to
> Georgia/system fonts if unavailable.

### Try the flow
1. Pick a role → see the tailored "whoa" → **Start my first drop**.
2. Work the drop: warm-up → **build the prompt** → **order the workflow**.
3. Land on the completion screen (streak +1, capability unlocked).
4. Back on **Home**: streak, capability ladder, "fresh this week" teaser.
5. **Reload** — progress persists (localStorage). Use **Reset demo** to start over.

## Tech

- **Next.js 14** (App Router) + **React 18** + **Tailwind CSS**
- Client-side state machine; **localStorage** persistence (`lib/store.js`)
- Deterministic, forgiving grading (`lib/grading.js`) — simulates spec §9 with no LLM
- All content in `lib/content.js`

```
app/            layout, global styles, single-page controller (page.js)
components/      Onboarding, Home, DropSession + AweCard, CoachFooter, DropComplete,
                 CapabilityLadder, ProgressBar, reps/ (SpotCheck, PromptBuild, Assemble)
lib/            content.js · grading.js · store.js
research/        the discovery work + locked product spec
```

## Deliberately out of scope (prototype)

Called out so the MVP boundary is explicit — these are the spec's "next steps",
not oversights:

- Real accounts / backend (uses localStorage)
- **Real LLM grading** — reps are shaped so grading is deterministic (spec §9)
- **B2B cohort mode** — the real margin, per spec §12
- **Offline pre-load & WhatsApp delivery** (spec §13.4/§13.7)
- Live content pipeline for perpetual fresh "awe" (spec §8)

> ✅ **Now built** (was deferred): **audio commute mode** with micro-win + queued
> rep (spec §13.1–13.2, §13.6). See `components/AudioDrop.js`.

## Where the psychology maps in the code

| Spec decision | Where |
|---|---|
| Awe opens / action closes (30/70) | `components/DropSession.js`, `AweCard.js` |
| Guided-production rep | `components/reps/PromptBuild.js` |
| Coach, never punish; no hearts | `components/CoachFooter.js`, `lib/grading.js` |
| Forgiving streak (grace) | `lib/store.js` → `bumpStreak()` |
| Capabilities, not XP | `components/CapabilityLadder.js`, `lib/content.js` |
| Job-tailored minute-one | `components/Onboarding.js`, `getDrop()` |
| Calm frame, electric moments | `app/globals.css` (`.aurora-field`), `tailwind.config.js` |
| Audio commute mode, micro-win, queued rep | `components/AudioDrop.js`, `lib/store.js` (`completeAudioMicroWin`) |
