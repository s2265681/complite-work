/**
 * https://leetcode.cn/problems/linked-list-cycle/
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// var hasCycle = function (head) {
//   if (!head) return false;
//   l1 = head;
//   l2 = head;
//   while (l1 && l2 && l2.next) {
//     l1 = l1.next;
//     l2 = l2.next.next;
//     if (l1 === l2) {
//       return true;
//     }
//   }
//   return false;
// };

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

// head = [3,2,0,-4], pos = 1 => true  解释：链表中有一个环，其尾部连接到第二个节点。
// 输入：head = [1,2], pos = 0  => true 解释：链表中有一个环，其尾部连接到第一个节点。
// head = [1], pos = -1 => false 链表中没有环。
let a = {
  val: 1,
  naxt: null,
};
let b = {
  val: 2,
  naxt: null,
};
a.next = b;
b.next = a;
let l = a;

console.log(hasCycle(l));

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 思路 2
// var hasCycle = function (head) {
//   let p = head;
//   let k = 0;
//   while (p) {
//     k = k + 1;
//     p.key = k;
//     if (p && p.next && p.next.key <= p.key) {
//       return true;
//     }
//     p = p.next;
//   }
//   return false;
// };
