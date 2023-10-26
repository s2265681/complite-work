// https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked

var root = {
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
      left: "AA",
    },
  },
};

// var maxDepth = function (root) {
//   return root == null
//     ? 0
//     : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
// };

var maxDepth = function (root) {
  // 利用DFS深度优先搜索， 借助level标记 On
  if (root == null) return 0;
  let ans = 0;
  const _dfs = (node, level) => {
    if (node == null) return;
    if (ans < level + 1) ans = level + 1;
    _dfs(node.left, level + 1);
    _dfs(node.right, level + 1);
  };
  _dfs(root, 0);
};

console.log(maxDepth(root));
