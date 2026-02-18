import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Layers,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import type { TaskStack as TaskStackType } from "~/types/tasks";

interface TaskStackViewProps {
  stacks: TaskStackType[];
  addStack: (
    title: string,
    description: string,
    startDate: string,
    endDate: string
  ) => void;
  deleteStack: (id: string) => void;
  addSubtask: (stackId: string, task: string, date: string) => void;
  toggleSubtask: (stackId: string, subtaskId: string) => void;
  deleteSubtask: (stackId: string, subtaskId: string) => void;
  reassignSubtask: (
    stackId: string,
    subtaskId: string,
    newDate: string
  ) => void;
}

const TaskStackView = ({
  stacks,
  addStack,
  deleteStack,
  addSubtask,
  toggleSubtask,
  deleteSubtask,
  reassignSubtask,
}: TaskStackViewProps) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedStacks, setExpandedStacks] = useState<Set<string>>(new Set());
  const [subtaskInputs, setSubtaskInputs] = useState<Record<string, string>>(
    {}
  );
  const [subtaskDates, setSubtaskDates] = useState<Record<string, string>>({});
  const [openCalendarId, setOpenCalendarId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedStacks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddStack = () => {
    if (!title.trim() || !startDate || !endDate) return;
    addStack(title.trim(), description.trim(), startDate, endDate);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setShowForm(false);
  };

  const handleAddSubtask = (stackId: string) => {
    const text = subtaskInputs[stackId]?.trim();
    const date =
      subtaskDates[stackId] || new Date().toLocaleDateString("en-CA");
    if (!text) return;
    addSubtask(stackId, text, date);
    setSubtaskInputs((prev) => ({ ...prev, [stackId]: "" }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Task Stacks</h2>
          <p className="text-sm text-muted-foreground">
            Organize tasks into projects with subtasks
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "secondary" : "default"}
        >
          <Plus className="w-4 h-4 mr-1" /> New Stack
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-xl p-5 shadow-[var(--shadow-md)] border border-border space-y-3"
          >
            <Input
              placeholder="Stack title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddStack}>
                Create Stack
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stacks.length === 0 && !showForm && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No task stacks yet. Create one to get started!
          </p>
        </div>
      )}

      <div className="space-y-3">
        {stacks.map((stack) => {
          const isExpanded = expandedStacks.has(stack.id);
          const doneCount = stack.subtasks.filter((s) => s.isDone).length;
          const totalCount = stack.subtasks.length;
          const pct = totalCount
            ? Math.round((doneCount / totalCount) * 100)
            : 0;

          return (
            <motion.div
              key={stack.id}
              layout
              className="bg-card rounded-xl border border-border shadow-[var(--shadow-sm)] overflow-hidden"
            >
              {/* Stack Header */}
              <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                onClick={() => toggleExpand(stack.id)}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {stack.title}
                  </p>
                  {stack.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {stack.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        stack.startDate + "T00:00:00"
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" → "}
                      {new Date(stack.endDate + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                    {totalCount > 0 && (
                      <span className="text-xs text-accent font-medium">
                        {pct}% done
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar mini */}
                {totalCount > 0 && (
                  <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStack(stack.id);
                  }}
                  className="text-muted-foreground hover:text-destructive flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Subtasks */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                      {stack.subtasks.map((st) => (
                        <div
                          key={st.id}
                          className={cn(
                            "flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer group",
                            st.isDone
                              ? "border-success/30 bg-success/5"
                              : "border-border bg-secondary/20"
                          )}
                          onClick={() => toggleSubtask(stack.id, st.id)}
                        >
                          {st.isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm",
                                st.isDone
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {st.task}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                st.assignedDate + "T00:00:00"
                              ).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <Popover
                            open={openCalendarId === st.id}
                            onOpenChange={(open) =>
                              setOpenCalendarId(open ? st.id : null)
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <CalendarDays className="w-3.5 h-3.5" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                mode="single"
                                selected={
                                  new Date(st.assignedDate + "T00:00:00")
                                }
                                onSelect={(date) => {
                                  if (date) {
                                    reassignSubtask(
                                      stack.id,
                                      st.id,
                                      date.toLocaleDateString("en-CA")
                                    );
                                    setOpenCalendarId(null);
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
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSubtask(stack.id, st.id);
                            }}
                            className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}

                      {/* Add subtask */}
                      <div className="flex gap-2 mt-2 items-center">
                        <Input
                          placeholder="Add subtask..."
                          value={subtaskInputs[stack.id] || ""}
                          onChange={(e) =>
                            setSubtaskInputs((p) => ({
                              ...p,
                              [stack.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddSubtask(stack.id)
                          }
                          className="text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Input
                          type="date"
                          value={subtaskDates[stack.id] || ""}
                          onChange={(e) =>
                            setSubtaskDates((p) => ({
                              ...p,
                              [stack.id]: e.target.value,
                            }))
                          }
                          className="w-auto text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddSubtask(stack.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStackView;
