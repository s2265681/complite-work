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
// var maxDepth = function (root) {
//   if (!root) return 0;
//   // 左右 + 1
//   //   console.log(maxDepth(root.left),maxDepth(root.right))
//   return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
// };

var maxDepth = function (root) {
  // 深度递归二叉树， 记录最大深度
  if (!root) return 0;
  let res = 0;
  const dfs = (n, l) => {
    if (!n) return;
    console.log(n.val, l);
    // 只需要当前节点是叶子姐节电，再更新
    if (!n.left && !n.right) {
      res = Math.max(res, l);
    }
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  dfs(root, 1);
  return res;
};
// @lc code=end
