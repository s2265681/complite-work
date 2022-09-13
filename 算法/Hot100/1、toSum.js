/**
 *  1、两数之和
 *  给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 *  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 *  你可以按任意顺序返回答案。
 *
 *  思路：
 *  1、暴力破解  双层循环  强行找到两个相加 和 为 target的值 && 不能出现数组下标重复
 *  2、用map的方式 或者说是 对象缓存的方式， 将需要的值作为key缓存， 当匹配到并且有值时， 将当前的i 和 匹配到的i都返回
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 1、 暴力破解 On2
// var twoSum = function (nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target && i !== j) {
//         return [i, j];
//       }
//     }
//   }
// };

// 2、通过map或者 对象缓存的方式 变为nlogn  这种方式
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    let need = target - nums[i];
    if (map.get(val) !== undefined) {
      return [map.get(val), i];
    }
    map.set(need, i);
  }
};

// let nums = [2, 7, 11, 15];
// let target = 9;
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
let nums = [1, 2, 3, 4]; // [3, 2, 4];
let target = 5; //6;
console.log(twoSum(nums, target));
