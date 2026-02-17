import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface ResetDialogProps {
  onReset: (date: Date) => void;
}

export function ResetStreakDialog({ onReset }: ResetDialogProps) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (date) {
      onReset(date);
      setOpen(false);
      setDate(undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="gap-1.5 border border-red-500/30 text-red-500 hover:bg-red-500/15 bg-red-500/20 cursor-pointer"
        >
          Reset Streak
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-900 border-gray-700 top-60">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Reset Your Streak</DialogTitle>
          <DialogDescription className="text-gray-400">
            This will end your current streak and start a new one. Select the
            date of your last relapse.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[260px] justify-start text-left font-normal border-gray-600 hover:border-gray-500",
                  !date && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-gray-800 border-gray-700"
              align="center"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d: any) => d > new Date()}
                initialFocus
                className="bg-gray-800"
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!date}
            className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
