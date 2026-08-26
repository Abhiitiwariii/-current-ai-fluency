"use client";

import { useEffect, useState } from "react";
import {
  getState,
  completeOnboarding,
  resetState,
  createAccountFromGoogle,
  signOut,
} from "@/lib/store";
import { TRACK_LENGTH } from "@/lib/content";
import { markVisit, track } from "@/lib/analytics";
import { mpSetPerson } from "@/lib/mixpanel";
import { supabase, insertRow } from "@/lib/supabase";
import Onboarding from "@/components/Onboarding";
import Home from "@/components/Home";
import DropSession from "@/components/DropSession";
import AudioDrop from "@/components/AudioDrop";
import Metrics from "@/components/Metrics";
import Certificate from "@/components/Certificate";

// Single client-side controller so localStorage state stays consistent across
// views without route-level hydration mismatches.
export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(null);
  const [view, setView] = useState("home"); // home | drop | drop-reps | audio | metrics | certificate
  const [dropTier, setDropTier] = useState(0); // which capability tier this session runs
  const [openFeedbackOnMount, setOpenFeedbackOnMount] = useState(false);

  useEffect(() => {
    setState(getState());
    markVisit(); // §20: log day2_return if this is a genuine later-day return
    setMounted(true);

    // v3.2: returning from a Google sign-in that was started inside the feedback
    // form → auto-reopen it (draft + email restored) so nothing feels lost.
    try {
      if (localStorage.getItem("current.feedback.pending")) {
        localStorage.removeItem("current.feedback.pending");
        setOpenFeedbackOnMount(true);
      }
    } catch {
      /* ignore */
    }

    // v3.2: hydrate a Google (Supabase Auth) session on mount — including the
    // return from the OAuth redirect, where supabase-js parses the URL for us.
    if (supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const user = data?.session?.user;
        // Runs once per new sign-in (guarded by !account, so a refresh while
        // logged in won't re-insert).
        if (user && !getState().account) {
          const account = createAccountFromGoogle(user);
          track("account_created", { has_email: !!user.email, method: "google" });
          // Put the real name/email on the Mixpanel profile (Users view).
          mpSetPerson({ name: account?.name, email: account?.email, method: "google" });
          // Unified signup capture: every save-progress path lands in `signups`,
          // so there's one queryable list (auth.users still holds the login).
          if (account?.email) {
            insertRow("signups", {
              email: account.email,
              name: account.name,
              source: "google",
            });
          }
          setState(getState());
        }
      });
    }
  }, []);

  function refresh() {
    setState(getState());
  }

  // The next tier to run = number of capabilities already unlocked (clamped).
  function currentTier(s = getState()) {
    return Math.min(s.capabilities.length, TRACK_LENGTH - 1);
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
          setDropTier(0); // the track starts at Foundations
          setView("drop");
        }}
      />
    );
  }

  if (view === "drop" || view === "drop-reps") {
    return (
      <DropSession
        tierIndex={dropTier}
        mode={view === "drop-reps" ? "reps-only" : "full"}
        onExit={() => {
          refresh();
          setView("home");
        }}
        onDone={() => {
          refresh();
          setView("home");
        }}
        onCertificate={() => {
          refresh();
          setView("certificate");
        }}
      />
    );
  }

  if (view === "audio") {
    return (
      <AudioDrop
        tierIndex={dropTier}
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

  if (view === "certificate") {
    return <Certificate onExit={() => { refresh(); setView("home"); }} />;
  }

  return (
    <Home
      state={state}
      openFeedbackOnMount={openFeedbackOnMount}
      onStartDrop={(tier) => {
        setDropTier(tier == null ? currentTier() : tier);
        setView("drop");
      }}
      onStartAudio={() => {
        setDropTier(currentTier());
        setView("audio");
      }}
      onResumeRep={() => {
        setDropTier(currentTier());
        setView("drop-reps");
      }}
      onOpenCertificate={() => setView("certificate")}
      onOpenMetrics={() => setView("metrics")}
      onSignOut={async () => {
        await signOut();
        refresh();
      }}
      onReset={() => {
        resetState();
        refresh();
        setDropTier(0);
        setView("home");
      }}
    />
  );
}
