import { db } from '../config/database';
import * as createUsersTable from './migrations/20240320000000_create_users_table';
// 添加创建tasks表的迁移
import * as createTasksTable from './migrations/20240320000001_create_tasks_table';

async function migrate() {
  try {
    console.log('Running migrations...');
    
    // Run migrations
    await createUsersTable.up(db);
    console.log('Users table migration completed');
    
    await createTasksTable.up(db);
    console.log('Tasks table migration completed');
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

migrate(); 