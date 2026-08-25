"use client";

import { useRef, useState } from "react";
import { certificateData } from "@/lib/content";
import { getState } from "@/lib/store";
import { track } from "@/lib/analytics";

// Certificate (v2 Q4) — earned after all five capabilities. Framed as proof of
// "what you can now do" (never "you were here N days"). On-screen editorial
// artifact + a self-contained PNG download (canvas, no external libs) + share.
export default function Certificate({ onExit }) {
  const state = getState();
  const data = certificateData(state.account, state.job);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const drawnOnce = useRef(false);

  // Draw the certificate to an offscreen canvas and trigger a PNG download.
  function download() {
    track("certificate_downloaded", {});
    try {
      const scale = 2;
      const W = 1200;
      const H = 850;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);

      // Obsidian background
      ctx.fillStyle = "#12100c";
      ctx.fillRect(0, 0, W, H);
      // Amber border frame
      ctx.strokeStyle = "#f5a623";
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, W - 80, H - 80);
      ctx.strokeStyle = "rgba(245,166,35,0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(52, 52, W - 104, H - 104);

      ctx.textAlign = "center";
      // Eyebrow
      ctx.fillStyle = "#f5a623";
      ctx.font = "600 20px Georgia, 'Times New Roman', serif";
      ctx.fillText("C U R R E N T   ·   A I   F L U E N C Y", W / 2, 150);

      // Title
      ctx.fillStyle = "#f4efe6";
      ctx.font = "700 58px Georgia, 'Times New Roman', serif";
      ctx.fillText("Certificate of AI Fluency", W / 2, 235);

      // Awarded to
      ctx.fillStyle = "rgba(244,239,230,0.6)";
      ctx.font = "400 22px Georgia, serif";
      ctx.fillText("awarded to", W / 2, 300);

      ctx.fillStyle = "#f4efe6";
      ctx.font = "700 46px Georgia, serif";
      ctx.fillText(data.name, W / 2, 355);

      ctx.fillStyle = "rgba(244,239,230,0.7)";
      ctx.font = "400 22px Georgia, serif";
      ctx.fillText(`for ${data.role}`, W / 2, 395);

      // Capabilities line
      ctx.fillStyle = "rgba(244,239,230,0.6)";
      ctx.font = "400 20px Georgia, serif";
      ctx.fillText(
        "for demonstrating all five working AI capabilities:",
        W / 2,
        455
      );

      ctx.fillStyle = "#f4efe6";
      ctx.font = "500 22px Georgia, serif";
      data.capabilities.forEach((c, i) => {
        ctx.fillText(`${c.tier} — ${c.title}`, W / 2, 505 + i * 40);
      });

      // Date + seal
      ctx.fillStyle = "#f5a623";
      ctx.font = "600 20px Georgia, serif";
      ctx.fillText(data.dateLabel, W / 2, H - 120);
      ctx.fillStyle = "rgba(244,239,230,0.45)";
      ctx.font = "400 16px Georgia, serif";
      ctx.fillText("Current · a few minutes a day", W / 2, H - 90);

      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `AI-Fluency-Certificate-${data.name.replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2200);
    } catch {
      /* canvas/download blocked — the on-screen certificate is still shareable */
    }
  }

  async function share() {
    track("certificate_shared", { method: "native" });
    const link =
      typeof window !== "undefined" ? window.location.origin || "" : "";
    const text = `I just earned my AI-Fluency certificate — all five working AI skills, a few minutes a day on Current.\n${link}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "AI Fluency", text, url: link });
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-xl px-6 pb-24 pt-10">
        <p className="eyebrow text-center">You did the whole thing</p>
        <h1 className="mt-2 text-center font-display text-[30px] leading-tight text-ink">
          AI Fluency — certified
        </h1>

        {/* On-screen certificate */}
        <div className="aurora-field mt-7 overflow-hidden rounded-3xl p-8 text-white shadow-glow">
          <div className="rounded-2xl border border-electric/40 p-6">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-electric">
              Current · AI Fluency
            </p>
            <p className="mt-5 text-center text-[13px] text-white/60">
              awarded to
            </p>
            <p className="mt-1 text-center font-display text-[30px] leading-tight text-white">
              {data.name}
            </p>
            <p className="mt-1 text-center text-[13px] text-white/70">
              for {data.role}
            </p>

            <div className="mx-auto mt-6 max-w-sm space-y-2">
              {data.capabilities.map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-2 rounded-xl bg-white/5 px-4 py-2.5"
                >
                  <span className="mt-0.5 text-electric">✓</span>
                  <span className="text-[13px] leading-snug text-white/90">
                    <span className="font-semibold text-white">{c.tier}</span>{" "}
                    — {c.title}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[12px] font-semibold text-electric">
              {data.dateLabel}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button onClick={download} className="btn-electric flex-1 py-3.5">
            {downloaded ? "Saved ✓" : "Download certificate"}
          </button>
          <button onClick={share} className="btn-ghost px-5 text-[14px]">
            {copied ? "Copied ✓" : "Share"}
          </button>
        </div>

        <button onClick={onExit} className="btn-ghost mt-6 w-full text-[14px]">
          Back home
        </button>
      </div>
    </main>
  );
}
