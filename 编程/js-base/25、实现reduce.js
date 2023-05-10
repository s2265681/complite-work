let arr = [1, 2, 3, 4, 5];

let a = arr.reduce((acc, cur) => acc + cur);
console.log(a);

Array.prototype.myReduce = function (callback, startValue) {
  // 有startValue 索引从1开始，没有从0开始
  const arr = this;
  let startIndex = typeof startValue === "undefined" ? 1 : 0;
  let acc = typeof startValue === "undefined" ? arr[0] : startValue;
  for (let i = startIndex; i < arr.length; i++) {
    acc = callback(acc, arr[i]);
  }
  return acc;
};

console.log(arr.myReduce((acc, cur) => acc + cur));
