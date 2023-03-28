
const mysqlCon = require('../db/mysql')
// 统一执行 sql函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        mysqlCon.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    return promise;
  }

  module.exports={
    exec
  }