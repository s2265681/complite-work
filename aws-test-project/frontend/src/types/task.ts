export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
} 