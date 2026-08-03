import {
  LayoutDashboard,
  History,
  Sparkles,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
} from "lucide-react";

export type Tab = "dashboard" | "history" | "bot" | "analytics" | "settings";

const ITEMS: { id: Tab; label: string; Icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Overview", Icon: LayoutDashboard },
  { id: "history", label: "History", Icon: History },
  { id: "bot", label: "Signal desk", Icon: Sparkles },
  { id: "analytics", label: "Insights", Icon: ChartNoAxesCombined },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function BottomNav({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  return (
    <nav className="mb-5 overflow-x-auto lg:mb-0 lg:w-56 lg:shrink-0">
      <div className="flex min-w-max gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-sm lg:min-w-0 lg:flex-col lg:p-3">
        {ITEMS.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTab(id)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Icon className={`size-4 ${active ? "text-primary" : ""}`} />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          );
        })}
        <div className="mt-5 hidden border-t border-border pt-3 lg:block">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Workspace
          </p>
          <div className="mt-3 flex items-center gap-2 px-3 text-xs">
            <CircleHelp className="size-4" /> Help center
          </div>
        </div>
      </div>
    </nav>
  );
}
