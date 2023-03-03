//!  https://leetcode.cn/problems/binary-tree-inorder-traversal/

// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

const tree = {};

var inorderTraversal = function (root) {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};

inorderTraversal(tree);
