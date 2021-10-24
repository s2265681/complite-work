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

/**
 * 深度优先遍历处理JSON数组
 */
const json = {
  a: { b: { c: 1} },
  d: [1,2]
}
 
const dfs2 = (n,path)=>{
   console.log(n,path)
   Object.keys(n).forEach(k=>{
     dfs2(n[k],path.concat(k))
   })
}

dfs2(json,[])


