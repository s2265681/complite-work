
# 图

## 图是什么

- 图是网络数据结构的抽象模型，是一组由边链接的节点
- 图可以表示任何二元关系，比如路航班...


## JS 中的图

- JS中没有图，但是可以用Object和Array构建图。
- 图的表示法： 邻接矩阵、邻接表、关联矩阵...


## 常用操作

- 深度优先遍历： 尽可能深的搜索图的分支

口诀：  
1、访问跟节点
2、对跟节点的`没访问过的相邻节点`挨个进行深度优先遍历 (避免死循环)

- 广度优先遍历： 先访问离跟节点最近的节点

口诀
1、新建一个队列，把跟节点入队
2、把对头出队并访问
3、把对头的`没访问过的相邻节点`入队
4、重复第二、三步，直到队列为空


## LeedCode

- [65] 有效数字

