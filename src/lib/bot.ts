export const TELEGRAM_URL = "https://t.me/mnatraderofficial12";
export const BROKER_URL = "https://broker-qx.pro/sign-up/?lid=2103061";
export const BRAND = "MNA TRADER";
export const SERVER_ID = "MNA-01";

export type Pair = {
  symbol: string;
  win: number;
  up: boolean;
};

const RAW: [string, number][] = [
  ["AED/CNY", 97],
  ["USD/DZD", 95],
  ["EUR/USD", 94],
  ["NZD/USD", 92],
  ["QAR/CNY", 90],
  ["SAR/CNY", 88],
  ["TND/USD", 99],
  ["USD/BRL", 97],
  ["USD/CAD", 95],
  ["USD/JPY", 93],
  ["GBP/USD", 92],
  ["AUD/CAD", 90],
  ["EUR/GBP", 88],
  ["EUR/JPY", 98],
  ["USD/CHF", 96],
  ["USD/INR", 95],
  ["USD/PKR", 93],
  ["USD/BDT", 91],
  ["USD/EGP", 89],
  ["USD/ARS", 88],
  ["USD/COP", 98],
  ["USD/MXN", 96],
  ["USD/PHP", 94],
  ["USD/IDR", 93],
  ["USD/NGN", 91],
  ["USD/TRY", 89],
  ["USD/ZAR", 99],
  ["CAD/CHF", 98],
  ["CAD/JPY", 96],
  ["CHF/JPY", 94],
  ["AUD/JPY", 92],
  ["AUD/NZD", 90],
  ["AUD/USD", 89],
  ["EUR/AUD", 99],
  ["EUR/CAD", 97],
  ["EUR/CHF", 95],
  ["EUR/NZD", 94],
  ["GBP/AUD", 92],
  ["GBP/CAD", 90],
  ["GBP/CHF", 88],
  ["GBP/JPY", 99],
  ["GBP/NZD", 97],
  ["NZD/CAD", 95],
  ["NZD/CHF", 93],
  ["NZD/JPY", 92],
  ["BHD/CNY", 90],
  ["KES/USD", 88],
  ["LBP/USD", 98],
  ["MAD/USD", 97],
  ["OMR/CNY", 95],
  ["JOD/CNY", 93],
  ["YER/USD", 91],
  ["SYP/USD", 89],
  ["IRR/USD", 88],
  ["UAH/USD", 98],
  ["VND/USD", 96],
];

export const PAIRS: Pair[] = RAW.map(([symbol, win], i) => ({
  symbol,
  win,
  up: i % 2 === 0,
}));

export const TICKER = PAIRS.slice(0, 14);

export const TIMEFRAMES = [
  "3s",
  "5s",
  "15s",
  "30s",
  "1m",
  "2m",
  "3m",
  "4m",
  "5m",
  "10m",
  "15m",
];

export const RISKS = ["Low", "Moderate", "High"] as const;
export type Risk = (typeof RISKS)[number];

export const STRATEGIES = [
  ["RSI DIVERGENCE", "STRONG MATCH"],
  ["EMA CROSSOVER", "CONFIRMED"],
  ["SUPPORT & RESISTANCE", "MATCH"],
  ["TREND BREAKOUT", "STRONG MATCH"],
  ["VOLUME ANALYSIS", "CONFIRMED"],
] as const;

export const SCANNER_STEPS = [
  "Scanning RSI (14)",
  "Analyzing Candlestick Patterns",
  "Checking EMA Crossover",
  "Monitoring Support & Resistance",
  "Validating Trend Strength",
  "Calculating Volatility Index",
  "Finalizing AI Decision",
];

export type Signal = {
  id: string;
  pair: string;
  direction: "CALL" | "PUT";
  timeframe: string;
  accuracy: number;
  time: string;
};

export function timeframeSeconds(tf: string): number {
  const value = parseInt(tf, 10);
  return tf.endsWith("m") ? value * 60 : value;
}

export function sparkline(seed: number, up: boolean): string {
  const points: string[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const noise = Math.sin((seed + i) * 1.7) * 6;
    const trend = up ? -i * 2.2 : i * 2.2;
    const y = 32 + trend + noise;
    const x = ((i / steps) * 160).toFixed(2);
    const cy = Math.max(4, Math.min(56, y + (up ? 12 : -12))).toFixed(2);
    points.push(`${x},${cy}`);
  }

  return points.join(" ");
}
