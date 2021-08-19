/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 * 双指针的问题
 * 注意是不返回， 原地修改
 * 解决方案不止一种
 * 1、 循环k次， 每次拿最后面的数 添加到最前面
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  // 方法一 O(n)
  //    for(let i=0;i<k;i++){
  //       nums.unshift(nums.splice(-1)[0])
  //    }
  //    return nums

  // 方法二  k 为 2 时  新数组的开始就是 len - 2
  // 用slice截数组 ， 拼接
  if (k >= nums.length) {
    k = k % nums.length;
  }
  let start = nums.length - k;
  let r = nums.splice(start);
  nums.unshift(...r);
};
// @lc code=end

let n = [-1, -100, 3, 99];
console.log(rotate(n, 6));
console.log(n, "...");
