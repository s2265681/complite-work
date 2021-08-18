/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 关键是两个数之差时，需要i++一位
 */

let map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
var romanToInt = function (s) {
  let total = 0,
    first = 0,
    second = 0;
  for (let i = 0; i < s.length; i++) {
    first = map[s[i]];
    second = map[s[i + 1]];
    if (first < second) {
      total += second - first;
      i++;
    } else {
      total += map[s[i]];
    }
  }
  return total;
};
// @lc code=end
console.log(romanToInt("III")); // 3
console.log(romanToInt("IV")); // 4
console.log(romanToInt("IX")); // 9
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994
