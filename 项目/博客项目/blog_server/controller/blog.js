const { exec, escape } = require("../db/mysql");
const xss = require("xss");

const getList = async (author, keyword) => {
  let sql = `select * from blog where 1=1 `; // 1=1 占位查询不报错
  // 加上查询条件
  if (keyword) {
    keyword = escape("%" + keyword + "%");
    sql += `and author like  ${keyword}  `;
  }
  // if(keyword) {
  //     sql += `and title like '%${keyword}%' `
  // }
  sql += `order by createtime desc;`; // 倒序排列查询
  return await exec(sql); // 返回promise
};

const getDetail = async (id) => {
  const sql = `select * from blog where  id ='${id}' `;
  const rows = await exec(sql)
  return  rows[0];
};

const newBlog = async (blogData = {}) => {
  // blogData是一个博客对象 包含title content属性 es6 属性 没有时 ={}
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const image = blogData.image;
  const createtime = Date.now();
  const sql = `
         insert into blog (title,content,createtime,author,image)
         values ('${title}','${content}','${createtime}','${author}','${image}');
     `;
  return  await exec(sql).then(inserData => {
    return  {
      id: inserData.insertId
    };
  });
};

const updateBlog = async (id, blogData = {}) => {
  // blogData是一个博客对象 包含title content属性 es6 属性 没有时 ={}
  // id是要更新的id
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const image = blogData.image;

  const sql = `update blog set title = '${title}',content = '${content}',author = '${author}',image ='${image}'  where id ='${id}' `;
  console.log(sql,'sql')
  const  result = await exec(sql)
  if (result.affectedRows > 0) {
    return  true;
  }

  // return exec(sql).then(result => {
  //   if (result.affectedRows > 0) {
  //     return await true;
  //   }
  // });
};

const delBlog = async (id, author) => {
  // id 是要删除博客的id
  console.log(id,'id++++/////')
  const sql = `delete from blog  where id ='${id}' and author ='${author}' `;
  const  result = await exec(sql)
  console.log(result,'result/////')
  if (result.affectedRows > 0) {
    return  true;
  }
  // return exec(sql).then(result => {
  //   if (result.affectedRows > 0) {
  //     return await true;
  //   }
  // });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
