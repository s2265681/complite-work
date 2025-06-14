import { db } from '../config/database';
import { sql } from 'kysely';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'completed';
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export const TaskModel = {
  async create(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const now = new Date();
    const result = await db
      .insertInto('tasks')
      .values({
        id: sql`DEFAULT`,
        ...data,
        created_at: now,
        updated_at: now,
      })
      .executeTakeFirst();

    const insertId = (result as any)?.insertId;
    if (!insertId) throw new Error('Failed to get insertId');

    return await db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', insertId)
      .executeTakeFirstOrThrow();
  },

  async findAll(userId: number): Promise<Task[]> {
    return await db
      .selectFrom('tasks')
      .where('user_id', '=', userId)
      .orderBy('created_at', 'desc')
      .selectAll()
      .execute();
  },

  async findById(id: number, userId: number): Promise<Task | undefined> {
    return await db
      .selectFrom('tasks')
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .selectAll()
      .executeTakeFirst();
  },

  async update(id: number, userId: number, data: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Task | undefined> {
    const now = new Date();
    const result = await db
      .updateTable('tasks')
      .set({
        ...data,
        updated_at: now,
      })
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    if (Number(result.numUpdatedRows) === 0) return undefined;

    return await db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .executeTakeFirst();
  },

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await db
      .deleteFrom('tasks')
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .executeTakeFirst();
    
    return result.numDeletedRows > 0;
  },

  async toggleStatus(id: number, userId: number): Promise<Task | undefined> {
    const task = await this.findById(id, userId);
    if (!task) return undefined;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    return await this.update(id, userId, { status: newStatus });
  },
}; 