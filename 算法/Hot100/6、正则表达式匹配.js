/**
 * 困难难度
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 */

// 法一 正则
var isMatch = function (s, p) {
  const re = new RegExp(p);
  str = s.match(re) ? s.match(re) : "";
  return str[0] === s ? true : false;
};
console.log(isMatch((s = "aa"), (p = "a*")));

// 法二 递归
// var isMatch = function (s, p) {
//     let getIsMactch = (s, p) => {
//       //判断，如果传入p的长度为0，那么，必须s的长度也为0才会返回true
//       if (p.length === 0) {
//         return !s.length
//       }
//       //判断第一个字符是否相等
//       let match = false
//       if (s.length > 0 && (s[0] === p[0] || p[0] === '.')) {
//         match = true
//       }
//       //p有模式的
//       if (p.length > 1 && p[1] === "*") {
//         //第一种情况：s*匹配0个字符
//         //第二种情况：s*匹配1个字符，递归下去，用来表示s*匹配多个s*
//         return getIsMactch(s, p.slice(2)) || (match && getIsMactch(s.slice(1), p))
//       } else {
//         return (match && getIsMactch(s.slice(1), p.slice(1)))
//       }
//     }
//     return getIsMactch(s, p)
//   };
