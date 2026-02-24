import { useEffect, useState } from "react";
import { CalendarDays, ChartBar, ChartPie } from "lucide-react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import { DailyPieChart } from "~/pages/TimeGraph/DailyPieChart";
import { MonthlyBarChart } from "~/pages/TimeGraph/MonthlyBarChart";
import { StatsCards } from "~/pages/TimeGraph/StatsCards";
import type { TimeEntry } from "~/lib/time-utils";
import { fetchTodayEntries } from "~/lib/api";
import { WeeklyBarChart } from "~/pages/TimeGraph/WeeklyBarChart";

type Tab = "daily" | "weekly" | "monthly";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "daily",
    label: "Daily",
    icon: <ChartPie className="w-4 h-4" />,
  },
  {
    key: "weekly",
    label: "Weekly",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    key: "monthly",
    label: "Monthly",
    icon: <ChartBar className="w-4 h-4" />,
  },
];

function TimeGraph() {
  const [activeTab, setActiveTab] = useState<Tab>("daily");
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodayEntries();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
    const interval = setInterval(loadEntries, 30000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <SectionContainer>
      <div className="min-h-screen bg-dark pt-22">
        {/* Header */}
        <header className="border-b border-border bg-dark">
          <div className="py-2 flex items-center justify-between w-full">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                TaskGraph
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Everyone has the same 24 hours
              </p>
            </div>

            <div className="flex items-center gap-1 bg-dark rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-sm)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="py-6">
          {activeTab === "daily" && (
            <div className="space-y-6">
              <StatsCards entries={entries} dateStr={today} />
              <DailyPieChart entries={entries} />
            </div>
          )}

          {activeTab === "weekly" && (
            <div className="space-y-6">
              <StatsCards entries={entries} dateStr={today} />
              {/* Swap in your WeeklyBarChart or similar component here */}
              <WeeklyBarChart entries={entries} />
            </div>
          )}

          {activeTab === "monthly" && (
            <div className="space-y-6">
              <StatsCards entries={entries} dateStr={today} />
              <MonthlyBarChart entries={entries} />
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
            <p>Data auto-refreshes every 30 seconds</p>
          </div>
        </main>
      </div>
    </SectionContainer>
  );
}

export default TimeGraph;
