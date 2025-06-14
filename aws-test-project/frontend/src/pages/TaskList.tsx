import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/task';
import { taskService } from '../services/task';
import { useAuth } from '../contexts/AuthContext';
import { Modal, Form, Input, Button, message } from 'antd';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
      setError(null);
    } catch {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTaskAntd = async (values: { title: string; description: string }) => {
    try {
      const newTask = await taskService.create(values);
      console.log(newTask,'newTask....')
      setTasks([newTask, ...tasks]);
      setIsModalOpen(false);
      setFormData({ title: '', description: '' });
      message.success('Task created!');
      form.resetFields();
    } catch {
      setError('Failed to create task');
      message.error('Failed to create task');
    }
  };

  const handleUpdateTaskAntd = async (values: { title: string; description: string }) => {
    if (!editingTask) return;
    try {
      const updatedTask = await taskService.update(editingTask.id, values);
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setEditingTask(null);
      setIsModalOpen(false);
      setFormData({ title: '', description: '' });
      message.success('Task updated!');
      form.resetFields();
    } catch {
      setError('Failed to update task');
      message.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const updatedTask = await taskService.toggleStatus(id);
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
    } catch {
      setError('Failed to toggle task status');
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
    });
    setIsModalOpen(true);
    form.setFieldsValue({ title: task.title, description: task.description || '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  console.log(tasks,'tasks>>>')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="space-x-4">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditingTask(null);
              setFormData({ title: '', description: '' });
              form.resetFields();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.status === 'completed' ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-lg font-semibold ${
                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-gray-600 mt-2">{task.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className={`px-3 py-1 rounded ${
                    task.status === 'completed'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {task.status === 'completed' ? 'Restore' : 'Complete'}
                </button>
                <button
                  onClick={() => openEditModal(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        title={editingTask ? 'Edit Task' : 'New Task'}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setFormData({ title: '', description: '' });
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          onFinish={editingTask ? handleUpdateTaskAntd : handleCreateTaskAntd}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  setFormData({ title: '', description: '' });
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTask ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}; 