<template>
  <div id="app">
    <Header :title="title">
      <!-- 放插槽的东西 -->
      <!-- class="cubeic-more" -->
      <span  v-if="token" @click="logout">注销</span>
      <span  v-if="!token&&title!=='注册'" @click="register">注册</span>
    </Header>

    <!-- <div id="nav">
      <cube-button style="width:100px" v-if="$store.state.user.isLogin" @click="logout">注销</cube-button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!--  transition 动画 下面写css的类-->
     <!-- name = "route-move" 改为动态写法 -->
    <transition-group 
    key="index" 
    :name="transitionName"
    >
       <router-view key="index"/>
  
    </transition-group>
     <div>
        <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHanler" ></cube-tab-bar>
      </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue"
export default {
   components:{
     Header
  },
  // computed: {
  //   token() {
  //     return  localStorage.getItem('token');
  //   }
  // },
  mounted(){
    window.console.log(this.$router,'router///')
    // this.title=this.$router.currentRoute.name

  },
  data(){
    return {
      transitionName:"route-forward",
      selectLabel:"/",
      title:this.$router.currentRoute.name,
      noBtn:false,
      token:localStorage.getItem('token'),
      tabs:[{
        label:"Home",
        value:"/",
        icon:"cubeic-home"
      },{
        label:"Cart",
        value:"/cart",
        icon:"cubeic-mall"
      },{
        label:"Me",
        value:"/about",
        icon:"cubeic-person"
      }]
    }
  },
  created(){
     // 初始化页签设置，避免页面刷新
     this.selectLabel = this.$route.path
       

  },
  watch:{  // 自动数据切换
    $route(route){
      window.console.log(route,'route')
      // 监听路由变化并动态设置页签选中状态
      this.selectLabel=route.path;
      this.transitionName=this.$router.transitionName
      this.token = localStorage.getItem('token');
      this.title=route.name
      // this.$router.currentRoute.path!==
      // window.console.log(route.name,'route')
    }
  },
  methods:{
    changeHanler(val){
      // 浏览器重汇
      // document.body.offsetHeight;
      this.$router.push(val)
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/login')
      this.token=false
    },
     register(){
      this.$router.push('/register')
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 50px;
}
/* 动画route-move */
/* .route-move-enter {
  transform: translate3d(-100%,0,0);
}
.route-move-leave-to { 
  transform: translate3d(100%,0,0);
}
.route-move-enter-active,.route-move-leave-active { 
  transition:transform .2s;
} */
/* 动画 */
.route-forward-enter {
  transform: translate3d(-100%,0,0);
}
.route-back-enter {
  transform: translate3d(100%,0,0);
}

.route-forward-leave-to { 
  transform: translate3d(100%,0,0);
}
.route-back-leave-to { 
  transform: translate3d(-100%,0,0);
}
.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active{ 
  transition:transform .3s;
}




.child-view{
  /* 添加到每个夜无眠上的样式，确保页面间不挤占位置 */
  position: absolute;
  top:0;
  left:0;
  width:100%;
  padding-bottom:40px; 
}

.cube-tab-bar {
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  background: #cec9c9;
  height: 50px;
}
.cube-tab-bar-slider{
  top:0
}



/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
