const newLocal = '调试1';
console.log(newLocal)


console.log(newFunction())



console.log('调试1')

function newFunction(params) {
    console.log(params,'params')
    const aa = '我是错误结果'
    const bb = '我是正确结果'
    params&&params(aa,bb)
    // params()
    // return 
    // params(aa)
}

module.exports=newFunction