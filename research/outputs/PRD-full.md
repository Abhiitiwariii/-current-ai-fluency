# Current: Product Requirements Document

**Case Study 5: Learning Tech & AI for the Next Generation of Professionals**

Author: Abhilash Tiwari. Date: 25 August 2026. Status: MVP built and deployed. User test instrumented, results pending.

Live app: https://current-ai-fluency.vercel.app/ · Source: https://github.com/Abhiitiwariii/-current-ai-fluency

---

## 0. What this document covers

The case study asks for a full product loop, not just a concept. It asks you to decide who the user is, name their core problem, design the learning experience, build an MVP, put it in front of real users, and then show what the funnel and the behaviour taught you. This document is organised so each of those asks has a clear home.

| The brief asks for | Where it lives |
|---|---|
| Who the user is and their core problem | Sections 1, 2 |
| The learning experience and what they learn | Sections 6, 9 |
| A working MVP | Section 9 (built and deployed) |
| Acquisition strategy and growth loop | Section 12 |
| Full-funnel thinking | Sections 10, 13 |
| Product and business metrics | Section 10 |
| Event tracking across the journey | Section 11 |
| Insights from real user behaviour | Section 15 (instrumented, pending the test) |
| What changed after users | Section 16 (pending the test) |

Sections 3 to 8 carry the research and reasoning that led to the product. They are kept tight so the build and measurement half stays in focus.

---

## 1. Problem Statement

### 1.1 Summary

AI has moved into ordinary, non-technical work. A marketer drafts campaign copy with a model. An HR manager turns a policy into a plain-language FAQ. A finance analyst hands a variance table to a model and gets back a memo. None of them are engineers. Yet the tools now sit inside their daily job.

The problem is that most learning built for these people answers the wrong question. Courses, YouTube videos and bootcamps explain AI. They rarely leave you having done anything real with it, and they do not keep pace with a field that shifts every few weeks. So the gap between how fast the tools move and how fast a working professional actually improves keeps widening.

Current is a daily habit app built to close that gap. Every day it opens with one real "AI can do this" moment inside the user's own line of work. Then it turns that moment into a short hands-on task where the user does a smaller version themselves. The tone is respect and relevance. There is no guilt and no punishment. The bet is simple. A small daily loop built around a genuine reason to open, plus real doing, creates a habit. A one-off course produces a certificate that nobody acts on.

### 1.2 The core problem, stated plainly

Non-technical mid-career professionals want to stay capable with AI as it changes. They have no low-time, habit-forming way to keep building real usage skill. So the anxiety stays high and the skill stays flat.

The shift the product is trying to create is specific.

> "I don't understand technology." → "I can confidently understand, use, and build with it."

### 1.3 Why this is worth solving now

Three facts set the timing.

First, AI is already inside non-technical work. In the 2024 Microsoft and LinkedIn Work Trend Index, [75% of knowledge workers said they use AI at work, and 46% of them had started within the previous six months](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part). Adoption is happening right now, and it is happening fast.

Second, the skills are being asked for faster than they are taught. The World Economic Forum's [Future of Jobs Report 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) puts the share of core skills expected to change by 2030 at 39%. Roughly 59% of the workforce will need reskilling or upskilling. And 63% of employers name the skills gap as their main barrier to change.

Third, the format most people reach for does not finish. Across 17 HarvardX and MITx courses the two universities studied, [about 5% of registrants completed](https://news.mit.edu/2015/mit-harvard-study-moocs-0401), and half of those who dropped out left in the first week or two. Content that gets watched once and abandoned is not building lasting skill.

The opening here is not another course. It is a habit. A short daily action that keeps a non-technical professional moving at something closer to the speed of the tools.

---

## 2. Users & Stakeholder Mapping

### 2.1 Who the user is

The primary user is a mid-career, non-technical professional. Four to fifteen years into a career in marketing, operations, HR, sales or finance. They have budget, real anxiety about falling behind, and very little spare time. They are not engineers, and they are not AI power users. The whole idea rests on "I don't understand technology, but I can use it," and that idea does not apply to people who already build with AI.

The MVP builds and tests one persona end to end: the mid-career marketer. The other four functions ship as positioning. The product recognises them and tailors its content to them, but a solo build tested with a small group cannot read a clean signal across five tracks at once. Prove the loop on one persona first, then widen it.

| Attribute | Description |
|---|---|
| Role | Marketing, ops, HR, sales or finance. IC through mid-manager |
| Experience | Four to fifteen years, non-technical background |
| Motivation | Stay relevant, use AI credibly at work, avoid falling behind |
| Constraints | Low time, distracted, mobile-first, wary of anything that looks like a toy |
| Emotional truth | "Don't get left behind," sold as relief and pull, never as fear |

Two groups are deliberately left for later. Early-career professionals have different motivation, pricing and tone. Technical staff do not fit the premise.

### 2.2 The ecosystem around the learner

The learner does not decide alone. Several parties shape whether they actually build AI skill, and each cares to a different degree.

| Stakeholder | Role in the journey | Current gap |
|---|---|---|
| The learner | Decides each day whether to open, practise and apply | No low-friction daily habit that keeps pace with the tools |
| Employer / L&D team | Buys upskilling, sets expectations, funds seats | Buys courses that get consumed but rarely change behaviour |
| AI tool vendors | Provide the capability the learner has to master | Assume a level of skill the non-technical user lacks |
| Existing learning providers | Courses, bootcamps, YouTube, cohort schools | Content-first model, low completion, no daily habit |
| Peers and teammates | Social proof and quiet pressure | Word of mouth is the main discovery channel, and it is slow |

Read by power against interest, the picture is consistent. The learner and their peers have the most at stake and the least structured support. Employers hold the budget but buy the wrong format. The tools keep moving regardless. The gap sits between a fast capability and a slow, content-only way of learning it.

---

## 3. Secondary Research

### 3.1 Market size and boundary

There is no single clean number for "AI-fluency learning." It spans consumer edtech, corporate learning and AI-specific training, and analysts scope those differently. The honest read is a large space, growing fast, with wide variance in the estimates.

| Segment | Estimate | Note |
|---|---|---|
| Corporate e-learning | Roughly USD 100B or more in 2024, growing in the low-20s percent CAGR in the higher estimates | [Grand View Research](https://www.grandviewresearch.com/industry-analysis/corporate-e-learning-market-report). Firm-to-firm estimates for 2024 range from about USD 42B to USD 120B depending on scope, so treat this as direction, not a precise figure |
| AI in education and training | About USD 6B in 2024, forecast into the tens of billions by 2030 in the more aggressive models | Same variance caveat |

The point for this document is not a precise total addressable market. It is that demand for AI skill, both corporate and consumer, is large, funded, and growing faster than most nearby categories. That is the condition a habit product with a B2B upsell needs.

### 3.2 The audience and AI-at-work adoption

Two numbers frame the demand.

Adoption is already broad. [75% of knowledge workers use AI at work, and 46% of them started within six months](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part). The tools reach people before the skill does.

The gap is recognised. Employers put the skills gap first among barriers to change, at 63%, and expect 39% of core skills to shift by 2030 ([WEF, 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/)).

So a large population already touches AI at work, senses the ground moving, and has no steady way to keep up. That feeling is what the product sells against, turned into a pull rather than a fear.

### 3.3 The learning journey today, and where it breaks

| Stage | What happens today | Where it breaks |
|---|---|---|
| Motivation | A professional feels behind and decides to learn | Anxiety is high and the starting point is unclear |
| Choice | They pick a course, a playlist or a bootcamp | Built to be watched, not practised, and not tied to their job |
| Consumption | They watch a few hours of content | About 5% of MOOC registrants finish, and most quit in week one ([MIT and Harvard](https://news.mit.edu/2015/mit-harvard-study-moocs-0401)) |
| Application | They try to use what they saw at work | The distance between watching and doing never gets closed |
| Staying current | The tools change again next month | A finished course does not refresh, and the skill goes stale |

The break is structural. It is not a willpower problem. A format built to be consumed, delivered once, cannot produce a skill that has to be practised and kept current.

### 3.4 Habit-app benchmarks

The retention model comes from habit apps, and Duolingo is the clearest public benchmark. In Q2 2024 it reported [34.1 million daily active users, up 59% year over year, with more than 20% of daily active users holding streaks longer than a year](https://investors.duolingo.com/news-releases/news-release-details/duolingo-hits-100m-maus-reports-59-dau-growth-and-41-revenue). The lesson is not the owl or the cartoon look. It is that a bounded daily loop with a forgiving streak can hold a very large audience in a real daily habit.

Current takes the retention math, the streak, the completion moment, the sense of progress, and drops the toy skin. For a status-sensitive adult audience, the game-toy look is a liability. The pull has to come from a tight loop and a daily reveal that is genuinely worth seeing, not from gems and hearts.

### 3.5 India context

The MVP audience is reachable in India, and the way people get online there shapes the design. India had [about 886 million active internet users in 2024, up 8% year over year, spending roughly 90 minutes a day online](https://www.medianama.com/2025/01/223-rural-adoption-ai-india-internet-2024-kantar-iamai-report/) (IAMAI and Kantar). Access is mostly mobile, often on limited data, in short and interrupted windows.

That is why the product is built to win a 40-second slice of a distracted, moving person's attention. A single card counts as a full daily win. Sessions save and resume. An audio path lets the daily reveal be heard hands-free. For the graded MVP, the text-only web loop ships first, and the India-context extensions sit behind it, some cut to a later phase (see 9.5).

### 3.6 Problem framing: the gaps

| Gap | What it means |
|---|---|
| Consumption over capability | Existing learning explains AI but rarely leaves the user having done something real |
| No daily habit | Courses are one-time. A fast-moving field needs a small recurring action |
| No tie to real work | Generic content does not connect to a marketer's or an analyst's actual tasks |
| Wrong emotional register | Fear-based or toy-styled framing either scares or patronises a serious adult |
| Progress that does not feel real | Watching a video does not feel like becoming capable. Doing a task does |

### 3.7 Takeaways

1. The tools are ahead of the skill. Access is broad and recent. The bottleneck is using AI well, not reaching it.
2. The format is the failure, not the learner. Low completion is what content-first learning produces. A smaller, daily, hands-on shape is the opening.
3. Habit mechanics work. The toy skin does not, at least not for this audience.
4. Awe is the fuel a numbers-only streak lacks. AI is genuinely surprising right now, and the surprise refreshes weekly. That is the daily reason to open.
5. Doing is the proof. "I'm becoming AI-fluent" is only true if the user actually makes something. The task, not the reveal, is what makes progress real.

---

## 4. Opportunity Themes

| Theme | Problem it addresses | Who | The opportunity |
|---|---|---|---|
| Awe as the daily engine | A streak on its own is a chore | All personas | Open each day with a real "AI can do this" moment in the user's own work |
| Bounded daily loop | Infinite feeds burn content and attention. Courses never finish | All personas | One clean daily unit with a real end ("you're current today, streak +1") |
| Real doing | Consumption does not build skill | All personas | Turn the day's awe into a short hands-on task the user completes |
| Capability ladder | Abstract points feel like a game | All personas | Show progress as capabilities gained, from reading AI critically to delegating a task |
| Forgiving streak | A rigid streak breaks on a bad day and creates guilt | All personas, India context | One grace day and a kind reset, so the habit survives real life |
| Premium register | Toy design reads as juvenile to a serious adult | Status-sensitive professionals | A calm, editorial look that signals respect for the user's time and taste |
| Share loop | Discovery is slow word of mouth | Growth | A flattering "here's the AI skill I just picked up" card a peer can tap |

---

## 5. Primary Research and Assumptions

### 5.1 Honest status

The concept is currently hypothesis-driven. It comes from the research above and from product reasoning. It has not yet been validated with primary user research. The MVP exists to run that validation. The results and iteration sections of this document (15 and 16) are built and ready, and they are left pending on purpose rather than filled with invented numbers.

### 5.2 The riskiest assumptions

The user test is designed to break these five. Each has a clear signal that would confirm or deny it.

| # | Assumption | How the test reads it |
|---|---|---|
| A1 | These professionals feel real anxiety about being left behind on AI | Onboarding reaction and interview language |
| A2 | Users reach an "I made something" moment in under 60 seconds, and it hooks them | Time-to-first-aha and activation rate (10) |
| A3 | A daily loop creates a return habit for this audience | D1 return rate (10) |
| A4 | Deterministic grading still feels like real progress, not a quiz | Live-watch of the task and verbatim reactions |
| A5 | The premium, anti-toy register reads as serious, not childish | Live-watch, and whether anyone calls it a toy |

### 5.3 Questions to ask

For the live watches and any short interviews, three questions do most of the work.

1. "The last time you wanted to use AI for a work task, what happened?" This finds the real friction.
2. "How do you keep up with new AI tools today, if at all?" This tests the stay-current pain.
3. "What would make you open a learning app daily, instead of dropping it in three days?" This tests the habit hook.

### 5.4 Who will be interviewed, and how many

The plan is a warm-network test of roughly 10 to 15 mid-career marketers, recruited through personal, LinkedIn and WhatsApp contacts, with three or four watched live while they use the product. This is directional signal from the target persona, not a powered experiment. The brief's stated ambition is 40 to 50 users. Section 13 addresses that gap directly.

---

## 6. Synthesis: the core bet

The research and the reasoning point the same way. Demand is real and large. The tools are ahead of the skill. And the reason existing learning fails is its shape, content consumed once, never practised, never refreshed. The answer is a habit, not a better course.

The daily loop has two parts, held in order.

Awe opens it. Each day leads with a genuine "AI can do this" moment in the user's own work. AI surprises people in a way language drills never did, and the surprise refreshes weekly, so there is always a fresh reason to come back. This is the reason to open.

Action closes it. The product then turns that specific moment into a short hands-on task, writing the prompt that produced it, fixing the draft, putting the workflow in order. This is what makes "I'm becoming AI-fluent" true instead of merely entertaining.

The habit mechanics record and hold the habit. The awe creates it. If the awe ever becomes the whole experience, this is a content app with a churn problem. If the task ever hardens into a dry quiz, the awe was wasted. The product's job is to keep both, in that order, every day. That is the concept, named Current. A daily practice for staying current with AI, for people whose job now expects it.

---

## 7. Opportunity Size

The market numbers sit in 3.1 and are not repeated. The sizing logic for Current is a narrowing from a large base to a realistic beachhead.

| Layer | Definition | Basis |
|---|---|---|
| Total demand | Knowledge workers expected to use AI who lack the skill | 75% already use AI at work ([Microsoft and LinkedIn, 2024](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part)), and most are non-technical |
| Serviceable segment | Non-technical mid-career professionals in reachable, mobile-first markets | Large in India alone, where active internet users passed [880 million in 2024](https://www.medianama.com/2025/01/223-rural-adoption-ai-india-internet-2024-kantar-iamai-report/) |
| Beachhead | Mid-career marketers in the founder's warm network, expanding by role | The MVP's built and tested persona |

The business case is not that Current takes a slice of the corporate e-learning market on day one. It is that a consumer habit product can win daily use on one persona, then convert that into the higher-margin B2B channel, teams and L&D buying AI upskilling for a whole group, once the loop is proven (see 10). Consumer edtech churns after the novelty fades. Team seats hold. That is where the margin sits.

---

## 8. Competitive Landscape

Current is not the only way a professional can learn AI. What sets it apart is shape, daily, hands-on, tailored and premium, rather than a bigger content library.

| Player | Focus | Limitation relative to Current |
|---|---|---|
| Duolingo | Habit-forming language learning | The retention model Current borrows, but not an AI-skills product, and the toy look is wrong for this audience |
| Coursera and other MOOCs | Structured video courses and certificates | Consumption-first, about 5% completion, no daily habit, not tied to a specific job |
| YouTube | Free how-to videos on AI tools | No path, no practice, no progress, no habit, and the discovery burden sits on the user |
| Cohort schools (Maven, Section and similar) | Live instructor-led AI courses | High cost and time, scheduled cohorts rather than a daily three-minute action, still mostly watch-and-listen |
| Corporate LMS content | Compliance-style training modules | Assigned rather than chosen, consumed for completion, rarely changes behaviour |
| Prompt libraries and newsletters | Reference content on prompts and tools | Passive reference, no doing, no feedback, no capability tracking |

None of them fill the same gap: a daily, hands-on, job-tailored practice that builds a real sense of capability, delivered in a register a serious adult respects. That is the space Current takes.

---

## 9. The Product in Detail: Current

### 9.1 Concept and the two build rules

Current is a habit-forming mobile-web app. The astonishment of AI is the daily reason to open. A disciplined completion loop is the habit skeleton. Two rules govern the build.

The first rule is to borrow the psychology and own the experience. The retention mechanics come from the best habit apps: loss-aversion streaks, variable reward, a completion ritual, relevance-based nudges. The look, motion, voice and structure are original and premium.

The second rule is not to clone a learning-app toy. No mascots, no cartoon look, no green-owl register. The reference for feel is premium productivity and finance software, calm and editorial. A build that ships a toy look for this audience has failed the brief.

### 9.2 The core loop

The daily unit is roughly 30% hook and 70% doing. Awe opens, action closes. The guardrail is "no orphan awe." If a moment amazes but cannot become something the user does in the next thirty seconds, it does not ship. The demo that dazzles is the lesson that follows.

### 9.3 The full user flow, step by step

This is the flow as built. Named states map to the single client-side controller in `app/page.js`. The events in brackets are what gets written to the analytics log (see 11).

**Step 1, onboarding.** A full-bleed dark screen asks one thing: "What do you do?" The user taps one of five role chips, from Marketing & Growth to Finance & Analysis. No form, no signup, no placement test. This fires `[onboarding_started]` and then `[job_selected]`. The choice tailors every screen that follows to that persona's real work.

**Step 2, the video hook.** The first screen after the role pick is a short, curated video for that persona, a public talk on how AI is used in their function, trimmed to about a 90-second segment. It loads a poster image first and only starts the embed on tap. It always offers a "continue" and an "open on YouTube" option, so a blocked or dead embed never traps the user. This fires `[video_started]`. The video is the motivating hook. It plays once, before the first drop.

**Step 3, the awe reveal.** The screen dims and the day's "AI can do this" artifact appears. For a marketer, a one-line input, "launch our new Pro pricing tier," expands into a full campaign brief: a positioning angle, three audience segments, a drafted email, two ad variants and a launch checklist, streamed out piece by piece as if the model were writing it live. Each persona has its own reveal. An ops user watches messy notes turn into an action tracker. A finance user watches a variance table become a board-ready memo. This fires `[awe_card_viewed]`. The reveal ends by pointing straight at the task: "You just watched it. Now you make it obey. Build the prompt yourself."

**Step 4, the guided tasks.** The user does five short tasks for the day's capability, and `[rep_started]` fires on the first. The tasks come in three kinds, mixed so it never feels like five multiple-choice questions in a row.

- Spot-check. A fast recognition card, such as "which line should you never trust without checking," to keep the pace quick.
- Prompt-build. The user taps the parts that make a strong, context-rich prompt (role, audience, goal, constraints) and leaves out the vague or off-task lines. This is the real "doing AI work" task.
- Assemble. The user puts a three-step workflow in the right order: set up, draft and self-critique, then finalise.

Grading is deterministic and forgiving. Selections are checked against a known-correct set defined when the content was written, so about 80% of grading is cheap rules with no live model call. A wrong answer never punishes. It triggers a short coaching line in a warm tone and lets the user carry on. If someone leaves a task, `[rep_abandoned { card_id }]` records exactly where. Finishing the hands-on task fires `[rep_completed]`, the activation event, the moment the user has personally produced something real.

**Step 5, the completion moment.** A brief, premium beat. The streak digit stamps in with a tight spring. A single amber pulse expands and fades. A hairline sweeps across the card. A line in the display serif reads "You're current today." No coins, no confetti. This fires `[session_completed]`.

**Step 6, streak and capability.** The streak advances by one, using forgiving logic (see 9.7), and `[streak_incremented]` fires. The day's capability is marked as unlocked on the ladder, shown as "what you can now do," never as points. `[certificate_earned]` fires once all five capabilities are complete.

**Step 7, progression across days.** The daily drop moves tier by tier through the five-step capability ladder (see 9.4). Because the test window is short, the tiers can also be finished in one sitting, so the final certificate is reachable, and the streak still rewards genuine daily return. After all five capabilities, the user earns a named, dated AI-Fluency certificate they can download as an image and share.

**Return path.** On any later-day return, the app logs `[day2_return]` once for that day. That is the retention signal.

The spine has three paths built around it.

The audio path lets the day's reveal be heard hands-free, using browser speech synthesis. A finished listen counts as a full daily win. The streak advances at once, and the hands-on task queues for the next stationary moment rather than being demanded on the move. The capability only unlocks once the task is actually done, so listening never fakes progress.

The notification nudge is an in-app, relevance-toned message, aware of persona, streak and progress, that routes the user back into the day's drop. Tapping it fires `[notification_tapped]`. Real scheduled push sits stubbed behind it, waiting on a service worker and a push backend.

The share loop offers, on completing a drop, a flattering card built around the capability just gained ("I just picked up the AI skill your team probably hasn't"), never a streak or a weakness. The recipient taps the single shared link and enters the same onboarding. This is the growth loop (see 12).

### 9.4 What the user learns

The spine of the content is a five-step capability ladder, a real competency map shown as capabilities rather than abstract points.

| Tier | Capability | What the user can now do |
|---|---|---|
| 0, Foundations | Read an AI output critically | Spot a confident-but-wrong line before it ships |
| 1, Prompting (flagship) | Write a prompt that gives context | Turn a vague ask into a brief the model can nail |
| 2, Evaluating | Grade and fix an AI draft | Edit AI output to a standard you would sign your name to |
| 3, Workflows | Chain steps into a mini-workflow | Sequence prompts so AI does a multi-step job |
| 4, Building | Brief an AI to run a task with guardrails | Delegate a repeatable task safely |

Every tier exists for all five personas. The tasks reference the persona's real deliverables, a marketer's launch email, an ops action tracker, an HR policy FAQ, a sales follow-up, a finance variance memo, so the practice always connects to work the user actually does. The three task kinds repeat across every tier. That keeps the grading engine simple, with no new grading code per tier, only new content.

Grading is the biggest technical risk in the full vision. The MVP handles it by shaping tasks so grading is mostly deterministic and always forgiving, with accepted answers known at authoring time. When the product later needs to judge genuinely open answers, the plan is a rubric-guided model call, batched and cached, with a generous bias. When unsure, mark it right and coach. A wrong "wrong" would destroy the credibility the B2B pitch depends on.

### 9.5 MVP scope

Shipped and working: the single spine end to end. Onboarding, the persona video hook, the live awe reveal, five deterministic-graded tasks, the completion moment, the forgiving streak, the capability ladder, the final certificate, the audio path, the in-app notification nudge, the share card, full event instrumentation with a metrics dashboard and CSV or JSON export, and the "Editorial Obsidian" design system. The platform is a text-only responsive web app on a single shareable link, deployed on Vercel.

Cut to a later phase, and documented so scope stays honest: real model-judged grading, real scheduled web or WhatsApp push, an installable offline drop, energy-adaptive "sharp" and "tired" modes, B2B cohort mode, regional vernacular audio, and personas two through five as fully separate tracks. These are real parts of the vision, held back so the graded slice stays small and testable.

### 9.6 Design, briefly

The direction is Editorial Obsidian. A dark, near-black base with layered surfaces. One warm amber accent, used sparingly for streak, progress and primary actions. Light itself acts as the "electric" element in awe moments. The type pairs an expressive serif for the emotional voice with a clean grotesk for everything functional, plus a monospace for the prompt sandbox, so doing real AI work feels real. One signature motion idea, the Bloom, is light arriving out of the dark from a single meaningful point, reused for every reveal so the repetition becomes the brand. Expressive, kinetic type is allowed in the hook and banned in the working tasks, which keeps "cool" from tipping into "toy" for this audience.

### 9.7 Edge cases

| Case | Risk | How the product handles it |
|---|---|---|
| Blocked or dead video embed | The hook screen traps the user | Poster loads first, and a "continue" and an "open on YouTube" option are always present, so the flow proceeds |
| Browser storage blocked | State and logging break the app | All reads and writes are wrapped, logging is best-effort and never throws, and the app keeps working in memory |
| A missed day | A rigid streak breaks and creates guilt | One grace day is forgiven automatically, and a longer gap resets to an encouraging 1, never to 0 |
| Same-day repeat activity | The streak double-counts | The streak stays unchanged on a same-day return, so an audio win followed by the queued task never counts twice |
| Low data or on the move | The user has no free hands or eyes | The audio path delivers the reveal hands-free and queues the task, and one card is a full daily win |
| Low digital comfort | The interface intimidates | One question to start, large tappable chips, no signup to try, plain-language coaching, no jargon |
| Notification permission denied | The nudge cannot reach the user | The in-app nudge still works within a session, and scheduled push is a later, additive layer, not a dependency |

---

## 10. Product & Business Metrics

The north-star metric, aspirational, is weekly tasks completed per active user. It captures both the habit, they came back, and the doing, they practised, and it resists vanity opens.

Activation, measured in the test window, is the share of users who complete their first awe-to-task loop in session one. That is the moment they have personally produced one real thing, and it is the single most important read for the concept.

Retention proxy, measurable inside a four-day window, is D1 return. Did they come back the next day.

The guardrail metrics keep the loop honest.

| Guardrail | Target | Why it matters |
|---|---|---|
| Time-to-first-aha | Under 60 seconds | If the aha is slow, the sceptical, time-poor user leaves before the hook lands |
| Task-abandon rate | Low | A high abandon rate on one card names the exact place to fix |
| Reaches account-save after aha | Directional | Tests willingness to convert once the value is felt |

On the business model, the front door is a B2C subscription. A free tier carries the daily reveal and light practice, the habit hook. Paid carries the full tasks, personalised tracks and "prove it" certification. The margin sits in B2B, teams and L&D buying AI upskilling for a whole group, where cohort mode is the tell. The discipline is to validate willingness to pay with real buyers before building a paywall.

---

## 11. Event-Tracking Plan

Events are logged in funnel order. For a small test there is no backend by design. The logger writes to local storage with a persistent `user_id`, a per-load `session_id`, and a `timestamp` on every event. The metrics dashboard derives the funnel and exports CSV or JSON for the feedback sheet. The schema, as instrumented in `lib/analytics.js`:

`onboarding_started` → `job_selected` → `video_started` → `awe_card_viewed` → `rep_started` → **`rep_completed`** (activation) → `account_created` → `streak_incremented` → `session_completed` → `notification_tapped` → `certificate_earned` → `day2_return`

Plus the drop-off event `rep_abandoned { card_id }`, which pinpoints the exact card a user quits on.

| Event | Meaning | Note |
|---|---|---|
| onboarding_started | App opened, onboarding shown | Top of funnel |
| job_selected | Persona chosen | Tailors all content |
| video_started | Persona video hook played | From the video-first build |
| awe_card_viewed | The day's reveal seen | The hook |
| rep_started | First task begun | Entry to practice |
| **rep_completed** | Hands-on task finished | Activation, the key event |
| account_created | Optional save after the aha | Not wired in the no-signup MVP, a documented gap that stays 0 |
| streak_incremented | Streak advanced | Habit booked |
| session_completed | Completion moment reached | Clean daily end |
| notification_tapped | In-app nudge routed the user back | Now fires via the in-app nudge |
| certificate_earned | All five capabilities complete | End of the ladder |
| day2_return | Genuine later-day return | Retention signal |

The dashboard derives activation rate, D1 return, task-abandon rate, median time-to-first-aha, and tasks per active user straight from this log, so the funnel is readable the moment real users arrive.

---

## 12. Acquisition Strategy & Growth Loop

Acquisition runs on a single shareable web link with no app-store friction. For the test, the target is roughly 10 to 15 mid-career marketers from the founder's personal, LinkedIn and WhatsApp network. Warm, fast, and on-persona. Warm contacts are chosen on purpose, because both reply rate and honest feedback come from people who will actually open the link. The recruiting messages lead with the person and the payoff, "a short daily AI trick for your job, no signup to try," and never with guilt.

The growth loop is the share card from 9.3, a flattering statement of the capability the user just gained. It is meant to be sent to a peer, who taps the same single link and enters onboarding. The founder seeds the loop, and the card is meant to carry it. At 10 to 15 users the loop's virality is not statistically measurable, but it is the mechanism being stubbed and watched for a later, larger test.

---

## 13. Full Funnel

| Stage | Definition | Metric |
|---|---|---|
| Acquire | Clicked the shared link | Number of link opens |
| Activate | Completed the first awe-to-task loop in session one | Activation % |
| Retain | Returned the next day | D1 return % |

On the user-count target: the brief asks for 40 to 50 real users. For a solo build inside the deadline, recruiting from a warm network and watching several users live, the realistic figure is 5 to 15 users with genuine behavioural signal. This document states both. 40 to 50 is the stated ambition and the next step. 5 to 15 is this cycle's honest, end-to-end claim. The case rewards tight, real, end-to-end scope over a bigger number with thinner signal, so the smaller cohort is treated as the deliverable and the larger one as the roadmap.

---

## 14. User-Testing Plan

The test is deliberately simple.

Onboard every user through the one link. Watch three or four of them live, over screen-share or in person, for where they drop off. The instruction to them is "think aloud, and don't be nice." The observer stays quiet and does not rescue anyone. Numbers say where users drop. Watching says why. Let the rest arrive self-serve, with the event funnel (11) carrying the quantitative read. Log one row per user to the Product & Feedback Sheet: source, whether they opened, whether they activated, time-to-aha, where they dropped, one verbatim quote, and whether they came back on D1. The quantitative columns come straight off the dashboard's CSV export.

Status: the app is deployed and fully instrumented. The recruiting messages and the sheet are prepared. The test has not been run yet.

---

## 15. Results & Insights (Pending)

No user data has been collected yet. This section is built and ready. No numbers will be invented. It will be filled from the metrics dashboard and the live watches after the test window.

| Metric | Target (hypothesis) | Actual | n |
|---|---|---|---|
| Link opens to onboarding started | Not set | pending | pending |
| Activation, first awe-to-task loop | About 50% or more | pending | pending |
| Median time-to-first-aha | Under 60s | pending | pending |
| Task-abandon rate | Low | pending | pending |
| D1 return | Directional | pending | pending |

Top behavioural insights: pending. The aim is to capture the one or two clearest patterns, specifically where users drop and what surprised them.

---

## 16. What I Changed Based on Insights (Pending)

To be filled after the test. For each item: the insight drawn from behaviour, the change made in response, and the effect it is expected to have. The structure is kept concrete so every change traces back to a real observation rather than an opinion.

1. Insight, change, expected effect. Pending.
2. Insight, change, expected effect. Pending.

An illustrative example of the intended shape, not a real result: if three of four watched users hesitate on the prompt-build task because "strong" is undefined, the change is a one-line scenario hint above the options, and the expected effect is a lower abandon rate on that card.

---

## 17. Risks, Open Items & Conclusion

### 17.1 Risks and open items

| Risk | Note |
|---|---|
| Grading feel | Deterministic grading has to still feel like real progress, not a quiz (A4). If it reads as a quiz, the fluency claim is hollow |
| Content and awe supply | Perpetually fresh awe that also teaches is the make-or-break operational bet. The plan is five or six reusable "whoa" formats filled by a model-assisted pipeline with a human editor gate |
| Timeline | Solo build, recruit, test and iterate is tight. The priority is a clean activation and D1 signal on a small cohort over feature completeness |
| Register risk | The premium, gamified loop must not tip into "toy" for a status-sensitive audience (A5) |
| B2B willingness to pay | Must be validated with real buyers before a paywall is built |
| Deferred items | Real model grading, scheduled push, offline mode, name and brand identity, and WhatsApp delivery feasibility all sit in the next phase |

### 17.2 Conclusion

The problem is specific and well-evidenced. AI is already inside non-technical work. The skills are being asked for faster than they are taught. And the format most people reach for, content consumed once and abandoned, does not build lasting capability. Current's answer is a change of shape, not a bigger course. Each day it opens with one real "AI can do this" moment in the user's own work, turns that moment into a short hands-on task, and records the habit with a forgiving streak and a real capability ladder. The retention math is borrowed from the best habit apps. The register is deliberately premium and adult, not a toy.

The MVP is built, deployed on a single link, and instrumented against the funnel that matters, link open, activation and D1 return. What remains is the part only real users can supply. Whether the loop actually creates a return habit. Whether the task feels like real doing. Whether the register lands as serious. That test is prepared and pending, and this document is written to be finished by it, not around it.

---

## Sources

1. Microsoft and LinkedIn, 2024 Work Trend Index, "AI at Work Is Here. Now Comes the Hard Part." 75% of knowledge workers use AI at work, and 46% started within six months. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part
2. World Economic Forum, Future of Jobs Report 2025 (press release). 39% of core skills change by 2030, about 59% of workers need reskilling, and 63% of employers cite the skills gap. https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/
3. Duolingo, Inc., Q2 2024 results. 34.1 million daily active users, up 59% year over year, with more than 20% holding streaks over a year. https://investors.duolingo.com/news-releases/news-release-details/duolingo-hits-100m-maus-reports-59-dau-growth-and-41-revenue
4. MIT News, "Study on MOOCs provides new insights on an evolving space." About 5% completion across 17 HarvardX and MITx courses, with most dropping out in the first weeks. https://news.mit.edu/2015/mit-harvard-study-moocs-0401
5. Grand View Research, Corporate E-learning Market Report. Market-size and growth estimates, directional given wide variance across firms. https://www.grandviewresearch.com/industry-analysis/corporate-e-learning-market-report
6. MediaNama, reporting the IAMAI and Kantar Internet in India 2024 report. About 886 million active internet users in 2024, roughly 90 minutes daily, mostly on mobile. https://www.medianama.com/2025/01/223-rural-adoption-ai-india-internet-2024-kantar-iamai-report/
