import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cart from "../views/Cart.vue";
import History from "../utils/history.js";
//用插件的形式用一下，目的在组件中可以使用
// this.$routerHistory去访问History

Vue.use(History);
Vue.use(VueRouter);

// 扩展一下Router添加一个goBack方法
VueRouter.prototype.goBack = function() {
  this.isBack = true;
  this.back();
};

const routes = [
  {
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/register",
    name: "注册",
    component: Register
  },
  {
    path: "/",
    name: "首页",
    // component: Home
    meta: {
      auth: true
    },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/cart",
    name: "购物车",
    meta: {
      auth: true
    },
    component: Cart
  },
  {
    path: "/about",
    name: "我的",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫 路由跳转之前执行的事beforeEach
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要验证登录的
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next({
        path: "/login",
        query: { rediret: to.path }
      });
    }
  } else {
    // 不需要验证登录的
    next();
  }
});
// 路由afterEach  路由转换完成后执行的事
router.afterEach((to)=>{
    if(router.isBack) {
      History.pop();
      router.isBack = false;
      router.transitionName = "route-back";
    }else{
      History.push(to.path);
      router.transitionName = "route-forward";
    }
})

export default router;
