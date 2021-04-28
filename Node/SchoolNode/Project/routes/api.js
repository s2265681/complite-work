const Router = require("koa-router");
const router = new Router({ prefix: "/api" }); // 图形验证码
const captcha = require("trek-captcha");

router.get("/captcha", async ctx => {
  console.log("captcha:", ctx.session.captcha);
  const { token, buffer } = await captcha({ size: 4 });
  ctx.session.captcha = token;
  ctx.body = buffer;
});

router.post("/submit", async ctx => {
  const { val } = ctx.request.body;
  const { captcha } = ctx.session;
  if (val === captcha) {
    ctx.body = "登录成功";
  } else {
    ctx.body = "登录失败";
  }
});

const moment = require("moment");
const md5 = require("md5");
const axios = require("axios");
const qs = require("querystring");
const bouncer = require("koa-bouncer");
// 短信验证码
router.get("/sms", async function(ctx) {
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
    console.log(resp, "resp");
    if (resp.data.status === "success") {
      // 短信发送成功，存储验证码到session，过期时间1分钟
      const expires = moment()
        .add(1, "minutes")
        .toDate();
      ctx.session.smsCode = { to, code, expires };
      ctx.body = { ok: 1 };
    } else {
      ctx.body = { ok: 0, message: resp.data.msg };
    }
  } catch (e) {
    ctx.body = { ok: 0, message: e.message };
  }
});

// 注册登录
router.post("/register", async ctx => {
  console.log(ctx.request.body.code, "co");
  try {
    // 输入验证
    const { code, to, expires } = ctx.session.smsCode;
    ctx
      .validateBody("phone")
      .required("必须提供手机号")
      .isString()
      .trim()
      .match(/1[3-9]\d{9}/, "手机号不合法")
      .eq(to, "请填写接收短信的手机号");
    ctx
      .validateBody("code")
      .required("必须提供短信验证码")
      .isString()
      .trim()
      .isLength(6, 6, "必须是6位验证码")
      .eq(code, "验证码填写有误")
      .checkPred(() => new Date() - new Date(expires) < 0, "验证码已过期"); // true通过 false错误
    ctx
      .validateBody("password")
      .required("必须提供密码")
      .isString()
      .trim()
      .match(/[a-zA-Z0-9]{6,16}/, "密码不合法");
    // 入库, 略
    ctx.body = { ok: 1 };
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      console.log(error);
      ctx.status = 401;
    } else {
      ctx.status = 500;
    }
    ctx.body = { ok: 0, message: error.message };
  }
});

// 验证吗登录
router.post("/smslogin", async ctx => {
  const { code, phone } = ctx.request.body;
  const { smsCode } = ctx.session;
  if (smsCode.to === phone && smsCode.code === code) {
    ctx.body = "登录成功";
  } else {
    ctx.body = "登录失败";
  }
});

module.exports = router;
