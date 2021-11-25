
function People(name,age){
   this.name = name
   this.age = age
   return {}
}

let people = new People('lisi',23)  // People { name: 'lisi', age: 23 }
People.say = 'hello'
console.log(people)


function myNew(fn,...args){
   // 1、 新建一个空对象
   const obj = new Object(null)
   // 2、对象的原型链指向函数的原型
   obj.__proto__ = fn.prototype
   // 3、执行函数，this指向当前创建的obj
   let result = fn.apply(obj, args)
   // 4、执行返回结果 是对象或者数组返回，否则返回当前对象
   return typeof result === 'object' ? result : obj
}

console.log(myNew(People,'lisi',23))