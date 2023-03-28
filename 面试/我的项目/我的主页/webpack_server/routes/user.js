// const jwtAuth = require("koa-jwt");
const router = require("koa-router")();
const { exec } = require("../utils/exct");
const secret = "34323566";
const { genPassword } = require("../utils/cryp");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bouncer = require("koa-bouncer");
const moment = require("moment");
const qs = require("querystring");
// 图形验证码

const captcha = require("trek-captcha");
router.get("/api/captcha", async ctx => {
  console.log("captcha:", ctx.session.captcha);
  const { token, buffer } = await captcha({ size: 4 });
  ctx.session.captcha = token;
  ctx.body = buffer;
});

// 短信验证码
router.get("/api/sms", async function(ctx) {
  console.log(ctx.query.to, "ctx.query.to");
  // 生成6位随机数字验证码
  let code = (Math.random() * 999999).toFixed();
  const to = ctx.query.to; // 目标手机号码
  const appid = "44404"; // 账号id
  const signature = "73174bb1c9b510580187235769dd0757";
  const project = "5HSjJ2";
  const vars = { code: code, time: "1分钟" };
  try {
    // 发送post请求
    const resp = await axios.post(
      "https://api.mysubmail.com/message/xsend.json", // 赛邮
      qs.stringify({
        to,
        appid,
        signature,
        project,
        vars: JSON.stringify(vars)
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    // console.log(resp, "resp");
    // if (resp.data.status === "success") {
      if (true) {
      // 短信发送成功，存储验证码到session，过期时间1分钟
      const expires = moment()
        .add(1, "minutes")
        .toDate();
      ctx.session.smsCode = { to, code, expires };
      console.log(ctx.session.smsCode, "ctx.session.smsCode");
      ctx.body = { ok: 1 };
    } else {
      ctx.body = { ok: 0, message: resp.data.msg };
    }
  } catch (e) {
    ctx.body = { ok: 0, message: e.message };
  }
});

// 注册
router.post("/api/register", async ctx => {
  let { username, password, phone } = ctx.request.body;
  // const { code, to, expires } = ctx.session.smsCode;
  console.log(ctx.session.smsCode, "ctx.session.smsCode");
  try {
    // 输入验证
    const { code, to, expires } = ctx.session.smsCode;
    console.log(ctx.session.smsCode, "ctx.session");
    ctx
      .validateBody("code")
      .required("必须提供短信验证码")
      .isString()
      .trim()
      .isLength(6, 6, "必须是6位验证码")
      .eq(code, "验证码填写有误")
      .checkPred(() => new Date() - new Date(expires) < 0, "验证码已过期"); // true通过 false错误
    password = genPassword(password);
    const sql = `insert into user (username,password,phone) values ('${username}','${password}','${phone}');`;
    const data = await exec(sql).then(res => {
      return {
        id: res.insertId
      };
    });
    if (data.id) {
      // 注册成功
      ctx.body = {
        code: 1,
        message: "注册成功",
        userId: data.id,
        status: "ok",
        currentAuthority: "user"
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        message: "注册失败"
      };
    }
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      console.log(error);
      ctx.status = 500;
      ctx.body = { ok: 0, message: error.message };
    } else {
      ctx.status = 500;
      ctx.body = { ok: 0, message: error.message };
    }
  }
});

// 登录
router.post("/api/login", async ctx => {
  let { username, password, captcha } = ctx.request.body;

  const { captcha:cap } = ctx.session;
  console.log(cap,captcha,'/??')
  if (cap!==captcha) {
    ctx.status = 500;
    ctx.body = {
      code: 0,
      message: "验证码错误"
    };
    return
  }

  password = genPassword(password);
  const sql = `select * from mywebpage.user where  username ='${username}' and password='${password}';`;
  const rows = await exec(sql);
  const data = rows[0] || {};
  console.log(data,'data+++')
  if (data.username) {
    ctx.session.id = data.id;
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: data.username }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    ctx.body = {
      code: 1,
      userInfo: { username: username },
      token
    };
  } else {
    ctx.status = 500;
    ctx.body = {
      code: 0,
      message: "用户名或者密码错误"
    };
  }
});

// github获取数据
router.get("/api/github/callback", async ctx => {
  const client_id = "cbd2ab3e42f181361a0a";
  const client_secret = "63a21e27625da408490212ca6fac2ee5844ea641";
  const code = ctx.query.code;
  let res = await axios.post("https://github.com/login/oauth/access_token", {
    client_id,
    client_secret,
    code
  });
  const access_token = res.data;
  let userInfo = await axios.get("https://api.github.com/user?" + access_token);
  // console.log(userInfo.data,'userInfo.data')
  let { name, html_url, avatar_url } = userInfo.data;
  const sql = `insert into user (username,html_url,avatar_url) values ('${name}','${html_url}','${avatar_url}');`;
  const data = await exec(sql).then(res => {
    return {
      id: res.insertId
    };
  });
  if (data.id) {
    ctx.session.id = data.id;
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: data.username }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    // ctx.redirect('http://127.0.0.1:5500/index.html?github=true&&username='+name+'&&token='+token+'&&avatar_url='+avatar_url)
    ctx.redirect(
      "http://www.rockshang.cn?github=true&&username=" +
        name +
        "&&token=" +
        token +
        "&&avatar_url=" +
        avatar_url
    );
  }
});

// 登录
// router.post("/api/h5login", async ctx => {
//   let { username, password } = ctx.request.body;
//   password = genPassword(password);
//   const sql = `select * from webpage.member where  username ='${username}' and password='${password}';`;
//   const rows = await exec(sql);
//   const data = rows[0] || {};
//   if (data.username) {
//     ctx.session.id = data.userId;
//     // 生成令牌  这个时候可以把用户id放入通过ctx.state.user获取到 不需要cookie/session存取id
//     const token = jwt.sign(
//       {
//         data: { name: data.realname, id:data.userId }, // 用户信息数据
//         exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
//       },
//       secret
//     );
//     ctx.body = {
//       code: 1,
//       token,
//       userId: data.id
//     };
//   } else {
//     ctx.status = 401;
//     ctx.body = {
//       code: 0,
//       message: "用户名或者密码错误"
//     };
//   }
// });

// 获得登录用户信息  // 查询单个用户信息
// router.get("/api/userinfo", jwtAuth({ secret }), async ctx => {
//   const userId =ctx.session.id;
//   let sql =  `select * from myblog.user where 1=1 and id=${userId};`;
//   const listData = await exec(sql).then(res => {
//     return res;
//   });

//   ctx.body = {
//     code: 1,
//     data: listData[0]
//   };
// });

// // 更新用户信息
// router.get("/api/updateInfo", jwtAuth({ secret }), async ctx => {
//   let { value } = ctx.query;
//   const { username, id } = JSON.parse(value);
//   const sql = `update user set username='${username}' where id=${id};`;
//   const result = await exec(sql);
//   if (result.affectedRows > 0) {
//     ctx.body = {
//       code: 1,
//       message: "更新成功"
//     };
//   }
// });

module.exports = router;
