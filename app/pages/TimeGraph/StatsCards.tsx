import { useMemo } from "react";
import { Clock, Activity, Moon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { type TimeEntry, formatDuration } from "~/lib/time-utils";

interface StatsCardsProps {
  entries: TimeEntry[];
  dateStr: string;
}

export function StatsCards({ entries, dateStr }: StatsCardsProps) {
  const dayEntries = useMemo(
    () => entries.filter((e) => e.entryDate === dateStr),
    [entries, dateStr]
  );

  const totalTracked = dayEntries.reduce(
    (sum, e) => sum + e.hours * 3600 + e.minutes * 60 + e.seconds,
    0
  );
  const totalUntracked = Math.max(0, 24 * 3600 - totalTracked);
  const taskCount = new Set(dayEntries.map((e) => e.taskId)).size;

  const stats = [
    {
      label: "Tracked Time",
      value: formatDuration(totalTracked),
      icon: Activity,
      description: `${taskCount} tasks`,
      bg: "bg-green-600/50",
    },
    {
      label: "Untracked Time",
      value: formatDuration(totalUntracked),
      icon: Moon,
      description: "Remaining",
      bg: "bg-red-600/50",
    },
    {
      label: "Total",
      value: "24h 0m",
      icon: Clock,
      description: "Full day",
      bg: "bg-blue-600/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-slate-700/50 bg-slate-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div
                className={
                  `flex h-10 w-10 items-center justify-center rounded-lg ` +
                  stat.bg
                }
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-xl font-semibold font-mono text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400">{stat.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
