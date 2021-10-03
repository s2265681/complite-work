/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * 给你一个字符串 s 、一个字符串 t 。
 * 返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 思路：
 * 找出所有包含T的子串
 * 找出长度最小的子串，返回
 * 步骤：
 * 用双指针滑动窗口
 * 移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串长度
 * 用map维护了一套 规则 并且通过这个规则 结合双指针滑动窗口移动， 找到最终的值
 */
var minWindow = function (s, t) {
  let l = 0,
    r = 0;
  const need = new Map();
  // 先建一个字典 记录需要的字符 和 响应的匹配个数
  for (const c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  let needType = need.size;
  let res = "";
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) needType -= 1;
    }
    while (needType === 0) {
      // console.log(s.substring(l,r+1));
      let newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const l2 = s[l];
      if (need.has(l2)) {
        need.set(l2, need.get(l2) + 1);
        if (need.get(l2) === 1) needType += 1;
      }
      l += 1;
    }
    r += 1;
  }
  return res
};
// @lc code=end
console.log(minWindow("ADOBECODEBANC", "ABC"));

// ADOBEC;
// DOBECODEBA;
// OBECODEBA;
// BECODEBA;
// ECODEBA;
// CODEBA;
// ODEBANC;
// DEBANC;
// EBANC;
// BANC;

// A B C
