/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
 * 思路 两数之和： 先创建一个节点，循环进位，和两个链表有值时  进行循环
 * 注意处理 进位与 链表无之的特殊情况
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let curry = 0; // 进位
  let flag = (cur = new ListNode(0));
  while (curry || l1 || l2) {
    let val1 = l1 !== null ? l1.val : 0;
    let val2 = l2 !== null ? l2.val : 0;
    let sum = val1 + val2 + curry;
    curry = sum >= 10 ? 1 : 0;

    cur.next = new ListNode(sum % 10);
    cur = cur.next;

    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 == l2.next;
    }
  }
  return flag.next;
};
