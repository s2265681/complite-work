

# API


## 方法
- getContext()   获取canvas上下文  
- moveTo(x,y)、lineTo(x,y)  画直线
- stroke()  绘制边框
- fill()   填充
- fillRect(x,x,width,height)     画矩形 Number
- beginPath()   开始一条路径
- arc(x,y,r,sAngle,eAngle,counterclockwise)   创建曲线 counterclockwise Boolean顺逆时针 圆的话 0，0 到2*Math.PI
- arcTo(x1,y1,x2,y2,r)  画弧
- closePath()   闭合路径
- createLinearGradient(x1,y1,x2,y2)    创建线性渐变对象 起始点到结束点的连线
- createRadialGradient(x1,y1,r1,x2,y2,r2)  创建径向渐变对象
- addColorStop(stop,color)  对cavans增加着色点 
- createPattern(image,"repeat|repeat-x|repeat-y|no-repeat")  创建建立图像对象 重复 重复方向 一次
- fillText(text,a,b)  设置文字内容"我是文字", 30, 64
- save()   保存canvas状态
- restore()  恢复canvas状态



## 属性

- fillStyle    填充样式 如颜色 rgba(0,0,0,0.3) 设置不透明度
- strokeStyle  边框样式 如边框颜色
- lineWidth    边框的宽度
- lineCap      设置断电样式 butt、round、square
- lineJoin     两条直线相交的样式 round，bevel，miter
- shadowColor  设置阴影的颜色 String
- shadowBlur   设置阴影的模糊级别 Number
- shadowOffsetX 设置阴影距形状的水平距离 Number
- shadowOffsetY 设置阴影距形状的垂直距离 Number
- font  设置文字信息 "45px 黑体";

