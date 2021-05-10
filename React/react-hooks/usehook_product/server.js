const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
app.use(cors())
app.use(logger('dev'))

// http://localhost:8000/api/users?currentPage=1&pageSize=5
app.get('/api/users',function(req,res){
    let currentPage = parseInt(req.query.currentPage)  // 1 , 2, 3
    let pageSize = parseInt(req.query.pageSize) // 5
    let total = 25; 
    let list = []
    let offset = (currentPage-1) * pageSize
    for(let i = offset; i < offset+pageSize; i++){
      list.push({id:i+1, name:'name'+(i+1)});
    }
    res.json({
      currentPage,
      pageSize,
      totalPage:Math.ceil((total/pageSize)),
      list
    })
}) 

app.listen(8000,function(){
  console.log('app 启动起来了')
})