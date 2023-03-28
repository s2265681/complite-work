
// 链接数据库
const mysql = require("mysql");
const mysqlCon = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "shang5036",
  port: "3306",
  dialect: 'mysql',
  dialectOptions: {
      socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  },
  database: "mywebpage"
});

// // 开始链接
// con.connect();

module.exports=mysqlCon


