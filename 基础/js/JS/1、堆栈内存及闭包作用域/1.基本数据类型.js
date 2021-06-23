/**
 * 基本数据类型【1】(值类型/原始数据类型)
 *  + number
 *  + string
 *  + boolean
 *  + null
 *  + undefined
 *  + symbol  Symbol(10) === Symbol(10) false
 *  + bigint  BigInt(10) === 10n   true
 * 引用数据类型【2】
 *  + object
 *    + 普通对象  Map
 *    + 实例对象
 *    + 数组对象  Set
 *    + 正则对象
 *    + 日期对象
 *    + Math数字对象
 *    + prototype原型对象
 *    + ...
 *  + function
 */

// Symbol([value]) 创建唯一值 , 不能被new
// console.log(Symbol('A') == Symbol('A')) // false

// BigInt: 大数据值
// JS存在最大安全数字
// console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991 
// console.log(Number.MIN_SAFE_INTEGER) // -9007199254740991
// 超过最大安全数字会计算不准
// console.log(typeof(9007199254740991n))  // 'bigint'

// number 数字类型中比较奇怪的值
//1、 NaN 不是有效数字，但是属于number类型的
// console.log(typeof NaN)   // => 'number'
// console.log(NaN == NaN)  // => false
// console.log(Object.is(NaN,NaN))  // => true
//2、 isNaN检测是否为无效数字
// console.log(isNaN(10))  // => false
// console.log(isNaN('AA')) // => true 检测是不是数字，先隐式转化，在判断
// 3、Infinity无穷大的值
// console.log(Infinity);

let res = parseFloat('left:200px') //=> NaN
if(res===200){
    alert(200)
}else if(res === NaN){  // => NaN === NaN  false
    alert(NaN)
}else if(typeof res === 'number'){  
    alert('number')  //=> 'number' alert 输出结果都会转化为字符串
}else{
    alert('Invalid Number')
}

// => 'number'
