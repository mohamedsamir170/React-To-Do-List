import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import About from './components/About';
import { TodoProvider } from './context/TodoContext';

function App() {
  useEffect(() => {
    document.title = "To-Do List";
  }, []);

  return (
    <TodoProvider>
      <Router>
        <div className="App">
          <nav className="navbar">
            <h1>Todo Manager</h1>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/add">Add Task</Link>
              <Link to="/about">About</Link>
            </div>
          </nav>
         
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;