// https://leetcode.cn/problems/lMSNwu/

/**
 * *
 * 给定两个 非空链表 l1和 l2 来代表两个非负整数。数字最高位位于链表开始位置。
 * 它们的每个节点只存储一位数字。
 * 将这两数相加会返回一个新的链表。
 * 可以假设除了数字 0 之外，这两个数字都不会以零开头。
/**
 * 输入：l1 = [7,2,4,3], l2 = [5,6,4]
 * 输出：[7,8,0,7]
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const { LinkList, ListNode } = require("./createLinkList");

var addTwoNumbers = function (l1, l2) {
  function revertLink(head) {
    let p = head;
    let newP = null;
    while (p) {
      let temp = p.next;
      p.next = newP;
      newP = p;
      p = temp;
    }
    return newP;
  }
  l1 = revertLink(l1);
  l2 = revertLink(l2);
  let p1 = l1;
  let p2 = l2;
  let flag = 0;
  let p3 = new ListNode(0);
  let l3 = p3;
  while (p1 || p2 || flag) {
    const val = (p1?.val || 0) + (p2?.val || 0) + flag;
    const num = val % 10 || 0;
    flag = Math.floor(val / 10);
    p3.next = new ListNode(num);
    p3 = p3.next;
    p1 = p1?.next;
    p2 = p2?.next;
  }
  return revertLink(l3.next);
};

const l1 = new LinkList();
l1.add(7).add(2).add(4).add(3);
const l2 = new LinkList();
l2.add(5).add(6).add(4);

console.log(addTwoNumbers(l1.head, l2.head)); //[7,8,0,7]
