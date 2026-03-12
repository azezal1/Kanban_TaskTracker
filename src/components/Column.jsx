import React from 'react';
import TaskCard from './TaskCard';
import '../styles/Column.css';

function Column({ column, tasks }) {
  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
