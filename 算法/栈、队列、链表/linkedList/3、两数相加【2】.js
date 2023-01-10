const { LinkList, ListNode } = require("./createLinkList");
/**
 * 给你两个 非空 的链表，表示两个非负的整数。
 * 它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
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

const l1 = new LinkList();
// l1.add(2).add(4).add(3);
// l1.add(0);
l1.add(7).add(2).add(4).add(3);
const l2 = new LinkList();
// l2.add(5).add(6).add(4);
// l2.add(0);
l2.add(5).add(6).add(4);

console.log(addTwoNumbers(l1.head, l2.head)); // 7 0 8
