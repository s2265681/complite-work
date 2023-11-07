// 与 前中后遍历 不同的是 ， 层序遍历 依赖的是 队列 数据结构， 而不是栈
const btJson = require("./btJson");

// 深度优先

// 广度优先
//=> [[1], [2,3], [4,5,6,7,]]
var levelOrder = function (root) {
  if (root == null) return [];
  let que = [root];
  let result = [];
  while (que.length) {
    let vec = [];
    let size = que.length;
    while (size--) {
      let node = que.shift();
      if (node?.val !== undefined) vec.push(node.val);
      if (node?.left) que.push(node.left);
      if (node?.right) que.push(node.right);
    }
    result.push(vec);
  }
  return result;
};

console.log(bfs(btJson));
