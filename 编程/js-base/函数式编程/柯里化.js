
// 多参数函数转化成单参数函数

function sum(a,b,c){
  return a+b+c
}

sum(1,2,3)

function sum2(x){
    return function b(y){
        return function c(z){
           return x + y + z
        }
    }
}

sum2(1)(2)(3) // 柯里化 标准， 每次只传入一个参数
sum2(1,2)(3) // 偏函数： 先固定一些参数，在传入其他函数
console.log(sum2(1)(2)(3));
console.log(sum2(1,2)(3));

// 柯里化 转成单一函数后，会让函数控制的更精准，粒度更小，可以通过范围较大函数，衍生出小函数，可以通过组合来使用


function isType(typing,val){
   return  Object.prototype.toString.call(val) === `[object ${typing}]`
}

// 固定的参数缓存起来
console.log(isType('String','abc'));

// 利用柯里化来实现 如果执行 参数个数满足 参数后，调用， 如果不满足
let _ = require('lodash')

const curryIsType = _.curry(isType)
const isString = curryIsType('String')
console.log(isString('rrr'));
console.log(isString('123'));


let currySum = _.curry(sum)
console.log(currySum(1,2)(2));

function myCurry(func){
    // 函数的长度，就是参数的长度
    let length = func.length
    let curried = (...args)=> {
       console.log(func.length, args.length);
       // 长度不够
       if(args.length < length){
        return (...others)=> curried(...args, ...others)
       }else{
        return func(...args)
       }
    }
    return curried
}

let newSum = myCurry(sum)
console.log(newSum(1,2),'newSum');