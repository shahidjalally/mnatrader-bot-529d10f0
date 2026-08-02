import { BarChart3, Zap, Activity, Clock, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { PAIRS, SCANNER_STEPS, STRATEGIES, sparkline, type Signal } from "@/lib/bot";

export function PairsGrid({ onSelect }: { onSelect: (s: string) => void }) {
  return (
    <section className="panel-glow rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold neon-cyan">
          <BarChart3 className="size-4" /> OTC PAIRS
        </h2>
        <span className="text-xs text-muted-foreground">{PAIRS.length} pairs</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PAIRS.map((p, i) => (
          <button
            key={p.symbol}
            type="button"
            onClick={() => onSelect(p.symbol)}
            className="rounded-lg border border-border bg-muted/50 p-2 text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold">{p.symbol}</p>
                <p className="text-[10px] text-muted-foreground">(OTC {p.win}%)</p>
              </div>
              <span className={`text-xs ${p.up ? "text-up" : "text-down"}`}>{p.up ? "▲" : "▼"}</span>
            </div>
            <svg viewBox="0 0 160 60" className="mt-1 h-8 w-full" aria-hidden="true">
              <polyline
                points={sparkline(i, p.up)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={p.up ? "text-up" : "text-down"}
              />
            </svg>
          </button>
        ))}
      </div>
    </section>
  );
}

export function Strategies() {
  return (
    <section className="panel-glow rounded-2xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold neon-cyan">
        <Zap className="size-4" /> STRATEGIES IN USE
      </h2>
      <ul className="space-y-2">
        {STRATEGIES.map(([name, state]) => (
          <li key={name} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-4 text-primary" />
            <span className="flex-1 tracking-wide">{name}</span>
            <span className={`text-xs font-bold ${state === "CONFIRMED" ? "text-down" : "text-up"}`}>
              {state}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Scanner({ activeSteps }: { activeSteps: number }) {
  return (
    <section className="panel-glow rounded-2xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold neon-cyan">
        <Activity className="size-4" /> MARKET SCANNER
      </h2>
      <ul className="space-y-2">
        {SCANNER_STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2 text-sm text-foreground/80">
            <Sparkles className="size-3 text-primary" />
            <span className="flex-1">{step}</span>
            {i < activeSteps ? (
              <CheckCircle2 className="size-4 text-up" />
            ) : (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SignalList({
  title,
  signals,
  empty,
}: {
  title: string;
  signals: Signal[];
  empty: string;
}) {
  return (
    <section className="panel-glow rounded-2xl p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold neon-cyan">
        <Clock className="size-4" /> {title}
      </h2>
      {signals.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {signals.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2"
            >
              <span
                className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                  s.direction === "CALL" ? "bg-up/70 text-background" : "bg-down/70 text-background"
                }`}
              >
                {s.direction}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">{s.pair}</span>
                <span className="block text-[10px] text-muted-foreground">
                  {s.timeframe} • {s.time}
                </span>
              </span>
              <span className="text-xs font-bold neon-cyan">{s.accuracy}%</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
