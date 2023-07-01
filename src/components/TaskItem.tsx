import taskState, { Task } from '../store/TaskState.ts';
import { ChevronRight, ChevronDown, Check, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TaskMenu } from './TaskMenu.tsx';

type EditFieldProps = {
  givenTask: Task;
  closeEdit: () => void;
};

const EditField = ({ givenTask, closeEdit }: EditFieldProps) => {
  const [editValue, setEditValue] = useState(givenTask.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEditInputFocus = () => {
    if (editInputRef.current) {
      editInputRef.current.select();
    }
  };

  const cancelEditing = (e: React.FormEvent) => {
    e.preventDefault();

    closeEdit();

    taskState.editTitle(givenTask.id, givenTask.title);
  };

  const submitEditing = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editValue) {
      alert('Введите название задачи');
      return;
    }

    closeEdit();

    taskState.editTitle(givenTask.id, editValue);
    localStorage.setItem('tasks', JSON.stringify(taskState.tasksList));
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, []);

  return (
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
  );
};

type TaskItemProps = {
  givenTask: Task;
};

type TaskCheckboxProps = {
  completed: boolean;
  handleCheckboxChange: (e: React.MouseEvent) => void;
};

const TaskCheckbox = observer(
  ({ completed, handleCheckboxChange }: TaskCheckboxProps) => {
    const r = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (r.current) {
        r.current.checked = completed;
      }
    }, [completed]);

    return (
      <input
        type={'checkbox'}
        ref={r}
        className={'task-checkbox'}
        defaultChecked={completed}
        onClick={(e) => handleCheckboxChange(e)}
      />
    );
  },
);

const TaskItem = observer(({ givenTask }: TaskItemProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const [isEditing, setIsEditing] = useState(
    givenTask.isEditing ? givenTask.isEditing : false,
  );

  const editInputRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    setIsMenuOpened(false);
  };

  const startEditing = () => {
    closeMenu();
    setIsEditing(true);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    taskState.chooseTask(givenTask.id);
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();

    taskState.completeTask(givenTask.id);
    localStorage.setItem('tasks', JSON.stringify(taskState.tasksList));
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsMenuOpened(!isMenuOpened);

    // taskState.chooseTask(givenTask.id);
  };

  const handleDeleteItem = () => {
    taskState.deleteTask(givenTask.id);
    localStorage.setItem('tasks', JSON.stringify(taskState.tasksList));
  };

  const handleAddSubtask = () => {
    taskState.addSubTask(givenTask.id);
    localStorage.setItem('tasks', JSON.stringify(taskState.tasksList));
  };

  const handleArrowClick = () => {
    taskState.activateTask(givenTask.id);
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditing]);

  return (
    <div
      className={`task-item-container ${givenTask.isActive && 'active'}`}
      onClick={(e) => handleItemClick(e)}
    >
      <div className={'task-item-main'}>
        {isEditing ? (
          <EditField
            givenTask={givenTask}
            closeEdit={() => setIsEditing(false)}
          />
        ) : (
          <>
            <label
              className={`task-item-text ${givenTask.completed && 'completed'}`}
            >
              <span onClick={handleArrowClick} className="task-item-chevron">
                {givenTask.isActive ? <ChevronDown /> : <ChevronRight />}
              </span>
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
                handleDeleteTask={handleDeleteItem}
              />
              <TaskCheckbox
                completed={givenTask.completed}
                handleCheckboxChange={handleCheckboxChange}
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
