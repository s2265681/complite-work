/**
 * 栈结构  先进后出
 */

class Stack {
  constructor() {
    this.container = [];
  }
  enter(value) {
    this.container.unshift(value)  // 开头加
  }
  leave() {
    return this.container.shift(value)  // 开头移除
  }
  size() {
    return this.container.length
  }
  value() {
    // 克隆一份，防止外部操作修改内部CONTAINER
    return this.container.slice(0)
  }
}

// 面试题 十进制转化为二进制  短除法取余 10/2  分别取余数和值
let num = 123456  // "11110001001000000"
// num.toString(2) 

Number.prototype.decimal2binary = function decimal2binary() {
  let decimal = this;
  let sk = new Stack;
  console.log(decimal, 'decimal')
  while (decimal > 0) {
    let n = Math.floor(decimal / 2);
    let m = decimal % 2;
    sk.enter(m)
    decimal = n

  }
  return sk.value().join('')
}
console.log((128).decimal2binary())


// 队列结构
// Queue  先进先出  后进后出  // 处理传入元素的优先级  优先级高的最在上面
class Queue {
  constructor() {
    this.container = [];
  }
  enter(value) {
    this.container.push(value)
  }
  leave() {
    return this.container.shift(value)
  }
  size() {
    return this.container.length
  }
  value() {
    // 克隆一份，防止外部操作修改内部CONTAINER
    return this.container.slice(0)
  }
}