# 链表

- 多个元素组成的列表
- 元素存储顺序不连续，用 next 指针连在一起
- Javascript 中没有链表这个数据结构，但是我们可以通过 Object 模拟链表

## 链表 VS 数组

- 数组： 增删非收尾元素时往往需要移动元素
- 链表： 增删非收尾元素时不需要移动元素，只需要更改 next 指针就可以了

## Coding && 常用的链表操作

```js
const a = { val: "a" };
const b = { val: "b" };
const c = { val: "c" };
const d = { val: "d" };

a.next = b;
b.next = c;
c.next = d;

// 遍历链表
let p = a;
while (p) {
  console.log(p.val);
  p = p.next;
}

// 插入值
const e = { val: "e" };
c.next = e;
e.next = d;

// 删除值
c.next = d;
```

## 链表常用题

- 【237】 删除链表中的结点

```js
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 * 解题思路，
 * 无法获取被删除的节点的上个节点
 * 方法是将要删除的节点转移到下个节点，
 * 让当前节点的值等于下个节点的值, 当前节点的指针，指向下下个节点
 * 这样就可以删除当前节点了
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

- 【206】 反转链表
