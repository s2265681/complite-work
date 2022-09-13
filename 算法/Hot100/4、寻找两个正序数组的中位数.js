/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 思路： 应该通过二分 对两个数组分别二分， 找到规律 然后降低算法复杂度  困难难度
var findMedianSortedArrays = function (nums1, nums2) {
  let c = [...nums1, ...nums2].sort((a, b) => a - b);
  if (c.length % 2) {
    return c[Math.floor(c.length / 2)];
  } else {
    return (c[c.length / 2 - 1] + c[c.length / 2]) / 2;
  }
};
