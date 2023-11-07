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

const inorder2 = (root) => {
  if (root == null) return;
  const stack = [];
  let cur = root;
  let res = [];
  while (cur !== null || stack.length) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
  }
  return res;
};

console.log(inorder(btJson));

// 参考答案
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
