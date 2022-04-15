let arr = [];
for (let i = 0; i < 30; i++) {
  arr.push({
    id: i + 1,
    name: "lable" + i + 1,
  });
}
// console.log(arr);

// function awaitFn(data, cb) {
//   setTimeout(() => {
//     console.log(data, "data");
//     cb && cb();
//   }, 3000);
// }

// 法一
// function splitExec(array) {
//   if (array.length) {
//     let cur = array.splice(0, 3);
//     awaitFn(cur, () => {
//       splitExec(array);
//     });
//   }
// }

// 法二

function awaitFn(data) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(data, "data");
      res();
    }, 3000);
  });
}

function splitExec(array) {
  if (array.length) {
    let cur = array.splice(0, 3);
    awaitFn(cur).then((res) => {
      splitExec(array);
    });
  }
}

splitExec(arr);
