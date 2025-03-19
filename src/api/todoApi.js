import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchTodos = async () => {
  try {
    const response = await api.get('?_limit=10');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const fetchTodoById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await api.post('', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await api.put(`/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};