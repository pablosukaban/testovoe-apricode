import taskState from '../store/TaskState.ts';
import { observer } from 'mobx-react-lite';

const TaskView = observer(() => {
  return (
    <div className={'view-container'}>
      <h2>Task View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>{taskState.chosenTask && <span>{taskState.chosenTask.id}</span>}</p>
    </div>
  );
});

export default TaskView;
