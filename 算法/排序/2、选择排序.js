let arr = [5, 4, 1, 3, 6, 7, 8, 9, 0, 6, 1, 222];
function sortFun(arr) {
  let length = arr.length - 1;
  let temp = [];
  while (length--) {
    let minItem = Math.min(...arr);
    arr.splice(arr.findIndex(el=>el === minItem),1)
    temp.push(minItem);
  }
  console.log(temp);
  return temp;
}
sortFun(arr);
