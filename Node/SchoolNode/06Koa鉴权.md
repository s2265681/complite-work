Koa 实战 - 鉴权

### 学习目标

- 掌握三种常见鉴权方式
  - Session/Cookie
  - Token
  - OAuth

  ### session-cookie方式

- cookie原理解析

```js
// cookie.js
const http = require("http")
http.createServer((req,res)=>{
  if(req.url === '/favicon.ico'){
    return
  }else{
    console.log(req.headers.cookie) // cx-abc
    res.setHeader('Set-Cookie','cx-abc')
    res.end('hello cookie')
  }
}).listen(3000)

```

- session原理解析

```js
const http = require("http")
const session = require("session")
http.createServer((req,res)=>{
  const sessionKey ='sid'
  if(req.url === '/favicon.ico'){
    return
  }else{
    console.log(req.headers.cookie) // cx-abc
    const cookie = req.headers.cookie
    if(cookie&&cookie.indexOf(sessionKey) > -1){
        res.end('Come Back')
        console.log('cookie',req.headers.cookie)
        // 简略写法未必具有通用性
        const pattern = new RegExp(`${sessionKey}=([^;]+;?\s*)`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:',sid,session,session[sid])
    } else {
        const sid = (Math.random()*9999999).toFixed()
        res.setHeader('Set-Cookie',`${sessionKey}=${sid}`)
        session[sid] = {name:"laowang"}
        res.end('hello cookie')
    }
  }
}).listen(3000)
```

![image-20191207102602827](/Users/shangjiawei/Library/Application Support/typora-user-images/image-20191207102602827.png)



- 实现原理

1. 服务器在接受客户端首次访问时在服务器创建session,然后保存在session(我们可以将session保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的表示是字符串，然后在响应头中种下这个唯一标识字符串
2. 签名。这一步通过密钥对sid进行签名处理，避免客户修改sid。（非必须）
3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息。
4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断请求是否合法。

- koa-session实现

```js
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')

app.keys=['som secret']

const SESS_CONFIG = {
  key:'rockShang',  // cookie的键名
  maxAge:86400000,   // 有效期
  httpOnly:true,    // 服务器有效
  signed:true       // 签名
}

app.use(session(SESS_CONFIG,app))

app.use(ctx=>{
  if(ctx.path ==='/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = '第'+n+'次访问'
})

app.listen(3000)


```

- redis介绍

- 是一个高性能的key-value数据库

- Redis与其他key-value缓存产品有以下三个特点：
  - Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
  - Redis不仅仅支持简单的key-vaue类型的数据，同时还提供list，set，zset，hash等数据结构的存储
  - Redis支持数据的备份，即master-slave模式的数据备份
- Redis优势
  - 性能极高 - Redis能读的速度是110000次/s，写的速度时81000次/s
  - 丰富的数据类型-Redis支持二进制案例的String，List，Heashes
  - Redis支持数据的备份，即master-slave模式的数据备份。
- 安装 npm i -S koa-redis
- 配置使用

```js
// 简单使用
const redis = require('redis')
const client = redis.createClient(6379,'localhost')

client.set('hello','hahahhaa')
client.get('hello',function(err,v){
  console.log('redis key:',v)
})
// 启动 redis-server
```

```js
// koa中的使用
const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')

const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')
const redisStore = require('koa-redis')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys=['som secret']

const SESS_CONFIG = {
  key:'rockShang',  // cookie的键名
  // maxAge:86400000,   // 有效期
  // httpOnly:true,    // 服务器有效
  // signed:true       // 签名
  store:redisStore({ client })
}

app.use(session(SESS_CONFIG,app))

app.use(ctx=>{
  // 查看redis
  redisClient.keys('*',(err,keys)=>{
    console.log('keys:',keys)
    keys.forEach(key => {
      redisClient.get(key,(err,val)=>{
        console.log(val)
      })
    })
  })
  if(ctx.path ==='/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = '第'+n+'次访问'
})

app.listen(3000)
```

- session可以实现信息存储，为什么还要使用redis ？

放到session内存里横向扩展不足，如果node部署在多台机器里内存是不共享的，所有需要键值服务器去存取一下session的信息，在其他node服务器中也可以获得信息。

​     http://localhost:3001/login-session.html

Users.js

```js

router.post("/login", async ctx => {
  const { body } = ctx.request;
  if (body.name && body.pwd === "123456") {
    ctx.session.username = body.name;
    ctx.body = {
      ok: 1,
      message: "登录成功"
    };
  } else {
    ctx.body = {
      ok: 0,
      message: "登录失败"
    };
  }
});

router.post("/loginout", async ctx => {
  delete ctx.session.username;
  ctx.body = {
    ok: 1,
    message: "退出登录"
  };
});

// 使用中间件
router.get("/info", isLogin, async ctx => {
  ctx.body = {
    ok: 1,
    message: ctx.session.username
  };
});
```



### Token方式

- 因为只有浏览器才有cookie，才能使用session/cookie，没有浏览器的情况下，无法使用，token应用密码学

- 流程

  1、 客户端使用用户密码请求登录

  2、服务器收到请求，去验证用户名密码

  3、验证成功后，服务器会签发一个令牌（Token），再把这个Token发送给客户端

  4、客户端收到Token以后，可以把它存起来，比容放在Cookie里，或者 LocalStore里面

  5、客户端每次向服务器请求资源的时候需要带着服务器签发的Token

  6、服务端收到请求，然后去验证客户端请求里面带着的Token，如果验证成功，就向客户端返回请求的数据

- 案例：令牌认证

   http://localhost:3001/login-token.html

  Login-token.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>to do list- vue+express</title>
      <!-- 引入vue -->
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <!-- 引入axios -->
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <meta http-equiv="Access-Control-Allow-Origin" content="*" />
      <!-- 引入样式 -->
      <link
        rel="stylesheet"
        href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
      />
      <!-- 引入组件库 -->
      <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    </head>
    <body>
      <div id="app">
        login-token<br />
        <input v-model="name" />
        <input v-model="pwd" />
        <button @click="login">login</button>
        <button @click="loginout">loginOut</button>
        <button @click="clear">clearLog</button>
        <button @click="getInfo">getUserInfo</button>
        <div>{{JSON.stringify(log)}}</div>
      </div>
      <script>
        axios.interceptors.request.use(
          config => {
            const token = window.localStorage.getItem("token");
            if (token) {
              // 判断是否存在token，如果存在的话，则每个http header都加上token
              // Bearer是jwt的认证头部信息
              config.headers.common["Authorization"] = "Bearer " + token;
            }
            return config;
          },
          err => {
            return Promise.reject(err);
          }
        );
  
        axios.interceptors.response.use(
          response => {
            console.log(app, "app");
            app.log.push(JSON.stringify(response.data));
            return response;
          },
          err => {
            app.log.push(JSON.stringify(response.data));
            return Promise.reject(err);
          }
        );
      </script>
      <script>
        const host = "http://localhost:3001/api";
        const app = new Vue({
          el: "#app",
          data: {
            name: "",
            pwd: "",
            log: []
          },
          created() {},
          methods: {
            login: async function() {
              console.log(this.name, "this.name");
              let res = await axios.post(host + "/login-token", {
                name: this.name,
                pwd: this.pwd
              });
              window.localStorage.setItem("token", res.data.token);
            },
            loginout: async function() {
              window.localStorage.removeItem("token");
            },
            getInfo: async function() {
              console.log(12);
              let res = await axios.get(host + "/info-token");
            },
            clear: async function() {
              this.log = [];
            }
          },
          mounted: function() {
            this.getInfo();
          }
        });
      </script>
    </body>
  </html>
  
  ```

  Users.js

  ```js
  //  token 方式
  const jwt = require("jsonwebtoken");
  const jwtAuth = require("koa-jwt");
  const secret = "@wewe44K";
  
  router.post("/login-token", async ctx => {
    const { body } = ctx.request;
    // 数据库验证
    const userinfo = body.name;
    if (userinfo) {
      console.log(body, "body");
      ctx.body = {
        ok: 1,
        message: "登录成功",
        token: jwt.sign(
          {
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1小时后过期
          },
          secret
        )
      };
    } else {
      ctx.body = {
        ok: 0,
        message: "登录失败"
      };
    }
  });
  
  // 使用中间件 jwtAuth 1、验证是否正确 2、 把写入的值返回来ctx.state.user
  router.get("/info-token", jwtAuth({ secret }), async ctx => {
    console.log("state:", ctx.state.user);
    ctx.body = {
      ok: 1,
      message: "获取数据成功",
      userinfo: ctx.state.user.data
    };
  });
  
  ```

- JWT(Json WEB TOKEN) 原理解析

  - 1、Bearer Token包含三个组成部分：令牌头、payload、哈希

  - 2、签名：默认使用base64对payload编码，使用hs256算法对令牌头、payload和密钥进行签名生成哈希

  - 3、验证：默认使用hs256算法对令牌中数据签名并将结果和令牌中哈希对比

  ```js
  // jsonwebtoken.js
  const jwt = require("jsonwebtoken");
  const secret = "@wewe44K";
  const user = {
    username: "abc",
    password: "1111"
  };
  const token = jwt.sign(
    {
      data: user,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1小时后过期
    },
    secret
  );
  console.log("生成token+", token);
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExIn0sImV4cCI6MTU3NTg2NzMwNywiaWF0IjoxNTc1ODYzNzA3fQ.ruJ_hJdaAqS8SlyaOkwoO7rnaVX2gsf3NOFZZS9VILE
  console.log("解码：", jwt.verify(token, secret));
  // { data: { username: 'abc', password: '1111' },exp: 1575867307,iat: 1575863707 }
  
  ```

  

- 比较cookie/session与token登录方式的不同

  - 都是做登录鉴权的方式，前者只能用于浏览器端，后者都可以
  - 存取用户信息方面，前者通过ctx.session存取，后者通过jwt读取，通过token: jwt.sign()存储  ，ctx.state.user获得
  - 前者将验证过期时间放到了cookie中，存到了后端，前端每次发送请求会通过cookie带来验证，后者通过前端把token放到header中，通过jwt鉴别



### OAuth(开放授权)

- 概述：三方登录主要基于OAuth2.0。OAth协议为用户资源的授权提供了一个安全的、开放而又简单的标准。与以往的授权方式不同之处是OAuth的授权不会使用第三方触及到用户的账号信息（如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，因此OAth是安全的。

- OAuth登录流程

  ![](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2005963405,1223119627&fm=173&app=49&f=JPEG?w=640&h=446&s=449A4C3211DE61C8547140DE0200C0B2)

http://localhost:3001/login-session.html

Login-session.html

```html
 <a href="/api/github/login">github登录</a><br/>
```

Users.js

```js

//  github OAth登录  http://localhost:3001/login-session.html 测试页面
const axios = require("axios");
const querystring = require("querystring");
const config = {
  client_id: "4bfc24796006099e8c30",
  client_secret: "aadcc88e2d532babc28e11fff4e7f1843be7f9b9"
};

router.get("/github/login", async ctx => {
  console.log("github login");
  // const dataStr = (new Date()).valueOf();
  // 重定向到认证接口，并配置参数
  let path = "https://github.com/login/oauth/authorize";
  //  https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=https://biaochenxuying.cn/login
  path +=
    "?client_id=" +
    config.client_id +
    "&redirect_uri=" +
    "http://localhost:3001/api/github/callback";
  // 转发到授权服务器
  ctx.redirect(path);
});

router.get("/github/callback", async ctx => {
  console.log("callback..");
  const code = ctx.query.code;
  const params = {
    client_id: "4bfc24796006099e8c30",
    client_secret: "aadcc88e2d532babc28e11fff4e7f1843be7f9b9",
    code: code
  };
  let res = await axios.post(
    "https://github.com/login/oauth/access_token",
    params
  );
  const access_token = querystring.parse(res.data).access_token;
  res = await axios.get(
    "https://api.github.com/user?access_token=" + access_token
  );
  if (res.data.name) {  // 通过session存储登录信息 跳转到页面
    ctx.session.username = res.data.name;
    ctx.redirect("http://localhost:3001/login-session.html");
  }

  // ctx.body = `
  //    <h1>Hello${res.data.name}</h1>
  //    <img src="${res.data.avatar_url}" alt=""/>
  //    <img src="https://avatars2.githubusercontent.com/u/41536679?v=4" alt=""/>
  // `
});


```

[项目GitHub地址](https://github.com/s2265681/SchoolNode/tree/master/Project)