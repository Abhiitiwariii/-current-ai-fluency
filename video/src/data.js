// Per-persona explainer scripts. Mirrors the app's awe framing (lib/content.js)
// so the videos match the product: a real "before", the AI transform streaming
// out, then the payoff. 60s @ 30fps.

export const BRAND = {
  obsidian: "#12100c",
  panel: "#1a1712",
  amber: "#f5a623",
  cream: "#f4efe6",
  creamSoft: "rgba(244,239,230,0.62)",
};

// Shared closing call-to-action — drives to the app's first drop.
export const CTA = {
  line: "Now learn to do it yourself.",
  sub: "Open Current → tap “Start today’s drop.”",
  feedback: "Then tell us what you think — tap “Feedback.”",
};

// `proof` = an illustrative real-world outcome (kept generic — a solo operator /
// small team — rather than a fabricated named company's stat).
export const PERSONAS = {
  marketing: {
    role: "Marketing & Growth",
    problem: "A full launch brief. From a blank page.",
    problemTime: "~40 minutes",
    input: "launch our new Pro pricing tier",
    outputs: [
      "Positioning angle",
      "3 audience segments",
      "Launch email + 2 ad variants",
      "6-step launch checklist",
    ],
    payoff: "8 seconds — made on command.",
    proofWho: "A solo marketer",
    proof: "now ships a full launch in a day — not a week.",
  },
  ops: {
    role: "Operations & Program Mgmt",
    problem: "Messy notes into a clean action tracker.",
    problemTime: "~30 minutes",
    input: "[40 lines of messy meeting notes]",
    outputs: [
      "Task · owner · due · status",
      "Owners + due dates filled in",
      "Unassigned items flagged",
      "Ready to share",
    ],
    payoff: "One pass — made on command.",
    proofWho: "A small ops team",
    proof: "cut weekly reporting from hours to minutes.",
  },
  hr: {
    role: "HR & People",
    problem: "A dense policy into a plain-language FAQ.",
    problemTime: "~45 minutes",
    input: "[2-page leave policy]",
    outputs: [
      "12 plain-language Q&As",
      "Neutral, non-judgmental tone",
      "The numbers people ask about",
      "Ready for the whole team",
    ],
    payoff: "One pass — made on command.",
    proofWho: "One HR lead",
    proof: "turns any policy into a clear FAQ in minutes.",
  },
  sales: {
    role: "Sales & Accounts",
    problem: "A follow-up after the demo went quiet.",
    problemTime: "the deal on the line",
    input: "they liked reporting, feared setup — now quiet",
    outputs: [
      "Names their exact objection",
      "One short paragraph, no guilt-trip",
      "Clear ask: a 20-min call",
      "Ready to send",
    ],
    payoff: "Deal saved — made on command.",
    proofWho: "A solo founder",
    proof: "revives quiet deals with follow-ups that land.",
  },
  finance: {
    role: "Finance & Analysis",
    problem: "A board-ready memo from raw variance data.",
    problemTime: "~35 minutes",
    input: "[month-end variance table]",
    outputs: [
      "Only variances above 5%",
      "A driver for each",
      "CFO-ready tone, 3 tight bullets",
      "Commentary drafted",
    ],
    payoff: "Instant — made on command.",
    proofWho: "An analyst",
    proof: "drafts board-ready commentary in minutes, not hours.",
  },
};

export const JOB_ORDER = ["marketing", "ops", "hr", "sales", "finance"];
