const tree = require("./treeJson");
/**
 * 深度优先遍历
 */
const dfs = (root) => {
  // 访问根节点
  console.log(root.val);
  // 对根节点的children挨个进行递归遍历
  root.children.forEach(dfs);
};
dfs(tree);
// a b d e c f g
