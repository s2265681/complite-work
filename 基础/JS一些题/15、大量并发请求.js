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

// function awaitFn(data) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       console.log(data, "data");
//       res();
//     }, 3000);
//   });
// }

// function splitExec(array) {
//   if (array.length) {
//     let cur = array.splice(0, 3);
//     awaitFn(cur).then((res) => {
//       splitExec(array);
//     });
//   }
// }

// splitExec(arr);

// promise Generator 生成器
const promiseGenerator = (num) =>
  new Array(num).fill(0).map(
    (_, index) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          resolve(index);
        }, 1000)
      )
  );
const proAll = promiseGenerator(10);

// 手写promiseAll
function promiseAll(promiseArr) {
  if (!Array.isArray(promiseArr)) return;
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
        .then((res) => {
          result[i] = res;
          count++;
          if (count === promiseArr.length) {
            resolve(result);
          }
        })
        .catch((rst) => {
          reject(rst);
        });
    }
  });
}

// promiseAll(proAll)
//   .then((res) => {
//     console.log(res, "res");
//   })
//   .catch((rst) => {
//     console.log(rst, "ttttt");
//   });

// promise Chain  串行
const promiseChain = (proAll) => {
  return proAll.reduce((pre, item, curIdx, array) => {
    return pre.then((res) => {
      return item;
    });
  });
};

// promiseChain(proAll).then((res) => {
//   console.log(res, "res");
// });

// 调度执行
const promiseScheduler = (promiseAll, limit) => {
  function run() {
    promiseAll.shift().then((res) => {
      console.log(promiseAll);
      promiseAll.length && run();
    });
  }

  for (let i = 0; i <= limit; i++) {
    run();
  }
};

promiseScheduler(proAll, 5);
