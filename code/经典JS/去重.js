// const arr = [1,2,3,4,4,4,5,5,2,3,3,12,12]
const arr = [
  { name: "zhangsan", age: 23 },
  { name: "lisi", age: 23 },
  { name: "zhangsan", age: 34 },
  { name: "lisi", age: 34 },
];
// const uniArr = (arr) => arr.reduce((prev,cur)=>prev.indexOf(cur)===-1 ? prev.concat(cur) : prev.concat([]),[])
// filter中利用indexOf总是返回第一个元素的位置，后续重复元素的位置
// const uniArr = (arr) => arr.filter((cur,idx,array)=>array.indexOf(cur) === idx)

// 对于json数组来说根据key去重
/**
 * JSON数组去重
 * @param {*} [array] json Array
 * @param {*} [string] 唯一的key名，根据此键名进行去重
 */

function uniqueArray(array, key) {
  let result = [array[0]];
  for (let i = 1; i < array.length; i++) {
    var item = array[i];
    var repeat = false;
    for (var j = 0; j < result.length; j++) {
      if (item[key] == result[j][key]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      result.push(item);
    }
  }
  return result;
}


let u = uniqueArray(arr, "age");
console.log(u,'u')
