import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Loader2, Play, Pause, Square } from "lucide-react";
import { useTimeTracker } from "~/context/TimeTrackerContext";

const API_BASE =
  "https://p2pserver-production-a821.up.railway.app/api/v1/time-entry";

interface Task {
  id: number;
  task: string;
  taskDate: string;
  isDone: boolean;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
}

interface LiveTimeTrackerProps {
  onClose: () => void;
}

const LiveTimeTracker = ({ onClose }: LiveTimeTrackerProps) => {
  const {
    entryId,
    taskId,
    seconds,
    isRunning,
    startTracking,
    stopTracking,
    pauseResumeTracking,
  } = useTimeTracker();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    taskId ? taskId.toString() : ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch today's tasks
  const fetchTodaysTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/today/tasks`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();
      setTasks(data);
      if (data.length > 0) {
        setSelectedTaskId(data[0].id.toString());
      }
    } catch (err) {
      setError("Could not load today's tasks. Is the server running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodaysTasks();
  }, [fetchTodaysTasks]);

  // Update selectedTaskId when context taskId changes
  useEffect(() => {
    if (taskId) {
      setSelectedTaskId(taskId.toString());
    }
  }, [taskId]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = async () => {
    if (!selectedTaskId) {
      setError("Please select a task");
      return;
    }

    try {
      setError(null);
      const today = new Date().toISOString().split("T")[0];

      const res = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: parseInt(selectedTaskId),
          entryDate: today,
          entryType: "LIVE",
          startTime: new Date().toISOString(),
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to start time entry");
      const data = await res.json();
      startTracking(parseInt(selectedTaskId), data.data.id);
    } catch (err) {
      setError("Failed to start time tracking");
      console.error(err);
    }
  };

  const handlePause = () => {
    pauseResumeTracking();
  };

  const handleStop = async () => {
    if (!entryId) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      const res = await fetch(`${API_BASE}/${entryId}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endTime: new Date().toISOString(),
          hours,
          minutes,
          seconds: secs,
        }),
      });

      if (!res.ok) throw new Error("Failed to stop time entry");

      stopTracking();
      setSelectedTaskId(tasks.length > 0 ? tasks[0].id.toString() : "");
      onClose();
    } catch (err) {
      setError("Failed to stop time tracking");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground text-sm">
          Loading tasks...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Timer Display */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-8 text-center">
        <div className="text-5xl font-bold text-blue-600 font-display tracking-tight">
          {formatTime(seconds)}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-600 font-medium">
            {isRunning ? "Recording..." : "Paused"}
          </span>
        </div>
      </div>

      {/* Task Selector */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Task
        </label>
        <Select
          value={selectedTaskId}
          onValueChange={setSelectedTaskId}
          disabled={isRunning}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a task" />
          </SelectTrigger>
          <SelectContent>
            {tasks.map((task) => (
              <SelectItem key={task.id} value={task.id.toString()}>
                {task.task}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isRunning && seconds === 0 ? (
          <Button
            onClick={handleStart}
            disabled={!selectedTaskId || isSubmitting}
            className="flex-1 gap-2"
            size="lg"
          >
            <Play className="w-4 h-4" />
            Start
          </Button>
        ) : (
          <>
            <Button
              onClick={handlePause}
              variant="outline"
              className="flex-1 gap-2"
              size="lg"
            >
              <Pause className="w-4 h-4" />
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              onClick={handleStop}
              disabled={isSubmitting}
              variant="destructive"
              className="flex-1 gap-2"
              size="lg"
            >
              <Square className="w-4 h-4" />
              {isSubmitting ? "Stopping..." : "Stop"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveTimeTracker;
