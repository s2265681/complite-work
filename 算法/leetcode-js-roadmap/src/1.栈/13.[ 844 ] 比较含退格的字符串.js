/**
 * * 题目名称：比较含退格的字符串
 * * 题目地址：https://leetcode-cn.com/problems/backspace-string-compare
 * * 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
 * ! 注意：如果对空文本输入退格字符，文本继续为空。
 */

// * 思路：
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * ? 仍然采用栈的方式进行 ， 当遇到#时 pop栈  否则push到栈中 ， 维护两个栈  最后进行比较
 */
var backspaceCompare = function (s, t) {
  const c = (s, a = []) => {
    for (let i = 0; i < s.length; i++) {
      s[i] === "#" ? a.pop() : a.push(s[i]);
    }
    return a.join("");
  };
  return c(s) == c(t);
};

// 测试用例
// 输入：S = "ab#c", T = "ad#c"
// 输出：true
// 解释：S 和 T 都会变成 “ac”。

// 输入：S = "ab##", T = "c#d#"
// 输出：true
// 解释：S 和 T 都会变成 “”。

// 输入：S = "a#c", T = "b"
// 输出：false
// 解释：S 会变成 “c”，但 T 仍然是 “b”。

// "y#fo##f"   "y#f#o##f"
// => f      f
console.time("执行用时");
console.log(backspaceCompare("y#fo##ff", "y#f#o##f"));
console.timeEnd("执行用时");
