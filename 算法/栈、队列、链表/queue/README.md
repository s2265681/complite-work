
# 队列

- 一个先进先出的数据结构
- JS 中没有栈，但是可以用 Array 实现栈的所有功能

## 常用的队列操作

- 入队： push 
- 出队： shift
- 取队头： queue[0]

## Coding

```js
const stack = [];
stack.push(1);
stack.push(2);
const item1 = stack.pop();
const item2 = stack.pop();
```

## 应用场景

#### 食堂学生排队打饭，春运，先进先出，保证有序

#### JS 异步中的任务队列，单线程，无法处理并发任务 Event Loop

#### 计算最近请求次数 [933]

解题思路：
越早发出的越可能不在最近的 3000ms 中，
有新请求就入队，3000ms 前发出的请求出队，
队列的长度就是最近请求的次数

```js
let input = [[],[1],[100],[3001],[3002]]

var RecentCounter = function () {
  this.q = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  console.log(t);
  //1
  // 100
  // 3001
  // 3002
  this.q.push(t);
  // 让头部元素和 t-3000对比， 小于剔除shift
  while (this.q[0] < t - 3000) {
    this.q.shift();
  }
  return this.q.length;
};
```
