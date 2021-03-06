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

- [349] 两个数组的交集 (使用 Map)

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
var isValid = function (s) {
  let map = new Map();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");
  if (s.length % 2 === 1) return false;
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let cur = s[i];
    if (map.has(cur)) stack.push(map.get(cur));
    if (!map.has(cur) && stack.pop() !== cur) return false;
  }
  return !stack.length;
};
```

- [1] 两数之和

```js
// 使用Map这个数据结构
// 将数组循环用map组合成键值对， 存起 如 {2,3} => 5
// 下一个来查找时， 发现有就返回各自的index， 否则就存到map里
// console.log(twoSum([2, 7, 11, 15], 9));
// 时间复杂度O(n)
// 空间复杂度O(n) map 线性增长
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    } else {
      map.set(target - nums[i], i);
    }
  }
};
```

- 【3】 无重复字符最长子串

```js
var lengthOfLongestSubstring = function (s) {
  // 解法1 双指针维护滑动窗口
  // 思路是 1、维护窗口， 遇到重复字符移动左指针到重复字符下标后面
  // 保存每次的大小， 进行对比
  // 时间复杂度O(n)
  // 空间复杂度O(m) m 是不重复的个数
  let l = 0;
  let res = 0;
  let map = new Map();
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      l = map.get(s[r]) + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(s[r], r);
  }
  return res;
};
```

- 【76】 最小覆盖子串

```js
// @lc code=start
/**
 * 给你一个字符串 s 、一个字符串 t 。
 * 返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 思路：
 * 找出所有包含T的子串
 * 找出长度最小的子串，返回
 * 步骤：
 * 用双指针滑动窗口
 * 移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串长度
 * 时间复杂度 O(m+n) m是t的长度，n是s的长度
 * 空间复杂度 O(m)
 */
var minWindow = function (s, t) {
  let l = 0,
    r = 0;
  const need = new Map();
  // 先建一个字典 记录需要的字符 和 响应的匹配个数
  for (const c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  let needType = need.size;
  let res = "";
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) needType -= 1;
    }
    while (needType === 0) {
      // console.log(s.substring(l,r+1));
      let newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const l2 = s[l];
      if (need.has(l2)) {
        need.set(l2, need.get(l2) + 1);
        if (need.get(l2) === 1) needType += 1;
      }
      l += 1;
    }
    r += 1;
  }
  return res;
};
// @lc code=end
console.log(minWindow("ADOBECODEBANC", "ABC"));

// ADOBEC;
// DOBECODEBA;
// OBECODEBA;
// BECODEBA;
// ECODEBA;
// CODEBA;
// ODEBANC;
// DEBANC;
// EBANC;
// BANC;
```
