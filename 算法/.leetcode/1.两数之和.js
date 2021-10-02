/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//    for(let i=0;i<nums.length;i++){
//        for(let j=1;j<nums.length;j++){
//            if(nums[i]+nums[j]===target && i!==j){
//                return [i,j]
//            }
//        }
//    }
// };

// [2,4,5,6,3,7]  9
// var twoSum = function(nums, target) {
//     let currentValue;
//     let targetIndex;
//    for(let i=0;i<nums.length;i++){
//        currentValue = nums[i]
//        otherValue = target - currentValue
//        targetIndex = nums.findIndex((e=>e==otherValue))
//        if(targetIndex>-1&&targetIndex!==i){
//            return [i,targetIndex]
//        }
//    }
// };

// var twoSum = function (nums, target) {
//     let obj = {};
//     for (let i = 0; i < nums.length; i++) {
//       let num = nums[i];
//       if (num in obj) {
//         return [obj[num], i];
//       } else {
//         obj[target - num] = i;
//       }
//     }
//   };

// 使用Map这个数据结构
// 将数组循环用map组合成键值对， 存起 如 {2,3} => 5
// 下一个来查找时， 发现有就返回各自的index， 否则就存到map里
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    } else {
      map.set(target - nums[i], i);
    }
  }
};
// @lc code=end
console.log(twoSum([2, 7, 11, 15], 9));
