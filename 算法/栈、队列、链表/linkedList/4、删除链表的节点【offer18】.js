/**
 * https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

//  输入: head = [4,5,1,9], val = 5
//  输出: [4,1,9]
//  解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
const { LinkList, ListNode } = require("./createLinkList");

var deleteNode = function (head, val) {
  let p = head;
  while (p) {
    // 如果删的是第一个
    if (p.val === val) {
      p.val = p.next.val;
      p.next = p.next.next;
    }
    // 如果删的是中间及最后一个
    if (p.next?.val === val) {
      p.next = p.next.next ? p.next.next : null;
    }
    p = p.next;
  }
  return head;
};

const l1 = new LinkList();
// l1.add(-3).add(-5).add(-99);
// console.log(deleteNode(l1.head, -99)); // [-3,-5]

// l1.add(4).add(5).add(1).add(9);
// console.log(deleteNode(l1.head, 5)); // [4,1,9]

l1.add(-3).add(-5).add(-99);
console.log(deleteNode(l1.head, -3)); // [-5, -99]
