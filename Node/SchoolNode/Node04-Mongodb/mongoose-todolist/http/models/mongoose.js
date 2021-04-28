 // mongoose.js
 const mongoose = require("mongoose")
 const conf = require("./conf")

 // 1.连接  /test库
 mongoose.connect(conf.url,{useNewUrlParser:true,useUnifiedTopology: true});

 const conn = mongoose.connection;
 conn.on("error",()=>console.error('连接数据库失败'))






