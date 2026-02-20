/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import { CheckCircle2, Circle, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const API_BASE = "http://localhost:4001/api/v1/daily-completion";
// export const API_BASE =
//   "https://p2pserver-production-a821.up.railway.app/api/v1/daily-completion";

export interface Task {
  id: number;
  task: string;
  taskDate: string;
  isDone: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
}

export type GroupedPlans = Record<string, Task[]>;

const DailyPlanner = () => {
  const [plans, setPlans] = useState<GroupedPlans>({});
  const today = new Date().toLocaleDateString("en-CA");
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(today);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  // Fetch all tasks and group by date
  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();

      const grouped: GroupedPlans = {};
      for (const task of data) {
        if (!task.isDeleted) {
          const date = task.taskDate.split("T")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(task);
        }
      }
      setPlans(grouped);
    } catch (err) {
      setError("Could not load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasks = plans[selectedDate] || [];
  const doneCount = tasks.filter((t) => t.isDone).length;
  const totalCount = tasks.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  // Build the fixed date tabs: only today and tomorrow if they exist in DB
  const fixedDates = [today, tomorrow].filter((d) => plans[d]);

  // If selectedDate is something other than today/tomorrow, include it too
  const visibleDates = fixedDates.includes(selectedDate)
    ? fixedDates
    : selectedDate
    ? [...fixedDates, selectedDate].slice(0, 3)
    : fixedDates;

  const handlePlusClick = () => {
    datePickerRef.current?.showPicker?.();
    datePickerRef.current?.click();
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.value;
    if (!picked) return;
    if (!plans[picked]) {
      setPlans((prev) => ({ ...prev, [picked]: [] }));
    }
    setSelectedDate(picked);
    e.target.value = "";
  };

  const formatDateLabel = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  // Toggle task done/undone via PATCH
  const toggleTask = async (task: Task) => {
    try {
      setPlans((prev) => ({
        ...prev,
        [selectedDate]: prev[selectedDate].map((t) =>
          t.id === task.id ? { ...t, isDone: !t.isDone } : t
        ),
      }));

      const patchRes = await fetch(`${API_BASE}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDone: !task.isDone }),
      });
      if (!patchRes.ok) throw new Error("Failed to update task");

      await fetchTasks();
    } catch (err) {
      setError("Failed to update task.");
      await fetchTasks();
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await fetch(API_BASE + "/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: newTask.trim(),
          taskDate: selectedDate,
          isDone: false,
        }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      setNewTask("");
      await fetchTasks();
    } catch (err) {
      setError("Failed to add task.");
    }
  };

  // Delete a task
  const removeTask = async (id: number) => {
    try {
      setPlans((prev) => ({
        ...prev,
        [selectedDate]: prev[selectedDate].filter((t) => t.id !== id),
      }));

      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      await fetchTasks();
    } catch (err) {
      setError("Failed to delete task.");
      await fetchTasks();
    }
  };

  return (
    <section className="">
      <div className="container">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-card">
            {/* Date selector */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 items-center">
              {/* Plus button — always first */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={handlePlusClick}
                  className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all bg-secondary text-secondary-foreground hover:bg-muted flex items-center gap-1"
                  title="Pick a date"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {/* Hidden date input */}
                <input
                  ref={datePickerRef}
                  type="date"
                  onChange={handleDatePickerChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  tabIndex={-1}
                />
              </div>

              {/* Date tabs */}
              {visibleDates.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    d === selectedDate
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {d === today
                    ? "Today"
                    : d === tomorrow
                    ? "Tomorrow"
                    : formatDateLabel(d)}
                </button>
              ))}
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Loading tasks...
                  </span>
                </div>
              ) : tasks.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No tasks planned for this day. Add one below!
                </p>
              ) : (
                tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                      t.isDone
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-secondary/30"
                    }`}
                    onClick={() => toggleTask(t)}
                  >
                    {t.isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span
                      className={`flex-1 ${
                        t.isDone ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {t.task}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTask(t.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add task */}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Daily summary */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground mb-4">Day Completion</p>
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  className="stroke-secondary"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={
                    2 * Math.PI * 52 - (pct / 100) * 2 * Math.PI * 52
                  }
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-display">
                {pct}%
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">{doneCount}</span> of{" "}
              {totalCount} tasks done
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyPlanner;
