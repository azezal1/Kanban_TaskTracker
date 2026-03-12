import React from 'react';
import Column from './Column';
import '../styles/Board.css';

const COLUMNS = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

function Board({ tasks }) {
  return (
    <div className="board">
      {COLUMNS.map(col => (
        <Column 
          key={col.id} 
          column={col} 
          tasks={tasks.filter(t => t.status === col.id)} 
        />
      ))}
    </div>
  );
}

export default Board;
