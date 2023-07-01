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
        <h2>Задачи</h2>
        <div>
          <button onClick={handleAddButtonClick} title="Добавить задачу">
            <PlusSquare />
          </button>
          <button onClick={handleDeleteClick} title="Удалить выделенное">
            <XSquare />
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
