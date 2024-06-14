// 数组按照指定顺序排序，将原数组内的元素，分别从中间向两边交替追加 例如：[0,1,2,3,4] => [4,2,0,1,3] [0,1,2,3,4,5,6,7,8] => [8,6,4,2,0,1,3,5,7] 腾讯
// function sort(arr) {
//   arr.sort((a, b) => a - b);
//   let res = [];
//   while (arr.length) {
//     res.push(arr.pop());
//     res.push(arr.shift());
//   }
//   return res;
// }

const _arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const func = (arr) => {
  return arr.reduce((pre, cur, index, array) => {
    if (index % 2 === 0) {
      pre.unshift(cur);
    } else {
      pre.push(cur);
    }
    return pre;
  }, []);
};

console.log(func(_arr));
