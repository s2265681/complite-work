## 02day-- 目标

1. vue-router 基础配置
2. 路由传参
3. 子路由
4. 路由重定向
5. 路由守卫
6. vuex 数据流
7. Store
8. state
9. mutation
10. action

要点

1. vue-router 多页面
2. vuex 管理数据

```
    vue create vue-router
    cd  vue-router
    npm run serve



```
## Vue-Router

vue add router || npm install vue-router


1. 路由传参
   路径传参
   query 传参

   ```
     {
            path: '/b/:id',  // 路由传参 /b/123  this.$route里面取
            name:'pageB',
            props:true,
            component:PageB
     }

     路由设置 props:true
     props:['id'],
     this.id 直接取到
   ```

2. 命名视图
   给 router-view 取个名字

```

{
  path: '/a',
  name:'pageA',
  components: {
    default:PageA,
    david:Test
  }
},
 展示多个视图
  <router-view/>
  <router-view name="david"/>

```

3. 导航守卫（路由的生命周期）
   // -> main.js - 全局守卫
   // 常用 beforeEach
   ```
   router.beforeEach((to,from,next)=>{
       if(to.fullPath === '/shoppingCart'){
         next('/login')
       }
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

    ```

    - 路由独享守卫

     写在配置里面 -> router/index.js
      beforeEnter:(to,from,next)=>{
          console.lgo('before enter);
          next()
      }

    - 组件内的守卫

    -> pageA.vue
    ```
      export default {
       
            beforeRouteEnter(to,from,next){
                //...组件对象路由confim前调用
                // 不能调用this
                // 因为守卫执行前，组件还没有被创建
                
            },
            beforeRouteUpdate(to,from,next){
                // 当前组件改变，该组件被复用时调用
                // 可以访问this实俐
                // 组件之间跳来跳去 会发现更新 进入下一个组件 但是只是参数变可以执行这个
                <router-link to="/a/122">AA1</router-link> 
                <router-link to="/a/222233">AA2</router-link> 
            },
            beforeRouteLeave(to,from,next){
                //...
                // 导航离开该组件的对应路由时调用
                // 可以访问组件this
                // 通常来判断用户还没用保存修改之前突然离开
            }
      } 
   
    ```


    4.  路由异步加载，异步组件 通过webpack 懒加载组件 除首页外 触发的时候再加载
       {
        path:'test',
        // component: Test
        // 异步组件
        // 好处：可以按需加载
        component:()=>import('./view/Test')
      }


## Vuex
cd vue-vuex
npm run serve

npm install vuex --save 安装
vue add vuex  // 这种就集成好了 推荐

![](https://vuex.vuejs.org/vuex.png)

```
  -> store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})


import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count:1
  },
  mutations: {
    increment(state){
       state.count ++ 
    },    
    decrement(state){
      state.count --
   }
  },
  actions: {
    increment:({commit})=>{
      commit('increment')
    },
    decrement:(obj)=>{
      window.console.log(obj,'obg++')
      obj.commit('decrement')
    }
  },
  getters:{
    money:state=>`¥${state.count*1000}`
  },
  // modules 维护处理多套数据
  modules: {
  }
})



```
1. getters
有时候我们需要从store中派生出一些状态，我们可以理解为组件中的计算属性一样的用法

要对数据进行处理再返回

page.vue 中使用

```
 computed:{
   money(){
     return this.$store.getters.monry;
   }
 }
```

store.js 中的写法

```
getters:{
  money:state=>`¥${state.count*1000}`
}
```

2. Action 
  Mutation必须是同步的，Action 是异步的Mutation
  是触发Mutation的时机
```
  actions: {
    increment:({commit})=>{
      commit('increment')
    },
    decrement:(obj)=>{
      window.console.log(obj,'obg++')
      obj.commit('decrement')
    }
  }

```
3. mapState

4. mapAction
  组件里的事件与action里面的事件做一个映射（可以减少很多代码）