import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useTodoContext } from './Core/Context'


// @ts-ignore
import { TodoForm } from './Todo/TodoForm';
import { TodoList } from './Todo/TodoList';
import { TodoListDone } from './Todo/TodoListDone';


export const App: React.FC = () => {

  const {
    tasks,
    doneTasks
  } = useTodoContext()

  return (
      <div className="container mt-4 content">
      <div className="container mt-4 content">
        <h1>TodoApp</h1>

        <TodoForm />

        <div className="line" />
        <h1>Executing</h1>
        <h3>Items: {tasks.length}</h3>

        <TodoList />
      </div>

      <div className="line" />


      <div className="container mt-4 content">
        <h1>Done</h1>
        <h3>Items: {doneTasks.length}</h3>

        <TodoListDone />
      </div>

    </div>
  );
};
