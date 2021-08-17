

fabric 源码
https://keelii.com/2021/05/08/fabricjs-internals/

![源码结构](https://img11.360buyimg.com/imagetools/jfs/t1/177758/16/8169/144192/60bf4293Ecff688d5/db18fd2512d5ec83.png)


基本原理

fabric.js 在初始化的时候会将用户指定的Canvasu元素（
lowerCanvas  外面包裹上一层 div 元素， 
内部插入另一个上层的 Canvas 元素 upperCanvas

lowerCanvas: src/static_canvas.class.js  真正绘制元素对象的画布
upperCanvas: src/canvas.class.js   上层画布，只处理分组选择， 事件绑定

新增一些rebase的东西
