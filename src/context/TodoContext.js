import React, { createContext, useState, useEffect } from 'react';
import * as todoApi from '../api/todoApi';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const data = await todoApi.fetchTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  // Add a todo
  const addTodo = async (todo) => {
    try {
      // Since JSONPlaceholder doesn't actually save our post,
      // we'll simulate a successful API call and manage state locally
      const response = await todoApi.addTodo(todo);
      
      // In a real app, you'd use the response from the API
      // For demo purposes, we'll create a new todo with a unique ID
      const newTodo = {
        ...response,
        id: Math.floor(Math.random() * 10000) + 1 // Generate unique ID
      };
      
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (error) {
      setError('Failed to add task');
      throw error;
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      // Update local state after API call
      setTodos(todos.filter(todo => todo.id !== id));
      return true;
    } catch (error) {
      setError('Failed to delete task');
      throw error;
    }
  };

  // Get a todo by ID
  const getTodoById = (id) => {
    return todos.find(todo => todo.id === parseInt(id));
  };

  // Update a todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      await todoApi.updateTodo(id, updatedTodo);
      // Update local state after API call
      setTodos(
        todos.map(todo => 
          todo.id === parseInt(id) ? { ...todo, ...updatedTodo } : todo
        )
      );
      return updatedTodo;
    } catch (error) {
      setError('Failed to update task');
      throw error;
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      addTodo,
      deleteTodo,
      getTodoById,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};