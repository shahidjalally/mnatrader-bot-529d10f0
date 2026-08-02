import { MoreVertical } from "lucide-react";
import logo from "@/assets/mna-logo.png";
import { BRAND, TICKER } from "@/lib/bot";
import { TrendingUp } from "lucide-react";

export function AppHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 -mx-3 mb-3 bg-background/85 px-3 pb-2 pt-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt={`${BRAND} AI signal bot logo`}
          width={56}
          height={56}
          className="size-14 rounded-full border border-primary/40 bg-panel-2 p-1"
        />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold neon-cyan">{BRAND}</h1>
          <p className="text-[10px] tracking-widest text-muted-foreground">
            AI BOT • POCKET OPTION
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold tracking-widest text-up">
            <span className="size-1.5 rounded-full bg-up" />
            2,512 ACTIVE TRADERS
          </p>
        </div>
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary"
        >
          <MoreVertical className="size-5" />
        </button>
      </div>
    </header>
  );
}

export function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <div className="panel-glow overflow-hidden rounded-lg py-2">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
            {row.map((p, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-2 whitespace-nowrap text-xs">
                <TrendingUp className={`size-3 ${p.up ? "text-up" : "text-down"}`} />
                <span className="font-bold neon-cyan">{p.symbol}</span>
                <span className="text-muted-foreground">(OTC)</span>
                <span className={`font-bold ${p.up ? "text-up" : "text-down"}`}>WIN {p.win}%</span>
                <span className="text-muted-foreground">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
