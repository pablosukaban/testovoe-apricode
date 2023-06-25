import TaskTree from './components/TaskTree.tsx';
import TaskView from './components/TaskView.tsx';

const App = () => {
  return (
    <>
      <div className={'wrapper'}>
        <div className={'container'}>
          <TaskTree />
          <TaskView />
        </div>
        <footer className={'footer'}>
          Тестовое задание. Код доступен на{' '}
          <a
            href={'https://github.com/pablosukaban/testovoe-apricode'}
            target={'_blank'}
          >
            GitHub
          </a>
          .
        </footer>
      </div>
    </>
  );
};

export default App;
