# 动画 (rect.animate)

```js
var canvas = new fabric.Canvas("c");
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: "red",
  width: 20,
  height: 20,
  angle: 0,
});
rect.animate("angle", 190, {
  onChange: canvas.renderAll.bind(canvas),
  duration: 1000,
  // easeInCubic，easeOutCubic，easeInElastic，easeOutElastic，easeInBounce和easeOutExpo
  easing: fabric.util.ease.easeOutExpo,
  onComplete: function () {
    console.log("动画结束");
  },
});
canvas.add(rect);
```

# 图像滤镜 (Rect.fillters.push())

创建图像

- fabric.Image 构造函数，它接受图像元素。
- 还有 fabric.Image.fromURL 方法
  > Grayscale、Sepia、Grayscale、Invert

```js
fabric.Image.fromURL("../2.jpg", function (oImg) {
  oImg.filters.push(
    new fabric.Image.filters.Grayscale(),
    new fabric.Image.filters.Sepia()
  );
  oImg.applyFilters();
  canvas.add(oImg);
});
```

由于“filters”属性是一个数组，我们可以用数组方法执行任何所需的操作：移除滤镜（pop，splice，shift），添加滤镜（push，unshift，splice），甚至可以组合多个滤镜。当我们调用 applyFilters 时，“filters”数组中存在的任何滤镜将逐个应用，所以让我们尝试创建一个既色偏又明亮（Brightness）的图像。

# 颜色 fabirc.Color()

转换也很简单。 toHex（）将颜色实例转换为十六进制表示。 toRgb（）可以转换为 RGB，toRgba（）转换为带 Alpha 通道的 RGB。

```js
new fabric.Color("#f55").toRgb(); // "rgb(255,85,85)"
new fabric.Color("rgb(100,100,100)").toHex(); // "646464"
new fabric.Color("fff").toHex(); // "FFFFFF"

var redish = new fabric.Color("#f55");
var greenish = new fabric.Color("#5f5");
// 颜色叠加
redish.overlayWith(greenish).toRgb(); // "AAAA55"
// 转成灰度加颜色
redish.toGrayscale().toHex(); // "A1A1A1"
```

# 渐变 rect.setGradient('fill',{})

setGradient

```js
var circle = new fabric.Circle({
  left: 100,
  top: 100,
  radius: 50,
});

circle.setGradient("fill", {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: circle.height,
  colorStops: {
    0: "#000",
    1: "#fff",
  },
});
```

两对坐标决定横轴还是纵轴方向
colorStops 决定多个色彩过度

```js
circle.setGradient("fill", {
  x1: 0,
  y1: 0,
  x2: circle.width,
  y2: 0,
  colorStops: {
    0: "red",
    0.2: "orange",
    0.4: "yellow",
    0.6: "green",
    0.8: "blue",
    1: "purple",
  },
});
```

# 文本 fabric.Text

```js
var canvas = new fabric.Canvas("c");
var text = new fabric.Text("hello world", {
  // left: 100,
  // top: 100,
  fill: "#f00",
  opacity: "0.4",
  fontFamily: "Comic Sans",
  fontSize: 50,
  fontWeight: "bold",
  textDecoration: true,
  overline: true,
  linethrough: true,
  underline: true,
  shadow: "green -5px -5px 3px",
  fontStyle: "italic",
  fontFamily: "Delicious",
  stroke: "#ff1318",
  strokeWidth: 1,
  textAlign: "right",
  lineHeight: 3,
  textBackgroundColor: "rgb(0,200,0)",
});
canvas.add(text);
```

# 事件

```js
var canvas = new fabric.Canvas("c");
canvas.on("mouse:down", function (options) {
  if (options.target) {
    console.log("有对象被点击咯! ", options.target.type);
  }
});
```

canvas.on('mouse:down', function(options) {...}

事件
[地址](http://fabricjs.com/events)
- after:render
- object:modified
- object:selected
- object:moving
- object:scaling
- object:rotate
- object:added
- object:removed
- selected

举例

我们将事件侦听器直接附加到矩形和圆形实例。使用"selected"来代替"object:selected"。同样的，使用“modified”代替“object:modified”，使用“rotating”来代替“object:rotating”。等等。。

```js
var circle = new fabric.Circle({ radius: 75, fill: "blue" });
circle.on("selected", function () {
  console.log("selected a circle");
});
// 全局
canvas.on("object:selected", function () {
  console.log("selected a circle");
});
```
