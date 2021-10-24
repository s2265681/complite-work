/*
 * @lc app=leetcode.cn id=65 lang=javascript
 *
 * [65] 有效数字
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 构建一个表示状态的图，遍历字符串，并沿着图走，如果到了某个节点无路可走返回false，遍历结束，走到了3，5，6返回true，否则返回false
 * 使用邻表 graph 0
 * 图： https://cdn.nlark.com/yuque/0/2021/jpeg/1225858/1635063249201-a34eee64-f7ae-4cfd-88c0-42c37d911f0d.jpeg
 * 时间复杂度： O(N)
 * 空间复杂度： O(1)
 */
// var isNumber = function (s) {
//   const graph = {
//     0: { 'sign': 1, ".": 2, 'digit': 6 },
//     1: { ".": 2, 'digit': 6 },
//     2: { 'digit': 3 },
//     3: { 'digit': 3, 'e': 4 },
//     4: { 'sign': 7, 'digit': 5 },
//     5: { 'digit': 5 },
//     6: { 'digit': 6, ".": 3, 'e': 4 },
//     7: { 'digit': 5 },
//   };
//   let state = 0;
//   for (let c of s.trim().toLowerCase()) {
//     if (c >= "0" && c <= "9") {
//       c = "digit";
//     } else if (c === "+" || c === "-") {
//       c = "sign";
//     }
//     state = graph[state][c];
//     if (state === undefined) {
//       return false;
//     }
//   }
//   if (state === 3 || state === 5 || state === 6) {
//     return true;
//   }
//   return false;
// };
function isNumber(s) {
  const graph = {
    0: { digit: 3, sign: 1, dot: 2 },
    1: { digit: 3, dot: 2 },
    2: { digit: 4 },
    3: { digit: 3, e: 5, dot: 4 },
    4: { digit: 4, e: 5 },
    5: { digit: 6, sign: 7 },
    6: { digit: 6 },
    7: { digit: 6 },
  };
  let state = 0;
  for (let c of s.trim().toLowerCase()) {
    if (c >= "0" && c <= "9") {
      c = "digit";
    } else if (c === ".") {
      c = "dot";
    } else if (c === "+" || c === "-") {
      c = "sign";
    }
    state = graph[state][c];
    if (state === undefined) return false;
  }
  if (state === 3 || state === 4 || state === 6) {
    return true;
  }
  return false;
}
// @lc code=end
// console.log(isNumber('0'))
// console.log(isNumber('e'))
// console.log(isNumber('.'))
// console.log(isNumber(".1"));
// console.log(isNumber('0'))
// console.log(isNumber("0e"));
console.log(isNumber("1E9"));
// 有效 ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
// 无效 ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]


// 解题：
// https://cdn.nlark.com/yuque/0/2021/png/1225858/1635081074218-af5dfba5-f059-4c33-a1d9-84b7d5cba898.png