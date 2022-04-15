/**
 * 通过一个数组， 范围 -1000 到 1000 找到里面两个数 只和为第三个 数 target 返回这两个数
 */

function twosum(array, target) {
  const wanted = {};
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    wanted[num] = true;
    const theother = target - num;
    if (wanted[theother]) return [num, theother];
  }
}

console.log(twosum([1, 2, 3, 4, 5, 6, 7], 9));

// 思路一 ， 两个数同 排序 双指针
function threeSum(nums) {
  // https://blog.csdn.net/abc1194474469/article/details/106314311?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=2
}

console.log(threeSum([-1, 3, 9, 4, -5, 6, -4, 9, -7]));
