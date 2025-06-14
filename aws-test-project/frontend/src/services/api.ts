import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'http://localhost:3000/api';

// build 时改为后端地址
// const API_URL = 'http://18.141.179.222/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  data: any;
  token: string;
  user: User;
}

export const auth = {
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: { username: string; email: string; password: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },
};

export const user = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: { username?: string; email?: string }) =>
    api.patch('/users/me', data),
};

export default api; 