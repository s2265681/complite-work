"use strict";
const Koa = require("koa");
const Router = require("koa-router");
const send = require("koa-send");
const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const axios = require("axios");

const APP_ID = "wx01c45b63824bfb0c";
const APP_SECRET = "46b34ae0435fd5f277366082c8b84054";
// const TOKEN = "test666";
const TOKEN = "";

let needRefresh = true; // 是否需要刷新凭证

const app = new Koa();

const prefix = "/wechat";
const reg = new RegExp("^/wechat/(.*)$");
const root = __dirname + "/public";

const router = new Router({ prefix });

/**
 * 加密/校验流程如下：
 * 1）将token、timestamp、nonce三个参数进行字典序排序
 * 2）将三个参数字符串拼接成一个字符串进行sha1加密
 * 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
 */
router.get("/verify", async (ctx) => {
  log2file(`ctx.query:${JSON.stringify(ctx.query)}`);
  const timestamp = ctx.query.timestamp;
  const nonce = ctx.query.nonce;
  const shasum = crypto.createHash("sha1");
  shasum.update([TOKEN, timestamp, nonce].sort().join(""));
  const generatedSignature = shasum.digest("hex");
  if (generatedSignature === ctx.query.signature) {
    // 来自微信服务器
    log2file(`verify ok`);
    ctx.body = ctx.query.echostr;
  } else {
    ctx.body = "fail";
  }
});

/**
 * 授权页面
 */
router.get("/authorize", async (ctx) => {
  const callbackUrl = encodeURIComponent(
    "http://2dr9486273.wicp.vip/api/passport/wechat-checkSignature"
  );
  ctx.redirect(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  );
});

/**
 * 获取用户openid（微信回调地址）
 */
router.get("/get_user_openid", async (ctx) => {
  const code = ctx.query.code;
  log2file(`code:${code}`);
  const openId = await getUserOpenId(code);
  log2file(`openId:${openId}`);
  // 用户openid获取成功写入cookie，重定向到首页
  ctx.cookies.set("openid", openId, {
    path: "/",
    httpOnly: false,
    expires: new Date("2222-12-12"),
  });
  ctx.redirect("/wechat/index.html");
});

/**
 * 校验用户accessToken是否失效
 */
router.get("/check_user_access_token", async (ctx) => {
  const openId = ctx.cookies.get("openid", { path: "/" });
  const res = await checkPageAccessToken(openId);
  ctx.body = res;
});

/**
 * 根据cookie里的openid获取用户信息
 */
router.get("/get_user_info", async (ctx) => {
  const openId = ctx.cookies.get("openid", { path: "/" });
  const accessToken = openId2accessToken[openId];
  let userInfo = null;
  // 检测授权凭证是否失效
  const res = await checkPageAccessToken(openId);
  if (res.errcode !== 0) {
    log2file(`page access token invalidate:${openId}, ${accessToken}`);
    await refreshPageAccessToken();
  }
  userInfo = await getUserInfo(openId, accessToken);
  ctx.body = userInfo;
});

/**
 * 获取公众号二维码
 */
router.get("/get_user_code", async (ctx) => {
  // 获取 access_token
  //  let apiAccessToken =  await getAccessToken()
  //  console.log(apiAccessToken)
  //  ctx.body = apiAccessToken
  const accessToken = await getApiAccessToken();
  const ticketData = await getTicket(accessToken);
  const ticket = ticketData.data.ticket;
  const data = {
    url: "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket,
    message: "二维码图片",
    code: 200,
  };
  ctx.body = data;
});

/**
 * 页面获取微信配置
 */
router.get("/get_config", async (ctx) => {
  const url = decodeURIComponent(ctx.query.url);
  // 获取jsapi_ticket
  const accessToken = await getApiAccessToken();
  const ticket = await getTicket(accessToken);
  // 生成签名
  const timestamp = Date.now(); // 时间戳
  const nonceStr = Math.random().toString(36).substr(2, 15); // 随机字符串

  const tempString =
    "jsapi_ticket=" +
    ticket +
    "&noncestr=" +
    nonceStr +
    "&timestamp=" +
    timestamp +
    "&url=" +
    url;
  const shasum = crypto.createHash("sha1");
  shasum.update(tempString);
  const signature = shasum.digest("hex");
  ctx.body = {
    appId: APP_ID,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
  };
});

app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx) => {
  await send(ctx, ctx.path.replace(reg, "/$1"), { root });
});

// openid和授权凭证/刷新token的映射，代替数据库
const openId2accessToken = {};
const openId2refreshToken = {};

/**
 * 根据授权回调code获取用户授权凭证access_token和用户openID
 * @returns {Promise}
 */
function getUserOpenId(code) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`,
      function (req, res) {
        let jsonStr = "";
        req.on("data", function (data) {
          jsonStr += data;
        });
        req.on("end", function () {
          log2file(`getUserOpenId:${jsonStr}`);
          const res = JSON.parse(jsonStr);
          const openId = res.openid;
          const pageAccessToken = res.access_token;
          if (openId && pageAccessToken) {
            // TODO 超时后刷新token
            // setTimeout(() => {
            //     refreshPageToken()
            // }, res.expires_in)
            log2file(`getUserOpenId:${JSON.stringify(res)}`);
            openId2accessToken[openId] = pageAccessToken;
            openId2refreshToken[openId] = res.refresh_token;
            resolve(openId);
          } else {
            reject(`openId or accessToken empty:${openId},${pageAccessToken}`);
          }
        });
      }
    );
  });
}

/**
 * 获取网页授权凭证access_token和用户openID
 * @returns {Promise}
 */
function getUserInfo(openId, accessToken) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`,
      function (req, res) {
        let jsonStr = "";
        req.on("data", function (data) {
          jsonStr += data;
        });
        req.on("end", function () {
          log2file(`getUserInfo:${jsonStr}`);
          resolve(JSON.parse(jsonStr));
        });
      }
    );
  });
}

/**
 * 获取接口调用凭证accessToken（全局使用，accessToken用于获取jsapi_ticket，jsapi_ticket用于生成权限签名）
 * @returns {Promise}
 */
function getApiAccessToken() {
  let apiAccessToken = ""; // 凭证
  needRefresh = true;
  if (fs.existsSync("./api-access-token.txt")) {
    // 从文件系统中获取（代替数据库）
    let jsonData = fs.readFileSync("./api-access-token.txt", {
      flag: "r",
      encoding: "utf8",
    });
    log2file(`getApiAccessToken cached:${jsonData}`);
    if (jsonData) jsonData = JSON.parse(jsonData);
    apiAccessToken = jsonData.accessToken;
    const expiresAt = jsonData.expiresAt;
    // 如果没过期不需要重新获取
    if (expiresAt > Date.now()) {
      needRefresh = false;
    }
  }

  if (needRefresh) {
    // 从微信服务器中获取
    return new Promise((resolve, reject) => {
      let apiAccessToken = "";
      https.get(
        "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
          APP_ID +
          "&secret=" +
          APP_SECRET,
        function (req, res) {
          let jsonStr = "";
          req.on("data", function (data) {
            jsonStr += data;
          });
          req.on("end", function () {
            log2file(`refresh apiAccessToken:${jsonStr}`);
            const ret = JSON.parse(jsonStr);
            apiAccessToken = ret.access_token;
            const expiresAt = Date.now() + ret.expires_in * 1000; // 设置失效时间
            if (apiAccessToken) {
              // 将凭证和失效时间覆盖写入文件系统
              fs.writeFileSync(
                "./api-access-token.txt",
                JSON.stringify({ accessToken: apiAccessToken, expiresAt }),
                { flag: "w", encoding: "utf8" }
              );
              resolve(apiAccessToken);
            } else {
              reject("apiAccessToken empty:" + apiAccessToken);
            }
          });
        }
      );
    });
  } else {
    return Promise.resolve(apiAccessToken);
  }
}

/**
 * 检测用户的页面授权凭证是否失效
 */
function checkPageAccessToken(openId) {
  const pageAccessToken = openId2accessToken[openId];
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.weixin.qq.com/sns/auth?access_token=${pageAccessToken}&openid=${openId}`,
      function (req, res) {
        let jsonStr = "";
        req.on("data", function (data) {
          jsonStr += data;
        });
        req.on("end", function () {
          log2file(`checkPageAccessToken:${jsonStr}`);
          const res = JSON.parse(jsonStr);
          if (res["errcode"] === 0) {
            resolve(res);
          } else {
            resolve(res);
          }
        });
      }
    );
  });
}

/**
 * 刷新授权凭证
 */
function refreshPageAccessToken(openId) {
  const refreshToken = openId2refreshToken[openId];
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${APP_ID}&grant_type=refresh_token&refresh_token=${refreshToken}`,
      function (req, res) {
        let jsonStr = "";
        req.on("data", function (data) {
          jsonStr += data;
        });
        req.on("end", function () {
          log2file(`refreshPageAccessToken:${jsonStr}`);
          const res = JSON.parse(jsonStr);
          openId2accessToken[openId] = res.access_token;
          openId2refreshToken[openId] = res.refresh_token;
          resolve();
        });
      }
    );
  });
}

/**
 * 获取缓存中的ticket
 * @param {boolean} accessToken
 * @returns {Promise}
 */
function getTicket(accessToken) {
  if (!needRefresh && fs.existsSync("./ticket.txt")) {
    // 从文件系统中获取
    const ticket = fs.readFileSync("./ticket.txt", {
      flag: "r",
      encoding: "utf8",
    });
    log2file(`get cached ticket: ${ticket}`);
    return Promise.resolve(ticket);
  }
  // 从微信服务器中获取
  else {
    return new Promise((resolve, reject) => {
      https.get(
        "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" +
          accessToken +
          "&type=jsapi",
        function (req, res) {
          let jsonStr = "";
          req.on("data", function (data) {
            jsonStr += data;
          });
          req.on("end", function () {
            log2file(`refresh ticket:${jsonStr}`);
            const ticket = JSON.parse(jsonStr)["ticket"];
            if (ticket) {
              fs.writeFileSync("./ticket.txt", ticket, {
                flag: "w",
                encoding: "utf8",
              });
              resolve(ticket);
            } else {
              reject("ticket empty:" + ticket);
            }
          });
        }
      );
    });
  }
}

/**
 * 获取公众号带参二维码
 * @param {} accessToken
 * @returns {Promise}
 */
function getTicket(accessToken) {
  console.log(accessToken, "accessToken...");
  var url =
    "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" +
    accessToken;
  var params = {
    action_name: "QR_LIMIT_SCENE",
    action_info: { scene: { scene_id: "123" } },
  };
  return axios.post(url, params);
}

function log2file(log) {
  fs.writeFileSync(
    "./std-console.txt",
    `${new Date().toLocaleTimeString()} : ${log}\n`,
    { flag: "a", encoding: "utf8" }
  );
}

app.listen(4001);

function post(url, data, fn) {
  data = data || {};
  var content = require("querystring").stringify(data);
  var parse_u = require("url").parse(url, true);
  var isHttp = parse_u.protocol == "http:";
  var options = {
    host: parse_u.hostname,
    port: parse_u.port || (isHttp ? 80 : 443),
    path: parse_u.path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": content.length,
    },
  };
  var req = require(isHttp ? "http" : "https").request(options, function (res) {
    var _data = "";
    res.on("data", function (chunk) {
      _data += chunk;
    });
    res.on("end", function () {
      fn != undefined && fn(_data);
    });
  });
  req.write(content);
  req.end();
}
