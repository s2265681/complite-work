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
  console.log(ctx.session,'ctx.session')  // { count: 3 } 
  ctx.body = '第'+n+'次访问'
})

app.listen(3000)