import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Loader2 } from "lucide-react";
import { VITE_BASE_API } from "~/lib/serverUrls";

interface Task {
  id: number;
  task: string;
  taskDate: string;
  isDone: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
}

interface ManualTimeEntryProps {
  onClose: () => void;
}

const ManualTimeEntry = ({ onClose }: ManualTimeEntryProps) => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks for selected date
  const fetchTasksForDate = useCallback(async (date: string) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `${VITE_BASE_API}/daily-completion/date/${date}/tasks?isDone=false`
      );
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();
      setTasks(data);
      if (data.length > 0) {
        setSelectedTaskId(data[0].id.toString());
      } else {
        setSelectedTaskId("");
      }
    } catch (err) {
      setError("Could not load tasks for this date");
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, [selectedDate, fetchTasksForDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedTaskId) {
      setError("Please select a task");
      return;
    }

    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;

    if (h === 0 && m === 0) {
      setError("Please enter at least some time");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch(`${VITE_BASE_API}/time-entry/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: parseInt(selectedTaskId),
          entryDate: selectedDate,
          entryType: "MANUAL",
          hours: h,
          minutes: m,
          seconds: 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to add time entry");

      setHours("0");
      setMinutes("0");
      setSelectedDate(today);
      setSelectedTaskId("");
      onClose();
    } catch (err) {
      setError("Failed to add manual time entry");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Date Picker */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Task Selector */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Task
        </label>
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading tasks...
            </span>
          </div>
        ) : (
          <Select
            value={selectedTaskId}
            onValueChange={setSelectedTaskId}
            disabled={tasks.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground">
                  No tasks available for this date
                </div>
              ) : (
                tasks.map((task) => (
                  <SelectItem key={task.id} value={task.id.toString()}>
                    {task.task}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Time Input */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Hours
          </label>
          <Input
            type="number"
            min="0"
            max="24"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full"
            placeholder="0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Minutes
          </label>
          <Input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full"
            placeholder="0"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedTaskId || tasks.length === 0}
          className="flex-1"
          size="lg"
        >
          {isSubmitting ? "Adding..." : "Add Manual Time"}
        </Button>
      </div>
    </div>
  );
};

export default ManualTimeEntry;
