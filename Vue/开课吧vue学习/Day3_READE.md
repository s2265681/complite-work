## 03day-- 目标  vue-code
    1. 源码解析
    2. 项目课
    3. ssr
    4. 自动化测试
    5. 优化

 - 知识要点
  工作机制、Vue响应式原理、依赖收集与追踪、编译complie

    ![vue原理利](https://img-blog.csdnimg.cn/20191110080306127.png)
◊
  1. vue工作机制
    ** 初始化**
    在new Vue()之后，Vue会调用进行初始化，会初始化生命周期、props、methods、data\computed与watch等，其中最重要的是Object.defineProperty设置setter与getter，用来实现响应式与依赖收集

    初始化之后调用$mount挂在组件

    vue原理利用了Object.defineProperty数据劫持,把data里面的每个数据都订阅了set和get方法，当每个数据改变的时候，会知道需要更新的地方。

 2. 编译compile
    核心逻辑获取dom，遍历dom，获取{{}}格式的变量，以及每个dom的属性，截获k-和@开头的设置响应式
    ![编译compile](https://img-blog.csdnimg.cn/20191110091143533.png)


   **vue的编译过程？**
    vue写的模版语句html不识别，
    根据编译过程进行依赖收集，使数据模型和视图之间产生了依赖关系，当模型产生关系的时候，就可以通过这些依赖让他们进行更新，就是执行编译的更新操作，做到模型驱动视图的变化

    **双向绑定的原理？**
    通过v-model这个指令，在编译的时候解析出v-model，在做操作的时候，1、v-model所属的元素上面添加一个事件监听，把input指定的事件监听函数作为回调监听，数据发生变化set变化，触发更新，就把最新的值设置到vue的实例上，触发页面更新。

    思考：
    **如何监听数组push？**
    **自定义组件的实现？**


    复习：
    new Vue
    初始化: 数据响应化，对数据劫持， 数据收集-> 
    编译: 依赖收集，编译器（把vue特殊的标签编译）， 创建一个watcher，把参数更新函数传给watcher，通过dep管理所有的watcher
    让dep通知当前相关的watcher去做响应的操作，更新update

    
