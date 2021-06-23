


# transition

 - https://www.w3school.com.cn/cssref/pr_transition.asp


   ```js
    属性名称：transition-property	规定设置过渡效果的 CSS 属性的名称。
    过渡时间：transition-duration	规定完成过渡效果需要多少秒或毫秒。
    时间函数：transition-timing-function	规定速度效果的速度曲线。（ease。。）
    延迟时间：transition-delay  定义过渡效果何时开始。
  ```

  注意：
  - display不能和transition一起使用
  - transition 后面尽量不用all
  - 常见闪动 可以和perspective和backface-visibility ， 开启加速


# animation

> 动画名称（name） --- @keyframes
> 过度时间（duration）
> 时间函数 （timing-function）ease ease-out ease-in  linear ... 
> 延迟时间（delay）

> 播放次数（iteration-count） infinite | count
> 播放方向（direction） alternate | reverse
> 定格位置停止状态（fill-mode）  forwards | 
> 是否暂停（play-state） 多结合js  running

适用场景
- 解决了transtion:none的bug
- 实现跳动
