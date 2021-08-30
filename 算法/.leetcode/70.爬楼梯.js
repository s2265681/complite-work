/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const f = [];
  f[1] = 1;
  f[2] = 2;
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1];
  }
  return f[n];
};
// @lc code=end