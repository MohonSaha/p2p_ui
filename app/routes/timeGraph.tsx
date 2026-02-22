// import { Clock } from "lucide-react";
// import { SectionContainer } from "~/components/shared/SectionContainer";
// import { MOCK_ENTRIES } from "~/data/mock-entries";
// import { DailyPieChart } from "~/pages/TimeGraph/DailyPieChart";
// import { MonthlyBarChart } from "~/pages/TimeGraph/MonthlyBarChart";
// import { StatsCards } from "~/pages/TimeGraph/StatsCards";

// const TimeGraph = () => {
//   return (
//     <SectionContainer>
//       <div className="min-h-screen pt-20">
//         <div className="py-8">
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-8">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
//               <Clock className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight">
//                 Time Tracker
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 Visualize how you spend your 24 hours
//               </p>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <StatsCards entries={MOCK_ENTRIES} dateStr="2026-02-22" />

//           {/* Charts */}
//           <div className="mt-6 space-y-6">
//             <DailyPieChart entries={MOCK_ENTRIES} />
//             <MonthlyBarChart entries={MOCK_ENTRIES} />
//           </div>
//         </div>
//       </div>
//     </SectionContainer>
//   );
// };

// export default TimeGraph;

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import { MOCK_ENTRIES } from "~/data/mock-entries";
import { DailyPieChart } from "~/pages/TimeGraph/DailyPieChart";
import { MonthlyBarChart } from "~/pages/TimeGraph/MonthlyBarChart";
import { StatsCards } from "~/pages/TimeGraph/StatsCards";
import type { TimeEntry } from "~/lib/time-utils";
import { fetchTodayEntries } from "~/lib/api";

function TimeGraph() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodayEntries();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
    // Optional: Poll for updates every 30 seconds
    const interval = setInterval(loadEntries, 30000);
    return () => clearInterval(interval);
  }, []);

  //   if (loading) {
  //     return <LoadingSpinner />;
  //   }

  //   if (error) {
  //     return <ErrorDisplay error={error} onRetry={loadEntries} />;
  //   }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Time Tracker
            </h1>
            <p className="text-sm text-slate-400">
              Visualize how you spend your 24 hours
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards entries={entries} dateStr={today} />

        {/* Charts */}
        <div className="mt-8 space-y-6">
          <DailyPieChart entries={entries} />
          <MonthlyBarChart entries={entries} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
          <p>Data auto-refreshes every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}

export default TimeGraph;
