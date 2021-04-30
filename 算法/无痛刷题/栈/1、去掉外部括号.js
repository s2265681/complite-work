
/**
 * 
 * @param {}} S
 * https://leetcode-cn.com/problems/remove-outermost-parentheses/
 * 操作栈  pop删除后面  shift 删除最左边 push 添加到最后面  unshift 添加到头部 
 * 1、判断是左还是右 ， 左添加进栈 匹配到一次右 删除一次左的 当栈空时 拿取结果 去掉两头 依次循环
 */
var removeOuterParentheses = function (S) {
     let isLeft = (c)=> c === '(',
     stack = [],
     midRes = [],
     result = [];
     for(let i=0;i<S.length;i++){
         if(isLeft(S[i])){
            stack.push(S[i])
         }else{
            stack.pop()
         }
         midRes.push(S[i])
         if(stack.length==0){
            midRes.shift()
            midRes.pop()
            result.push(midRes)
            midRes = []
            continue
         }
     }
     return result.flat().join('')
};

let str1 =   "(()())(())"
let str2 =   "(()())(())(()(()))"
// "(()())(())(()(()))"
let str3 = "()()"
let str4 = "(()())(())(()(()))"
// ['(', ')', '(', ')', '(', '(', ')']
// "(()())(())(()(()))"
let res = removeOuterParentheses(str4);
console.log(res);


