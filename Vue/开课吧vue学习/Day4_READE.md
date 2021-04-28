## 04day-- 目标  vue-项目实战1  
**->cube-ui**

 - 适合的ui库 （移动端cube-ui pc element-ui）
 - 扩展性
 - 登录页面 检查点
 - http拦截器 深入理解令牌机制
 - 注销
 - 安装自定义字体 npm install less less-loader --save-dev  


 ## 选择一个合适的ui库
![市面上的ui库](https://img-blog.csdnimg.cn/20191111114902881.png)

 - VUX: https://vux.li/ 一个凑合的 Vue.js 移动端 UI 组件库

 - Mint UI 基于 Vue.js 的移动端组件库
 
 - 推荐 Cube-ui 滴滴 https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start
 - https://didi.github.io/cube-ui/#/zh-CN

 - 推荐 vant 有赞 https://youzan.github.io/vant/#/zh-CN/intro

 ## 

## 基于vue，cube-ui的移动端框架
```
vue create cube-ui
cd cube-ui
vue add router
vue add vuex
vue add cube-ui
npm run serve

```

## 扩展性
任何UI库都不能完全满足开发需求，需要自己定制化开发

## 登录页面
vue add router
vue add vuex

## 令牌验证机制
客户端--->服务器  如果客户端没有令牌，给回一个401状态码，
客户端去登录---获得token，存到cookie或者localStory里面--->服务端 返回


## http拦截器
每次请求都携带令牌
创建一个axios的拦截器


## 注销  -> app.vue 
- 清楚token缓存的两种情况
  - 1、 主动注销
  - 2、 token过期

- 需要做的事情
  - 1、清空缓存
  - 2、重置登录状态

## http拦截响应
统一处理401状态吗，清理token跳转login

## 深入令牌机制
**前端 Bearer Token规范**
- 概念：描述在HTTP访问OAuth2保护自愿时如何使用令牌的规范
- 特点：令牌就是身份证明，无需证明令牌的所有权
- 具体规定：在请求头中定义Authorization:Bear < token >

**json Web Token**
- 概念：令牌具体定义方式
- 规定：令牌由三部分构成“头.载荷.签名”
- 头：包含加密算法、令牌类型等信息
- 载荷：包含用户信息、签发时间和过期时间等信息
- 签名：根据头、载荷及迷药加密得到的哈希串Hmac Shal 256
- token:加密防篡改
<!-- https://jwt.io/ -->

## 配置代理服务器
- 修改配置文件，启用开发服务器代理，vue.config.js
```
 devServer:{
     //代理配置
     proxy:{
         "/api":{
             target:"http://127.0.0.1:3000",
             changOrigin:true
         }
     },
     // before(app){...}  
 }

```

## 真实数据
- service--> service.js
- node service/service.js

- 跨域： 挡在浏览器中发送请求的适合只要三端（协议名，端口号，域名）不同，浏览器会拒绝你的请求，
- 解决跨域的方案，
  配置代理，
  cors
- 部署到服务器上一般都是nginx反向代理 就不存在跨域问题了

promise 简单来讲 做一些异步操作，异步操作的同步化，在.then中去得到异步请求的结果，.catch中捕获异常，

Promise.resove("返回成功") Promise.reject("返回失败")