import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";
import { CategoryRow } from "./CategoryRow";

export interface TaskCategory {
  id: number;
  category: string;
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
}

const BASE_URL = "http://localhost:4001/api/v1/task-category";

const TaskCategory = () => {
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchCategories = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${BASE_URL}`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data: TaskCategory[] = await res.json();
      setCategories(data.filter((c) => !c.isDeleted));
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const name = newCategory.trim();
    if (!name) return toast.error("Category name is required");
    if (categories.some((c) => c.category.toLowerCase() === name.toLowerCase()))
      return toast.error("Category already exists");

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: name }),
      });
      if (!res.ok) throw new Error();

      const json = await res.json();

      // Handle both raw response and wrapped response shapes
      const created: TaskCategory =
        json?.data ?? json?.result ?? json?.category ?? json;

      setCategories((prev) => [created, ...prev]); // 👈 instant UI update
      setNewCategory("");
      toast.success("Category created");
    } catch {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, name: string) => {
    // Save old value for rollback
    const previous = categories.find((c) => c.id === id);

    // Optimistic update — instant UI
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, category: name, updated_at: new Date().toISOString() }
          : c
      )
    );

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: name }),
      });
      if (!res.ok) throw new Error();
      toast.success("Category updated");
    } catch {
      // Rollback to previous value only — no refetch
      if (previous) {
        setCategories((prev) => prev.map((c) => (c.id === id ? previous : c)));
      }
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Task Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="New category name…"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                <Plus className="mr-1 h-4 w-4" />
                {loading ? "Adding…" : "Add"}
              </Button>
            </form>

            {/* List */}
            {fetching ? (
              <p className="py-8 text-center text-muted-foreground">
                Loading categories…
              </p>
            ) : categories.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No categories yet. Create one above.
              </p>
            ) : (
              <div className="flex flex-wrap gap-6">
                {categories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCategory;
