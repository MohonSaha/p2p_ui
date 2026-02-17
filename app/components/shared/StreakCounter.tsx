// import React, { useState } from "react";
// import { Trophy, TrendingUp, RotateCcw, Settings } from "lucide-react";
// import { Progress } from "./Progress";
// import { StatCard } from "./StatCard";
// import { Button } from "../ui/button";

// export const StreakTracker: React.FC = () => {
//   const [streak] = useState({
//     current: 4,
//     longest: 4,
//     vsLongest: 100,
//     totalResets: 1,
//     withdrawal: 57,
//     lastWatched: new Date(2026, 1, 13, 12, 0),
//   });

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const days = Math.floor(streak.current);
//   const hours = 18;
//   const minutes = 38;

//   return (
//     <div className=" py-10">
//       <div className=" mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-between gap-4 mb-6 px-2">
//             <p className="text-gray-500 text-sm tracking-wide">
//               Last watched: {formatDate(streak.lastWatched)}
//             </p>
//             <Button
//               size="default"
//               //   variant="outline"
//               className="gap-1.5 border border-red-500/30 text-red-500 hover:bg-red-500/15 bg-red-500/20 cursor-pointer"
//             >
//               Reset Streak
//               <RotateCcw className="h-3.5 w-3.5" />
//             </Button>
//           </div>

//           {/* Main Streak Card */}
//           <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-12 mb-8 backdrop-blur-sm">
//             <div className="space-y-8">
//               <h2 className="text-gray-500 text-lg uppercase tracking-[0.2em] font-semibold">
//                 Current Streak
//               </h2>

//               {/* Big Number */}
//               <div className="space-y-2">
//                 <div className="text-7xl font-bold text-emerald-400">
//                   {streak.current}
//                 </div>
//                 <p className="text-gray-400 text-xl">days</p>
//                 <p className="text-gray-600 text-sm">
//                   {hours}h {minutes}m
//                 </p>
//               </div>

//               {/* Withdrawal Progress */}
//               <div className="space-y-3 pt-4 border-t border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <label className="text-yellow-500 font-semibold">
//                     Withdrawal
//                   </label>
//                   <span className="text-gray-300 font-bold text-xl">
//                     {streak.withdrawal}%
//                   </span>
//                 </div>
//                 <Progress value={streak.withdrawal} max={100} />
//                 <p className="text-gray-500 text-sm text-center pt-2">
//                   Your brain is adjusting. Cravings are strongest now. Stay
//                   strong!
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatCard
//               icon={<Trophy className="text-yellow-500" size={24} />}
//               title="Longest Streak"
//               value={streak.longest.toString()}
//               subtitle="days"
//             />

//             <StatCard
//               icon={<TrendingUp className="text-emerald-400" size={24} />}
//               title="VS Longest"
//               value={`${streak.vsLongest}%`}
//               subtitle="New Record!"
//               highlight
//             />

//             <StatCard
//               icon={<RotateCcw className="text-red-500" size={24} />}
//               title="Total Resets"
//               value={streak.totalResets.toString()}
//               subtitle="times reset"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { Trophy, TrendingUp, RotateCcw } from "lucide-react";
import { Progress } from "./Progress";
import { StatCard } from "./StatCard";
import { ResetStreakDialog } from "./dialogs/ResetStreakDialog";

export const StreakTracker: React.FC = () => {
  const [streak, setStreak] = useState({
    current: 4,
    longest: 4,
    vsLongest: 100,
    totalResets: 1,
    withdrawal: 57,
    lastWatched: new Date(2026, 1, 13, 12, 0),
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleReset = (resetDate: Date) => {
    console.log("[v0] Resetting streak with date:", resetDate);

    // Calculate new streak (from reset date to now)
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - resetDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Update longest streak if current streak was longer
    const newLongest = Math.max(streak.longest, streak.current);
    const newVsLongest =
      newLongest > 0 ? Math.round((diffDays / newLongest) * 100) : 0;

    setStreak({
      current: diffDays,
      longest: newLongest,
      vsLongest: newVsLongest,
      totalResets: streak.totalResets + 1,
      withdrawal: Math.min(100, Math.round((diffDays / 30) * 100)), // Withdrawal decreases as streak grows
      lastWatched: resetDate,
    });
  };

  const days = Math.floor(streak.current);
  const hours = 18;
  const minutes = 38;

  return (
    <div className="min-h-screen pt-10 pb-20">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="flex md:flex-row flex-col md:items-center items-start justify-between gap-4 mb-6 md:px-2 px-0 ">
            <p className="text-gray-500 text-sm tracking-wide">
              Last watched: {formatDate(streak.lastWatched)}
            </p>
            <ResetStreakDialog onReset={handleReset} />
          </div>

          {/* Main Streak Card */}
          <div className="rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-12 mb-8 backdrop-blur-sm">
            <div className="space-y-8">
              <h2 className="text-gray-500 text-lg uppercase tracking-[0.2em] font-semibold">
                Current Streak
              </h2>

              {/* Big Number */}
              <div className="space-y-2">
                <div className="text-7xl font-bold text-emerald-400">
                  {streak.current}
                </div>
                <p className="text-gray-400 text-xl">days</p>
                <p className="text-gray-600 text-sm">
                  {hours}h {minutes}m
                </p>
              </div>

              {/* Withdrawal Progress */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <label className="text-yellow-500 font-semibold">
                    Withdrawal
                  </label>
                  <span className="text-gray-300 font-bold text-xl">
                    {streak.withdrawal}%
                  </span>
                </div>
                <Progress value={streak.withdrawal} max={100} />
                <p className="text-gray-500 text-sm text-center pt-2">
                  Your brain is adjusting. Cravings are strongest now. Stay
                  strong!
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<Trophy className="text-yellow-500" size={24} />}
              title="Longest Streak"
              value={streak.longest.toString()}
              subtitle="days"
            />

            <StatCard
              icon={<TrendingUp className="text-emerald-400" size={24} />}
              title="VS Longest"
              value={`${streak.vsLongest}%`}
              subtitle="New Record!"
              highlight
            />

            <StatCard
              icon={<RotateCcw className="text-red-500" size={24} />}
              title="Total Resets"
              value={streak.totalResets.toString()}
              subtitle="times reset"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
