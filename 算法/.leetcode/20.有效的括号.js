/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
let type = {
  "(": ")",
  "[": "]",
  "{": "}",
};
var isValid = function (s) {
  if (s.length % 2 === 1) return false;
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let cur = s[i];
    if (type[cur]) stack.push(type[cur]);
    if (!type[cur] && stack.pop() !== cur) return false;
  }
  return !stack.length;
};
// @lc code=end
// let s = "()"; // => true
// let s = "()[]{}" // => true
// let s = "(]" // => false
// let s = "([)]"; // => false
// let s = "{[]}" // => true
// let s = "]"; // => false
let s = "([{}])";
console.log(isValid(s));
