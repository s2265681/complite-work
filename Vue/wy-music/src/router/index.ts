import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
   // 首页 
   {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    redirect:'/recommend',
    children:[
      {
        path: '/recommend',
        name: 'Recommend',
        component: () => import(/* webpackChunkName: "Recommend" */ '../views/Recommend/index.vue')
      },
      // 热歌榜
      {
        path: '/hotList',
        name: 'HotList',
        component: () => import(/* webpackChunkName: "HotList" */ '../views/HotList/index.vue')
      },
      // 搜索页
      {
        // 搜索页
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "Search" */ '../views/Search/index.vue')
      },
    ]
  },
  {
    path:'/playlist',
    name:'PlayList',
    component:()=> import(/* webpackChunkName: "Search" */'../views/PlayList/index.vue'),
    meta: {  keepAlive: false },
  },
  // 播放页面
  {
    // 播放页面
    path: '/playSong/:songId',
    name: 'PlaySong',
    component: () => import(/* webpackChunkName: "PlaySong" */ '../views/PlaySong/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
