# React-ssr

### 1、什么是服务端渲染

#### 1.1 服务端渲染

页面上的内容是有服务器生产的

```js
cnpm i express -S
```

```js
let express = require('express')
let app = express();
app.get('/',(req,res)=>{
  res.send(`
    <html>
      <body>
        <div id="root">hello</div>
      </body>
    </html>
  `)
})

app.listen(3000,function(){
    console.log(`server started at port 3000`);
})
```



#### 1.2 客户端渲染

页面内容由浏览器加载脚本代码

```js
let express = require('express');
let app = express();
app.get('/',(req,res)=>{
  res.send(`
    <html>
      <body>
        <div id="root"></div>
        <script>
           document.getElementById('root').innerHTML = 'hello1'
        </script>
      </body>
    </html>
  `)
})

app.listen(3000,function(){
    console.log(`server started at port 3000`);
})
```





### 2、配置路由

router.js

```js
import React,{ Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Counter from './containers/Counter'

export default (
    <Fragment>
        <Route path="/" exact component={Home}/>
        <Route path="/counter" exact component={Counter}/>
    </Fragment>
)
```

Client/index.js

```js
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import routes from "../router";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {routes}
        </div>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
```



Server/render.js

```js
import React, { Component, Fragment } from "react";
// import Home from "../containers/Home";
// import Counter from "../containers/Counter";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import routes from "../router";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getServerStore } from "../store";

export default function (req, res) {
  // var html = renderToString(<Counter/>)
  var html = renderToString(
    <Provider store={getServerStore(req)}>
      <StaticRouter context={{}} location={req.path}>
        <Fragment>
          <Header />
          <div className="container" style={{ marginTop: 70 }}>
            {routes}
          </div>
        </Fragment>
      </StaticRouter>
    </Provider>
  );
  console.log(html);
  res.send(`
    <html>
        <head>
        <title>React-SSR</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        </head>
        <body>
        <div id="root">${html}</div>
        <script></script>
        <script src="/client.js"></script>
        </body>
    </html>`);
}
```



### 3、配置redux

Store/index.js

```js
import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

export function getClientStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}

export function getServerStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}
```



### 4、请求接口

api/server.js

```js
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();

// 如果浏览器不直接访问 API 接口服务器，那么就不存在跨域的问题，node 服务器访问 API 接口服务器不存在跨域问题

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'react-test'
}));

let users = [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}];
app.get('/api/users', function (req, res) {
    res.json(users);
});

app.post('/api/login', function (req, res) {
    let user = req.body;
    req.session.user = user;
    res.json({
        code: 0,
        data: {
            user,
            success: '登录成功!'
        }
    });
});

app.get('/api/logout', function (req, res) {
    req.session.user = null;
    res.json({
        code: 0,
        data: {
            success: '退出成功!'
        }
    });
});

app.get('/api/user', function (req, res) {
    let user = req.session.user;
    if (user) {
        res.json({
            code: 0,
            data: {
                success: '获取用户信息成功!',
                user
            }
        });
    } else {
        res.json({
            code: 1,
            data: {
                error: '用户未登录!'
            }
        });
    }
});

app.listen(4000);
```



Store/action/home.js 客户端axios请求

```js
import * as types from "../action-types";
import axios from "axios";

export default {
    getHomeList() {
      // 这里使用 redux-thunk 中间件
      return function (dispatch, getState, request) {
        return axios.get("http://localhost:4000/api/users").then(function (result) {
          let list = result.data;
          dispatch({
            type: types.SET_HOME_LIST,
            payload: list,
          });
        });
      };
    },
  };
```



服务端接口数据的获取



### 5、启动

```js
npm run dev
```





### 6、问题



- 解决跨域 

  1、不是更好的方式 直接访问api不合理 后端改了要改地址 不好做权限设置，更好的方式是node做接口转发

  ```js
  let cors = require('cors');
  app.use(cors({
      origin:'http://localhost:3000'
  }));
  ```





- 难点怎么匹配路由获取对应的接口数据

  将路由改成配置项的方式

  ```js
  
  // 集中式路由
  export default [
      [
          {
              path: '/',
              component: Home,
              exact: true,
              key: '/',
              // 加载数据，如果此配置项有了这个属性，那么意味着需要加载异步数据
              loadData: Home.loadData
          },
          {
              path: '/counter',
              component: Counter,
              key: '/counter'
          }
      ]
  ]
  
  // export default (
  //     <Fragment>
  //         <Route path="/" exact component={Home}/>
  //         <Route path="/counter" exact component={Counter}/>
  //     </Fragment>
  // )
  ```

  

​       服务端获取数据， 通过路由中的loadData加载一个方法，执行调用页面接口，将数据放到window.context上面，在客户端的store中将页面初始值放到这里

```js
export function getClientStore(){
    let initState = window.context.state;
    return createStore(reducers,initState,applyMiddleware(thunk,logger))
}
```

客户端页面调用的时候，如果有初始值就不要在调用接口

```js
// 注意：这里访问的是客户端的仓库
if(this.props.list.length == 0){
  this.props.getHomeList();
}
```



