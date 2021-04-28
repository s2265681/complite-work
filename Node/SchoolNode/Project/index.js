const Koa = require('koa')
const app = new Koa()

const mongoose = require('./models/mongoose')
const getVip = require('./middleware/get-vip')
app.use(getVip) // 使用中间件 当html 请求的话加载一下


// 表单校验。。。
const bouncer = require("koa-bouncer");
app.use(bouncer.middleware());


// post 请求
// express
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// koa
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


// 视图模版渲染一
const static = require('koa-static')
app.use(static(__dirname + '/public'))

// 视图模版渲染二
const hbs = require('koa-hbs')
const helpers = require('./utils/helpers')
app.use(hbs.middleware({
   viewPath:__dirname + '/views', // 视图根目录
   defaultLayout:'layout', // 默认的布局页面
   partialsPath:__dirname + '/views/partials', // 注册partial目录
   disableCache:true  // 开发阶段不缓存
}))



// 引入session
const session = require('koa-session')
// 存入redis  用于多服务器共享用户信息
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')
const redisStore = require('koa-redis')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys=['som secret']
const SESS_CONFIG = {
  key:'rockShang',  // cookie的键名
  maxAge:86400000,   // 有效期
  httpOnly:true,    // 服务器有效
  signed:true,       // 签名
  store:redisStore({ client })
}
app.use(session(SESS_CONFIG,app))


const cors = require('koa2-cors') // 代替下面的解决跨域的方法
app.use(cors())
//设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    res.header('Access-Control-Allow-Methods', '*');
//    res.header('Content-Type', 'application/json;charset=utf-8');
//    res.header('Access-Control-Allow-Credentials','true');
//    next();
//  });


const index = require('./routes/index')
const users = require('./routes/users')
const member = require('./routes/member') // restful风格接口
app.use(index.routes())
app.use(users.routes())
app.use(member.routes())
app.use(require('./routes/api').routes())


app.listen(3001)