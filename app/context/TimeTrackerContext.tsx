import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface TimeTrackerContextType {
  entryId: number | null;
  taskId: number | null;
  seconds: number;
  isRunning: boolean;
  startTracking: (taskId: number, entryId: number) => void;
  stopTracking: () => void;
  pauseResumeTracking: () => void;
  resetTracking: () => void;
}

const TimeTrackerContext = createContext<TimeTrackerContextType | undefined>(
  undefined
);

export const TimeTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [entryId, setEntryId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect - runs regardless of dialog open/close
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Save timer state to localStorage to persist across page reloads
  useEffect(() => {
    if (entryId && taskId) {
      localStorage.setItem(
        "timeTrackerState",
        JSON.stringify({
          entryId,
          taskId,
          seconds,
          isRunning,
          timestamp: Date.now(),
        })
      );
    }
  }, [entryId, taskId, seconds, isRunning]);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("timeTrackerState");
    if (savedState) {
      try {
        const {
          entryId: savedEntryId,
          taskId: savedTaskId,
          seconds: savedSeconds,
          isRunning: wasRunning,
          timestamp,
        } = JSON.parse(savedState);

        // If timer was running, add the elapsed time since last save
        let newSeconds = savedSeconds;
        if (wasRunning) {
          const elapsed = Math.floor((Date.now() - timestamp) / 1000);
          newSeconds = savedSeconds + elapsed;
        }

        setEntryId(savedEntryId);
        setTaskId(savedTaskId);
        setSeconds(newSeconds);
        setIsRunning(wasRunning);
      } catch (err) {
        console.error("Failed to load timer state:", err);
      }
    }
  }, []);

  const startTracking = (newTaskId: number, newEntryId: number) => {
    setTaskId(newTaskId);
    setEntryId(newEntryId);
    setSeconds(0);
    setIsRunning(true);
  };

  const stopTracking = () => {
    setIsRunning(false);
    setSeconds(0);
    setEntryId(null);
    setTaskId(null);
    localStorage.removeItem("timeTrackerState");
  };

  const pauseResumeTracking = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTracking = () => {
    setSeconds(0);
    setIsRunning(false);
    setEntryId(null);
    setTaskId(null);
    localStorage.removeItem("timeTrackerState");
  };

  return (
    <TimeTrackerContext.Provider
      value={{
        entryId,
        taskId,
        seconds,
        isRunning,
        startTracking,
        stopTracking,
        pauseResumeTracking,
        resetTracking,
      }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};

export const useTimeTracker = () => {
  const context = useContext(TimeTrackerContext);
  if (!context) {
    throw new Error("useTimeTracker must be used within TimeTrackerProvider");
  }
  return context;
};
