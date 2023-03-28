# JS 中的 DOM 操作：盒子模型属性

> DOM: document object model 文档对象模型，提供系列的属性和方法，让我们能在 JS 中操作页面中的元素。

### 获取元素的属性和方法

```js
获取元素的方法
1、 document.getElementById([ID])
2、 [context].getElementsByTagName([TAG-NAME])
3、 [context].getElementsByClassName([CLASS-NAME]) // IE6-8 不兼容
4、 document.getElementsByName([NAME]) //=>在IE浏览器中只对表单元素的NAME有作用
5、 [content].querySelect([SELECTOR])
6、 [content].querySelectAll([SELECTOR])

获取元素的属性
document
document.documentElement
document.head
document.body
childNotes 获取所有子节点
children 所有元素子节点  IE6-8中会吧注释节点也获取到
parentNode
firstChild / firstElementChild
lastChild / lastElementChild
previousSibling / previousElementSibling 上一个哥哥节点
nextSibling / nextElementSibling
// 后面几个带element的都不知持IE6-8
```

### DOM 的增删改操作

```js
// 增
document.createElement([TAG-NAME])
document.createTextNode([TEXT CONTENT])
(模版)字符串拼接，基于innerHTML/innerText存到容器中

// 插入
[Parent].appendChild([NEW-ELEMENT])
[Parent].insertBefore([NEW-ELEMENT],[ELEMENT])

// 克隆
[Element].cloneNode([TRUE/FALSE])

// 删除
[Parent].removeChild([Element])

// 设置自定义属性
[ELEMENT].xxx = xxx; // 写到堆内存上了
delete [ELEMENT].xxx // 删除属性
console.log([ELEMENT].xxx)
[ELEMENT].setAttribute('xxx',xxx) // 写到结构上
console.log([ELEMENT].getAttribute('xxx'));
[ELEMENT].removeAttribute('xxx')
```

### 获取元素样式和操作样式

```js
// 修改元素样式
// 修改行内样式
[ELEMENT].style.width = "12px"[ELEMENT].style.cssText = "width:12px;height:12px;"
// 获取元素样式 // 多个行内样式的写法
[ELEMENT].className = "className"[ELEMENT].classList.add[ELEMENT].style.xxx; 
// 设置样式类 // 新增的
let w = box.style.width; 
// 弊端只能获取当前元素写到行内上的样式，如果没有写到行内获取不到
```

### JS 盒模型属性

> 基于一些属性和方法，让我们能够获取到当前元素的样式信息 【13 个】
>
> 如：
>
> clientWidth: 可视区域的宽度(真实内容宽度)，内容溢出无影响
>
> clientTop: 距离可视区域的宽高
>
> offsetWidth：获取他的父参照物(不一定是父元素)
>
> offsetTop：距离他的父参照物的宽到
>
> 获取可视化宽度
>
> 属性

- client
  - width/height (获取盒子内容的宽高+padding)
  - top/left （边框的大小）
- offset
  - width/height clientWidth 的基础上几个边框。内容宽度+padding+border
  - top/left 距离他的父参照物的宽高
  - parent 父参照物，不脱离文档流是 body
- scroll 唯一一组可设置的
  - width/height （在没有内容溢出的情况下和 client 一模一样, 溢出情况下，包含超出部分，可以通过这个获取真实的高度)
  - top/left （竖向|横向滚动条减去实际高度|宽度） 可设置滚动的距离 --- 可读写属性

> 方法：
>
> 获取样式：
>
> getComputedStyle / currentStyle(低版本获取方法)
>
> window.getComputedStyle([ELEMENT],[伪类])
> [ELEMENT].currentStyle
```js
  // 获取元素样式属性的方法
  function getCss(element, attr) {
		let value = window.getComputedStyle(element)[attr],
			reg = /^\d+(px|rem|em)?$/i;
		if (reg.test(value)) {
			value = parseFloat(value);
		}
		return value;
	} 
  // 设置元素样式属性
  function setCss(element, attr, value) {
		if (attr === "opacity") {
			element['style']['opacity'] = value;
			element['style']['filter'] = `alpha(opacity=${value*100})`;
			return;
		}
		let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
		if (reg.test(attr)) {

			if (!isNaN(value)) {
				value += 'px';
			}
		}
		element['style'][attr] = value;
	}
```


> 经典面试题

```js
水平垂直居中;
// 1. 定位 负margin
// 2. 定位 transform 水平位移
// 3. 定位absolute 设置四个方向都为0，margin:auto  兼容性不太好
// 4. 父元素设置 flex
// 5. JS计算 一屏幕的宽度减去盒子的宽度/2
let winW = document.documentElement.clientWidth || document.body.clientWidth;
box.style.left = (winW - 300) / 2 + "px";
box.style.top = (winH - 300) / 2 + "px";
```

```js
/*
* offset: 获取当前元素距离BODY左/上便宜(不论父参照物是谁)
* @params  curEle:current element 当前操作的元素
* @return [object] 包含上/左偏移的信息
*/
function offset(curEle){
  let par = curEle.offsetParent,
      left = curEle.offsetLeft,
      top =  curEle.offsetTop,
      // 存在父参照物，而且还没有找到BODY
      while(par && par.tagName !=='BODY'){
         // 在原有偏移的基础上累加，父参照物的边框、父参照物的偏移
         if(!/MSIE 8\.0/).test(navigator.userAgent){
           // IE8中偏移自己算了边框，不需要加边框的值
               left += par.clientLeft;
               top += par.clientTop;
         }
         left += par.offsetLeft;
         top += par.offsetTop;
         // 继续获取上级参照物
         par = par.offsetParent;
      }
  return {top:top,left:left}
}
```

**获取真正样式的方法 —— getComputedStyle(currentStyle)**

getComputedStyle 获取所有经过计算机计算过的样式

- 只要元素在页面中呈现出来，那么所有的样式都是经过浏览器计算的
- 没见过和设置的样式都计算了
- 在 IE6 ～ 8 不兼容，需要给予 currentStyle 来获取

```js
// 第一个参数是操作的元素，第二个是伪类::befoure/::after
let styleObj = window.getComputedStyle([element], null);
//window.getComputedStyle(document.documentElement)
// IE6~8
let styleObj = [element].currentStyle;
```

### HTML 盒模型

传统的盒模型

实际宽度和实际高度等于 内容宽度+padding+border， 想要固定宽度通常需要手动计算内部宽度值，很不方便

CSS3 新的盒子模型提供了一个盒子模型属性

box-sizing: content-box(传统盒子模型) | border-box;(新盒子模型)

设置了 border-box 后，盒子的宽度会始终保持在固定大小， 里面的 content 宽度会通过 padding 和 border 动态计算

flex 弹性盒子布局

多列布局

### JS 事件

> 事件是元素(或者浏览器)天生自带的行为，只要行为处罚，就会触发相关的事件
>
> xxx.onclick = function(){} 属于事件绑定，给这个事件行为绑定方法，行为触发的时候
>
> 事件参考文档
>
> [](https://developer.mozilla.org/zh-CN/docs/Web/Events)

【事件】

- 鼠标事件

  - click 点击
  - dbclick 双击
  - mousedown/mouseup/mousemove
  - mouseover/mouseout
  - mouseenter/mouseleave
  - wheel 滚轮

- 表单事件

  - focus/blur 获取、失去焦点
  - change 内容改变

- 键盘事件

  - keyup/keydown
  - keyepress

- 手势事件

  - touchstart/touchend/toucemove 单指
  - gesture 多指事件

- 拖放事件

  - dragstart / drag / dragend
  - dragenter 进入投放区
  - dragover/dragover
  - drop 释放

- 媒体事件

- 值变化事件

  - hashchanghe 浏览器地址栏 hash 变化触发事件
  - input 表单正在输入内容。。。

- 其他事件

  - offline/online 断网或者连网

  - animationstart/iteration CSS3Animation 动画事件

  - transitionstart/end。run CSSTranslation 动画事件

  - fullscreenchange 全凭切换事件

  - resize 窗口大小改变

  - scroll 滚动条滚动

  - load 加载完

  - error 加载失败

  - timeout 加载超时

  - progress 加载中

【事件绑定】

- 1、DOM0 级事件绑定

  元素.onxxx = function(){...}

- 2、DOM2 级事件绑定

  在 EventTarget.prototype 添加了 addEventListener/removeEventLister/dispatchEvent

  非标准浏览器（IE<=8）没有这个东西，只有 attachEvent/datachevent(里面 this 不是当前元素)

  xxx.addEventListener('xxx',function(){...})

【DOM 事件绑定原理】

每一个 DOM 元素对象内都有很多内置属性，其中包含 onxxx 这样的事件类型的私有属性

**DOM0**事件绑定原理就是给这些事件类私有属性赋值

特点： 如果不存在不绑定，只能绑定一个方法

**DOM2 事件绑定**

box.addEventListener('click',function(){})

DOM2 事件可以绑定多个，他是通过浏览器事件池机制来做的

> 问： window.onload 和 document.ready 区别(\$(document).ready())?

答： jq 中的 document.ready 的原理是使用了 DOM2 级事件绑定，通过

window.addEventlistener("DOMContentLoad", ()=>{...}) 可以在一个页面中执行多次这个方法，而且它是 DOM 加载完后执行

window.onload 是基于 DOM0 级事件绑定，只能在页面初始的时候执行一次，而且需要所有资源加载完后才执行，所以 window.addEventlistener("DOMContentLoad", ()=>{...})比 window.onload 执行的更快

### 事件对象和事件传播机制

- 事件对象

  当事件触发、浏览器会把制定的方法执行，并且把全局下记录的当前操作信息的'事件对象'传递给这个函数 ，不管在哪个函数中，获取到的是同一个对象，存储的是当前操作的信息，和函数没关系

```js
let n;
document.bofy.onclick = function (ev) {
  console.log("Body");
  console.log(ev === n);
};
box.onclick = function (ev) {
  console.log("Box");
  console.log(ev);
};
```

- 事件对象


```
- 【鼠标事件对象】MouseEvent

    clientX/clientY: 鼠标触发点距离当前窗口左上角x/y坐标

    pageX/pageY：鼠标触发点距离当前页面Body的左上角x/y坐标

    path:[...]： 存储的是冒泡阶段传播的路径，（值是捕获阶段获得的）

    srcElement/target： 事件源，当前操作的元素，在哪触发的

    type: 事件类型

- 【键盘事件对象】KeyboardEvent

    which/keyCode [键盘码](https://www.cnblogs.com/daysme/p/6272570.html)

    altKey/shiftKey/ctrlKey 记录是否在按键的时候按了，组合按键，属性是布尔

- 【常规事件对象】Event

    e.preventDefault()  / e.returnValue  阻止事件默认行为

           ```js
		      // 设置点击ctrl+f 刷新
		      document.onkeydown = function (ev) {
		        console.log(ev);
		        ev.preventDefault() || ev.returnValue;
		        let { ctrlKey, keyCode } = ev;
		        if (ctrlKey && keyCode === 70) {
		          window.location.reload();
		        }
		      };
		      // 禁止右键打开菜单
		      document.oncontextmenu = function (ev) {
		          ev.preventDefault()
		          // return false
		      };
           ```
```



```
   e.stopPropagation()  / e.cancelBubble  阻止事件的冒泡

   ```js
  // 事件具备传播机制
  + 捕获阶段 CAPTURING_PHASE: 1
  + 目标  AT_TARGET: 2
  + 冒泡  BUBBLING_PHASE
  1、当我们触发当前元素的事件行为的时候，首先从最外层window开始，一层层的按照结构向里层查找 —— 捕获阶段（目的是为冒泡提供传播路径）
  2、找到当前的事件源，触发当前的相关行为 —— 目标阶段
  3、不仅当前事件源的相关行为被触发，其所有祖先元素的相关事件行为都会被触发，（由里向外） —— 冒泡阶段

  ⚠️注意：DOM0级事件中只有冒泡事件，DOM2级事件中xxx.addEventListener('click',function(){}, false) , 第三个参数是可以控制在冒泡还是捕获阶段触发，默认false，冒泡，改成true为捕获阶段，但是很少用

  ⚠️：大部分时间默认就存在冒泡机制，但是少部分事件天生就自己阻止了冒泡传播
     mouseenter/mouseleave // 进入离开 默认阻止了冒泡传播
     mouseover/mouseout  // 悬浮 没有阻止冒泡 很恶心 最好不用 或者阻止冒泡事件
   ```
```



```
- 【手指事件对象】TouchEvent

- ...
```

- 事件对象中常用的属性
  - target & srcEvent
  - type
  - code & key
  - keyCode & which
  - which/keyCode
  - clientY/clientX
  - pageX/pageY
  - preventDefault
  - stopPropagation