/**
 * * 题目名称：删除字符串中的所有相邻重复项
 * * 题目地址：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string
 */

// *  输入："abbaca"
// *  输出："ca"
// * 解释：
// * 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

// * 思路：
// *  循环字符串 考察栈操作 每次执行  当结果中的最后一位和 当前项相同 pop栈中最后一位 否则push到栈中

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  let ret = [];
  let len = S.length;
  let i = 0;
  while (i < len) {
     let last = ret[ret.length - 1]
     let next = S[i]
    if (ret.length !== 0 && last===next ) {
      ret.pop();
    } else {
      ret.push(S[i]);
    }
    i++;
  }
  console.log(ret);
  return ret.join('')
};

// 测试用例
let test = removeDuplicates("abbaca");

console.time("执行用时");
console.log(test);
console.timeEnd("执行用时");
