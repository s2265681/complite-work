// server.js
const express = require('express');
const axios = require('axios');
const session = require('express-session');
const cors = require('cors');

const APP_ID = 'wx7e2f59ab95a9081f';
const APP_SECRET = '4ad828b563537894ca5a538aa3857b9c';
const REDIRECT_URI = 'http://localhost:5501/auth/wechat-callback';

const app = express();

// 中间件配置
app.use(cors({ origin: 'http://localhost:5501', credentials: true, allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // 静态文件目录
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// 生成随机state
const generateState = () => Math.random().toString(36).substring(7);

// 获取微信登录二维码地址
app.get('/auth/wechat-qrcode', (req, res) => {
  const state = generateState();
  req.session.state = state;
  console.log('AAAAAA')
  const authUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;
  res.json({ url: authUrl, state });
});

// 微信回调处理
app.get('/auth/wechat-callback', async (req, res) => {
  const { code, state } = req.query;
  
  // 验证state
  if (state !== req.session.state) {
    return res.status(400).send('Invalid state');
  }

  try {
    // 获取access_token
    const tokenRes = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`);
    
    const { access_token, openid } = tokenRes.data;
    
    // 获取用户信息
    const userRes = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`);
    const userInfo = userRes.data;

    // 这里处理用户登录/注册逻辑
    // 生成JWT或Session
    req.session.user = userInfo;
    
    res.redirect('http://localhost:5501/login-success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Authentication failed');
  }
});

// 检查登录状态
app.get('/auth/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));