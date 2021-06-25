# 缩放和平移

[地址](https://github.com/Rookie-Birds/Fabric-Tutorial_zh-CN/blob/master/part-5.md)
[demo](http://fabricjs.com/fabric-intro-part-5#step1)

```js
// 设置滚轮事件 控制zoom的大小
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})

canvas.on("mouse:down", function (opt) {
  var evt = opt.e;
  // 按下Alt键 拖拽
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on("mouse:move", function (opt) {
  // 拖拽
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on("mouse:up", function (opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});
```

# 空间变换 viewportTransform

