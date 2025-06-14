import api from './api';
import type { Task, CreateTaskData, UpdateTaskData } from '../types/task';

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },

  async getById(id: number): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async create(data: CreateTaskData): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async update(id: number, data: UpdateTaskData): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async toggleStatus(id: number): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },
}; 