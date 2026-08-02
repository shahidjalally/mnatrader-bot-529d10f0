import { BarChart2, Settings2 } from "lucide-react";
import { BRAND, SERVER_ID, type Signal } from "@/lib/bot";

export function AnalyticsView({ signals }: { signals: Signal[] }) {
  const total = signals.length;
  const calls = signals.filter((s) => s.direction === "CALL").length;
  const winRate = total === 0 ? 0 : Math.round((signals.filter((s) => s.accuracy >= 90).length / total) * 100);
  const avg =
    total === 0 ? 0 : Math.round(signals.reduce((a, s) => a + s.accuracy, 0) / total);

  const stats = [
    ["TOTAL SIGNALS", String(total)],
    ["WIN RATE", `${winRate}%`],
    ["AVG ACCURACY", `${avg}%`],
    ["CALL / PUT", `${calls} / ${total - calls}`],
  ];

  return (
    <div className="space-y-3">
      <section className="panel-glow rounded-2xl p-4">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold neon-cyan">
          <BarChart2 className="size-4" /> PERFORMANCE
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-xl font-bold neon-cyan">{value}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="panel-glow rounded-2xl p-4">
        <h2 className="mb-3 text-lg font-bold neon-cyan">ACCURACY TREND</h2>
        {total === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <svg viewBox="0 0 320 90" className="h-24 w-full" aria-hidden="true">
            <polyline
              points={signals
                .slice()
                .reverse()
                .map((s, i) => `${(i / Math.max(1, total - 1)) * 320},${90 - (s.accuracy - 70) * 2.6}`)
                .join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </svg>
        )}
      </section>
    </div>
  );
}

export function SettingsView({
  toggles,
  onToggle,
}: {
  toggles: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const rows = [
    ["sound", "Signal Sound", "Play a beep on each new signal"],
    ["popup", "Auto Signal Popup", "Show the full-screen signal alert"],
    ["vibration", "Vibration", "Vibrate device on signal"],
  ];
  return (
    <section className="panel-glow rounded-2xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold neon-cyan">
        <Settings2 className="size-4" /> SETTINGS
      </h2>
      <ul className="space-y-2">
        {rows.map(([key, title, sub]) => (
          <li
            key={key}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold">{title}</span>
              <span className="block text-[11px] text-muted-foreground">{sub}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={toggles[key]}
              aria-label={title}
              onClick={() => onToggle(key)}
              className={`h-6 w-11 shrink-0 rounded-full border p-0.5 transition-colors ${
                toggles[key] ? "border-primary bg-primary/30" : "border-border bg-background/80"
              }`}
            >
              <span
                className={`block size-4.5 rounded-full transition-transform ${
                  toggles[key] ? "translate-x-5 bg-primary" : "bg-muted-foreground"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[10px] tracking-widest text-muted-foreground">
        {BRAND} AI BOT v2.4 • Broker: Pocket Option • Server {SERVER_ID}
      </p>
    </section>
  );
}
