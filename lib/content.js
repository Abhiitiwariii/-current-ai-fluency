// content.js — the daily "drop" content + capability map.
// Spec alignment: awe opens / action closes (~30/70), job-tailored (§10),
// capabilities-not-XP progression (§11), durable "wow" over ephemeral news (§8).
//
// v2 (2026-08-24): the single drop is now a 5-TIER TRACK — one capability per
// completed drop. Each persona sees persona-flavored reps in every tier, a
// YouTube video hook before the awe, and earns a final AI-Fluency certificate
// after all five capabilities. See getDrop(job, tierIndex).

// The one sharp onboarding question (§10): "what's your job?"
export const JOBS = [
  {
    id: "marketing",
    label: "Marketing & Growth",
    hint: "campaigns, content, positioning",
  },
  {
    id: "ops",
    label: "Operations & Program Mgmt",
    hint: "process, coordination, reporting",
  },
  { id: "hr", label: "HR & People", hint: "hiring, policy, comms" },
  { id: "sales", label: "Sales & Accounts", hint: "outreach, proposals, follow-up" },
  { id: "finance", label: "Finance & Analysis", hint: "models, memos, reviews" },
];

export const DEFAULT_JOB = "marketing";

export function jobLabel(id) {
  return (JOBS.find((j) => j.id === id) || JOBS[0]).label;
}

// The durable capability ladder (§11) — real competency, shown as
// "what you can now do", never abstract XP. ORDER IS THE TRACK ORDER: the daily
// drop advances tier-by-tier through this list (index 0..4).
export const CAPABILITIES = [
  {
    id: "cap-anatomy",
    tier: "Foundations",
    title: "Read an AI output critically",
    blurb: "Spot when AI is confident-but-wrong before you ship it.",
  },
  {
    id: "cap-prompt",
    tier: "Prompting",
    title: "Write a prompt that gives context",
    blurb: "Turn a vague ask into a brief the model can actually nail.",
  },
  {
    id: "cap-evaluate",
    tier: "Evaluating",
    title: "Grade & fix an AI draft",
    blurb: "Edit AI output up to a standard you'd put your name on.",
  },
  {
    id: "cap-workflow",
    tier: "Workflows",
    title: "Chain steps into a mini-workflow",
    blurb: "Sequence prompts so AI does a multi-step job, not one reply.",
  },
  {
    id: "cap-agent",
    tier: "Building",
    title: "Brief an AI to run a task for you",
    blurb: "Delegate a repeatable task with guardrails.",
  },
];

export const TRACK_LENGTH = CAPABILITIES.length;

// ─────────────────────────────────────────────────────────────────────────────
// YouTube video hook — one video PER PERSONA, shown in-screen as the motivating
// hook before the drop.
//
// These are our OWN ~30s explainer clips (produced with the Remotion project in
// /video, uploaded to the project's YouTube channel), so they play full from the
// top (start:0, no end cap). To swap one, set `yt` to the 11-char id (the youtu.be/
// or v=XXXXXXXXXXX part). The VideoHook loads a poster first and always offers a
// "Continue" fallback, so a blocked or dead id never dead-ends the flow.
// ─────────────────────────────────────────────────────────────────────────────
export const VIDEO_BY_JOB = {
  marketing: {
    yt: "2E7_Z4ySxjU",
    start: 0, // our own ~30s clip — play from the top, no end cap
    title: "How marketers are using AI right now",
    caption: "A quick look at what AI actually changes for campaigns — then you try it.",
    search: "AI for marketing prompt engineering",
  },
  ops: {
    yt: "QnI3X4xhx3o",
    start: 0,
    title: "AI for operations & program management",
    caption: "See AI turn coordination chaos into a clean plan — then you try it.",
    search: "AI for operations program management",
  },
  hr: {
    yt: "pYjRKNaDKZU",
    start: 0,
    title: "AI for HR & people teams",
    caption: "How people teams draft policy & comms with AI — then you try it.",
    search: "AI for HR people teams",
  },
  sales: {
    yt: "YvbDq-yUjpU",
    start: 0,
    title: "AI for sales & account teams",
    caption: "Watch AI sharpen outreach and follow-ups — then you try it.",
    search: "AI for sales outreach prompts",
  },
  finance: {
    yt: "jA9Ep6dLEUc",
    start: 0,
    title: "AI for finance & analysis",
    caption: "See AI draft the memo behind the numbers — then you try it.",
    search: "AI for finance analysis prompts",
  },
};

export function videoForJob(jobId) {
  return VIDEO_BY_JOB[jobId] || VIDEO_BY_JOB[DEFAULT_JOB];
}

// Growth-loop shareable achievement (§18). Flatters status via a *capability*
// ("what I can now do") — never a streak or weakness. Carries a curiosity-gap
// hook aimed at a peer so the recipient taps the single shared link → onboards.
export function achievementFor(capabilityId, jobId) {
  const cap = CAPABILITIES.find((c) => c.id === capabilityId) || CAPABILITIES[1];
  return {
    tier: cap.tier,
    title: cap.title, // the flattering "what I can now do"
    blurb: cap.blurb,
    role: jobLabel(jobId),
    hook: "I just picked up the AI skill your team probably hasn’t.",
  };
}

// Job-tailored guided-production rep (§6 atomic rep: mostly-deterministic,
// checkable structure — assemble the prompt from the right components).
const PROMPT_REP_BY_JOB = {
  marketing: {
    task: "Ask AI to write a launch email for a new pricing tier.",
    scenarioHint:
      "A weak prompt = generic email. A strong one gives role, audience, goal, and constraints.",
    // User taps the components that make a strong, context-rich prompt.
    // `keep: true` = belongs in a strong prompt. Order is forgiving; selection is graded.
    options: [
      { id: "a", text: "You are our senior lifecycle marketer.", keep: true },
      { id: "b", text: "Audience: existing users on the free plan.", keep: true },
      { id: "c", text: "Goal: get them to try the new Pro tier this week.", keep: true },
      { id: "d", text: "Just write a good email.", keep: false },
      { id: "e", text: "Keep it under 120 words, one clear CTA.", keep: true },
      { id: "f", text: "Make it very long and formal.", keep: false },
    ],
  },
  ops: {
    task: "Ask AI to turn messy meeting notes into an action tracker.",
    scenarioHint: "Give it the format you want back, or you'll reformat by hand.",
    options: [
      { id: "a", text: "You are my operations chief of staff.", keep: true },
      { id: "b", text: "Input: raw notes I'll paste below.", keep: true },
      { id: "c", text: "Output a table: task, owner, due date, status.", keep: true },
      { id: "d", text: "Do something useful with these notes.", keep: false },
      { id: "e", text: "Flag any item with no owner.", keep: true },
      { id: "f", text: "Write a poem about the meeting.", keep: false },
    ],
  },
  hr: {
    task: "Ask AI to draft a policy FAQ from a new leave policy.",
    scenarioHint: "Constraints and tone matter more than length here.",
    options: [
      { id: "a", text: "You are an HR communications specialist.", keep: true },
      { id: "b", text: "Source: the policy text I'll paste.", keep: true },
      { id: "c", text: "Audience: non-HR employees, plain language.", keep: true },
      { id: "d", text: "Explain the policy somehow.", keep: false },
      { id: "e", text: "Format as 6 Q&A pairs, neutral tone.", keep: true },
      { id: "f", text: "Add your personal opinion on the policy.", keep: false },
    ],
  },
  sales: {
    task: "Ask AI to write a follow-up after a demo went quiet.",
    scenarioHint: "Specifics from the call beat a generic 'just checking in'.",
    options: [
      { id: "a", text: "You are a concise B2B account executive.", keep: true },
      { id: "b", text: "Context: they liked the reporting, feared setup time.", keep: true },
      { id: "c", text: "Goal: book a 20-min technical call.", keep: true },
      { id: "d", text: "Write a follow-up email.", keep: false },
      { id: "e", text: "One paragraph, address the setup fear directly.", keep: true },
      { id: "f", text: "Guilt-trip them for going quiet.", keep: false },
    ],
  },
  finance: {
    task: "Ask AI to draft a variance commentary from the month's numbers.",
    scenarioHint: "Tell it the audience and what 'good' looks like.",
    options: [
      { id: "a", text: "You are a FP&A analyst writing for the CFO.", keep: true },
      { id: "b", text: "Input: the variance table I'll paste.", keep: true },
      { id: "c", text: "Explain only variances above 5%.", keep: true },
      { id: "d", text: "Comment on the numbers.", keep: false },
      { id: "e", text: "3 bullets max, driver + business reason each.", keep: true },
      { id: "f", text: "Invent numbers if any are missing.", keep: false },
    ],
  },
};

// Job-tailored awe framing (§4/§6: lead with a real "whoa", then convert
// THAT awe into the rep — no orphan awe).
const AWE_BY_JOB = {
  marketing: {
    headline: "It rebuilt a full campaign brief in 8 seconds.",
    before: "one line: “launch our new Pro pricing tier”",
    after:
      "a positioning angle, 3 audience segments, an email + 2 ad variants, and a launch checklist",
    // The live "demo": input the user types, then chunks that stream out.
    input: "launch our new Pro pricing tier",
    outputs: [
      "◆ Positioning — “Pro: for teams who outgrew the basics.”",
      "◆ Segment 1 — power users hitting plan limits",
      "◆ Segment 2 — admins managing seats & budget",
      "◆ Segment 3 — free users near the ceiling",
      "✉ Launch email — drafted, one clear CTA",
      "▤ Ad variant A — benefit-led  ·  B — social proof",
      "☑ 6-step launch checklist",
    ],
  },
  ops: {
    headline: "It turned 40 lines of chaos into a clean action tracker.",
    before: "a wall of messy meeting notes",
    after: "an owner-by-owner tracker with due dates and unassigned items flagged",
    input: "[pasted 40 lines of messy meeting notes]",
    outputs: [
      "▤ Building tracker: task · owner · due · status",
      "• Ship pricing page   → Priya   · Fri   · in progress",
      "• Update billing docs → Rahul   · Mon   · not started",
      "• QA checkout flow    → (unassigned) ⚠",
      "• Notify support team → Anita   · Wed   · done",
      "⚠ 1 item has no owner — flagged for you",
    ],
  },
  hr: {
    headline: "It wrote the whole policy FAQ in one pass.",
    before: "a dense 2-page leave policy",
    after: "12 plain-language Q&As employees will actually read",
    input: "[pasted 2-page leave policy]",
    outputs: [
      "Q: How many leave days do I get?",
      "Q: Do unused days carry over?",
      "Q: How much notice for planned leave?",
      "Q: What counts as sick leave?",
      "Q: Who approves my request?",
      "…12 plain-language Q&As, neutral tone ✓",
    ],
  },
  sales: {
    headline: "It saved a deal that had gone silent.",
    before: "“the demo went quiet, help”",
    after: "a sharp follow-up that names their exact objection and asks for the next call",
    input: "they liked reporting, feared setup time — now quiet",
    outputs: [
      "Subject: the setup worry, handled",
      "“You flagged setup time — here’s how we cut it to a day.”",
      "→ Names their exact objection",
      "→ One short paragraph, no guilt-trip",
      "→ Clear ask: a 20-min technical call",
      "✉ Follow-up ready to send",
    ],
  },
  finance: {
    headline: "It drafted the board-ready variance memo instantly.",
    before: "a raw month-end variance table",
    after: "a CFO-toned commentary explaining only what moved, with the business reason",
    input: "[pasted month-end variance table]",
    outputs: [
      "Scanning variances… keeping only those > 5%",
      "• Revenue +8% — enterprise deals closed early",
      "• COGS +6% — freight surcharge, one-off",
      "• Opex −4% — hiring slipped a month",
      "Tone: CFO-ready, 3 bullets, driver + reason",
      "▤ Variance commentary drafted",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Persona nouns used to flavor the four NON-flagship tiers. Keeps per-persona
// reps DRY: author each tier once, inject the persona's real work.
// ─────────────────────────────────────────────────────────────────────────────
const DOMAIN = {
  marketing: { artifact: "launch email", noun: "campaign", audience: "customers" },
  ops: { artifact: "action tracker", noun: "project plan", audience: "stakeholders" },
  hr: { artifact: "policy FAQ", noun: "people comms", audience: "employees" },
  sales: { artifact: "follow-up email", noun: "deal", audience: "the buyer" },
  finance: { artifact: "variance memo", noun: "month-end report", audience: "the CFO" },
};

// Persona-flavored reps for the four non-flagship tiers. Each reuses an existing
// rep KIND (spot-check / prompt-build / assemble) so no new grading is needed.

// TIER 0 — Foundations (cap-anatomy): read an AI output critically.
const FOUNDATIONS_BY_JOB = {
  marketing: {
    verify: [
      { id: "a", text: "“Open rates for this segment average 42%.”", keep: true },
      { id: "b", text: "“A shorter subject line can help.” (general advice)", keep: false },
      { id: "c", text: "“Your competitor cut prices last week.”", keep: true },
      { id: "d", text: "“One clear CTA tends to convert better.”", keep: false },
      { id: "e", text: "“This offer expires Friday.” (a specific claim)", keep: true },
    ],
  },
  ops: {
    verify: [
      { id: "a", text: "“The vendor’s SLA is 4 hours.”", keep: true },
      { id: "b", text: "“Clear owners reduce slippage.” (general)", keep: false },
      { id: "c", text: "“Rahul closed all his tasks Monday.”", keep: true },
      { id: "d", text: "“A status column helps tracking.” (general)", keep: false },
      { id: "e", text: "“The launch date is March 3.” (specific)", keep: true },
    ],
  },
  hr: {
    verify: [
      { id: "a", text: "“Employees get 18 leave days a year.”", keep: true },
      { id: "b", text: "“Plain language improves policy uptake.” (general)", keep: false },
      { id: "c", text: "“Unused days carry over indefinitely.”", keep: true },
      { id: "d", text: "“A neutral tone is best here.” (general)", keep: false },
      { id: "e", text: "“Manager approval is required for leave.” (specific)", keep: true },
    ],
  },
  sales: {
    verify: [
      { id: "a", text: "“Setup takes only one day for this buyer.”", keep: true },
      { id: "b", text: "“Naming the objection builds trust.” (general)", keep: false },
      { id: "c", text: "“They have a 12-person team.”", keep: true },
      { id: "d", text: "“A short email often lands better.” (general)", keep: false },
      { id: "e", text: "“Their contract renews in June.” (specific)", keep: true },
    ],
  },
  finance: {
    verify: [
      { id: "a", text: "“Revenue rose 8% this month.”", keep: true },
      { id: "b", text: "“Explaining drivers aids the reader.” (general)", keep: false },
      { id: "c", text: "“The freight surcharge was one-off.”", keep: true },
      { id: "d", text: "“Three bullets keeps it readable.” (general)", keep: false },
      { id: "e", text: "“Opex fell because hiring slipped a month.” (specific)", keep: true },
    ],
  },
};

// TIER 2 — Evaluating (cap-evaluate): grade & fix an AI draft.
const EVALUATE_BY_JOB = {
  marketing: {
    edits: [
      { id: "a", text: "Add the exact audience the email is for.", keep: true },
      { id: "b", text: "Cut it to one clear CTA.", keep: true },
      { id: "c", text: "Make every sentence longer.", keep: false },
      { id: "d", text: "Replace vague claims with a specific benefit.", keep: true },
      { id: "e", text: "Add three more exclamation marks.", keep: false },
    ],
  },
  ops: {
    edits: [
      { id: "a", text: "Give every task a named owner.", keep: true },
      { id: "b", text: "Add due dates to each row.", keep: true },
      { id: "c", text: "Merge everything into one paragraph.", keep: false },
      { id: "d", text: "Flag items still unassigned.", keep: true },
      { id: "e", text: "Delete the status column.", keep: false },
    ],
  },
  hr: {
    edits: [
      { id: "a", text: "Swap jargon for plain language.", keep: true },
      { id: "b", text: "Add the one number employees ask about most.", keep: true },
      { id: "c", text: "Insert your personal opinion on the policy.", keep: false },
      { id: "d", text: "State clearly who approves requests.", keep: true },
      { id: "e", text: "Double the length for thoroughness.", keep: false },
    ],
  },
  sales: {
    edits: [
      { id: "a", text: "Name their exact objection.", keep: true },
      { id: "b", text: "Cut to one short paragraph.", keep: true },
      { id: "c", text: "Add guilt about going quiet.", keep: false },
      { id: "d", text: "End with one specific ask (a 20-min call).", keep: true },
      { id: "e", text: "List every feature you offer.", keep: false },
    ],
  },
  finance: {
    edits: [
      { id: "a", text: "Keep only variances above the 5% threshold.", keep: true },
      { id: "b", text: "Give each variance a business reason.", keep: true },
      { id: "c", text: "Invent a cause where data is missing.", keep: false },
      { id: "d", text: "Trim to three bullets for the CFO.", keep: true },
      { id: "e", text: "Add a paragraph of general commentary.", keep: false },
    ],
  },
};

// TIER 3 — Workflows (cap-workflow): chain steps into a mini-workflow.
const WORKFLOW_BY_JOB = {
  marketing: [
    { id: "s1", text: "Give AI the audience, goal, and one CTA.", order: 1 },
    { id: "s2", text: "Ask it to draft, then critique its own email.", order: 2 },
    { id: "s3", text: "Have it apply the critique and finalize.", order: 3 },
  ],
  ops: [
    { id: "s1", text: "Paste the notes + the exact table format you want.", order: 1 },
    { id: "s2", text: "Ask it to build the tracker, then flag gaps.", order: 2 },
    { id: "s3", text: "Have it fill owners/dates and finalize.", order: 3 },
  ],
  hr: [
    { id: "s1", text: "Give it the policy + the audience & tone.", order: 1 },
    { id: "s2", text: "Ask it to draft Q&As, then check for jargon.", order: 2 },
    { id: "s3", text: "Have it simplify and finalize the FAQ.", order: 3 },
  ],
  sales: [
    { id: "s1", text: "Give it the call context + the objection.", order: 1 },
    { id: "s2", text: "Ask it to draft, then sharpen the ask.", order: 2 },
    { id: "s3", text: "Have it tighten to one paragraph and finalize.", order: 3 },
  ],
  finance: [
    { id: "s1", text: "Paste the table + the 5% rule and audience.", order: 1 },
    { id: "s2", text: "Ask it to draft, then verify each driver.", order: 2 },
    { id: "s3", text: "Have it trim to 3 bullets and finalize.", order: 3 },
  ],
};

// TIER 4 — Building (cap-agent): brief AI to run a task with guardrails.
const BUILDING_BY_JOB = {
  marketing: {
    guardrails: [
      { id: "a", text: "Only use facts from the brief I paste.", keep: true },
      { id: "b", text: "Stop and ask if a number is missing.", keep: true },
      { id: "c", text: "Never send — draft for my review only.", keep: true },
      { id: "d", text: "Make up stats if it sounds better.", keep: false },
      { id: "e", text: "Do whatever seems on-brand.", keep: false },
    ],
  },
  ops: {
    guardrails: [
      { id: "a", text: "Use only the notes I provide.", keep: true },
      { id: "b", text: "Flag any task with no owner, don’t guess one.", keep: true },
      { id: "c", text: "Output the fixed table format every time.", keep: true },
      { id: "d", text: "Assign owners at random if unsure.", keep: false },
      { id: "e", text: "Reformat however it likes each run.", keep: false },
    ],
  },
  hr: {
    guardrails: [
      { id: "a", text: "Quote only the official policy text.", keep: true },
      { id: "b", text: "Flag anything ambiguous for a human.", keep: true },
      { id: "c", text: "Keep tone neutral, no opinions.", keep: true },
      { id: "d", text: "Guess the rule if the policy is unclear.", keep: false },
      { id: "e", text: "Add legal advice freely.", keep: false },
    ],
  },
  sales: {
    guardrails: [
      { id: "a", text: "Use only facts from the call notes.", keep: true },
      { id: "b", text: "Ask me before promising a timeline.", keep: true },
      { id: "c", text: "Draft only — I approve before it sends.", keep: true },
      { id: "d", text: "Invent a discount to close faster.", keep: false },
      { id: "e", text: "Promise anything the buyer wants.", keep: false },
    ],
  },
  finance: {
    guardrails: [
      { id: "a", text: "Use only numbers from the table I paste.", keep: true },
      { id: "b", text: "Never invent a cause — flag unknowns.", keep: true },
      { id: "c", text: "Apply the 5% threshold every time.", keep: true },
      { id: "d", text: "Estimate missing figures to fill gaps.", keep: false },
      { id: "e", text: "Round however makes it look better.", keep: false },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Extra per-persona specifics for the expanded rep sets (5 reps per tier, v3.1).
// Each new rep reuses an existing rep KIND (spot-check / prompt-build / assemble)
// so no new grading code is needed — only the per-job content grows.
// ─────────────────────────────────────────────────────────────────────────────

// A concrete, checkable claim the AI might slip into the persona's artifact.
const CLAIM_BY_JOB = {
  marketing: "open rates average 42% for this segment",
  ops: "the vendor’s SLA is 4 hours",
  hr: "employees get 18 leave days a year",
  sales: "setup takes just one day for this buyer",
  finance: "revenue rose 8% this month",
};

// The vague ask a rushed teammate might type for this persona's work.
const WEAK_ASK_BY_JOB = {
  marketing: "write a launch email",
  ops: "sort out these notes",
  hr: "explain the new policy",
  sales: "write a follow-up",
  finance: "comment on these numbers",
};

// Tier 1, second prompt-build — a DIFFERENT real deliverable per persona.
const BRIEF2_BY_JOB = {
  marketing: {
    task: "Ask AI to turn one blog post into five on-brand social posts.",
    scenarioHint: "Give it the source, the channels, and the voice — or you’ll get generic filler.",
    options: [
      { id: "a", text: "You are our social lead; keep our dry, confident voice.", keep: true },
      { id: "b", text: "Source: the blog post I’ll paste below.", keep: true },
      { id: "c", text: "5 posts: 2 LinkedIn, 2 X, 1 Instagram caption.", keep: true },
      { id: "d", text: "Write some social posts.", keep: false },
      { id: "e", text: "Each under 220 characters, one idea each.", keep: true },
      { id: "f", text: "Add trending hashtags you make up.", keep: false },
    ],
  },
  ops: {
    task: "Ask AI to draft a weekly status update from this week’s tracker.",
    scenarioHint: "Tell it the audience and the shape, or you’ll rewrite it.",
    options: [
      { id: "a", text: "You are my program manager writing for leadership.", keep: true },
      { id: "b", text: "Input: the tracker rows I’ll paste.", keep: true },
      { id: "c", text: "Structure: done / in progress / blocked / next.", keep: true },
      { id: "d", text: "Give me an update.", keep: false },
      { id: "e", text: "Call out every blocked item and its owner.", keep: true },
      { id: "f", text: "Pad it so it looks like a busy week.", keep: false },
    ],
  },
  hr: {
    task: "Ask AI to write a job description from a role’s key duties.",
    scenarioHint: "Constraints and inclusive language matter more than length.",
    options: [
      { id: "a", text: "You are an HR partner writing an inclusive JD.", keep: true },
      { id: "b", text: "Input: the duties and must-have skills I’ll paste.", keep: true },
      { id: "c", text: "Sections: mission, responsibilities, requirements.", keep: true },
      { id: "d", text: "Write a job post.", keep: false },
      { id: "e", text: "Neutral, bias-free language; no age or gender cues.", keep: true },
      { id: "f", text: "Invent a salary range if none is given.", keep: false },
    ],
  },
  sales: {
    task: "Ask AI to write a cold intro to a new prospect.",
    scenarioHint: "A specific reason to reach out beats a generic pitch.",
    options: [
      { id: "a", text: "You are a concise B2B rep; no fluff.", keep: true },
      { id: "b", text: "Context: their team just doubled headcount.", keep: true },
      { id: "c", text: "Goal: earn a 15-minute intro call.", keep: true },
      { id: "d", text: "Write a sales email.", keep: false },
      { id: "e", text: "Under 90 words, one clear ask.", keep: true },
      { id: "f", text: "Claim we’re the #1 tool in the market.", keep: false },
    ],
  },
  finance: {
    task: "Ask AI to summarize a budget for a non-finance team.",
    scenarioHint: "Tell it the reader and the level, or it’ll stay in jargon.",
    options: [
      { id: "a", text: "You are an FP&A analyst writing for a product team.", keep: true },
      { id: "b", text: "Input: the budget table I’ll paste.", keep: true },
      { id: "c", text: "Plain language: what we can spend and where.", keep: true },
      { id: "d", text: "Summarize the budget.", keep: false },
      { id: "e", text: "Flag the two biggest line items.", keep: true },
      { id: "f", text: "Round numbers however looks cleanest.", keep: false },
    ],
  },
};

// Tier 2, second prompt-build — a different quality dimension (accuracy / fit).
const EVAL2_BY_JOB = {
  marketing: {
    task: "Second pass on an AI launch email — which fixes make it accurate and on-voice? Tap them.",
    scenarioHint: "Keep fixes that check facts or match the brand. Drop cosmetic ones.",
    edits: [
      { id: "a", text: "Verify every stat against real data.", keep: true },
      { id: "b", text: "Match our actual brand voice, not hype.", keep: true },
      { id: "c", text: "Add more adjectives everywhere.", keep: false },
      { id: "d", text: "Cut any claim we can’t back up.", keep: true },
      { id: "e", text: "Make the subject line ALL CAPS.", keep: false },
    ],
  },
  ops: {
    task: "Second pass on an AI status update — which fixes make it trustworthy? Tap them.",
    scenarioHint: "Keep fixes that verify or clarify. Drop the ones that pad.",
    edits: [
      { id: "a", text: "Confirm each status against the tracker.", keep: true },
      { id: "b", text: "State the real blocker, not a vague ‘delayed’.", keep: true },
      { id: "c", text: "Add optimistic spin to blocked items.", keep: false },
      { id: "d", text: "Name the owner for every open item.", keep: true },
      { id: "e", text: "Repeat the summary at the top and bottom.", keep: false },
    ],
  },
  hr: {
    task: "Second pass on an AI policy FAQ — which fixes make it correct and fair? Tap them.",
    scenarioHint: "Keep fixes that check the policy or tone. Drop the rest.",
    edits: [
      { id: "a", text: "Match every answer to the official policy text.", keep: true },
      { id: "b", text: "Keep the tone neutral and non-judgmental.", keep: true },
      { id: "c", text: "Add your own take on the policy.", keep: false },
      { id: "d", text: "Remove any rule the policy doesn’t state.", keep: true },
      { id: "e", text: "Make it sound formal with legalese.", keep: false },
    ],
  },
  sales: {
    task: "Second pass on an AI follow-up — which fixes make it honest and sharp? Tap them.",
    scenarioHint: "Keep fixes that stay truthful and specific. Drop the puffery.",
    edits: [
      { id: "a", text: "Only promise what we can actually deliver.", keep: true },
      { id: "b", text: "Reference the exact thing they cared about.", keep: true },
      { id: "c", text: "Add a fake deadline to force a reply.", keep: false },
      { id: "d", text: "Cut any feature they never asked about.", keep: true },
      { id: "e", text: "Flatter them for two more sentences.", keep: false },
    ],
  },
  finance: {
    task: "Second pass on an AI variance memo — which fixes make it defensible? Tap them.",
    scenarioHint: "Keep fixes that verify numbers or drivers. Drop the filler.",
    edits: [
      { id: "a", text: "Tie every figure back to the source table.", keep: true },
      { id: "b", text: "Give each variance a real, checkable driver.", keep: true },
      { id: "c", text: "Estimate a cause where data is missing.", keep: false },
      { id: "d", text: "Drop variances under the 5% threshold.", keep: true },
      { id: "e", text: "Add a general note about ‘market conditions’.", keep: false },
    ],
  },
};

// Tier 3, second assemble — a different 3-step chain (research → draft → verify).
const WORKFLOW2_BY_JOB = {
  marketing: [
    { id: "t1", text: "Have AI pull the key points from the source material.", order: 1 },
    { id: "t2", text: "Ask it to draft the campaign copy from those points.", order: 2 },
    { id: "t3", text: "Have it fact-check each claim before you ship.", order: 3 },
  ],
  ops: [
    { id: "t1", text: "Have AI extract tasks and owners from the notes.", order: 1 },
    { id: "t2", text: "Ask it to build the plan from that list.", order: 2 },
    { id: "t3", text: "Have it flag gaps and conflicts before you send.", order: 3 },
  ],
  hr: [
    { id: "t1", text: "Have AI pull the relevant rules from the policy.", order: 1 },
    { id: "t2", text: "Ask it to draft the comms from those rules.", order: 2 },
    { id: "t3", text: "Have it check each line against the policy.", order: 3 },
  ],
  sales: [
    { id: "t1", text: "Have AI summarize the account’s notes and needs.", order: 1 },
    { id: "t2", text: "Ask it to draft the outreach from that summary.", order: 2 },
    { id: "t3", text: "Have it verify every claim before it goes out.", order: 3 },
  ],
  finance: [
    { id: "t1", text: "Have AI pull the numbers that moved from the data.", order: 1 },
    { id: "t2", text: "Ask it to draft the commentary on those numbers.", order: 2 },
    { id: "t3", text: "Have it check each figure against the source.", order: 3 },
  ],
};

// Build a spot-check rep (shared skill, one persona noun injected).
function spotCheck(prompt, options, answerId, coachRight, coachWrong) {
  return { kind: "spot-check", prompt, options, answerId, coachRight, coachWrong };
}

// Assemble the tier drop for a given job + tier index (0..4).
export function getDrop(jobId, tierIndex = 0) {
  const job = jobId && DOMAIN[jobId] ? jobId : DEFAULT_JOB;
  const idx = Math.max(0, Math.min(TRACK_LENGTH - 1, tierIndex | 0));
  const cap = CAPABILITIES[idx];
  const d = DOMAIN[job];
  const video = videoForJob(job);

  // ── Flagship tier: Prompting (index 1) — keeps the rich streaming demo. ──
  if (idx === 1) {
    const awe = AWE_BY_JOB[job];
    const promptRep = PROMPT_REP_BY_JOB[job];
    return {
      id: "drop-tier1-prompt",
      job,
      tierIndex: idx,
      dateLabel: "Today’s drop",
      theme: "Prompting with context",
      capabilityId: cap.id,
      video,
      audio: {
        durationHint: "≈ 70 sec",
        lines: [
          "Today, one idea that changes how AI works for you: context.",
          awe.headline,
          `You gave it ${awe.before}.`,
          `It handed back ${awe.after}.`,
          "The difference wasn’t a smarter model. It was a smarter ask.",
          "A weak prompt gets a generic answer. A strong one tells the AI who to be, who it’s for, the goal, and the limits.",
          "That’s the whole skill — and it’s the one thing that makes everything else with AI work.",
          "You just earned today’s streak. When you’re stopped and have both hands, try it yourself — build the prompt.",
        ],
      },
      awe: {
        kind: "awe",
        headline: awe.headline,
        before: awe.before,
        after: awe.after,
        input: awe.input,
        outputs: awe.outputs,
        turn: "You just watched it. Now you make it obey — build the prompt yourself.",
      },
      reps: [
        spotCheck(
          "Quick one: what makes AI output unreliable most often?",
          [
            { id: "a", text: "It gets tired late in the day" },
            { id: "b", text: "It states wrong things with full confidence" },
            { id: "c", text: "It refuses to answer anything hard" },
          ],
          "b",
          "Exactly — confident-but-wrong is the trap. That’s why you’ll always sanity-check.",
          "Close, but the real risk is confidence: AI can be fluent and wrong at once. Always sanity-check."
        ),
        {
          kind: "prompt-build",
          task: promptRep.task,
          scenarioHint: promptRep.scenarioHint,
          options: promptRep.options,
          coachRight:
            "That’s a prompt with a job to do — role, audience, goal, and constraints. The vague and silly bits are gone.",
          coachWrong:
            "You’re close. A strong prompt keeps the specifics (role, audience, goal, constraints) and drops the vague or off-task lines.",
        },
        spotCheck(
          `A teammate’s prompt for your ${d.artifact} is just “${WEAK_ASK_BY_JOB[job]}.” The one upgrade that helps most?`,
          [
            { id: "a", text: "Ask it more politely" },
            { id: "b", text: "Add who it’s for, the goal, and the limits" },
            { id: "c", text: "Tell it to just write more" },
          ],
          "b",
          "Right — context (audience, goal, limits) is the upgrade. Politeness and length don’t move quality.",
          "Not quite — manners and word count don’t help. Context does: who it’s for, the goal, the constraints."
        ),
        {
          kind: "prompt-build",
          task: BRIEF2_BY_JOB[job].task,
          scenarioHint: BRIEF2_BY_JOB[job].scenarioHint,
          options: BRIEF2_BY_JOB[job].options,
          coachRight:
            "That’s a real brief — role, source, format, and limits. The AI has everything it needs to nail it.",
          coachWrong:
            "Close. Keep the lines that give real context (role, source, format, constraints); drop the vague ask and the invented bits.",
        },
        {
          kind: "assemble",
          task: "Put a 3-step ‘AI does the whole task’ workflow in order.",
          scenarioHint: "One good reply is nice. A sequence gets real work done.",
          steps: [
            { id: "s1", text: "Give AI the context + the exact output format", order: 1 },
            { id: "s2", text: "Ask it to draft, then critique its own draft", order: 2 },
            { id: "s3", text: "Have it apply its critique and finalize", order: 3 },
          ],
          coachRight:
            "That’s a workflow, not a wish — context in, self-critique, then a cleaned final. This is how pros get quality.",
          coachWrong:
            "Almost. The reliable order is: set it up → draft + self-critique → finalize. Setup first, polish last.",
        },
      ],
    };
  }

  // ── Tier 0 — Foundations: read an AI output critically. ──
  if (idx === 0) {
    return {
      id: "drop-tier0-anatomy",
      job,
      tierIndex: idx,
      dateLabel: "Today’s drop",
      theme: "Reading AI critically",
      capabilityId: cap.id,
      video,
      audio: {
        durationHint: "≈ 45 sec",
        lines: [
          "Today: the skill under every other AI skill — reading its output critically.",
          `AI just wrote a flawless-looking ${d.artifact} — with one invented fact buried inside.`,
          "The danger isn’t that AI is wrong. It’s that it’s wrong and confident.",
          "You’ll learn to spot the checkable claims — the specific numbers, names and dates — and verify those before anything ships.",
        ],
      },
      awe: {
        kind: "awe",
        headline: `It wrote a flawless-looking ${d.artifact} — with one invented fact.`,
        after: `The words were perfect. One number wasn’t real. Today you learn to catch the confident-but-wrong line before it ships to ${d.audience}.`,
        turn: "The eye slides right past it. Let’s train yours to stop.",
      },
      reps: [
        spotCheck(
          `In an AI-written ${d.artifact}, which line should you never trust without checking?`,
          [
            { id: "a", text: "A general best-practice tip" },
            { id: "b", text: "A specific number, name, or date it states" },
            { id: "c", text: "A polite closing line" },
          ],
          "b",
          "Right — specifics (numbers, names, dates) are where AI invents. Verify those; the generic advice is low-risk.",
          "Not quite — the risk lives in the specifics: numbers, names, dates. Those are what you verify."
        ),
        {
          kind: "prompt-build",
          task: `This AI ${d.artifact} has five lines. Tap the ones you MUST verify before it goes out.`,
          scenarioHint: "Checkable specifics need verifying. General advice doesn’t.",
          options: FOUNDATIONS_BY_JOB[job].verify,
          coachRight:
            "Exactly — you flagged the checkable claims and left the generic advice alone. That’s critical reading.",
          coachWrong:
            "Close. Verify the specific, checkable claims (numbers, names, dates); the general advice isn’t what trips you up.",
        },
        spotCheck(
          `Your AI ${d.artifact} states: “${CLAIM_BY_JOB[job]}.” What do you do before it reaches ${d.audience}?`,
          [
            { id: "a", text: "Ship it — it reads confidently" },
            { id: "b", text: "Verify that claim against a real source first" },
            { id: "c", text: "Delete every number just to be safe" },
          ],
          "b",
          "Right — a confident specific is what you verify, not what you blindly trust or gut out.",
          "Neither trust it nor strip it — verify that one specific claim against a real source, then decide."
        ),
        {
          kind: "assemble",
          task: `Put the ‘check before you ship’ habit in order for an AI ${d.artifact}.`,
          scenarioHint: "Read first. Verify before it leaves your hands.",
          steps: [
            { id: "s1", text: "Read the draft once, looking for specific claims", order: 1 },
            { id: "s2", text: "Flag every number, name, and date it states", order: 2 },
            { id: "s3", text: "Verify each flag against a real source, then ship", order: 3 },
          ],
          coachRight:
            "That’s the habit — read, flag the specifics, verify, then ship. It becomes automatic fast.",
          coachWrong:
            "Almost. Read for claims → flag the specifics → verify → ship. Catching them comes before checking them.",
        },
        {
          kind: "prompt-build",
          task: `Which habits keep a confident-but-wrong ${d.artifact} from reaching ${d.audience}? Tap the good ones.`,
          scenarioHint: "Keep the habits that check. Drop the ones that just trust.",
          options: [
            { id: "a", text: "Check specifics against a source you trust", keep: true },
            { id: "b", text: "Ask the AI which lines it’s unsure about", keep: true },
            { id: "c", text: "Assume it’s right when it reads well", keep: false },
            { id: "d", text: "Flag any claim you can’t verify", keep: true },
            { id: "e", text: "Trust newer-sounding facts automatically", keep: false },
          ],
          coachRight:
            "That’s a reader who catches the confident-but-wrong line — you check and flag instead of trusting the fluency.",
          coachWrong:
            "Close. The habits that protect you check and flag specifics; trusting fluent or ‘newer’ text is how the wrong line slips through.",
        },
      ],
    };
  }

  // ── Tier 2 — Evaluating: grade & fix an AI draft. ──
  if (idx === 2) {
    return {
      id: "drop-tier2-evaluate",
      job,
      tierIndex: idx,
      dateLabel: "Today’s drop",
      theme: "Grading & fixing a draft",
      capabilityId: cap.id,
      video,
      audio: {
        durationHint: "≈ 45 sec",
        lines: [
          "Today: how to take a mediocre AI draft and make it sign-off ready.",
          `A middling ${d.artifact} became something you’d put your name on — in three edits.`,
          "The trick isn’t rewriting. It’s knowing the few edits that actually raise quality.",
          "Add the missing specifics, cut to one clear point, and hold it to a real standard.",
        ],
      },
      awe: {
        kind: "awe",
        headline: `A mediocre ${d.artifact} became sign-off ready in 3 edits.`,
        after: `Not a rewrite — three targeted edits that lift any AI draft to a standard you’d hand ${d.audience}.`,
        turn: "You don’t rewrite AI. You grade it and fix the few things that matter.",
      },
      reps: [
        spotCheck(
          "What’s the fastest way to raise an AI draft’s quality?",
          [
            { id: "a", text: "Ask it to “make it better”" },
            { id: "b", text: "Give it a concrete standard and the specifics it’s missing" },
            { id: "c", text: "Make it longer" },
          ],
          "b",
          "Yes — a concrete standard + the missing specifics is what moves quality. “Make it better” gives it nothing to aim at.",
          "Not quite — vague asks like “make it better” or “longer” don’t help. Give it a standard and the missing specifics."
        ),
        {
          kind: "prompt-build",
          task: `Which changes actually raise this ${d.artifact} to a standard you’d sign? Tap them.`,
          scenarioHint: "Keep the edits that add specifics or focus. Drop the ones that pad or distort.",
          options: EVALUATE_BY_JOB[job].edits,
          coachRight:
            "That’s grading, not guessing — you kept the edits that add specifics and focus, and dropped the padding.",
          coachWrong:
            "Close. The edits that help add real specifics or sharpen focus; length and filler don’t raise the bar.",
        },
        spotCheck(
          `You get an AI ${d.artifact} to review. Your first move to grade it well?`,
          [
            { id: "a", text: "Rewrite it from scratch in your own words" },
            { id: "b", text: "Hold it against the standard you’d put your name on" },
            { id: "c", text: "Add a few more lines to be safe" },
          ],
          "b",
          "Right — grade against a real standard first; that tells you the few edits that matter. Rewriting wastes the draft.",
          "Not quite — don’t rewrite or pad blindly. Start from the standard you’d sign off on, then fix to reach it."
        ),
        {
          kind: "assemble",
          task: `Order the grade-and-fix loop for an AI ${d.artifact}.`,
          scenarioHint: "Set the bar first. Fix to reach it.",
          steps: [
            { id: "s1", text: `Name the standard it has to hit for ${d.audience}`, order: 1 },
            { id: "s2", text: "Mark the exact lines that fall short", order: 2 },
            { id: "s3", text: "Give AI those fixes and re-check against the bar", order: 3 },
          ],
          coachRight:
            "That’s grading, not rewriting — set the bar, mark the misses, fix, re-check. Fast and repeatable.",
          coachWrong:
            "Almost. Set the standard → mark what misses it → fix and re-check. The bar comes before the fixes.",
        },
        {
          kind: "prompt-build",
          task: EVAL2_BY_JOB[job].task,
          scenarioHint: EVAL2_BY_JOB[job].scenarioHint,
          options: EVAL2_BY_JOB[job].edits,
          coachRight:
            "That’s a second pass that matters — you kept the fixes that verify facts and fit, and dropped the cosmetic noise.",
          coachWrong:
            "Close. Keep the fixes that check accuracy or fit the standard; cosmetic changes don’t make it sign-off ready.",
        },
      ],
    };
  }

  // ── Tier 3 — Workflows: chain steps into a mini-workflow. ──
  if (idx === 3) {
    return {
      id: "drop-tier3-workflow",
      job,
      tierIndex: idx,
      dateLabel: "Today’s drop",
      theme: "Chaining a mini-workflow",
      capabilityId: cap.id,
      video,
      audio: {
        durationHint: "≈ 45 sec",
        lines: [
          "Today: stop asking AI for one reply. Give it a workflow.",
          `It ran your ${d.noun} as a 3-step job — set up, draft-and-critique, finalize.`,
          "Each step is checkable, so the final output is far better than one big ask.",
          "Setup first, self-critique in the middle, clean final last.",
        ],
      },
      awe: {
        kind: "awe",
        headline: `It ran your ${d.noun} end to end — not one reply, a sequence.`,
        after: `Set up → draft & self-critique → finalize. Each step checkable, the ${d.artifact} far better than a single ask.`,
        turn: "One reply is a wish. A sequence is a workflow. Put it in order.",
      },
      reps: [
        spotCheck(
          "Why chain prompts instead of one big ask?",
          [
            { id: "a", text: "It uses fewer words" },
            { id: "b", text: "Each step is checkable, so quality compounds" },
            { id: "c", text: "AI prefers short prompts" },
          ],
          "b",
          "Exactly — breaking it into checkable steps is why the final result beats one giant prompt.",
          "Not quite — it’s about checkable steps. Each stage you can verify makes the final output better."
        ),
        {
          kind: "assemble",
          task: `Put this 3-step ${d.noun} workflow in order.`,
          scenarioHint: "Set it up first. Polish last.",
          steps: WORKFLOW_BY_JOB[job],
          coachRight:
            "That’s a workflow, not a wish — setup, self-critique, then a cleaned final.",
          coachWrong:
            "Almost. The reliable order is set it up → draft + self-critique → finalize. Setup first, polish last.",
        },
        {
          kind: "prompt-build",
          task: `Which moves make your ${d.noun} a real workflow, not one big ask? Tap the good ones.`,
          scenarioHint: "Keep the moves that add structure and checks. Drop the shortcuts.",
          options: [
            { id: "a", text: "Give context + the exact output format first", keep: true },
            { id: "b", text: "Have AI critique its own draft", keep: true },
            { id: "c", text: "Check each step before moving to the next", keep: true },
            { id: "d", text: "Ask for everything in one giant prompt", keep: false },
            { id: "e", text: "Skip straight to the final version", keep: false },
          ],
          coachRight:
            "That’s the workflow mindset — set up, self-critique, verify each step. Structure is what makes it reliable.",
          coachWrong:
            "Close. A workflow adds structure and checks between steps; one giant ask or skipping ahead is what you’re replacing.",
        },
        spotCheck(
          "What makes a workflow step worth having?",
          [
            { id: "a", text: "It’s short" },
            { id: "b", text: "You can check its output before the next step" },
            { id: "c", text: "It uses a brand-new prompt each time" },
          ],
          "b",
          "Right — a step earns its place when you can verify it before moving on. That’s what compounds quality.",
          "Not quite — length or novelty isn’t the point. A good step is one you can check before the next runs."
        ),
        {
          kind: "assemble",
          task: `Order this research → draft → verify chain for your ${d.noun}.`,
          scenarioHint: "Gather first, draft from it, verify last.",
          steps: WORKFLOW2_BY_JOB[job],
          coachRight:
            "That’s the pattern — pull the facts, draft from them, verify before it ships. Each step feeds the next.",
          coachWrong:
            "Almost. Gather the inputs → draft from them → verify. You can’t draft from facts you haven’t pulled yet.",
        },
      ],
    };
  }

  // ── Tier 4 — Building: brief AI to run a task with guardrails. ──
  return {
    id: "drop-tier4-agent",
    job,
    tierIndex: idx,
    dateLabel: "Today’s drop",
    theme: "Delegating with guardrails",
    capabilityId: cap.id,
    video,
    audio: {
      durationHint: "≈ 45 sec",
      lines: [
        "Today, the top of the ladder: hand a recurring task to AI — safely.",
        `It ran your ${d.noun} with guardrails. You just reviewed the result.`,
        "Delegation is safe when the rules are explicit: use only my data, flag what’s unclear, draft for my review.",
        "That’s the difference between a helper and a loose cannon.",
      ],
    },
    awe: {
      kind: "awe",
      headline: `It ran your recurring ${d.noun} — with guardrails you set.`,
      after: `Use only my data · flag anything unclear · draft for review, never send. You reviewed; it did the work for ${d.audience}.`,
      turn: "Delegation without guardrails is a gamble. Choose the rules that make it safe.",
    },
    reps: [
      spotCheck(
        "What makes it safe to let AI run a task for you?",
        [
          { id: "a", text: "Trusting it to figure things out" },
          { id: "b", text: "Explicit guardrails + a human review step" },
          { id: "c", text: "Giving it more freedom each time" },
        ],
        "b",
        "Right — clear guardrails and a review step are what make delegation safe, not blind trust.",
        "Not quite — safety comes from explicit guardrails and a review step, not from giving AI more freedom."
      ),
      {
        kind: "prompt-build",
        task: `Which guardrails make it safe to let AI run your ${d.noun}? Tap them.`,
        scenarioHint: "Keep the rules that constrain and flag. Drop the ones that invite it to improvise.",
        options: BUILDING_BY_JOB[job].guardrails,
        coachRight:
          "That’s a safe brief — constrained to your data, flags the unknowns, and you review before anything ships.",
        coachWrong:
          "Close. Safe delegation constrains AI to your data, makes it flag unknowns, and keeps you in the loop — not improvise.",
      },
      spotCheck(
        `When should AI running your ${d.noun} stop and check with you?`,
        [
          { id: "a", text: "Never — let it finish, then look" },
          { id: "b", text: "Whenever it hits missing data or a judgment call" },
          { id: "c", text: "Only if it throws an error" },
        ],
        "b",
        "Right — the stop-and-ask rule fires on missing data and judgment calls, exactly where a wrong guess costs you.",
        "Not quite — waiting till the end (or only on errors) lets bad guesses through. Have it stop on missing data or judgment calls."
      ),
      {
        kind: "assemble",
        task: `Order how you set up a safe AI task for your ${d.noun}.`,
        scenarioHint: "Rules first. Trust it only after you’ve seen it work.",
        steps: [
          { id: "s1", text: "Write the rules: use only my data, flag unknowns, draft only", order: 1 },
          { id: "s2", text: "Run it once on a real example", order: 2 },
          { id: "s3", text: "Review the output before you rely on it", order: 3 },
        ],
        coachRight:
          "That’s safe delegation — rules, a test run, then review. You earn trust in the task before you lean on it.",
        coachWrong:
          "Almost. Set the rules → test on one real case → review. The guardrails come before you ever run it.",
      },
      {
        kind: "prompt-build",
        task: `What goes in the brief so AI can run your ${d.noun} safely? Tap the essentials.`,
        scenarioHint: "Keep what constrains and clarifies. Drop what hands over control.",
        options: [
          { id: "a", text: "The exact inputs it may use", keep: true },
          { id: "b", text: "What to do when something’s missing", keep: true },
          { id: "c", text: "The output format it must follow every time", keep: true },
          { id: "d", text: "A ‘draft only, never send’ rule", keep: true },
          { id: "e", text: "Freedom to improvise when unsure", keep: false },
        ],
        coachRight:
          "That’s a brief you can trust — inputs bounded, gaps flagged, format fixed, and nothing ships without you.",
        coachWrong:
          "Close. The essentials constrain and clarify — bounded inputs, a rule for gaps, a fixed format, human review. Improvising is the opposite.",
      },
    ],
  };
}

// Certificate data (v2 Q4) — earned after all five capabilities. Frames the win
// as "what you can now do", never "you were here N days".
export function certificateData(account, job) {
  return {
    name: (account && account.name) || "AI-Fluent Professional",
    role: jobLabel(job),
    dateLabel: new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    capabilities: CAPABILITIES.map((c) => ({ tier: c.tier, title: c.title })),
  };
}
