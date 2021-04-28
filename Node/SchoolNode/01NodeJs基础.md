## node01
os  查看日志
生成package文件
npm init -y 

npm i os -s
npm i cpu-stat -s

```
// 查看内存占用率
const os =  require('os');
// 查看cpu
const cpuStat = require('cpu-stat')

```

**fs 处理文件**

http 请求 构建server
const server = http.createServe(()=>)
server.listen(3003)

- npm i express --s


```
const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.end('helloWord')
})
app.get('/users',(req,res)=>{
    res.end(JSON.stringify({name:'abc'}))
})
app.listen(3004,()=>{
   console.log('App listen at 3004')
})
```

**实现express**


https:github.com/su37josephxia/kaikeba-code