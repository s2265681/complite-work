//https://leetcode.cn/problems/minimum-depth-of-binary-tree/
// 二叉树的左右子叶到根部的最小值

// 使用后序遍历， 注意的是 左节点可能是空， 就跟求最大深度一样了

let root = {
  val: 3,
  left: {
    val: 9,
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7,
    },
  },
};

// 返回2
var minDepth = function (root) {
  if (root == null) return 0;
  const leftHeight = minDepth(root.left);
  const rightHeight = minDepth(root.right);
  if (root.left == null && root.right !== null) return rightHeight + 1;
  if (root.right == null && root.left !== null) return leftHeight + 1;
  return Math.min(leftHeight, rightHeight) + 1;
};

console.log(minDepth(root));
