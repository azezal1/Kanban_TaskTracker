import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      status: 'todo'
    });
    
    setTitle('');
    setDescription('');
    setPriority('Low');
    setTags('');
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
          placeholder="Tags (comma separated)" 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="task-input flex-1"
        />
      </div>
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
