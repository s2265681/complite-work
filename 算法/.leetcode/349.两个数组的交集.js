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
 */
// var intersection = function(nums1, nums2) {
//    let arr1 = [...new Set(nums1)]
//    let set2 = new Set(nums2)
//    let res = arr1.filter(item=>set2.has(item))
//    return [...res]
// };
var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter((n) => nums2.includes(n));
};
// @lc code=end
