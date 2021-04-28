**小程序*项目《旧岛小样》**

*属性 父传子传递  通过properties 子传父 this.triggerEvent('自定义事件名',{参数},{是否冒泡})   调用的时候bind:<自定义的事件> 
*wxml 中如果使用js方法，是通过wxs语法进行的 （暂不支持ES6语法 module 方式 ， var）
（*复用问题*）
js（属性、方法、生命周期）的复用可以用 behavior   ---注微信小程序低版本不支持
wxss复用 @import "../common.wxss";

**组件的修改**
///////组件的修改,修改时只需操作页面,达到对组件内容的修改，达到更好的复用性和特殊性//////
1、组件js修改 通过属性机制 triggerEvent自定义事件
2、组件wxml的修改 slot机制 插槽 
  options:{
    multipleSlots:true
  },
**page:  p slot="after" ></p** 
**commonent:   slot name="after"></slot**
3、组件wxss的修改
 开源组件 样式更改
 设置
 externalClasses:[''] 接受外部传入组件的样式
 
4、等待
 wx.showLoading()
 wx.hideLoading()
5、
   Promise.all([detail, comments, likeStatus])
    .then(res=>{
      console.log(res)
    })
6、
input
auto-focus="true"  自动聚焦

7、 判断是否在数组中 ES6方法 includes

8、 组件的生命周期
     组件初始化: attached

9、下滑加载更多
     一：srcoll-view
     二：Page 页面下用 onReachBottom
     优先选用二方法

10、 组件外向组件内传递属性 通过properties接收

11、防止同时发送多次请求  通过loading 锁起来 

12、 behavier行为  封装一个行为逻辑  备复用

13、获取用户信息 用户授权 或者不授权（ 有缺陷 ）
静默授权 <open-data type="userAvatarUrl"/>

早期  wx.getUserInfo 弹窗
现在版本 询问是否授权  API button 组件 让用户主动点击button
授权之后用这个wx.getUserInfo获取信息

 wx.getSetting =>判断授权
 wx.getUserInfo=>获取信息

 14、 跳转页面
      wx.navigateTo
       wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
      在onload 的option里可以直接得到参数    let cid = options.cid

 15、 根据js判断css样式
 class="{{classic.type==200?'music-img':'other-img'}}" 

