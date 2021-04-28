const express = require('express')
const app = express()
// const path = require('path')
require('./models/mongoose')
// post 请求  必须
const bodyParser = require('body-parser');
const fruits = require('./models/item')

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  });

app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve('./index.html'))
// })

app.get('/api/list', async (req,res)=>{
                const {currendIndex,totlePage} =req.query
                const page = (+ currendIndex -1 ) *10 +1
                const data  =  await fruits
                                .find()
                                .limit(10)
                                .skip(page);

               const total  =  await fruits
                                .estimatedDocumentCount()
                                .count();
              res.json({
                data,
                total
              })
})

app.delete('/api/list/:id',async(req,res)=>{
    const id = req.params.id
    // await fruits.deleteMany() // 删除所有
    const rest= await fruits.deleteOne({id})
    console.log(id,'id')
    console.log(rest,'rest')
    if(rest.deletedCount){
       res.send({code:1,msg:'success'})
    }
})

app.post('/api/list',async(req,res)=>{
  const {name , price} = req.body
  let ret = await fruits.create({
       name,
       price,
       id:await fruits
       .estimatedDocumentCount()
       .count()
      })
  if(ret.id){
      res.send({code:1,msg:'success'})
  }
})

app.listen(3000)