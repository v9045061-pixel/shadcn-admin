// Тип для daily task
export type DailyTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

// Мокові API-функції для daily tasks
let dailyTasksMock: DailyTask[] = [
  { id: '1', title: 'Task 1', isCompleted: false },
  { id: '2', title: 'Task 2', isCompleted: true },
];

async function fetchDailyTasks(): Promise<DailyTask[]> {
  return dailyTasksMock;
}

async function createDailyTask({ title }: { title: string }): Promise<DailyTask> {
  const newTask = { id: Math.random().toString(), title, isCompleted: false };
  dailyTasksMock = [newTask, ...dailyTasksMock];
  return newTask;
}

async function toggleDailyTask({ id, isCompleted }: { id: string; isCompleted: boolean }): Promise<DailyTask> {
  dailyTasksMock = dailyTasksMock.map((t) => t.id === id ? { ...t, isCompleted } : t);
  return dailyTasksMock.find((t) => t.id === id)!;
}

async function deleteDailyTask(id: string): Promise<void> {
  dailyTasksMock = dailyTasksMock.filter((t) => t.id !== id);
}

// Хуки для daily tasks
export function useDailyTasks() {
  return useQuery<DailyTask[]>({
    queryKey: ['dailyTasks'],
    queryFn: fetchDailyTasks,
  });
}

export function useCreateDailyTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDailyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks'] });
    },
  });
}

export function useToggleDailyTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleDailyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks'] });
    },
  });
}

export function useDeleteDailyTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDailyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyTasks'] });
    },
  });
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Типи для проектів і логів
export type Project = {
  id: string;
  name: string;
  description?: string;
};

export type Log = {
  id: string;
  projectId: string;
  message: string;
  createdAt: string;
};

// Мокові API-функції (замініть на реальні запити до бекенду)
async function fetchProjects(): Promise<Project[]> {
  // Тут має бути реальний запит
  return [
    { id: '1', name: 'Project One', description: 'Опис першого проекту' },
    { id: '2', name: 'Project Two', description: 'Опис другого проекту' },
  ];
}

async function createLog(projectId: string, message: string): Promise<Log> {
  // Тут має бути реальний запит
  return {
    id: Math.random().toString(),
    projectId,
    message,
    createdAt: new Date().toISOString(),
  };
}

// Хук для отримання проектів
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}

// Хук для створення логу
export function useCreateLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, message }: { projectId: string; message: string }) =>
      createLog(projectId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
