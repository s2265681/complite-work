import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
/**
 * Layout 布局组件
 */
import Btn from './pages/Btn.vue'
Vue.use(Router)
export const routes = [
  // Tunas
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  // 布局
  {
    path: '/Btn',
    component: Btn,
    meta: {
      title: 'Btn',
      group: 'Layout',
    }
  }
]
export default new Router({
  mode: 'hash',
  routes
})