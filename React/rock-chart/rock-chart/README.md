知乎socket文档
https://zhuanlan.zhihu.com/p/29148869

```js
    created() {
    socket.on("loginSuccess", this.loginSuccess);
    socket.on("notify", this.notify);
    socket.on("updateUserList", this.updateUserList);
    socket.on("sockedloginOut", this.sockedloginOut);
    socket.on("receviedMessage", this.receviedMessage);
  },
  mounted() {
    this.chartAreaDom = this.$refs.right_chart_container;
    this.chartAreaDom.addEventListener("scroll", this.scrollHander, true);
  },



  当使用监听的时候 
  一个方法中修改了 对象 不会触发监听
  使用this.对象  = this.对象.slice() 
  原理是 修改原数组的指针 让框架识别发生了修改
  this.receiveMsgList = this.receiveMsgList.slice()

```


服务端 参考
舍弃websocket更换SOCKET.IO，用socket.io作为中间件，进行前端和后端的长连接中转站
https://blog.csdn.net/u010026207/article/details/90409456



BUG 刷新页面 会socketio 会重连 更换新的socket  




客户端发起重连 
服务端显示是否重连成功
https://blog.csdn.net/function__/article/details/73089504

