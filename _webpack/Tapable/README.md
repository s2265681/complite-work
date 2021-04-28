## 1、SyncHook

> 同步钩子 ， 调用 tap 方法收集依赖，调用 call 方法进行执行

```js
class SyncHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    this.tasks.forEach((el) => el(...args));
  }
}
```

## 2、SyncBailHook

> 可中断的钩子
> 同步钩子 ， 调用 tap 方法收集依赖，调用 call 方法进行执行
> 当上一个函数返回非 undefined，停止后面的调用，为 undefined 时，继续执行

```js
class SyncBailHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      let ret = this.tasks[i](...args);
      if (ret === undefined) break;
    }
  }
}
```

## 3、SyncWaterfallHook

> 具有执行顺序的同步钩子
> 同步钩子 ， 调用 tap 方法收集依赖，调用 call 方法进行执行
> 当上一个函数返回 undefined 或者不返回东西时，正常执行传参， 当返回非 undefined 时，将上一个函数的结果传给下一个函数

```js
class SyncWaterfallHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    let ret;
    for (let i = 0; i < this.tasks.length; i++) {
      ret = this.tasks[i](...args);
      if (ret !== undefined) {
        ret = this.tasks[i](ret);
      }
    }
    // let [ first, ...others ] = this.tasks;
    // let ret = first(...args);
    // others.reduce((a,b)=>{
    //   return b(a)
    // },ret)
  }
}
```

## 4、SyncLoopHook

> 具有执行顺序的同步带循环的钩子
> 同步钩子 ， 调用 tap 方法收集依赖，调用 call 方法进行执行
> 当执行的函数返回值不是 undefined 时，会循环执行这个函数，直到返回 undefined 时，才执行下一个函数

```js
class SyncLoopHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    // 方法一：建一个索引 依次执行每一个函数 当函数执行后返回是undefined时，i++
    let ret;
    for (let i = 0; i < this.tasks.length; ) {
      ret = this.tasks[i](...args);
      if (ret === undefined) {
        i++;
      } else {
        ret = this.tasks[i](...args);
      }
    }
    // 方法二
    // this.tasks.forEach((task) => {
    //     let ret;
    //     do {
    //       ret = task(...args);
    //     } while (ret !== undefined);
    //   });
  }
}
```

## 5、AsyncParallelHook

> 异步并行的钩子
> 调用 tapAsync 注册异步事件，当事件中的 cb 都执行后，调用 callAsync 执行最后的返回结束事件
> 思路 执行每一个异步任务，具有一个回调的函数，执行回调函数然后 index+1，当 index===一共的异步任务时执行 callAsync

```js
class AsyncParallelHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }
  callAsync(args, doneFn) {
    let index = 0;
    // 执行每一个异步任务，具有一个回调的函数，执行回调函数然后index+1，当index===一共的异步任务时执行callAsync
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i](args, () => {
        index++;
        if (index === this.tasks.length) {
          doneFn();
        }
      });
    }
  }
}
```

## 6、AsyncParallelPromiseHook

> 异步并行的钩子 支持 promise 写法
> 调用 tapPromise 注册异步事件，当事件中的 cb 都执行后，调用 promise .then 支持链式

```js
class AsyncParallePromiseHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }
  promise(args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}
```

## 7、AsyncSeriesHook

> 异步串行钩子
> 一个注册的函数执行完在执行下一个函数， 这种需要通过中间函数，递归的方式进行， 当 index 和函数的数目相同时停止递归

```js
class AsyncSeriesHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }
  callAsync(...args) {
    // 异步中间间 需要中间函数
    let index = 0;
    let finallyCallback = args.pop();
    let next = () => {
      if (index === this.tasks.length) return finallyCallback();
      this.tasks[index++](...args, next);
    };
    next();
  }
}
```

> 支持 promise

```js
class AsyncSeriesHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }
  callAsync(...args) {
    // 异步中间间 需要中间函数
    let index = 0;
    let finallyCallback = args.pop();
    let next = () => {
      if (index === this.tasks.length) return finallyCallback();
      this.tasks[index++](...args, next);
    };
    next();
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }
  promise(...args) {
    // 异步串行 这种用跌掉器 reduce
    let [firstFun, ...others] = this.tasks;
    let ret = firstFun(...args);
    return others.reduce((p, n) => {
      return p.then(() => n(...args));
    }, ret);
  }
}
```


## 8、AsyncSeriesWaterfallHook

```js
/**
 * AsyncSeriesHook
 * 异步串行钩子
 * 根express中间件很像，一个执行完 另一个再执行 依赖next函数写递归
 */

class AsyncSeriesWaterfallHook {
  // 异步并行钩子
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {  // tapPromise + promise
    // 异步迭代 需要一个中间函数
    let index = 0;
    let finalCallback = args.pop();
    let next = (err, data) => {
      //    if(this.tasks.length === index) return finalCallback()
      let task = this.tasks[index];
      if (!task) return finalCallback();
      if (index === 0) { // 执行的是第一个函数
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
}

let hooks = new AsyncSeriesWaterfallHook(["name"]);
hooks.tapAsync("react", (name, cb) => {
  setTimeout(() => {
    console.log("react", name);
    cb(null, "结果");
  }, 1000);
});

hooks.tapAsync("node", (name, cb) => {
  setTimeout(() => {
    console.log("node", name);
    cb(null, "结果");
  }, 1000);
});

// 等都执行完 在执行下面函数
hooks.callAsync("rock", function () {
  console.log("ending");
});
```