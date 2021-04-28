const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')

app.use(bodyParser.json());

const list = ['ccc','ddd']


app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
})

app.get('/list',(req,res)=>{
    // core(res)
    console.log('get')
    res.end(JSON.stringify(list))
})

app.post('/sent',(req,res)=>{
    core(res)

    list.push(req.body.message)
    res.end(JSON.stringify(list))
})

app.post('/clear',(req,res)=>{
    core(res)

    list.length = 0
    res.end(JSON.stringify(list))
})


function core(res) {
    // res.writeHead(200, {
    //     // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    //     'Access-Control-Allow-Headers': "X-token,Content-Type"
    // });
    // 简单请求
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3009')
    // 复杂请求加header
    res.setHeader('Access-Control-Allow-Headers','X-token,Content-Type')
    // 设置cookie
    res.setHeader('Access-Control-Allow-Credentials','true')
     
    res.setHeader('Content-Type','application/json')
}


app.listen(3009);