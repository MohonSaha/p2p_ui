import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  type TimeEntry,
  groupByCategory,
  formatDuration,
  CHART_COLORS,
  UNTRACKED_COLOR,
} from "~/lib/time-utils";

const TOTAL_DAY_SECONDS = 24 * 3600;

interface DailyPieChartProps {
  entries: TimeEntry[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-white">{data.category}</p>
        <p className="text-sm text-slate-400 font-mono">
          {formatDuration(data.totalSeconds)}
        </p>
        <p className="text-xs text-slate-400">
          {((data.totalSeconds / TOTAL_DAY_SECONDS) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export function DailyPieChart({ entries }: DailyPieChartProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  const dateStr = format(date, "yyyy-MM-dd");

  const filteredEntries = useMemo(
    () => entries.filter((e) => e.entryDate === dateStr),
    [entries, dateStr]
  );

  const chartData = useMemo(() => {
    const categories = groupByCategory(filteredEntries);
    const trackedTotal = categories.reduce((sum, c) => sum + c.totalSeconds, 0);
    const untrackedSeconds = Math.max(0, TOTAL_DAY_SECONDS - trackedTotal);

    return [
      ...categories,
      {
        category: "Untracked",
        totalSeconds: untrackedSeconds,
        color: UNTRACKED_COLOR,
      },
    ];
  }, [filteredEntries]);

  const trackedTotal = chartData
    .filter((d) => d.category !== "Untracked")
    .reduce((sum, d) => sum + d.totalSeconds, 0);

  return (
    <Card className="border-slate-700/50 bg-slate-950">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-2">
        <div className="">
          <CardTitle className="text-lg font-semibold text-white">
            Daily Breakdown
          </CardTitle>

          <p className="text-sm text-slate-400 mt-1">
            {format(date, "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white",
                !date && "text-slate-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-slate-900 border-slate-700"
            align="end"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
              className={cn("p-3")}
            />
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-1/2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="totalSeconds"
                  nameKey="category"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={
                        entry.category === "Untracked"
                          ? UNTRACKED_COLOR
                          : CHART_COLORS[index % CHART_COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/50">
              <span className="text-sm font-medium text-slate-400">
                Total Tracked
              </span>
              <span className="font-mono text-sm font-semibold text-white">
                {formatDuration(trackedTotal)}
              </span>
            </div>
            {chartData.map((item, index) => (
              <div
                key={item.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        item.category === "Untracked"
                          ? UNTRACKED_COLOR
                          : CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  />
                  <span className="text-sm text-white">{item.category}</span>
                </div>
                <span className="font-mono text-sm text-slate-400">
                  {formatDuration(item.totalSeconds)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
