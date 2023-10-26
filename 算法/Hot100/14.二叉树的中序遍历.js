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
 * @return {number[]}
 */
// var inorderTraversal = function (root) {
//   // 迭代
//   const res = [],
//     stack = [];
//   while (root) {
//     // 能压的左子节点都压进来
//     stack.push(root);
//     root = root.left;
//   }
//   while (stack.length) {
//     let node = stack.pop(); // 栈顶出栈
//     res.push(node.val); // 压入右子树之前，处理数值
//     node = node.right; // 获取右子树
//     while (node) {
//       // 右子树存在，执行while循环
//       stack.push(node); // 压入当前root
//       node = node.left; // 不断压入左子节点
//     }
//   }
//   return res;
// };

// var inorderTraversal = function (root) {
//   // 递归法
//   const res = [];
//   const inorder = (root) => {
//     if (root == null) return;
//     inorder(root.left);
//     res.push(root.val);
//     inorder(root.right);
//   };
//   inorder(root);
//   console.log(res, "res");
//   return res;
// };
// 输入：root = [1,null,2,3]
// 输出：[1,3,2]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]
// root = [1, null, 2, 3];
root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "C",
    },
    right: {
      val: "D",
    },
  },
  right: {
    val: "E",
    left: {
      val: "F",
    },
    right: {
      val: "G",
    },
  },
};

// 复习
const inorderTraversal = (root) => {
  // // 1、递归
  // const res = [];
  // const inorder = (root) => {
  //   if (root == null) return;
  //   inorder(root.left);
  //   inorder(root.right);
  //   res.push(root.val);
  // };
  // inorder(root);
  // return res;

  // 2、迭代
  const stack = [],
    res = [];
  // while (root) {
  //   stack.push(root);
  //   root = root.left;
  // }
  // while (stack.length) {
  //   let node = stack.pop();
  //   res.push(node.val);
  //   node = node.right;
  //   while (node) {
  //     stack.push(node);
  //     node = node.left;
  //   }
  // }
  // return res;
};
console.log(inorderTraversal(root));
//中序： C 、 B 、 D 、 A 、 F 、 E 、 G
//前序： A 、 B 、 C 、 D 、 E 、 F 、 G
//后序： C 、 D 、 B 、 F 、 G 、 E 、 A
