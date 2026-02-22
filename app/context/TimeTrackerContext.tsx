// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useRef,
//   type ReactNode,
// } from "react";

// interface TimeTrackerContextType {
//   entryId: number | null;
//   taskId: number | null;
//   seconds: number;
//   isRunning: boolean;
//   startTracking: (taskId: number, entryId: number) => void;
//   stopTracking: () => void;
//   pauseResumeTracking: () => void;
//   resetTracking: () => void;
// }

// interface SavedTimerState {
//   entryId: number;
//   taskId: number;
//   startTime: string; // ISO timestamp (e.g., "2026-02-22T15:30:00.000Z")
//   isRunning: boolean;
//   pausedSeconds?: number; // Only set when paused
// }

// const TimeTrackerContext = createContext<TimeTrackerContextType | undefined>(
//   undefined
// );

// export const TimeTrackerProvider = ({ children }: { children: ReactNode }) => {
//   const [entryId, setEntryId] = useState<number | null>(null);
//   const [taskId, setTaskId] = useState<number | null>(null);
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [startTime, setStartTime] = useState<string | null>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Calculate elapsed seconds based on startTime
//   const calculateElapsedSeconds = (start: string, paused?: number): number => {
//     if (paused !== undefined) return paused; // Return paused time if available
//     const elapsed = Math.floor(
//       (new Date().getTime() - new Date(start).getTime()) / 1000
//     );
//     return Math.max(0, elapsed);
//   };

//   // Timer effect - runs regardless of dialog open/close
//   useEffect(() => {
//     if (isRunning && startTime) {
//       intervalRef.current = setInterval(() => {
//         setSeconds(calculateElapsedSeconds(startTime));
//       }, 1000);
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isRunning, startTime]);

//   // Save timer state to localStorage to persist across page reloads
//   useEffect(() => {
//     if (entryId && taskId && startTime) {
//       const state: SavedTimerState = {
//         entryId,
//         taskId,
//         startTime,
//         isRunning,
//       };

//       // If paused, save the paused time
//       if (!isRunning) {
//         state.pausedSeconds = seconds;
//       }

//       localStorage.setItem("timeTrackerState", JSON.stringify(state));
//     }
//   }, [entryId, taskId, startTime, isRunning, seconds]);

//   // Load timer state from localStorage on mount
//   useEffect(() => {
//     const savedState = localStorage.getItem("timeTrackerState");
//     if (savedState) {
//       try {
//         const {
//           entryId: savedEntryId,
//           taskId: savedTaskId,
//           startTime: savedStartTime,
//           isRunning: wasRunning,
//           pausedSeconds,
//         }: SavedTimerState = JSON.parse(savedState);

//         setEntryId(savedEntryId);
//         setTaskId(savedTaskId);
//         setStartTime(savedStartTime);
//         setIsRunning(wasRunning);

//         // Calculate elapsed seconds from startTime
//         const elapsedSeconds = calculateElapsedSeconds(
//           savedStartTime,
//           pausedSeconds
//         );
//         setSeconds(elapsedSeconds);
//       } catch (err) {
//         console.error("Failed to load timer state:", err);
//       }
//     }
//   }, []);

//   const startTracking = (newTaskId: number, newEntryId: number) => {
//     const now = new Date().toISOString(); // Format: "2026-02-22T15:30:00.000Z"
//     setTaskId(newTaskId);
//     setEntryId(newEntryId);
//     setStartTime(now);
//     setSeconds(0);
//     setIsRunning(true);
//   };

//   const stopTracking = () => {
//     setIsRunning(false);
//     setSeconds(0);
//     setEntryId(null);
//     setTaskId(null);
//     setStartTime(null);
//     localStorage.removeItem("timeTrackerState");
//   };

//   const pauseResumeTracking = () => {
//     setIsRunning((prev) => !prev);
//   };

//   const resetTracking = () => {
//     setSeconds(0);
//     setIsRunning(false);
//     setEntryId(null);
//     setTaskId(null);
//     setStartTime(null);
//     localStorage.removeItem("timeTrackerState");
//   };

//   return (
//     <TimeTrackerContext.Provider
//       value={{
//         entryId,
//         taskId,
//         seconds,
//         isRunning,
//         startTracking,
//         stopTracking,
//         pauseResumeTracking,
//         resetTracking,
//       }}
//     >
//       {children}
//     </TimeTrackerContext.Provider>
//   );
// };

// export const useTimeTracker = () => {
//   const context = useContext(TimeTrackerContext);
//   if (!context) {
//     throw new Error("useTimeTracker must be used within TimeTrackerProvider");
//   }
//   return context;
// };

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

interface SavedTimerState {
  entryId: number;
  taskId: number;
  startTime: string; // ISO timestamp (e.g., "2026-02-22T15:30:00.000Z")
  isRunning: boolean;
  pausedSeconds?: number; // Only set when paused
}

const TimeTrackerContext = createContext<TimeTrackerContextType | undefined>(
  undefined
);

export const TimeTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [entryId, setEntryId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate elapsed seconds based on startTime
  const calculateElapsedSeconds = (start: string, paused?: number): number => {
    if (paused !== undefined) return paused; // Return paused time if available
    const elapsed = Math.floor(
      (new Date().getTime() - new Date(start).getTime()) / 1000
    );
    return Math.max(0, elapsed);
  };

  // Timer effect - runs regardless of dialog open/close
  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        setSeconds(calculateElapsedSeconds(startTime));
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
  }, [isRunning, startTime]);

  // Save timer state to localStorage to persist across page reloads
  useEffect(() => {
    if (entryId && taskId && startTime) {
      const state: SavedTimerState = {
        entryId,
        taskId,
        startTime,
        isRunning,
      };

      // If paused, save the paused time
      if (!isRunning) {
        state.pausedSeconds = seconds;
      }

      localStorage.setItem("timeTrackerState", JSON.stringify(state));
    }
  }, [entryId, taskId, startTime, isRunning, seconds]);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("timeTrackerState");
    if (savedState) {
      try {
        const {
          entryId: savedEntryId,
          taskId: savedTaskId,
          startTime: savedStartTime,
          isRunning: wasRunning,
          pausedSeconds,
        }: SavedTimerState = JSON.parse(savedState);

        setEntryId(savedEntryId);
        setTaskId(savedTaskId);
        setStartTime(savedStartTime);
        setIsRunning(wasRunning);

        // Calculate elapsed seconds from startTime
        const elapsedSeconds = calculateElapsedSeconds(
          savedStartTime,
          pausedSeconds
        );
        setSeconds(elapsedSeconds);
      } catch (err) {
        console.error("Failed to load timer state:", err);
      }
    }
  }, []);

  const startTracking = (newTaskId: number, newEntryId: number) => {
    const now = new Date().toISOString(); // Format: "2026-02-22T15:30:00.000Z"
    setTaskId(newTaskId);
    setEntryId(newEntryId);
    setStartTime(now);
    setSeconds(0);
    setIsRunning(true);
  };

  const stopTracking = () => {
    setIsRunning(false);
    setSeconds(0);
    setEntryId(null);
    setTaskId(null);
    setStartTime(null);
    localStorage.removeItem("timeTrackerState");
  };

  const pauseResumeTracking = () => {
    setIsRunning((prev) => {
      const newIsRunning = !prev;

      // When resuming (newIsRunning becomes true), adjust startTime
      // so that the elapsed time calculation accounts for the pause
      if (newIsRunning && !prev && startTime) {
        // Calculate a new startTime that is 'seconds' ago from now
        // This way, when we calculate elapsed time, it will be correct
        const newStartTime = new Date(
          new Date().getTime() - seconds * 1000
        ).toISOString();
        setStartTime(newStartTime);
      }

      return newIsRunning;
    });
  };

  const resetTracking = () => {
    setSeconds(0);
    setIsRunning(false);
    setEntryId(null);
    setTaskId(null);
    setStartTime(null);
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
