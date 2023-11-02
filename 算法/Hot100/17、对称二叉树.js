// [1,2,2,3,4,4,3]
// true
var root = {
  val: "1",
  left: {
    val: "2",
    left: {
      val: "3",
    },
    right: {
      val: "4",
    },
  },
  right: {
    val: "2",
    left: {
      val: "4",
    },
    right: {
      val: "3",
    },
  },
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var isSymmetric = function (root) {
  let map = {};
  const inorder = (root) => {
    if (root == null) return null;
    const left = inorder(root.left);
    const right = inorder(root.right);
    console.log(left, right);
    return root;
  };
  inorder(root);
  console.log(map, "map;;;;;");
};

console.log(isSymmetric(root));
