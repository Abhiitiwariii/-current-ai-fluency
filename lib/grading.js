// grading.js — deterministic, forgiving grading (spec §9).
// "Constrain the rep so grading is mostly deterministic... when unsure, mark right and coach.
//  Never punish a plausible answer." No LLM needed for these rep shapes.

// spot-check: single correct option.
export function gradeSpotCheck(rep, selectedId) {
  const correct = selectedId === rep.answerId;
  return {
    correct,
    coach: correct ? rep.coachRight : rep.coachWrong,
  };
}

// prompt-build: user selects the components that belong in a strong prompt.
// Forgiving rule: right if they kept a clear majority of the good ones AND
// avoided most of the bad ones. One slip does not "fail" them (§5: coach, not punish).
export function gradePromptBuild(rep, selectedIds) {
  const selected = new Set(selectedIds);
  const good = rep.options.filter((o) => o.keep);
  const bad = rep.options.filter((o) => !o.keep);

  const goodKept = good.filter((o) => selected.has(o.id)).length;
  const badKept = bad.filter((o) => selected.has(o.id)).length;

  // Deterministic, generous threshold.
  const keptEnoughGood = goodKept >= Math.ceil(good.length * 0.75);
  const avoidedBad = badKept === 0;
  const correct = keptEnoughGood && avoidedBad;

  let coach = rep.coachRight;
  if (!correct) {
    if (badKept > 0) {
      coach =
        "You kept a line that weakens the prompt (vague or off-task). Drop those, keep the specifics.";
    } else {
      coach = rep.coachWrong;
    }
  }
  return { correct, coach, goodKept, goodTotal: good.length, badKept };
}

// assemble: user orders the steps. Forgiving: exact order is best, but we
// grade by "is each step in a sensible relative position" and coach otherwise.
export function gradeAssemble(rep, orderedIds) {
  const correctOrder = [...rep.steps]
    .sort((a, b) => a.order - b.order)
    .map((s) => s.id);
  const exact =
    orderedIds.length === correctOrder.length &&
    orderedIds.every((id, i) => id === correctOrder[i]);
  return {
    correct: exact,
    coach: exact ? rep.coachRight : rep.coachWrong,
  };
}

export function gradeRep(rep, answer) {
  switch (rep.kind) {
    case "spot-check":
      return gradeSpotCheck(rep, answer);
    case "prompt-build":
      return gradePromptBuild(rep, answer);
    case "assemble":
      return gradeAssemble(rep, answer);
    default:
      return { correct: true, coach: "" };
  }
}
