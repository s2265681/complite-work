/**
 * @param {string} s
 * @return {boolean}
 * https://leetcode-cn.com/problems/valid-parentheses/submissions/
 * ! 判断是否有效括号闭合  只有() []  {} 为合格
 * ! 思路： 通过栈来判断  没有的添加到栈 与栈中匹配 如果相等 pop 否则 继续添加
 */
 var isValid = function (s) {
    debugger;
    let stack = [],
      stackLast = "",
      nextLast = "";
  
    let match = {
      "(": ")",
      "[": "]",
      "{": "}",
    };
    // let nextItem = ''
    for (let i = 0; i < s.length; i++) {
      let item = s[i];
      // stackLast = stack[stack.length-1];
      if (match[item]) {
        // 存在左侧边的直接进来
        stack.push(s[i]); // (  {  [
      } else if (item === nextLast) {
        stack.pop();
      } else {
        return false;
      }
      stackLast = stack[stack.length - 1];
      nextLast = match[stackLast];
    }
    if (stack.length === 0) {
        return true
    }
    return false
  };
  
  // let a = isValid('()[]{})')
  // let a = isValid("({)}");
  let a = isValid("[")
  
  console.log(a, "aaa");
  