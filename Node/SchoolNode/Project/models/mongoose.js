const mongoose = require('mongoose')

// 1. 连接
mongoose.connect("mongodb://localhost:27019/koaTest",{ useUnifiedTopology:true})
const conn = mongoose.connection;

conn.on('error',()=>console.error('数据库连接失败'))
conn.on('open',()=>console.error('数据库连接成功'))
