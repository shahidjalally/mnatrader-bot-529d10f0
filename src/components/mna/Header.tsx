import { Bell, Menu } from "lucide-react";
import logo from "@/assets/mna-logo.png";
import { BRAND, TICKER } from "@/lib/bot";
import { TrendingUp } from "lucide-react";

export function AppHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="mb-6 flex items-center gap-4 border-b border-border pb-5 pt-5">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <img
          src={logo}
          alt={`${BRAND} AI signal bot logo`}
          width={56}
          height={56}
          className="size-11 rounded-xl border border-border bg-foreground p-1 shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold">
            {BRAND}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Market intelligence desk
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className="status-pill">
          <span className="size-1.5 rounded-full bg-up" /> Markets live
        </span>
        <span className="text-xs text-muted-foreground">2,512 traders online</span>
      </div>
      <button type="button" aria-label="Notifications" className="icon-button hidden sm:grid">
        <Bell className="size-4" />
      </button>
      <button type="button" onClick={onMenu} aria-label="Open menu" className="icon-button">
        <Menu className="size-5" />
      </button>
    </header>
  );
}

export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-foreground py-2.5 text-background shadow-sm">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
            {row.map((p, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap text-xs"
              >
                <TrendingUp className={`size-3 ${p.up ? "text-up" : "text-down"}`} />
                <span className="font-bold text-background">{p.symbol}</span>
                <span className="text-background/50">OTC</span>
                <span className={`font-bold ${p.up ? "text-up" : "text-down"}`}>WIN {p.win}%</span>
                <span className="text-background/30">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
