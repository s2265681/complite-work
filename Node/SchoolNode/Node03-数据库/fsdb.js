// 实现一个文件读写的数据库
const fs = require("fs")

function get(key) {
    fs.readFile("./db.json",(err,data)=>{
        const json = JSON.parse(data);
        console.log(json[key])

    })
}

function set(key,value){
    fs.readFile("./db.json",(err,data)=>{
        // 可能为空文件，设置为空对象
        const json = data? JSON.parse(data):{}
        json[key] = value // 设置值
        // 重新写入
        fs.writeFile("./db.json",JSON.stringify(json),err=>{
            if(err){
                console.log(err,'err')
            }
            console.log('写入成功')
        })
    })
}


// 命令行接口部分
const readline = require('readline')
const rl = readline.createInterface({
    input:process.stdin,   // 写入流
    output:process.stdout  // 输出流
});

rl.on("line",function(input) {
    const [op,key,value] = input.split(" ");

    if(op==='get'){
        get(key)
    }else if (op==='set'){
        set(key,value)
    }else {
        console.log('没有该操作')
    }
})

rl.on("close",function(){
    console.log("程序结束");
    process.exit(0)
})

