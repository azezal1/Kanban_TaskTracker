import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import TaskModal from './components/TaskModal';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('kanban-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kanban-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

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
    setEditingTask(null);
  };

  return (
    <div className="app">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Kanban Board</h1>
        <button 
          onClick={toggleTheme} 
          style={{
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            border: '1px solid var(--task-bg)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
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
