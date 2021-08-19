/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */

// isBadVersion = function(version) {

// };
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1,
      right = n;
    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2); // 防止计算溢出
      if (isBadVersion(mid)) {
        right = mid; // [left, mid]
      } else {
        left = mid + 1; // [mid,right]
      }
    }
    // left === right  区间缩为一个点，即为答案
    return left
  };
};
// @lc code=end
// console.log(solution(5)(4)); //=> 4
// console.log(solution(1)(1));  //=> 1
