# 微风不噪 - React重构版

这是原HTML项目的React重构版本，使用现代化的技术栈重新实现。

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Jotai** - 状态管理
- **React Hooks** - 组件逻辑

## 功能特性

### 🎨 现代化UI设计
- 响应式设计，支持移动端和桌面端
- 暗色/亮色主题切换
- 流畅的动画效果
- 现代化的组件设计

### 🎠 3D轮播展示
- 基于CSS 3D变换的轮播效果
- 支持点击切换和自动播放
- 平滑的过渡动画
- 指示器显示当前位置

### 💬 弹幕系统
- 实时弹幕发送和显示
- 随机颜色和位置
- 自动清理过期弹幕
- 支持自定义弹幕内容

### 🌍 国际化支持
- 中英文切换
- 动态语言切换
- 完整的翻译系统

### 🎯 状态管理
- 使用Jotai进行状态管理
- 用户状态、主题状态、语言状态
- 弹幕状态、轮播状态
- 响应式状态更新

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── Header.tsx      # 头部组件
│   ├── WelcomeBanner.tsx # 欢迎横幅
│   ├── Carousel3D.tsx  # 3D轮播组件
│   └── Danmaku.tsx     # 弹幕组件
├── stores/             # 状态管理
│   └── index.ts        # Jotai状态定义
├── i18n/               # 国际化
│   └── index.ts        # 翻译配置
├── App.tsx             # 主应用组件
└── index.css           # 全局样式
```

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 主要改进

1. **现代化架构**: 从原生HTML/JS迁移到React + TypeScript
2. **状态管理**: 使用Jotai替代Vue的响应式系统
3. **样式系统**: 使用Tailwind CSS替代传统CSS
4. **构建工具**: 使用Vite提供更快的开发体验
5. **类型安全**: 完整的TypeScript支持
6. **组件化**: 更好的代码组织和复用性
7. **响应式设计**: 更好的移动端适配
8. **主题系统**: 完整的暗色模式支持

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可证

MIT License
