import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import TaskModal from './components/TaskModal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setEditingTask(null); // just in case deleting while editing wrapper is open (not likely due to bubbling stop)
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm onAddTask={handleAddTask} />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Board tasks={tasks} onEditTask={setEditingTask} onDeleteTask={handleDeleteTask} />
      </DndContext>
      {editingTask && (
        <TaskModal 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
          onSave={handleUpdateTask} 
        />
      )}
    </div>
  );
}

export default App;
