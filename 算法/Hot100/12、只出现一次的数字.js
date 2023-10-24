// 136. 只出现一次的数字
// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

/**
 * @param {number[]} nums
 * @return {number}
 */
// var singleNumber = function (nums) {
//   const setObj = new Set();
//   nums.map((item) => {
//     if (setObj.has(item)) {
//       setObj.delete(item);
//     } else {
//       setObj.add(item);
//     }
//   });
//   console.log([...setObj], "...");
//   return [...setObj][0];
// };

// console.log(singleNumber([2, 2, 1]));

// 用异或解发 相同为0 不同为1

var singleNumber = function (nums) {
  let ant = nums[0];
  for (let i = 1; i < nums.length; i++) {
    ant = ant ^ nums[i];
  }
  return ant;
};

console.log(singleNumber([2, 2, 1, 3, 4, 4, 3, 6, 4]));
