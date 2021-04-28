// console.log('http')
const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
    // console.log(res,'res')
    const {url,method,headers} = req;
    // console.log(headers,'headers//')
    if(url ==='/'&& method ==='GET'){
       fs.readFile('index.html',(err,data)=>{
           if(err){
               res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
               res.end('Server Error 服务器错误')
            }
            res.statusCode = 200
            res.setHeader('Content-Type','text/html')
            res.end(data)
       })
    }else if(url==='/users' && method === 'GET'){
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify({name:'xia'}))
    const {url,method,headers} = req;
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        fs.createReadStream('.'+url).pipe(res)
    }

    // console.log(url,'url')
    // console.log(method,'method')
    
    // // req('1')
    // res.end('resssss....')
})

server.listen(3003)