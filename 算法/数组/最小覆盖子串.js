/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var maxSlidingWindow = function (nums, k) {
  let start = 0,
    end = k - 1,
    len = nums.length,
    result = [];
  while (end < len) {
    let res = -Infinity;
    for (let i = 0; i < k; i++) {
      //   res = Math.max(res, nums[start + i]);
      res = Math.max(...nums.slice(start, start + k));
    }
    result[start] = res;
    start++;
    end++;
  }
  return result;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// console.log(maxSlidingWindow([1], 1));
// console.log(maxSlidingWindow([1, -1], 1)); //[1,-1]
