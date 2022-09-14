/**
 * 三数之和 中等困难
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 暴力破解
 */
// var threeSum = function (nums) {
//   let result = [];
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       if (i === j) break;
//       for (let z = 0; z < nums.length; z++) {
//         if (z === j) break;
//         if (nums[i] + nums[j] + nums[z] === 0) {
//           result.push([nums[i], nums[j], nums[z]]);
//         }
//       }
//     }
//   }
//   return result;
// };

// 排序 + 双指针
var threeSum = function (nums) {
  if (nums.lenght < 3) return [];
  let result = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // 防止出现重复的情况
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    // nums[i] 为基准 找另外两个数组，数组之和 -num[i]
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (right === i) {
        right--; // 忽略自己 越过nums[i]
      } else if (nums[i] + nums[left] + nums[right] === 0) {
        // 命中
        result.push([nums[i], nums[left], nums[right]]);
        // 继续检索其他数值
        // 左边加大一位继续找
        while (nums[left] === nums[left + 1]) {
          left++;
        }
        left++;
        while (nums[right] === nums[right - 1]) {
          right--;
        }
        right--;
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return result;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

console.log(threeSum([1, -1, -1, 0]));
