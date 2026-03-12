import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/TaskCard.css';

function TaskCard({ task, onEditTask }) {
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
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
    </div>
  );
}

export default TaskCard;
