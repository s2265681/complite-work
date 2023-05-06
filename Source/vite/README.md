# 手写 vite 原理

vite 比 webpack 更快 ， 因为利用了 ESModule 浏览器支持的 module 方式 驱动， 省去了编译成 bundle

#

> 静态服务 支持 ESModule
> 支持 第三方 库 无法去 node_modules 中去找 欺骗浏览器不要报错，设置一个别名 vue => /@modules/vue 合法路径
> 支持 SFC 组件，单文件组件
> 支持 css 把 css 转化为 js， 利用 js 添加一个 style 标签
