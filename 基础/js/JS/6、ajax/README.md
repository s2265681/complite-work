### 1、前后端通讯

1、AJAX: 前后端数据通讯非常重要的手段，基于AJAX从服务器获取数据，基于客户端实现数据的渲染

 + JQuery  $.ajax([options])
 + Axios

 2、Fetch: 新的前后端通讯方案

 3、跨域处理

-  jsonp
-  iframe(document.domain.location.hash...)
-  postMessage
-  CORS
-  proxy



服务器渲染(前后端没有完全分离)

|                            客户端                            |                  服务端                  |
| :----------------------------------------------------------: | :--------------------------------------: |
| 浏览器获取代码后，进行解析<br />+ DOM树<br />+CSSOM树<br />+RENDER树<br />+Layout<br />分层<br />绘制<br />+... | Web站点资源<br />index.jsp<br />ndex.css |

服务器渲染

弊端：

- 中后台，轻前端
- 服务器压力大
- 无法实现局部刷新

好处

- 有利于SEC优化，页面源代码重可以看到所有动态绑定的内容
- 如果服务器抗压能力强，则页面渲染速度很快



SSR： 基于NODE业务逻辑的处理，页面模版基于一些框架，jade/ejs/nuxt.js/next.js, 基于NODE环境完成服务器渲染



客户端渲染：前后端分离开发

前端开发： 

+ 页面制作
+ JS交互效果
+ 数据交互
+ web站点的部署(linux/nginx)

后端开发：

+ 写API接口
+ 写业务逻辑(数据库的增删改查)

优势： 

+ 前后端二分天下，不分轻重
+ 服务器压力小，降低很多
+ 可以实现局部刷新

弊端： 不利于SEO优化，基于JS完成的数据绑定，页面源代码中是不存在的,需要至少请求两次(一次页面资源请求，一次数据请求) ， 如果网络慢，则白屏时间较长



当代项目架构模型

+ 基于NODE.JS的服务器渲染(大部分服务器渲染) => 需要考虑SEO

+ 客户端渲染(纯客户端渲染)： 服务器用啥语言和我们没关系，我们只需要基于ajax拿到数据即可

  --->  前端基于loading或者骨架背景等在数据请求回来之前，做一个处理，来减少白屏时间

+ 半客户端渲染： 首屏信息都是基于服务器渲染(服务器骨架屏)，第一次加载完，后期再渲染，还是基于ajax客户端渲染，其他屏都是客户端渲染

+ 客户端  +  中间层(NODE.JS)   +  数据分析层



#### AJAX

核心： 

在早起基于ajax获取的数据格式基本都以xml格式为主，只不过现在都以json格式为主

ajax: async javascript and xml 

XMLHttpRequest: 也就是基于http请求从服务器拿到xml格式的数据

1. 创建一个XHR对象(AJAX实例)

   > let xhr = new XMLHttpRequest;

2. 打开请求API地址(发送之前的一些配置信息) 

   + GET系列(get/head/delete/options) 

   + POST系列(post/put)

   + GET系列请求传递给服务器一般基于URL问号参数
   + POST系列请求传递给服务器的信息一般基于"请求主体"
   + 所有请求方式都可以基于请求头把信息传递给服务器

   > xhr.open( [method], [url] , [async 默认true] )
   >
   > xhr.setRequestHeader('xxx','zhufeng')

3. 监听请求进度: 当ajax状态改变

   - xhr.readyState
     - 2 响应头信息返回（服务器时间）
     -  4 响应主体信息返回
   - Xhr.status
     - 不是所有请求都一定成功，网络状态码记录了这个结果

   ```js
   1. xhr.onreadystatechange = function(){ 
        if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
           // 获取响应头信息
          console.log(xhr.getResponseHeader('date'))
          console.log(xhr.getallResponseHeaders());
          // 获取响应主体
          xhr.responseText; (最常用 JSON.parsen())
          xhr.responseXML;
          xhr.response;
          xhr.responseType;
        } 
      }
   2. 
   ```
   
4. 发送请求
   > xhr.send([请求主体信息])

   ### axios

   [axios中文官网](www.axios-js.com/zh-cn/docs)
   
   axios 是基于Promise封装的ajax库（核心还是ajax的四步操作）, 这样通过Promise异步管控，避免串行接口调用形成回调地狱
   + ajax请求一般采用的是异步
      + ajax的串行： 第一个接口请求成功才能继续请求第二个
      ```js
       传统的
       $.ajax({
           url:'http://v1.hitokoto.cn',
           success:result=>{
                $.ajax({
                    url:'http://v1.hitokoto.cn',
                    success:result=>{
                        ...
                    }
                })   
           }
       })
       axios.get('http://v1.hitokoto.cn').then(res=>{
           return axios.get('http://v1.hitokoto.cn');
       }).then(response=>{})
      ```
      + ajax的并行：同时发送多个接口请求，当所有接口都请求成功，再去执行某些事(Promise.all) —— Axios.all
      
   + 基于Promise管理ajax的异步操作
   
   + URLSearchParams浏览器新增的处理问号传参的类
   let obj = new URLSearchParams('name=liming&age=12')
   console.log(...obj.values())



1. axios的基础使用

   axios([config])

   axios([url],[config])

   axios.get/head/delete/options([url],[config])

   axios.post/put([url],[data],[config])

2. axios的二次封装
- 拦截器
- 一些常规配置
3. axios源码(基于Promise封装一个ajax库)

   

 





  ### Fetch

浏览器新增的API，默认就是基于Promise管理的(核心不是XMLHttpRequest)

