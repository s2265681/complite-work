// 遍历所有文件路径下的文件夹。。。
const fs = require('fs');
const path = require('path')

const readDir = (entry) => {
    const dirInfo = fs.readdirSync(entry)
    dirInfo.forEach(item=>{
        const location = path.join(entry,item)
        const info = fs.statSync(location)
        // console.log(info.isDirectory(item))
        info.isDirectory(item)
        if(info.isDirectory(item)){  // 文件夹
            console.log(`文件夹: ${location}`)
            readDir(location)
        }else{
            console.log(`文件:${location}`)
        }
    })
   // console.log(dirInfo,'dirInfo...')
 }
 readDir(__dirname);