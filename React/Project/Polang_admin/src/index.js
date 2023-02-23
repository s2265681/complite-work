//有 异步，同步 两种生成方式
// const { machineId, machineIdSync } = require("node-machine-id");
import pkg from "node-machine-id";
const { machineId, machineIdSync } = pkg;
// async await 同步使用方法
async function getMachineId() {
  let id = await machineId();
  console.log(id, "id1");
}

//也可以直接then执行下面操作id为生成的唯一id
machineId().then((id) => {
  console.log(id, "id2");
});

let id = machineIdSync();
// id = c24b0fe51856497eebb6a2bfcd120247aac0d6334d670bb92e09a00ce8169365
//original:如果为true，则返回计算机ID的原始值，否则返回哈希值（sha-256）
// let id = machineIdSync({original: true})
// id = 98912984-c4e9-5ceb-8000-03882a0485e4
// console.log(id, "id3");
// window.MachineId = id;
