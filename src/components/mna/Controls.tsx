import { Box, ChevronDown, Zap, Play, Target } from "lucide-react";
import { BROKERS, PAIRS, SERVER_ID, TIMEFRAMES, RISKS, type Broker, type Risk } from "@/lib/bot";

export function BrokerSelect({
  broker,
  onBroker,
}: {
  broker: Broker;
  onBroker: (broker: Broker) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {BROKERS.map((item) => {
        const active = broker === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onBroker(item)}
            className={`panel-glow flex items-center gap-2 rounded-xl px-3 py-4 text-left ${
              active ? "border-primary! ring-1 ring-primary/60" : ""
            }`}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
              <Box className="size-4" />
            </span>
            <span className="min-w-0">
              <span
                className={`block truncate text-sm font-bold ${active ? "neon-cyan" : "text-foreground"}`}
              >
                {item}
              </span>
              <span className="block text-[10px] text-muted-foreground">1m - 1h</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function BrokerStatus({ broker }: { broker: Broker }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="panel-glow rounded-xl px-3 py-3">
        <p className="text-[10px] tracking-widest text-muted-foreground">BROKER</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded bg-primary/20 text-[10px] font-bold text-primary">
            P
          </span>
          <span className="flex-1 text-sm font-bold">{broker}</span>
        </div>
      </div>
      <div className="panel-glow rounded-xl px-3 py-3">
        <p className="text-[10px] tracking-widest text-muted-foreground">STATUS</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-up">
          <span className="size-1.5 rounded-full bg-up" />
          Connected
        </p>
        <p className="text-[10px] text-muted-foreground">Server: {SERVER_ID}</p>
      </div>
    </div>
  );
}

export function PairSelect({ pair, onChange }: { pair: string; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="panel-glow flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Target className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] tracking-widest text-muted-foreground">
          SELECTED PAIR
        </span>
        <span className="block truncate font-display text-xl font-bold neon-cyan">{pair}</span>
      </span>
      <span className="flex items-center gap-1 text-xs font-bold tracking-widest text-primary">
        CHANGE <ChevronDown className="size-3" />
      </span>
    </button>
  );
}

export function TimeframeRisk({
  timeframe,
  onTimeframe,
  risk,
  onRisk,
}: {
  timeframe: string;
  onTimeframe: (t: string) => void;
  risk: Risk;
  onRisk: (r: Risk) => void;
}) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr] gap-3">
      <div className="panel-glow rounded-xl p-3">
        <p className="text-[10px] tracking-widest text-muted-foreground">TIMEFRAME</p>
        <p className="mt-1 text-sm">
          Selected: <span className="font-bold neon-cyan">{timeframe}</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TIMEFRAMES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTimeframe(t)}
              className={`rounded-md border px-2 py-1 text-xs ${
                t === timeframe
                  ? "border-primary bg-primary/15 font-bold text-primary"
                  : "border-border bg-muted/50 text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="panel-glow rounded-xl p-3">
        <p className="text-[10px] tracking-widest text-muted-foreground">RISK LEVEL</p>
        <p className="mt-1 text-sm font-bold text-warn">{risk}</p>
        <div className="mt-2 space-y-1.5">
          {RISKS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRisk(r)}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                r === risk
                  ? "border-primary bg-primary/15 font-bold text-primary"
                  : "border-border bg-muted/50 text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimeframeSelect({
  timeframe,
  onTimeframe,
}: {
  timeframe: string;
  onTimeframe: (t: string) => void;
}) {
  return (
    <div className="panel-glow h-full rounded-xl p-3">
      <p className="text-[10px] tracking-widest text-muted-foreground">SELECT TIME</p>
      <p className="mt-1 text-sm">
        Selected: <span className="font-bold neon-cyan">{timeframe}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TIMEFRAMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTimeframe(t)}
            className={`rounded-md border px-2 py-1 text-xs ${
              t === timeframe
                ? "border-primary bg-primary/15 font-bold text-primary ring-1 ring-primary/40"
                : "border-border bg-muted/50 text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PairPicker({
  open,
  selected,
  onClose,
  onSelect,
}: {
  open: boolean;
  selected: string;
  onClose: () => void;
  onSelect: (symbol: string) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-background/80 backdrop-blur-sm">
      <div className="panel-glow max-h-[75vh] w-full overflow-y-auto rounded-t-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold neon-cyan">SELECT PAIR</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-widest text-muted-foreground"
          >
            CLOSE
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PAIRS.map((p) => (
            <button
              key={p.symbol}
              type="button"
              onClick={() => {
                onSelect(p.symbol);
                onClose();
              }}
              className={`rounded-lg border px-3 py-2 text-left ${
                p.symbol === selected
                  ? "border-primary bg-primary/15 ring-1 ring-primary/50"
                  : "border-border bg-muted/50"
              }`}
            >
              <span className="block text-sm font-bold">{p.symbol}</span>
              <span className={`block text-[10px] ${p.up ? "text-up" : "text-down"}`}>
                Signal confidence {p.win}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StartButton({ running, onStart }: { running: boolean; onStart: () => void }) {
  return (
    <div className="mt-4">
      <button
        type="button"
        disabled={running}
        onClick={onStart}
        className="glow-btn flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-xl font-bold tracking-widest disabled:opacity-60"
      >
        {running ? <Zap className="size-5" /> : <Play className="size-5" />}
        {running ? "SCANNING MARKET" : "GET SIGNAL"}
      </button>
      <p className="mt-2 text-center text-xs text-muted-foreground">Active AI Signal Bot</p>
    </div>
  );
}
