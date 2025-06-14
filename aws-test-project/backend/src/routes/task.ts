import { Router } from 'express';
import { protect } from '../middleware/auth';
import { TaskController } from '../controllers/task';

const router = Router();

// 所有任务路由都需要认证
router.use(protect);

// 获取所有任务
router.get('/', TaskController.getAll);

// 获取单个任务
router.get('/:id', TaskController.getById);

// 创建任务
router.post('/', TaskController.create);

// 更新任务
router.put('/:id', TaskController.update);

// 删除任务
router.delete('/:id', TaskController.delete);

// 切换任务状态（完成/恢复）
router.patch('/:id/toggle', TaskController.toggleStatus);

export default router; 