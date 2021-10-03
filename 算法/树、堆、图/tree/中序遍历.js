const btJson = require("./btJson");

// 中序遍历
// 口诀： (对根节点的左子树进行中序遍历，访问根节点，对根节点的右子树进行中序遍历)
// const inorder = (root) => {
//   if (!root) return;
//   inorder(root.left);
//   console.log(root.val);
//   inorder(root.right);
// };
// 4 2 5 1 6 3 7

// 非递归版
const inorder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};

inorder(btJson);
