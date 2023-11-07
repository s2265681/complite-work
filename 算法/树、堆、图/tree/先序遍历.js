const btJson = require("./btJson");

// 先序遍历 （访问根节点、对根节点左子树进行先序遍历、对根节点的右子树进行先序遍历）
// 递归版
// const preorder = (root) => {
//   if (!root) return;
//   console.log(root.val, "??");
//   preorder(root.left);
//   preorder(root.right);
// };
// 1,2,4,5,3,6,7

// 非递归版
const preorder = (root) => {
  if (root == null) return;
  const stack = [root],
    res = [];
  while (stack.length) {
    const n = stack.pop();
    if (n == null) continue;
    res.push(n.val);
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
  return res;
};

console.log(preorder(btJson));
