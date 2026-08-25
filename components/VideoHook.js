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
  const hasId = !!(video && video.yt);

  const poster = hasId
    ? `https://img.youtube.com/vi/${video.yt}/hqdefault.jpg`
    : null;
  // Optional ~60s clip window (§ keep the hook short) — start/end in seconds.
  const clip =
    (video && video.start != null ? `&start=${video.start}` : "") +
    (video && video.end != null ? `&end=${video.end}` : "");
  // youtube-nocookie + autoplay once the user chooses to play.
  const embed = hasId
    ? `https://www.youtube-nocookie.com/embed/${video.yt}?autoplay=1&rel=0&modestbranding=1${clip}`
    : null;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    (video && video.search) || "AI for work"
  )}`;

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
          {playing && embed ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embed}
              title={video?.title || "Video"}
              allow="accelerator; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={hasId ? play : undefined}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={hasId ? "Play video" : "Video unavailable"}
            >
              {/* v3.1: per-persona illustration is the always-present poster base;
                  the YouTube thumbnail (if it loads) blends over it. */}
              <PersonaArt job={job} className="absolute inset-0 h-full w-full" />
              {poster && posterOk && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
                  onError={() => setPosterOk(false)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
              {hasId ? (
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-electric text-[26px] text-[#1a1206] shadow-glow transition-transform group-hover:scale-105">
                  ▶
                </span>
              ) : (
                <span className="relative px-6 text-center text-[14px] text-white/80">
                  Video not set yet — you can still continue, or open it on
                  YouTube below.
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
        {!playing && hasId && (
          <button onClick={skip} className="text-ink-soft/70 hover:text-ink-soft">
            Skip the video
          </button>
        )}
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-soft/70 hover:text-ink-soft"
          onClick={() => track("video_opened_external", { theme })}
        >
          Open on YouTube ↗
        </a>
      </div>
    </div>
  );
}
