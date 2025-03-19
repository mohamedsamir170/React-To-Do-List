import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';

function TodoList() {
  const { todos, loading, error, deleteTodo } = useContext(TodoContext);
  const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleDeleteConfirm = (id) => {
    setConfirmingDelete(id);
  };

  const confirmDelete = (id) => {
    deleteTodo(id);
    setConfirmingDelete(null);
    setNotification({ 
      visible: true, 
      message: 'Task deleted successfully', 
      type: 'success' 
    });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ visible: false, message: '', type: '' });
    }, 3000);
  };

  const cancelDelete = () => {
    setConfirmingDelete(null);
  };

  if (loading) return <div className="loading">Loading your tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="todo-list">
      <h2>Your Tasks</h2>
      
      {/* Notification component */}
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      {todos.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any tasks yet. Add your first task to get started!</p>
          <Link to="/add" className="add-new-btn">
            Add Your First Task
          </Link>
        </div>
      ) : (
        <>
          <div className="task-summary">
            <p>You have {todos.length} task{todos.length !== 1 ? 's' : ''} in total. 
            {todos.filter(todo => todo.completed).length > 0 && 
              ` ${todos.filter(todo => todo.completed).length} completed.`}
            </p>
          </div>
          
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="todo-info">
                  <span className="todo-title">{todo.title}</span>
                  <span className="todo-status">
                    {todo.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="todo-actions">
                  <Link to={`/edit/${todo.id}`} className="edit-btn">
                    Edit
                  </Link>
                  
                  {confirmingDelete === todo.id ? (
                    <div className="delete-confirmation">
                      <span>Are you sure?</span>
                      <button 
                        onClick={() => confirmDelete(todo.id)} 
                        className="confirm-btn"
                      >
                        Yes
                      </button>
                      <button 
                        onClick={cancelDelete} 
                        className="cancel-btn"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleDeleteConfirm(todo.id)} 
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TodoList;