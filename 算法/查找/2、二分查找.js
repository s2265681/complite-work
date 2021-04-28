let arr = [1, 2, 6, 3, 8, 2, 0, 5, 7];
let num = 2;
function findNum(arr, findNum) {
  let cloneArr = JSON.parse(JSON.stringify(arr));
  let result = {
    num: null,
    index: null,
  };

  // 考虑边界
  if (findNum > Math.max(...arr) || findNum < Math.min(...arr)) return result;
  // 先排序
  function findValue(arr, findNum) {
    // 在中间的时候
    let midIndex = Math.floor(arr.length / 2);
    let midValue = arr[midIndex];
    let n;
    if (findNum > midValue) {
      n = findValue(arr.slice(midIndex), findNum);
    } else if (findNum < midValue) {
      n = findValue(arr.slice(0, midIndex), findNum);
    } else if (findNum === midValue) {
      n = findNum;
    }
    return n;
  }
  arr = arr.sort((a, b) => a - b);
  let n = findValue(arr, findNum);
  result.index = cloneArr.findIndex((el) => el === n);
  result.num = n;
  return result;
}
console.log(findNum(arr, num));
