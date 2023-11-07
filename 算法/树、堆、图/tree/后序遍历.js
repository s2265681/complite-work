const btJson = require("./btJson");

// 后序遍历
// 口诀： (对根节点的左子树进行后序遍历，对根节点的右子树进行后续遍历，访问根节点)
const postorder = (root) => {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
};
// 4 5 2 6 7 3 1
// 非递归版
// const postorder = (root) => {
//   if (!root) return;
//   const stack = [root];
//   const outputStack = [];

//   while (stack.length) {
//     const n = stack.pop();
//     outputStack.push(n);
//     if (n.left) stack.push(n.left);
//     if (n.right) stack.push(n.right);
//   }

//   while (outputStack.length) {
//     const n = outputStack.pop();
//     console.log(n.val);
//   }
// };

// 非递归版 中右左 翻转整个数组 左右中
const postorder2 = (root) => {
  if (root == null) return;
  const stack = [root],
    res = [];
  while (stack.length) {
    const n = stack.pop();
    if (n == null) continue;
    res.push(n.val);
    n.left && stack.push(n.left);
    n.right && stack.push(n.right);
  }
  return res.reverse();
};

console.log(postorder2(btJson));

postorder(btJson);
