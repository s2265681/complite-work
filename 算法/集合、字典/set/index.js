

// 去重
const arr = [1,2,3,2,3]
const arr2 = [...new Set(arr)]

// 判断元素是否在集合中
const set = new Set(arr)
set.has(1)  // true
set.has(4)


// 求交集
const set2 = new Set([2,3])
const set3 = new Set([1,2])
const set4 = new Set([...set2].filter(item=>set3.has(item)))
console.log(set4,set4.size)  // Set { 2 } 1