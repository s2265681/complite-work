import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import PageA from '../views/PageA.vue'
import PageB from '../views/PageB.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/a'
  },
  {
    path: '/a/:id',
    name:'pageA',
    beforeEnter:(to,from,next)=>{
      window.console.log('before enter');
      next()
  },
    components: {
      default:PageA,
      david:Test
    }
  },
  {
    path: '/b/:id',  // 路由传参 /b/123  this.$route里面取
    name:'pageB',
    props:true,
    component:PageB,
    children:[
      {
        path:'test',
        // component: Test
        // 异步组件
        // 好处：可以按需加载
        component:()=>import('../views/Test')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',  // 比hash友好 
  base: process.env.BASE_URL,
  routes
})

export default router
