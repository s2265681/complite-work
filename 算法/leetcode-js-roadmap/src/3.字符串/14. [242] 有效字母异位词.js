

/**
 * * 题目名称：字符串相加
 * * 题目地址：https://leetcode-cn.com/problems/valid-anagram/
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
*  注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 */

// * 思路：

// 示例 1:

// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:

// 输入: s = "rat", t = "car"
// 输出: false

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isAnagram = function(s, t) {
    if(s.length !== t.length) return false
    let sArr = [...s]
    let tArr = [...t]
    sArr.forEach(sItem=>{
        let index = tArr.findIndex(tItem =>tItem === sItem)
        if(index!==-1){
            tArr.splice(index,1)
        }
    })
    return tArr.length == 0 
};

console.log(isAnagram("rat", "car"))