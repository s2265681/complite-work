import { Request, Response } from 'express';
import { TaskModel } from '../models/task';

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const task = await TaskModel.create({
        title,
        description,
        status: 'pending',
        user_id: userId,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const tasks = await TaskModel.findAll(userId);
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const task = await TaskModel.findById(Number(id), userId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Error getting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const task = await TaskModel.update(Number(id), userId, {
        title,
        description,
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const success = await TaskModel.delete(Number(id), userId);
      if (!success) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const task = await TaskModel.toggleStatus(Number(id), userId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Error toggling task status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
}; 