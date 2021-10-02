# 字典

- 与集合类似，字典也是一种存储唯一值的数据结构，但它是以`键值对`形式存储
- ES6 中有字典，名为 Map
- 字典常用操作，键值对的增删改查

## coding

```js
const m = new Map();

// 增
m.set("a", "aa");

// 查
m.get("a");

// 改
m.set("a", "aaa");

// 删
m.delete("a");

m.clear();
```

## LeetCode

- [349] 两个数组的交集 (使用Map)

```js
// 使用Map进行查交集
// 新建一个字典，建立映射关系，
// 从一个字典里找到后，把第二个选出来的删除防止重复
// 时间复杂度 O(n) 两个双循环但是没有嵌套 是Om+On
// 空间复杂度 O(m)
var intersection = function (nums1, nums2) {
  let map = new Map();
  nums1.forEach((n) => {
    map.set(n, true);
  });
  let res = [];
  nums2.forEach((n2) => {
    if (map.has(n2)) {
      res.push(n2);
    }
    map.delete(n2);
  });
  return res;
};
```

- [20] 有效的括号

```js

```