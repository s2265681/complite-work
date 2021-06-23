# Promise



### 1、Promise介绍

-  promise是进行异步管控的工具，
- 通过链式调用取代回调函数层层嵌套
- 提供更多解决异步的解决方案



### 2、Promise的用法及注意

 **第一步**

- 实例必须传入一个函数
- Promise实例中拥有两个默认属性，PromiseStatus、PromiseValue
- 实例接收一个函数，函数接受两个参数，分别是成功和失败的回调方法
- 状态一旦改变就不会再更改
- executor函数执行出错也会把实例的状态改为失败，且value是失败的原因

**第二步** 

- 实现.then方法 
- 实例上添加成功和失败后调用的方法
- 在实例中使用定时器模拟微任务
- 在原型上添加then方法，将两个函数传入赋值给实例中创建的两个方法
- 在微任务重执行两个回调方法，将值通过回调函数形式传出

**第三步**

- 实现Promise.resolve(1) 、 Promise.reject(1)   PromiseValue值和状态直接更改
- Promise.resolve()   PromiseValue值undefined、状态更改

**第四步**

- 实现Promise.resolve(1) 、 Promise.reject(1)   PromiseValue值和状态直接更改
- Promise.resolve()   PromiseValue值undefined、状态更改

### 3、Promise的源码解读

**实现对应第一步 —— 实现Promise类**

```js
function MyPromise(executor){
  if(typeof executor!=='function'){
    throw TypeError(`TypeError: Promise resolver ${executor} is not a function`)
  }
  this.PromiseValue = undefined;
  this.PromiseStatus = 'pending';
  let _this = this;
  function change(status,val){
     if(_this.PromiseStatus !== 'pending') return
     _this.PromiseValue = val;
     _this.PromiseStatus = status;
  }
  try{
    executor(function(value){
      change('fulfilled',value)
    }, function(reason){
      change('rejected',reason)
    })
  }catch(error){
      change('rejected',error)
  }
}
```

> 测试
>
> ```js
>  1、new MyPromise() // TypeError ...
>  2、let p = new MyPromise((resolve, reject) => {
>   resolve(1)
>   reject(1)  //只执行上面一个有效
>  })
>  3、console.log(p)
>    MyPromise {PromiseValue: 1, PromiseStatus: "fulfilled"}
>    PromiseStatus: "fulfilled"
>    PromiseValue: 1
>    __proto__: Object
> ```



**实现第二步 —— 添加then链式获取结果**  '<<'   ''>>'  代表与上一步相比新增或修改的地方

```js
// 第一步： 校验参数、描述类的私有属性、状态更改后不可再变
function MyPromise(executor) {
  if (typeof executor !== 'function') {
    throw TypeError(`TypeError: Promise resolver ${executor} is not a function`)
  }
  this.PromiseValue = null;
  this.PromiseStatus = 'pending';
  // <<<<<<
  this.resolveFunc = Function.prototype;
  this.rejectFunc = Function.prototype;
  // >>>>>>>
  _this = this;
  function change(status, value) {
    if (_this.PromiseStatus !== 'pending') return
    _this.PromiseStatus = status;
    _this.PromiseValue = value;
    // <<<<<<<
    let timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      console.log(_this, 'this')
      _this.PromiseStatus === "fulfilled" ? _this.resolveFunc.call(_this, value) : _this.rejectFunc.call(_this, value);
    })
    // >>>>>>>
  }
  executor((value) => change("fulfilled", value), (reason) => change("rejected", reason));
}
// <<<<<<<<
MyPromise.prototype.then = function (res, rej) {
  this.resolveFunc = res
  this.rejectFunc = rej
}
// >>>>>>>>
```

> 测试
>
> ```js
> let p = new MyPromise((resolve, reject) => {
>   resolve(1)
>   reject(1)
> })
> p.then(value => {
>   console.log(value, 'value')
> }, reason => {
>   console.log(reason, 'reason')
> })
> console.log(p, 'p')
> ```



**实现第三步 —— Promise.resolve(1) 、 Promise.reject(1)**

```js
function MyPromise(executor) {
  if (typeof executor !== 'function') {
    throw TypeError(`TypeError: Promise resolver ${executor} is not a function`)
  }
  this.PromiseValue = null;
  this.PromiseStatus = 'pending';
  this.resolveFunc = Function.prototype;
  this.rejectFunc = Function.prototype;
  _this = this;
  function change(status, value) {
    if (_this.PromiseStatus !== 'pending') return
    _this.PromiseStatus = status;
    _this.PromiseValue = value;
    let timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      _this.PromiseStatus === "fulfilled" ? _this.resolveFunc.call(_this, value) : _this.rejectFunc.call(_this, value);
    })
  }
  executor((value) => change("fulfilled", value), (reason) => change("rejected", reason));
}
MyPromise.prototype.then = function (res, rej) {
  this.resolveFunc = res
  this.rejectFunc = rej
}
// <<<<<<<<
MyPromise.resolve = function(value){
  return new MyPromise(function(resolve,reject){
    resolve(value)
  })
}
MyPromise.reject = function(value){
  return new MyPromise(function(resolve,reject){
    reject(value)
  })
}
//>>>>>>>>>
```

```js
// 测试
MyPromise.resolve()  
// MyPromise {  Promisevalue:undefined, PromiseStatus:'fulfilled' }
MyPromise.resolve(1) 
// MyPromise {  Promisevalue:1, PromiseStatus:'fulfilled' }
MyPromise.reject(1) 
// MyPromise {  Promisevalue:1, PromiseStatus:'rejected' }
```



