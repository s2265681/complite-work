

### 安装vite
```js
cnpm install vite @vitejs/plugin-react -S



react/jsx-dev-runtime


```

> 新版的babel 的 写法 可以帮忙自动引入方法 ， 不用在组件中手动引入react包了
> React.createElement() = jsx 



FiberRootNode = containerInfo 他的本质就是一个真实的容器DOM节点 div#root
就是一个真实的DOM节点  


id = root =>  createRoot => createContainer => createFiberRootNode => 存在 reactDOMRoot里面

fiber
性能瓶颈 js线程和渲染线程互斥 超过 16.6 ms 掉帧 卡顿
把一个耗时的任务 拆分一个个小任务 时间切片

requestIdleCallback 向浏览器请求时间切片 =》 浏览器 分配时间 =》 归还控制权
是开发者在住时间循环上执行后台和优 先级低的任务

两个问题
1、 兼容性问题
2、 不可控，剩余时间不固定
所以 react 自己实现了一个类似的方法， 里面规定， 每帧的执行时间为 5.5ms
合作式的
```js
function workLoop(deadLine) {
    // 因为一帧是16.6ms，浏览器执行完成高优任务之后，如果还有时间，会执行workLoop，timeRemaining是本帧剩余时间
    console.log("本帧的剩余时间是", deadLine.timeRemaining());
    // 没有剩余时间了，就会跳出循环
    while (deadLine.timeRemaining() > 1 && works.length > 0) {
        perforUnitWork();
    }
    // 如果还有剩余任务，继续执行未完成的任务
    if (works.length > 0) {
        console.log(
        "还剩下",
        deadLine.timeRemaining() +
            "ms， 时间切片时间不够， 等下次空闲再调用"
        );
        requestIdleCallback(workLoop);
    }
}
```