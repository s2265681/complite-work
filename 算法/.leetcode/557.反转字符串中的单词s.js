/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 * 思路：双指针的解法
 */
 /**
 * @param {string} s
 * @return {string}
 */

var reverseWords = function(s) {
   var reverseString = function(s) {
      for(let i=0,j=s.length-1;i<j;){
          [s[i],s[j]] = [s[j],s[i]]
          j--
          i++
      }
   };   
   let arr = s.split(' ')  //  [Let`s,take,LeetCode,contest]  => "s'teL ekat edoCteeL tsetnoc"
   let result = ''
   for(let m=0;m<arr.length;m++){
      let t = [...arr[m]]
      reverseString(t)
      t = t.join('')
      result += t + " "
   }
   return result.trim()
};

let str = "Let's take LeetCode contest"
console.log(reverseWords(str));  // "s'teL ekat edoCteeL tsetnoc"

