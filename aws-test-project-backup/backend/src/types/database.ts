export interface UserTable {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaskTable {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: UserTable;
  tasks: TaskTable;
} 