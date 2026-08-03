import { useState } from "react";
import { LineChart, TrendingUp, ShieldAlert, Trophy } from "lucide-react";
import { BACKTESTS, equityCurve, summarize } from "@/lib/backtest";

export function BacktestView() {
  const [active, setActive] = useState(BACKTESTS[0]!.pair);
  const report = BACKTESTS.find((r) => r.pair === active) ?? BACKTESTS[0]!;
  const stats = summarize(report);

  return (
    <div className="space-y-3">
      <section className="panel-glow rounded-2xl p-4">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold neon-cyan">
          <LineChart className="size-4" /> BACKTEST REPORTS
        </h2>
        <p className="text-[11px] text-muted-foreground">
          Historical strategy simulation across {stats.span} years of tick data ({report.from}–
          {report.to}). Results are simulated and not a promise of future returns.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BACKTESTS.map((r) => (
            <button
              key={r.pair}
              type="button"
              onClick={() => setActive(r.pair)}
              className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors ${
                r.pair === active
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-muted/50 text-muted-foreground"
              }`}
            >
              {r.pair}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-glow rounded-2xl p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-base font-bold">{report.pair}</h3>
          <span className="text-[10px] tracking-widest text-muted-foreground">
            {report.from}–{report.to}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            ["AVG WIN RATE", `${stats.winRate}%`],
            ["TOTAL TRADES", stats.trades.toLocaleString()],
            ["PROFIT FACTOR", `${stats.profitFactor.toFixed(2)}x`],
            ["MAX DRAWDOWN", `${stats.maxDrawdown}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-[10px] tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-lg font-bold neon-cyan">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-border bg-muted/40 p-3">
          <p className="mb-1 text-[10px] tracking-widest text-muted-foreground">
            COMPOUNDED EQUITY CURVE
          </p>
          <svg viewBox="0 0 320 90" className="h-24 w-full" aria-hidden="true">
            <polyline
              points={equityCurve(report)}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-up"
            />
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <p className="flex items-center gap-1 text-up">
            <Trophy className="size-3.5" /> Best {stats.bestYear.year}: +{stats.bestYear.roi}%
          </p>
          <p className="flex items-center gap-1 text-down">
            <ShieldAlert className="size-3.5" /> Worst {stats.worstYear.year}: +
            {stats.worstYear.roi}%
          </p>
        </div>
      </section>

      <section className="panel-glow rounded-2xl p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold neon-cyan">
          <TrendingUp className="size-4" /> YEAR BY YEAR
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-1 pr-2 font-medium tracking-widest">YEAR</th>
                <th className="py-1 pr-2 font-medium tracking-widest">TRADES</th>
                <th className="py-1 pr-2 font-medium tracking-widest">WIN%</th>
                <th className="py-1 pr-2 font-medium tracking-widest">PF</th>
                <th className="py-1 pr-2 font-medium tracking-widest">DD%</th>
                <th className="py-1 font-medium tracking-widest">ROI</th>
              </tr>
            </thead>
            <tbody>
              {report.years.map((y) => (
                <tr key={y.year} className="border-t border-border">
                  <td className="py-1.5 pr-2 font-bold">{y.year}</td>
                  <td className="py-1.5 pr-2 text-muted-foreground">{y.trades}</td>
                  <td className="py-1.5 pr-2 text-primary">{y.winRate}</td>
                  <td className="py-1.5 pr-2">{y.profitFactor.toFixed(2)}</td>
                  <td className="py-1.5 pr-2 text-down">{y.maxDrawdown}</td>
                  <td className="py-1.5 font-bold text-up">+{y.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
