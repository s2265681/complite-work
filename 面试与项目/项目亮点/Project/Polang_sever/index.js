const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(cors());
app.listen(process.env.PORT || 5001);
app.use(bodyParser.urlencoded({ extended: true }));

const CLIENT_KEY = "awmytdmj7dyr2w28"; // this value can be found in app's developer portal
const CLIENT_SECRET = "f351da58ba9a8a71dcef14184724835b";
// 去获取 access_token
// 通过 csrfstate 保证发送和收到的是一致的
const SERVER_ENDPOINT_REDIRECT = "https://www.kalodata.com/tiktok/";

// 1、通过令牌获取 code
//https://www.kalodata.com/oauth
app.get("/oauth", (req, res) => {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("csrfState", csrfState, { maxAge: 60000 });
  let url = "https://www.tiktok.com/v2/auth/authorize/";
  // the following params need to be in `application/x-www-form-urlencoded` format.
  url += `?client_key=${CLIENT_KEY}`;
  url += "&scope=user.info.basic,user.info.profile";
  url += "&response_type=code";
  url += `&redirect_uri=${SERVER_ENDPOINT_REDIRECT}`;
  url += "&state=" + csrfState;
  res.redirect(url);
});

// 代理 https://www.kalodata.com/tiktok/ http://127.0.0.1:5001/tiktok/
// 2、通过 code 去获取 access_token Fetch an access token using an authorization code
app.get("/tiktok", (req, res) => {
  const { code, scopes, state } = req.query;
  console.log(code, "code111");
  let url = "https://open.tiktokapis.com/v2/oauth/token/";
  const formData = new URLSearchParams();
  formData.append("client_key", CLIENT_KEY);
  formData.append("client_secret", CLIENT_SECRET);
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", SERVER_ENDPOINT_REDIRECT);
  formData.append('code_verifier', 'Required for mobile app only'); //APP 端使用
  fetch(url, {
    method: "POST",
    body: formData.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("POST request failed");
    })
    .then(async (responseData) => {
      if (responseData.access_token) {
        let result = await getUserInfo(responseData.access_token);
        res.end(result);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// 3、 拿到asscess_token 去获取用户信息 // act.8796187bbdc1e7410e55619cc7ee87675jIyQlurmGivRt7gy6uRkopBkdBD!5453
const getUserInfo = async (access_token) => {
  console.log(access_token,'access_token;11111;')
  const bearer_access_token = `Bearer ${access_token}`;
  let url = `https://open.tiktokapis.com/v2/user/info/`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer_access_token,
    },
  })
    .then((res) => {
      console.log(res,'resLLLLL')
     return res.text()
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
