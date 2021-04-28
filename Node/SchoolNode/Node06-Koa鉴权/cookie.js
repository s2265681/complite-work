const http = require("http")
http.createServer((req,res)=>{
  if(req.url === '/favicon.ico'){
    return
  }else{
      console.log(req.headers.cookie)
    res.setHeader('Set-Cookie','cx-abc')
    res.end('hello cookie')
  }
}).listen(3000)