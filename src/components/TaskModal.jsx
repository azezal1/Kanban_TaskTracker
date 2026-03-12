import React, { useState, useEffect } from 'react';
import '../styles/TaskModal.css';

function TaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'Low');
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority || 'Low');
    setDueDate(task.dueDate || '');
    setAssignee(task.assignee || '');
    setComments(task.comments || []);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ 
      ...task, 
      title: title.trim(), 
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      assignee: assignee.trim() || null,
      comments
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: crypto.randomUUID(),
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>✏️ Edit Task</h2>
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
            <div className="flex-1">
              <label>Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Assignee</label>
            <input type="text" value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Who's working on this?" />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" />
          </div>

          <div className="form-group">
            <label>💬 Comments ({comments.length})</label>
            <div className="comments-section">
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-footer">
                    <span className="comment-time">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                    <button 
                      type="button" 
                      className="comment-delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <div className="comment-input-group">
                <input 
                  type="text" 
                  value={newComment} 
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddComment())}
                />
                <button type="button" onClick={handleAddComment} className="btn-add-comment">
                  💬 Add
                </button>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
