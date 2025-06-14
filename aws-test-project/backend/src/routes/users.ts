import express from 'express';
import { protect } from '../middleware/auth';
import { UserModel } from '../models/user';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// 获取当前用户信息
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user?.id as number);
    if (!user) {
      return next(new AppError('用户不存在', 404));
    }

    const { password, ...userWithoutPassword } = user;
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
});

// 更新用户信息
router.patch('/me', protect, async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const updated = await UserModel.update(req.user?.id as number, {
      username,
      email
    });

    if (!updated) {
      return next(new AppError('更新失败', 400));
    }

    const user = await UserModel.findById(req.user?.id as number);
    const { password, ...userWithoutPassword } = user as any;

    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 