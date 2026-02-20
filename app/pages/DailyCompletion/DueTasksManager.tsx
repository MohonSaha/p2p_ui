import { useState, useEffect, useCallback } from "react";
import { Trash2, CalendarDays, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";

// API Configuration
const API_BASE = "http://localhost:4001/api/v1/daily-completion";

// Task interface matching API response
interface Task {
  id: number;
  task: string;
  taskDate: string;
  isDone: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
}

const DueTasksManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const today = new Date().toLocaleDateString("en-CA");

  // Fetch due/undone tasks from API
  const fetchDueTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/due-tasks`);
      if (!res.ok) throw new Error("Failed to fetch due tasks");
      const data: Task[] = await res.json();
      // Filter out deleted tasks and sort by date
      const filtered = data
        .filter((t) => !t.isDeleted && !t.isDone)
        .sort((a, b) => a.taskDate.localeCompare(b.taskDate));
      setTasks(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load due tasks");
      console.error("Error fetching due tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchDueTasks();
  }, [fetchDueTasks]);

  // Delete task
  const handleDeleteTask = async (id: number) => {
    try {
      setDeletingId(id);
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
      console.error("Error deleting task:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Reassign task to a new date
  const handleReassignTask = async (id: number, newDate: Date) => {
    try {
      setUpdatingId(id);
      const dateStr = newDate.toLocaleDateString("en-CA");
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskDate: dateStr }),
      });
      if (!res.ok) throw new Error("Failed to update task date");
      // Update local state
      setTasks((prev) =>
        prev
          .map((t) => (t.id === id ? { ...t, taskDate: dateStr } : t))
          .sort((a, b) => a.taskDate.localeCompare(b.taskDate))
      );
      setOpenPopoverId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
      console.error("Error updating task:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Check if task is overdue
  const isOverdue = (date: string) => date < today;

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Due Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {tasks.length} pending task{tasks.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading tasks...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">🎉 All tasks are done!</p>
        </div>
      )}

      {/* Tasks list */}
      {!loading && tasks.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-colors group",
                  isOverdue(task.taskDate)
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border bg-secondary/20"
                )}
              >
                {/* Task info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {task.task}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isOverdue(task.taskDate)
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {isOverdue(task.taskDate) ? "Overdue · " : ""}
                    {formatDate(task.taskDate)}
                  </p>
                </div>

                {/* Calendar button */}
                <Popover
                  open={openPopoverId === task.id}
                  onOpenChange={(open) =>
                    setOpenPopoverId(open ? task.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={updatingId === task.id}
                      className="text-muted-foreground hover:text-slate-100 cursor-pointer"
                    >
                      {updatingId === task.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CalendarDays className="w-4 h-4" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={new Date(task.taskDate + "T00:00:00")}
                      onSelect={(date) => {
                        if (date) {
                          handleReassignTask(task.id, date);
                        }
                      }}
                      initialFocus
                      disabled={(date) =>
                        date <
                        new Date(
                          new Date().toLocaleDateString("en-CA") + "T00:00:00"
                        )
                      }
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {/* Delete button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={deletingId === task.id}
                  className="text-muted-foreground hover:text-destructive cursor-pointer"
                >
                  {deletingId === task.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DueTasksManager;
