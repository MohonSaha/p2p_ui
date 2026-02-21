// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "~/components/ui/dialog";
// import { Button } from "~/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSelect: (month: string) => void;
//   currentMonth: string;
// }

// export function MonthPickerDialog({
//   open,
//   onClose,
//   onSelect,
//   currentMonth,
// }: Props) {
//   const [year, setYear] = useState(() => parseInt(currentMonth.split("-")[0]));

//   return (
//     <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
//       <DialogContent className="sm:max-w-xs">
//         <DialogHeader>
//           <DialogTitle>Select Month</DialogTitle>
//         </DialogHeader>
//         <div className="flex items-center justify-between mb-3">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setYear((y) => y - 1)}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <span className="font-semibold text-lg">{year}</span>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setYear((y) => y + 1)}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-3 gap-2">
//           {MONTHS.map((m, i) => {
//             const value = `${year}-${(i + 1).toString().padStart(2, "0")}`;
//             const isActive = value === currentMonth;
//             return (
//               <Button
//                 key={m}
//                 variant={isActive ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => {
//                   onSelect(value);
//                   onClose();
//                 }}
//               >
//                 {m}
//               </Button>
//             );
//           })}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (month: string) => void;
  currentMonth: string;
}

export function MonthPickerDialog({
  open,
  onClose,
  onSelect,
  currentMonth,
}: Props) {
  const [year, setYear] = useState(() => parseInt(currentMonth.split("-")[0]));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Select Month</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setYear((y) => y - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-lg">{year}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setYear((y) => y + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((m, i) => {
            const value = `${year}-${(i + 1).toString().padStart(2, "0")}`;
            const isActive = value === currentMonth;
            return (
              <Button
                key={m}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onSelect(value);
                  onClose();
                }}
              >
                {m}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
