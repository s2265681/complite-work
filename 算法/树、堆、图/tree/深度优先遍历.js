const tree = require("./treeJson");
const btJson = require("./btJson");

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

/**
 * 深度优先遍历处理JSON数组
 */
const json = {
  a: { b: { c: 1 } },
  d: [1, 2],
};

const dfs2 = (n, path) => {
  console.log(n, path);
  Object.keys(n).forEach((k) => {
    dfs2(n[k], path.concat(k));
  });
};

dfs2(json, []);

const getHeight = (root) => {
  if (root == null) return 0;
  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);
  let height = 1 + Math.max(leftHeight, rightHeight);
  return height;
};

console.log(getHeight(btJson));
