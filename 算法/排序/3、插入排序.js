let arr = [5, 4, 1, 3, 6, 7, 8, 9, 0, 6, 1, 222];
function sortFun(arr) {
  let handle = [];

  handle.push(arr[0]);
  for (let i = 0; i < arr.length; i++) {
    // 随便拿出一张牌
    let A = arr[i];
    for (let j = handle.length - 1; j >= 0; j--) {
      let B = handle[j];
      if (A > B) {
        // 插入到后面
        handle.splice(j + 1, 0, A);
        // 结束本次
        break;
      }
      // 比到最后一张都没有比B大的，所以是最后一张放到最前面
      if (j === 0) {
        handle.unshift(A);
      }
    }
  }
  console.log(handle);
}
sortFun(arr);
