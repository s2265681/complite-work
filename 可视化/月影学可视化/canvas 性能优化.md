# Canvas 性能优化的常见手段

## 性能的影响因素

canvas 绘制图形是调用 fill 和 stroke 输出到画布的
两大因素： 图形的数量和图形的大小
他们决定了绘图指令的多少、 和绘制的时长

## 常用的优化手段

> 优化指令、使用缓存、分层渲染、局部重绘、优化滤镜、多线程渲染

### 优化指令

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <canvas
      id="c"
      className="canvas"
      width="375"
      height="650"
      style="border:1px solid #000000;"
    ></canvas>
  </body>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.2.0/fabric.min.js"></script>
  <script>
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // 创建正多边形，返回顶点
    function regularShape(x, y, r, edges = 3) {
      const points = [];
      const delta = (2 * Math.PI) / edges;
      for (let i = 0; i < edges; i++) {
        const theta = i * delta;
        points.push([x + r * Math.sin(theta), y + r * Math.cos(theta)]);
      }
      return points;
    }

    // 根据顶点绘制图形
    function drawShape(context, points) {
      context.fillStyle = "red";
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(...points[0]);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(...points[i]);
      }
      context.closePath();
      context.stroke();
      context.fill();
    }

    // 多边形类型，包括正三角形、正四边形、正五边形、正六边形和正100边形
    const shapeTypes = [3, 4, 5, 6]; // 100 正100 边形耗时严重
    const COUNT = 1000;

    // 执行绘制
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < COUNT; i++) {
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const points = regularShape(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          10,
          type
        );
        drawShape(ctx, points);
      }
      requestAnimationFrame(draw);
    }

    draw();
  </script>
</html>
```

### 使用缓存

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <canvas
      id="c"
      className="canvas"
      width="375"
      height="650"
      style="border: 1px solid #000000"
    ></canvas>
  </body>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.2.0/fabric.min.js"></script>
  <script>
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // 创建正多边形，返回顶点
    function regularShape(x, y, r, edges = 3) {
      const points = [];
      const delta = (2 * Math.PI) / edges;
      for (let i = 0; i < edges; i++) {
        const theta = i * delta;
        points.push([x + r * Math.sin(theta), y + r * Math.cos(theta)]);
      }
      return points;
    }

    // 根据顶点绘制图形
    function drawShape(context, points) {
      context.fillStyle = "red";
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(...points[0]);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(...points[i]);
      }
      context.closePath();
      context.stroke();
      context.fill();
    }

    // 多边形类型，包括正三角形、正四边形、正五边形、正六边形和正100边形
    const shapeTypes = [3, 4, 5, 6]; // 100 正100 边形耗时严重
    const COUNT = 1000;
    const shapes = createCache();

    // 利用缓存来绘图
    function createCache() {
      const ret = [];
      for (let i = 0; i < shapeTypes.length; i++) {
        // 创建离屏Canvas缓存图形
        const cacheCanvas = new OffscreenCanvas(20, 20);
        // 将图形绘制到离屏Canvas对象上
        const type = shapeTypes[i];
        const context = cacheCanvas.getContext("2d");
        context.fillStyle = "red";
        context.strokeStyle = "black";
        const points = regularShape(10, 10, 10, type);
        drawShape(context, points);
        ret.push(cacheCanvas);
      }
      // 将离屏Canvas数组（缓存对象）返回
      console.log(ret, "ret...");
      return ret;
    }

    // 执行绘制
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < COUNT; i++) {
        // const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        // const points = regularShape(Math.random() * canvas.width,
        //   Math.random() * canvas.height, 10, type);
        // drawShape(ctx, points);
        // 下面是利用离屏canvas缓存
        const shape = shapes[Math.floor(Math.random() * shapeTypes.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.drawImage(shape, x, y);
      }
      requestAnimationFrame(draw);
    }

    draw();
  </script>
</html>
```

### 分层渲染

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    body {
      position: relative;
    }
    #fg,
    #bg {
      position: absolute;
      top: 100px;
      left: 100px;
    }
  </style>
  <body>
    <canvas
      id="bg"
      className="canvas"
      width="375"
      height="650"
      style="border: 1px solid #000000;"
    ></canvas>
    <canvas
      id="fg"
      className="canvas"
      width="375"
      height="650"
      style="border: 1px solid #000000;"
    ></canvas>
  </body>
  <script>
    function drawRandomTriangle(path, context) {
      const { width, height } = context.canvas;
      context.save();
      context.translate(Math.random() * width, Math.random() * height);
      context.fill(path);
      context.restore();
    }

    function drawBackground(context, count = 2000) {
      context.fillStyle = "#ed7";
      const d = "M0,0L0,10L8.66, 5z";
      const p = new Path2D(d);
      for (let i = 0; i < count; i++) {
        drawRandomTriangle(p, context);
      }
    }

    function loadImage(src) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      return new Promise((resolve) => {
        img.onload = resolve(img);
        img.src = src;
      });
    }

    async function drawForeground(context) {
      const img = await loadImage(
        "http://p3.qhimg.com/t015b85b72445154fe0.png"
      );
      const { width, height } = context.canvas;
      function update(t) {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(0, 0.5 * height);
        const p = (t % 3000) / 3000;
        const x = width * p;
        const y = 0.1 * height * Math.sin(3 * Math.PI * p);
        context.drawImage(img, x, y);
        context.restore();
        requestAnimationFrame(update);
      }
      update(0);
    }

    const bgcanvas = document.querySelector("#bg");
    const fgcanvas = document.querySelector("#fg");
    drawBackground(bgcanvas.getContext("2d"));
    drawForeground(fgcanvas.getContext("2d"));
  </script>
</html>
```

### 局部重绘

[Canvas 局部渲染优化总结](https://juejin.cn/post/6844904103231881229)

### 优化滤镜

### 多线程渲染

```js
const canvas = document.querySelector("canvas");
const worker = new Worker("./random_shapes_worker.js");
const ofc = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: ofc, type: "init" }, [ofc]);
```
