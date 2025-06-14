import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Tooltip, message, Card } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { Task } from '../types';
import { taskApi } from '../api';
import { useAuth } from '../contexts/AuthContext';

interface TaskListProps {
  onEdit: (task: Task) => void;
  onRefresh: () => void;
  onAdd: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEdit, onRefresh, onAdd }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await taskApi.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('获取任务列表失败:', error);
      message.error('获取任务列表失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleToggleStatus = async (task: Task) => {
    try {
      await taskApi.toggleTaskStatus(task.id);
      setTasks(tasks.map(t => t.id === task.id ? {
        ...t,
        status: t.status === 'completed' ? 'pending' : 'completed'
      } : t));
      message.success('任务状态已更新');
    } catch (error) {
      console.error('更新任务状态失败:', error);
      message.error('更新任务状态失败，请稍后重试');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      message.success('任务已删除');
      setTasks(tasks.filter(t => t.id !== id));
      onRefresh();
    } catch (error) {
      console.error('删除任务失败:', error);
      message.error('删除任务失败，请稍后重试');
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
      render: (text: string, record: Task) => (
        <span style={{ 
          textDecoration: record.status === 'completed' ? 'line-through' : 'none',
          color: record.status === 'completed' ? '#999' : 'inherit'
        }}>
          {text}
        </span>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '35%',
      render: (text: string, record: Task) => (
        <span style={{ 
          textDecoration: record.status === 'completed' ? 'line-through' : 'none',
          color: record.status === 'completed' ? '#999' : 'inherit'
        }}>
          {text || '-'}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'success' : 'processing'}>
          {status === 'completed' ? '已完成' : '进行中'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_: unknown, record: Task) => (
        <Space size="middle">
          <Tooltip title={record.status === 'completed' ? '标记为未完成' : '标记为已完成'}>
            <Button
              type="text"
              icon={record.status === 'completed' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
              onClick={() => handleToggleStatus(record)}
              style={{ color: record.status === 'completed' ? '#52c41a' : '#1890ff' }}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="任务列表" 
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          新增任务
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true,
        }}
        rowClassName={(record) => record.status === 'completed' ? 'completed-task' : ''}
      />
    </Card>
  );
}; 