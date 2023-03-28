const Koa = require("koa");
var cors = require('koa2-cors');

const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const koaBody = require('koa-body');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { REDIS_CONF } = require('./conf/db')


const index = require("./routes/index");
const users = require("./routes/users");
const blog = require("./routes/blog");
const user = require("./routes/user");


// error handler
onerror(app);

// 设置上传文件大小最大限制，默认5M
// app.use(koaBody({
//   multipart: true,
//   formidable: {
//       maxFileSize: 500*1024*1024    
//   }
// }));

// 解决跨域
app.use(cors());


app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 524288000000
  }
}));


// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);


// logger
// 获取当前请求时间
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  // 异步先去做别的 再回来处理
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 处理session和lredis 登录验证
app.keys = ['Shang#3890_']

app.use(session({
  // 配置
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000
  },
  // 配置redis
  store: redisStore({
    // all: '127.0.0.1:6379'   // 写死本地
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))




// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  // console.error("server error", err, ctx);
});






module.exports = app;
