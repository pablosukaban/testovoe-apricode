import { action, makeObservable, observable } from 'mobx';

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  isActive: boolean;
  subTaskList: Task[];
};

class TaskState {
  tasksList: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      completed: false,
      isActive: false,
      subTaskList: [
        {
          id: 1.1,
          title: 'Task 1.1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          completed: false,
          isActive: false,
          subTaskList: [
            {
              id: 1.11,
              title: 'Task 1.1.1',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
              completed: false,
              isActive: false,
              subTaskList: [],
            },
          ],
        },
        {
          id: 1.2,
          title: 'Task 1.2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          completed: false,
          isActive: false,
          subTaskList: [],
        },
      ],
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      completed: false,
      isActive: false,
      subTaskList: [
        {
          id: 2.1,
          title: 'Task 2.1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          completed: false,
          isActive: false,
          subTaskList: [],
        },
      ],
    },
  ];

  chosenTask: Task | null = null;

  constructor() {
    makeObservable(this, {
      tasksList: observable,
      chosenTask: observable,
      chooseTask: action,
    });
  }

  chooseTask(taskId: number) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    this.chosenTask = found;
  }
}

function findTaskById(tasks: Task[], id: number): Task | null {
  let result: Task | null = null;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.id === id) {
      task.isActive = true;
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

export default new TaskState();
