const btJson = require('./btJson') 
// 先序遍历 （访问根节点、对根节点左子树进行先序遍历、对根节点的右子树进行先序遍历）
const preorder = (root) => {
  if (!root) return;
  console.log(root.val,'??');
  preorder(root.left);
  preorder(root.right);
};
preorder(btJson);

// 1,2,4,5,3,6,7
