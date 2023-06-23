import taskState from '../store/TaskState.ts';
import TaskItem from './TaskItem.tsx';
import { observer } from 'mobx-react-lite';

const TaskTree = observer(() => {
  return (
    <div className={'tree-container'}>
      <h2>Task tree</h2>
      <ul className={'task-list'}>
        {taskState.tasksList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
});

export default TaskTree;
