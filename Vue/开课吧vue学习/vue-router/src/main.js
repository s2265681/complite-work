import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  // if(to.fullPath!=='/shoppingCart'){
  //   next('/login')
  // }else{
  //   window.console.log('beforeEach',to,from)
  //   next()
  // }
    window.console.log('beforeEach',to,from)
    next()
})

router.beforeResolve((to,from,next)=>{
  window.console.log('beforeResolve',to,from)
  next()
})

router.afterEach((to,from,next)=>{
  window.console.log('afterEach',to,from)
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
