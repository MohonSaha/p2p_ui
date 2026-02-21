// import { useState } from "react";
// import { getDaysInMonth } from "~/hooks/useMonthlyMap";
// import { CellEditDialog } from "./CellEditDialog";
// import { Trash2 } from "lucide-react";
// import { Button } from "~/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/components/ui/table";
// import type { Goal } from "~/types/monthly-map";
// import { formatShortDate } from "~/components/helper/date";

// interface Props {
//   month: string;
//   goals: Goal[];
//   getCellValue: (goalId: string, date: string) => string | undefined;
//   setCellValue: (goalId: string, date: string, value: string) => void;
//   removeGoal: (goalId: string) => void;
// }

// export function GoalTable({
//   month,
//   goals,
//   getCellValue,
//   setCellValue,
//   removeGoal,
// }: Props) {
//   const days = getDaysInMonth(month);
//   const [editCell, setEditCell] = useState<{ goal: Goal; date: string } | null>(
//     null
//   );

//   const renderCellContent = (goal: Goal, date: string) => {
//     const value = getCellValue(goal.id, date);
//     if (value === undefined || value === "") {
//       return (
//         <div className="w-full h-full min-h-[32px] bg-muted/60 rounded-sm flex items-center justify-center text-sm font-medium text-muted-foreground/40 tabular-nums px-1">
//           <span className="hidden sm:inline-flex">{goal?.name}</span>
//           <span className=" inline-flex sm:hidden">
//             {goal?.name
//               ?.split(" ")
//               .slice(0, 2)
//               .map((word) => word[0])
//               .join("")
//               .toUpperCase()}
//           </span>
//         </div>
//       );
//     }
//     if (goal.valueType === "boolean") {
//       return (
//         <div
//           className={`w-full h-full min-h-[32px] rounded-sm ${
//             value === "true" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {/* {goal?.name} */}
//         </div>
//       );
//     }
//     return (
//       <div className="w-full h-full min-h-[32px] bg-green-500/80 rounded-sm flex items-center justify-center text-sm font-medium text-green-500-foreground tabular-nums px-1">
//         {value}
//       </div>
//     );
//   };

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <>
//       {/* Mobile: both axes scroll with fixed height. Desktop: horizontal scroll only */}
//       <div className="rounded-lg border border-border overflow-auto max-h-[70vh] sm:max-h-none sm:overflow-x-auto">
//         <Table className="border-collapse">
//           <TableHeader>
//             <TableRow className="bg-muted/50">
//               {/* Corner cell: sticky left+top on mobile, sticky left only on desktop */}
//               <TableHead className="sticky left-0 top-0 sm:top-auto z-30 bg-muted min-w-[60px] sm:min-w-[120px] font-semibold text-xs sm:text-sm shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
//                 Date
//               </TableHead>
//               {goals.map((goal, idx) => (
//                 <TableHead
//                   key={goal.id}
//                   className={`sticky top-0 sm:static z-20 sm:z-auto bg-muted min-w-[40px] sm:min-w-[80px] text-center border-b border-border ${
//                     idx === goals.length - 1 ? "border-r border-border" : ""
//                   }`}
//                 >
//                   <div className="flex items-center justify-center gap-1">
//                     <span className="font-semibold text-[10px] sm:text-xs uppercase tracking-wide [writing-mode:vertical-lr] sm:[writing-mode:horizontal-tb] rotate-180 sm:rotate-0 px-2 sm:px-0">
//                       {goal.name}
//                     </span>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-5 w-5 opacity-40 hover:opacity-100 hover:text-destructive hidden sm:inline-flex"
//                       onClick={() => removeGoal(goal.id)}
//                     >
//                       <Trash2 className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {days.map((date) => {
//               const isToday = date === today;
//               const fullDate = new Date(date);
//               const shortDate = fullDate.toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "2-digit",
//               });
//               return (
//                 <TableRow
//                   key={date}
//                   className={isToday ? "font-bold text-blue-500" : ""}
//                 >
//                   <TableCell className="sticky left-0 z-10 bg-card font-mono text-[11px] sm:text-sm tabular-nums shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
//                     <span className="sm:hidden">{shortDate}</span>
//                     <span className="hidden sm:inline">
//                       {formatShortDate(date)}
//                     </span>
//                   </TableCell>
//                   {goals.map((goal, idx) => (
//                     <TableCell
//                       key={goal.id}
//                       className={`p-1 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all ${
//                         idx === goals.length - 1 ? "border-r border-border" : ""
//                       }`}
//                       onClick={() => setEditCell({ goal, date })}
//                     >
//                       {renderCellContent(goal, date)}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>

//       {editCell && (
//         <CellEditDialog
//           open={!!editCell}
//           onClose={() => setEditCell(null)}
//           goal={editCell.goal}
//           date={editCell.date}
//           currentValue={getCellValue(editCell.goal.id, editCell.date)}
//           onSave={(value) =>
//             setCellValue(editCell.goal.id, editCell.date, value)
//           }
//         />
//       )}
//     </>
//   );
// }

import { useState } from "react";
import { getDaysInMonth } from "~/hooks/useMonthlyMap";
import { CellEditDialog } from "./CellEditDialog";
import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Goal } from "~/types/monthly-map";
import { formatShortDate } from "~/components/helper/date";

interface Props {
  month: string;
  goals: Goal[];
  getCellValue: (goalId: string, date: string) => string | undefined;
  setCellValue: (goalId: string, date: string, value: string) => void;
  removeGoal: (goalId: string) => void;
}

export function GoalTable({
  month,
  goals,
  getCellValue,
  setCellValue,
  removeGoal,
}: Props) {
  const days = getDaysInMonth(month);
  const [editCell, setEditCell] = useState<{ goal: Goal; date: string } | null>(
    null
  );

  const renderCellContent = (goal: Goal, date: string) => {
    const value = getCellValue(goal.id, date);
    if (value === undefined || value === "") {
      return (
        <div className="w-full h-full min-h-[32px] bg-muted/60 rounded-sm flex items-center justify-center text-sm font-medium text-muted-foreground/40 tabular-nums px-1">
          <span className="hidden sm:inline-flex">{goal?.name}</span>
          <span className="inline-flex sm:hidden">
            {goal?.name
              ?.split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>
      );
    }
    if (goal.valueType === "boolean") {
      return (
        <div
          className={`w-full h-full min-h-[32px] rounded-sm ${
            value === "true" ? "bg-green-500" : "bg-red-500"
          }`}
        />
      );
    }
    return (
      <div className="w-full h-full min-h-[32px] bg-green-500/80 rounded-sm flex items-center justify-center text-sm font-medium text-green-500-foreground tabular-nums px-1">
        {value}
      </div>
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="rounded-lg border border-border overflow-auto max-h-[70vh] sm:max-h-none sm:overflow-x-auto">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="sticky left-0 top-0 sm:top-auto z-30 bg-muted min-w-[60px] sm:min-w-[120px] font-semibold text-xs sm:text-sm shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                Date
              </TableHead>
              {goals.map((goal, idx) => (
                <TableHead
                  key={goal.id}
                  className={`sticky top-0 sm:static z-20 sm:z-auto bg-muted min-w-[40px] sm:min-w-[80px] text-center border-b border-border ${
                    idx === goals.length - 1 ? "border-r border-border" : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-[10px] sm:text-xs uppercase tracking-wide [writing-mode:vertical-lr] sm:[writing-mode:horizontal-tb] rotate-180 sm:rotate-0 px-2 sm:px-0">
                      {goal.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 opacity-40 hover:opacity-100 hover:text-destructive hidden sm:inline-flex"
                      onClick={() => removeGoal(goal.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((date) => {
              const isToday = date === today;
              const fullDate = new Date(date);
              const shortDate = fullDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
              });
              return (
                <TableRow
                  key={date}
                  className={isToday ? "font-bold text-blue-500" : ""}
                >
                  <TableCell className="sticky left-0 z-10 bg-card font-mono text-[11px] sm:text-sm tabular-nums shadow-[2px_0_5px_rgba(0,0,0,0.3)]">
                    <span className="sm:hidden">{shortDate}</span>
                    <span className="hidden sm:inline">
                      {formatShortDate(date)}
                    </span>
                  </TableCell>
                  {goals.map((goal, idx) => (
                    <TableCell
                      key={goal.id}
                      className={`p-1 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all ${
                        idx === goals.length - 1 ? "border-r border-border" : ""
                      }`}
                      onClick={() => setEditCell({ goal, date })}
                    >
                      {renderCellContent(goal, date)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {editCell && (
        <CellEditDialog
          open={!!editCell}
          onClose={() => setEditCell(null)}
          goal={editCell.goal}
          date={editCell.date}
          currentValue={getCellValue(editCell.goal.id, editCell.date)}
          onSave={(value) => {
            setCellValue(editCell.goal.id, editCell.date, value);
            setEditCell(null);
          }}
        />
      )}
    </>
  );
}
