"use client";

import { useEffect, useMemo, useState } from "react";
import { computeMetrics, getEvents, resetEvents } from "@/lib/analytics";

// Builder-facing dashboard (not an end-user surface). Reads the localStorage
// event log and derives the graded funnel (§16 metrics, §17 events, §20 funnel).
// Also exports the raw log for the required Product & Feedback Sheet (§19).
export default function Metrics({ onExit }) {
  const [tick, setTick] = useState(0);
  const metrics = useMemo(() => computeMetrics(), [tick]);
  const events = useMemo(() => getEvents(), [tick]);

  // Refresh if events change in another tab/pane during the session.
  useEffect(() => {
    const onStorage = () => setTick((t) => t + 1);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const pct = (n) => (n == null ? "—" : `${Math.round(n * 100)}%`);
  const secs = (n) => (n == null ? "—" : `${n < 100 ? n.toFixed(1) : Math.round(n)}s`);

  function copyJson() {
    navigator.clipboard?.writeText(JSON.stringify(events, null, 2));
  }

  function downloadCsv() {
    const cols = ["timestamp", "event", "user_id", "session_id", "card_id", "drop_id", "job"];
    const esc = (v) => (v == null ? "" : `"${String(v).replace(/"/g, '""')}"`);
    const rows = [cols.join(",")].concat(
      events.map((e) => cols.map((c) => esc(e[c])).join(","))
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "current-events.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const maxFunnel = Math.max(1, ...metrics.funnel.map((f) => f.users));

  const cards = [
    { label: "Activation", value: pct(metrics.activationRate), sub: "first awe→rep loop (§16)" },
    { label: "D1 return", value: pct(metrics.d1Return), sub: "came back a later day (§20)" },
    { label: "Rep-abandon", value: pct(metrics.abandonRate), sub: "left mid-rep" },
    { label: "Time-to-aha", value: secs(metrics.medianTtfaSec), sub: "median, onboarding→rep" },
    { label: "Reps / active user", value: metrics.repsPerActiveUser.toFixed(1), sub: "north-star proxy" },
    { label: "Unique users", value: String(metrics.uniqueUsers), sub: `${metrics.totalEvents} events` },
  ];

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-xl px-6 pb-24 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Instrumentation</p>
            <h1 className="mt-1 font-display text-[26px] text-ink">Funnel & metrics</h1>
          </div>
          <button onClick={onExit} className="btn-ghost text-[13px]">
            ← back
          </button>
        </div>

        <p className="mt-2 text-[13px] text-ink-soft">
          Local event log for the 5–15 user test — no backend by design (§17).
        </p>

        {/* Metric cards (§16/§20) */}
        <section className="mt-8 grid grid-cols-2 gap-3">
          {cards.map((c) => (
            <div key={c.label} className="card p-5">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
                {c.label}
              </p>
              <p className="mt-1 font-display text-[28px] leading-none text-ink">
                {c.value}
              </p>
              <p className="mt-1.5 text-[12px] text-ink-soft/80">{c.sub}</p>
            </div>
          ))}
        </section>

        {/* Funnel (§17 schema, ordered) */}
        <section className="mt-10">
          <h3 className="mb-4 font-display text-[20px] text-ink">Funnel (unique users)</h3>
          <div className="space-y-2">
            {metrics.funnel.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-right text-[12px] text-ink-soft">
                  {f.name}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-surface">
                  <div
                    className="flex h-full items-center bg-electric/85 px-2"
                    style={{ width: `${Math.max(6, (f.users / maxFunnel) * 100)}%` }}
                  >
                    <span className="text-[11px] font-semibold text-white">{f.users}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-ink-soft/70">
            <code>account_created</code> fires when a user saves progress after the aha
            (§10). <code>notification_tapped</code> stays 0 — no push in the MVP
            (documented gap, §17).
          </p>
        </section>

        {/* Raw log export for the required feedback sheet (§19) */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-[20px] text-ink">Event log</h3>
            <div className="flex gap-2">
              <button onClick={copyJson} className="btn-ghost text-[12px]">
                Copy JSON
              </button>
              <button onClick={downloadCsv} className="btn-ghost text-[12px]">
                Download CSV
              </button>
            </div>
          </div>
          <div className="max-h-72 overflow-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left text-[12px]">
              <thead className="sticky top-0 bg-[#171A20] text-ink-soft">
                <tr>
                  <th className="px-3 py-2 font-semibold">time</th>
                  <th className="px-3 py-2 font-semibold">event</th>
                  <th className="px-3 py-2 font-semibold">card</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-ink-soft">
                      No events yet — run the drop to populate the funnel.
                    </td>
                  </tr>
                )}
                {events
                  .slice()
                  .reverse()
                  .map((e, i) => (
                    <tr key={i} className="border-t border-line/70">
                      <td className="whitespace-nowrap px-3 py-1.5 text-ink-soft">
                        {new Date(e.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-3 py-1.5 font-medium text-ink">{e.event}</td>
                      <td className="px-3 py-1.5 text-ink-soft">{e.card_id || "—"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                resetEvents();
                setTick((t) => t + 1);
              }}
              className="text-[12px] text-ink-soft/70 hover:text-ink-soft"
            >
              Clear event log
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
