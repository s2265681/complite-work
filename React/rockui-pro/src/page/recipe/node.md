
# 项目总结

### 1、需求
1、创建食谱，交互为很长的一页布局，上面部分为基本信息，下面部分为创建食谱步骤，可以新增删除，最下面是提交。 考虑用户体验和一些意外的发生（比如用户编辑步骤非常多，页面会很长，而且如果最后某一接口错误或bug，整篇编辑将会白费）， 为了解决这个问题，我提出，通过tab分成两栏布局，第一栏为基本信息，第二栏为创建步骤，每个步骤分步保存， 带来的好处有两个，一个是新增、编辑内容时不会导致页面拉的太长。第二个是分步保存，不会造成一次提交出错导致全部内容保存失败。

带来的挑战，比如，由于基本信息中有选择设备品类，会影响步骤中的一些选择条件。当用户编辑和新增基本信息的时候，必须保存之后才能，继续编辑步骤。所以采用的方案是，当新增基本信息或者编辑基本信息改动时，需要第二个tab禁用。并做一个先保存基本信息的提醒，当保存后放开。开始用的父子组件传值，不是很优雅，后来选择使用redux方案，做这种状态的共享。为了更好的提高用户体验，点击保存基本信息后，滑动到页面顶端。编写了一个scrollAnimation的公共函数

为了控制滑动速度和页面帧的平滑切换使用了h5中新增得window.requestAnimationFrame结合window.scrollTo

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200518191544784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200518191635278.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)


### 2、技术栈

react、TS、redux、antd

### 3、 难点、要点

1、基本信息和创建步骤中，又包含多个可以新增删除编辑的属性。

​      将类似的组件抽离封装了组件。通过this.props.onChange将组件的值传给父组件的form。统一做错误校验。

2、 选择标签比较复杂，后端给了一级二级标签的数据，需要根据一级标签得到的数据中的id去依次查询所有的二级标签数据，并显示出来，然后页面都是通过后端数据变化展示。每行一级菜单包含n个二级菜单，每个二级菜单都支持多选，选中取消操作。支持必选非必选。 其中遇到的一个难点是，得到一级标签后，怎么异步的去执行请求获取到所有的二级标签数据。这里开始犯了一个错误，通过for循环去做请求。会产生同步异步的问题，最后只获取到了最后一个一级标签id的数据。于是做了改进通过promise去获取接口，利用async、await去获取promise返回的结果，也可以通过promise.all解决。最终得到了所有的标签数据，其中用到了数组扁平化和去重，扁平化用了lodash的flatMap和Array.from(new Set())去重，用filter配合some去获取两个json数组中重复的数据 

3、在window.scroll事件中为了获取距离页面顶部的距离，并通过setState保存。编写了公共的防抖debounce函数去获取触发滚轮事件时滚轮的高度，在页面停止滚动时去获取高度并setState，避免高频事件带来的页面卡顿

4、步骤页面中，为了更好的给用户反馈，新增了两个保存成功和更改中的图标，表单变化的时候，变成黄色修改中，保存或者修改成功后，改为绿色成功图标。通过对数据中每个对象中加一个ischange=false和是否有步骤id决定是否显示成功，当一个步骤中的form改变时，使ischange=true，遇到的问题是，antd中form组件提供的onValuesChange事件无法满足需求，因为编辑的时候，信息回显也会触发该事件，无法满足要求，所以通过事件委托，在form最外层写了onChange事件，解决了这个问题。


### 4、遇到的问题

- 兼容性问题： 

  获取当前滚轮高度的兼容性问题

  document.body.scrollTop || document.documentElement.scrollTop

- bug

  1、使用PureComponent提高性能时，带来的问题是，新增减少时，setState操作state的对象时，数据更改了，没有引起页面的渲染，引起保错，最后找到问题的原因是PureComponent对数组对象进行了浅比较，因为json数组引用地址是同一个，所以认为数据没有变化，没有触发页面渲染

解决方案：1、将PureComponent改为Component

​        2、改变数据指针如深克隆一份数据 _.deepClone [...data]

​        3、将当前数据setState为空数组，再重新setState赋值

 2、一个奇怪的bug，新增时，又一个输入框，无法输入中文，切换到中文输入状态时，输入框闪退，成为英文字母。 定位问题，发现由于输入框的value值是受控于父组件传入的值，而父组件的值是由Input的onChange发给父组件的，原因是子组件再setState值时，使用了同步的写法去onChange到父组件，导致值在变更的过程中就发到了到父组件，然后流回字组件时造成了，值的显示出错。

解决方案： this.setState({value:e.target.value},()=>{this.props.onChange()}) , 将this.props.onChange从同步写法中拿出，写到setState外面，解决了这个问题

