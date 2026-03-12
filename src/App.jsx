import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import TaskModal from './components/TaskModal';
import Statistics from './components/Statistics';
import FilterBar from './components/FilterBar';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('kanban-theme') || 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ priority: 'all', sortBy: 'created' });
  const [showStats, setShowStats] = useState(false);

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

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'priority':
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'title':
          return a.title.localeCompare(b.title);
        default: // 'created'
          return 0;
      }
    });

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Kanban Task Tracker</h1>
        <div className="header-actions">
          <button onClick={() => setShowStats(!showStats)} className="icon-btn" title="Statistics">
            📊 Stats
          </button>
          <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {showStats && <Statistics tasks={tasks} />}
      
      <TaskForm onAddTask={handleAddTask} />
      
      <FilterBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={setFilters}
      />

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Board 
          tasks={filteredTasks} 
          onEditTask={setEditingTask} 
          onDeleteTask={handleDeleteTask}
        />
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
