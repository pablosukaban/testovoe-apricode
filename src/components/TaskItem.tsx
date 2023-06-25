import taskState, { Task } from '../store/TaskState.ts';
import { ChevronRight, ChevronDown, Check, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TaskMenu } from './TaskMenu.tsx';

type TaskItemProps = {
  givenTask: Task;
};

const TaskItem = observer(({ givenTask }: TaskItemProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const [isEditing, setIsEditing] = useState(() => {
    if (givenTask.isEditing) {
      return givenTask.isEditing;
    }

    return false;
  });
  const [editValue, setEditValue] = useState(givenTask.title);

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  const startEditing = () => {
    closeMenu();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const submitEditing = (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditing(false);

    taskState.editTitle(givenTask.id, editValue);
  };

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

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditing]);

  const handleEditInputFocus = () => {
    if (editInputRef.current) {
      editInputRef.current.select();
    }
  };

  return (
    <div
      className={`task-item-container ${givenTask.isActive && 'active'}`}
      onClick={(e) => handleItemClick(e, givenTask.id)}
    >
      <div className={'task-item-main'}>
        {isEditing ? (
          <form className={'task-item-edit'} onSubmit={submitEditing}>
            <input
              ref={editInputRef}
              type={'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onFocus={handleEditInputFocus}
            />
            <span className={'buttons'}>
              <button>
                <Check />
              </button>
              <button type={'button'} onClick={cancelEditing}>
                <X />
              </button>
            </span>
          </form>
        ) : (
          <>
            <label
              className={`task-item-text ${givenTask.completed && 'completed'}`}
            >
              {givenTask.isActive ? <ChevronDown /> : <ChevronRight />}
              <span className={`${givenTask.completed && 'completed'}`}>
                {givenTask.title}
              </span>
            </label>
            <span className={'task-options'}>
              <span onClick={handleMoreClick} className={'more'}>
                <MoreHorizontal />
              </span>
              <TaskMenu
                closeMenu={closeMenu}
                isMenuOpened={isMenuOpened}
                startEditing={startEditing}
              />
              <input
                type={'checkbox'}
                className={'task-checkbox'}
                checked={givenTask.completed}
                onChange={(e) => handleCheckboxChange(e, givenTask.id)}
              />
            </span>
          </>
        )}
      </div>
      {givenTask.isActive &&
        givenTask.subTaskList.map((item) => (
          <TaskItem givenTask={item} key={item.id} />
        ))}
    </div>
  );
});

export default TaskItem;
