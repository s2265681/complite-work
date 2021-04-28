
const http = require('http')
const url = require('url')

const router = [];

class Application {
   get(path,handler){
       console.log('get...',path);
       if(typeof path === 'string'){
        router.push({
            path,
            method:'get',
            handler
        })
       }else{
        router.push({
            path:'*',
            method:'get',
            handler:path
        })
       }
      
   }

   listen(){
       // 在Application原型上添加listen方法匹配路径，执行对应的handler方法
       const server = http.createServer((req,res)=>{
           console.log(url.parse(req.url,true),'parserurl')
          const {pathname} = url.parse(req.url,true)
          
        //   for(const route of router){
        //       const {path,method,handler} = route;
        //       if(pathname === path && req.method.toLowerCase() === method){
        //           return handler(req,res)
        //       }
        //     //   if(path == '*'){
        //     //       return  handler(req,res);
        //     //   }
        //   }  
        return router 
                .find(v=>pathname === v.path && req.method.toLowerCase() ===v.method)
                .handler(req,res)
             
        })
       server.listen(...arguments)
   }
}

module.exports=function createApplication(){
    return new Application()
}