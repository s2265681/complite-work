// https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-100-liked
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。
// [1,3,5,6]  5  返回 2
// [1,3,5,6]  2 返回 1
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  // 边界判断
  if (nums[0] >= target) return 0;
  if (nums[r] < target) return nums.length;

  while (l <= r) {
    if (nums[l] < target) {
      l++;
    }
    if (nums[r] > target) {
      r--;
    }
    if (nums[l] >= target && nums[r] <= target) return l;
  }
};

// console.log(searchInsert([1, 3, 5, 6], 3));
// console.log(searchInsert([2], 1));
// console.log(searchInsert([1, 3], 3));
// console.log(searchInsert([1, 3, 5], 4));
