# Umi



## 1.UmiJS

- UmiJS是一个类Next.JS的react开发框架
- 基于一个约定，即pages目录下的文件即路由，而文件则导出react组件
- 然后打通从源码到产物每个阶段，并配以完善的插件体系

> 约定式pages/配置式_routes.json=> 路由配置=>入口/路由文件=> Webpack 调试/构建=>生成html=> 部署=> Server



## 2. 安装

- [umi官网](https://umijs.org/zh-CN)
- [umi源码](https://github.com/umijs/umi)
- [create-umi](https://www.npmjs.com/package/create-umi)
- [umi-pliugin-react文档](https://www.bookstack.cn/read/UmiJS2x/guide.md)
- [dva-immer](https://www.npmjs.com/package/dva-immer)
- umi-block

> ```
> npm i -g umi
> npm install bootstrap@3
> ```



## 3. 新建项目目录

```js
|—— dist/
|—— nock/
|—— src/
    |—— layouts/index.js
    |—— pages/
        |—— .umi/      // dev临时目录，需要添加到.gitignore
        |—— .umi-production   // build 临时目录 回自动删除
        |—— document.ejs      // HTML模板
|—— .umirc.js    // 配置文件
|—— .env         // 环境变量
|—— package.json 
```

### 3.1 新建项目

```js
mkdir rock-umi
cd rock-umi
cnpm init -y
生成index在pages中 
umi g page index  安装页面模块
umi g page profile
umi dev 启动
umi build 打包
umi run test
```

## 4. 全局layout

```js
import React, { Component } from "react";
import { Link } from "umi"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Layout extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              UMI
            </a> 
          </div>
          <ul className="nav navbar-nav">
            <li className="nav-link"><Link to="/">首页</Link></li>
            <li className="nav-link"><Link to="/user">用户管理</Link></li>
            <li className="nav-link"><Link to="/profile">个人中心</Link></li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
             {this.props.children}
          </div>
        </div>
      </div>
      </>
    );
  }
}
```



## 5. 用户管理

- umi里约定目录下有_layout.js时会生成嵌套路由，以_layout.js为该目录的layout pages/user/_layout.js

```js
import React, { Component } from "react";
import { Link } from "umi"

export default class Layout extends Component {
  render() {
    return (
      <div className="row">
          <div className="col-md-3">
              <ul className="nav nav-stack">
                  <li>
                      <Link to="/user/list">用户列表</Link>
                      <Link to="/user/add">新增用户</Link>
                  </li>
              </ul>
          </div>
          <div className="col-md-9">
              {this.props.children}
          </div>
      </div>
    );
  }
}

```

User/list.js

```js
import React, { Component } from "react";
import { Link } from "umi";
export default class list extends Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
           <Link to={{ pathname: "/user/detail/1", state: { id: 1, name: "张三" } }}>张三 </Link>
        </li>
        <li className="list-group-item">
           <Link to={{ pathname: "/user/detail/2", state: { id: 2, name: "李四" } }}>李四 </Link>
        </li>
      </ul>
    );
  }
}
```



User/add.js

```js
import React, { Component } from 'react'

export default class add extends Component {
    render() {
        return (
           <form action="">
               用户名<input type="text" className="form-control"/>
               密码<input type="text" className="form-control"/>
               <br/>
               <input type="submit" className="btn btn-primary"/>
           </form>
        )
    }
}

```



- 动态路由[id].js

User/detail/[id].js

```js
import React, { Component } from 'react'

export default class add extends Component {
    render() {
        let user = this.props.location.state || {}
        return (
          <div className="panel panel-default">
              <div className="panel-body">
                  ID:{user.id}
                  姓名:{user.name}
              </div>
          </div>
        )
    }
}
```







## 6. 权限路由

[地址](https://umijs.org/zh-CN/docs/convention-routing#%E6%9D%83%E9%99%90%E8%B7%AF%E7%94%B1)

通过指定高阶组件 `wrappers` 达成效果。

profile.js

```js
import React from 'react';
import styles from './profile.css';
import { history } from 'umi';
function Profile() {
  return (
    <div>
      <h1 className={styles.title}>Page profile</h1>
      <button onClick={()=>history.push('/')}>返回</button>
    </div>
  );
}

Profile.wrappers = ['./wrappers/auth']

export default Profile
```

Wrappers/auth.js

```js
import { Redirect } from 'umi'

function useAuth(){
    console.log('没有权限');
   return false
}
export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/" />;
  }
}
```

- 运行时路由

  app.js

```js
export function patchRoutes({ routes }) {
  console.log(routes,'ssss');
  routes[0].routes.unshift({
    path: '/foo',
    exact: true,
    component: ()=> <div>foo</div>
  });
}
```



## 7. umi dev

UMI的功能

- 根据pages生成路由配置
- 生成完整的React项目进行运行



## 8. umi配置化路由的原理

通过webpack运行项目，读取配置好的routes配置，通过继承react-router 动态渲染routes， 将对象的值结构到route中动态加载渲染。 



## 9. umi 进阶 按需加载

.umirc.js

```js
    // 按需加载
    dynamicImport: {
      loading: '@/Loading'
    },
```

Loading.js

```js
import React from 'react';
import './index.css'
export default () => {
  return <div className="loading">加载中...haha </div>;
};
```





## 10.约定式Mock数据

mock/api.js

```js
export default {
    // 支持值为 Object 和 Array
    'GET /api/users': [{id: 1, name: "张三"},{id: 2, name: "李四" }] ,
    // GET 可忽略
    '/api/users/1': {id: 1, name: "张三"},
  
    // 支持自定义函数，API 参考 express@4
    'POST /api/users/add': (req, res) => {
      // 添加跨域请求头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('ok');
    },
  }
```





## 11. SSR 服务端渲染和预渲染

服务端渲染和预渲染的好处都是在服务端进行渲染html，优点是可以减少白屏时间，更好的进行SEO，不同点是服务端渲染是客户端每次访问时生成最新代码最新数据，预渲染是每次构建时生成最新的代码加载到html中去，对于实时性强的服务端渲染更好，对于官网类的倾向使用预渲染技术，中后台管理系统类的谨慎使用服务端渲染技术

通过 `exportStatic` 结合 `ssr` 开启预渲染

```js
export default {
  ssr: {},
  exportStatic: {
+   extraRoutePaths: async () => {
+     // const result = await request('https://your-api/news/list');
+     return Promise.resolve(['/news/1', 'news/2']);
+   }
  }
}
```



