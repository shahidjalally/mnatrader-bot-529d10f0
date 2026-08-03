import { KeyRound, Send, CheckCircle2, Rocket, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND, QUOTEX_URL, TELEGRAM_URL, TRADOWIX_URL } from "@/lib/bot";

export function LicenseGate({ onUnlock }: { onUnlock: () => void }) {
  const [key, setKey] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const steps = [
    {
      n: 1,
      title: "Create Your Account",
      sub: "Create a Quotex or TradoWix account",
      links: [
        { cta: "Quotex", href: QUOTEX_URL },
        { cta: "TradoWix", href: TRADOWIX_URL },
      ],
      Icon: Rocket,
      tone: "primary" as const,
    },
    {
      n: 2,
      title: "Deposit minimum $50",
      sub: "Fund your Quotex or TradoWix account",
      cta: "Deposit",
      links: [{ cta: "Deposit", href: QUOTEX_URL }],
      Icon: CheckCircle2,
      tone: "up" as const,
    },
    {
      n: 3,
      title: "Send Trader ID to Admin",
      sub: "Share your ID on Telegram to receive your key",
      cta: "Contact",
      links: [{ cta: "Contact", href: TELEGRAM_URL }],
      Icon: Send,
      tone: "muted" as const,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-sm">
      <div className="panel-glow w-full max-w-md rounded-2xl p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold neon-cyan">🔑 How to Get Your License</h2>
          <p className="mt-1 text-xs text-muted-foreground">Follow 3 easy steps</p>
          {countdown > 0 ? (
            <p className="mt-1 text-xs font-bold text-primary">Skip available in {countdown}s</p>
          ) : (
            <button
              type="button"
              onClick={onUnlock}
              className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary"
            >
              <X className="size-3" /> Skip for now
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {steps.map(({ n, title, sub, links, Icon, tone }) => (
            <div
              key={n}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary/20 text-xs font-bold text-primary">
                {n}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{title}</span>
                <span className="block text-[11px] text-muted-foreground">{sub}</span>
              </span>
              <span className="flex shrink-0 flex-col gap-1 sm:flex-row">
                {links.map(({ cta, href }) => (
                  <a
                    key={cta}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1 rounded-full px-2.5 py-2 text-[11px] font-bold ${
                      tone === "primary"
                        ? "glow-btn"
                        : tone === "up"
                          ? "border border-up/50 bg-up/10 text-up"
                          : "border border-border bg-background/80 text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" /> {cta}
                  </a>
                ))}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm font-bold neon-cyan">
          <KeyRound className="size-4" /> Enter Your License Key
        </p>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          aria-label="License key"
          className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-center tracking-[0.3em] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="button"
          onClick={onUnlock}
          className="glow-btn mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-display text-lg font-bold tracking-widest"
        >
          <Rocket className="size-5" /> Activate Bot
        </button>
        <p className="mt-3 text-center text-[10px] tracking-widest text-muted-foreground">
          {BRAND} AI BOT v1.0
        </p>
      </div>
    </div>
  );
}

export function MenuSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-background/80 backdrop-blur-sm">
      <div className="panel-glow w-full rounded-t-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold neon-cyan">{BRAND}</h3>
          <button type="button" onClick={onClose} aria-label="Close menu">
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-2">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn flex items-center justify-center gap-2 rounded-xl py-3 font-bold"
          >
            <Send className="size-4" /> Join Telegram Channel
          </a>
          <a
            href={QUOTEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-up/50 bg-up/10 py-3 font-bold text-up"
          >
            <CheckCircle2 className="size-4" /> Create Quotex Account
          </a>
          <a
            href={TRADOWIX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-up/50 bg-up/10 py-3 font-bold text-up"
          >
            <CheckCircle2 className="size-4" /> Create TradoWix Account
          </a>
        </div>
        <p className="mt-3 text-center text-[10px] tracking-widest text-muted-foreground">
          AI BOT v1.0 • Brokers: Quotex &amp; TradoWix
        </p>
      </div>
    </div>
  );
}
