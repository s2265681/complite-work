/*
 * @param nums int整型一维数组 正整数数组
 * @return int整型
 * 思路 是 排序 + 两个数排列的比较  可以转化成 两个数 相加的字符串 的 值的比较
 */

function maxIntValue(nums) {
  return nums
    .sort(
      (a, b) => Number(String(b) + String(a)) - Number(String(a) + String(b))
    )
    .join("")
    .replace(/^0+/g, "0");
}

// maxIntValue([6, 4, 5, 1]); //=> 6541
// maxIntValue([10, 9]); //=> 910
// maxIntValue([22, 1, 9]); //=> 9221
// maxIntValue([9, 100, 5]); // => 95100
// maxIntValue([6, 4, 5, 1]); //=> 6541
// maxIntValue([3, 30, 34, 5, 9]); // => 9 5 34  3 30
maxIntValue([3, 341]); // => 319 310
