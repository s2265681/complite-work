const graph = require("./graph");

/**
 * 图的深度优先遍历
 * @param 
 *  口诀：  
    1、访问跟节点
    2、对跟节点的`没访问过的相邻节点`挨个进行深度优先遍历 (避免死循环)
 */
const visited = new Set()
const dfs = (n) => {
  console.log(n);
  visited.add(n)
  graph[n].forEach(c=>{
      if(!visited.has(c)){
          dfs(c)
      }
  })
};
// dfs(2)  //=> 2 、 0 、1 、 3
// dfs(1)  //=> 1、 2、0、 3
dfs(0)  //=> 0、1、2、3
