/**
 * https://leetcode-cn.com/problems/make-the-string-great/
 * @param {string} s
 * @return {string}
 * 关键是 每次都需要拿已得到的数组来对比
 * 'sdddd'.charAt(index)  可以根据index找到对应的那个字母
 *  每次都和栈里的最后一个值对比....
 */

 var makeGood = function (s) {
    let len = s.length;
    const ret = [];
    let i = 0;
    while (i < len) {
      if (
        ret.length > 0 &&
        ret[ret.length - 1].toLowerCase() === s.charAt(i).toLowerCase() &&
        ret[ret.length - 1] !== s.charAt(i)
      ) {
        ret.pop();
      } else {
        ret.push(s.charAt(i));
      }
      i++;
    }
    return ret.flat().join('')
  };
  
  s = "abBbAcC"; // => ''
  // s = 's'  // => 's'
  // s = "leEeetcode"   // => leetcode
  // s = "Hvh"; //
  console.log(makeGood(s)); // ""
  