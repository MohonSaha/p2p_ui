import { useState, useEffect, useCallback } from "react";
import {
  //   Goal,
  //   CellEntry,
  type MonthData,
  type GoalValueType,
} from "~/types/monthly-map";

const STORAGE_KEY = "monthly-map-data";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function loadAllData(): MonthData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAllData(data: MonthData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getOrCreateMonth(allData: MonthData[], month: string): MonthData {
  const existing = allData.find((d) => d.month === month);
  if (existing) return existing;
  return { month, goals: [], entries: [] };
}

export function getDaysInMonth(month: string): string[] {
  const [year, mon] = month.split("-").map(Number);
  const count = new Date(year, mon, 0).getDate();
  return Array.from({ length: count }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0");
    return `${month}-${day}`;
  });
}

export function formatMonthLabel(month: string): string {
  const [year, mon] = month.split("-").map(Number);
  const date = new Date(year, mon - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

export function getAdjacentMonth(month: string, offset: number): string {
  const [year, mon] = month.split("-").map(Number);
  const date = new Date(year, mon - 1 + offset);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

export function useMonthlyMap(month: string) {
  const [allData, setAllData] = useState<MonthData[]>(loadAllData);
  const monthData = getOrCreateMonth(allData, month);

  useEffect(() => {
    saveAllData(allData);
  }, [allData]);

  const updateMonth = useCallback(
    (updater: (data: MonthData) => MonthData) => {
      setAllData((prev) => {
        const idx = prev.findIndex((d) => d.month === month);
        const current =
          idx >= 0 ? prev[idx] : { month, goals: [], entries: [] };
        const updated = updater(current);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = updated;
          return next;
        }
        return [...prev, updated];
      });
    },
    [month]
  );

  const addGoal = useCallback(
    (name: string, valueType: GoalValueType) => {
      updateMonth((data) => ({
        ...data,
        goals: [...data.goals, { id: generateId(), name, valueType }],
      }));
    },
    [updateMonth]
  );

  const removeGoal = useCallback(
    (goalId: string) => {
      updateMonth((data) => ({
        ...data,
        goals: data.goals.filter((g) => g.id !== goalId),
        entries: data.entries.filter((e) => e.goalId !== goalId),
      }));
    },
    [updateMonth]
  );

  const setCellValue = useCallback(
    (goalId: string, date: string, value: string) => {
      updateMonth((data) => {
        const entries = data.entries.filter(
          (e) => !(e.goalId === goalId && e.date === date)
        );
        entries.push({ goalId, date, value });
        return { ...data, entries };
      });
    },
    [updateMonth]
  );

  const getCellValue = useCallback(
    (goalId: string, date: string): string | undefined => {
      return monthData.entries.find(
        (e) => e.goalId === goalId && e.date === date
      )?.value;
    },
    [monthData.entries]
  );

  return {
    goals: monthData.goals,
    entries: monthData.entries,
    addGoal,
    removeGoal,
    setCellValue,
    getCellValue,
  };
}
