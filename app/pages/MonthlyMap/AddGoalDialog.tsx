// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "~/components/ui/dialog";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import type { GoalValueType } from "~/types/monthly-map";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onAdd: (name: string, valueType: GoalValueType) => void;
// }

// export function AddGoalDialog({ open, onClose, onAdd }: Props) {
//   const [name, setName] = useState("");
//   const [valueType, setValueType] = useState<GoalValueType>("boolean");

//   const handleSubmit = () => {
//     if (!name.trim()) return;
//     onAdd(name.trim(), valueType);
//     setName("");
//     setValueType("boolean");
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Goal</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 py-2">
//           <div className="space-y-2">
//             <Label htmlFor="goal-name">Goal Name</Label>
//             <Input
//               id="goal-name"
//               placeholder="e.g., 4hr Study"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Value Type</Label>
//             <Select
//               value={valueType}
//               onValueChange={(v) => setValueType(v as GoalValueType)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="boolean">Yes / No</SelectItem>
//                 <SelectItem value="text">Number / Text</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={!name.trim()}>
//             Add Goal
//           </Button>
//         </DialogFooter>
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
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { GoalValueType } from "~/types/monthly-map";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "https://p2pserver-production-a821.up.railway.app/api/v1";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, valueType: GoalValueType) => void;
  /** The month for which the goal is being created (defaults to current month) */
  goalDate?: string; // "YYYY-MM-DD"
}

export function AddGoalDialog({ open, onClose, onAdd, goalDate }: Props) {
  const [name, setName] = useState("");
  const [valueType, setValueType] = useState<GoalValueType>("boolean");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGoalDate = () => {
    if (goalDate) return goalDate;
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-01`;
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    const payload = {
      goalName: name.trim(),
      goalBooleanValue: valueType === "boolean" ? 1 : null,
      goalType: valueType,
      goalDate: getGoalDate(),
    };

    try {
      const res = await fetch(`${API_BASE}/monthly-goal/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Request failed (${res.status})`);
      }

      onAdd(name.trim(), valueType);
      setName("");
      setValueType("boolean");
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-xs sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g., 4hr Study"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label>Value Type</Label>
            <Select
              value={valueType}
              onValueChange={(v) => setValueType(v as GoalValueType)}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boolean">Yes / No</SelectItem>
                <SelectItem value="text">Number / Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || loading}>
            {loading ? "Adding…" : "Add Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
