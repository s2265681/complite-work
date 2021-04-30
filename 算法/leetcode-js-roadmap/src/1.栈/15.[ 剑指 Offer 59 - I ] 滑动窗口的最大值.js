/**
 * * 题目名称：滑动窗口的最大值
 * * 题目地址：https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof
 * 
 * *  输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * * 输出: [3,3,5,5,6,7] 
 */
//?  滑动窗口的位置                最大值
//?  ---------------               -----
//?  [1  3  -1] -3  5  3  6  7       3
//?   1 [3  -1  -3] 5  3  6  7       3
//?   1  3 [-1  -3  5] 3  6  7       5
//?   1  3  -1 [-3  5  3] 6  7       5
//?   1  3  -1  -3 [5  3  6] 7       6
//?   1  3  -1  -3  5 [3  6  7]      7

// * 思路：
// ? 循环数组  三个为一组 i=0 - i=2  一个数组 =>  3
// ?           i=1  - i = 3    一个数组  => 3
// ?  ... 5 、 5、 6、 7
// ?  输出 3 、3 、5、5、 6、 7
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {
     if(nums.length===0) return []
     let stack = nums.slice(0,k);
     let ret = []
    for(let i=0;i<=nums.length-k;i++){
         ret.push(Math.max(...stack))
         stack.shift()
         stack.push(nums[k+i])
    }
    return ret
};

console.time('执行用时');
// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3));
console.log(maxSlidingWindow([],0));
console.timeEnd('执行用时');