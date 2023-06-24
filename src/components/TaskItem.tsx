import taskState, { Task } from '../store/TaskState.ts';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

type TaskMenuProps = {
  isMenuOpened: boolean;
  closeMenu: () => void;
};

const TaskMenu = ({ closeMenu, isMenuOpened }: TaskMenuProps) => {
  return <div className={`task-menu ${isMenuOpened && 'open'}`}>123</div>;
};

type TaskItemProps = {
  givenTask: Task;
};

const TaskItem = observer(({ givenTask }: TaskItemProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleItemClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    taskState.chooseTask(id);

    console.log('click');
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    e.stopPropagation();

    taskState.completeTask(id);

    console.log('checkbox');
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsMenuOpened(!isMenuOpened);

    console.log('more');
  };

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
        <span className={'task-options'}>
          <span onClick={handleMoreClick}>
            <MoreHorizontal />
          </span>
          <input
            type={'checkbox'}
            className={'task-checkbox'}
            checked={givenTask.completed}
            onChange={(e) => handleCheckboxChange(e, givenTask.id)}
          />
        </span>
      </div>
      {givenTask.isActive &&
        givenTask.subTaskList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
      <TaskMenu
        closeMenu={() => setIsMenuOpened(false)}
        isMenuOpened={isMenuOpened}
      />
    </div>
  );
});

export default TaskItem;
