

# 栈

- 一个后进先出的数据结构
- JS中没有栈，但是可以用Array实现栈的所有功能

## Coding

```js
const stack = []
stack.push(1)
stack.push(2)
const item1 = stack.pop()
const item2 = stack.pop()
```

## 应用场景

#### 十进制转二进制
35 =>  35/2 .. 100011  后出来的玉树反而要排到前面

#### 判断字符串的括号是否有效 【20】
从左到右遍历、遇到做括号入栈、遇到右括号出栈，最后栈空为合法
```js
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
```

#### 函数调用堆栈 JS 解释器使用栈来控制函数的调用顺序