import TaskTree from './components/TaskTree.tsx';
import TaskView from './components/TaskView.tsx';

const App = () => {
  return (
    <div className={'wrapper'}>
      <TaskTree />
      <TaskView />
    </div>
  );
};

export default App;
