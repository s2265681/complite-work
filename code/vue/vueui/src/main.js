import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routers'

Vue.config.productionTip = false
Vue.use(VueRouter)

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  // mode: 'hash',
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app")
