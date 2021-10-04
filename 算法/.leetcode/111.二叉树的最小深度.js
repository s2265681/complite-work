/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * 思路： 广度优先遍历，遇到叶子节点，停止遍历，返回节点层级
 * 步骤： 广度遍历，记录每个节点层级， 遇到叶子节点，返回节点层级，停止遍历
 */
var minDepth = function(root) {
   
};
// @lc code=end

