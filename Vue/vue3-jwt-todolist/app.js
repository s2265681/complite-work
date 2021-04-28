const Koa = require('koa');
const app = new Koa();
const json = require('koa-json'); //response JOSN美化中间件
const koajwt = require('koa-jwt'); //Koa JWT 验证中间件
const bodyparser = require('koa-bodyparser'); // Koa body体解析中间件
// const serve = require("koa-static"); // Koa 静态文件服务中间件

//自定义中间件
errorHandle = require('./server/middlewares/errorHandle.js');
sendHandle = require('./server/middlewares/sendHandle.js');

//连接数据库
require('./server/framework/services/conndb');

const utils = require('./server/framework/utils');
const router = require('./server/routes/index');

const config = require('./server/config');
const Auth = require('./server/framework/auth');

app
  .use(errorHandle)
  .use(sendHandle())
  .use(utils.logger())
  .use(json())
  .use(bodyparser())
  .use(
    koajwt({
      secret: config.secret,
      isRevoked: Auth.verify,
    }).unless({
      //设置不需要校验令牌的api
      path: config.unless_path,
    })
  )
  .use(router.routes(), router.allowedMethods());

app.listen(config.port, () =>
  console.log(`✅  The server is running at http://localhost:${config.port}/`)
);
