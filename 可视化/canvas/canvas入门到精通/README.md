<!--
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-05 18:38:41
-->

canvas 是基于状态进行绘制的

# Canvas 图形、动画、游戏开发从入门到精通

[Canvas 图形、动画、游戏开发从入门到精通](https://www.youtube.com/watch?v=D4h4puFp-6k&list=PL9nxfq1tlKKlmrUsdfVrTRt0lI1yQ9DEb&index=2)
[Canvas 文档](http://caibaojian.com/canvas/about.html)

canvas 是基于状态进行绘制的
context.beginPath() 进行全新的绘制

- 绘制星空
- 曲线
- 阴影的使用
- 剪影 探照灯的效果

## class 1:

- 绚丽的倒计时粒子效果

## class 2:

- [x] Draw one line
- [x] Draw a Rectangle
- [x] lineCap 线条的帽子 butt round square
- [x] 画一个五角星
- [x] 线条的连接
  - lineJoin “miter”(default) ”bevel“ ”round“
  - miterLimit = 10 (在 miter 时如果很尖 超过最大值 设置为 round) 线条相交状态
- [x] 图形变幻 —— 画一片星空
- [x] 图形变换 canvas 图形变换是叠加态 最好用 save 和 restore 随意更改状态，而不影响代码
  - 位移 translate(x,y)
  - 旋转 rotate( deg )
  - scale( sx, sy ) scale 操作具有副作用， 使用时一定要小心， 外边框也会被 scale 放大
- [x] 变换矩阵 (07) transform(a,b,c,d,e,f) 所以设计了 setTransform(1,0,0,1,0,0)
      [ a c e ]
      [ b d f ]
      [ 0 0 1 ]

  - a. 水平缩放(1)
  - b. 水平倾斜(0)
  - c. 垂直倾斜(0)
  - d. 垂直缩放(1)
  - e. 水平位移(0)
  - f. 垂直位移(0)

- [x] 设置 LinearGradient 线性渐变色

  - var grd = context.createLinearGradient(xstart,ystart,xend,yend);
  - grd.addColorStop(stop,color)
  - context.fillStyle = grd

- [x] 设置 createRadiaGradient 径向渐变

  - var grd = context.createRadiaGradient(x0,y0,r0,x1,y1,r1);
  - grd.addColorStop(stop,color)
  - context.fillStyle = grd

- [x] createPattern 创建图案

  - var pattern = createPattern(img | canvas | video, repeat-style)
  - repeat-style: no-repeat | repeat-x | repeat-y | repeat
  - context.fillStyle = pattern

- [x] 小结

  - fillStyle = color | gradient | image | canvas | video

  ## class 3 曲线绘制 Draw an Arc

  - Draw an Arc

    - context.arc(centerX,centerY,radius,startingAngle, endingAngle , anticlockwise = false) 默认顺时针

    - context.arcTo(x1,y1,x2,y2,radius) 这个弧生成在起始点到 x1、y1 和 x2 ，y2 的切线上

  - Draw a Moon

  - QuadraticCurveTo 贝塞尔二次曲线  
    [二次贝塞尔曲线网址](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

    - context.moveTo(x0,y0) 起始点
    - context.quadraticCurveTo(x1,y1,x2,y3); 控制点 结尾点

  - BezierCurveTo 贝塞尔三次曲线  
    [三次贝塞尔曲线网址](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)

    - context.moveTo(x0,y0) 起始点
    - context.bezierCurveTo(x1,y1,x2,y2,x3,y3) 两个控制点 最后结束点

  - 曲线小结

  ## class4 文字文本渲染

  - context.font = "bold 40px Arial" 默认 20px sans-serif
    - font-style: normal | italic (斜体) ｜ oblique(倾斜)
    - font-variant: normal | small-caps (小型的大写字母)
    - font-weight: lighter | normal(400) | bold(700) | bolder | 100-900
    - font-size: 20px | 2em | 150% | small medium large...
    - font-family: 设置多种字体逗号隔开 ｜ 支持@font-face | Web安全字体
  - context.fillText(string,x,y,[maxlen]) 可选参数最大长度 像素
  - context.strokeText(string,x,y,[maxlen])
  - context.textAlign = left | center | right
  - context.textBaseline = top | middle | bottom
  - context.measureText( string ).width  文本的度量


## class5 阴影