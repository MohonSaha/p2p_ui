export interface Category {
  id: number;
  category: string;
}

export interface Task {
  id: number;
  task: string;
  categoryId: number | null;
  category: Category | null;
}

export interface TimeEntry {
  id: number;
  taskId: number;
  entryDate: string;
  hours: number;
  minutes: number;
  seconds: number;
  entryType: "MANUAL" | "LIVE";
  startTime: string | null;
  endTime: string | null;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
  task: Task;
}

export interface CategoryTime {
  category: string;
  totalSeconds: number;
  color: string;
}

export const CHART_COLORS = [
  "hsl(160, 84%, 45%)",
  "hsl(200, 80%, 55%)",
  "hsl(38, 92%, 55%)",
  "hsl(280, 70%, 60%)",
  "hsl(340, 75%, 55%)",
  "hsl(30, 90%, 55%)",
  "hsl(100, 60%, 50%)",
];

export const UNTRACKED_COLOR = "hsl(220, 14%, 18%)";

export function groupByCategory(entries: TimeEntry[]): CategoryTime[] {
  const map = new Map<string, number>();

  entries.forEach((entry) => {
    const cat = entry.task.category?.category ?? "Uncategorized";
    const seconds = entry.hours * 3600 + entry.minutes * 60 + entry.seconds;
    map.set(cat, (map.get(cat) ?? 0) + seconds);
  });

  const result: CategoryTime[] = [];
  let colorIndex = 0;
  map.forEach((totalSeconds, category) => {
    result.push({
      category,
      totalSeconds,
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
    });
    colorIndex++;
  });

  return result;
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function formatHoursDecimal(totalSeconds: number): string {
  return (totalSeconds / 3600).toFixed(1) + "h";
}
