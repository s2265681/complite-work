# 06 Koa实战 - Restful API - 及常见任务

### 目标

- <a href="#1">编写RESTful API</a>
- <a href="#2">文件上传</a>
- <a href="#3">表单校验</a>
- <a href="#4">图形验证码</a>
- <a href="#5">发送短息</a>
- <a href="#6">案例：用户注册</a>

### <a name="1">编写RESTful API</a>

- Respresentational State Transfer翻译过来就是“表现层状态转化”，是一种互联网软件的架构原则，因此符合REST风格的Web API设计，就成它为RESTful API
- RESTful特征：
  - 每一个URL代表一种资源（Resources），比如：http：localhost:8000/courses
  - 客户端与服务器之间，传递这种资源的某种表现层，比如：localhost:8000/courses/web
  - 客户端通过HTTP动词，对服务端资源进行操作，实现“表现层状态的转化”
- [思维导图](https://www.processon.com/view/link/5cbfb934e4b09a3e45a8c60e#map)
- ![image-20191210175705528](/Users/shangjiawei/Library/Application Support/typora-user-images/image-20191210175705528.png)

      ```html
// restful.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>restful</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    />
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  </head>
  <body>
    <div id="app">
      <div style="display:flex;flex-direction:column">
        <el-input
          v-model="form.name"
          placeholder="姓名"
          autocomplete="off"
        ></el-input>
        <el-button @click="get">GET</el-button>
        <el-button @click="post">POST</el-button>
        <el-button @click="del">DELETE</el-button>
        <el-button @click="put">PUT</el-button>
        <el-button @click="logs=[]">clearLog</el-button>
      </div>
      <!--日志-->
      <ul>
        <li v-for="(log,idx) in logs" :key="idx">
          {{ log }}
        </li>
      </ul>
    </div>
    <script>
      axios.defaults.baseURL = "http://localhost:3001/api";
      axios.interceptors.response.use(
        response => {
          app.logs.push(JSON.stringify(response.data));
          return response;
        },
        err => {
          app.log.push(JSON.stringify(response.data));
          return Promise.reject(err);
        }
      );
    </script>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          form: {
            name: ""
          },
          logs: []
        },
        created() {},
        methods: {
          async post() {
            let res = await axios.post("/member", this.form);
          },
          get: async function() {
            let res = await axios.get("/member?name=" + this.form.name);
          },
          async put() {
            await axios.put("/member/2", this.form);
          },
          async del() {
            let res = await axios.delete("/member/" + this.form.name);
          }
        },
        mounted: function() {}
      });
    </script>
  </body>
</html>

      ```

```js
// member.js
const Router = require("koa-router");
const router = new Router({ prefix: "/api/member" });
const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String
});
const Model = mongoose.model("member", schema);
router.get("/", async ctx => {
  const { name } = ctx.query;
  let result = name ? await Model.find({ name: name }) : await Model.find();
  ctx.body = {
    ok: 1,
    data: result
  };
});

router.post("/", async ctx => {
  const { name } = ctx.request.body;
  const r = await Model.create({
    name: name
  });
  if (r._id) {
    ctx.body = {
      ok: 1,
      data: "插入成功"
    };
  } else {
    ctx.body = {
      ok: 1,
      data: "插入失败"
    };
  }
});

router.put("/:id", async ctx => {
  const { name } = ctx.request.body;
  const id = ctx.params;
  const name1 = await Model.find();
  const r = await Model.updateOne(
    { name: name1[0].name },
    { $set: { name: name } }
  );
  if (r.nModified) {
    ctx.body = {
      ok: 1,
      data: "修改成功"
    };
  } else {
    ctx.body = {
      ok: 1,
      data: "修改失败"
    };
  }
});

router.delete("/:name", async ctx => {
  const { name } = ctx.params;
  const r = await Model.deleteOne({ name: name });
  if (r.deletedCount) {
    ctx.body = {
      ok: 1,
      data: "删除成功"
    };
  } else {
    ctx.body = {
      ok: 0,
      data: "删除失败"
    };
  }
  // const idx = users.findIndex(el=>el.id===id)
  // if(idx>-1){ // 修改
  //   users[idx] = name
  // }
  // if(idx>-1){  // 删除
  //   users.splice(idx,1)
  // }
});

module.exports = router;

```

### 解决跨域

> npm i koa2-cors

```js
const cors = require('koa2-cors')
app.use(cors())
//替代
// app.all('*', function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    res.header('Access-Control-Allow-Methods', '*');
//    res.header('Content-Type', 'application/json;charset=utf-8');
//    res.header('Access-Control-Allow-Credentials','true');
//    next();
//  });
```

![image-20191210181954075](/Users/shangjiawei/Library/Application Support/typora-user-images/image-20191210181954075.png)



### <a id="2">上传文件</a>

> npm i koa-multer

```js
// member.js
const upload = require('koa-multer')({dest:'./public/images'})
router.post('./upload',upload.single('file'),ctx => {
   console.log('file',ctx.req.file)
   console.log('body',ctx.req.body)
  //  地址写入数据库  imageUrl: "http://localhost:3001/images/1fbf4d9c284d8da69e6a648a55e3bf85"
   ctx.body = '上传成功'
})
```

```html
// upload.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>upload</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    />
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
  </head>
  <style>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  </style>
  <body>
    <div id="app">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3001/api/member/posts"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <script>
      // axios.defaults.baseURL = "http://localhost:3001";
    </script>
    <script>
      const app = new Vue({
        el: "#app",
        data: {
          imageUrl: "http://localhost:3001/images/1fbf4d9c284d8da69e6a648a55e3bf85"
        },
        methods: {
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
              this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
              this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
          }
        }
      });
    </script>
  </body>
</html>

```

http://localhost:3001/upload.html

可以通过设置limits、fileFilter、storage等限制文件大小、存储目录和文件名等。

### <a id="3">表单校验</a>

- 安装        

  >  npm i -S Koa-bouncer

- 配置：app.js

  ```js
  // index.js
  // 为koa上下文扩展一些校验方法
  const bouncer = require("koa-bouncer");
  app.use(bouncer.middleware());
  ```

- 基本使用 member.js

  ```js
  // 一个校验中间件
  const bouncer = require("koa-bouncer");
  const vali = async (ctx, next) => {
    const isUser = name => Promise.resolve(name === "abc");
    const checkName = name =>
      Model.findOne({ $where: `this.name =='${name}'` }).exec();
    // console.log(checkName,'checkName')
    try {
      ctx
        .validateBody("name")
        .required("要求提供用户名")
        .isLength(1, 16, "用户长度应该为1-16")
        .isString() // 变为字符串 才可以用trim()
        .trim() // 修改后的结果会存在ctx.vals里
        .check((await checkName(ctx.vals.name)) == null, "用户名已存在");
      // .check(await isUser(ctx.vals.name) , "Check 不 Ok")
      console.log(ctx.vals, "vals");
      // ctx.validateBody('email')
      //   .optional()
      //   .isString()
      // .trim()
      // .isEmail('非法的邮箱格式')
      // .validateBody("pwd2") .required("密码确认为必填项") .isString()
      // .eq(ctx.vals.pwd1, "两次密码不一致");
      // 校验数据库是否存在相同值
      // ctx.validateBody('uname')
      // .check(await db.findUserByUname(ctx.vals.uname), 'Username taken') ctx.validateBody("uname").check("jerry", "用户名已存在");
      // 如果走到这里校验通过
      // 校验器会用净化后的值填充 `ctx.vals` 对象
      await next();
    } catch (error) {
      if (error instanceof bouncer.ValidationError) {
        ctx.body = { msg: `校验错误${error.message}` };
        return;
      }
      throw error;
    }
  };
  
  ```

  

### <a id="4">图形验证码</a>

- 安装     

  >    trek-captcha: npm i trek-captcha -S

- 使用route/api.js

  ```js
  const Router = require("koa-router");
  const router = new Router({ prefix: "/api" });
  // 图形验证码
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
  
  module.exports = router;
  
  ```

  ```html
  // Upload.html
  <img src="http://localhost:3001/api/captcha" id="captcha" />
      <input type="text" id="inp" />
      <button onclick="sumbit()">提交</button>
      <span id="show" style="color:#f00"></span>
      <script>
        // axios.defaults.baseURL = "http://localhost:3001";
      </script>
      <script>
        document.getElementById("captcha").onclick = function() {
          captcha.src = "http://localhost:3001/api/captcha?r=" + Date.now();
        };
  
        function sumbit() {
          const val = document.getElementById("inp").value;
          axios.post("/api/submit", { val: val }).then(res => {
            document.getElementById("show").innerText = res.data;
          });
        }
      </script>
  ```

  

  ![image-20191212172807145](/Users/shangjiawei/Library/Application Support/typora-user-images/image-20191212172807145.png)

     ###   <a id="5">发送短信</a>

​     [赛邮](https://www.mysubmail.com/)

-  安装依赖: npm i -S moment md5 axios

- 接口编写，./routes/api.js

  

  ```js
  
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
  ```

  ```html
  // Upload.html
   <span id="show" style="color:#f00"></span>
      <!-- 短信验证码 -->
      <input type="text" id="phone" placeholder="请输入手机号"/>
      <button onclick="sms()" >发送验证码</button>
      <script>
        // 发送验证码
        function sms() {
          const phone = document.getElementById("phone").value;
          axios.get("/api/sms?to="+phone).then(res => {
          });
        }
      </script>
  ```

  

### <a id="6">完成注册</a>

- http://localhost:3001/register.html

- ![image-20191213145556822](/Users/shangjiawei/Library/Application Support/typora-user-images/image-20191213145556822.png)

```html
// register.html
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/element-ui/lib/index.js"></script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <link
        rel="stylesheet"
        href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
      />
      <style></style>
      <title>文件上传</title>
    </head>
    <body>
      <div id="app">
        <el-form :model="regForm" ref="regForm">
          <el-form-item>
            <el-input
              type="tel"
              v-model="regForm.phone"
              autocomplete="off"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="text"
              v-model="regForm.captcha"
              autocomplete="off"
              placeholder="图形验证码"
            ></el-input>
            <img :src="captchaSrc" @click="getCaptcha" />
          </el-form-item>
          <el-form-item>
            <el-input
              type="text"
              v-model="regForm.code"
              autocomplete="off"
              placeholder="短信验证码"
            ></el-input>
            <el-button type="primary" @click="getSmsCode()"
              >获取短信验证码
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="regForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <script>
        axios.defaults.baseURL = "http://localhost:3001";
        var app = new Vue({
          el: "#app",
          data() {
            return {
              regForm: {
                phone: "",
                captcha: "",
                code: "",
                password: ""
              },
              captchaSrc: "http://localhost:3001/api/captcha"
            };
          },
          methods: {
            getCaptcha() {
              this.captchaSrc = "http://localhost:3001/api/captcha?r=" + Date.now();
            },
            getSmsCode() {
              axios
                .get("/api/sms?to=" + this.regForm.phone)
                .then(res => res.data)
                .then(({ code }) => (this.regForm.code = code));
            },
            submitForm() {
              axios
                .post("/api/register", this.regForm)
                .then(() => alert("注册成功"))
                .catch(error =>
                  alert("注册失败:" + error.response.data.message)
                );
            }
          }
        });
      </script>
    </body>
  </html>

```

```js
//api.js
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

```



[项目GitHub地址](https://github.com/s2265681/SchoolNode/tree/master/Project)