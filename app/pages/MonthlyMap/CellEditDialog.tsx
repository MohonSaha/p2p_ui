import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Check, X } from "lucide-react";
import type { Goal } from "~/types/monthly-map";
import { formatShortDate } from "~/components/helper/date";

interface Props {
  open: boolean;
  onClose: () => void;
  goal: Goal;
  date: string;
  currentValue?: string;
  onSave: (value: string) => void;
}

export function CellEditDialog({
  open,
  onClose,
  goal,
  date,
  currentValue,
  onSave,
}: Props) {
  const [textValue, setTextValue] = useState(currentValue || "");

  const handleBooleanSave = (val: boolean) => {
    onSave(val ? "true" : "false");
    onClose();
  };

  const handleTextSave = () => {
    onSave(textValue);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
        else setTextValue(currentValue || "");
      }}
    >
      <DialogContent className="max-w-xs sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">
            {goal.name}
            <p>{formatShortDate(date)}</p>
          </DialogTitle>
        </DialogHeader>
        {goal.valueType === "boolean" ? (
          <div className="flex gap-3 py-4 justify-center">
            <Button
              size="lg"
              className="flex-1 bg-green-500 text-green-50-foreground hover:bg-green-500/90 cursor-pointer"
              onClick={() => handleBooleanSave(true)}
            >
              <Check className="mr-2 h-5 w-5" /> Yes
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-red-500 text-red-500-foreground hover:bg-red-500/90 cursor-pointer"
              onClick={() => handleBooleanSave(false)}
            >
              <X className="mr-2 h-5 w-5" /> No
            </Button>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <Label>Enter value</Label>
            <Input
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="e.g., 2.25 or 8:30"
              onKeyDown={(e) => e.key === "Enter" && handleTextSave()}
              autoFocus
            />
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleTextSave}>Save</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
