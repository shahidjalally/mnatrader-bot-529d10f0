import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import type { Signal } from "@/lib/bot";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function SignalEngine({
  phase,
  signal,
  secondsLeft,
  strength,
}: {
  phase: "standby" | "analyzing" | "signal";
  signal: Signal | null;
  secondsLeft: number;
  strength: number;
}) {
  const label =
    phase === "standby" ? "STANDBY" : phase === "analyzing" ? "ANALYZING" : signal!.direction;
  const isCall = signal?.direction === "CALL";

  return (
    <section className="panel-glow rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold neon-cyan">
            <Zap className="size-5" /> AI SIGNAL ENGINE
          </h2>
          <p className="text-xs text-muted-foreground">
            {phase === "standby"
              ? "Engine on standby"
              : phase === "analyzing"
                ? "Scanning live market data"
                : "Signal locked — execute now"}
          </p>
        </div>
        <span className="rounded-full border border-up/40 bg-up/10 px-2 py-1 text-[10px] font-bold text-up">
          ● 99.7% UPTIME
        </span>
      </div>

      <div className="relative mx-auto mt-5 grid size-56 place-items-center">
        <span className="absolute inset-0 rounded-full border border-primary/25" />
        <span className="ring-spin absolute inset-3 rounded-full border border-t-primary/80 border-primary/20" />
        <span className="ring-spin-rev absolute inset-8 rounded-full border border-b-primary/60 border-primary/20" />
        <div className="text-center">
          <p
            className={`font-display text-sm font-bold tracking-widest ${
              phase === "signal" ? (isCall ? "neon-up" : "neon-down") : "text-muted-foreground"
            }`}
          >
            {label}
          </p>
          <p className="mt-2 grid place-items-center">
            {phase === "signal" ? (
              isCall ? (
                <TrendingUp className="size-10 text-up" />
              ) : (
                <TrendingDown className="size-10 text-down" />
              )
            ) : (
              <Zap
                className={`size-8 text-primary ${phase === "analyzing" ? "animate-pulse" : ""}`}
              />
            )}
          </p>
          <p className="mt-2 text-xs leading-tight text-muted-foreground">
            {phase === "standby" ? (
              <>
                Press START BOT
                <br />
                to receive signals
              </>
            ) : phase === "analyzing" ? (
              <>
                Processing
                <br />
                market structure
              </>
            ) : (
              <>
                Accuracy
                <br />
                <span className="font-bold text-foreground">{signal!.accuracy}%</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 items-center gap-2 text-center">
        <div>
          <p className="text-[10px] tracking-widest text-muted-foreground">TIME LEFT</p>
          <div className="mx-auto mt-1 grid size-16 place-items-center rounded-full border border-primary/50">
            <span className="font-display text-sm font-bold neon-cyan">
              {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
            </span>
          </div>
          <p className="mt-1 text-[10px] tracking-widest text-muted-foreground">MIN : SEC</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-muted-foreground">PAIR</p>
          <p className="mt-2 text-sm font-bold">{signal ? signal.pair : "—"}</p>
          <p className="text-[10px] text-muted-foreground">
            {phase === "signal" ? signal!.timeframe : "Awaiting"}
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-muted-foreground">MARKET STRENGTH</p>
          <div className="mx-auto mt-1 grid size-16 place-items-center rounded-full border border-primary/50">
            <span className="font-display text-sm font-bold neon-cyan">{strength}%</span>
          </div>
          <p className="mt-1 text-[10px] font-bold tracking-widest text-primary">
            {strength >= 75 ? "STRONG" : strength >= 55 ? "MEDIUM" : "WEAK"}
          </p>
        </div>
      </div>
    </section>
  );
}
