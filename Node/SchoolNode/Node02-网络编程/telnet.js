const net = require('net')
// 建立tcp server
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection',client =>{
    client.write('Hi\n')
    clientList.push(client)
    client.on('data',data=>{
        console.log('receive',data.toString())
        clientList.forEach(v =>{
            v.write(data)
        })
    })
})

chatServer.listen(9000)