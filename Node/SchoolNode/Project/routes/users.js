const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const isLogin = require("../middleware/isLogin");
const redis = require("redis");
const redisClient = redis.createClient(6379, "localhost");

router.get("/", async ctx => {
  // ctx.body = 'user'
  await ctx.render("users", {
    title: "用户列表",
    subTitle: "handlebars语法",
    isShow: true,
    username: "jerry",
    htmlStr: "<h1>HHH</h1>",
    users: [
      { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
      { username: "jenry", age: 12, birth: new Date(1999, 3, 1) }
    ]
  });
});

router.post("/login", async ctx => {
  const { body } = ctx.request;
  if (body.name && body.pwd === "123456") {
    ctx.session.username = body.name;
    ctx.body = {
      ok: 1,
      message: "登录成功"
    };
  } else {
    ctx.body = {
      ok: 0,
      message: "登录失败"
    };
  }
});

router.post("/loginout", async ctx => {
  delete ctx.session.username;
  ctx.body = {
    ok: 1,
    message: "退出登录"
  };
});

// 使用中间件
router.get("/info", isLogin, async ctx => {
  // const {username } = ctx.session
  // console.log(ctx.session,'ctx.session')
  // if(!username){
  //     ctx.body = {
  //         ok:0,
  //         message:'未登录'
  //     }
  // }else{
  ctx.body = {
    ok: 1,
    message: ctx.session.username
  };

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
});

//  token 方式
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const secret = "@wewe44K";

router.post("/login-token", async ctx => {
  const { body } = ctx.request;
  // 数据库验证
  const userinfo = body.name;
  if (userinfo) {
    console.log(body, "body");
    ctx.body = {
      ok: 1,
      message: "登录成功",
      token: jwt.sign(
        {
          data: userinfo,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1小时后过期
        },
        secret
      )
    };
  } else {
    ctx.body = {
      ok: 0,
      message: "登录失败"
    };
  }
});

// 使用中间件 jwtAuth 1、验证是否正确 2、 把写入的值返回来ctx.state.user
router.get("/info-token", jwtAuth({ secret }), async ctx => {
  console.log("state:", ctx.state.user);
  ctx.body = {
    ok: 1,
    message: "获取数据成功",
    userinfo: ctx.state.user.data
  };
});

//  github OAth登录  http://localhost:3001/login-session.html 测试页面
const axios = require("axios");
const querystring = require("querystring");
const config = {
  client_id: "4bfc24796006099e8c30",
  client_secret: "aadcc88e2d532babc28e11fff4e7f1843be7f9b9"
};

router.get("/github/login", async ctx => {
  console.log("github login");
  // const dataStr = (new Date()).valueOf();
  // 重定向到认证接口，并配置参数
  let path = "https://github.com/login/oauth/authorize";
  //  https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=https://biaochenxuying.cn/login
  path +=
    "?client_id=" +
    config.client_id +
    "&redirect_uri=" +
    "http://localhost:3001/api/github/callback";
  // 转发到授权服务器
  ctx.redirect(path);
});

router.get("/github/callback", async ctx => {
  console.log("callback..");
  const code = ctx.query.code;
  const params = {
    client_id: "4bfc24796006099e8c30",
    client_secret: "aadcc88e2d532babc28e11fff4e7f1843be7f9b9",
    code: code
  };
  let res = await axios.post(
    "https://github.com/login/oauth/access_token",
    params
  );
  const access_token = querystring.parse(res.data).access_token;
  res = await axios.get(
    "https://api.github.com/user?access_token=" + access_token
  );
  if (res.data.name) {
    ctx.session.username = res.data.name;
    ctx.redirect("http://localhost:3001/login-session.html");
  }

  if (res.data.name) {
      const token = jwt.sign(
        {
          data: res.data.name,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1小时后过期
        },
        secret
      )
    ctx.session.username = res.data.name;
    // ctx.redirect("http://localhost:3001/login-token.html?token="+token);

    ctx.redirect("http://localhost:3001/login-token.html")
    ctx.cookies.set('token', token, {maxAge:7 * 24 * 3600000,httpOnly:false})
  }

  


  // ctx.body = `
  //    <h1>Hello${res.data.name}</h1>
  //    <img src="${res.data.avatar_url}" alt=""/>
  //    <img src="https://avatars2.githubusercontent.com/u/41536679?v=4" alt=""/>
  // `
});

module.exports = router;
