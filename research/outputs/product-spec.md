# Product Spec — AI-Fluency Habit App (working title TBD)

> Output of a structured grilling session. This is the shared understanding to build from.
> Status: **concept locked, ready for detailed design.** Date: 2026-08-22.

---

## 0. Read this first — two build directives

**Directive A — Motivation/Experience firewall.**
This product borrows *motivational psychology* from best-in-class habit apps, but must NOT copy any of them visually.
- **Borrow (the psychology):** loss-aversion streaks, variable reward, completion rituals, open-loop "chase," escalating relevance nudges. These are described below as *mechanisms and principles*, never as "do what App X does."
- **Own (the experience):** the look, feel, motion, voice, and information architecture must be original and premium.

**Directive B — Do NOT clone any existing learning app's visual design.**
No mascots, no cartoon/toy aesthetic, no green-owl register. The reference for *look and feel* is premium productivity/finance software (calm, editorial, refined), not a kids' game. A build agent that produces a lookalike of any existing learning app has failed this brief. See §7 for the aesthetic direction.

---

## 1. What this is (one paragraph)

A habit-forming mobile app that makes time-poor, non-technical **mid-career professionals** genuinely fluent at *using* AI in their actual work — delivered as a daily, awe-driven micro-experience they open compulsively. Emotional register: **respect, relevance, and awe** — never guilt or punishment. It is, in one line, *the anti-toy AI-fluency app for adults*: the astonishment of AI is the dopamine engine; a disciplined daily completion loop is the habit skeleton.

## 2. Who it's for (the wedge)

- **Primary wedge:** mid-career, **non-technical** professionals across functions — marketing, ops, HR, sales, finance managers. They have budget, sharp status/obsolescence anxiety, and low time. *Not* technical/IT staff — the whole thesis is "I don't understand technology → I can use it," which does not apply to people who already build with it.
- **MVP built + tested slice:** **mid-career marketers** — one concrete persona built end-to-end. The other functions stay as *positioning* for the MVP, not separate built tracks (a solo 4-day build with 5–15 users cannot read signal across three tracks). Expand after the loop is proven on one.
- **Deliberately deferred:** early-career professionals (different motivation, pricing, tone) — expand down later.
- **Emotional truth we sell against:** "don't get left behind." Anxiety relief turned into a *pull*, not a fear.

## 3. The core bet

Teach **practical fluency** (they can *use* AI to do their job better), framed emotionally by **career-relevance / staying-current**. Not vocabulary literacy, not vague future-of-work anxiety content. The learner should finish sessions having *done something real* with AI.

Justification for a *daily* habit (not a one-off course): the field changes weekly. The product is **"stay current," which is endless** — that's what earns a subscription and a streak, where a finite "learn AI" course would not.

## 4. The dopamine engine (why they open it)

**Primary source: novelty / awe.** AI is genuinely astonishing right now in a way language learning never was — and the astonishment refreshes weekly. Lead every daily open with a real "whoa," not a number going up.
**Retention multiplier: social variable reward** (private/opt-in — see §5), added later.

The habit mechanics (streak, etc.) **record and book** the habit; the awe **creates** it. Awe serves the habit loop, not the reverse — the moment awe becomes the whole meal, this is a content app with a churn problem, not a learning app with a moat.

## 5. Habit & retention mechanics (borrowed psychology, original skin)

| Mechanic | Decision | Rationale |
|---|---|---|
| **Primary engine** | **Streak-primary**, daily-goal secondary | Cleanest fit for "stay current"; no critical-mass requirement |
| **Competitive leaderboards** | **OFF at launch** | Empty boards feel dead; stranger-competition reads as juvenile/status-risky to pros |
| **Loss-aversion "lives/hearts"** | **REJECTED** | Punishing wrong answers clashes with the anxiety-relief promise; most-hated mechanic. Wrong answers trigger *coaching*, not punishment |
| **Social layer** | **Private / opt-in only** | Team/cohort mode (invite ~3 coworkers, private streak-together); shareable *achievements* that flatter status, never expose weakness |
| **Notification tone** | **Relevance / FOMO**, never guilt | Carries the actual fresh hook: "the 90-sec thing your competitors learned today" |
| **Variable rewards / currency** | **Light only; no casino loop, no gem economy** | Over-gamifying serious content taxes credibility — a feature for this segment |
| **Streak forgiveness** | **Forgiving** (grace / one-card-saves-it) | Indian life is unpredictable; a rigid streak that breaks on a chaotic day = guilt = churn |

> **Gamification reconciliation (read before building).** The MVP takes the *retention math* of habit games — Candy-Crush-grade compulsion — via **streak + completion ritual + capability-ladder progression + light points only.** It does **NOT** take their skin: **no gems, no hearts, no XP counters, no toy/cartoon aesthetic.** "Borrow the psychology, own the experience" (Directive A) is the firewall. A build that ships a game-toy look for this status-sensitive adult audience has failed the brief. The compulsion comes from the loop being *tight and juicy*, not from a casino economy.

## 6. The session model (awe + habit combined, subordinated correctly)

- **Bounded, not infinite.** The daily unit has a clean end ("you're current for today, streak +1"). The *scarcity* of a finished daily drop is itself a retention lever and protects content supply from binge-burn. TikTok *texture* inside the box, not endless scroll.
- **Awe opens, action closes.** Roughly **30% hook / 70% do.** Reward-first (a passive "whoa"), then convert *that specific awe* into a tiny active rep ("you try it — write the prompt that did that").
- **No orphan awe.** If a piece of content amazes but can't become something the user *does* in the next ~30 seconds, it doesn't ship. The demo that dazzles *is* the lesson that follows. This is the guardrail against edutainment that entertains and churns.

### The atomic "rep"
- **Mostly guided production** — actually write a prompt / edit an AI output / assemble a mini-workflow in a sandbox, judged against a rubric. This is what makes the "I'm becoming AI-fluent" chase *true*.
- **Seasoned with recognition** — fast tap/spot cards as warm-ups to keep pace snappy.
- Real-tool transfer ("go do it in your own ChatGPT") is realism-max but unenforceable — use sparingly, not as the core.

## 7. Experience / aesthetic direction (own this layer)

- **Base register: premium / editorial-calm** — restrained palette, refined typography, generous whitespace, subtle motion. Signals *serious, respects your taste and time*. Reference class: high-end productivity/finance software.
- **Awe moments: cinematic** — dark, immersive, motion-rich for the daily "whoa" cards. **Calm frame, electric moments.**
- **Warmth lives in the copy, not the visual identity** — a warm/coach *tone* in words, never a soft/childish look.
- Voice option: **Hinglish** register for the target segment (regional later) — speaking their language sharpens the hook.

## 8. Content / novelty supply (the make-or-break ops bet)

Perpetual fresh awe that *also* teaches is a content-ops challenge, and it's the core dopamine *supply*, not hygiene.
- **Template the awe, don't hand-craft it.** 5–6 reusable "whoa formats" ("watch AI do X → now you do a shrunk version"), filled by an **LLM-assisted authoring pipeline + one human editor gate.**
- Bias toward **durable wow** (capabilities that stay astonishing) over **ephemeral news**, so yesterday's card still converts a new user tomorrow.
- Honest gate: if you can't staff even one editor for freshness, build the *modest* version, not the ambitious one — know that before raising/building.

## 9. Grading engine (the biggest technical risk)

Judging fuzzy human attempts must be **cheap, fast, and forgiving** — or it inverts unit economics and churns users.
- **Constrain the rep so grading is mostly deterministic.** Design reps with checkable structure (fill-the-key-part, assemble-from-components, must-contain-these-elements) so ~80% is graded by cheap rules.
- **Reserve the LLM judge for the genuinely open last mile** — with a rubric, cached/batched calls, and a **generous bias: when unsure, mark right and coach.** Never punish a plausible answer (a wrong "wrong" destroys the credibility the B2B pitch depends on).
- **Pre-grade at authoring time** — know accepted answers before a card ships.
- Fallback: if grading can't be made cheap+fast+forgiving, walk the rep back toward recognition/guided — better a slightly less "real" rep than a churn engine.

## 10. Onboarding / cold-start (first 60 seconds)

A skeptical, time-poor pro decides in under a minute if this is serious or a toy.
- **Value before signup.** First "whoa → you-did-it" rep within the first ~30 seconds; account creation *after* the aha.
- **No placement test** — infer level from the first 2–3 reps.
- **One sharp up-front question** ("what's your job?") tailors the very first demo to *their* world (a marketer sees an AI-automated campaign brief).
- Target end-state of minute one: they've *personally produced* one impressive thing and think "this respects my time and is actually useful."

## 11. Progression (ascent without a fake ladder)

Two intertwined tracks:
- **Durable capability ladder** — a *real* competency map (foundations → prompting → evaluating output → workflows → building/agents). Legitimate, satisfying ascent; maps to B2B certifications. This is the "I'm becoming AI-fluent" identity chase.
- **Endless stay-current feed** — the daily awe that justifies the subscription and streak forever.
- Progress shown as **capabilities unlocked** ("here's what I can now do"), never abstract XP — XP is the tell that it's a game.
- *Ladder = why I'm proud; feed = why I open it daily.*

## 12. Monetization

- **B2C subscription = front door** (love + virality). Free tier: daily awe + light practice (the habit hook). Paid: full active reps, personalized tracks, "prove it" certifications.
- **B2B (team / L&D) = the real margin.** Cohort mode (§5) is the tell — companies buying whole-team AI upskilling. Consumer edtech churns after novelty; B2B seats don't.
- **Build B2C for love, monetize B2B for survival.** Validate willingness-to-pay *before* building the paywall.

## 13. India-context / attention design (win a 40-second slice of a distracted, moving, tired person)

Unifying principle: **lower the floor** so the habit survives real life, while the awe engine keeps the ceiling exciting.

**CORE (build these in from the start):**
1. **Audio-first "commute mode"** — 60–90 sec audio awe drop consumable while commuting (hands/eyes busy); the active rep **queues for the next safe, stationary moment.** Never requires looking; never nudge a two-wheeler rider to tap.
2. **Micro-win: one card = a complete daily win** — streak counts, dopamine delivered. Full drop available, not demanded. Protects the streak through chaotic days.
3. **Interruption-proof sessions** — auto-save every card; resume on the exact card hours later, penalty-free. No "start over."
4. **Offline / low-data pre-loaded drop** — download today's drop overnight on Wi-Fi; data-light; grade sync deferred until signal returns. Table stakes in India.
5. **Context-timed nudges** — two learned daily windows (commute + evening wind-down), relevance-toned.

**LATER (high value, sequence after core works):**
6. **Energy-adaptive modes** — "tired mode" (pure passive awe, lightly counts) vs "sharp mode" (full active rep). Match the ask to available bandwidth.
7. **WhatsApp-delivered drops** — meet them in the app they already live in; lowers open-friction. *Validate platform/API feasibility first.*
8. **Regional vernacular** audio beyond Hinglish.

> **Reconciliation note for build:** the audio-first (#1) and one-card micro-win (#2) mechanics *flex* the "bounded 8-card session" (§6) and the 30/70 ratio — intentionally, toward resilience. Resolve as: the *default* full drop is bounded 30/70; the *floor* is a single card / audio-only; both count toward the streak.

## 14. Open items / risks to resolve next

- **Grading cost model** — model per-session economics before committing to guided-production depth.
- **Content velocity staffing** — confirm you can fund the freshness pipeline (§8).
- **B2B willingness-to-pay** — validate with real buyers before building the paywall.
- **WhatsApp delivery feasibility** — platform/API constraints (§13.7).
- **Name & brand identity** — TBD; must satisfy Directives A & B.

---

*This spec captures decisions Q1–Q24 plus India-context mechanics from the grilling session. Motivation is borrowed by principle; the experience is to be built original and premium.*

---

# PART II — Build & Test (Case Study 4 delivery half)

> Added 2026-08-22. Concept above is upstream; this half is what the case study grades:
> **Build → Acquire → Activate → Retain → Metrics → Event tracking → Insights → Iterate.**
> Constraint: **solo build, 5–15 real users, MVP-ish, deadline 26 Aug.** Ship small and testable over big and polished.

## 15. MVP scope cut (what actually ships by 26 Aug)

**The single spine — one thread, built end-to-end:**

1. **Onboarding (~30 sec, value before signup):** one question — *"What's your job?"* → tailored first demo. (MVP: marketers.)
2. **Awe card:** one "whoa" — watch AI do something impressive in the user's world (e.g. turn a rough note into a campaign brief).
3. **Guided prompt rep:** user writes / completes the prompt that produced it, in a sandbox. **Deterministic grading only** (fill-the-key-part, must-contain-these-elements) — no LLM judge in the MVP.
4. **Completion ritual (the juice):** a satisfying "you're current today" moment — motion/micro-animation, premium not toy.
5. **Streak +1** and **capability-ladder progress** ("3 of 12 AI skills unlocked").

**Platform:** text-only, responsive **web app**, single shareable link (no app-store friction).

**Explicitly CUT to vision-not-v1** (documented so the build pane doesn't scope-creep): audio/commute mode, offline pre-load, LLM-judge grading, B2B/cohort, WhatsApp delivery, personas 2–3, regional vernacular, energy-adaptive modes.

## 16. Metrics

- **North star (aspirational):** *weekly reps completed per active user* — captures habit **and** real doing, not vanity opens.
- **Activation (the one measured in-window):** *% of users who complete their first awe→rep loop in session 1* ("produced one impressive thing").
- **Retention proxy (measurable in a 4-day window):** *D1 return* — came back the next day.
- **Guardrail / health:** rep-abandon rate; time-to-first-aha (target < 60 sec); % who reach account creation after the aha.

## 17. Event-tracking schema

Funnel-ordered events to instrument (tool: PostHog / Amplitude free tier, or a Google-Sheet logger for 5–15 users):

`onboarding_started` → `job_selected` → `awe_card_viewed` → `rep_started` → **`rep_completed`** *(= activation)* → `account_created` → `streak_incremented` → `session_completed` → `notification_tapped` → `day2_return`

Plus drop-off: **`rep_abandoned { card_id }`**. Every event carries `user_id`, `session_id`, `timestamp`.

## 18. Growth loop + acquisition

- **Acquisition (5–15 users, 4 days):** ~10 mid-career **marketers** from personal + LinkedIn + WhatsApp network — warm, fast, on-persona. Single shared web link.
- **Growth-loop hypothesis:** completion produces a **shareable achievement card** that flatters status ("I just learned the 90-sec AI trick your team hasn't") → recipient taps → onboards. Stub this in the MVP even if virality isn't fully measurable at 10 users; it's the loop being tested.

## 19. Real-user test plan + feedback capture

- Onboard all users via one link.
- **Watch 3–4 users live** (screen-share or in person) for qualitative drop-off — *actual behaviour, not just what they say.*
- Event funnel (§17) carries the quantitative read for the rest.
- Log everything to the brief's required **Product & Feedback Sheet:** per user — what they did, where they dropped, one verbatim quote.

## 20. Full funnel + iteration hook

| Stage | Definition | Metric |
|---|---|---|
| **Acquire** | Clicked the link | # link opens |
| **Activate** | Completed first awe→rep loop | activation % (§16) |
| **Retain** | Returned next day | D1 return % |

**What I changed after users:** *(fill post-test — the brief explicitly grades this. Capture the top 1–2 behavioural insights and the change each drove.)*

## 21. Concrete design system (build-pane spec — execute literally)

> §7 was philosophy and a build agent renders philosophy as **plain**. This section is the executable version. Direction: **"Editorial Obsidian"** — a dark, premium base (serious AI/finance-software register, à la Linear / Vercel / Raycast), one warm **amber** accent, and **light itself as the "electric" element** in awe moments. *Calm dark frame, luminous reveals.* No toy, no green-owl, no AI-purple gradient.
>
> **One memorable quality:** every awe reveal lands like a prestige-film title card — the screen dims, something astonishing blooms in, then resolves into a calm editorial layout you act on.

### 21.1 Design tokens (CSS variables)

```css
:root {
  /* Surfaces — near-black with a cool undertone, layered by elevation */
  --ink-900:#0A0B0D;  /* app background            */
  --ink-800:#111318;  /* cards / elevated surface   */
  --ink-700:#171A20;  /* inputs, sandbox, wells     */
  --line:rgba(255,255,255,.08);      /* hairline borders */
  --line-strong:rgba(255,255,255,.14);

  /* Text */
  --text-hi:#F5F6F7;  --text-mid:#A0A6B0;  --text-lo:#6B7280;

  /* Accent — molten amber = premium warmth, streak, progress, CTAs */
  --amber:#F2A93B;  --amber-soft:rgba(242,169,59,.14);  --amber-glow:rgba(242,169,59,.45);

  /* "Electric" awe = luminance, not a color. Cool white-hot bloom. */
  --bloom:rgba(230,244,255,.9);  --bloom-halo:rgba(140,190,255,.28);

  /* Feedback */
  --good:#3ECF8E;  --warn:#E8B04B;

  /* Rhythm & shape */
  --r-sm:10px; --r-md:16px; --r-lg:22px;
  --pad:clamp(20px,5vw,32px);
  --shadow:0 1px 0 rgba(255,255,255,.03) inset, 0 24px 60px -24px rgba(0,0,0,.7);
}
```

### 21.2 Typography

- **Display / emotional voice:** `Fraunces` (serif, expressive, editorial) — headlines, awe copy, the coach's voice. Weight 500–600, optical size high, slight negative tracking on large sizes.
- **UI / body:** `Inter` — everything functional. 15–16px body, 1.55 line-height.
- **Prompt sandbox / rep:** `JetBrains Mono` — makes "doing real AI work" feel real.
- Load from Google Fonts. Type scale: 13 / 15 / 18 / 24 / 34 / 48. Serif only above 24px; never set body copy in the serif.

### 21.3 Anti-plain rules (why it looked plain, and the fix)

1. **Never flat gray-on-white cards.** Cards are `--ink-800` on `--ink-900`, separated by a **hairline** (`--line`) + a 1px inner top-highlight — depth from light, not heavy drop-shadows.
2. **Every screen has exactly one focal moment** (the awe card, the streak stamp, the unlock). Everything else recedes.
3. **Serif carries the emotion, grotesk carries the function** — the mix is the personality. An all-Inter screen is the plain trap.
4. **A 3% film-grain / noise overlay** across the app kills the flat-digital feel.
5. **Generous rhythm:** 24–32px section spacing, never cramped. Whitespace is the premium signal.
6. **Amber is rare and deliberate** — streak, primary CTA, progress fill only. If everything is amber, nothing is.

### 21.4 The two signature motion moments

- **Awe reveal (cinematic):** on card open, app chrome dims to `--ink-900` (200ms), the awe artifact scales `0.96→1` + fades in over 500ms `cubic-bezier(.16,1,.3,1)`, with a soft `--bloom-halo` radial glow blooming behind it then settling. Feels like light arriving. No bounce, no confetti.
- **Completion ritual (the juice, premium not toy):** streak digit **stamps** in with a tight spring (`scale 1.4→1`, 320ms), a single amber radial pulse expands and fades, a hairline sweeps left→right across the card, haptic tick on mobile. Copy in Fraunces: *"You're current today."* No coins, no explosions.

### 21.5 Per-screen treatment (the §15 spine)

| Screen | Concrete treatment |
|---|---|
| **Onboarding** | Full-bleed `--ink-900`, one Fraunces line ("What do you do?"), a few large tappable role chips (amber hairline on select). No form-y feel. |
| **Awe card** | The cinematic moment (21.4). Dark, immersive, the AI artifact is the hero; caption in Fraunces. Minimal chrome. |
| **Guided rep** | Splits to a calmer, lighter-weight `--ink-800` work surface; prompt input in `--ink-700` mono well with an amber caret. Grading feedback slides in inline — **green coach tone, never red punishment** (ties to §5/§9). |
| **Completion** | The ritual (21.4) + streak + a slim capability-ladder bar ("3 of 12 unlocked") filling with an amber sweep. |
| **Capability ladder** | Editorial list of skills as unlockable rows — unlocked = full contrast + amber tick; locked = `--text-lo`, no lock-cartoon. Progress as capability, never XP. |

### 21.6 Guardrails

- Accessibility: text contrast ≥ 4.5:1 on `--ink` surfaces (the tokens above pass); visible amber focus ring on all interactive elements; motion respects `prefers-reduced-motion` (reveals cross-fade instead of scale/bloom).
- Responsive: single-column mobile-first; awe card is full-viewport on phones. Text must never overlap; test at 360px and 1280px.
- **Reject on sight:** purple→blue gradients, glassmorphism blobs, rounded toy buttons, mascots, emoji-as-UI, stock-icon rows. Any of these = the brief failed (Directive B).

### 21.7 The Bloom — the app's signature primitive (build once, reuse everywhere)

The identity is **one** motion idea, not many effects: **light arriving out of the obsidian dark, from a single meaningful origin.** Every reveal in the app is a Bloom from a different point — the awe artifact, the streak digit, the unlock tick, the daily cover title. The *repetition is the brand* (BeReal's moment, Duolingo's flame — this is ours). Never invent a second reveal style.

```css
@keyframes bloom {
  0%   { opacity:0; transform:scale(.94);
         filter:brightness(.6); box-shadow:0 0 0 0 var(--bloom-halo); }
  60%  { opacity:1; filter:brightness(1.15);
         box-shadow:0 0 120px 24px var(--bloom-halo); }
  100% { opacity:1; transform:scale(1); filter:brightness(1);
         box-shadow:0 0 48px 4px rgba(140,190,255,.14); } /* resting glow */
}
.bloom { animation:bloom 600ms cubic-bezier(.16,1,.3,1) both; }
```
- **Origin matters:** the halo emanates from the element that *means something* that moment. Set `transform-origin` to it.
- **Resting state:** after the bloom, a faint glow persists so the focal element stays "alive."
- **Warmth switch:** content reveals bloom cool (`--bloom-halo`); *achievement* moments (streak, unlock) bloom **amber** (`--amber-glow`) — same keyframe, swapped color var.
- `prefers-reduced-motion`: Bloom degrades to a 250ms opacity fade, no scale/shadow.

### 21.8 The daily cover — living aesthetic, seeded not random

Each day's drop renders a unique **cover** so the app *looks* new before a word is read — but from a curated kit, never free-form (random = cheap, same = boring).

- **Seed:** `date + topic-id` → deterministic (same day looks identical for everyone; screenshot-shareable).
- **Kit (the only allowed variation):**
  - **Accent tint:** pick 1 of **5 curated, obsidian-compatible tints** (e.g. ember, signal-cyan, viridian, magenta-ink, gold). **Amber stays the constant UI accent** — the daily tint colors only the *cover*, not the chrome.
  - **Layout:** 1 of **3 cover compositions** (title-dominant / artifact-dominant / split).
  - **Texture:** 1 generative field — light-rays, fine grain, or a slow flow-field — rendered behind the title, low contrast.
- **Hero:** today's topic in **large Fraunces**, blooming in (21.7) as the cover resolves.
- Result: a fresh "magazine cover" daily, unmistakably *this* app. Same bones, new face.

### 21.9 Kinetic typography — the "cool" lever, quarantined

Big expressive type is the highest-impact *and* highest-toy-risk move, so it is **dialed up in the hook, banned in the work.**

- **Allowed (the 30% hook):** awe reveal + daily cover. Large Fraunces words animate in with the Bloom — staggered word/line reveal, subtle weight (500→600) and tracking shift on settle, scale tied to the bloom. Cinematic, editorial — think prestige title sequence, **not** bouncing letters.
- **Banned (the 70% do):** rep sandbox, grading feedback, streak counter, capability ladder, all forms/controls stay calm Inter. Kinetic type here = gimmick = toy.
- **Hard rule:** *type performs in the hook, type informs in the work.* This boundary is what keeps "cool" from becoming juvenile for the mid-career wedge.
- Motion budget: one kinetic headline per screen max; respects `prefers-reduced-motion` (words cross-fade, no travel).
