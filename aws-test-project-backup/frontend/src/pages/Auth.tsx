import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { auth } from '../services/api';
import { AxiosError } from 'axios';

const { Title, Text } = Typography;

interface ErrorResponse {
  message: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const response = isLogin
        ? await auth.login({ email: values.email, password: values.password })
        : await auth.register(values);
      localStorage.setItem('token', response.token);
      message.success(isLogin ? '登录成功' : '注册成功');
      navigate('/tasks');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || '操作失败，请重试';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            {isLogin ? '登录账户' : '创建账户'}
          </Title>
          <Text type="secondary">
            {isLogin ? '还没有账户？' : '已有账户？'}
            <Button type="link" onClick={toggleMode} className="!px-1">
              {isLogin ? '立即注册' : '立即登录'}
            </Button>
          </Text>
        </div>

        <Form
          form={form}
          name="auth"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          {!isLogin && (
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, message: '用户名至少3个字符' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="请输入邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {isLogin ? '登录' : '注册'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Auth; 