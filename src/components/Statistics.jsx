import React from 'react';
import '../styles/Statistics.css';

// Statistics component shows task metrics and insights
function Statistics({ tasks }) {
  // Count tasks by status
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  
  // Count tasks by priority
  const highPriority = tasks.filter(t => t.priority === 'High').length;
  
  // Calculate overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueCount = tasks.filter(t => t.dueDate && new Date(t.dueDate) < today && t.status !== 'done').length;
  
  // Calculate completion rate
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-value">{tasks.length}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">To Do</div>
        <div className="stat-value stat-todo">{todoCount}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">In Progress</div>
        <div className="stat-value stat-progress">{inProgressCount}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Done</div>
        <div className="stat-value stat-done">{doneCount}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">High Priority</div>
        <div className="stat-value stat-high">{highPriority}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Overdue</div>
        <div className="stat-value stat-overdue">{overdueCount}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Completion</div>
        <div className="stat-value">{completionRate}%</div>
      </div>
    </div>
  );
}

export default Statistics;
