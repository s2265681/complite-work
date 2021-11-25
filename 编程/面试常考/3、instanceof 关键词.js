// 1、利用 Object.prototype.toString.call(aa) 对象原型上面的toString方法 返回字符串 判断
function myInstanceOf(value, type) {
  let reg = /\[object ([a-zA-Z]+)\]/g;
  let regValue = Object.prototype.toString.call(value);
  let regType = regValue.replace(reg, (a, b, c) => b);
  return regType === type;
}

// console.log(myInstanceOf(true, "Boolean")); // true
// console.log(myInstanceOf({}, "Object")); // true
// console.log(myInstanceOf([], "Object")); // false
// console.log(myInstanceOf([], "Array")); // true

// console.log([] instanceof Array) // true
// console.log([] instanceof Object) // true

// 2、利用递归查找__proto__查找到  Father.prototype === Child.__proto__
// 递归查找隐式指针上是不是存在 父级的原型
function _instanceOf(child,father){
    let cp = child.__proto__
    let fp = father.prototype
    while(cp){
       if(cp === fp){
          return true
       }
       cp = cp.__proto__
    }
    return false
}

console.log(_instanceOf([],Array));
console.log(_instanceOf({},Object));
console.log(_instanceOf(false,Boolean));
