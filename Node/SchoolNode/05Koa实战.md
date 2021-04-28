### koa 实战框架

- koa 引入
- 模版引擎（落后 前端可以解决）
- 鉴权 授权 session/cookie 、 Token 、 OAuth
- Restful API 及常见

1. 概念：新的 web 框架 更小更健硕 express 下一代基于 Node.js 的框架
2. 特点
   - 轻量
   - 中间件架构
   - 优雅的 API 设计
   - 增强的错误处理 async 语法增强
3. 安装
   ```
     npm i koa -S
   ```
4. 中间件机制、请求、响应
   -> mid.js
   next()
   洋葱模型
   OOP 面向对象的编程
   AOP 面向切面的编程 语言级 框架级
   顺序执行、也有横向的需要 切面层面，如 鉴权 错误处理 日志 ---> 中间件的使用情况

5. 上下环境的总结 ctx

   - .req Node 的 request
   - .res Node 的 response
   - .response koa 的 response
   - .request koa 的 request
   - .state 推荐命名空间 用于中间件传递信息和前端视图
   - .app 应用程序引用

6. router - npm i koa-router -S
   -> router-Pro 使用路由

   ```
        // 编写
        const Router = require('koa-router')
        const router  = new Router({prefix:'/users'})

        router.get('/',ctx=>{
            ctx.body = 'user'
        })

        module.exports = router
        // 使用
        const users = require('./routes/users')
        app.use(index.routes())
   ```

   7. 静态文件服务 模版引擎

      - npm i koa-static -S

      -> router-Pro/public/test.html

      ```
          // index.js 引入
          const static = require('koa-static')
          app.use(static(__dirname + '/public'))
          // 编写
          router-Pro/public
          // 执行
          // http://localhost:3001/login-session.html
      ```

      - Handlebars templates for Koa
        <!-- - npm i koa-hbs -S -->
        https://github.com/koajs/koa-hbs
      - npm install koa-hbs@next --save
        -> router-Pro/views

      ```
         // app 中引入
         const hbs = require('koa-hbs')
         app.use(hbs.middleware({
            viewPath:__dirname + '/views, // 视图根目录
            defaultLayout:'layout', // 默认的布局页面
            partialsPath:__dirname + '/views/partials', // 注册partial目录
            disableCache:true  // 开发不缓存
        }))
      ```

      ```
        // 使用
        // ->routes/index.js

      ```

      - 使用 moment 方法
        const helpers = require('./utils/ helpers')

      - 常用的工厂方法
        https://github.com/helpers/handlebars-helpers

      - 高级应用: 代码搬家（类似于插槽 引入jquery）
        // -> layout.hbs

      ```
      <script src="https://cdn.bootcss.com/   jquery/3.3.1/jquery.min.js">
      </script>
      {{#block 'jquery'}}{{/block}}
      ```

      // 在 users.hbs 里面使用 jquery , 控制台就会打印出 content for jQuery

      ```
        {{#contentFor 'jquery'}}
        <script>
            $(function(){
                console.log('content for jQuery')
            })
        </script>
        {{/contentFor}}
      ```
  
  8. cookie是否显示视频
   
   ```
    // 若cookie中不存在记录则不在播放，index.js
      let showVideo;
    if(ctx.cookies.get('isPlayed')) {
      showVideo = false;
    }else{
        showVideo = true;
        ctx.cookies.set('isPlayed',true,{**maxAge**:7 * 24 * 3600000});
    }
    await ctx.render('index',{list,showVideo})
   ```

   // 隐藏视频，index.hbs

  ```
    {{#contentFor 'jquery'}}
      < script >
          $("#home-banner-video").on("ended",function(){
            $(this).remove();
          })
      < /script > 
      {{/contentFor}}
  ```

  9. 列表排序

    ```
    const list  = ctx.state.vipCoures
    list.sort((a,b)=>a.sort-b.sort)
    await ctx.render('index',{list})
    ```

  10. ctx

      - ctx.accepts('html') === 'html'  判断是不是渲染html页面

      - ctx.state.dataValue = 存取data数据
      - ctx.cookie.set('isPlayed',true,{maxAge:7 * 24 * 3600000,httpOnly:false})
      - ctx.cookie.get('isPlayed)
      -  ctx.render('index',{list})   // 渲染模版引擎 传入list数据
      - ctx.body = 'hello world'    //  == res.
      - ctx.res.statusCode = 404;   // 状态码
      - ctx.request.body            // 获取body数据
      - ctx.res