###

参考：
拥抱 Vue 3 系列之 JSX 语法
https://blog.csdn.net/Crazymryan/article/details/107329085

Vue3+TypeScript 完整项目上手教程
https://mp.weixin.qq.com/s/fo3_KwiKtRLVs6BUfe3iVg


- Vue Carousel 3D插件的实战应用
- 掌握Vue3核心知识及其应用
- 玩转CSS3中的3D处理技术
- 基于Vue3打造3D版轮播图
- 3D版轮播图的插件组件封装

js 高阶
vue 优化 vue2 、 vue3 区别 、 敏捷化配置 、 实现思路 、 
react fiber 、 

vue3

1、vue2 入口和vue3 入口区别
2、vue2 
- option API  vue3 组合API 入口 
- 接下来的一些事情写到setup里面
setup里面没有this，在原有的BefourceCreate 之前， 发生在初始化props后， 直接执行setup


vue3中自定义指令
app.directive('throttle',{
    beforeMount(el,binding){
        const [ func , timer ] = binding.value;
        el.addEventListener('click',throttle(func,timer))
    }
})


### 自定义指令

<a
href="javascript:;"
class="arrow arrow-left"
v-throttle="[change.bind(null, 'left'), 500]"
>
</a>