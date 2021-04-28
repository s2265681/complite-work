// // 文件
// const fs = require('fs')
// const data = fs.readFileSync('./package.json')

// console.log(data,'data') //Buffer
// console.log(data.toString('utf-8'),'data')

// // 异步方式
// fs.readFile('./package.json',(err,data)=>{
//     console.log(data,'data1') //Buffer
//     console.log(data.toString('utf-8'),'data1')
    
// })

// const {promisify} = require('util')
// const readFile = promisify(fs.readFile)
// readFile('./package.json').then(data=>{
//     console.log(data,'data++++')
// })


(async ()=>{
   const fs = require('fs')
   const {promisify} = require('util')
   const readFile = promisify(fs.readFile)
   const awaitData =  await readFile('./package.json')
   console.log(awaitData,'awaitData')
})()
