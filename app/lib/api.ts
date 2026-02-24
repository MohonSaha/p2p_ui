import { VITE_BASE_API } from "./serverUrls";
import type { TimeEntry } from "./time-utils";

const API_ENDPOINT = "/time-entry/today/entries";

export async function fetchTodayEntries(): Promise<TimeEntry[]> {
  try {
    const response = await fetch(`${VITE_BASE_API}${API_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch time entries:", error);
    throw error;
  }
}
