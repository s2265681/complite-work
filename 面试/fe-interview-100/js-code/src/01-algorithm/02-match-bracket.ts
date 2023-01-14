/**
 * @description 匹配括号
 * @author rockShang
 */


/**
 * 通用匹配左右的是否匹配
 * @param left 
 * @param right 
 */
function isMatchFn(left: string, right: string): boolean {
    if (left === '(' && right === ')') return true
    if (left === '{' && right === '}') return true
    if (left === '[' && right === ']') return true
    return false
}

/**
 * 匹配括号
 * @param str 
 * @returns 
 */
export function matchBracket(str: string): boolean {
    if (!str) return false
    const stack = []
    const leftSymbool = '({['
    const rightSymbool = ')}]'
    let res = false
    for (let i = 0; i < str.length; i++) {
        let n = str[i]
        // 遇到左侧的符号压入栈
        if (leftSymbool.includes(n)) {
            stack.push(n)
        }
        // 遇到右侧的符号和栈顶的字符进行匹配，匹配就pop， 不匹配直接返回false
        if (rightSymbool.includes(n)) {
            if (isMatchFn(stack[stack.length - 1], n)) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
}


const s = '(a{b[c()]d}f)'
const res = matchBracket(s)
console.log(res, 'res...')