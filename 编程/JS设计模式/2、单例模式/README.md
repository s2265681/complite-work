# 单例模式

### 1. 含义

> 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点

### 2. 例子

> 单例模式是一种常用的模式，有一些对象往往只需要一个，比如线程池，全局缓存，浏览器中的 window 对象等。 如登录浮窗、toast 提示。

### 3. 简单实现原理

> 实现单例模式并不复杂，无非使用一个变量标志当前是否为某个类创建了对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象

- 不透明的单例模式

```js
var Singleton = function (name) {
  this.name = name;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b); // true
```

由于上面代码，不知道该是单例模式，所以不是透明的单例模式，下面改造成 new Singleton 的透明单例模式

- 透明的单例模式

```js
var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
var a = new CreateDiv("sven1");
var b = new CreateDiv("sven2");
console.log(a === b); // true
```

上述代码，不足的点，在于没有办法产生多个实例

- 用代理模式实现单例模式

```js
var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};
// 引入代理类
var ProxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      return new CreateDiv(html);
    }
    return instance;
  };
})();

var a = new ProxySingletonCreateDiv("sven1");
var b = new ProxySingletonCreateDiv("sven2");
```

- 惰性单例 —— 使用时创建

```js
// 创建弹窗的例子
var createLoginLayer = (() => {
  var div;
  return function () {
    if (!div) {
      console.log("once..");
      div = document.createElement("div");
      div.innerHTML = "我是登录弹窗";
      div.style.display = "none";
      document.body.appendChild(div);
    }
    return div;
  };
})();

var loginLayer;
document.getElementById("loginBtn").onclick = function () {
  loginLayer = createLoginLayer();
  loginLayer.style.display = "block";
};

document.getElementById("loginHidenBtn").onclick = function () {
  loginLayer.style.display = "none";
};
```

- 通用的惰性单例模式

```js
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

var createLoginLayer = function () {
  var div = document.createElement("div");
  div.innerHTML = "我是登录弹窗";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

var loginLayer;
document.getElementById("loginBtn").onclick = function () {
  loginLayer = createSingleLoginLayer();
  loginLayer.style.display = "block";
};

document.getElementById("loginHidenBtn").onclick = function () {
  loginLayer.style.display = "none";
};
```
