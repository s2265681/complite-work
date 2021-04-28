
// 查看内存占用率
const os =  require('os');
// 查看cpu
const cpuStat = require('cpu-stat')


// setInterval()
function getState() {
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占用率${mem}%`);
    cpuStat.usagePercent((err,percent)=>{
        console.log(`CPU占用${percent}%`)
    })
}

module.exports=getState