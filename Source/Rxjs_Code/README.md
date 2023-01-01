# 1.RxJS

## 1.1 RxJs 介绍

- Rxjs 是一个使用可观察序列组合异步和基于事件的程序的库
- 它提供了一种核心类型，即 Observable ， 以及卫星类型 （ Observer, Schedulers, Subjects ) 和操作符， 可以将一步事件处理为集合
- ReactiveX， 结合了观察者模式和迭代器模式，并将函数时编程与集合相结合，以满足对理想管理事件序列的需求

## 1.2 基本概念

- Observable 表示可调用的未来值或事件的集合的想法
- Observer 是一组回调，知道如何监听 Observable 传递的值
- Subscription 表示， Observable 的执行， 主要用于取消执行
- Operators 是纯函数， 使用操作（如 map、filer、concat、reduce 等）处理集合时具有函数式编程风格
- Subject 等同于 EventEmitter， 是将值或事件多播到多个 Observer 的唯一方法
- Schedulers 是集中式调度程序，用于控制开发，允许我们协调计算发生在离乳 setTimeout、requestAnimationFrame 或其他位置的时间

## 1.3 参考链接

![官方文档](https://rxjs.dev/)
![github源码](https://github.com/ReactiveX/rxjs)
![rxjs弹珠图](https://rxmarbles.com/)

## 1.4 of

- RxJS 的 of 操作符允许创建一个 Observable ， 它发出一组项目， 然后完成
- 你可以使用它来将任何值发送到一个 Observable 中，例如，你可以使用它来将一个数字数组转换为 Observable
- of 操作符是同步的，发出的值会立即完成，如果需要异步发出所有的值，可以使用 from 操作符
- RxJS 的 from 操作符允许将多种不同的数据类型转换为 Observable，包括数组、类似数组对象，迭代器和可观察对象
- from 操作符是异步的，意味着它会在内部使用内置的调度

## 1.5 Operators

- 在 Rx 中 Observable， 控制流的状态是它的基石，但最有用的是它的 operator， operator 允许复杂的异步代码以声明的方式进行，operator 主要作用是操作、组合流中的数据
- 操作符是函数，它基于当前的 Observable 创建一个新的 Observable 这是一个无副作用的操作。前面的 Observable 保持不变
- 操作符本质上是一个纯函数，接受一个 Observable 作为输入，并生成一个新的 Observable 作为输出，订阅输出 Observable
- 操作符类型
- Creation Operators 创建操作符，用于创建新的 Observable，这些操作符可以从各种不同的数据源（数组、对象、Promise 等）创建 Observable，可以控制 Observable 的行为（如发出频率、顺序等）像 of、from、timer、interval 和 fromEvent
- Transformation Operators 转换操作符是 RxJS 中的一类特殊的操作符。他们用于将输入 Observable 转换为新的输出 Observable，这些输入 Observable 中的值进行转换，过滤，合并等操作，以便在输出 Observable 中呈现出所需要的信息， 像 map 等
- Combination Operators 操作组合，如 merge 和 concat
- Filtering Operators 过滤操作符用于过滤输入 Observable 中的值，只返回符合特定条件的值， 这些操作符可以帮助创建精确的数据流， 如 filter 等
- Multicasting Operators 多播操作符用于将单个 Observable 共享给多个观察者 （Observaer） ， 这些操作符可以帮助控制 Observable 的行为，有效利用资源，像 share 等

## 1.6 fromEvent

- RxJS 的 fromEvent 函数允许将浏览器事件转换为 Observable，它接受两个参数
  - 第一个参数是事件目标，例如 DOM 元素或 window 对象
  - 第二个参数是事件名称，例如 click 或 scroll
