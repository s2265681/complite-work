/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 *  双指针
 *  数组是有序的， 两端的绝对值 其实决定了数组的大小， 可以通过双指针的方式， 循环 比较挪动指针
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  // 法一 循环 平方 排序
  // return nums.map(el=>Math.pow(el,2)).sort((a,b)=>a-b)
  //   let result = [];
  //   for (let i = 0, j = nums.length - 1; i <= j; ) {
  //     let left = Math.abs(nums[i]);
  //     let right = Math.abs(nums[j]);
  //     if (left > right) {
  //       result.unshift(Math.pow(left, 2));
  //       i++;
  //     } else {
  //       result.unshift(Math.pow(right, 2));
  //       j--;
  //     }
  //   }
  //   return result
  let res = [];
  let x = 0,
    y = nums.length - 1;
  while (x <= y) {
    let left = Math.abs(nums[x]);
    let right = Math.abs(nums[y]);
    if (left > right) {
      res.unshift(left * left);
      x++;
    } else {
      res.unshift(right * right);
      y--;
    }
  }
  return res;
};
// @lc code=end
console.log(sortedSquares([-4, -1, 0, 3, 10])); //=> [0,1,9,16,100]
