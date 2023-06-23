import { Task } from '../store/TaskState.ts';
import { ChevronRight } from 'lucide-react';

type TaskItemProps = {
  givenTask: Task;
};

const TaskItem = ({ givenTask }: TaskItemProps) => {
  return (
    <div className={'task-item-container'}>
      <div className={'task-item-main'}>
        <label className={'task-item-text'}>
          <ChevronRight />
          {givenTask.title}
        </label>
        <input type={'checkbox'} className={'task-checkbox'} />
      </div>
      {givenTask.subTaskList.map((item) => (
        <TaskItem givenTask={item} key={item.id} />
      ))}
    </div>
  );
};

export default TaskItem;
