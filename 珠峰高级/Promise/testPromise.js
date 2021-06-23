/**
 *  promise
 *  例子1： 需求一秒钟打印1，再过两秒钟打印2，再过三秒钟打印3
 *  异步写法 易产生'嵌套地狱'的问题，写法不优雅，而且结构混乱
 */
// (function func() {
//   setTimeout(function () {
//     console.log(1)
//     setTimeout(function () {
//       console.log(2)
//       setTimeout(function () {
//         console.log(3)
//       }, 3000)
//     }, 2000)
//   }, 1000)
// })()

// 使用promise解决这个问题

let p1 = new Promise(resolve => {
  return setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(resolve => {
  return setTimeout(function () {
    resolve(2)
  }, 3000)
})
let p3 = new Promise(resolve => {
  return setTimeout(function () {
    resolve(3)
  }, 6000)
})
p1.then(res => {
  console.log(res)
})
p2.then(res => {
  console.log(res)
})
p3.then(res => {
  console.log(res)
})