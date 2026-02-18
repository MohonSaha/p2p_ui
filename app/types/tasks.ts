export interface Task {
  id: string;
  task: string;
  taskDate: string;
  isDone: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface TaskStack {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  stackId: string;
  task: string;
  assignedDate: string;
  isDone: boolean;
}

export type GroupedTasks = Record<string, Task[]>;
