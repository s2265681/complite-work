## node 大纲

1. NodeJS基础
2. 网络编程
3. 持久化-结构化数据-mysql
4. 持久化-非结构化数据-mongodb-redis
5. Koa实战-基础服务-模版引擎
6. Koa鉴权-cookie-token-jwt
7. Eggjs-mvn分层架构
8. Koa源码解析 + Eggs
9. Koa实战Restful接口
10. 部署Linux-Nginx-Pm2 CI DevOps
 

 **学node的目标**
 - 优秀的前端-可以和后端沟通
 - 敏捷的全栈-快速开发全站应用
 - 架构师-践行工程化思想

 **nodeJs 是什么**
   javaScript runtime build on Chrome,s V8引擎
   特点：
 - 非阻塞io 异步
 - 事件驱动

 高性能 -> 处理器快 存储快

 **并发处理**
 - 多进程 -C Apache
 - 多线程 - java
 - 异步io -js
 - 协程 -lua openresty go

 下一代的node -> deno 底层是go 上层是ts
 https://studygolang.com/articles/13101

 **与前端的不同**
 - JS核心语法不变
 - 前端BOM DOM
 - 后端 fs http buffer  event os

  js  -core -client side -server side

**nodemon**
 每次修改js文件需要重启才能生效，安装nodemon可以监控文件改动，自动重启

 ```
 npm -g nodemon
 ```

**debug**
程序大神爱用console不爱用debugger
影响工作效率

