const { LinkList, ListNode } = require("./createLinkList");
/**
 * https://leetcode.cn/problems/add-two-numbers/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function (l1, l2) {
//   let p1 = l1;
//   let p2 = l2;
//   let flag = 0;
//   let head = {};
//   let node = null;
//   while (p1 || p2 || flag) {
//     let newVal = (p1?.val || 0) + (p2?.val || 0) + flag;
//     if (flag !== 0) flag -= 1;
//     if (newVal > 9) {
//       flag += 1;
//       newVal = newVal % 10;
//     }
//     node = new ListNode(newVal);
//     let p = head;
//     while (p.next) {
//       p = p.next;
//     }
//     p.next = node;
//     p1 = p1?.next;
//     p2 = p2?.next;
//   }
//   return head.next;
// };

// var addTwoNumbers = function (l1, l2) {
//   let p1 = l1;
//   let p2 = l2;
//   let flag = 0;
//   let head = new ListNode(0);
//   let p3 = head;
//   while (p1 || p2 || flag) {
//     let newVal = (p1?.val || 0) + (p2?.val || 0) + flag;
//     flag = Math.floor(newVal / 10);
//     node = new ListNode(newVal % 10);
//     p3.next = node;
//     p3 = p3?.next;
//     p1 = p1?.next;
//     p2 = p2?.next;
//   }
//   return head.next;
// };

// 箭指offer https://leetcode.cn/problems/lMSNwu/submissions/
var addTwoNumbers = function (l1, l2) {
  let p1 = l1;
  let p2 = l2;
  let p = null;
  let head = null;
  let flag = 0;

  function revertLink(head) {
    let cur = head;
    let newHead = null;
    while (cur) {
      let temp = cur.next;
      cur.next = newHead;
      newHead = cur;
      cur = temp;
    }
    return newHead;
  }

  l1 = revertLink(p1);
  l2 = revertLink(p2);

  while (l1 || l2 || flag) {
    let totle = (l1?.val || 0) + (l2?.val || 0) + flag;
    flag = Math.floor(totle / 10);
    let pp = totle % 10 || 0;
    if (head === null) {
      head = new ListNode(pp);
      p = head;
    } else {
      p.next = new ListNode(pp);
      p = p.next;
    }
    l1 = l1?.next;
    l2 = l2?.next;
  }
  return revertLink(head);
};
// example
// l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

const l1 = new LinkList();
// l1.add(2).add(4).add(3);
// l1.add(0);
l1.add(7).add(2).add(4).add(3);
const l2 = new LinkList();
// l2.add(5).add(6).add(4);
// l2.add(0);
l2.add(5).add(6).add(4);

console.log(addTwoNumbers(l1.head, l2.head)); // 7 0 8
