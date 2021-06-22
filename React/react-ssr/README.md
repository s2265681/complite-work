

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

​       2、node代理添加node中间层

​       server.js

```js
// 如果是服务器端请求数据，则直接访问 API 服务器的 4000 端口
// 如果是客户端请求数据，则要访问 node 服务器（中间层）的 3000 端口
// 让 node 服务器帮我们访问 API 服务器的 4000 端口请求数据
// 总结：客户端向 node 服务器请求数据，node 服务器转发给 API 服务器
// 如果浏览器不直接访问 API 接口服务器，那么就不存在跨域的问题，node 服务器访问 API 接口服务器不存在跨域问题
// 如果访问的路径是以 /api 开头的，会交给代理服务器处理
/ /api/users => http://127.0.0.1:4000/api/users
app.use('/api', proxy('http://127.0.0.1:4000', {
  proxyReqPathResolver(req) {
    return `/api${req.url}`;
  }
}));
```

Store/index.js

在readux-thunk中传入不同的客户端和服务端的request

```js
export function getClientStore(){
    let initState = window.context.state;
    return  createStore(reducers,initState,applyMiddleware(thunk.withExtraArgument(ClientRequest),logger))
}
```

```js
import axios from 'axios';

// 如果是服务器端请求数据，则直接访问 API 服务器的 4000 端口
// 如果是客户端请求数据，则要访问 node 服务器（中间层）的 3000 端口
// 让 node 服务器帮我们访问 API 服务器的 4000 端口请求数据

// 创建一个 axios 的实例, 配置 baseURL 的基准路径
export default axios.create({
    baseURL: '/'
});

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



- 客户端服务端统一样式

  react-reater-config 模块 匹配多级路由

```js
npm i   react-reater-config
```

> import { renderRoutes , matchRoutes } from 'react-reater-config'

```js
import { renderRoutes , matchRoutes } from 'react-reater-config'

{/*
  {routes.map((route, index) => (
        <Route {...route} key={index} />
  ))} 
*/}

{renderRoutes(routes)}
```

App.js

```js
import React, { Component, Fragment } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import Header from "../components/Header";
class App extends Component {
  render() {
    //   console.log(this.props)
    return (
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {renderRoutes(this.props.route.routes)}
        </div>
      </Fragment>
    );
  }
}

export default App;
```



### 7、权限

注册登陆

登陆通过设置cookie的携带进行，设置axios的cookie值

server/request.js

```js
export default (req) => axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        cookie: req.get('cookie') || ''
    }
});
```

Api/server.js 接口设置session

```js
let session = require('express-session');
let app = express();
// let cors = require('cors');
// 如果浏览器不直接访问 API 接口服务器，那么就不存在跨域的问题，node 服务器访问 API 接口服务器不存在跨域问题
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'react-test'
}));

```

server/index.js 设置正向代理

```js
// 如果是服务器端请求数据，则直接访问 API 服务器的 4000 端口
// 如果是客户端请求数据，则要访问 node 服务器（中间层）的 3000 端口
// 让 node 服务器帮我们访问 API 服务器的 4000 端口请求数据
// 总结：客户端向 node 服务器请求数据，node 服务器转发给 API 服务器
// 如果浏览器不直接访问 API 接口服务器，那么就不存在跨域的问题，node 服务器访问 API 接口服务器不存在跨域问题
// 如果访问的路径是以 /api 开头的，会交给代理服务器处理
// /api/users => http://127.0.0.1:4000/api/users
app.use('/api', proxy('http://127.0.0.1:4000', {
    proxyReqPathResolver(req) {
        return `/api${req.url}`;
    }
}));

```

App.js   服务端通过App.loadData这个属性获取getUser这个方法，来判断是否登陆了

```js
App.loadData = function (store) {
  return store.dispatch(actions.getUser());
};

// 设置重定向到首页
 return this.props.user ? (
   <div className="row">
   <div className="col-md-6 col-md-offset-6">个人中心</div>
   </div>
 ) : (
   <Redirect to="/login"/>
 );

```





### 8、设置css样式

webapck.config.js

```js
// 服务端
module:{
  rules:[
    {
      test:/\.css$/,
      use:[
        'isomorphic-style-loader',
        {
          loader:'css-loader',
          options:{
            modules:true
          }
        }
      ]
    }
  ]
}
// 客户端
module:{
  rules:[
    {
      test:/\.css$/,
      use:[
        'style-loader',
        {
          loader:'css-loader',
          options:{
            modules:true
          }
        }
      ]
    }
  ]
}
```



server/render.js   通过context收集css

```js
import React, { Component, Fragment } from "react";
// import Home from "../containers/Home";
// import Counter from "../containers/Counter";

export default function (req, res) {
  // css 代码进行收集
   let context = { csses:[] };
   // ...
    let cssStr = context.csses.join("\n")
    // ...
    res.send(`
            <html>
                <head>
                    <title>React-SSR</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
                    <style type="text/css">${cssStr}</style>
                </head>
                <body>
                <div id="root">${html}</div>
                <script>
                    window.context={
                        state:${JSON.stringify(store.getState())}
                    }
                </script>
                <script src="/client.js"></script>
                </body>
            </html>`);
  });
}

```



**withStyles.js. 设置高阶组件  通过 this.props.staticContext 让服务端拿到样式， 使样式和客户端渲染一致，解决刷新页面闪动的问题**

```js
import React,{Component} from 'react';

export default function withStyles(OriginalComponent,styles){
    class ProxyComponent extends Component{
        componentWillMount(){
            if(this.props.staticContext){
              // _getCss方法可以得到处理后的 css 源代码
              this.props.staticContext.csses.push(styles._getCss());
            }
        }
        render(){
            return <OriginalComponent {...this.props}/>
        }
    }
    return ProxyComponent;
}
```





### 未完任务 

- 登陆和退出的相关跳转
- 