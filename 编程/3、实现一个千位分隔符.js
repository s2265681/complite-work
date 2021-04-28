


let num = '1212122434343412';


let reg = /(\d{1,3})(?=(\d{3})+$)/g

// 注意边界条件
let str = num.replace(reg,(a,b,c)=>{
    return a + '.'
})
console.log(str,'rrr')