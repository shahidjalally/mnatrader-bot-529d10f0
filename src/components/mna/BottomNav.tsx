import { LayoutGrid, History, Bot, BarChart2, Settings } from "lucide-react";

export type Tab = "dashboard" | "history" | "bot" | "analytics" | "settings";

const ITEMS: { id: Tab; label: string; Icon: typeof LayoutGrid }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutGrid },
  { id: "history", label: "History", Icon: History },
  { id: "bot", label: "Bot", Icon: Bot },
  { id: "analytics", label: "Analytics", Icon: BarChart2 },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function BottomNav({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3 pb-3">
      <div className="panel-glow relative flex items-end justify-between rounded-2xl px-4 py-2">
        {ITEMS.map(({ id, label, Icon }) => {
          const active = tab === id;
          if (id === "bot") {
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTab(id)}
                className="-mt-8 flex flex-col items-center gap-1"
                aria-label="Bot"
              >
                <span className="glow-btn grid size-12 place-items-center rounded-full">
                  <Icon className="size-6" />
                </span>
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </button>
            );
          }
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTab(id)}
              className="flex flex-col items-center gap-1 py-1"
            >
              <Icon className={`size-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span
                className={`text-[10px] ${active ? "font-bold text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
