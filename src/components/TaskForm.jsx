import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      assignee: assignee.trim() || null,
      comments: [],
      status: 'todo',
      createdAt: new Date().toISOString()
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Low');
    setDueDate('');
    setAssignee('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-inputs-row">
        <input 
          type="text" 
          placeholder="Task Title *" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input flex-2"
          required
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="task-input flex-1"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-inputs-row">
        <input 
          type="text" 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-input flex-2"
        />
        <input 
          type="text" 
          placeholder="Assignee" 
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="task-input flex-1"
        />
      </div>
      <div className="form-inputs-row">
        <input 
          type="date" 
          placeholder="Due Date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-input flex-1"
        />
        <button type="submit" className="add-task-btn flex-1">➕ Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;
