/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let j = nums.length - 1;
  for (let i = 0; i < j; ) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    } else {
      i++;
    }
    if (nums[j] === 0) {
      j--;
    }
  }
};
// @lc code=end
console.log(moveZeroes([0, 1, 0, 3, 12]));
