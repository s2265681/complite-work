import Vue from 'vue'
import Example from './Example.vue'
import router from './router'
import store from './store'

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Example)
})