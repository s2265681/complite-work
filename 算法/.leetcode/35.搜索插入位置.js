/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 二分法 O(log n)
 * 边界条件的判断
 */
var searchInsert = function (nums, target) {
  const numsLen = nums.length;
  let left = 0,
    right = numsLen; // 区间 [0,4]
  // 边界
  if (target <= nums[0]) return 0;
  if (target >= nums[numsLen]) return numsLen;

  // 中间二分法查找
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (target === nums[mid]) {
      return mid;
    }
    if (target > nums[mid]) {
      left = mid + 1;
    }
    if (target < nums[mid]) {
      right = mid;
    }
  }
  // 当left 和 right 相同时
  return left;
};
// @lc code=end
// console.log(searchInsert([1, 3, 4, 5, 6], 5)); // 3
// console.log(searchInsert([1, 3, 5, 6], 5)); // 2
// console.log(searchInsert([1, 3, 5, 6], 2)); // 1
// console.log(searchInsert([1, 3, 5, 6], 7)); // 4
// console.log(searchInsert([1, 3, 5, 6], 0)); // 0
// console.log(searchInsert([1], 0)); // 0
