import { Task } from '../store/TaskState.ts';

export function findTaskById(tasks: Task[], id: number): Task | null {
  let result: Task | null = null;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.id === id) {
      task.isActive = !task.isActive;
      result = task;

      return result;
    }

    if (task.subTaskList.length > 0) {
      result = findTaskById(task.subTaskList, id);

      if (result !== null) {
        return result;
      }
    }
  }

  return result;
}