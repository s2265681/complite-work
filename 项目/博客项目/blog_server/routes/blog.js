const router = require("koa-router")();
const path = require('path')

// const koaBody = require('koa-body');


const fs = require('fs')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

// list
router.get("/list", loginCheck, async (ctx, next) => {
  const author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

// detail
router.get("/detail", loginCheck, async (ctx, next) => {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(data);
});

// new
router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
});

// update
router.post("/update", loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  const data =  await updateBlog(ctx.query.id,body);
    if (data) {
      ctx.body = new SuccessModel(data)
      return;
    }
    ctx.body = new ErrorModel("修改博客失败")
});
// del
router.post("/del", loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const id =ctx.request.body.id;
  const data = await delBlog(id, author);
  if (data) {
    ctx.body = new SuccessModel(data)
    return;
  }
  ctx.body = new ErrorModel("删除博客失败")
});

 // 上传文件接口
 router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '../../blog_unload_Imgs') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  const baseUrl =  'https://blog.rockshang.cn/'+file.name
  // await next();
  return ctx.body = {
       filename:  baseUrl
  }
  // next()
  // await next();
});

//  router.post('/upload', async ctx => {
//    console.log(ctx,'ctx+++')

//   const form = new formidable.IncomingForm()
//   // 设置存储文件的目录
//   const imgPath = path.join(__dirname, '/img')
//   // 如果目录不存在则创建
//   if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
//   form.uploadDir = imgPath
//   // 上传文件大小限制
//   form.maxFieldsSize = 20 * 1024 * 1024

//   let result = await new Promise(r => {
//       form.parse(ctx.req, function (err, fields, files) {
//           if (err) {
//               r({ err })
//           } else {
//             // console.log(fields,'fields')
//             // console.log(files,'files')
//             // console.log(files.file,'files.file')
//             // console.log(files.upload,'files.upload')
//             // console.log(files.file.name,'files.file.name')
//             // console.log(files.File.name,'File.name:')

//               // 手动给文件加后缀, formidable默认保存的文件是无后缀的
              
//               let newPath = files.file.path + '_' + files.file.name
//               // fs.renameSync(files.file.File.path, newPath)
//               r({ path: newPath })
//           }
//       })
//   })

//   // console.log(result,'results')


// })

module.exports = router;
