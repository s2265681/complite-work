/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-11-29 17:27:46
 */

/**
 *  统计一下层数
 */

const obj = {
  a: { b: [1] },
  c: { d: { e: { f: 1 } } },
};

function loopGetLevel(obj) {
  //    let level = 1
  //    function cycle(obj){
  //       Object.keys(obj).forEach(item=>{
  //          let value = obj[item]
  //          if(Object.prototype.toString.call(value) === '[object Object]'){
  //              level++
  //              cycle(value)
  //          }
  //       })
  //    }
  //    cycle(obj)
  //    return level
}

console.log(loopGetLevel(obj)); // 4
