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
