const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../utils/cryp");

const login = async (username, password) => {
  // 先使用加数据
  username = escape(username);
  password = genPassword(password);
  password = escape(password);

  const sql = `select * from users where  username =${username} and password=${password} `;
  const rows = await exec(sql)
  return rows[0] || {};
  // return exec(sql).then(rows => {
  //   return rows[0] || {};
  // });
};

const register = (username, password, realname) => {
  // 先使用加数据
  //   const realname = '李泽'
  username = escape(username);
  password = genPassword(password);
  password = escape(password);
  realname = escape(realname);
  const sql = `insert into users (username,password,realname)  values (${username},${password},${realname}); `;
  return exec(sql).then(res => {
    return {
      id: res.insertId
    };
  });
};
module.exports = {
  login,
  register
};
