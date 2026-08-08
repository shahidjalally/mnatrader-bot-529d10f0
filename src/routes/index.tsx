import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppHeader } from "@/components/mna/Header";
import {
  BrokerSelect,
  PairPicker,
  PairSelect,
  StartButton,
  TimeframeSelect,
} from "@/components/mna/Controls";
import { MarketScanner, SignalEngine } from "@/components/mna/SignalEngine";
import { PairsGrid, Scanner, SignalList, Strategies } from "@/components/mna/Panels";
import { LicenseGate, LicenseRequired, MenuSheet } from "@/components/mna/LicenseGate";
import {
  BRAND,
  PAIRS,
  SCANNER_STEPS,
  timeframeSeconds,
  type Broker,
  type Risk,
  type Signal,
} from "@/lib/bot";
import { clearStoredLicense, validateLicense, validateStoredLicense } from "@/lib/license";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNA Trader — AI Signals for Quotex and TradoWix" },
      {
        name: "description",
        content:
          "MNA Trader AI signal bot for Quotex and TradoWix with major currency, gold, and Bitcoin pairs.",
      },
      { property: "og:title", content: "MNA Trader — AI Signals for Quotex and TradoWix" },
      {
        property: "og:description",
        content:
          "MNA Trader AI signal bot for Quotex and TradoWix with major currency, gold, and Bitcoin pairs.",
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
  const [licenseGateOpen, setLicenseGateOpen] = useState(true);
  const [licenseRequiredOpen, setLicenseRequiredOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [broker, setBroker] = useState<Broker>("QUOTEX");
  const [pair, setPair] = useState(PAIRS[0]!.symbol);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("1m");
  const [risk] = useState<Risk>("Moderate");

  const [phase, setPhase] = useState<"standby" | "analyzing" | "signal">("standby");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [strength, setStrength] = useState(78);
  const [scanSteps, setScanSteps] = useState(4);
  const [signal, setSignal] = useState<Signal | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    void validateStoredLicense().then((result) => {
      if (result.valid) {
        setLicensed(true);
        setLicenseGateOpen(false);
      }
    });
  }, []);

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
      timers.current.push(setTimeout(() => setScanSteps(i + 1), 600 * (i + 1)));
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
        600 * SCANNER_STEPS.length + 600,
      ),
    );
  }, [pair, risk, timeframe]);

  const requestSignal = useCallback(async () => {
    const result = await validateStoredLicense();
    if (!result.valid) {
      clearStoredLicense();
      setLicensed(false);
      setLicenseRequiredOpen(true);
      return;
    }
    setLicensed(true);
    start();
  }, [start]);

  const activateLicense = useCallback(async (key: string) => {
    const result = await validateLicense(key);
    if (!result.valid) return result.reason;
    setLicensed(true);
    setLicenseGateOpen(false);
    setLicenseRequiredOpen(false);
    return null;
  }, []);

  const dashboard = (
    <div className="mx-auto max-w-4xl space-y-4">
      <BrokerSelect broker={broker} onBroker={setBroker} />
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        <TimeframeSelect timeframe={timeframe} onTimeframe={setTimeframe} />
        <PairSelect pair={pair} onChange={() => setPickerOpen(true)} />
      </div>
      <div>
        <SignalEngine
          phase={phase}
          signal={signal}
          secondsLeft={secondsLeft}
          strength={strength}
          pair={pair}
        />
        <StartButton running={phase === "analyzing"} onStart={() => void requestSignal()} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <SignalList
            title="RECENT SIGNALS"
            signals={signals}
            empty="No signals yet — press GET SIGNAL."
          />
          <Strategies />
        </div>
        <div className="space-y-4">
          <Scanner activeSteps={phase === "standby" ? 4 : scanSteps} />
          <PairsGrid onSelect={setPair} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <AppHeader onMenu={() => setMenuOpen(true)} />
        {dashboard}
      </main>
      <PairPicker
        open={pickerOpen}
        selected={pair}
        onClose={() => setPickerOpen(false)}
        onSelect={setPair}
      />
      {phase === "analyzing" ? <MarketScanner pair={pair} /> : null}
      {menuOpen ? <MenuSheet onClose={() => setMenuOpen(false)} /> : null}
      {!licensed && licenseGateOpen ? (
        <LicenseGate onActivate={activateLicense} onSkip={() => setLicenseGateOpen(false)} />
      ) : null}
      {!licenseGateOpen && licenseRequiredOpen ? (
        <LicenseRequired
          onClose={() => setLicenseRequiredOpen(false)}
          onGetLicense={() => {
            setLicenseRequiredOpen(false);
            setLicenseGateOpen(true);
          }}
        />
      ) : null}
      <h2 className="sr-only">{BRAND} AI signal bot</h2>
    </div>
  );
}
