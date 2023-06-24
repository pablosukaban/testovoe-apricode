import taskState, { Task } from '../store/TaskState.ts';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

type TaskItemProps = {
  givenTask: Task;
};

const TaskItem = observer(({ givenTask }: TaskItemProps) => {
  const handleItemClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    taskState.chooseTask(id);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    e.stopPropagation();

    taskState.completeTask(id);
  };

  const checkRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`task-item-container ${givenTask.isActive && 'active'}`}
      onClick={(e) => handleItemClick(e, givenTask.id)}
    >
      <div className={'task-item-main'}>
        <label
          className={`task-item-text ${givenTask.completed && 'completed'}`}
        >
          {givenTask.isActive ? <ChevronDown /> : <ChevronRight />}
          <span className={`${givenTask.completed && 'completed'}`}>
            {givenTask.title}
          </span>
        </label>
        <input
          ref={checkRef}
          type={'checkbox'}
          className={'task-checkbox'}
          checked={givenTask.completed}
          onChange={(e) => handleCheckboxChange(e, givenTask.id)}
        />
      </div>
      {givenTask.isActive &&
        givenTask.subTaskList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
    </div>
  );
});

export default TaskItem;
