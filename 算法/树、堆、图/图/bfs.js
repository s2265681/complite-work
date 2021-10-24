const graph = require("./graph");

/**
 * 图的深度优先遍历
 * @param 
    口诀
    1、新建一个队列，把跟节点入队
    2、把对头出队并访问
    3、把对头的`没访问过的相邻节点`入队
    4、重复第二、三步，直到队列为空
 */

const visited = new Set();

// 起始节点2
visited.add(3);
const q = [3];

while (q.length) {
  const n = q.shift();
  console.log(n);  
  graph[n].forEach((c) => {
    if (!visited.has(c)) {
      q.push(c);
      visited.add(c);
    }
  });
}

// 2 开始 2、0、3、1
// 1 开始 1、2、0、3
// 0 开始 0、1、2、3
// 3 开始 3