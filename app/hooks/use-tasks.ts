import { useState, useEffect, useCallback } from "react";
import type { Task, GroupedTasks, TaskStack } from "~/types/tasks";

const TASKS_KEY = "daily-planner-tasks";
const STACKS_KEY = "task-stacks";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const persist = useCallback((updated: Task[]) => {
    setTasks(updated);
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
  }, []);

  const addTask = useCallback(
    (taskText: string, date: string) => {
      const newTask: Task = {
        id: generateId(),
        task: taskText,
        taskDate: date,
        isDone: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };
      persist([...tasks, newTask]);
    },
    [tasks, persist]
  );

  const toggleTask = useCallback(
    (id: string) => {
      persist(
        tasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
      );
    },
    [tasks, persist]
  );

  const deleteTask = useCallback(
    (id: string) => {
      persist(tasks.filter((t) => t.id !== id));
    },
    [tasks, persist]
  );

  const reassignTask = useCallback(
    (id: string, newDate: string) => {
      persist(
        tasks.map((t) =>
          t.id === id ? { ...t, taskDate: newDate, isDone: false } : t
        )
      );
    },
    [tasks, persist]
  );

  const grouped: GroupedTasks = {};
  for (const t of tasks.filter((t) => !t.isDeleted)) {
    const d = t.taskDate;
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(t);
  }

  const undoneTasks = tasks.filter((t) => !t.isDone && !t.isDeleted);

  return {
    tasks,
    grouped,
    undoneTasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    reassignTask,
  };
}

export function useTaskStacks() {
  const [stacks, setStacks] = useState<TaskStack[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STACKS_KEY);
    if (stored) setStacks(JSON.parse(stored));
  }, []);

  const persist = useCallback((updated: TaskStack[]) => {
    setStacks(updated);
    localStorage.setItem(STACKS_KEY, JSON.stringify(updated));
  }, []);

  const addStack = useCallback(
    (
      title: string,
      description: string,
      startDate: string,
      endDate: string
    ) => {
      const newStack: TaskStack = {
        id: generateId(),
        title,
        description,
        startDate,
        endDate,
        createdAt: new Date().toISOString(),
        subtasks: [],
      };
      persist([...stacks, newStack]);
    },
    [stacks, persist]
  );

  const deleteStack = useCallback(
    (id: string) => {
      persist(stacks.filter((s) => s.id !== id));
    },
    [stacks, persist]
  );

  const addSubtask = useCallback(
    (stackId: string, taskText: string, assignedDate: string) => {
      persist(
        stacks.map((s) =>
          s.id === stackId
            ? {
                ...s,
                subtasks: [
                  ...s.subtasks,
                  {
                    id: generateId(),
                    stackId,
                    task: taskText,
                    assignedDate,
                    isDone: false,
                  },
                ],
              }
            : s
        )
      );
    },
    [stacks, persist]
  );

  const toggleSubtask = useCallback(
    (stackId: string, subtaskId: string) => {
      persist(
        stacks.map((s) =>
          s.id === stackId
            ? {
                ...s,
                subtasks: s.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, isDone: !st.isDone } : st
                ),
              }
            : s
        )
      );
    },
    [stacks, persist]
  );

  const deleteSubtask = useCallback(
    (stackId: string, subtaskId: string) => {
      persist(
        stacks.map((s) =>
          s.id === stackId
            ? { ...s, subtasks: s.subtasks.filter((st) => st.id !== subtaskId) }
            : s
        )
      );
    },
    [stacks, persist]
  );

  const reassignSubtask = useCallback(
    (stackId: string, subtaskId: string, newDate: string) => {
      persist(
        stacks.map((s) =>
          s.id === stackId
            ? {
                ...s,
                subtasks: s.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, assignedDate: newDate } : st
                ),
              }
            : s
        )
      );
    },
    [stacks, persist]
  );

  return {
    stacks,
    addStack,
    deleteStack,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    reassignSubtask,
  };
}
