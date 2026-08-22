# Acquisition & Test-Run Kit — Current

_Case Study 5 · Part II §18–§19. Goal: get ~10 mid-career **marketers** through one
shared link, activate them (first awe→rep loop), and capture behavioural signal + D1
return. Warm network first — this is directional signal, not a powered experiment._

---

## 0. Before you send anything — deploy the single link (§15)

The whole model is **one shareable web link, no app-store friction**. Local `localhost:3000`
can't be shared, so deploy first:

```powershell
cd "C:\Users\tabhi\Downloads\Case Study 5"
npx vercel            # first run: log in, accept defaults → gives a prod URL
# redeploy after changes:
npx vercel --prod
```

- Result: a link like `https://current-<slug>.vercel.app` → **this is the link you paste everywhere.**
- Sanity-check on your phone before sending (the persona opens it on mobile).
- **Clear the event log first** (Metrics → "Clear event log") so your own test runs don't
  pollute the funnel. Each real user is a fresh browser = a fresh `user_id`.

> If you'd rather not deploy: screen-share a live walkthrough with each person instead
> (§19 "watch 3–4 live"), but you lose the self-serve funnel + D1 signal. Deploy is better.

---

## 1. Who to send it to (~10, on-persona)

Mid-career, **non-technical marketers** in your personal / LinkedIn / WhatsApp network —
marketing managers, brand/growth/content leads, 4–12 yrs in. **Not** engineers or AI power
users (breaks the "I don't understand tech → I can use it" thesis). Warm > cold: reply rate
and honest feedback both come from people who'll actually open it.

Make a quick list of 12–15 names (expect ~10 to open) before sending.

---

## 2. Recruit messages

Tone rule (§5): **relevance / curiosity, never guilt.** Respect their time, promise a real
payoff in under 2 minutes, no signup to try. Lead with *them*, not the product.

### A. WhatsApp (warmest — your closest 5–6)
> Hey [name] — I built a tiny thing for marketers who want to actually *use* AI well (not
> just talk about it). It's a 90-second daily "here's a sharp AI trick for your job."
> Can you try today's one and tell me if it lands? No signup to start, works on your phone:
> [LINK]
>
> Genuinely want the honest read — including "meh, here's why."

### B. LinkedIn DM (professional acquaintances)
> Hi [name] — quick favour. I'm testing **Current**, a daily 90-second habit that makes
> non-technical marketers genuinely fluent at using AI in real work (not vocabulary, actual
> doing). You're exactly who it's for. Could you run today's drop and give me a blunt 2-line
> reaction? No account needed to try: [LINK]

### C. Short broadcast (WhatsApp status / a group where it's welcome)
> Made a 90-sec daily AI-fluency thing for marketers. Try today's, tell me if it's useful:
> [LINK] 🙏

### D. The built-in loop (§18 — no writing needed)
After anyone finishes a drop, the app offers a **"Share this win"** card ("I just picked up
the 90-second AI skill your team probably hasn't"). That's the growth loop — every activated
user can pass the same link on. You're seeding it; the card carries it.

---

## 3. What to ask them to do

1. Open the link on their phone.
2. Pick their role → watch the "whoa" → do the short rep → hit "you're current."
3. Two-line reaction: **did it feel useful, and where (if anywhere) did you want to bail?**

That's it. Don't over-brief — the point is whether it explains itself in 60 seconds (§10).

---

## 4. Live-watch plan (§19) — do this for 3–4 of them

Numbers tell you *where* they drop; watching tells you *why*. Screen-share or in person for
3–4 users. Say **"think aloud, and don't be nice."** Stay silent — do not rescue them.

Watch for:
- **Time-to-aha** — do they hit the first "whoa" inside ~60 sec, or stall in onboarding?
- **The rep** — does building the prompt feel *real* (fluency) or like a quiz? (Riskiest
  assumption per `questions.md`.)
- **Register** — does any of it read as a toy for a serious adult? (Directive B check.)
- **The exact card they hesitate or quit on** — that's your top iteration target.

---

## 5. Product & Feedback Sheet (§19 — required deliverable)

Fill one row per user. Pull the quantitative columns from **Metrics → Download CSV**;
fill the qualitative ones from the watch/reply.

| User | Source (WA/LI) | Opened? | Activated? (finished 1st rep) | Time-to-aha | Where they dropped | One verbatim quote | D1 return? |
|------|----------------|---------|-------------------------------|-------------|--------------------|--------------------|------------|
| U1 | | | | | | | |
| U2 | | | | | | | |
| … | | | | | | | |

**Roll-up (the graded funnel, §20):**
- Acquire — # link opens: ____
- Activate — activation % (first awe→rep loop): ____
- Retain — D1 return %: ____
- Guardrails — rep-abandon %: ____ · median time-to-aha: ____ · % reaching account save: ____

_(activation, abandon, time-to-aha, D1 all read straight off the Metrics dashboard.)_

---

## 6. Iteration hook (§20 — "what I changed after users")

The brief explicitly grades this. After the runs, capture the **top 1–2 behavioural insights**
and the change each drove, e.g.:

- _Insight:_ 3/4 hesitated on the prompt-build rep — unsure what "strong" meant.
  _Change:_ added the one-line scenario hint above the options.

Fill this in `research/outputs/product-spec.md` §20 after the test window.

---

## Timeline (deadline 26 Aug)

- **Now:** deploy, clear log, self-test the live URL on mobile.
- **Day 1:** send A/B/C to ~12 people; book 3–4 live watches.
- **Day 2:** run live watches; let self-serve users trickle.
- **Day 3 (D1):** check D1-return in Metrics; fill the sheet.
- **Day 4:** write the §20 insight + change; done.
