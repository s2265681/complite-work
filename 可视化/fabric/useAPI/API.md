基本信息
- left  x轴坐标
- top y轴左边
- height 高度
- width 宽度
- backgroundColor 背景色
- setBackgroundImage 设置背景图
- setBackgroundImage 设置图像在最上层置顶

颜色
- fill 填充颜色
- backgroundColor 背景色

边框
- stroke 边框颜色
- strokeWidth 边框粗细
- hasBorder 是否有边框
- rx:10  圆角大小


control控制
- cornerStrokeColor 控制的选择器颜色
- perPixelTargetFind 是不是点击区域操作
- hasRotatingPoint 是不是有旋转点
- rotatePointOffset 设置选中距离图像的offset值

选择器
- canvas.selectionColor 选中框的填充颜色
- canvas.selectionBorderColor 选中框的边框颜色
- canvas.selectionLineWidth  选中框的宽度
- canvas.selectionDashArray 虚线的样式


方法
- canvas.getZoom() 查询zoom画板的空间大小
- canvas.setZoom(size)  设置zoom值
- canvas.getWidth()  查询画板的宽
- canvas.getHeight()  查询画板的高


空间变换
Canvas.viewportTransform