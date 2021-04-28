const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
})


app.get('/api/list', async (req,res)=>{
    // 相当于Number(req.query.page)
    const page = + req.query.page  // 加号  强制转换成数字类型
    
    const col = mongo.col('fruits-test','fruit')
    const total = await col.find().count()
    const fruits = await col   
                    .find()
                    .skip((page - 1)*5)  // 从第几个开始
                    .limit(5)            // 一共几个
                    .toArray()
    res.json({ok:1,data:{fruits,pagination:{total,page}}}) 
})

app.listen(3000)