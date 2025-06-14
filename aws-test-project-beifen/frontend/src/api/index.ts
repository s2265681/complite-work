import axios from 'axios';
import type { Task, ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，自动添加 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskApi = {
  getTasks: () => api.get<Task[]>('/tasks'),
  createTask: (data: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) =>
    api.post<ApiResponse<Task>>('/tasks', data),
  updateTask: (id: number, data: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) =>
    api.put<ApiResponse<Task>>(`/tasks/${id}`, data),
  deleteTask: (id: number) => api.delete<ApiResponse<void>>(`/tasks/${id}`),
  toggleTaskStatus: (id: number) => api.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`),
};

export { api }; 