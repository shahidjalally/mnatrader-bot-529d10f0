export type BacktestYear = {
  year: number;
  trades: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  roi: number;
};

export type BacktestReport = {
  pair: string;
  from: number;
  to: number;
  years: BacktestYear[];
};

const BACKTEST_PAIRS: [string, number, number][] = [
  ["EUR/USD", 2026, 68],
  ["GBP/USD", 2026, 66],
  ["USD/JPY", 2026, 67],
  ["AUD/USD", 2026, 65],
  ["USD/CAD", 2026, 64],
  ["EUR/JPY", 2026, 69],
];

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function build(pair: string, from: number, base: number, index: number): BacktestReport {
  const to = 2026;
  const years: BacktestYear[] = [];
  for (let y = from; y <= to; y++) {
    const s = index * 97 + y;
    const winRate = Math.round((base + rand(s) * 9 - 3) * 10) / 10;
    const trades = 900 + Math.round(rand(s + 1) * 700);
    const profitFactor = Math.round((1.25 + rand(s + 2) * 0.85) * 100) / 100;
    const maxDrawdown = Math.round((6 + rand(s + 3) * 11) * 10) / 10;
    const roi = Math.round((winRate - 52) * 6.2 + rand(s + 4) * 40);
    years.push({ year: y, trades, winRate, profitFactor, maxDrawdown, roi });
  }
  return { pair, from, to, years };
}

export const BACKTESTS: BacktestReport[] = BACKTEST_PAIRS.map(([pair, from, base], i) =>
  build(pair, from, base, i),
);

export function summarize(report: BacktestReport) {
  const n = report.years.length;
  const trades = report.years.reduce((a, y) => a + y.trades, 0);
  const winRate = Math.round((report.years.reduce((a, y) => a + y.winRate, 0) / n) * 10) / 10;
  const profitFactor =
    Math.round((report.years.reduce((a, y) => a + y.profitFactor, 0) / n) * 100) / 100;
  const maxDrawdown = Math.max(...report.years.map((y) => y.maxDrawdown));
  const roi = report.years.reduce((a, y) => a + y.roi, 0);
  const bestYear = report.years.reduce((a, y) => (y.roi > a.roi ? y : a));
  const worstYear = report.years.reduce((a, y) => (y.roi < a.roi ? y : a));
  return { span: n, trades, winRate, profitFactor, maxDrawdown, roi, bestYear, worstYear };
}

export function equityCurve(report: BacktestReport): string {
  let equity = 100;
  const values = report.years.map((y) => {
    equity *= 1 + y.roi / 100;
    return equity;
  });
  const max = Math.max(...values);
  const min = Math.min(...values, 100);
  return values
    .map((v, i) => {
      const x = ((i / Math.max(1, values.length - 1)) * 320).toFixed(2);
      const yy = (86 - ((v - min) / Math.max(1, max - min)) * 78).toFixed(2);
      return `${x},${yy}`;
    })
    .join(" ");
}
