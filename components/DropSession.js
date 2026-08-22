"use client";

import { useEffect, useMemo, useState } from "react";
import { getDrop } from "@/lib/content";
import { gradeRep } from "@/lib/grading";
import { getState, completeDrop } from "@/lib/store";
import { track } from "@/lib/analytics";
import ProgressBar from "./ProgressBar";
import AweCard from "./AweCard";
import CoachFooter from "./CoachFooter";
import DropComplete from "./DropComplete";
import SpotCheck from "./reps/SpotCheck";
import PromptBuild from "./reps/PromptBuild";
import Assemble from "./reps/Assemble";

const REP_COMPONENTS = {
  "spot-check": SpotCheck,
  "prompt-build": PromptBuild,
  assemble: Assemble,
};

// Orchestrates one bounded daily drop: awe -> reps -> completion (§6).
// mode "reps-only" resumes a queued rep after an audio micro-win — skips the awe.
export default function DropSession({ onExit, onDone, mode = "full" }) {
  const drop = useMemo(() => getDrop(getState().job), []);
  const includeAwe = mode !== "reps-only";
  const steps = drop.reps.length + (includeAwe ? 1 : 0);

  const [phase, setPhase] = useState(includeAwe ? "awe" : "rep"); // awe | rep | done
  const [repIndex, setRepIndex] = useState(0);
  const [result, setResult] = useState(null); // grading result for current rep
  const [summary, setSummary] = useState(null); // completion summary

  // §17 card_id — reps may not carry an explicit id; derive a stable one.
  function cardId(i) {
    const rep = drop.reps[i];
    return rep?.id || `${drop.id}-rep${i + 1}-${rep?.kind ?? "x"}`;
  }

  // §17: awe view (full drop) + rep_started whenever a rep becomes active.
  useEffect(() => {
    if (phase === "awe") {
      track("awe_card_viewed", { drop_id: drop.id, source: "drop" });
    } else if (phase === "rep") {
      track("rep_started", { card_id: cardId(repIndex), drop_id: drop.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, repIndex]);

  const progressValue =
    phase === "awe"
      ? 1
      : phase === "done"
      ? steps
      : repIndex + 1 + (includeAwe ? 1 : 0);

  function startReps() {
    setPhase("rep");
    setRepIndex(0);
  }

  function handleSubmit(answer) {
    const rep = drop.reps[repIndex];
    setResult(gradeRep(rep, answer));
  }

  function handleContinue() {
    // Advancing past a rep = that rep completed (grading is forgiving §9, so
    // continue always means done-with-this-card). rep_completed = activation (§16).
    track("rep_completed", {
      card_id: cardId(repIndex),
      drop_id: drop.id,
      passed: !!result?.pass,
    });
    setResult(null);
    const isLast = repIndex >= drop.reps.length - 1;
    if (isLast) {
      const s = completeDrop(drop.id, drop.capabilityId);
      track("streak_incremented", { streak: s.streak, forgiven: s.forgiven });
      track("session_completed", {
        drop_id: drop.id,
        reps: drop.reps.length,
        new_capability: s.newCapability,
      });
      setSummary(s);
      setPhase("done");
    } else {
      setRepIndex((i) => i + 1);
    }
  }

  // Leaving mid-rep is an abandon (§17 drop-off). Ignore exits from awe/done.
  function handleExit() {
    if (phase === "rep") {
      track("rep_abandoned", { card_id: cardId(repIndex), drop_id: drop.id });
    }
    onExit();
  }

  const RepComponent = phase === "rep" ? REP_COMPONENTS[drop.reps[repIndex].kind] : null;

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-xl px-6 pb-40 pt-6">
        {phase !== "done" && (
          <div className="mb-8">
            <ProgressBar value={progressValue} total={steps} onExit={handleExit} />
          </div>
        )}

        {phase === "awe" && (
          <AweCard awe={drop.awe} theme={drop.theme} onContinue={startReps} />
        )}

        {phase === "rep" && RepComponent && (
          <RepComponent
            key={repIndex}
            rep={drop.reps[repIndex]}
            locked={!!result}
            onSubmit={handleSubmit}
          />
        )}

        {phase === "done" && (
          <div className="pt-8">
            <DropComplete
              streak={summary.streak}
              forgiven={summary.forgiven}
              capabilityId={drop.capabilityId}
              onHome={onDone}
            />
          </div>
        )}
      </div>

      {phase === "rep" && (
        <CoachFooter result={result} onContinue={handleContinue} />
      )}
    </main>
  );
}
