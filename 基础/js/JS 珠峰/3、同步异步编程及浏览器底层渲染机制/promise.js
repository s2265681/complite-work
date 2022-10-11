// 例子
// let p = new Promise((resolve,reject)=>{
//     resolve('OK')
//         // reject('No')
//         //   setTimeout(()=>{
//         //       reject('No')
//         //   },1000)
//   })
//   console.log(p)
//   p.then(value=>{
//     console.log('成功执行的',value)
//   }, reason=>{
//     console.log('失败执行的',reason)
//   })
// Promise { 'OK' }
// 成功执行的 OK