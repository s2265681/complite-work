/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

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
// @lc code=end
