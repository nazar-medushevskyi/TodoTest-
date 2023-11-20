import React, { createContext, useContext, useEffect, useState } from 'react';

interface Todo {
  id: string;
  text: string;
  date: string;
  dateHours: string;
}

interface TodoContextProps {
  tasks: Todo[];
  doneTasks: Todo[];
  newTask: string;
  error: string;
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDoneTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: string) => void;
  handleCheckboxChange: (id: string) => void;
  handleUndo: (id: string) => void;
  handleDeleteDone: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

let day, month, year, hours, minutes;

export const TodoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const deftask = JSON.parse(localStorage.getItem('tasks') || '[]') as Todo[];
    const deftaskDone = JSON.parse(localStorage.getItem('doneTasks') || '[]') as Todo[];
    setTasks(deftask);
    setDoneTasks(deftaskDone);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleCheckboxChange = (id: string) => {
    const taskToMove = tasks.find((task) => task.id === id);
    if (taskToMove) {
      const currentDateTime = new Date();
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const currentDate = `${currentDateTime.getDate()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getFullYear()}`;
      const currentDateHours = `${hours}:${minutes}`;
      setDoneTasks([{ ...taskToMove, date: currentDate, dateHours: currentDateHours }, ...doneTasks]);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('doneTasks', JSON.stringify([{ ...taskToMove, date: currentDate, dateHours: currentDateHours }, ...doneTasks]));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };


  const handleUndo = (id: string) => {
    const taskToMove = doneTasks.find((task) => task.id === id);
    if (taskToMove) {
      setTasks([...tasks, taskToMove]);
      const updatedDoneTasks = doneTasks.filter((task) => task.id !== id);
      localStorage.setItem('doneTasks', JSON.stringify(updatedDoneTasks));
      setDoneTasks(updatedDoneTasks);
    }
  };

  const handleDeleteDone = (id: string) => {
    const updatedDoneTasks = doneTasks.filter((task) => task.id !== id);
    setDoneTasks(updatedDoneTasks);
    localStorage.setItem('doneTasks', JSON.stringify(updatedDoneTasks));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedValue = newTask.trim();

    if (!trimmedValue) {
      setError('Input should be filled');
      return;
    }

    if (trimmedValue.length < 3) {
      setError('Todo should contain at least 3 characters');
      return;
    }

    if (!isNaN(+newTask)) {
      setError('Should be in text format (e.g., pick up at 12:34, pay 54, etc..)');
      return;
    }

    const currentDateTime = new Date();
    day = currentDateTime.getDate();
    month = currentDateTime.getMonth() + 1;
    year = currentDateTime.getFullYear();
    hours = currentDateTime.getHours().toString().padStart(2, '0');
    minutes = currentDateTime.getMinutes().toString().padStart(2, '0');

    const currentDate = `${day}-${month}-${year}`;
    const currentDatehours = `${hours}:${minutes}`;

    const updatedTasks = [
      { id: (tasks.length + 1).toString(), text: newTask, date: currentDate, dateHours: currentDatehours },
      ...tasks,
    ];

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask('');
    setError('');
  };

  const contextValue: TodoContextProps = {
    tasks,
    doneTasks,
    newTask,
    error,
    setTasks,
    setDoneTasks,
    setNewTask,
    setError,
    handleDelete,
    handleCheckboxChange,
    handleUndo,
    handleDeleteDone,
    handleSubmit,
  };

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
