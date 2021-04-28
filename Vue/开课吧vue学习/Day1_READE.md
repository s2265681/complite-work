
##  01day-- 目标
1. 实现一个购物车的案例
2. 掌握vue核心API  
3. 深入了解Vue的组件化机制
4. 第三方组件库element-ui应用
5. 设计并实现表单组件

```
    yarn global add @vue/cli
    vue -V   
    v3.0
    vue create shopCart
    vue ui
 
```

## 购物车
  - shoppcart
     cd shoppcart
    npm run serve
## 组件化
```
  - element-form
     cd element-form
     npm run serve

     vue add element
       Fully import 
       Import on demand  v按需加载
    

    - 组件设计Form、FormItem、Input
    1、input是自定义组件，怎么做到的双向数据绑定
    2、FormItem是怎么执行校验的，怎么知道input的状态的，它是怎么获取对应数据
    3、Form是怎么进行全局校验的？它用什么方法把数据模型和校验规则传递给内部组件

    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20191031102523967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)



    父及以上组件发送
     provide(){
    return {
      someval:'来自app的值。provide给子组件使用'
    }
  },
   自组件接收
     props:['label','prop'],



      <!-- - 动态计算
        const descval= {[this.prop]:value};   
        动态生成 {username:value}  {password:value} -->

    <!-- window.console.log 代替console.log -->
```