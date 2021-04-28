const Router = require("koa-router");
const router = new Router({ prefix: "/api/member" });
const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String
});
const Model = mongoose.model("member", schema);

// 上传图片
const upload = require("koa-multer")({ dest: "./public/images" });

router.post("/posts", upload.single("file"), ctx => {
  console.log("file", ctx.req.file);
  //  console.log('body',ctx.req.body)
  //  地址写入数据库  imageUrl: "http://localhost:3001/images/1fbf4d9c284d8da69e6a648a55e3bf85"
  ctx.body = "上传成功";
});

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

router.get("/", async ctx => {
  const { name } = ctx.query;
  let result = name ? await Model.find({ name: name }) : await Model.find();
  ctx.body = {
    ok: 1,
    data: result
  };
});

router.post("/", vali, async ctx => {
  const { name } = ctx.request.body;
  const r = await Model.create({
    name: name
  });

  // console.log(r,'rr')
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
