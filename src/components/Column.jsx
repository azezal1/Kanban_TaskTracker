import React from 'react';
import '../styles/Column.css';

function Column({ column }) {
  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <div className="column-content">
        {/* Tasks will go here */}
      </div>
    </div>
  );
}

export default Column;
