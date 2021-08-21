/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。
    不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
    你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。
    思路： 原地修改  双指针的解法
 */
 var reverseString = function(s) {
   for(let i=0,j=s.length-1;i<j;){
       [s[i],s[j]] = [s[j],s[i]]
       j--
       i++
   }
};

let p = ["h","e","l","l","o"]
console.log(reverseString(p))
console.log(p)
// 输入：["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]  [ 'o', 'h', 'e', 'l', 'l' ]


// 输入：["H","a","n","n","a","h"]
// 输出：["h","a","n","n","a","H"]