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
    let temp = cur.next;
    cur.next = newHead;
    newHead = cur;
    cur = temp;
  }
  return newHead;
};

console.log(JSON.stringify(reverseList(ll.head)));
