// 1、工厂模式
// 函数中创建对象返回对象
function fn1(){
    console.log('fn1')
}

function Foo(name){
    var foo = new Object()
    foo.name = name;
    foo.say = fn1
    return foo
}

// 2、构造函数
// 利用this, new 实例或者返回this
function Foo(name){
    this.name = name;
    this.say = fn1
}

const foo = new Foo('lisi')

// 3、js原型方式
function Foo(){
    Foo.prototype.name = 'lisi'
}

// 4、构造函数+原型方式常见
function Foo(){
    this.say = fn1
    Foo.prototype.name = 'lisi'
}
const foo = new Foo('lisi')

// 5、构造函数+原型方式混合+判断
function Foo(){
    Foo.prototype.name = 'lisi'
    let m = undefined
    if(m===undefined){
        this.say = function(){
          console.log('hello')
        }
        m = true
    }
}


// 6、 面试题
let O = function(name){
   this.name = name || 'world'
}

O.prototype.hello = function(){
    return function(){
        console.log('hello' + this.name)
    }
}

let o = new O;
let hello = o.hello()
hello()



