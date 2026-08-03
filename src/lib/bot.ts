export const TELEGRAM_URL = "https://t.me/mna_trader_1";
export const QUOTEX_URL = "https://broker-qx.pro/sign-up/?lid=2103061";
export const TRADOWIX_URL = "https://tradowix.com/register?lid=56627618";
export const BROKER_URL = QUOTEX_URL;
export const BRAND = "MNA TRADER";
export const SERVER_ID = "MNA-01";
export const BROKERS = ["QUOTEX", "TRADOWIX"] as const;
export type Broker = (typeof BROKERS)[number];

export type Pair = {
  symbol: string;
  win: number;
  up: boolean;
};

const RAW: [string, number][] = [
  ["XAU/USD", 96],
  ["BTC/USD", 93],
  ["EUR/USD", 94],
  ["NZD/USD", 92],
  ["USD/CAD", 95],
  ["USD/JPY", 93],
  ["GBP/USD", 92],
  ["AUD/CAD", 90],
  ["EUR/GBP", 88],
  ["EUR/JPY", 98],
  ["USD/CHF", 96],
  ["CAD/JPY", 96],
  ["CHF/JPY", 94],
  ["AUD/JPY", 92],
  ["AUD/USD", 89],
  ["EUR/AUD", 99],
  ["EUR/CAD", 97],
  ["EUR/CHF", 95],
  ["GBP/AUD", 92],
  ["GBP/CAD", 90],
  ["GBP/CHF", 88],
  ["GBP/JPY", 99],
];

export const PAIRS: Pair[] = RAW.map(([symbol, win], i) => ({
  symbol,
  win,
  up: i % 2 === 0,
}));

export const TIMEFRAMES = ["1m", "2m", "3m", "4m", "5m", "10m", "15m", "30m", "1h"];

export const RISKS = ["Low", "Moderate", "High"] as const;
export type Risk = (typeof RISKS)[number];

export const STRATEGIES = [
  ["FOREX TREND FOLLOWING", "STRONG MATCH"],
  ["FOREX BREAKOUT", "CONFIRMED"],
  ["FOREX SUPPORT & RESISTANCE", "MATCH"],
  ["BINARY PRICE ACTION", "STRONG MATCH"],
  ["BINARY MOMENTUM", "CONFIRMED"],
] as const;

export const SCANNER_STEPS = [
  "Mapping forex market structure",
  "Analyzing binary price action",
  "Confirming forex trend direction",
  "Checking support and resistance zones",
  "Validating binary momentum",
  "Calculating market volatility",
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
