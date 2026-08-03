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
  pair,
}: {
  phase: "standby" | "analyzing" | "signal";
  signal: Signal | null;
  secondsLeft: number;
  strength: number;
  pair: string;
}) {
  const label =
    phase === "standby" ? "READY" : phase === "analyzing" ? "SCANNING" : signal!.direction;
  const isCall = signal?.direction === "CALL";

  return (
    <section className="panel-glow rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold neon-cyan">
            <Zap className="size-5" /> AI SIGNAL BOT
          </h2>
          <p className="text-xs text-muted-foreground">
            {phase === "standby"
              ? "Bot is ready"
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
                Press GET SIGNAL
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
          <p className="mt-2 text-sm font-bold neon-cyan">{signal ? signal.pair : pair}</p>
          <p className="text-[10px] text-muted-foreground">
            {phase === "signal" ? signal!.timeframe : "Selected"}
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

export function MarketScanner({ pair }: { pair: string }) {
  const candles = [34, 48, 29, 55, 42, 66, 51, 72, 61, 80, 68, 88];
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-background/75 p-4 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="panel-glow w-full max-w-sm rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-lg font-bold neon-cyan">AI MARKET SCANNER</p>
            <p className="text-xs text-muted-foreground">Analyzing {pair} live candles</p>
          </div>
          <span className="size-2 animate-pulse rounded-full bg-up" />
        </div>
        <div className="relative mt-4 h-40 overflow-hidden rounded-xl border border-border bg-muted/40 px-3 py-4">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="scan-line absolute inset-y-0 z-10 w-px bg-primary shadow-[0_0_16px_4px_var(--color-primary)]" />
          <div className="relative flex h-full items-end justify-between gap-1">
            {candles.map((height, index) => (
              <span key={index} className="relative flex h-full flex-1 items-end justify-center">
                <span
                  className={`absolute w-px ${index % 3 === 0 ? "bg-down" : "bg-up"}`}
                  style={{ height: `${height + 18}%` }}
                />
                <span
                  className={`relative w-2 rounded-sm ${index % 3 === 0 ? "bg-down" : "bg-up"}`}
                  style={{ height: `${height}%` }}
                />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold tracking-widest text-primary">
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <span className="scanner-progress block h-full bg-primary" />
          </span>
          SCANNING
        </div>
      </div>
    </div>
  );
}
