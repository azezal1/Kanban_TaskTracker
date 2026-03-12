import React, { useState, useEffect } from 'react';
import '../styles/TaskModal.css';

function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'Low');
  const [tags, setTags] = useState(task.tags ? task.tags.join(', ') : '');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority || 'Low');
    setTags(task.tags ? task.tags.join(', ') : '');
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ 
      ...task, 
      title: title.trim(), 
      description: description.trim(),
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required autoFocus />
          </div>
          <div className="form-group row-group">
            <div className="flex-1">
              <label>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex-2">
              <label>Tags (comma separated)</label>
              <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
