import { Target, Clock, Calendar, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  StatModal,
  type StatModalContent,
} from "~/components/shared/dialogs/Statmodal";
import { type GroupedPlans, type Task } from "../DailyPlanner/DailyPlanner";
import { VITE_BASE_API } from "~/lib/serverUrls";

export default function HeroSection() {
  const [plans, setPlans] = useState<GroupedPlans>({});
  const today = new Date().toLocaleDateString("en-CA");
  const tasks = plans[today] || [];
  const doneCount = tasks.filter((t) => t.isDone).length;
  const totalCount = tasks.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  console.log(tasks, "tasks for today", plans);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks and group by date
  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(VITE_BASE_API + "/daily-completion");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();

      console.log(data, "fetched tasks");

      const grouped: GroupedPlans = {};
      for (const task of data) {
        if (!task.isDeleted) {
          const date = task.taskDate.split("T")[0]; // normalize date
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

  const stats = [
    {
      label: "p2p Stack",
      value: "7",
      icon: Target,
      change: "+2 this week",
      modal: {
        headline: "You're managing 7 active goals right now.",
        description:
          "Two new goals were added this week. Your focus areas span fitness, learning, and deep work.",
        details: [
          { label: "Added this week", value: "2" },
          { label: "Due this month", value: "4" },
          { label: "On track", value: "6 / 7" },
          { label: "Overdue", value: "1" },
        ],
        sections: [
          {
            title: "Top priority",
            body: "Your 'Ship v2.0' goal is due in 5 days and currently 68% complete.",
          },
        ],
        cta: { label: "Open Settings" },
        cta_url: "p2p",
      } satisfies StatModalContent,
      percentage: 0,
    },
    {
      label: "Day Completion",
      value: "142",
      icon: Clock,
      change: plans[today]?.length
        ? `${doneCount} / ${totalCount} today`
        : "No tasks today",
      modal: {
        headline: "142 hours logged across all projects this month.",
        description:
          "You're averaging 5.1 hours of tracked time per day — above your personal target of 4 hours.",
        details: [
          { label: "Daily average", value: "5.1 hrs" },
          { label: "Deep work", value: "89 hrs" },
          { label: "Meetings", value: "31 hrs" },
          { label: "Admin", value: "22 hrs" },
        ],
        sections: [
          {
            title: "Best day",
            body: "Your most productive day this month was February 11th with 9.2 hours tracked.",
          },
        ],
        cta: { label: "Timeline" },
        cta_url: "/day-completion",
      } satisfies StatModalContent,
      percentage: pct,
    },
    {
      label: "Finishers",
      value: "13",
      icon: Calendar,
      change: "Keep going!",
      modal: {
        headline: "13 days in a row — your longest streak yet.",
        description:
          "You've logged activity every day since February 4th. You're in the top 8% of users.",
        details: [
          { label: "Current streak", value: "13 days" },
          { label: "Previous best", value: "11 days" },
          { label: "Streak started", value: "Feb 4" },
          { label: "Rest days taken", value: "0" },
        ],
        sections: [
          {
            title: "Milestone ahead",
            body: "Reach 21 days to unlock the 'Habit Former' badge. Only 8 days away!",
          },
        ],
        cta: { label: "View streak calendar" },
        percentage: 0,
      } satisfies StatModalContent,
    },
    {
      label: "Finishers",
      value: "13",
      icon: Calendar,
      change: "Keep going!",
      modal: {
        headline: "13 days in a row — your longest streak yet.",
        description:
          "You've logged activity every day since February 4th. You're in the top 8% of users.",
        details: [
          { label: "Current streak", value: "13 days" },
          { label: "Previous best", value: "11 days" },
          { label: "Streak started", value: "Feb 4" },
          { label: "Rest days taken", value: "0" },
        ],
        sections: [
          {
            title: "Milestone ahead",
            body: "Reach 21 days to unlock the 'Habit Former' badge. Only 8 days away!",
          },
        ],
        cta: { label: "View streak calendar" },
      } satisfies StatModalContent,
    },
    {
      label: "Finishers",
      value: "13",
      icon: Calendar,
      change: "Keep going!",
      modal: {
        headline: "13 days in a row — your longest streak yet.",
        description:
          "You've logged activity every day since February 4th. You're in the top 8% of users.",
        details: [
          { label: "Current streak", value: "13 days" },
          { label: "Previous best", value: "11 days" },
          { label: "Streak started", value: "Feb 4" },
          { label: "Rest days taken", value: "0" },
        ],
        sections: [
          {
            title: "Milestone ahead",
            body: "Reach 21 days to unlock the 'Habit Former' badge. Only 8 days away!",
          },
        ],
        cta: { label: "View streak calendar" },
      } satisfies StatModalContent,
    },
  ];

  return (
    <section className="mx-auto gradient-hero overflow-hidden">
      <div className="mx-auto mb-12 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatModal
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              change={stat.change}
              content={stat.modal}
              percentage={stat.percentage}
              trigger={
                <button
                  className={` relative
    w-full
    rounded-lg p-6
    bg-card
    shadow-sm
    flex flex-col items-start text-left
    transition
    hover:bg-muted/40
    active:bg-muted/60
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    hover:cursor-pointer ${
      stat.percentage === undefined ? "border-2 border-neutral-800" : ""
    }`}
                >
                  {/* Progress border SVG — sits on top of the button edges */}
                  {stat.percentage !== undefined && (
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 240 180"
                      preserveAspectRatio="none"
                    >
                      {/* Background track */}
                      <rect
                        x="1"
                        y="1"
                        width="238"
                        height="178"
                        rx="8"
                        ry="8"
                        fill="none"
                        className="stroke-secondary"
                        strokeWidth="2"
                      />
                      {/* Foreground fill — clockwise from top-left */}
                      <rect
                        x="1"
                        y="1"
                        width="238"
                        height="178"
                        rx="8"
                        ry="8"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeDasharray={2 * (238 + 178)}
                        strokeDashoffset={
                          2 * (238 + 178) -
                          (stat?.percentage / 100) * 2 * (238 + 178)
                        }
                        style={{ transition: "stroke-dashoffset 0.6s ease" }}
                      />
                    </svg>
                  )}

                  {/* Button content */}
                  <stat.icon className="w-6 h-6 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground mb-0 tracking-wide uppercase">
                    {stat.change}
                  </p>
                  <div>
                    <p className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-4">
                      {stat?.percentage ? stat?.percentage : 0}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                </button>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
