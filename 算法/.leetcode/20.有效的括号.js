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
var isValid = function (s) {
  let type = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  let array = [];
  let lastV
  for (let i = 0; i < s.length; i++) {
    let curV = s[i];
    if(curV === lastV){
        array.pop()
        lastV = type[array.slice(-1)]
    }else{
        array.push(curV)
        lastV = type[curV]
    }
  }
  return !array.length;
};
// @lc code=end
// let s = "()"; // => true
// let s = "()[]{}" // => true
// let s = "(]" // => false
// let s = "([)]" // => false
// let s = "{[]}" // => true
// let s = "]"; // => false
// let s = "([{}])"
console.log(isValid(s));
