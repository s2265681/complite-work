## 非结构化数据-mongodb-redis

1. 目标
   - 掌握mongodb基本使用
   - 理解文档型数据库设计理念
   - 掌握原生模块node-mongodb-native应用
   - 掌握ODM模块mongoose应用
   - 了解快速开发工具KeyStoneJS

2. mongodb安装、配置
 - 下载安装
 https://www.runoob.com/mongodb/mongodb-osx-install.html
 - 配置环境变量
 - 创建dbpath文件夹
 ```
   mongo
  > show dbs
  > use test
  > db.fruits.save({name:"apple",price:3})  // 插入
  > show dbs   

  > db.fruits.find({price:3})      // 查询价格为3的
  > db.getCollectionNames()        // 查看集合

  > db.fruits.find()               // 查找所有

  

 ```
  
  3. 操作符文档
     https://docs.mongodb.com/manual/reference/operator/query

     - 比较 $eq、$gt $in
      await col.find({price:{$gt:10}}).toArray();
    -  逻辑$and $not $ or
       // price > 10 或 < 5
      await col.find({$or[{ price:{$gt:10}},{ price:{$lt:5}},]).toArray();
   
   4. ODM - Mongoose
    - 概述： 优雅的NodeJs对象文档模型object document model
    - Mongoose 两个特点：
       - 通过关系型数据库的思想来设计菲关系型数据库
       - 基于mongodb驱动，简化操作
    - 安装 
        -S --save （-dev） 不写也是--save 运行时必要的包    dependencies
        -D -dev    开发时必要的包，项目交付运行不需要        devDependencies

       ```
        npm install mongoose -S

       ```

    - 基本使用

      ```
      // mongoose.js
      const mongoose = require("mongoose")

      // 1.连接
      mongoose.connect("mongodb://localhosr:27017/test",{useNewUrlParser:true});

      const conn = mongoose.connection;
      conn.on("error",()=>console.error('连接数据库失败')

      conn.once("open",async ()=>{
        // 2.定义一个Schema - Table
        const Schema = mongoose.Schema({
          category:String,
          name:String
        })
      }

      ```

      5. y -> 
      keystone  快速开发建站 基于mongoose 可以直接利用这个工具，或者仿自己的系统

      https://keystonejs.com/getting-started/yo-generator

      ```
      npm install -g yo
      npm install -g generator-keystone
      初始化项目 yo keystone mySit

      http://0.0.0.0:3000/keystone/signin

      username: user@keystonejs.com
      psw: admin

      ```

      6. 原型 -> ER -> 具体程序

      ORM
      原型 -> 模型 ->域模型 -> 程序

      7. EventLoop是什么
       - 一个循环交tick 每次循环的代码交task
       - v8引擎单线程无法同时干两件事
       - 要通过异步回调方式处理又称作异步IO
       - 先同步在异步 异步放入队列等同步完成后执行，每次循环叫一个tick

       8. 异步任务的区分

       - microtasks(微任务)
         唯一，整个事件循环当中，仅存一个，执行为同步，同一个事件循环中的microtask会按队列顺序，串行执行完毕；
         - process.nextTik
         - promise
         - Object.observe
         - MutationObserver

       - tasks(宏任务)
         - setTimeout
         - setInterval
         - setlmmediate
         - I/O
         