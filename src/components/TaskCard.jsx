import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/TaskCard.css';

// Helper function to check if a task is overdue
const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'done') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
};

// Helper function to format due date display
const formatDueDate = (dueDate) => {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function TaskCard({ task, onEditTask, onDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  } : undefined;

  if (!task) return null;
  
  const overdue = isOverdue(task.dueDate, task.status);
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={`task-card ${isDragging ? 'dragging' : ''} ${overdue ? 'overdue' : ''}`}
      onClick={() => onEditTask(task)}
    >
      <div className="task-header">
        <div className="task-header-left">
          <h3 className="task-title">{task.title}</h3>
          {(task.priority && task.priority !== 'Low') && (
            <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          )}
        </div>
        <div className="task-actions">
          <button 
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task.id);
            }}
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
      
      {task.assignee && (
        <div className="task-assignee">
          👤 {task.assignee}
        </div>
      )}
      
      {task.tags && task.tags.length > 0 && (
        <div className="tags-container">
          {task.tags.map((tag, i) => (
            <span key={i} className="tag-badge">{tag}</span>
          ))}
        </div>
      )}
      
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
      
      {task.dueDate && (
        <div className={`task-due-date ${overdue ? 'due-overdue' : ''}`}>
          📅 {formatDueDate(task.dueDate)}
        </div>
      )}
      
      {task.comments && task.comments.length > 0 && (
        <div className="task-comments-indicator">
          💬 {task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default TaskCard;
