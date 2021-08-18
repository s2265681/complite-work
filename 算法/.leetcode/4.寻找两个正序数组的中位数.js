/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 
var findMedianSortedArrays = function (nums1, nums2) {
  if (!(nums1 instanceof Array && nums2 instanceof Array)) return;
  let m = nums1.length,
    n = nums2.length,
    t = m + n,
    midNum,
    conArr = [...nums1, ...nums2].sort((a, b) => a - b),
    midIndex = Math.floor(t / 2),
    lastIndex = midIndex - 1,
    result;

  if (m + n === 1 && m == 1) return nums1[0].toFixed(5);
  if (m + n === 1 && n == 1) return nums2[0].toFixed(5);

  if (t < 1 || t > 2000) return;
  if (t % 2) {
    // 奇数
    midNum = conArr[midIndex];
  } else {
    midNum = (conArr[lastIndex] + conArr[midIndex]) / 2;
  }
  result = midNum.toFixed(5);
  return result;
};

// Accepted
//  2094/2094 cases passed (124 ms)
//  Your runtime beats 72.42 % of javascript submissions
//  Your memory usage beats 20.57 % of javascript submissions (44 MB)
// @lc code=end

let a = findMedianSortedArrays([1, 3], [2, 4]); // [1,2,3]
console.log(a); // 2.0
