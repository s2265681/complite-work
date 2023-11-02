// ：root = [4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
var root = {
  val: "4",
  left: {
    val: "2",
    left: {
      val: "1",
    },
    right: {
      val: "3",
    },
  },
  right: {
    val: "7",
    left: {
      val: "6",
    },
    right: {
      val: "9",
    },
  },
};

var root2 = {
  val: "1",
  left: {
    val: "2",
  },
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  const inorder = (root) => {
    if (root == null) return null;
    const left = inorder(root.left);
    const right = inorder(root.right);
    root.left = right;
    root.right = left;
    return root;
  };
  inorder(root);
  return root;
};

console.log(invertTree(root));
