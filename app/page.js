"use client";

import { useEffect, useState } from "react";
import {
  getState,
  completeOnboarding,
  resetState,
} from "@/lib/store";
import { markVisit } from "@/lib/analytics";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import DropSession from "@/components/DropSession";
import AudioDrop from "@/components/AudioDrop";
import Metrics from "@/components/Metrics";

// Single client-side controller so localStorage state stays consistent across
// views without route-level hydration mismatches.
export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(null);
  const [view, setView] = useState("home"); // home | drop | drop-reps | audio | metrics

  useEffect(() => {
    setState(getState());
    markVisit(); // §20: log day2_return if this is a genuine later-day return
    setMounted(true);
  }, []);

  function refresh() {
    setState(getState());
  }

  // Avoid rendering persisted UI on the server pass.
  if (!mounted || !state) {
    return <main className="min-h-screen bg-paper" />;
  }

  if (!state.onboarded) {
    return (
      <Onboarding
        onStart={(job) => {
          completeOnboarding(job);
          refresh();
          setView("drop");
        }}
      />
    );
  }

  if (view === "drop" || view === "drop-reps") {
    return (
      <DropSession
        mode={view === "drop-reps" ? "reps-only" : "full"}
        onExit={() => {
          refresh();
          setView("home");
        }}
        onDone={() => {
          refresh();
          setView("home");
        }}
      />
    );
  }

  if (view === "audio") {
    return (
      <AudioDrop
        onExit={() => {
          refresh();
          setView("home");
        }}
        onRepNow={() => {
          refresh();
          setView("drop-reps");
        }}
        onLater={() => {
          refresh();
          setView("home");
        }}
      />
    );
  }

  if (view === "metrics") {
    return <Metrics onExit={() => setView("home")} />;
  }

  return (
    <Home
      state={state}
      onStartDrop={() => setView("drop")}
      onStartAudio={() => setView("audio")}
      onResumeRep={() => setView("drop-reps")}
      onOpenMetrics={() => setView("metrics")}
      onReset={() => {
        resetState();
        refresh();
        setView("home");
      }}
    />
  );
}
