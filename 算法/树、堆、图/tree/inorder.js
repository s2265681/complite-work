
const btJson = require('./btJson') 

// 中序遍历
// 口诀： (对根节点的左子树进行中序遍历，访问根节点，对根节点的右子树进行中序遍历)
const inorder = (root) => {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
};

inorder(btJson)
// 4 2 5 1 6 3 7
