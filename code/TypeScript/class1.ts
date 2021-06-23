
// class
// 类： 定义类一切事物的抽象特点
// 对象： 类的实例
// 面向对象 三大特性： 封装、继承、多态
// 类修饰符

class Animate{
    public name : string;
    readonly id : number;  // 只能读不能写
    private size : number; // 只有自己可以访问
    protected key: boolean; // 自己和自己的子孙可以访问，外部不可以访问
    static categoies:string[] = ['mammal','brid']
    static isAnimai(a){
        return a instanceof Animate
    }
    constructor(name){
        this.name = name;
    }
     run(){
       return `${this.name} is running`
    }
}

const snake = new Animate('snake')
//  snake.id = 12   // Cannot assign to 'id' because it is a read-only property.ts(2540)
//  snake.size   // 属性“size”为私有属性，只能在类“Animate”中访问。ts(2341)
//  snake.key  // 属性“key”受保护，
// console.log(snake.run())  // snake is running
// 调用静态方法

console.log(Animate.isAnimai(snake))

// 继承父类
class Dog extends Animate{
   bark(){
       return `${this.name} is barking`
   }
}

const nuomi = new Dog('nuomi')
console.log(nuomi.run())  //  nuomi is running
console.log(nuomi.bark()) //  nuomi is barking

class Cat extends Animate {
    constructor(name,key) {
        super(name) // 继承父类的方法
        this.name = name
        this.key = key
    }
     run(){
         return 'Meow, ' + super.run()
     }
}

const miao = new Cat('miaomiao',true)
console.log(miao.run())