# 📋 Kanban Board - Features Guide

## Overview
A modern, professional Kanban board built with React, Vite, and @dnd-kit for drag-and-drop functionality. Clean interface designed for efficient task management.

## 🎯 Core Features

### 1. **Drag & Drop Task Management**
- Drag tasks between three columns: Todo, In Progress, and Done
- Smooth animations and visual feedback during dragging
- Touch-friendly for mobile devices

### 2. **Task Properties**
Each task can have:
- **Title** (required) - Main task description
- **Description** - Detailed information about the task
- **Priority** - Low, Medium, or High (with color-coded badges)
- **Tags** - Multiple tags for categorization (comma-separated)
- **Due Date** - Set deadlines with visual indicators
- **Assignee** - Person responsible for the task
- **Comments** - Add notes and updates to tasks

### 3. **Search & Filter**
- **Search Bar** - Find tasks by title or description
- **Priority Filter** - Show only High, Medium, or Low priority tasks
- **Sort Options**:
  - By creation date (default)
  - By priority (High → Medium → Low)
  - By due date (earliest first)
  - By title (alphabetical)

### 4. **Statistics Dashboard** 📊
Toggle the stats panel to see:
- Total active tasks
- Tasks by status (Todo, In Progress, Done)
- High priority task count
- Overdue tasks count
- Completion rate percentage

### 5. **Data Persistence**
- **Auto-save** - All changes saved automatically to localStorage
- **Persistent Storage** - Data survives browser refreshes

### 6. **Theme Support** 🌓
- **Dark Mode** (default) - Easy on the eyes
- **Light Mode** - For bright environments
- Theme preference saved automatically

### 7. **Visual Indicators**
- **Overdue Tasks** - Red border and highlighted due date
- **Priority Badges** - Color-coded (High=Red, Medium=Yellow)
- **Due Date Display** - Shows "Today", "Tomorrow", or formatted date
- **Comment Counter** - Shows number of comments on each task
- **Assignee Display** - Shows who's working on the task
- **Task Count** - Each column shows number of tasks

## 🎨 User Interface

### Header Actions
- 📊 **Stats** - Toggle statistics dashboard
- 🌙/☀️ **Theme** - Toggle dark/light mode

### Task Card Layout
```
┌─────────────────────────────────┐
│ Title              [Priority]  ✕│
│ 👤 Assignee                      │
│ [Tag1] [Tag2]                    │
│ Description text...              │
│ ─────────────────────────────    │
│ 📅 Due Date                      │
│ 💬 2 comments                    │
└─────────────────────────────────┘
```

### Task Modal (Edit View)
Click any task to open detailed edit modal with:
- All task properties editable
- Comments section with timestamps
- Add/delete comments
- Save or cancel changes

## 🚀 How to Use

### Creating a Task
1. Fill in the task form at the top
2. Title is required, other fields are optional
3. Click "➕ Add Task" button
4. Task appears in the "Todo" column

### Moving Tasks
1. Click and drag a task card
2. Drop it in any column (Todo, In Progress, Done)
3. Task status updates automatically

### Editing Tasks
1. Click on any task card
2. Modal opens with all task details
3. Edit any field
4. Add comments if needed
5. Click "Save Changes"

### Deleting Tasks
1. Click the ✕ button on any task card
2. Task is permanently removed

### Filtering & Sorting
1. Use search bar to find specific tasks
2. Select priority filter to narrow results
3. Choose sort option to reorder tasks
4. Filters work in real-time

## 💡 Tips & Best Practices

1. **Use Tags** - Organize tasks by project, category, or team
2. **Set Due Dates** - Keep track of deadlines and priorities
3. **Add Comments** - Document progress and decisions
4. **Use Priority Wisely** - Not everything can be high priority
5. **Assign Tasks** - Track who's responsible for what
6. **Check Statistics** - Monitor your productivity and progress

## 🔧 Technical Details

### Data Structure
```javascript
{
  id: "uuid",
  title: "Task title",
  description: "Details",
  priority: "High|Medium|Low",
  tags: ["tag1", "tag2"],
  dueDate: "2024-12-31",
  assignee: "John Doe",
  status: "todo|in-progress|done",
  comments: [
    {
      id: "uuid",
      text: "Comment text",
      timestamp: "ISO date"
    }
  ],
  createdAt: "ISO date"
}
```

### Storage
- Active tasks: `localStorage.kanban-tasks`
- Theme preference: `localStorage.kanban-theme`

### Technologies
- **React 19** - UI framework
- **Vite** - Build tool
- **@dnd-kit** - Drag and drop
- **CSS Variables** - Theming
- **localStorage** - Data persistence

## 📱 Mobile Support
- Responsive design works on all screen sizes
- Touch-friendly drag and drop
- Optimized layouts for mobile devices
- All features available on mobile

---

**Enjoy managing your tasks! 🚀**
