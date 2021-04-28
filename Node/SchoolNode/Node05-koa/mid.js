const Koa = require('koa')
const app = new Koa()
// 中间件的例子
const mid1 = async (ctx,next) =>{
    ctx.body = 'hello'
    await next()
    ctx.body = ctx.body+'!!!'  // 根据洋葱模型 这个是最外层  最后执行
} 

const mid2 = async (ctx,next) =>{
    ctx.type = 'text/html;charset=utf-8'
    await next()
} 

const mid3 = async (ctx,next) =>{
    ctx.body = ctx.body+'kaikeba'
    await next()
    ctx.body = ctx.body+'最后加'
} 

app.use(mid1)
app.use(mid2)
app.use(mid3)

// 中间件 - 洋葱模型  最下面的是最里层


app.listen(3001)