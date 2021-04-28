const jwtAuth = require("koa-jwt");
const router = require('koa-router')()
const { exec } = require("../utils/exct");
// const fs = require('fs')
// const path = require('path')
const secret = "34323566";

// 分页
// SELECT * FROM orange.message  limit 0, 10;
// 获取message
 router.get("/api/message", async ctx => {
    // 查message
    // const userId =ctx.session.id;
    let sql = `select * from mywebpage.message where 1=1 order by id desc;`;
    // const messageData = await exec(sql).then(res => {
    //   return res;
    // });

    // const pageNo=(Number(ctx.query.pageNo)-1)*10||0;
    // const pageSize = Number(ctx.query.pageSize) ||10
    // // console.log(pageSize,'pageSize')
    // // console.log(pageNo,'pageNo')
    // const totalCount=messageData.length;
    // const totalPage=  Math.floor(totalCount/10)+1;
    // let querysql = `select * from orange.message where 1=1 and userId=${userId} limit ${pageNo}, ${pageSize};`;
    const data = await exec(sql).then(res => {
      return res;
    });

    // SELECT * FROM orange.message  limit 0, 10;
     ctx.body = {
      code: 1,
      list: data,
      // pageNo:pageNo,
      // totalCount:totalCount,
      // totalPage:totalPage
    };
  });

  //   // 新增addmessage
  router.post("/api/message",jwtAuth({ secret }), async ctx => {
    // const userId =ctx.session.id;
    let { message,username,avatar_url} = ctx.request.body;
    let sql = `insert into mywebpage.message (message,username,avatar_url) values ('${message}','${username}','${avatar_url}');`;
    const  result = await exec(sql).then(res => {
      return {
        id: res.insertId
      };
    });
    if (result.id) {
      ctx.body = {
          code: 1
        };
      }else{
        ctx.body = {
          code: 0
        };
      }
  });


  // 查询message详情
//  router.get("/api/message/:id",jwtAuth({ secret }),  async ctx => {
//   var id = ctx.params.id; 
//   // 查message
//   const userId =ctx.session.id;
//   let sql = `select * from orange.message where 1=1 and userId=${userId}  and id=${id};`;
//   const messageData = await exec(sql).then(res => {
//     return res;
//   });
//   // console.log(messageData[0],'messageData[0]')
//   messageData[0].image=[{
//     url: messageData[0].image,
//     uid: -Date.now()
//   }]
//   ctx.body = {
//     code: 1,
//     list: messageData[0]
//   };
// });
  
//   // 删除message
//   router.delete("/api/message",jwtAuth({ secret }),  async ctx => {
//     const userId =ctx.session.id;
//     let { id } = ctx.request.body;
//     let sql = `delete from orange.message where userId=${userId} and id ='${id}';`;
//     const  result = await exec(sql)
//     if (result.affectedRows > 0) {
//       ctx.body = {
//           code: 1
//         };
//       }else{
//         ctx.body = {
//           code: 0
//         };
//       }
//   });


//   // 修改message
//   router.put("/api/message",jwtAuth({ secret }),  async ctx => {
//     const userId =ctx.session.id;
//     let { title,image,intro,id } = ctx.request.body;
//     let sql = `update orange.message set title='${title}', image='${image}', intro='${intro}' where id='${id}' and userId='${userId}';`;
//     const  result = await exec(sql)
//     if (result.affectedRows > 0) {
//       ctx.body = {
//         code: 1,
//         message: "更新成功"
//       };
//     }else{
//       ctx.body = {
//         code: 0,
//         message: "更新失败"
//       };
//     }
//   });

module.exports=router