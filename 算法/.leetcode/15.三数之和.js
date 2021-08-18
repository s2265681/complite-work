/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 思路 
 * 1、排序 两边相加， 查看第三个数是否在范围内， 不再去除一个数， 在的话拿出来组合一起
 * 2、都拿出来的重新组成一个数组
 *  无法去掉重复三元组 error
 */
var threeSum = function(nums) {
    debugger
    if(nums.length<3)return []
    let result = []
    nums = nums.sort((a, b)=>a-b) // [-4,-1,-1,0,1,2]
    function findThreeArr(arr){
        let first = arr.splice(0,1)[0]
        let last = arr.splice(-1)[0]
        let both = first + last
        let thrid = both == 0 ? 0 : -both  // 2 
        let isCludes = arr.findIndex(num=>num===thrid)
        let min = arr[0]
        let secMin = arr[1]
        let max = arr[arr.length-1]
        let secMax = arr[arr.length-2]
        if(isCludes >= 0){
            result.push([first,thrid,last])
            if(thrid > max)arr.unshift(first)
            if(thrid < min)arr.push(last)
        }else{
        // 如果大于数组最大值 去掉最左的 把最右的last的加回来
        if(thrid > max) arr.push(last)
        // 如果小于数组最小值 去掉最右的 把最左的first的加回来
        if(thrid < min) arr.unshift(first)
        }
        console.log(result,'.')
        if(arr.length>=3)findThreeArr(arr)
    }
  findThreeArr(nums)
  return result
};
// @lc code=end
// let result = threeSum([-1,0,1,2,-1,-4,2])
// let result = threeSum([-1,0,1,2,-1,-4])
// let result = threeSum([0,0,0,0])
// let result = threeSum([-2,0,1,1,2])
let result = threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4])


// [-1,0,1,2,-1,-4]
// let result = threeSum([-2,0,1,1,2])  // [[-2,0,2],[-2,1,1]]
console.log(result)


