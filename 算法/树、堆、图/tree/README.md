# 树

- 树是一种分层数据的抽象模型
- 前端工作中常见的树包括：DOM、及联选择、树形控件...

## 树是什么

- JS 中没有树，但是可以用 Object 和 Array 构建树

## 树的常用操作

- 深度优先遍历： 尽可能深的搜索树的分支
- 广度有限遍历： 先访问离根节点最近的节点
- 先中后序遍历

## 深度优先遍历

- 口诀：
- 访问根节点
- 对根节点的 children 挨个进行深度进行优先遍历

```js
const dfs = (root) => {
  // 访问根节点
  console.log(root.val);
  // 对根节点的children挨个进行递归遍历
  root.children.forEach(dfs);
};
dfs(tree);
// a b d e c f g
```

## 广度有限遍历：

- 口诀：
- 新建一个队列，把根节点入队
- 把队头出队并访问
- 把队头的 children 挨个入队
- 重复第二、第三，直到队列为空

```js
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
```

## 总结

- 深度： 递归
- 广度： 队列， 不断 push child

## 二叉树的先中后序遍历

二叉树是什么？

- 树中每个节点最多只能有两个子节点。
- 在 JS 中通常用 Object 来模拟二叉树

- 先序遍历 (访问根节点、对根节点左子树进行先序遍历、对根节点的右子树进行先序遍历)
- 中序遍历 (对根节点的左子树进行中序遍历，访问根节点，对根节点的右子树进行中序遍历)
- 后序遍历 (对根节点的左子树进行后序遍历，对根节点的右子树进行后续遍历，访问根节点)

```js
const inorder = (root) => {
  if (!root) return;
  console.log("前序遍历:", root.val);
  inorder(root.left);
  console.log("前序遍历:", root.val);
  inorder(root.right);
  console.log("后序遍历:", root.val);
};
```

## LeetCode 【104】 二叉树的最大深度

```js
// 时间复杂度 O(n)
// 空间复杂度 O(logN) - O(n)
var maxDepth = function (root) {
  // 深度递归二叉树， 记录最大深度
  if (!root) return 0;
  let res = 0;
  const dfs = (n, l) => {
    if (!n) return;
    console.log(n.val, l);
    // 只需要当前节点是叶子姐节电，再更新
    if (!n.left && !n.right) {
      res = Math.max(res, l);
    }
    dfs(n.left, l + 1);
    dfs(n.right, l + 1);
  };
  dfs(root, 1);
  return res;
};
```

## 二叉树种类

- 满二叉树 2k - 1
- 完全二叉树 底部一定是从左到右连续的
- 二叉搜索树（二叉排序树） 节点便于搜索 前提就是有顺序 logn 级别 左侧节点 小于中间节点 小于右侧节点
- 平衡二叉搜索树 都是有序的 左右子树 高度的绝对值 差不能超过 set、map、monkeymap 插入查询都是 logn 级别

## 二叉树的存储方式

- 线式存储
  [0, 1, 2, 3,4,5,6]
  2 _ i + 1 左孩子
  2 _ i + 2 右孩子
  找坐标为 i 的 左右孩子

- 链式存储

一种两个指针的链表

## 二叉树的遍历方式

> 深度优先遍历 （递归、栈可以模拟递归、迭代法前中后序）
> 一条路搜到底，再回头搜

> 广度优先遍历 （用队列）
> 一层一层、一圈一圈遍历
> 层序遍历

前中后序： 左 -> 左子树
前序： 中左右
中序： 左中右
后续： 左右中

## 二叉树的定义

## 二叉树的递归 解题思路

1.  递归函数的参数和返回值
2.  确定终止条件
3.  确定单层递归的逻辑


## 二叉树的深度 高度
深度： 任意一个节点到根节点的距离  （后序遍历）
高度： 任意一个节点到叶子节点的距离  （前序遍历）