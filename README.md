# React TodoList App

A modern, responsive task management application built with React that helps users organize and track their daily tasks with ease.


## Features

- **Task Management**: Create, edit, and delete tasks effortlessly
- **Task Status**: Mark tasks as completed or pending
- **Task Statistics**: View a summary of total and completed tasks
- **Responsive Design**: Fully functional across desktop and mobile devices
- **Smooth Animations**: Enhanced user experience with subtle animations
- **User-Friendly Confirmations**: In-app notifications and confirmation dialogs

## Tech Stack

- React (with Hooks and Context API)
- React Router for navigation
- CSS with custom variables and responsive design
- Modern JavaScript (ES6+)

## Project Structure

```
todo-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── AddTodo.jsx
│   │   ├── EditTodo.jsx
│   │   ├── Navbar.jsx
│   │   └── About.jsx
│   ├── context/
│   │   └── TodoContext.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-todo-app.git
   ```

2. Navigate to the project directory:
   ```
   cd react-todo-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Usage

### Adding a Task
1. Navigate to the "Add Task" page
2. Fill in the task details
3. Click "Save Task"

### Editing a Task
1. Find the task in your task list
2. Click the "Edit" button
3. Modify the task details
4. Click "Update Task"

### Deleting a Task
1. Find the task in your task list
2. Click the "Delete" button
3. Confirm deletion in the prompt that appears
