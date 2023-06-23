import { makeObservable, observable } from 'mobx';

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  subTaskList: Task[];
};

class TaskState {
  tasksList: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      completed: false,
      subTaskList: [
        {
          id: 1.1,
          title: 'Task 1.1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          completed: false,
          subTaskList: [
            {
              id: 1.11,
              title: 'Task 1.1.1',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
              completed: false,
              subTaskList: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      completed: false,
      subTaskList: [
        {
          id: 2.1,
          title: 'Task 2.1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          completed: false,
          subTaskList: [],
        },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      tasksList: observable,
    });
  }
}

export default new TaskState();
