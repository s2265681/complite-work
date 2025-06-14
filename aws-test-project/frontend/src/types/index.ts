export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
} 