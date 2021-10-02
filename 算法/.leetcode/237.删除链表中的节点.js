/*
 * @lc app=leetcode.cn id=237 lang=javascript
 *
 * [237] 删除链表中的节点
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
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 * 解题思路， 
 * 无法获取被删除的节点的上个节点
 * 方法是将要删除的节点转移到下个节点， 
 * 让当前节点的值等于下个节点的值, 当前节点的指针，指向下下个节点
 * 这样就可以删除当前节点了
 */
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};
// @lc code=end

