####  前后不分离


前端  采用node 中的koa-hbs 模版渲染出主要页面
http://npm.taobao.org/package/koa2-hbs/v/2.0.2

koa-static模版页面 http://localhost:3001/login-session.html

后端  采用koa框架  koa-router 路由

数据层

使用mongoose  中间件层 加载数据渲染  

服务层  使用 docker 管理启动 mongodb

cookie session鉴权
koa-static模版页面 http://localhost:3001/login-session.html




```
    // 查看redis
    //   console.log(ctx.headers.cookie,'s');
    // const pattern = new RegExp(`rockShang=([^;]+;?\s*)`)
    // const sid = pattern.exec(ctx.headers.cookie)[1]
    // console.log(sid,'sid///')

    // redisClient.keys('3dcc4877-a83e-46a4-95fd-826a54e60639',(err,keys)=>{
    //     console.log('keys:',keys)
    //     keys.forEach(key => {
    //     redisClient.get(key,(err,val)=>{
    //         console.log(key,'key')
    //         console.log(val,'val')
    //         console.log(JSON.parse(val).username,'val++')
    //     })
    //     })
    // })
    // }
    ```