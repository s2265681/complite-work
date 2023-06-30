CSRF 跨域请求伪造

B 页面 通过 cookie 鉴权后， 通过接口可以， 拿到 B 服务器上的数据， 或者修改数据

A 页面 正常是 无法拿到 B 服务器上的数据的， 因为会存在跨域问题， 然后跨域是否能携带 cookie

现在

参考
[前端必备的 Web 安全知识](https://juejin.cn/post/7246204866035974199)

A 分别 为 伪造者网站， B 为正常网站

A1 和 B1 页面： 实现伪造登录 获取用户 cookie

A2 和 B2 页面： 实现注入脚本 实现 iframe 的 postmessage 获取 cookie 或者 document.cookie 拿 cookie 发送回 A 页面

A3 和 B3 实现 jsonp 劫持 漏洞
