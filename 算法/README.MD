## 前端力扣刷题路线

刷题 + 看题解 + 开源
https://leetcode-cn.com/leetbook/read/leetcode-cookbook/5qi5eg/

算法阶段开启
https://leetcode-cn.com/study-plan/algorithms/?progress=5yaz10h

## 时间复杂度

例子
O(1) => let i = 0; i+=1 代码只会被执行一次
O(n) => for(let i =0 ; i< n ; i++) { } 代码执行 n 次
O(n) _ O(n) => 双循环 O(n^2)
O(logN) => let i = 1; while(i < n) { console.log(i); i_=2 }

## 空间复杂度

- 一个函数，用大 O 表示
- 算法在运行过程中临时占用存储空间大小的量度

例子
O(1) => 声明一个变量， 占用一个单元
O(n) => 声明一个数组， 占用 n 个单元
O(n^2) => 存储 N 的二次方的变量， 如矩阵

## JS 中的数据结构

- 栈 在 JS 中的应用， js 中函数的调用栈，

- 队列 同步异步任务的执行队列

- 链表 原型链

```js
// 实战 简述原理 实现一个instance函数
// 思路：遍历A的原型链，如果找到B.prototype返回true，否则为false

const instance = (A, B) => {
  let p = A;
  while (p) {
    if (p === B.prototype) {
      return true;
    }
    p = p.__proto__;
  }
  return false;
};

instance([], Array);
console.log("11");
```
