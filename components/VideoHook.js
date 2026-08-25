"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import PersonaArt from "./PersonaArt";

// VideoHook (v2 Q2/Q3) — the motivating YouTube hook, IN-SCREEN, before the awe.
// Poster-first: shows a styled thumbnail until the user taps play, so we don't
// pull YouTube's chrome (or cost) until they opt in. Always offers a "Continue"
// so a geo/embed-blocked or dead video never dead-ends the daily flow.
export default function VideoHook({ video, theme, job, onContinue }) {
  const [playing, setPlaying] = useState(false);
  const [posterOk, setPosterOk] = useState(true);
  const hasSrc = !!(video && video.src); // self-hosted mp4 — preferred, no YouTube deps
  const hasId = !!(video && video.yt);
  const playable = hasSrc || hasId;

  const poster = hasId
    ? `https://img.youtube.com/vi/${video.yt}/hqdefault.jpg`
    : null;
  // Optional ~60s clip window (§ keep the hook short) — start/end in seconds.
  const clip =
    (video && video.start != null ? `&start=${video.start}` : "") +
    (video && video.end != null ? `&end=${video.end}` : "");
  // Standard youtube.com embed (nocookie is stricter for fresh uploads). Passing
  // the page origin + playsinline is what YouTube recommends for embedded players
  // and avoids "player configuration" errors that the bare /embed/ URL can throw.
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const embed = hasId
    ? `https://www.youtube.com/embed/${video.yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1${
        origin ? `&origin=${encodeURIComponent(origin)}` : ""
      }${clip}`
    : null;

  function play() {
    track("video_started", { yt: video?.yt || null, theme });
    setPlaying(true);
  }

  function skip() {
    track("video_skipped", { yt: video?.yt || null, theme });
    onContinue();
  }

  return (
    <div>
      <p className="eyebrow text-center">Watch first · then you try</p>
      <h2 className="mt-2 text-center font-display text-[24px] leading-tight text-ink">
        {video?.title || "See what AI actually changes"}
      </h2>

      <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-black shadow-glow">
        <div className="relative aspect-video w-full">
          {playing && hasSrc ? (
            // Self-hosted mp4 — plays instantly, with sound, no embed restrictions.
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              className="absolute inset-0 h-full w-full bg-black"
              src={video.src}
              autoPlay
              controls
              playsInline
            />
          ) : playing && embed ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embed}
              title={video?.title || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              onClick={playable ? play : undefined}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={playable ? "Play video" : "Video unavailable"}
            >
              {/* v3.1: per-persona illustration is the always-present poster base;
                  a YouTube thumbnail (only when there's no self-hosted mp4) blends over it. */}
              <PersonaArt job={job} className="absolute inset-0 h-full w-full" />
              {!hasSrc && poster && posterOk && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
                  onError={() => setPosterOk(false)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
              {playable ? (
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-electric text-[26px] text-[#1a1206] shadow-glow transition-transform group-hover:scale-105">
                  ▶
                </span>
              ) : (
                <span className="relative px-6 text-center text-[14px] text-white/80">
                  Video not set yet — you can still continue.
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-[14px] leading-relaxed text-ink-soft">
        {video?.caption || "A quick look, then a rep of your own."}
      </p>

      <button onClick={onContinue} className="btn-electric mt-5 w-full py-4">
        {playing ? "Now your turn →" : "Skip to today’s drop →"}
      </button>

      <div className="mt-3 flex items-center justify-center gap-4 text-[12px]">
        {!playing && playable && (
          <button onClick={skip} className="text-ink-soft/70 hover:text-ink-soft">
            Skip the video
          </button>
        )}
        {hasId && (
          <a
            href={`https://youtu.be/${video.yt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft/70 hover:text-ink-soft"
            onClick={() => track("video_opened_external", { theme })}
          >
            Open on YouTube ↗
          </a>
        )}
      </div>
    </div>
  );
}
