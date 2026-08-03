import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppHeader } from "@/components/mna/Header";
import {
  BrokerStatus,
  BrokerSelect,
  PairPicker,
  PairSelect,
  StartButton,
  TimeframeRisk,
} from "@/components/mna/Controls";
import { SignalEngine } from "@/components/mna/SignalEngine";
import { PairsGrid, Scanner, SignalList, Strategies } from "@/components/mna/Panels";
import { AnalyticsView, SettingsView, ThemePicker } from "@/components/mna/Views";
import { BacktestView } from "@/components/mna/Backtest";
import { BottomNav, type Tab } from "@/components/mna/BottomNav";
import { LicenseGate, MenuSheet } from "@/components/mna/LicenseGate";
import {
  BRAND,
  PAIRS,
  SCANNER_STEPS,
  timeframeSeconds,
  type Broker,
  type Risk,
  type Signal,
} from "@/lib/bot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNA Trader — AI Signals for Quotex and Tradevix" },
      {
        name: "description",
        content:
          "MNA Trader AI signal bot for Quotex and Tradevix with 20 major currency pairs, forex and binary strategies, and instant Telegram access.",
      },
      { property: "og:title", content: "MNA Trader — AI Signals for Quotex and Tradevix" },
      {
        property: "og:description",
        content:
          "MNA Trader AI signal bot for Quotex and Tradevix with 20 major currency pairs, forex and binary strategies, and instant Telegram access.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [licensed, setLicensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [broker, setBroker] = useState<Broker>("QUOTEX");
  const [pair, setPair] = useState(PAIRS[0]!.symbol);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("1m");
  const [risk, setRisk] = useState<Risk>("Moderate");

  const [phase, setPhase] = useState<"standby" | "analyzing" | "signal">("standby");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [strength, setStrength] = useState(78);
  const [scanSteps, setScanSteps] = useState(4);
  const [signal, setSignal] = useState<Signal | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    sound: true,
    popup: true,
    vibration: false,
  });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const id = setInterval(() => {
      setStrength((s) => Math.min(96, Math.max(56, s + Math.round((Math.random() - 0.5) * 8))));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  useEffect(() => {
    if (phase === "signal" && secondsLeft === 0) setPhase("standby");
  }, [phase, secondsLeft]);

  const start = useCallback(() => {
    setPhase("analyzing");
    setScanSteps(0);
    SCANNER_STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setScanSteps(i + 1), 350 * (i + 1)));
    });
    timers.current.push(
      setTimeout(
        () => {
          const meta = PAIRS.find((p) => p.symbol === pair) ?? PAIRS[0]!;
          const next: Signal = {
            id: `${Date.now()}`,
            pair,
            direction: Math.random() > 0.5 ? "CALL" : "PUT",
            timeframe,
            accuracy: Math.max(84, Math.min(99, meta.win + (risk === "High" ? -3 : 1))),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setSignal(next);
          setSignals((prev) => [next, ...prev].slice(0, 25));
          setPhase("signal");
          setSecondsLeft(timeframeSeconds(timeframe));
        },
        350 * SCANNER_STEPS.length + 600,
      ),
    );
  }, [pair, risk, timeframe]);

  const dashboard = (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <BrokerSelect broker={broker} onBroker={setBroker} />
            <BrokerStatus broker={broker} />
          </div>
          <SignalEngine
            phase={phase}
            signal={signal}
            secondsLeft={secondsLeft}
            strength={strength}
          />
          <StartButton running={phase === "analyzing"} onStart={start} />
          <SignalList
            title="RECENT SIGNALS"
            signals={signals}
            empty="No signals yet — start the bot."
          />
        </div>
        <div className="space-y-4">
          <PairSelect pair={pair} onChange={() => setPickerOpen(true)} />
          <TimeframeRisk
            timeframe={timeframe}
            onTimeframe={setTimeframe}
            risk={risk}
            onRisk={setRisk}
          />
          <Scanner activeSteps={phase === "standby" ? 4 : scanSteps} />
          <Strategies />
          <PairsGrid onSelect={setPair} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <AppHeader onMenu={() => setMenuOpen(true)} />
        <div className="lg:flex lg:items-start lg:gap-6">
          <BottomNav tab={tab} onTab={setTab} />
          <div className="min-w-0 flex-1">
            {tab === "dashboard" || tab === "bot" ? dashboard : null}
            {tab === "history" ? (
              <div className="space-y-3">
                <SignalList
                  title="SIGNAL HISTORY · 2026"
                  signals={signals}
                  empty="No history yet — run the bot to collect signals."
                />
              </div>
            ) : null}
            {tab === "analytics" ? (
              <div className="space-y-3">
                <AnalyticsView signals={signals} />
                <BacktestView />
              </div>
            ) : null}
            {tab === "settings" ? (
              <div className="space-y-3">
                <ThemePicker />
                <SettingsView
                  toggles={toggles}
                  onToggle={(key) => setToggles((t) => ({ ...t, [key]: !t[key] }))}
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <PairPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={setPair} />
      {menuOpen ? <MenuSheet onClose={() => setMenuOpen(false)} /> : null}
      {!licensed ? <LicenseGate onUnlock={() => setLicensed(true)} /> : null}
      <h2 className="sr-only">{BRAND} AI signal bot</h2>
    </div>
  );
}
