import { Task } from '../store/TaskState.ts';

export function findTaskById(tasks: Task[], id: number): Task | null {
  let result: Task | null = null;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.id === id) {
      // task.isActive = !task.isActive;
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

export function removeTaskById(list: Task[], id: number) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return;
    } else if (list[i].subTaskList && list[i].subTaskList.length > 0) {
      removeTaskById(list[i].subTaskList, id);
    }
  }
}

export function completeSubTasks(givenTask: Task, completed: boolean) {
  if (givenTask.subTaskList && givenTask.subTaskList.length > 0) {
    for (let i = 0; i < givenTask.subTaskList.length; i++) {
      const subTask = givenTask.subTaskList[i];

      subTask.completed = completed;

      completeSubTasks(subTask, completed);
    }
  } else {
    return;
  }
}
