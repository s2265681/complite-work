// 1、找出数组中出现最多次数的元素与次数.js
/*
*  function(){}
*/ 

let arr1 = [1,2,3,0,0,02,333,4,0,0,0,0]  // 次数 6  元素 6
const mostTime = function(array){
    // 过滤
    let clearArr = [...new Set(array)];
    // 遍历clearArr中的每一项和原数组filter相同元素,将返回的长度和元素push到一个新的数组中
    let temp = []
    for(let i=0;i<clearArr.length;i++){
         let item = clearArr[i]
         let newArr = array.filter(el=> item === el)
         temp.push({
             count:newArr.length,
             ele:item
         })
    }
    // 排序找出最大最小
    return temp.sort((a,b)=>a.count-b.count).slice(-1)
}

let result = mostTime(arr1)
console.log(result)