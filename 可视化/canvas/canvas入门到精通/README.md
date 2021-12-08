<!--
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-05 18:38:41
-->

canvas 是基于状态进行绘制的

- Canvas 图形、动画、游戏开发从入门到精通

[Canvas 图形、动画、游戏开发从入门到精通](https://www.youtube.com/watch?v=D4h4puFp-6k&list=PL9nxfq1tlKKlmrUsdfVrTRt0lI1yQ9DEb&index=2)

canvas 是基于状态进行绘制的
context.beginPath() 进行全新的绘制

- 绘制星空
- 曲线
- 阴影的使用
- 剪影 探照灯的效果

class 1:

- 绚丽的倒计时粒子效果

class 2:

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
      // [ a c e ]
      // [ b d f ]
      // [ 0 0 1 ]

  - a. 水平缩放(1)
  - b. 水平倾斜(0)
  - c. 垂直倾斜(0)
  - d. 垂直缩放(1)
  - e. 水平位移(0)
  - f. 垂直位移(0)

- [x] fillStyle  设置渐变色 (08)
  - var grd = context.createLinearGradient(xstart,ystart,xend,yend);
  - grd.addColorStop(stop,color)
  - context.fillStyle = grd