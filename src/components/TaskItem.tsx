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

  const [isEditing, setIsEditing] = useState(
    givenTask.isEditing ? givenTask.isEditing : false,
  );

  const [editValue, setEditValue] = useState(givenTask.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  const startEditing = () => {
    closeMenu();
    setIsEditing(true);
  };

  const cancelEditing = (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditing(false);
    taskState.editTitle(givenTask.id, givenTask.title);
  };

  const submitEditing = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editValue) {
      alert('Введите название задачи');
      return;
    }

    setIsEditing(false);

    taskState.editTitle(givenTask.id, editValue);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    taskState.chooseTask(givenTask.id);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    taskState.completeTask(givenTask.id);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsMenuOpened(!isMenuOpened);

    taskState.chooseTask(givenTask.id);
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditing]);

  const handleEditInputFocus = () => {
    if (editInputRef.current) {
      editInputRef.current.select();
    }
  };

  const handleAddSubtask = () => {
    taskState.addSubTask(givenTask.id);
  };

  return (
    <div
      className={`task-item-container ${givenTask.isActive && 'active'}`}
      onClick={(e) => handleItemClick(e)}
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
              <button onClick={cancelEditing}>
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
                handleAddSubtask={handleAddSubtask}
              />
              <input
                type={'checkbox'}
                className={'task-checkbox'}
                checked={givenTask.completed}
                onChange={(e) => handleCheckboxChange(e)}
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
