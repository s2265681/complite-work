// jsonwebtoken.js

const jwt = require("jsonwebtoken");
const secret = "@wewe44K";
// const opt = {
//   secret: "jwt_scriet111",
//   key: "user"
// };
const user = {
  username: "abc",
  password: "1111"
};
const token = jwt.sign(
  {
    data: user,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1小时后过期
  },
  secret
);
console.log("生成token+", token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExIn0sImV4cCI6MTU3NTg2NzMwNywiaWF0IjoxNTc1ODYzNzA3fQ.
// ruJ_hJdaAqS8SlyaOkwoO7rnaVX2gsf3NOFZZS9VILE
console.log("解码：", jwt.verify(token, secret));
// console.log("解码：", jwt.verify(token, secret, opt));
// { data: { username: 'abc', password: '1111' },exp: 1575867307,iat: 1575863707 }
