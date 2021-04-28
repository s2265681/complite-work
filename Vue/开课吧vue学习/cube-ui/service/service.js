const Koa = require("koa");
const Router = require("koa-router");
// 生成令牌、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const { genPassword } = require("./cryp");


// 链接数据库
const mysql = require("mysql");
const con = mysql.createConnection({
    host:'39.96.71.193',
    user:'root',
    password:'shang5036',
    port:'3306',
    database:'myblog'
})

// 开始链接
con.connect();

// 生成数字签名的密钥
const secret = "34323566";
const app = new Koa();
const router = new Router();

// 统一执行 sql函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

// 注册
router.get("/api/register", async ctx => {
  let { username, password,realname } = ctx.query;
  password = genPassword(password);
  const sql = `insert into users (username,password,realname) values ('${username}','${password}','${realname}');`;
  const data = await exec(sql).then(res => {
    return {
      id: res.insertId
    };
  })
  // console.log(data,'data');
  if(data.id) {
    // 注册成功
    ctx.body = {
      code: 1,
      message: "注册成功",
      userId:data.id
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 0,
      message: "注册失败"
    };
  }
});

// 登录
router.get("/api/login", async ctx => {
  let { username, passwd } = ctx.query;
  passwd = genPassword(passwd);
  const sql = `select * from users where  username ='${username}' and password='${passwd}';`;
  const rows = await exec(sql)
  const data =  rows[0] || {};
  if (data.username) {
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: data.realname }, // 用户信息数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    ctx.body = { code: 1, token, userId:data.id };
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 0,
      message: "用户名或者密码错误"
    };
  }
});


// 获得登录用户信息  // 查询单个用户信息
  router.get("/api/userinfo", jwtAuth({ secret }), async ctx => {
    let { id } = ctx.query;
  const sql = `select * from myblog.users where 1=1 and id=${id};`
    const listData = await exec(sql).then(res=>{
      return res
    })
  
    ctx.body = {
      code: 1,
      data:listData[0]
      // data: {
      //   name: "jerry",
      //   age: 20
      // }
    };
  });

// 更新用户信息

router.get("/api/updateInfo", jwtAuth({ secret }), async ctx => {
  let { value } = ctx.query;
  const {username,id} = JSON.parse(value);
  
// const sql = `update blog set title = '${title}',content = '${content}',author = '${author}',image ='${image}'  where id ='${id}' `;
const sql =`update users set username='${username}' where id=${id};`
  const result = await exec(sql)
  if (result.affectedRows > 0) {
    ctx.body = {
      code: 1,
      message:'更新成功'
    }
  }
});

// 获得商品信息
router.get("/api/goods",jwtAuth({ secret }), async ctx => {
  ctx.body = {
    code: 1,
    slider: [{
      id: 21,
      img:"https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=d985fb87d81b0ef473e89e5eedc551a1/b151f8198618367aa7f3cc7424738bd4b31ce525.jpg"
    },{
      id: 22,
      img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg"
    },{
      id: 23,
      img:"https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=0c78105b888ba61ec0eece2f713597cc/0e2442a7d933c8956c0e8eeadb1373f08202002a.jpg"
    }],
    data:{
      fe:[{
        id:1,
        title:"Python基础语法",
        price:"120",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:101
      },{
        id:2,
        title:"Flask实战",
        price:"80",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:102
      }],
      python:[{
        id:3,
        title:"python1",
        price:"120",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:101
      },{
        id:4,
        title:"python2",
        price:"80",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:102
      }],
      java:[{
        id:5,
        title:"java1",
        price:"120",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:101
      },{
        id:6,
        title:"java2",
        price:"80",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:102
      }],
      bigdata:[{
        id:7,
        title:"bigdata!1",
        price:"120",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:101
      },{
        id:8,
        title:"bigdata2",
        price:"80",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:102
      }],
      ai:[{
        id:9,
        title:"AI1",
        price:"120",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:101
      },{
        id:10,
        title:"AI2",
        price:"80",
        img:"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg",
        count:102
      }]
    },
    keys:["fe","python","java","bigdata","ai"]
  };
});


// console.log('启动')
app.use(router.routes());
app.listen(3000);
