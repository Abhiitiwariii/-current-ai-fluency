# PRD — AI-Fluency Habit App (working title TBD)

> **Consolidated PRD** for Case Study 4 (Learning Tech & AI for the Next Generation of Professionals).
> Covers Problem → Solution → Implementation → Measurement in one document.
> **Detailed design, build directives, and the design system live in the appendix:** `product-spec.md` (§1–§21).
> Status: **concept + solution locked; MVP not yet built; user test pending.** Date: 2026-08-23.
> Section headings below map 1:1 to the case study's required submission list.

---

## 0. TL;DR

A daily, awe-driven micro-app that makes **time-poor, non-technical mid-career professionals** genuinely fluent at *using* AI in their real work. Each day: one astonishing "AI can do *this*" reveal → a short guided rep where they actually do a shrunk version → streak +1. Emotional register: **respect, relevance, awe — never guilt.** MVP built and tested solo on **one persona (mid-career marketers)** with **5–15 real users** by the deadline; the ambition is 40–50 (see §6, §9).

---

## 1. Problem

**Context.** Tech & AI are now part of everyday non-technical work (marketing, ops, HR, sales, finance). You no longer need to be a developer to use AI tools — but for a non-technical professional the journey feels intimidating: *Where do I start? What next? How do I actually become capable?* Existing options (courses, YouTube, bootcamps) are built around **consuming content**, not building capability, and none keep pace with a field that changes weekly.

**The move we're enabling:** *"I don't understand technology"* → *"I can confidently understand, use, and build with it."*

**Core problem statement.** Non-technical mid-career professionals want to *stay current and capable* with AI, but have no habit-forming, low-time way to keep building real usage skill as the tools change — so anxiety stays high and capability stays flat.

### 1.1 Evidence status (read honestly)

This concept is currently **hypothesis-driven** — derived from structured reasoning, *not yet* from primary user research (`sources/` and `notes/` are empty by design at this stage). The table below is the honest state, and the riskiest assumptions are what the user test (§9) exists to validate.

| # | Assumption | Belief basis | Evidence today | Validation plan |
|---|---|---|---|---|
| A1 | Mid-career non-tech pros feel real anxiety about being "left behind" on AI | Reasoning + market signal | None primary | Interviews (§1.2) + onboarding survey |
| A2 | They'll reach an "aha / I made something" in <60s and it hooks them | Product reasoning | None | Activation metric (§7) |
| A3 | A daily loop creates a *return* habit for this audience | Analogy to habit apps | None | D1 return (§7) |
| A4 | Deterministic-only grading still *feels* like real progress | Design reasoning | None | Qualitative watch (§9) |
| A5 | The premium/anti-toy register lands as "serious," not childish | Positioning bet | None | Qualitative watch (§9) |

### 1.2 Fast primary research (optional pre-build, 2 hrs)

If time allows before building, 3 questions to ask 2–3 target marketers:
1. "Last time you *wanted* to use AI for a work task — what happened?" (finds the real friction)
2. "How do you keep up with new AI tools today, if at all?" (tests the 'stay current' pain)
3. "What would make you open a learning app *daily* vs abandon it in 3 days?" (tests the habit hook)

---

## 2. Users & personas

- **Primary wedge:** mid-career, **non-technical** professionals — marketing, ops, HR, sales, finance. Budget, status/obsolescence anxiety, low time. *Not* technical/IT staff (the thesis doesn't apply to people who already build with AI).
- **Built + tested at MVP:** **mid-career marketers** — one concrete persona, end-to-end. Others remain positioning for now (a solo 4-day build with 5–15 users can't read signal across multiple tracks).
- **Deferred:** early-career professionals (different motivation, pricing, tone).

*(Full persona/wedge detail: `product-spec.md` §2.)*

---

## 3. Solution overview

A habit-forming mobile-web app where the **astonishment of AI is the dopamine engine** and a **disciplined daily completion loop is the habit skeleton**. Awe *opens*, action *closes* (~30% hook / 70% do). Borrows habit *psychology* (loss-aversion streaks, variable reward, completion ritual) but owns an original, **premium/editorial** experience — explicitly **not** a toy/green-owl clone (Directives A & B).

*(Full solution logic: `product-spec.md` §3–§13. Design system: §21.)*

---

## 4. What the MVP includes (working MVP)

**The single spine, built end-to-end:** onboarding (one "what's your job?" question → tailored demo) → daily **awe card** → **guided prompt rep** (deterministic grading only) → **completion ritual** → **streak +1** + capability-ladder progress. Text-only responsive **web app**, single shareable link.

**Cut to vision-not-v1:** audio/commute mode, offline pre-load, LLM-judge grading, B2B/cohort, WhatsApp delivery, personas 2–3.

*(Detail: `product-spec.md` §15. Design/motion: §21, incl. The Bloom §21.7, daily cover §21.8.)*

---

## 5. Acquisition strategy & growth loop

- **Acquisition (MVP):** ~10 mid-career **marketers** from personal + LinkedIn + WhatsApp network — warm, fast, on-persona. One shared web link, no app-store friction.
- **Growth loop (hypothesis):** completion produces a **shareable achievement card** that flatters status ("the 90-sec AI trick your team hasn't learned") → recipient taps → onboards. Stubbed in MVP; measured properly at scale later.

*(Detail: `product-spec.md` §18.)*

---

## 6. Full funnel

| Stage | Definition | Metric |
|---|---|---|
| **Acquire** | Clicked the shared link | # link opens |
| **Activate** | Completed first awe→rep loop in session 1 | activation % |
| **Retain** | Returned the next day | D1 return % |

**User target:** brief asks for **40–50**; realistic solo-in-timeframe target is **5–15** with real behavioural signal (the brief rewards tight, end-to-end scope). 40–50 is the stated ambition / next step, not this cycle's claim.

---

## 7. Product & business metrics

- **North star (aspirational):** *weekly reps completed per active user* — habit + real doing, not vanity opens.
- **Activation (measured):** *% completing first awe→rep loop in session 1.*
- **Retention proxy (measured in-window):** *D1 return.*
- **Guardrails:** rep-abandon rate; time-to-first-aha (<60s); % reaching account creation after aha.
- **Business (directional):** eventual B2C subscription (front door) + B2B/L&D seats (margin) — validate willingness-to-pay before building a paywall.

*(Detail: `product-spec.md` §16, §12.)*

---

## 8. Event tracking plan

Funnel-ordered events (tool: PostHog/Amplitude free tier, or a Sheet logger for 5–15 users). Every event carries `user_id`, `session_id`, `timestamp`.

`onboarding_started` → `job_selected` → `awe_card_viewed` → `rep_started` → **`rep_completed`** *(= activation)* → `account_created` → `streak_incremented` → `session_completed` → `notification_tapped` → `day2_return`, plus **`rep_abandoned { card_id }`**.

*(Detail: `product-spec.md` §17.)*

---

## 9. User testing plan

- Onboard all users via one link; target **5–15** mid-career marketers, outside the working group.
- **Watch 3–4 live** (screen-share/in-person) for qualitative drop-off — *actual behaviour, not just opinions.*
- Event funnel (§8) carries the quantitative read.
- Log per user to the **Product & Feedback Sheet:** what they did, where they dropped, one verbatim quote.

---

## 10. Results & insights — ⏳ PENDING (to collect from the 5–15-user test)

> No user data collected yet. This section is instrumented and ready; **no numbers will be invented.** Fill after the test.

| Metric | Target (hypothesis) | Actual | n |
|---|---|---|---|
| Link opens → onboarding start | — | _pending_ | _pending_ |
| Activation (first loop complete) | ~50%+ | _pending_ | _pending_ |
| Time-to-first-aha | <60s | _pending_ | _pending_ |
| Rep-abandon rate | low | _pending_ | _pending_ |
| D1 return | directional | _pending_ | _pending_ |

**Top behavioural insights:** _pending — capture the 1–2 clearest patterns (where users drop, what surprised them)._

---

## 11. What I changed based on insights — ⏳ PENDING

> Fill post-test. For each: the insight (from behaviour), the change made, the expected effect. The brief explicitly grades this.

1. _pending_
2. _pending_

---

## 12. Risks & open items

- **Grading cost/feel** — deterministic-only must still feel like real progress (A4).
- **Content/awe supply** — perpetual fresh awe is the make-or-break ops bet (`product-spec.md` §8).
- **Timeline** — solo build + recruit + test + iterate is tight; protect **activation + D1 signal on ~8 users** over feature completeness.
- **Register risk** — premium/gamified-loop must not tip toy for a status-sensitive audience (A5; `product-spec.md` §5 note, §21.9).
- **B2B WTP, name/brand, WhatsApp feasibility** — deferred (`product-spec.md` §14).

---

## Appendix

- **`product-spec.md`** — full design spec (§1–§14 concept, §15–§20 build/test, §21 design system incl. The Bloom, daily cover, kinetic-type rules). The build pane's source of truth.
- **`questions.md`** — primary research question + falsifiable assumptions.
- **`research-log.md`** — decision trail.
