// https://leetcode.cn/problems/symmetric-tree/description/?envType=study-plan-v2&envId=top-100-liked

var isSymmetric = function (root) {
  const insymmetric = (left, right) => {
    if (left == null && right !== null) return false;
    if (right == null && left !== null) return false;
    if (left == null && right == null) return true;
    if (left.val !== right.val) return false;
    const outside = insymmetric(left.left, right.right);
    const inside = insymmetric(left.right, right.left);
    return outside && inside;
  };
  return insymmetric(root.left, root.right);
};
