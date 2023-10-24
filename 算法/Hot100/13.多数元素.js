// https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-100-liked

// 找一个数组中出现次数最多的那个数
// 示例 1：
// 输入：nums = [3,2,3]
// 输出：3
// 示例 2：
// 输入：nums = [2,2,1,1,1,2,2]
// 输出：2

var majorityElement = function (nums) {
  // 解法一 循环  +  map 记数
  let map = {},
    result = {
      max: 0,
      val: null,
    };
  for (let i = 0; i < nums.length; i++) {
    let target = nums[i];
    if (map[target] === undefined) {
      map[target] = 1;
    } else {
      map[target] = map[target] + 1;
    }
    if (result.max <= map[target]) {
      result.max = map[target];
      result.val = target;
    }
  }
  return result.val;
};

var majorityElement = function (nums) {
  // 多军对峙
  let ans = nums[0],
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) ans = nums[i];
    if (nums[i] === ans) {
      count++;
    } else count--;
  }
  return ans;
};

console.log(majorityElement([3, 2, 3, 2, 2]));
