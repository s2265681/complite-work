const tree = require("./treeJson");
/**
 * 广度优先遍历
 */

const bfs = (root) => {
  const q = [root];
  while (q.length > 0) {
    const n = q.shift();
    console.log(n.val);
    n.children.forEach((child) => {
      q.push(child);
    });
  }
};

bfs(tree);

// a b c d e f g
