## Nest


- npm i -g @nestjs/cli
- nest new project-name

## nest

```js
  npm i -g @nestjs/cli
  nest new project-name
```

- nodemon模式
yarn start:dev


yarn add typescript -D

- Controller：传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；
- Service：又称为 Provider， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；
- Module：负责将 Controller 和 Service 连接起来，类似于 namespace 的概念；


```js
  nest g [文件类型] [文件名] [文件目录（src目录下）]
  nest g service user logical
```

创建表
```js
CREATE TABLE `admin_user` (
  `user_id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account_name` varchar(24) NOT NULL COMMENT '用户账号',
  `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
  `passwd` char(32) NOT NULL COMMENT '密码',
  `passwd_salt` char(6) NOT NULL COMMENT '密码盐',
  `mobile` varchar(15) NOT NULL DEFAULT '0' COMMENT '手机号码',
  `role` tinyint(4) NOT NULL DEFAULT '3' COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
  `user_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
  `create_by` smallint(6) NOT NULL COMMENT '创建人ID',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` smallint(6) NOT NULL DEFAULT '0' COMMENT '修改人ID',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`),
  KEY `idx_m` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='后台用户表';

```

链接数据库的工具Sequelize

```js
安装
$ npm i sequelize sequelize-typescript mysql2 -S
或
$ yarn add sequelize sequelize-typescript mysql2 -S
```


 https://sequelize.org/v5/