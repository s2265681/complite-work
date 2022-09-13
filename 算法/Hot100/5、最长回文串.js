/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。 中等难度
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 */

/**
 * @param {string} s
 * @return {string}
 * 思路： 中心扩散、 动态规划、 双指针
 */
var longestPalindrome = function (s) {
  let res = "";
  const palindrome = (s, l, r) => {
    // 左右指针、从s[1]和 s[r] 向两边扩散、找到最长回文串
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return s.substr(l + 1, r - l - 1);
  };
  for (let i = 0; i < s.length; i++) {
    // 寻找长度为奇数的回文字符串(以当前元素向两边扩散) 如 aba
    const s1 = palindrome(s, i, i);
    // 寻找长度为偶数的回文字符串(以s[i],s[i+1])向两边扩散 abba
    const s2 = palindrome(s, i, i + 1);
    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }
  return res;
};

console.log(longestPalindrome("wferred"));
