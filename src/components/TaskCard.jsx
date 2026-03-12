import React from 'react';
import '../styles/TaskCard.css';

function TaskCard({ task }) {
  if (!task) return null;
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
    </div>
  );
}

export default TaskCard;
