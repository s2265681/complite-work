# React-ssr





### 1、什么是服务端渲染

#### 1.1 服务端渲染

页面上的内容是有服务器生产的

```js
cnpm i express -S
```

```js
let express = require('express')
let app = express();
app.get('/',(req,res)=>{
  res.send(`
    <html>
      <body>
        <div id="root">hello</div>
      </body>
    </html>
  `)
})
```



#### 1.2 客户端渲染

页面内容有浏览器

