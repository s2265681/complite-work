const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");
// 创建链接对象
// const con = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'shang5036',
//     port:'3306',
//     database:'myblog'
// })
const con = mysql.createConnection(MYSQL_CONF);
// 开始链接
con.connect();
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
module.exports = {
  exec,
  escape: mysql.escape // escape  mysql提供防止 sql攻击 直接引用
};
