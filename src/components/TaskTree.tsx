import taskState from '../store/TaskState.ts';
import TaskItem from './TaskItem.tsx';
import { observer } from 'mobx-react-lite';
import { PlusSquare, XSquare } from 'lucide-react';

const TaskTree = observer(() => {
  const handleAddButtonClick = () => {
    taskState.addEmptyTask();
  };

  const handleDeleteClick = () => {
    taskState.deleteCompletedTasks();

    localStorage.setItem('tasks', JSON.stringify(taskState.tasksList));
  };

  return (
    <div className={'tree-container'}>
      <div className={'tree-header'}>
        <div className="tree-header-title">
          <h2>Ваши Задачи</h2>
          <p>
            Осталось {taskState.tasksLeft}{' '}
            {taskState.tasksLeft === 1
              ? 'задача'
              : taskState.tasksLeft < 5 && taskState.tasksLeft > 1
              ? 'задачи'
              : 'задач'}
            .
          </p>
        </div>

        <div className={'tree-header-buttons'}>
          <button onClick={handleAddButtonClick} title="Добавить задачу">
            <PlusSquare className="tree-icon" />
          </button>
          <button onClick={handleDeleteClick} title="Удалить выделенное">
            <XSquare className="tree-icon" />
          </button>
        </div>
      </div>
      <ul className={'task-list'}>
        {taskState.tasksList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
});

export default TaskTree;
