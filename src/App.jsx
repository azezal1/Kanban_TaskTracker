import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Board from './components/Board';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm onAddTask={handleAddTask} />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Board tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
