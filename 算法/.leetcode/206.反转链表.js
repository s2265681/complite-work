/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
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
// @lc code=end
