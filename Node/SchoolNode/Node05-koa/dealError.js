const Koa = require('koa')
const app = new Koa()

// 响应时间输出
app.use(async (ctx,next) =>{
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`输出计时:${ctx.method} ${ctx.url} -  ${rt}`)
    console.log(`结束`)
})

// 响应时间计时
app.use(async (ctx,next) =>{
    const start = Date.now()
    console.log(`开始计时`)
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time',`${ms}ms`)
  
})

// const sleep = time => new Promise(resolve=>setTimeout(resolve,time))

// 错误处理 中间件 捕捉错误
app.use(async (ctx,next)=>{
    try{
       await next()
    } catch (error) {  // 错误处理  决定抛错给客户还是服务端
        // console.log(error,'error')
        ctx.status = error.statusCode || error.state  || 500
        ctx.body = error.message  

        // 触发错误层级的错误事件
        ctx.app.emit('error',error,ctx) // 抛出 在app.on 接收
        console.log('中间件捕捉：', error.message)
    }
})

app.on('error',err=>{
    // console.error('app错误捕捉到啦:',err.message)
    // throw err  // 向上抛 抛到node  终止服务
    console.log('没事儿')
})

// 模拟响应
app.use(async ctx =>{
    await sleep(250)
    ctx.status = 200
    ctx.type = 'html'
    ctx.body = '<h1>Hello Word</h1>'
    console.log('响应')
})



app.listen(3001)