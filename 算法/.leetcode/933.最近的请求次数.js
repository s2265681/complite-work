/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start

var RecentCounter = function () {
  this.q = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  console.log(t);
  //1
  // 100
  // 3001
  // 3002
  this.q.push(t);
  // 让头部元素和 t-3000对比， 小于剔除shift
  while (this.q[0] < t - 3000) {
    this.q.shift();
  }
  return this.q.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end
