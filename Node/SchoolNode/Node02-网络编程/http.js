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
        core(res);
        res.writeHead(200, {
                'Set-Cookie':'cookie1=val222;',
                // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
                'Access-Control-Allow-Headers': "X-token,Content-Type"
            });
            
        res.end(JSON.stringify({name:'xia'}))
        // res.setHeader('Set-Cookie','cookie1=val222;')
       

        // callbackFunction(["customername1","customername2"])。
    const {url,method,headers} = req;
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        fs.createReadStream('.'+url).pipe(res)
    }else if(url==='/users' && method === 'OPTIONS'){
        core(res);
        console.log('cookie',req.headers.cookie)

        res.end(JSON.stringify({name:'xia'}))
    }

    // console.log(url,'url')
    // console.log(method,'method')
    
    // // req('1')
    // res.end('resssss....')
})

server.listen(3003)

function core(res) {
    // res.writeHead(200, {
    //     // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    //     'Access-Control-Allow-Headers': "X-token,Content-Type"
    // });
    // 简单请求
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')
    // 复杂请求加header
    res.setHeader('Access-Control-Allow-Headers','X-token,Content-Type')
    // 设置cookie
    res.setHeader('Access-Control-Allow-Credentials','true')
     
    res.setHeader('Content-Type','application/json')
}
