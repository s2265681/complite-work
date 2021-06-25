# 组合 (Group)

```js
var canvas = new fabric.Canvas("c");
var circle = new fabric.Circle({
  radius: 100,
  fill: "#eef",
  scaleY: 0.5,
  originX: "center",
  originY: "center",
});

var text = new fabric.Text("hello world", {
  fontSize: 30,
  originX: "center",
  originY: "center",
});

var rect = new fabric.Rect({
  left: 10,
  top: 10,
  fill: "red",
  width: 20,
  height: 20,
  angle: 0,
});

var group = new fabric.Group([circle, rect, text], {
  left: 150,
  top: 100,
  angle: -10,
});
// group.item(0).setFill('red');
group.item(0).set({
  fill: "red",
});
group.item(1).set({
  text: "trololo",
  fill: "white",
});
// group.item(0).setFill('red');
group.item(2).set({
  fill: "#ff0",
});
```

克隆

```js
// 创建一个包含两个已存在对象的副本的组合
var group = new fabric.Group([canvas.item(0).clone(), canvas.item(1).clone()]);

// 移除所有对象并且重新渲染
canvas.clear().renderAll();

// 将组合添加到canvas画布
canvas.add(group);
```

# 序列化

一旦你开始构建一种有状态的应用程序，也许允许用户在服务器上保存画布内容的结果，或者将内容流传输到不同的客户端，你都需要 canvas 序列化。如果仍然要发送画布内容，也是可以的，有一个选项可以将画布导出到图像。但是上传图片到服务器无疑是相当占用带宽的，论大小，没有什么可以比得过文本了，这就是为什么 Fabric 为 canvas 画布序列化/反序列化提供了极好的支持。

Fabric 中的 canvas 序列化方法主要是 toObject（）和 toJSON（）方法。我们来看一个简单的例子，首先序列化一个空的画布：

```js
var canvas = new fabric.Canvas("c");
canvas.backgroundColor = "red";
JSON.stringify(canvas);
// '{"objects":[],"background":"rgba(0, 0, 0, 0)"}'
```

- toJSON: JSON.stringify(canvas) 序列化当前 canvas 信息
- canvas.toDataURL（'png'）获取当前 canvas 图片的 base64 的图片
- toObject: canvas.toObject() 导出对象

继承并且扩展属性

```js
var rect = new fabric.Rect();
rect.toObject = function () {
  return fabric.util.object.extend(toObject.call(this), { name: "trololo" });
};
canvas.add(rect);
console.log(JSON.stringify(canvas));
```

# SVG、序列化和反序列化

- canvas.toSVG() 转成 SVG
- loadSVGFromString 加载 SVG
- toDatalessJSON 转化成更小的 JSON

```js
canvas.item(0).sourcePath = "/assets/dragon.svg";
console.log(JSON.stringify(canvas.toDatalessJSON()));
```

```js
fabric.loadSVGFromString("...", function (objects, options) {
  var obj = fabric.util.groupSVGElements(objects, options);
  canvas.add(obj).renderAll();
});
```


# 自由绘画

