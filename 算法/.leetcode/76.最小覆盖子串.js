/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let l = (r = 0);
  let need = new Map();
  for (let n of t) {
    need.set(n, need.has(n) ? need.get(n) + 1 : 1);
  }
  let needType = need.size;
  let res = ''
  while (r < s.length) {
    let c1 = s[r];
    if (need.has(c1)) {
      need.set(c1, need.get(c1) - 1);
      if (need.get(c1) === 0) needType -= 1;
    }
    while (needType === 0) {
      // console.log(s.substring(l, r + 1));
      let newStr = s.substring(l, r + 1)
      if(!res || newStr.length < res.length ) res = newStr
      let c2 = s[l];
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) needType += 1;
      }
      l++;
    }
    r++;
  }
  return res
};
// @lc code=end
console.log(minWindow("ADOBECODEBANC", "ABC"));
