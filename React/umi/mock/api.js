export default {
    // 支持值为 Object 和 Array
    'GET /api/users': [{id: 1, name: "张三"},{id: 2, name: "李四" }] ,
    // GET 可忽略
    '/api/users/1': {id: 1, name: "张三"},
  
    // 支持自定义函数，API 参考 express@4
    'POST /api/users/add': (req, res) => {
      // 添加跨域请求头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('ok');
    },
  }