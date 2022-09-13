/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。 难度 中等
 * 输入: s = "abcabcbb" => 3 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 输入: s = "bbbbb" => 1 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 输入: s = "pwwkew" => 3 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 */

/**
 * @param {string} s
 * @return {number}
 * 思路： 遍历 记住上一个的序列 下一个不重复则 开始计数， 否则，开始下一个技术
 * 滑动窗口 左窗口边界 i 右窗口边界 j maxLength set 代表当前窗口
 */
// pwwkew 转化成数组 pwwkew  => pwwkew
// "dvdf" vdf
// ' ' => 1
// 'c' => c

var lengthOfLongestSubstring = function (s) {
  let i = 0, // 窗口的右边界
    j = 0, // 窗口的左边界 j++ 右滑动 i++ 右滑动
    set = new Set(), // 当前窗口内的元素 判断窗口是否有重复
    maxLength = 0;
  if (s.length === 0) return 0;
  for (i; i < s.length; i++) {
    if (!set.has(s[i])) {
      // 当前元素不在set中，i++ 进行下一轮
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      // set 中如果包含重复元素 不断移动j++ 并删除 j位置的元素，然后放新的将新的加入到set中
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]); // 放心将 s[j] 放入
    }
  }
  return maxLength;
};

let result = lengthOfLongestSubstring("c");
console.log(result);
