const Koa = require('koa')
const app = new Koa()
const mysqlCon = require('./db/mysql')
//文件上传

// 链接数据库
mysqlCon.connect()

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

// 引入session
const session = require('koa-session');

// 存入redis  用于多服务器共享用户信息
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')
// const redisStore = require('koa-redis')
const wrapper = require('co-redis')
// const client = wrapper(redisClient)

app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

const cors = require('koa2-cors') // 代替下面的解决跨域的方法
app.use(cors({
  credentials: true
}))

const message = require('./routes/message')
const user = require('./routes/user')
app.use(message.routes())
app.use(user.routes())


app.listen(60001)