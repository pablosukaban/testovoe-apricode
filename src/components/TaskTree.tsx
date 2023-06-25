import taskState from '../store/TaskState.ts';
import TaskItem from './TaskItem.tsx';
import { observer } from 'mobx-react-lite';

const TaskTree = observer(() => {
  const handleAddButtonClick = () => {
    taskState.addEmptyTask();
  };

  return (
    <div className={'tree-container'}>
      <div className={'tree-header'}>
        <h2>Задачи</h2>
        <button onClick={handleAddButtonClick}>Добавить</button>
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
