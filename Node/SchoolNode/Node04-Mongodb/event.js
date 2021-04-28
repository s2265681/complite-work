const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()

// 接收on多次
// event.on('some_event',num => {
//     console.log('event:'+ num)
// })
// once 只接收一次
event.once('some_event',num => {
    console.log('event:'+ num)
})


let num = 0 
setInterval(()=>{
    // 每秒钟发送一个
    event.emit('some_event',num++)
},1000)