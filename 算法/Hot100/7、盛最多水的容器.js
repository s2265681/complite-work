/**
 *  盛最多水的容器 中等难度 同类型： 接雨水
 *  给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
 *  找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *  返回容器可以储存的最大水量。
 *
 *  例子 输入：[1,8,6,2,5,4,8,3,7]
 *  输出：49
 *  解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 */

// 思路1： 暴力解法 超出时间
/**
 * @param {number[]} height
 * @return {number}
 */
// var maxArea = function (height) {
//   let maxNum = 0;
//   for (let i = 0; i < height.length; i++) {
//     for (let j = height.length - 1; j > i; j--) {
//       let num = Math.min(height[i], height[j]) * (j - i);
//       maxNum = Math.max(maxNum, num);
//     }
//   }
//   return maxNum;
// };

// 思路2: 通过双指针的思路 从两侧开始， 面积 = 底 * 短的一边  双指针一直移动短的一侧
var maxArea = function (height) {
  let l = 0,
    r = height.length - 1,
    maxNum = 0;
  while (l !== r) {
    let min = Math.min(height[l], height[r]);
    let s = min * (r - l);
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
    maxNum = Math.max(s, maxNum);
  }
  return maxNum;
};
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
// console.log(maxArea([1, 1]));
