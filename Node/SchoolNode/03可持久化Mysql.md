## 持久化

- node.js 中实现持久化的多种方法
- myusql 下载、安装和配置
- node.js 中原声 mysql 驱动模块的应用
- 掌握 node.js 中的 ORM 模块 Sequelize 的应用
- 掌握 Sequelize 的应用案例
- 了解数据库设计的原理
  - 设计规范和反范式
  - ORM 带来的进步
  - 全栈关注点 - 快速迭代 + 易于横向性能扩展

**docker 轻量级的虚拟机**

- 文档 https://yeasy.gitbooks.io/docker_practice/install/mac.html

- Docker Compose

**Node.js 中实现持久化的方法**

- 文件系统 fs
- 数据库
  - 关系型数据库-mysql
  - 文档型数据可-mongodb
  - 键值对型数据库-redis

#### 文件系统数据库

-> fs.db

- 操作

```
  [nodemon] starting `node fsdb.js`
  操作文件系统---mongodb
  set a 100
  set a 100
  写入成功
  [nodemon] restarting due to changes...
  [nodemon] starting
  get a
  get a
  100
  set b 888
  set b 888
  写入成功

```

#### mysql

- 安装 mysql 模块

  ```
  npm i mysql --save
  ```

  基本使用
  // mysql.js
  const mysql = require('mysql');

  // 链接配置
  const cfg = {
  host:'',
  user:'root',
  password:'',
  database:'
  }

  // 创建链接
  const con = mysql.createConnect(cfg)

  // 连接
  con.connect(err=>{
  if(err){
  throw err;
  }
  })

  - ES2017 写法

  ```
  // mysql2
  (async ()=>{
    // get the client
    const mysql = require('mysql2/promise);
    // 连接配置
      const cfg = {
        host:'',
        user:'root',
        password:'example',
        database:'’
      }
     // create the connection
     const connection = await mysql.createConnetion(cfg);
  })

  ```

  **传统设计模式**
  原型->设计模型->具体功能

### Node.js ORM - Sequelize 中间件操作数据库

- 概述：基于 Promise 的 ORM 支持多种数据库、事务、关联等
- 安装：npm i sequelize mysql2 -S
- 基本使用
  ->sequelize.js
  ```
    (async ()=>{
      const Sequelize = require("sequelize");
      // 建立连接
      const sequelize = new Sequelize("kaikeba","root","example",{
        host:"localhost",
        dialect:"mysql",
        operatorAliases:false
      })
    })
  ```
  **数据库中间件**
  - 在不使用 sql 语句的情况下，去操作数据库

  **传统数据库弹性不足**
  - 数据库修改、程序修改 灵活性不强

  **sequelize校验**
  可以通过校验功能验证模型字段格式、内容、校验会在creat、update和save时自动运行

  ```
   price:{
     validate:{
       isFloat:{msg:"价格字段请输入数字"},
       min:{args:[0],msg:"价格字段必须大雨0"}
     }
   },
   stock:{
     validate:{
       isNumeric:{
         msg:"库存字段请输入数字"
       }
     }
   }

  ```

**模型扩展，可添加模型实例方法或类方法扩展模型**

```
  // 添加类级别的方法
    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉','芒果','椰子'] // 热带水果
        return tropicFruits.includes(name)?"热带水果":"其他水果";
      };
   // 使用方法
     ['香蕉','草莓'].forEach(f=>console.log(f+'是'+Fruit.classify(f)));

  // 添加类方法

    //  写一个类方法
    Fruit.prototype.totalPrice = function(count) {
        return (this.price * count).toFixed(2);
    }

  // 使用
    Fruit.findAll().then(fruits =>{
      const [f1] = fruits;
      console.log(`买5kg${f1.name}需要¥${f1.totalPrice(5)}`,'f1.name')
    })

```


**sequlize实例 TODO List范例**
https://github.com/BayliSade/TodoList



- DeleteFlg实现
- 定义模型后生成crud界面，包括有效性检查