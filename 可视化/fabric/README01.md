[中文教程](https://github.com/Rookie-Birds/Fabric-Tutorial_zh-CN/blob/master/README.md)
[fabric Demo](http://fabricjs.com/demos/)
[菜鸟canvas文档](https://www.runoob.com/html/html5-canvas.html)
[菜鸟参考手册](https://www.runoob.com/tags/ref-canvas.html)

> Fabric.js is a powerful and simpleJavascript HTML5 canvas library

# 1、什么是 Fabric.js

​ 一个功能强大的 Javascript 库,使使用 HTML5 canvas 变得轻而易举。
​ Fabric.js 为 Canvas 提供所缺少的对象模型, 交互和一整套其他不可或缺的工具

# 2、为什么用它而不用其他的

首先，Canvas 提供了一个画布的能力, 但是 api 不够友好。我们在 pc 端的批改是用的原生 canvas,但应用到小程序经过调研发现并不合适。canvas.绘制简单图形其实还可以, 不过做一些复杂的图形绘制, 编写一些复杂的效果，就不是那么方便了。所以，我们决定使用 Fabric.js 来开发
它主要就是用对象的方式去编写代码。

# 3、对比 canvas

- a.原生 canvas

```js
// 有一个id是c的canvas元素
var canvasEl = document.getElementById("c");
// 获取2d位图模型
var ctx = canvasEl.getContext("2d");
// 设置填充颜色
ctx.fillStyle = "red";
// 创建一个坐标100，190，尺寸是20，20的矩形
ctx.fillRect(100, 100, 20, 20);
```

- b.fabric.js

```js
// 用原生canvas元素创建一个fabric实例
var canvas = new fabric.Canvas("c");
// 创建一个矩形对象
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: "红色",
  width: 20,
  Height: 20,
});
// 将矩形添加到canvas画布上
canvas.add(rect);
```

# 4、使用

1、npm 安装

> npm install fabric --save

2、通过 CDN 引入

```js
<script src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.4.6/fabric.min.js"></script>
```

3、项目中引入使用

> import { fabric } from 'fabric'

```js
 js:
    canvasCtx = new fabric.Canvas('my-canvas', {
     enableRetinaScaling: true,
     perPixelTargetFind: true, // 对象基于像素检测
     skipTargetFind: true,
     selection: false,
     selectable: false
     });
    ​
    dom:
     <canvas
     id="my-canvas"
     className="canvas"
     width=375
     height=650
     ></canvas>
```

创建完实例后，fabric.js 会构建两层 canvas 元素：lower-canvas 和 upper-canvas
lower-canvas: 只负责渲染元素
upper-canvas: 负责所有的事件处理

# 5、事件绑定

```js
let canvasCtx = new fabric.Canvas("my-canvas", {
  enableRetinaScaling: true,
  perPixelTargetFind: true, // 对象基于像素检测
  skipTargetFind: true,
  selection: false,
  selectable: false,
});
canvasCtx.on("mouse:down", (options) => {
  console.log(options, "mouse:down");
});
canvasCtx.on("mouse:up", (options) => {
  console.log(options, "mouse:up");
});
canvasCtx.on("mouse:move", (options) => {
  console.log(options, "mouse:move");
});
```

# 6、绘制图片

```js
// 创建图片
function creatImg() {
  const imageUrl = new Image();
  imageUrl.setAttribute("crossOrigin", "Anonymous"); // 图片跨域
  imageUrl.src = "./1.jpeg";
  imageUrl.onload = () => {
    const imageBg = new fabric.Image(imageUrl);
    canvas.add(imageBg);
  };
}

// 直接引入图片的情况
var canvas = new fabric.Canvas("c");
fabric.Image.fromURL("./1.jpeg", function (oImg) {
  canvas.add(oImg);
});
```

# 移动

````js
var canvas = new fabric.Canvas("c");
    // 创建一个45度的矩形
    function creatRect() {
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 20,
        height: 20,
        angle: 45,
      });
      return rect;
    }

    let rect = creatRect();
    canvas.add(rect);
    // 移动
    function move(x, y) {
      rect.set({ left: x, top: y });
      canvas.renderAll();
    }
    move(200, 300);
    ```
````

# 层次和继承

对于从 fabric.Object 继承的所有 Fabric 对象都是通用的。
fabric.Circle 等都继承于 fabric.Object
可以给 fabric.Object 添加原型的方式扩展方法和属性

```js
fabric.Object.prototype.getAngleInRadians = function () {
  return (this.get("angle") / 180) * Math.PI;
};

var rect = new fabric.Rect({ angle: 45 });
rect.getAngleInRadians(); // 0.785...

var circle = new fabric.Circle({ angle: 30, radius: 10 });
circle.getAngleInRadians(); // 0.523...

circle instanceof fabric.Circle; // true
circle instanceof fabric.Object; // true
```

# Canvas

```js
var canvas = new fabric.Canvas("c");
var rect = new fabric.Rect();
// 添加对象
canvas.add(rect);
// 获取第几个元素的对象信息
canvas.item(0);
// 获取所有对象（只有一个矩形）
canvas.getObjects();
// 移除这个矩形
canvas.remove(rect);
```

# 互动

是否禁止互动

```js
var canvas = new fabric.Canvas('c');
...
canvas.selection = false; // 禁止所有选中
rect.set('selectable', false); // 只是禁止这个矩形选中
```

完全没有互动的版本

```js
var canvas = new fabric.Canvas('c');
...
canvas.selection = false; // 禁止所有选中
rect.set('selectable', false); // 只是禁止这个矩形选中
```

# 路径

创建路径 M 🈯️画笔移动从0 0 画L 代表直线 到200 100 画直线到170 200 z代表闭合
```js
var canvas = new fabric.Canvas("c");
var path = new fabric.Path("M 0 0 L 200 100 L 170 200 z");
path.set({ left: 120, top: 120 });
canvas.add(path);
```

# 加载SVG
> abric.loadSVGFromString或fabric.loadSVGFromURL