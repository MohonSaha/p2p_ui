import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { TaskCategory } from "./TaskCategory";

interface Props {
  category: TaskCategory;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const CategoryRow = ({ category, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(category.category);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    try {
      setSaving(true);
      await onUpdate(category.id, trimmed);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setValue(category.category);
    setEditing(false);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await onDelete(category.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-card p-4 text-center shadow-sm flex-1 max-w-sx  sm:min-w-xs sm:max-w-md">
      {editing ? (
        <>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full text-center"
            autoFocus
            disabled={saving}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
          />
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={save}
              disabled={saving}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={cancel}
              disabled={saving}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className="text-sm font-medium">{category.category}</span>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditing(true)}
              disabled={deleting}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
