# 实现单点登录

重要的就是解决跨域的 cookie 共享问题

其实可以使用两个站点之间，通讯的方式共享 cookie 如，
1、 jsonp A 站点和 B 站点都去 B 服务器上获取 cookie
2、 postmessage A、B 站点通讯，共享 cookie
3、 samesit：none 设置 cookie 的共享 （不是很安全）
4、 JWT 通过 header 头传递
