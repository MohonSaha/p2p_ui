import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, ChartBar, ChartPie } from "lucide-react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import { DailyPieChart } from "~/pages/TimeGraph/DailyPieChart";
import { MonthlyBarChart } from "~/pages/TimeGraph/MonthlyBarChart";
import { StatsCards } from "~/pages/TimeGraph/StatsCards";
import type { TimeEntry } from "~/lib/time-utils";
import { fetchEntriesByDate } from "~/lib/api";
import { WeeklyBarChart } from "~/pages/TimeGraph/WeeklyBarChart";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("daily");

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [dailyEntries, setDailyEntries] = useState<TimeEntry[]>([]);
  const [dailyLoading, setDailyLoading] = useState(true);
  const [dailyError, setDailyError] = useState<Error | null>(null);

  const loadDailyEntries = async (date: Date) => {
    try {
      setDailyLoading(true);
      setDailyError(null);
      const data = await fetchEntriesByDate(format(date, "yyyy-MM-dd"));
      setDailyEntries(data);
    } catch (err) {
      setDailyError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setDailyLoading(false);
    }
  };

  useEffect(() => {
    loadDailyEntries(selectedDate);
    const interval = setInterval(() => loadDailyEntries(selectedDate), 30000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const todayStr = format(today, "yyyy-MM-dd");

  return (
    <SectionContainer>
      <div className="min-h-screen bg-dark pt-20">
        {/* Header */}
        <header className="border-b border-border bg-dark">
          <div className="py-2 flex items-center justify-between w-full">
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                TaskGraph
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Everyone has the same 24 hours
              </p>
            </div>

            <Button
              onClick={() => navigate(-1)}
              size="sm"
              className="inline-flex sm:hidden rounded-full p-1 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-muted-foreground/90"
              variant={"outline"}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

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
              <DailyPieChart
                entries={dailyEntries}
                loading={dailyLoading}
                error={dailyError}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
              <StatsCards entries={dailyEntries} dateStr={todayStr} />
            </div>
          )}

          {activeTab === "weekly" && (
            <div className="space-y-6">
              <StatsCards entries={dailyEntries} dateStr={todayStr} />
              <WeeklyBarChart entries={dailyEntries} />
            </div>
          )}

          {activeTab === "monthly" && (
            <div className="space-y-6">
              <StatsCards entries={dailyEntries} dateStr={todayStr} />
              <MonthlyBarChart entries={dailyEntries} />
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
