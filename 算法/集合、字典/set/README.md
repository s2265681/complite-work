# 集合

## 集合的特点

- 一种`无序且唯一`的数据结构。
- ES6 中有集合，名为 Set
- 集合的常用操作， 去重、判断某个元素是否在集合中，求交集...

## Set 操作

- 使用 Set 对象： new 、 add 、delete、has、size
- 迭代 Set：多种迭代方法、Set 与 Array 互转、求交集/差集

## Coding

```js
// 去重
const arr = [1, 2, 3, 2, 3];
const arr2 = [...new Set(arr)];

// 判断元素是否在集合中
const set = new Set(arr);
set.has(1); // true
set.has(4);

// 求交集
const set2 = new Set([2, 3]);
const set3 = new Set([1, 2]);
const set4 = new Set([...set2].filter((item) => set3.has(item)));
console.log(set4, set4.size); // Set { 2 } 1
```

## LeetCode

- 两个数组的交集[349]

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 思路： 求交集且无序且唯一
 * 使用Set集合
 * 时间复杂度 On^2
 * 空间复杂度 On
 */
// 法一
var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter((item) => new Set(nums2).has(item));
};
// 法二
var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter((n) => nums2.includes(n));
};
```
