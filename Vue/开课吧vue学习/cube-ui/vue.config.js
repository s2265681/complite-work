module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: []
      }
    } 
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      //代理配置
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000/",
          changOrigin: true
        }
      },
      // before这里可以模拟express后殿接口
      // before(app) {
      //   // 模拟后台服务器 express 写法
      //   app.get("/api/login", function(req, res) {
      //     const { username, passwd } = req.query;
      //     // console.log(username,passwd);
      //     if (username == "kaikeba" && passwd == "123") {
      //       res.json({ code: 1, token: "jilei" });
      //     } else {
      //       res.status(401).json({ code: 0, message: "用户名或者密码错误" });
      //     }
      //   });

      //   // 保护接口的中间间
      //   function auth(req, res, next) {
      //     if (req.headers.token) {
      //       // 已认证
      //       next();
      //     } else {
      //       // 用户未授权
      //       res.sendStatus(401);
      //     }
      //   }

      //   // 获取登录用户的信息
      //   app.get("/api/userinfo", auth, function(req, res) {
      //     res.json({
      //       code: 1,
      //       data: {
      //         name: "tom",
      //         age: 20
      //       }
      //     });
      //   });
      // }

    }
  }
};
