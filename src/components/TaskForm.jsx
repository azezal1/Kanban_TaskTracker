import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'todo'
    });
    
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
        required
      />
      <input 
        type="text" 
        placeholder="Description (optional)" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
