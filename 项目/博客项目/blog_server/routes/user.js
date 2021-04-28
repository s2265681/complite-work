const router = require("koa-router")();
const { login, register } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");
// 前缀
/* POST login */
router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body; 
  console.log('username',username)
  const data = await login(username, password);
  if (data.username) {
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel("登录成功");
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});
/* POST register */
router.post("/register", async (ctx, next) => {
  const { username, password, realname} = ctx.request.body; // post时     // const { username , password } = req.query  // get时
  const data = await register(username, password, realname);
  if (data.id) {
    ctx.body = new SuccessModel("注册成功");
    return;
  }
  ctx.body = new ErrorModel("注册失败");
});


// 验证是否有存储功能 用存储次数验证
// router.get("/session-test", async ctx => {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0;
//   }
//   ctx.session.viewCount++;

//   ctx.body = {
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   };
// });

// router.get("/bar", async (ctx, next) => {
//   ctx.body = "this is a users/bar response";
// });

module.exports = router;
