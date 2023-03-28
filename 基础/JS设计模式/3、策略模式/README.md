# 策略模式

### 1. 含义

> 策略模式的定义是：定义一些列的算法，把他们一个个封装起来，并且是他们可以相互替换

### 2. 目的

> 使用策略模式重构代码，目的就是将算法的使用与算法的实现分离开来。

### 3. 例子

```js
var strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus("S", 2000)); // 8000
```

- 缓动动画

```js
var tween = {
  // 缓动算法
  linear: function (t, b, c, d) {
    return (c * t) / d + b;
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};

var Animate = function (dom) {
  this.dom = dom;
  this.startTime = 0;
  this.startPos = 0;
  this.endPos = 0;
  this.propertyName = null;
  this.easing = null;
  this.duration = null;
};

Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date();
  this.startPos = this.dom.getBoundingClientRect()[propertyName];
  this.propertyName = propertyName;
  this.endPos = endPos;
  this.duration = duration;
  this.easing = easing;

  var self = this;
  var timeId = setInterval(function () {
    if (self.step() === false) {
      clearInterval(timeId);
    }
  }, 19);
};

Animate.prototype.step = function () {
  var t = +new Date();
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos);
    return false;
  }
  var pos = tween[this.easing](
    t - this.startTime,
    this.startPos,
    this.endPos - this.startPos,
    this.duration
  );
  this.update(pos);
};

Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + "px";
};

const block = document.querySelector(".block");
const blockDom = new Animate(block);
// 改变的属性，终点，持续时间，缓动算法
blockDom.start("left", 300, 2000, "strongEaseOut");
```

### 4. 小结
