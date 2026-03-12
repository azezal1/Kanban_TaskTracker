import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import '../styles/Column.css';

function Column({ column, tasks, onEditTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className={`column ${isOver ? 'column-over' : ''}`}>
      <h2 className="column-title">{column.title}</h2>
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
        ))}
      </div>
    </div>
  );
}

export default Column;
