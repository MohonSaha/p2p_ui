import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { day: "Mon", done: 5, total: 6 },
  { day: "Tue", done: 4, total: 5 },
  { day: "Wed", done: 6, total: 7 },
  { day: "Thu", done: 3, total: 5 },
  { day: "Fri", done: 5, total: 5 },
  { day: "Sat", done: 2, total: 4 },
  { day: "Sun", done: 4, total: 6 },
];

const monthlyTrend = [
  { week: "W1", completion: 72 },
  { week: "W2", completion: 78 },
  { week: "W3", completion: 65 },
  { week: "W4", completion: 87 },
  { week: "W5", completion: 82 },
  { week: "W6", completion: 91 },
];

const categoryData = [
  { name: "Learning", value: 28 },
  { name: "Work", value: 35 },
  { name: "Health", value: 15 },
  { name: "Side Project", value: 12 },
  { name: "Reading", value: 10 },
];

const COLORS = [
  "hsl(160, 84%, 45%)",
  "hsl(200, 80%, 55%)",
  "hsl(38, 92%, 55%)",
  "hsl(280, 70%, 60%)",
  "hsl(340, 75%, 55%)",
];

const tooltipStyle = {
  backgroundColor: "hsl(220, 18%, 10%)",
  border: "1px solid hsl(220, 14%, 18%)",
  borderRadius: "8px",
  color: "hsl(210, 20%, 92%)",
  fontSize: "13px",
};

const ProgressCharts = () => {
  return (
    <section className="py-12">
      <div className="">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Your Progress</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly bar chart */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <h3 className="font-semibold mb-1">Weekly Task Completion</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Done vs planned tasks this week
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220, 14%, 18%)"
                />
                <XAxis
                  dataKey="day"
                  stroke="hsl(215, 12%, 55%)"
                  fontSize={12}
                />
                <YAxis stroke="hsl(215, 12%, 55%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="total"
                  fill="hsl(220, 16%, 16%)"
                  radius={[4, 4, 0, 0]}
                  name="Planned"
                />
                <Bar
                  dataKey="done"
                  fill="hsl(160, 84%, 45%)"
                  radius={[4, 4, 0, 0]}
                  name="Done"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly trend line */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <h3 className="font-semibold mb-1">Completion Trend</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Weekly completion rate over time
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220, 14%, 18%)"
                />
                <XAxis
                  dataKey="week"
                  stroke="hsl(215, 12%, 55%)"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(215, 12%, 55%)"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="hsl(200, 80%, 55%)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(200, 80%, 55%)", r: 5 }}
                  name="Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <h3 className="font-semibold mb-1">Time Distribution</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Hours by category this month
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {categoryData.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* Motivational quote card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card flex flex-col items-center justify-center text-center">
            <p className="text-4xl mb-4">🔥</p>
            <blockquote className="text-xl font-display font-semibold leading-relaxed max-w-sm">
              "You don't have to be extreme, just{" "}
              <span className="text-gradient">consistent</span>."
            </blockquote>
            <p className="text-sm text-muted-foreground mt-4">
              — Keep pushing, your data shows growth!
            </p>
            <div className="mt-6 gradient-primary rounded-full px-6 py-2 text-sm font-semibold text-primary-foreground">
              13-day streak 🎉
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressCharts;
