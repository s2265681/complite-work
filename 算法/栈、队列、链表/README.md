# 栈

- 一个后进先出的数据结构
- JS 中没有栈，但是可以用 Array 实现栈的所有功能

## Coding

```js
const stack = [];
stack.push(1);
stack.push(2);
const item1 = stack.pop();
const item2 = stack.pop();
```

## 应用场景

#### 十进制转二进制

35 => 35/2 .. 100011 后出来的玉树反而要排到前面

```js
function toTwoNum(num) {
  let stack = [];
  while (num >= 2) {
    num = Math.floor(num / 2);
    stack.push(num % 2);
  }
  stack.push(1);
  return stack.join("");
}
```

#### 判断字符串的括号是否有效 【20】

从左到右遍历、遇到做括号入栈、遇到右括号出栈，最后栈空为合法
规则： 新建一个栈，遇到做括号入栈，遇到和栈顶括号类型匹配的右括号出栈，不配 不匹配直接判定不合法
最后，栈空了就合法，否则不合法

```js
// 法一
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

// 法二
var isValid = function (s) {
  let stack = [];
  let len = s.length - 1;
  let i = 0;
  while (i <= len) {
    if (type[s[i]]) stack.push(type[s[i]]);
    if (!type[s[i]] && stack.pop() !== s[i]) return false;
    i++;
  }
  return !stack.length;
};
```

#### 函数调用堆栈 JS 解释器使用栈来控制函数的调用顺序

```js
const func1 = () => {
  func2();
};
const func2 = () => {
  func3();
};
const func3 = () => {};
func1();
```



# 队列


- 一个先进先出的数据结构
- JS 中没有栈，但是可以用 Array 实现栈的所有功能

## Coding

```js
const stack = []
stack.push(1)
stack.push(2)
const item1 = stack.pop()
const item2 = stack.pop()
```


## 应用场景

#### 食堂学生排队打饭，春运，先进先出，保证有序
#### JS异步中的任务队列，单线程，无法处理并发任务
#### 计算最近请求次数 [933]
输入一个数组代表最近请求的时刻， 返回最近3000ms的请求次数
```js
let input = [[],[1],[100],[3001],[3002]]
[null,1,2,3,3]
```

