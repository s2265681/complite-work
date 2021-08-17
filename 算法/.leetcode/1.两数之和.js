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

var twoSum = function (nums, target) {
    let obj = {};
    for (let i = 0; i < nums.length; i++) {
      let num = nums[i];
      if (num in obj) {
        return [obj[num], i];
      } else {
        obj[target - num] = i;
      }
    }
  };
// @lc code=end

