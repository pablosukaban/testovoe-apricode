import { observer } from 'mobx-react-lite';
import taskState from '../store/TaskState.ts';

const TaskView = observer(() => {
  return (
    <div className={'view-container'}>
      {taskState.chosenTask ? (
        <>
          <h2>{taskState.chosenTask.title}</h2>
          <p>{taskState.chosenTask.description}</p>
        </>
      ) : (
        <h1>Выберите задачу</h1>
      )}
    </div>
  );
});

export default TaskView;
