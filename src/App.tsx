import TaskTree from './components/TaskTree.tsx';
import TaskView from './components/TaskView.tsx';
import { useEffect } from 'react';
import taskState, { tempData } from './store/TaskState.ts';

const App = () => {
  useEffect(() => {
    const list = localStorage.getItem('tasks');

    if (list) {
      taskState.setTaskList(JSON.parse(list));
    } else {
      taskState.setTaskList(tempData);
    }
  }, []);

  return (
    <>
      <div className={'wrapper'}>
        <div className={'container'}>
          <TaskTree />
          <TaskView />
        </div>
        <footer className={'footer'}>
          <span>Тестовое задание. Код доступен на</span>
          <a
            href={'https://github.com/pablosukaban/testovoe-apricode'}
            target={'_blank'}
          >
            GitHub
          </a>
          <span>.</span>
        </footer>
      </div>
    </>
  );
};

export default App;
