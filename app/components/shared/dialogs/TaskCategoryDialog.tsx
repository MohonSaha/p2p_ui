import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { VITE_BASE_API } from "~/lib/serverUrls";

export interface Category {
  id: number;
  name: string;
}

interface TaskCategoryDialogProps {
  isOpen: boolean;
  taskName: string;
  onConfirm: (categoryId: number) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TaskCategoryDialog = ({
  isOpen,
  taskName,
  onConfirm,
  onCancel,
  isLoading = false,
}: TaskCategoryDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const res = await fetch(`${VITE_BASE_API}/task-category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (err) {
      setError("Could not load categories");
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    onConfirm(categoryId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-xs sm:max-w-md max-h-[70vh] sm:max-h-[60vh] flex flex-col gap-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Select Category</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Task:{" "}
            <span className="font-medium text-foreground">{taskName}</span>
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded m-4">
              {error}
            </div>
          )}

          {fetchLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                Loading categories...
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 p-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border-2 border-muted bg-background hover:border-primary hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {category?.category}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCategoryDialog;
