// var minSubArrayLen = function (target, nums) {
//   // 暴力求解
//   let result,
//     sum = 0,
//     subLength = 0;
//   for (let i = 0; i < nums.length; i++) {
//     sum = 0;
//     for (let j = i; j < nums.length; j++) {
//       sum += nums[j];
//       if (sum >= target) {
//         subLength = j - i + 1;
//         result = result < subLength ? result : subLength;
//         console.log(result);
//         break;
//       }
//     }
//   }
//   // 如果result没有赋值，就返回0， 说明没有条件符合
//   return result ? result : 0;
// };

// 滑动窗口重点就是用一个for循环替代两个for循环， 并且如何更新起始位置
var minSubArrayLen = function (target, nums) {
  // 暴力求解
  let result = Infinity,
    sum = 0,
    subLength = 0;
  let left = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum >= target) {
      subLength = j - left + 1;
      result = result < subLength ? result : subLength;
      sum -= nums[left++];
    }
  }
  return result === Infinity ? 0 : result;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); //2
// console.log(minSubArrayLen(7, [1, 1, 1, 1, 7])); // 1
