/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 思路： 
 */
var lengthOfLongestSubstring = function(s) {
  // 解法1 双指针维护滑动窗口
  // 思路是 1、维护窗口， 遇到重复字符移动左指针到重复字符下标后面
  // 保存每次的大小， 进行对比
  let l = 0;
  let res = 0;
  let map = new Map()
  for(let r=0;r<s.length;r++){
    if(map.has(s[r]) && map.get(s[r]) >= l){
        l = map.get(s[r]) + 1
    }
    res =  Math.max(res,r-l+1)
    map.set(s[r],r)
  }
  return res
};
// @lc code=end

console.log(lengthOfLongestSubstring("abbcdea"))