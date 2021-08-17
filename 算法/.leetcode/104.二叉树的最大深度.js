/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 */
// 二叉树。 多叉树可简化成二叉树。 二叉树是最有利存储的
var maxDepth = function(root) {
   if(root == null){
       return 0
   }
   // 左右 + 1
   return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
};
// @lc code=end

