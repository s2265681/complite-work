import { db } from '../config/database';
import bcrypt from 'bcryptjs';
import { sql } from 'kysely';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel {
  static async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    
    // 先插入数据
    await db
      .insertInto('users')
      .values({
        id: sql`DEFAULT`,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .execute();

    // 然后查询刚插入的用户
    const inserted = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', user.email)
      .executeTakeFirstOrThrow();

    return inserted;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
    return user || null;
  }

  static async findById(id: number): Promise<User | null> {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    return user || null;
  }

  static async update(id: number, user: Partial<User>): Promise<boolean> {
    const result = await db
      .updateTable('users')
      .set({
        ...user,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .executeTakeFirst();
    return (result?.numUpdatedRows ?? 0) > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db
      .deleteFrom('users')
      .where('id', '=', id)
      .executeTakeFirst();
    return (result?.numDeletedRows ?? 0) > 0;
  }
} 