/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 *  双指针 两边之和 大 缩右边  小缩左边
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
   let j = numbers.length -1 
   for(let i = 0 ; i < j;){
      if(numbers[i] + numbers[j] === target ) return [i+1,j+1]
      if(numbers[i] + numbers[j] < target ) {
          i++
      }else{
          j--
      }
   }
};
// @lc code=end
console.log(twoSum([-1,0],-1));

