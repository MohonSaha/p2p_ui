import { useState } from "react";
import { Trash2, CalendarDays } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import type { Task } from "~/types/tasks";

interface DueTasksManagerProps {
  undoneTasks: Task[];
  deleteTask: (id: string) => void;
  reassignTask: (id: string, newDate: string) => void;
}

const DueTasksManager = ({
  undoneTasks,
  deleteTask,
  reassignTask,
}: DueTasksManagerProps) => {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const sorted = [...undoneTasks].sort((a, b) =>
    a.taskDate.localeCompare(b.taskDate)
  );

  const today = new Date().toLocaleDateString("en-CA");

  const isOverdue = (date: string) => date < today;

  return (
    <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-md)] border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Due Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {sorted.length} pending task{sorted.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">🎉 All tasks are done!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {sorted.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-colors group",
                  isOverdue(t.taskDate)
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border bg-secondary/20"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {t.task}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isOverdue(t.taskDate)
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {isOverdue(t.taskDate) ? "Overdue · " : ""}
                    {new Date(t.taskDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <Popover
                  open={openPopoverId === t.id}
                  onOpenChange={(open) => setOpenPopoverId(open ? t.id : null)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-accent"
                    >
                      <CalendarDays className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={new Date(t.taskDate + "T00:00:00")}
                      onSelect={(date) => {
                        if (date) {
                          reassignTask(t.id, date.toLocaleDateString("en-CA"));
                          setOpenPopoverId(null);
                        }
                      }}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTask(t.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
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
