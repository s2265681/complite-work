# TypeScript
- <a href="#one"> 一、概述</a>
- <a href="#two"> 二、 安装和初试</a>
- <a href="#three"> 三、 数据类型</a>

 ### <a name="one"> 一、概述 </a>

#### 1、什么是Typescript？

官方网站的定义是: **TypeScript 是 JS 类型的超集**，`TypeScript` 是一个js的外壳，需要编译成浏览器可识别的javascript才可以运行。

#### 2、为什么使用Typescript？

- 弥补javascript缺少类型判断，缺少结构化机制(类、模块、接口等)的不足
- 程序更容易理解 (‘代码即注释’)
- 效率更高（编译期就会发现大部分错误）
- 非常好的包容性（完全兼容js、流行项目都支持Ts）

   不足：增加了一些学习成本，短期内增加了一些成本，项目规模小，无必要使用

### <a name="two"> 2、安装和初试</a>

- 安装

```js
npm install -g typescript
```

- 编译

```js
tsc file.ts
```

- 简便方法，安装ts-node

  每次都需要对ts文件编译产生js文件后再通过node 运行，比较麻烦

```js
npm i ts-node -g
ts-node file.ts
```



### <a name="three">  3、数据类型</a>

- 原始数据类型

  - Boolean

    >  let isDone: boolean = false;

  - Null

    > let null = null

  - Undefined

    > let undefined = undefined

  - Symbol

  - String

    > let firstName:string = "jimmy"

  - Number

    > let age: number = 20 | 0b1111;

    注意： undefined和null是其他类型的子集

  Eg:

  >  let num: number = undefined | null

  

- any类型,有明确类型避免使用

>  let notSure :any = 4
>
>   notSure = '1233'
>
>   notSure = true



- 联合类型（|）

> let numberOrString : number | string = 23



- 数组类型

> let arrOfNumbers:number[] = [1,2,3,4]
>
> arrOfNumbers.push(1)
>
> arrOfNumbers.push('1')    // error



- Tuple--特殊定义数组类型的方式

> let user:[string,number] = ['hello', 99]
>
> user = ["world","haha"]  // error



- interface

| 对对象的形状进行描述

| 对类进行抽象

| 鸭子类型 对象的推断，而不是对象本身

```js
interface IPerson{
  readonly id：number;
  name:string;
  age?:number;
}
let tom: IPerson = {
  name : 'tom',
  id:1,
  age:19
}
// 注意： age后面的问号代表可选属性,代表该属性可以不存在，readonly代表只读属性，代表对象中的该属性只能读不能修改。注意接口命名首字母需要大写，I开头不强制， 每个属性定义后用";" 结尾
```



- 函数类型

```js
// 对参数和返回值的约定
const add = function(x:number,y:number,z?:number =10):number{
    if(typeof  m === 'number'){
        return x + y + m
    }else{
        return x + y
    }
}
// let result = add(1,2)
// let result = add(1,2,3)
// z为可选类型可选类型放参数最后面

// 类型推断,可以根据赋值推断变量类型
const add2: string = add  // error
const add2:(x:number,y:number,z?:number =10)=>number = add   // true
eg：
let str = "hello"
str = 123      // error
str = "world"  // true
```



- class类的支持

```js
// 创建Animate类
class Animate{
  public name:string;   // 公有属性|默认属性
  readonly id:number;   // 只读，不可修改赋值
  private size:number;  // 私有方法，只有自己可以访问
  protected key:boolean;// 受保护的属性，自己和子类可以使用
  static categoies:string[] = ["mammal",brid];  // 静态属性
  static isAnimal(a){    // 静态方法
    return a instanceof Animate
  }
  constructor(name){
    this.name = name;
  }
  run(){
      return `${this.name} is running`
  }
}
// 继承父类
class  Cat extends Animate{
  constructor(name,key){
    super(name) // 继承父类的方法
    this.name = name;
    this.key = key;
    run(){   // 重写父类run方法
      return 'Meow, ' + super.run()
    }
  }
}
const cat = new Cat('miao',true)
console.log(cat.run())  // 'Meow, miao is running'
```



- 类和接口的使用---implements

 ```js
// 提取公共的接口
interface Radio{
   switchRadio(trriger:boolean) : void | number;
}
// Cellphone特有
interface Battery{
    checkBattertStatus();
}
class Car implements Radio{
   switchRadio(){}
}
class Cellphone implements Radio,Battery{
   switchRadio(){}
  checkBattertStatus(){}
}

// 定义接口继承已有
interface RadioWithBattery extends Radio{
    checkBattertStatus();
}
class Cellphone implements checkBattertStatus{
   switchRadio(){}
  checkBattertStatus(){}
}
 ```



- 枚举Enums

 一般声明常量中使用，并且有一定关系

**数字枚举**

```js
enum Direction{
    Up,
    Down,
    Right,
    Left
}
console.log(Direction.Up)   // 0
console.log(Direction.Down) // 1
console.log(Direction[0])   // Up
可以给Up赋值，后面的会递增
```

**字符串枚举**

```js
enum Direction{
    Up='UP',
    Down='DOWN',
    Right='RIGHT',
    Left='LEFT',
}
const value = 'UP'
if(Direction['UP']===value){
  console.log('go up')
}
```

**常量枚举**

只需要在枚举前面加const，会内联枚举，提高计算性能

```js
const enum Direction{
    Up='UP',
    Down='DOWN',
    Right='RIGHT',
    Left='LEFT',
}
```



- 泛型----generics

  泛型出现的动机和要解决的问题：

  在定义时没办法确定参数类型和返回类型的时候，在使用时才能确定

  可以简单理解为占位符，动态指定类型

```js
function echo(arg:number){
  return arg
}
const result = echo(123)   // result is number
const result = echo('123') // result is string change arg is string

...
```

result无法随意匹配any类型

改造后：

```js
function echo<T>(arg:T):T{        // 使用T作为参数占位
  return arg
}
const result:number = echo(123)
const result:string = echo('123')
const result:boolean = echo(true)
```

 参数是一个数组的时候，加泛型

```js
function swap<T,U>(tuple:[T,U]):[U,T]{
   return [tuple[1],tuple[0]]
}
const result2 = swap(['string',123])
result2[1] // number
result2[0] // string
```



对函数使用泛型加约束

Eg:

```js
function echoWithArr<T>(arg:T):T{
  console.log(arg.length)
  return arg
}
// 会报错，因为T可能没有length，如果给T加约束
function echoWithArr<T>(arg:T[]):T[]{
  console.log(arg.length)
  return arg
}
// 改造成了传T类型的数组，错误取消，但是如果想判断字符串的length呢，如果是对象中含有length呢，上面的改造就不能实现了，继续改造

interface IWithLength{
  length:number;
}
function echoWithLength<T extends IWithLength>(arg:T):T{
   console.log(arg.length)
   return arg
}
const str = echoWithLength('str')
const obj = echoWithLength({length:12,width:'12'})
const arr = echoWithLength([1,2,3])
// 以上都可以满足，问题解决
```



对类使用泛型约束

```js
class Queue<T>{
  private data = [];
  push(item:T){
    return this.data.push(item)
  }
  pop():T{
    return this.data.shift()
  }
}
const queue = new Queue<number>();
queue.push(1)
const queue2 = new Queue<string>();
queue.push('1')
```



对接口加泛型

```js
interface KeyPair<T,U>{
  key:T;
  value:U;
}
let kp1:KeyPair<number,string> = {key:123,value="str"}
let kp2:KeyPair<string,number> = {key:"str",value="123"}
```



对数组加泛型

```
let arr:number[] = [1,2,3]
let arr2:Array<number> = [1,2,3,4]
```



```js
interface IPlus<T> {  // 描述了一个函数的类型
  {a:T,b:T}: T
}
function plus(a:number,b:number){
  return a+b;
}
function connect(a:string,b:string){
  return a+b;
}
const a:IPus<number> = plus;
const b:IPus<string> = plus;
```



- 类型别名和断言as

```js
// 别名 type aliases
function sum(x;number,y:number):number {
return x+y
} 
const sum2:(x;number,y:number)=>number = sum
// sum2 太长，用类型别名
type PlusType = (x;number,y:number)=>number
const sum2:PlusType = sum
```

```js
// 断言 as 分别判断不同类型的不同处理方式
function sum(input:string | number) :number {
   const str = input as String;
   if(str.length){
     return str.length
   }else{
      const number = input as Number;
      return number.toString().length
   }
} 
=>
function sum(input:string | number) :number {
   if((<string>input).length){
     return (<string>input).length
   }else{
      return input.toString().length
   }
} 
```



- 声明文件

```js
jQuery('#f00');
```

 使用一

> declare var jQuery:(selector:string)=>any

  一般单独放在一个文件jQuery.t.ts 中声明，以.d.ts结尾

  tsconfig.json

  ```js
  {
    "include":["**/ *]
  }
  ```

使用二

第三方库

> [查找第三方库地址](http://microsoft.github.io/TypeSearch/)

> npm install --save @types/jquery



 
--- 

[studytypescript地址](https://github.com/s2265681/code/tree/master/TypeScript)

---
