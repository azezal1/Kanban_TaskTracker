import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/TaskCard.css';

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
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={`task-card ${isDragging ? 'dragging' : ''}`}
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
    </div>
  );
}

export default TaskCard;
