// 编写 combine 函数，传入一个无重复数字的数组 [1,2,3,4] 将数字组成互不相同且无重复的三位数 例如 123、234、214， 把数字打印出来 腾讯
function combine(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = 0; k < arr.length; k++) {
        // 三层循环，排除掉相同的数字
        if (i !== j && j !== k && i !== k) {
          res.push(`${arr[i]}${arr[j]}${arr[k]}`);
        }
      }
    }
  }
  return res;
}
// const _arr = [1, 2, 3, 4];
// console.log(combine(_arr));

// 上面的方法是通过三层循环来实现的，但是如果数组长度不确定，那么就需要使用递归来实现
function combine2(arr) {
  let res = [];
  function loop(temp, start) {
    if (temp.length === 3) {
      res.push(temp.join(""));
      return;
    }
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i]);
      loop(temp.slice(), i + 1);
      temp.pop();
    }
  }
  loop([], 0);
  return res;
}
const _arr = [1, 2, 3, 4];
console.log(combine2(_arr));
