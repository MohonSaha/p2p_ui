import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Plus, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getCurrentMonth,
  getAdjacentMonth,
  formatMonthLabel,
  getDaysInMonth,
} from "~/hooks/useMonthlyMap";
import { GoalTable } from "~/pages/MonthlyMap/GoalTable";
import { AddGoalDialog } from "~/pages/MonthlyMap/AddGoalDialog";
import { MonthPickerDialog } from "~/pages/MonthlyMap/MonthPickerDialog";
import { SectionContainer } from "~/components/shared/SectionContainer";
import { VITE_BASE_API } from "~/lib/serverUrls";

export interface ApiGoal {
  id: number;
  goalName: string;
  goalType: "boolean" | "text";
  goalTextValue: string | null;
  goalBooleanValue: boolean | null;
  goalDate: string;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
  trackerData: ApiTrackerEntry[];
}

export interface ApiTrackerEntry {
  id: number;
  goalId: number;
  trackingDate: string;
  trackingValue: string;
  created_at: string;
  updated_at: string;
}

const MonthlyMap = () => {
  const currentMonth = getCurrentMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const [goals, setGoals] = useState<ApiGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async (month: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${VITE_BASE_API}/monthly-goal/month/${month}/tracker`
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data: ApiGoal[] = await res.json();
      setGoals(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals(selectedMonth);
  }, [selectedMonth, fetchGoals]);

  // getCellValue: looks up trackerData for a given goalId + date
  const getCellValue = (goalId: string, date: string): string | undefined => {
    const goal = goals.find((g) => String(g.id) === goalId);
    if (!goal) return undefined;
    const entry = goal.trackerData.find((t) => t.trackingDate === date);
    if (!entry) return undefined;
    if (goal.goalType === "boolean") {
      return entry.trackingValue === "1" ? "true" : "false";
    }
    return entry.trackingValue;
  };

  // setCellValue: POST to create tracker entry, then refetch
  const setCellValue = async (goalId: string, date: string, value: string) => {
    const goal = goals.find((g) => String(g.id) === goalId);
    if (!goal) return;

    let trackingValue: number | string;
    if (goal.goalType === "boolean") {
      trackingValue = value === "true" ? 1 : 0;
    } else {
      trackingValue = value;
    }

    try {
      const res = await fetch(`${VITE_BASE_API}/goal-tracker/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goalId: goal.id,
          trackingDate: date,
          trackingValue,
        }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      // Optimistic update: patch local state instead of full refetch for snappiness
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id !== goal.id) return g;
          const existingIdx = g.trackerData.findIndex(
            (t) => t.trackingDate === date
          );
          const newEntry: ApiTrackerEntry = {
            id: Date.now(), // temporary id until refetch
            goalId: goal.id,
            trackingDate: date,
            trackingValue: String(trackingValue),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          const updatedTrackerData =
            existingIdx >= 0
              ? g.trackerData.map((t, i) => (i === existingIdx ? newEntry : t))
              : [...g.trackerData, newEntry];
          return { ...g, trackerData: updatedTrackerData };
        })
      );
    } catch (err: any) {
      console.error("Failed to save tracker entry:", err);
    }
  };

  const removeGoal = (goalId: string) => {
    // Wire up your delete API here if available
    setGoals((prev) => prev.filter((g) => String(g.id) !== goalId));
  };

  const addGoal = async (goal: { name: string; valueType: string }) => {
    // Wire up your add-goal API here if available, then refetch
    await fetchGoals(selectedMonth);
  };

  const prevMonth = getAdjacentMonth(selectedMonth, -1);
  const nextMonth = getAdjacentMonth(selectedMonth, 1);

  function formatMonthLabelMobile(month: string) {
    return new Date(month).toLocaleString("en-US", { month: "short" });
  }

  // Convert ApiGoal[] to the shape GoalTable expects
  const tableGoals = goals.map((g) => ({
    id: String(g.id),
    name: g.goalName,
    valueType: g.goalType === "boolean" ? "boolean" : "text",
  }));

  return (
    <SectionContainer>
      <div className="min-h-screen bg-dark pt-22">
        <div className="mx-auto">
          {/* Month Navigation */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedMonth === prevMonth ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMonth(prevMonth)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:block">
                {formatMonthLabel(prevMonth)}
              </span>
            </Button>
            <Button
              variant={selectedMonth === currentMonth ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMonth(currentMonth)}
            >
              <span className="hidden sm:block">
                {formatMonthLabel(currentMonth)}
              </span>
              <span className="sm:hidden block">
                {formatMonthLabelMobile(currentMonth)}
              </span>
            </Button>
            <Button
              variant={selectedMonth === nextMonth ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMonth(nextMonth)}
            >
              <span className="hidden sm:block">
                {formatMonthLabel(nextMonth)}
              </span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMonthPickerOpen(true)}
              title="Pick a month"
            >
              <CalendarDays className="h-5 w-5" />
            </Button>
            <div className="ml-auto">
              <Button onClick={() => setAddGoalOpen(true)} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline-flex">Add Goal</span>
              </Button>
            </div>
          </div>

          {/* Loading / Error / Empty / Table */}
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30 animate-pulse" />
              <p className="text-lg font-medium">Loading goals...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-destructive">
              <p className="text-lg font-medium">Error: {error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => fetchGoals(selectedMonth)}
              >
                Retry
              </Button>
            </div>
          ) : tableGoals.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">
                No goals for {formatMonthLabel(selectedMonth)}
              </p>
              <p className="text-sm mt-1">Click "Add Goal" to get started</p>
            </div>
          ) : (
            <GoalTable
              month={selectedMonth}
              goals={tableGoals}
              getCellValue={getCellValue}
              setCellValue={setCellValue}
              removeGoal={removeGoal}
            />
          )}
        </div>

        <AddGoalDialog
          open={addGoalOpen}
          onClose={() => setAddGoalOpen(false)}
          onAdd={addGoal}
          goalDate={selectedMonth}
        />
        <MonthPickerDialog
          open={monthPickerOpen}
          onClose={() => setMonthPickerOpen(false)}
          onSelect={setSelectedMonth}
          currentMonth={selectedMonth}
        />
      </div>
    </SectionContainer>
  );
};

export default MonthlyMap;
