# 📋 Kanban Board

A modern, professional Kanban board application built with React and Vite. Features drag-and-drop task management, real-time filtering, statistics dashboard, and a beautiful responsive design.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎯 **Drag & Drop** - Smooth task movement between columns (Todo, In Progress, Done)
- 🔍 **Search & Filter** - Find tasks quickly by title, description, or priority
- 📊 **Statistics Dashboard** - Track your productivity with real-time metrics
- 🎨 **Dark/Light Theme** - Toggle between themes with preference persistence
- 💾 **Auto-save** - All changes automatically saved to localStorage
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🏷️ **Task Properties** - Priority levels, tags, due dates, assignees, and comments
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd kanban-board
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **@dnd-kit** - Drag and drop functionality
- **CSS Variables** - Dynamic theming
- **localStorage** - Data persistence

## 📖 Usage

### Creating Tasks
1. Fill in the task form at the top of the page
2. Add title (required), description, priority, tags, due date, and assignee
3. Click "Add Task" to create

### Managing Tasks
- **Move**: Drag and drop tasks between columns
- **Edit**: Click on any task to open the edit modal
- **Delete**: Click the ✕ button on a task card
- **Comment**: Add comments in the task edit modal

### Filtering & Sorting
- Use the search bar to find specific tasks
- Filter by priority level (All, High, Medium, Low)
- Sort by creation date, priority, due date, or title

### Statistics
- Click the "📊 Stats" button to view your task metrics
- See total tasks, status breakdown, high priority count, overdue tasks, and completion rate

## 🎨 Customization

The app uses CSS variables for theming. You can customize colors in `src/index.css`:

```css
:root {
  --bg-color: #0F172A;
  --text-color: #F8FAFC;
  --card-bg: #1E293B;
  --primary: #3B82F6;
  /* ... more variables */
}
```

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Drag & Drop by [@dnd-kit](https://dndkit.com/)

---

Made with ❤️ for efficient task management
