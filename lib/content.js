// content.js — the daily "drop" content + capability map.
// Spec alignment: awe opens / action closes (~30/70), job-tailored (§10),
// capabilities-not-XP progression (§11), durable "wow" over ephemeral news (§8).

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
// "what you can now do", never abstract XP.
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
    hook: "I just picked up the 90-second AI skill your team probably hasn’t.",
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

// Today's bounded daily drop (§6): awe -> spot-check warm-up -> guided rep -> assemble.
export function getDrop(jobId) {
  const job = jobId && PROMPT_REP_BY_JOB[jobId] ? jobId : DEFAULT_JOB;
  const awe = AWE_BY_JOB[job];
  const promptRep = PROMPT_REP_BY_JOB[job];

  return {
    id: "drop-2026-08-22",
    dateLabel: "Today’s drop",
    theme: "Prompting with context",
    capabilityId: "cap-prompt", // capability this drop unlocks
    // §13.1 commute/audio mode: a ~70-second hands-free narration of the "whoa".
    // Kept in short lines so a screen-free listen still shows a readable transcript.
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
      {
        kind: "spot-check",
        prompt:
          "Quick one: what makes AI output unreliable most often?",
        options: [
          { id: "a", text: "It gets tired late in the day" },
          { id: "b", text: "It states wrong things with full confidence" },
          { id: "c", text: "It refuses to answer anything hard" },
        ],
        answerId: "b",
        coachRight: "Exactly — confident-but-wrong is the trap. That’s why you’ll always sanity-check.",
        coachWrong:
          "Close, but the real risk is confidence: AI can be fluent and wrong at once. Always sanity-check.",
      },
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
      {
        kind: "assemble",
        task: "Put a 3-step ‘AI does the whole task’ workflow in order.",
        scenarioHint: "One good reply is nice. A sequence gets real work done.",
        // Correct order is by `order`; user drags/taps into order. Forgiving grade.
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
