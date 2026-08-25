"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getDrop } from "@/lib/content";
import { getState, completeAudioMicroWin } from "@/lib/store";
import ProgressBar from "./ProgressBar";

// §13.1 Commute / audio mode: hands & eyes free. Also serves §13.6 "tired mode"
// (pure passive awe that lightly counts). Listening = a §13.2 micro-win.
export default function AudioDrop({ onExit, onRepNow, onLater, tierIndex = 0 }) {
  const drop = useMemo(() => getDrop(getState().job, tierIndex), [tierIndex]);
  const lines = drop.audio.lines;

  const [idx, setIdx] = useState(-1); // -1 = not started
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [summary, setSummary] = useState(null);

  const hasTTS =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const timerRef = useRef(null);
  const cancelledRef = useRef(false); // stop stale speech callbacks
  const finishedRef = useRef(false); // ensure the micro-win fires exactly once

  // Cleanup any speech/timer on unmount.
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (hasTTS) window.speechSynthesis.cancel();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasTTS]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    cancelledRef.current = true;
    if (hasTTS) window.speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setFinished(true);
    setIdx(lines.length - 1);
    setSummary(completeAudioMicroWin(drop.id));
  }

  function speakFrom(startIdx) {
    setIdx(startIdx);
    setPlaying(true);
    cancelledRef.current = false;

    if (hasTTS) {
      window.speechSynthesis.cancel();
      const speakLine = (i) => {
        if (cancelledRef.current) return;
        if (i >= lines.length) {
          finish();
          return;
        }
        setIdx(i);
        const u = new SpeechSynthesisUtterance(lines[i]);
        u.rate = 0.98;
        u.pitch = 1;
        u.onend = () => {
          // onend also fires on cancel/pause — the ref guards stale callbacks.
          if (cancelledRef.current) return;
          speakLine(i + 1);
        };
        window.speechSynthesis.speak(u);
      };
      speakLine(startIdx);
    } else {
      // Fallback: timed transcript auto-advance (~5.5s/line).
      const advance = (i) => {
        if (i >= lines.length) {
          finish();
          return;
        }
        setIdx(i);
        timerRef.current = setTimeout(() => advance(i + 1), 5500);
      };
      advance(startIdx);
    }
  }

  function togglePlay() {
    if (finished) return;
    if (idx === -1) {
      speakFrom(0);
      return;
    }
    if (hasTTS) {
      if (playing) {
        window.speechSynthesis.pause();
        setPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setPlaying(true);
      }
    } else {
      // Fallback pause/resume via timer.
      if (playing) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setPlaying(false);
      } else {
        speakFrom(idx);
      }
    }
  }

  const progress = finished
    ? lines.length
    : Math.max(0, idx + (playing ? 1 : 0));

  return (
    <main className="aurora-field min-h-screen text-white">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 pb-16 pt-6">
        <div className="mb-10 [&_*]:!text-white/70">
          <ProgressBar value={progress} total={lines.length} onExit={onExit} />
        </div>

        {!finished ? (
          <div className="flex flex-1 flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Commute mode · {drop.audio.durationHint} · hands-free
            </p>

            {/* Waveform-ish visual */}
            <div className="mt-10 flex h-24 items-end justify-center gap-1.5">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-electric-bright/70"
                  style={{
                    height: playing
                      ? `${20 + Math.abs(Math.sin(i * 0.9)) * 70}%`
                      : "16%",
                    transition: "height 0.4s ease",
                    animation: playing
                      ? `pulseGlow ${1.1 + (i % 5) * 0.15}s ease-in-out infinite`
                      : "none",
                  }}
                />
              ))}
            </div>

            {/* Live transcript (so a glance still works, but never required) */}
            <div className="mt-10 flex-1">
              <p className="min-h-[96px] text-center font-display text-[24px] leading-snug">
                {idx === -1 ? (
                  <span className="text-white/50">
                    Press play. Pocket your phone — this is made for listening.
                  </span>
                ) : (
                  <span className="animate-fade-up">{lines[idx]}</span>
                )}
              </p>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={togglePlay}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-surface text-[28px] text-night shadow-glow transition-transform active:scale-95"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? "⏸" : "▶"}
              </button>
            </div>
            <button
              onClick={finish}
              className="mx-auto mt-6 text-[13px] text-white/50 hover:text-white/80"
            >
              Skip to end →
            </button>

            {!hasTTS && (
              <p className="mt-4 text-center text-[12px] text-white/40">
                Your browser has no speech voice — showing the transcript on a
                timer instead.
              </p>
            )}
          </div>
        ) : (
          // Listen complete: micro-win booked, rep queued (§13.1/§13.2)
          <div className="flex flex-1 flex-col justify-center text-center animate-scale-in">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface text-[28px] text-night">
              ✓
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Micro-win · streak safe
            </p>
            <h2 className="mt-3 font-display text-[30px]">
              Streak: {summary?.streak} {summary?.streak === 1 ? "day" : "days"} 🔥
            </h2>
            {summary?.forgiven && (
              <p className="mt-2 text-[13px] text-white/60">
                (You’d missed a day — we kept it. Life happens.)
              </p>
            )}

            {summary?.queued && (
              <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white/10 p-5 text-left backdrop-blur-sm">
                <p className="text-[13px] font-semibold text-white">
                  One rep is queued for you
                </p>
                <p className="mt-1 text-[13px] leading-snug text-white/70">
                  When you’re stopped and have both hands, build the prompt
                  yourself — that’s where the skill actually sticks (and where
                  you unlock the capability).
                </p>
              </div>
            )}

            <div className="mx-auto mt-8 w-full max-w-sm space-y-3">
              {summary?.queued && (
                <button
                  onClick={onRepNow}
                  className="btn w-full bg-white text-night hover:bg-white/90"
                >
                  I’m stationary — do the rep now
                </button>
              )}
              <button
                onClick={onLater}
                className="btn w-full bg-white/10 text-white hover:bg-white/20"
              >
                {summary?.queued ? "Later" : "Done"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
