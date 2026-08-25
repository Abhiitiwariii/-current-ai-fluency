"use client";

import { useEffect, useMemo, useState } from "react";
import { getDrop } from "@/lib/content";
import { gradeRep } from "@/lib/grading";
import { getState, completeDrop } from "@/lib/store";
import { track } from "@/lib/analytics";
import ProgressBar from "./ProgressBar";
import VideoHook from "./VideoHook";
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

// Orchestrates one bounded daily drop: video hook -> awe -> reps -> completion.
// mode "reps-only" resumes a queued rep after an audio micro-win — skips the
// video + awe. tierIndex selects which capability tier's content to run (§11).
export default function DropSession({ onExit, onDone, onCertificate, mode = "full", tierIndex = 0 }) {
  const drop = useMemo(() => getDrop(getState().job, tierIndex), [tierIndex]);
  const isFull = mode !== "reps-only";
  // Tier 0 runs only right after onboarding, which now shows the video hook
  // itself — so skip it here to avoid playing the same clip twice back-to-back.
  const includeVideo = isFull && tierIndex !== 0 && !!(drop.video && drop.video.yt);
  // v3.2: the first drop (tier 0, right after the onboarding video) skips the awe
  // "watch" card and goes straight into the questions — two passive beats back to
  // back felt redundant. Later tiers keep their hook (incl. the tier-1 demo).
  const includeAwe = isFull && tierIndex !== 0;
  const preSteps = (includeVideo ? 1 : 0) + (includeAwe ? 1 : 0);
  const steps = drop.reps.length + preSteps;

  const [phase, setPhase] = useState(
    includeVideo ? "video" : includeAwe ? "awe" : "rep"
  ); // video | awe | rep | done
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
    phase === "video"
      ? 1
      : phase === "awe"
      ? (includeVideo ? 1 : 0) + 1
      : phase === "done"
      ? steps
      : repIndex + 1 + preSteps;

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
      if (s.programComplete) track("certificate_earned", {});
      setSummary(s);
      setPhase("done");
    } else {
      setRepIndex((i) => i + 1);
    }
  }

  // Leaving mid-rep is an abandon (§17 drop-off). Ignore exits from video/awe/done.
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

        {phase === "video" && (
          <VideoHook
            video={drop.video}
            theme={drop.theme}
            job={drop.job}
            onContinue={() => setPhase("awe")}
          />
        )}

        {phase === "awe" && (
          <AweCard awe={drop.awe} theme={drop.theme} job={drop.job} onContinue={startReps} />
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
              programComplete={summary.programComplete}
              onHome={onDone}
              onCertificate={onCertificate}
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
