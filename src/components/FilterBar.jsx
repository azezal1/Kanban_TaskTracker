import React from 'react';
import '../styles/FilterBar.css';

// FilterBar component provides search and filtering controls
function FilterBar({ searchQuery, onSearchChange, filters, onFilterChange }) {
  return (
    <div className="filter-bar">
      <input 
        type="text" 
        placeholder="🔍 Search tasks by title or description..." 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      
      <div className="filter-controls">
        <select 
          value={filters.priority} 
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        
        <select 
          value={filters.sortBy} 
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="filter-select"
        >
          <option value="created">Sort: Created</option>
          <option value="priority">Sort: Priority</option>
          <option value="dueDate">Sort: Due Date</option>
          <option value="title">Sort: Title</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
