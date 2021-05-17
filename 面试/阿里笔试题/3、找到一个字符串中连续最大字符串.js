// 3、找到一个字符串里最大连续字符， 比如abdtyabcd , 最大连续字符为abcd
let example = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function findMaxString(str) {
  let strArr = [...str];
  let stack = [[str[0]]];
  let c = 0;
  for (let i = 1; i < strArr.length; i++) {
    let finallyItem = stack[c][stack[c].length - 1];
    let nextIdx = example.findIndex((el) => el === finallyItem) + 1;
    let nextItem = example[nextIdx];
    let currentItem = str[i];
    if (nextItem === currentItem) {
      stack[c].push(currentItem);
    } else {
    // stack[c] = stack[c].pop();
      c++;
      stack[c] = stack[c] || [];
      stack[c].push(currentItem);
    }
  }
  stack.sort((a, b) => {
    return a.length < b.length;
  });
  return stack[0].join("");
}
// console.log(findMaxString("bcjhefgh")); //， 结果为 efgh
console.log(findMaxString("abdtyabcd")); //， 结果为 abcd
// console.log(findMaxString("hijewqnb")); // ， 结果为 hij
