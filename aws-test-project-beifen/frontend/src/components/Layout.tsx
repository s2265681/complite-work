import React from 'react';
import { Layout as AntLayout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          任务管理系统
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>欢迎，{user?.username}</span>
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={logout}
          >
            退出
          </Button>
        </div>
      </Header>
      <Content>
        {children}
      </Content>
    </AntLayout>
  );
}; 