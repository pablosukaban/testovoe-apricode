import { observer } from 'mobx-react-lite';
import taskState from '../store/TaskState.ts';
import { useEffect, useRef, useState } from 'react';

type ViewTaskProps = {
  startEditing: () => void;
};

const ViewTask = observer(({ startEditing }: ViewTaskProps) => {
  return (
    <>
      <div className={'view-header'}>
        {taskState.chosenTask ? (
          <>
            <h2>{taskState.chosenTask.title}</h2>
            <div className={'buttons'}>
              <button onClick={startEditing}>Редактировать</button>
              <button>Удалить</button>
            </div>
          </>
        ) : (
          <h1>Выберите задачу</h1>
        )}
      </div>
      <div className={'view-body'}>
        {taskState.chosenTask && <p>{taskState.chosenTask.description}</p>}
      </div>
    </>
  );
});

type ViewEditProps = {
  cancelEditing: () => void;
};

const ViewEdit = observer(({ cancelEditing }: ViewEditProps) => {
  const [editValue, setEditValue] = useState(() => ({
    title: taskState.chosenTask ? taskState.chosenTask.title : '',
    description: taskState.chosenTask ? taskState.chosenTask.description : '',
  }));

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!editValue.title || !editValue.description) {
      alert('Заполните все поля');
      return;
    }

    taskState.editFullInfo(editValue);
    cancelEditing();
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <>
      <div className={'view-header'}>
        <input
          ref={titleRef}
          value={editValue.title}
          onChange={(e) =>
            setEditValue({ ...editValue, title: e.target.value })
          }
        />
        <div className={'buttons'}>
          <button onClick={handleSubmit}>Сохранить</button>
          <button onClick={cancelEditing}>Отменить</button>
        </div>
      </div>
      <div className={'view-body'}>
        <textarea
          value={editValue.description}
          onChange={(e) =>
            setEditValue({ ...editValue, description: e.target.value })
          }
        />
      </div>
    </>
  );
});

const TaskView = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className={'view-container'}>
      {isEditing ? (
        <ViewEdit cancelEditing={handleCancelEditing} />
      ) : (
        <ViewTask startEditing={handleStartEditing} />
      )}
    </div>
  );
});

export default TaskView;
