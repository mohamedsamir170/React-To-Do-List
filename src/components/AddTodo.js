import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    
    setLoading(true);
    try {
      addTodo({
        title,
        completed: false,
        userId: 1, // Using a default userId for this example
      });
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError('Failed to add task');
      setLoading(false);
    }
  };

  return (
    <div className="add-todo">
      <h2>Add New Task</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;