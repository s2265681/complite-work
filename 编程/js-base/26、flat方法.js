// flat demo
const arr1 = [1, 2, [3, 4, [5, 6]]];

function flat(arr) {
  // return arr.flat(Infinity
  //   return arr.reduce(
  //     (acc, val) =>
  //       // concat 方法用于连接两个或多个数组
  //       Array.isArray(val) ? acc.concat(...flat(val)) : acc.concat(val),
  //     []
  //   );
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result.push(...flat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(flat(arr1)); // [1, 2, 3, 4, [5, 6]]
