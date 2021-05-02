/**
 * * 题目名称：用两个栈实现队列
 * * 题目地址：https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof
 * * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

 */

// * 思路： 入栈出栈 模拟队列  当入栈时 入到A栈 出栈时 从pop里拿  没有就循环A拿过来 在取
// ! 栈的特点是先进后出， 队列是 先进先出

var CQueue = function () {
  this.stackA = [];
  this.statckB = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.statckB.length) {
    return this.statckB.pop();
  } else {
    while (this.stackA.length) {
      this.statckB.push(this.stackA.pop());
    }
    if (!this.statckB.length) {
      return -1;
    } else {
      return this.statckB.pop();
    }
  }
};
/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

 var obj = new CQueue()
 obj.appendTail([])
 obj.appendTail(3)
 obj.appendTail([])
 obj.appendTail([])
 obj.appendTail([])
console.log(obj.deleteHead());
console.log(obj.deleteHead());
console.log(obj.deleteHead());
// console.log(param_2);  // [2,3]