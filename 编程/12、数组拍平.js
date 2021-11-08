/**
 * 数组拍平 flat
 */

// const arr = [1, 2, 3, 4, [5, 6], 7, [8], 9, [10, [11, [12, [13, [14]]]]]];
const arr = ['12']
// 1、flat
// console.log(arr.flat(Infinity));

// 2、reduce
// const flaten = arr.reduce((a,b)=>{
//   return a.concat(b)
// },[])
// console.log(flaten);

// 3、concat
// console.log([].concat(...arr));

// 4、flatMap
// console.log(arr.flatMap(number=>number));

/**
 *  手写一个flat
 *  arr.flat()  params number ｜ Infinity
 */

Array.prototype.flatten = function (num = 1) {
  if (!(this instanceof Array)) throw new Error("该方法必须为数组");
  let _array = this || [];
  function flatOnce(needArr) {
    return [].concat(...needArr);
  }
  function checkHasArr(checkArr = []) {
    return checkArr.map((el) => el instanceof Array).filter(Boolean)[0];
  }
  while (num === Infinity ? checkHasArr(_array) : num--) {
    _array = flatOnce(_array);
  }
  return _array;
};

console.log(arr.flatten(Infinity));
