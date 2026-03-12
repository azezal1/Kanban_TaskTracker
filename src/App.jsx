import React, { useState } from 'react';
import Board from './components/Board';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm onAddTask={handleAddTask} />
      <Board tasks={tasks} />
    </div>
  );
}

export default App;
