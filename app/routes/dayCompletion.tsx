import { useState } from "react";
import {
  ClipboardList,
  AlertCircle,
  Layers,
  SwatchBook,
  ArrowLeft,
} from "lucide-react";
import { useTasks, useTaskStacks } from "~/hooks/use-tasks";
import DailyPlanner from "~/pages/Home/DailyPlanner/DailyPlanner";
import DueTasksManager from "~/pages/DailyCompletion/DueTasksManager";
import { SectionContainer } from "~/components/shared/SectionContainer";
import TaskStackView from "~/pages/DailyCompletion/TaskStackView";
import TaskCategory from "~/pages/TaskCategory/TaskCategory";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";

type Tab = "planner" | "due" | "stacks" | "category";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "planner",
    label: "Daily Planner",
    icon: <ClipboardList className="w-4 h-4" />,
  },
  { key: "due", label: "Due Tasks", icon: <AlertCircle className="w-4 h-4" /> },
  { key: "stacks", label: "Task Stacks", icon: <Layers className="w-4 h-4" /> },
  {
    key: "category",
    label: "Category",
    icon: <SwatchBook className="w-4 h-4" />,
  },
];

const dayCompletion = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("planner");
  const {
    grouped,
    undoneTasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    reassignTask,
  } = useTasks();
  const stackHook = useTaskStacks();

  return (
    <SectionContainer>
      <div className="min-h-screen bg-dark pt-20">
        {/* Header */}
        <header className="border-b border-border bg-dark">
          <div className="py-2 flex items-center justify-between w-full">
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                TaskFlow
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Stay organized, stay productive
              </p>
            </div>

            <Button
              onClick={() => navigate(-1)}
              size="sm"
              className="inline-flex sm:hidden rounded-full p-1 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-muted-foreground/90"
              variant={"outline"}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 bg-dark rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-sm)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="py-6">
          {activeTab === "planner" && (
            <DailyPlanner
              grouped={grouped}
              loading={loading}
              addTask={addTask}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          )}
          {activeTab === "due" && <DueTasksManager />}
          {activeTab === "stacks" && (
            <TaskStackView
              stacks={stackHook.stacks}
              addStack={stackHook.addStack}
              deleteStack={stackHook.deleteStack}
              addSubtask={stackHook.addSubtask}
              toggleSubtask={stackHook.toggleSubtask}
              deleteSubtask={stackHook.deleteSubtask}
              reassignSubtask={stackHook.reassignSubtask}
            />
          )}

          {activeTab === "category" && <TaskCategory></TaskCategory>}
        </main>
      </div>
    </SectionContainer>
  );
};

export default dayCompletion;
