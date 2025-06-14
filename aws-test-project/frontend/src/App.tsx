import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { TaskList } from './components/TaskList';
import { Layout } from './components/Layout';
import { Modal, Form, Input, message, Button } from 'antd';
import type { Task } from './types';
import { taskApi } from './api';
import './App.css'

// 受保护的路由组件
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const TaskPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsModalVisible(true);
  };

  const handleSubmit = async (values: { title: string; description: string }) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, values);
        message.success('任务已更新');
      } else {
        await taskApi.createTask({
          ...values,
          status: 'pending'
        });
        message.success('任务已创建');
      }
      setIsModalVisible(false);
      setRefreshKey(prev => prev + 1);
    } catch {
      message.error(editingTask ? '更新任务失败' : '创建任务失败');
    }
  };

  return (
    <Layout>
      <TaskList
        onEdit={handleEdit}
        onRefresh={() => setRefreshKey(prev => prev + 1)}
        onAdd={handleAdd}
        key={refreshKey}
      />
      <Modal
        title={editingTask ? '编辑任务' : '新增任务'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingTask(null);
                  form.resetFields();
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTask ? '更新' : '创建'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
