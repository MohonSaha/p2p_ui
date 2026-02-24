import { VITE_BASE_API } from "./serverUrls";
import type { TimeEntry } from "./time-utils";

export async function fetchEntriesByDate(date: string): Promise<TimeEntry[]> {
  try {
    const response = await fetch(
      `${VITE_BASE_API}/time-entry/date/${date}/entries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch time entries by date:", error);
    throw error;
  }
}
