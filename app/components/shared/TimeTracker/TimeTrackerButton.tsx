import { useState } from "react";
import { AlarmClockPlus, Clock } from "lucide-react";
import TimeTrackerDialog from "./TimeTrackerDialog";
import {
  TimeTrackerProvider,
  useTimeTracker,
} from "~/context/TimeTrackerContext";

const TimeTrackerButtonContent = () => {
  const { seconds, isRunning } = useTimeTracker();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-2 py-2 rounded-full font-medium transition-colors ${
          isRunning
            ? "bg-green-500 hover:bg-green-600 text-white px-4"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        title={isRunning ? "Click to view timer" : "Open Time Tracker"}
      >
        {isRunning ? (
          <>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono font-bold">{formatTime(seconds)}</span>
          </>
        ) : (
          <>
            <AlarmClockPlus className="w-6 h-6" />
            {/* <span className="hidden sm:inline">Time Tracker</span> */}
          </>
        )}
      </button>

      <TimeTrackerDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

const TimeTrackerButton = () => {
  return (
    <TimeTrackerProvider>
      <TimeTrackerButtonContent />
    </TimeTrackerProvider>
  );
};

export default TimeTrackerButton;
