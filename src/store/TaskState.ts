import { makeAutoObservable } from 'mobx';
import {
  completeSubTasks,
  findTaskById,
  removeTaskById,
} from '../utils/utils.ts';

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  isActive: boolean;
  isEditing?: boolean;
  createdAt: Date;
  subTaskList: Task[];
};

export const tempData: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    completed: false,
    isActive: false,
    isEditing: false,
    createdAt: new Date(),
    subTaskList: [
      {
        id: 1.1,
        title: 'Task 1.1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        completed: false,
        isActive: false,
        isEditing: false,
        createdAt: new Date(),
        subTaskList: [
          {
            id: 1.11,
            title: 'Task 1.1.1',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            completed: false,
            isActive: false,
            isEditing: false,
            createdAt: new Date(),
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
        isEditing: false,
        createdAt: new Date(),
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
    isEditing: false,
    createdAt: new Date(),
    subTaskList: [
      {
        id: 2.1,
        title: 'Task 2.1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        completed: false,
        isActive: false,
        isEditing: false,
        createdAt: new Date(),
        subTaskList: [],
      },
    ],
  },
];

class TaskState {
  tasksList: Task[] = [];

  chosenTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTaskList(list: Task[]) {
    this.tasksList = list;
  }

  chooseTask(taskId: number) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    this.chosenTask = found;
  }

  activateTask(taskId: number) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    found.isActive = !found.isActive;
  }

  completeTask(taskId: number) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    const currentCompleted = found.completed;

    found.completed = !currentCompleted;

    completeSubTasks(found, !currentCompleted);
  }

  addEmptyTask() {
    this.tasksList.push({
      id: Date.now(),
      title: 'New task',
      description: 'Add description',
      completed: false,
      isActive: false,
      isEditing: true,
      createdAt: new Date(),
      subTaskList: [],
    });
  }

  editTitle(taskId: number, title: string) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    found.title = title;

    found.isEditing = false;
  }

  addSubTask(taskId: number) {
    const found = findTaskById(this.tasksList, taskId);

    if (!found) return;

    found.isActive = true;

    found.subTaskList.push({
      id: Date.now(),
      title: 'New subtask',
      description: 'Add description',
      completed: false,
      isActive: false,
      isEditing: true,
      createdAt: new Date(),
      subTaskList: [],
    });
  }

  editFullInfo({ title, description }: { title: string; description: string }) {
    if (!this.chosenTask) return;

    this.chosenTask.title = title;
    this.chosenTask.description = description;
  }

  deleteTask(taskId: number) {
    removeTaskById(this.tasksList, taskId);
    this.chosenTask = null;
  }

  deleteCompletedTasks() {
    this.tasksList = this.tasksList.filter((task) => !task.completed);
  }

  get tasksLeft() {
    return this.tasksList.filter((task) => !task.completed).length;
  }
}

export default new TaskState();
