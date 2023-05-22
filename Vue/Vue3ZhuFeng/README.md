# 从零搭建 Vue3 开发环境

- 手写 Vue3 响应式原理、reactive、efffect、watch、computed、ref 原理
- Vue3 源码源码调试技巧，掌握响应式中数组、map、set 处理
- 手写自定义渲染器原理及 RuntimeDOM 中属性、事件处理
- 手写虚拟 DOM 原理、 手写 Vue3 中 diff 原理及最长递增子序列实现原理
- 手写组件渲染原理、组件挂载流程、异步渲染原理
- 手写 Vue3 中生命周期原理、props、emit、slot、provide、inject 实现原理
- Vue3 中编译优化、patchFlags、blockTree、实现靶向更新
- Vue 中异步组件、函数式组件、Teleport、keep-alive、Transition 实现原理
- 手写 Pinia 及 VueRouter 实现原理
- Vue3 中单元测试详解及服务端渲染

### 1、声明式框架

> Vue3 依旧是声明式框架，用起来简单

### 2、区分编译时和运行时

### 3、 Vue3 设计思想

- 更注重模块拆分、可以独立模块使用、拆分模块
- 通过构建更具 Tree-Shaking 机制实现按需引入、减少打包后体检，同时移除了一些不需要的功能，重写 API
- 允许自定义渲染器、扩展能力强

### 4、 Monorepo 管理项目

> Monorepo 是管理项目代码的一个方式，指在一个项目仓库中管理多个模块/包。Vue3 源码采用 monorepo 方式进行管理，将模块拆分到 package 目录中，作为一个个包来管理，指责更加明确

- 一个仓库可维护多个模块，不用到处找仓库
- 方便版本管理和依赖管理，模块之间引用，调用非常方便

```js
pnpm tsc --init
```

tsconfig.json

```js
{
  "compilerOptions": {
    "outDir": "dist",
    "sourceMap": true,
    "target": "es2016",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": false,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "lib": ["dom", "esnext"]
  }
}
```

```js
pnpm install @vue/shared --filter @vue/reactivity
pnpm install @vue/shared@workspace --filter @vue/reactivity
pnpm install minimist esbuild
```
