# React-Fiber

![简易版](https://mp.weixin.qq.com/s/sy5ZoXu09_bwhDUb1TcLvw)

思想

- 界面是由 vdom 产生的
- jsx 语法 通过 bable 转化成 render function 通过 createElement('ul', children) 的形式， 而不是直接转化为虚拟 DOM， 通过 render function 可以加上 state、props、动态逻辑，动态产生 vdom

- vdom 生成后不是直接渲染， 而是先转化成 fiber， 这个过程叫 reconcile （调度）

- fiber 是一个链表结构， 可以打断， 这样就可以通过 requestIdleCallback 来空闲调度 reconcile ， 这样不断循环， 知道处理完所有的 vdom 转化成 fiber， 就开始 commit，也就是更新 dom

- reconcile 的过程会提前创建好 dom，还会标记出增删改，那么 commit 阶段就很快了

- 从之前渲染前递归时做 diff 来确定增删改以及创建 dom，提前到了可打断的 reconcile 阶段， 让 commit 变得非常快， 这就是 fiber 架构的意义
