import { Bell, Menu } from "lucide-react";
import logo from "@/assets/mna-logo.png";
import { BRAND } from "@/lib/bot";

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
          <span className="size-1.5 rounded-full bg-up" /> AI online
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
