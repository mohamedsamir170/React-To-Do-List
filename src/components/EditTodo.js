import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, updateTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState({
    title: '',
    completed: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const todoData = getTodoById(id);
      if (todoData) {
        setTodo(todoData);
      } else {
        setError('Task not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch task details');
      setLoading(false);
    }
  }, [id, getTodoById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    
    setSaving(true);
    try {
      updateTodo(id, todo);
      setSaving(false);
      navigate('/');
    } catch (err) {
      setError('Failed to update task');
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading task details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-todo">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group checkbox">
          <label htmlFor="completed">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={todo.completed}
              onChange={handleChange}
            />
            Mark as completed
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;