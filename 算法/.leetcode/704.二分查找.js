/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 升序数组二分法查找， 根据数组下标的移动，进行二分，比较值的大小， 注意下标的移动配合while不要死循环， 还有边界的考虑。
 */
var search = function(nums, target) {
    // return nums.findIndex(el=>el===target)  // 72 ms
    return nums.indexOf(target)  // 92 ms
    // 二分法 80 ms
    // let n = 0,
    //     h = nums.length -1;
    // while(n<=h){
    //     console.log(n,h)
    //     let mid = Math.floor((n+h)/2)
    //     if(target === nums[mid]){
    //         return mid
    //     }
    //     if(nums[mid] < target){
    //         n = mid + 1
    //     }
    //     if(nums[mid] > target){
    //         h = mid - 1
    //     }
    // }
    // return -1
};
// @lc code=end

// console.log(search([-1,0,3,5,9,12],9));
console.log(search([-1,0,3,5,9,12],2));

