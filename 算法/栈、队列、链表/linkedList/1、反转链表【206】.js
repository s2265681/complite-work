let ll = {
  head: {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: null,
      },
    },
  },
};

// 【206】反转链表
var reverseList = function (head) {
  let cur = head;
  let newHead = null;
  while (cur) {
    // 保存下一个指针
    let temp = cur.next;
    // 更改下一个指针为新链表的头部
    cur.next = newHead;
    // 新链表的节点指向当前节点
    newHead = cur;
    // 循环节点， 当前节点始终为下一个节点的值，直到为null
    cur = temp;
  }
  return newHead;
};

console.log(JSON.stringify(reverseList(ll.head)));
