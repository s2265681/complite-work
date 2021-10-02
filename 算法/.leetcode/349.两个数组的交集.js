/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 思路： 求交集且无序且唯一
 * 使用Set集合
 *
 */
// 时间复杂度  O(n)
// var intersection = function(nums1, nums2) {
//    let arr1 = [...new Set(nums1)]
//    let set2 = new Set(nums2)
//    let res = arr1.filter(item=>set2.has(item))
//    return [...res]
// };

// 时间复杂度  O(n^2)
// var intersection = function (nums1, nums2) {
//   return [...new Set(nums1)].filter((n) => nums2.includes(n));
// };

// 使用Map进行查交集
// 新建一个字典，建立映射关系，
// 从一个字典里找到后，把第二个选出来的删除防止重复
// 时间复杂度  O(n)
var intersection = function (nums1, nums2) {
  let map = new Map();
  nums1.forEach((n) => {
    map.set(n, true);
  });
  let res = [];
  nums2.forEach((n2) => {
    if(map.has(n2)){
      res.push(n2)
    }
    map.delete(n2);
  });
  return res;
};
// @lc code=end
