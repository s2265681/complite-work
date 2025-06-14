import express from 'express';
import { register, login, getProfile } from '../controllers/auth';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router; 