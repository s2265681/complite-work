module.exports = {
  port: 8080, //指定客户端默认端口
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000', //代理服务端域名端口
      changeOrigin: true,
    },
  },
  optimizeDeps: {
    allowNodeBuiltins: [],
  },
  publicPath: './',
};
