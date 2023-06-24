import taskState, { Task } from '../store/TaskState.ts';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';

type TaskItemProps = {
  givenTask: Task;
};

const TaskItem = observer(({ givenTask }: TaskItemProps) => {
  const handleItemClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    taskState.chooseTask(id);
  };

  return (
    <div
      className={`task-item-container ${givenTask.isActive && 'active'}`}
      onClick={(e) => handleItemClick(e, givenTask.id)}
    >
      <div className={'task-item-main'}>
        <label className={'task-item-text'}>
          {givenTask.isActive ? <ChevronDown /> : <ChevronRight />}
          {givenTask.title}
        </label>
        <input type={'checkbox'} className={'task-checkbox'} />
      </div>
      {givenTask.isActive &&
        givenTask.subTaskList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
    </div>
  );
});

export default TaskItem;
