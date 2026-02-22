// import { useMemo, useState } from "react";
// import {
//   format,
//   eachDayOfInterval,
//   startOfMonth,
//   endOfMonth,
//   isWithinInterval,
// } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { cn } from "~/lib/utils";
// import { Button } from "~/components/ui/button";
// import { Calendar } from "~/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "~/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
// import { type TimeEntry, CHART_COLORS, formatDuration } from "~/lib/time-utils";

// interface MonthlyBarChartProps {
//   entries: TimeEntry[];
// }

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-lg">
//         <p className="text-sm font-medium text-white mb-1">{label}</p>
//         {payload.map((p: any) => (
//           <div key={p.dataKey} className="flex items-center gap-2">
//             <div
//               className="h-2 w-2 rounded-full"
//               style={{ backgroundColor: p.fill }}
//             />
//             <span className="text-xs text-slate-400">{p.dataKey}:</span>
//             <span className="text-xs font-mono text-white">
//               {formatDuration(p.value)}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// export function MonthlyBarChart({ entries }: MonthlyBarChartProps) {
//   const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
//     from: startOfMonth(new Date("2026-02-22")),
//     to: endOfMonth(new Date("2026-02-22")),
//   });

//   const [calendarMonth, setCalendarMonth] = useState<Date>(dateRange.from);
//   const [selecting, setSelecting] = useState<"from" | "to" | null>(null);

//   const categories = useMemo(() => {
//     const cats = new Set<string>();
//     entries.forEach((e) => {
//       cats.add(e.task.category?.category ?? "Uncategorized");
//     });
//     return Array.from(cats);
//   }, [entries]);

//   const chartData = useMemo(() => {
//     const days = eachDayOfInterval({
//       start: dateRange.from,
//       end: dateRange.to,
//     });

//     return days.map((day) => {
//       const dateStr = format(day, "yyyy-MM-dd");
//       const dayEntries = entries.filter((e) => e.entryDate === dateStr);

//       const row: Record<string, any> = { date: format(day, "MMM d") };
//       categories.forEach((cat) => {
//         const catEntries = dayEntries.filter(
//           (e) => (e.task.category?.category ?? "Uncategorized") === cat
//         );
//         row[cat] = catEntries.reduce(
//           (sum, e) => sum + e.hours * 3600 + e.minutes * 60 + e.seconds,
//           0
//         );
//       });
//       return row;
//     });
//   }, [entries, dateRange, categories]);

//   const totalTracked = useMemo(() => {
//     const filtered = entries.filter((e) => {
//       const d = new Date(e.entryDate);
//       return isWithinInterval(d, { start: dateRange.from, end: dateRange.to });
//     });
//     return filtered.reduce(
//       (sum, e) => sum + e.hours * 3600 + e.minutes * 60 + e.seconds,
//       0
//     );
//   }, [entries, dateRange]);

//   const handleDateSelect = (d: Date | undefined) => {
//     if (!d) return;
//     if (!selecting || selecting === "from") {
//       setDateRange({ from: d, to: d });
//       setSelecting("to");
//     } else {
//       if (d < dateRange.from) {
//         setDateRange({ from: d, to: dateRange.from });
//       } else {
//         setDateRange({ from: dateRange.from, to: d });
//       }
//       setSelecting(null);
//     }
//   };

//   return (
//     <Card className="border-slate-700/50 bg-slate-950">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <div>
//           <CardTitle className="text-lg font-semibold text-white">
//             Monthly Overview
//           </CardTitle>
//           <p className="text-sm text-slate-400 mt-1">
//             {format(dateRange.from, "MMM d")} –{" "}
//             {format(dateRange.to, "MMM d, yyyy")} · Total:{" "}
//             <span className="font-mono font-medium text-white">
//               {formatDuration(totalTracked)}
//             </span>
//           </p>
//         </div>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="w-[260px] justify-start text-left font-normal border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {format(dateRange.from, "MMM d")} –{" "}
//               {format(dateRange.to, "MMM d, yyyy")}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent
//             className="w-auto p-0 bg-slate-900 border-slate-700"
//             align="end"
//           >
//             <div className="p-3">
//               <p className="text-xs text-slate-400 mb-2">
//                 {selecting === "to" ? "Select end date" : "Select start date"}
//               </p>
//               <Calendar
//                 mode="single"
//                 selected={selecting === "to" ? dateRange.to : dateRange.from}
//                 onSelect={handleDateSelect}
//                 month={calendarMonth}
//                 onMonthChange={setCalendarMonth}
//                 initialFocus
//                 className={cn("pointer-events-auto")}
//               />
//               <div className="flex gap-2 mt-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
//                   onClick={() => {
//                     const now = new Date("2026-02-22");
//                     setDateRange({
//                       from: startOfMonth(now),
//                       to: endOfMonth(now),
//                     });
//                     setSelecting(null);
//                   }}
//                 >
//                   This Month
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
//                   onClick={() => {
//                     setSelecting("from");
//                   }}
//                 >
//                   Reset
//                 </Button>
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[350px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="#334155"
//                 vertical={false}
//               />
//               <XAxis
//                 dataKey="date"
//                 tick={{ fill: "#94a3b8", fontSize: 12 }}
//                 tickLine={false}
//                 axisLine={false}
//               />
//               <YAxis
//                 tick={{ fill: "#94a3b8", fontSize: 12 }}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(v) => `${(v / 3600).toFixed(0)}h`}
//               />
//               <Tooltip
//                 content={<CustomTooltip />}
//                 cursor={{ fill: "#164e63" }}
//               />
//               <Legend
//                 iconType="circle"
//                 iconSize={8}
//                 wrapperStyle={{ fontSize: 12, color: "#94a3b8" }}
//               />
//               {categories.map((cat, i) => (
//                 <Bar
//                   key={cat}
//                   dataKey={cat}
//                   stackId="a"
//                   fill={CHART_COLORS[i % CHART_COLORS.length]}
//                   radius={
//                     i === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
//                   }
//                 />
//               ))}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { useMemo, useState } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { type TimeEntry, CHART_COLORS, formatDuration } from "~/lib/time-utils";

interface MonthlyBarChartProps {
  entries: TimeEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-white mb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: p.fill }}
            />
            <span className="text-xs text-slate-400">{p.dataKey}:</span>
            <span className="text-xs font-mono text-white">
              {formatDuration(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function MonthlyBarChart({ entries }: MonthlyBarChartProps) {
  const today = new Date();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(today),
    to: endOfMonth(today),
  });

  const [calendarMonth, setCalendarMonth] = useState<Date>(dateRange.from);
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    entries.forEach((e) => {
      cats.add(e.task.category?.category ?? "Uncategorized");
    });
    return Array.from(cats);
  }, [entries]);

  const chartData = useMemo(() => {
    const days = eachDayOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    });

    return days.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      const dayEntries = entries.filter((e) => e.entryDate === dateStr);

      const row: Record<string, any> = { date: format(day, "MMM d") };
      categories.forEach((cat) => {
        const catEntries = dayEntries.filter(
          (e) => (e.task.category?.category ?? "Uncategorized") === cat
        );
        row[cat] = catEntries.reduce(
          (sum, e) => sum + e.hours * 3600 + e.minutes * 60 + e.seconds,
          0
        );
      });
      return row;
    });
  }, [entries, dateRange, categories]);

  const totalTracked = useMemo(() => {
    const filtered = entries.filter((e) => {
      const d = new Date(e.entryDate);
      return isWithinInterval(d, { start: dateRange.from, end: dateRange.to });
    });
    return filtered.reduce(
      (sum, e) => sum + e.hours * 3600 + e.minutes * 60 + e.seconds,
      0
    );
  }, [entries, dateRange]);

  const handleDateSelect = (d: Date | undefined) => {
    if (!d) return;
    if (!selecting || selecting === "from") {
      setDateRange({ from: d, to: d });
      setSelecting("to");
    } else {
      if (d < dateRange.from) {
        setDateRange({ from: d, to: dateRange.from });
      } else {
        setDateRange({ from: dateRange.from, to: d });
      }
      setSelecting(null);
    }
  };

  return (
    <Card className="border-slate-700/50 bg-slate-950">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-white">
            Monthly Overview
          </CardTitle>
          <p className="text-sm text-slate-400 mt-1">
            {format(dateRange.from, "MMM d")} –{" "}
            {format(dateRange.to, "MMM d, yyyy")} · Total:{" "}
            <span className="font-mono font-medium text-white">
              {formatDuration(totalTracked)}
            </span>
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] justify-start text-left font-normal border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(dateRange.from, "MMM d")} –{" "}
              {format(dateRange.to, "MMM d, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-slate-900 border-slate-700"
            align="end"
          >
            <div className="p-3">
              <p className="text-xs text-slate-400 mb-2">
                {selecting === "to" ? "Select end date" : "Select start date"}
              </p>
              <Calendar
                mode="single"
                selected={selecting === "to" ? dateRange.to : dateRange.from}
                onSelect={handleDateSelect}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                initialFocus
                className={cn("pointer-events-auto")}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={() => {
                    const now = new Date();
                    setDateRange({
                      from: startOfMonth(now),
                      to: endOfMonth(now),
                    });
                    setSelecting(null);
                  }}
                >
                  This Month
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={() => {
                    setSelecting("from");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 3600).toFixed(0)}h`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#164e63" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "#94a3b8" }}
              />
              {categories.map((cat, i) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="a"
                  fill={CHART_COLORS[i % CHART_COLORS.length]}
                  radius={
                    i === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
