<template>
  <div id="app">
    <router-view @changeTab="change" v-if="isRouterAlive"></router-view>
    <!-- <Footerbar v-if="this.iflogin"/> -->
    <!-- <Child msg='message'/> -->
  </div>
</template>

<script>
// import Footerbar from "./components/footer-bar/index.vue";
// import Child from "./components/child.vue";


export default {
  name: "app",
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      iflogin: true,
      // msg:'我要去子组件'
      isRouterAlive:true
    };
  },
  components: {
    // Footerbar,
    // Child
  },

  mounted(){
    // https%3A%2F%2Fwww.rockshang.cn%2F%23%2Flogin
    // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe670ef0710c928a&redirect_uri=https%3A%2F%2Fwww.rockshang.cn%2F%23%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe670ef0710c928a&redirect_uri=https%3A%2F%2Fwww.rockshang.cn%2F%23%2Flogin&response_type=code&scope=snsapi_base#wechat_redirect
     
  },

  methods: {
    change(e) {
      this.iflogin = e;
    },
    reload(){
      this.isRouterAlive =false;
      this.$nextTick(function(){
        this.isRouterAlive =true;
      })
    }
  }
};
</script>
<style>
</style>
