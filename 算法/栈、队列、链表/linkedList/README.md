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

## 前端链表知识点

- JS 中的原型链也是一个链表
- 使用链表指针可以获取 JSON 的节点值

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

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 * 思路：
 * 反转两个节点 n+1的next指向n就可以了
 * 反转多个节点， 双指针便历链表，重复上述操作
 * do
 * 双指针一前一后遍历链表
 * 反转双指针
 */
var reverseList = function (head) {
  let p1 = head; // => 1
  let p2 = null;
  while (p1) {
    let tmp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = tmp;
  }
  return p2;
};
```

- 【2】两数相加

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 新建一个空链表，用来追加值
 * 遍历两个想家链表，模拟想家操作，
 * 将个位数追加到新链表，十位数保留到下一位
 * 如果最后有carry，追加到最后
 */
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode(0);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const v1 = p1?.val || 0;
    const v2 = p2?.val || 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    p3.next = new ListNode(val % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    p3 = p3.next;
  }
  if (carry) p3.next = new ListNode(carry);
  return l3.next;
};
```

- 【83】 删除排序链表中的重复元素

```js
/*
 * 思路
 * 【1，1，2】 =》 【1，2】
 * 【1,1,2,3,3】 =》 【1,2,3】
 *  当前节点的值等于下个节点的值，就删除下个节点值
 *  p.next = p.next.next
 */
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};
```

- 【141】 判断链表是否有环

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 * 思路 1
 * 两个指针，一个快一个慢，判断是否能追上，判断是不是有环
 * 思路 2
 * 给每个元素放一个key，循环判断，当key变小了，说明有环，否则说明没有环
 */
// 思路1
var hasCycle = function (head) {
  let p = head;
  let k = 0;
  while (p) {
    k = k + 1;
    p.key = k;
    if (p && p.next && p.next.key <= p.key) {
      return true;
    }
    p = p.next;
  }
  return false;
};
// 思路2
var hasCycle = function (head) {
  let p1 = head;
  let p2 = head;
  while (p1 && p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
    if (p1 === p2) {
      return true;
    }
  }
  return false;
};
```

- 实现 instance

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
