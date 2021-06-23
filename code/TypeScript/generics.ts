// generics 泛型 动机

import { YesNo } from "_node-ts@5.0.5@node-ts"

// function echo(arg:any):any{
//     return arg
// }

// const result:string = echo(123)

// 定义函数接口和类的时候，没办法提前指定类型，只有调用的时候才能确定的时候就需要使用generics 泛型

function echo1<T>(arg:T):T{
    return arg
}
const result = echo1('123')  // str 也是string

function swap<T,U>(tuple:[T,U]):[U,T] {
    return [tuple[1],tuple[0]]
}
const result2 = swap(['string',124])  // const result2: [number, string]
//  [ 124, 'string' ]


// interface 对象定义泛型
interface KeyPair<T,U>{
    key: T;
    value:U
}
let kp1:KeyPair<number,string> = {key:1,value:"12"}
let kp2:KeyPair<number,number> = {key:1,value:2}

// 数组定义泛型
let arr: number[] = [1,2,3]
let arrTwo :Array<number> = [1,2,34]

// 函数定义泛型 根据传入的类型判断，动态传入
interface Iplus<T>{
  (a:T,b:T) : T
}

function plus(a:number,b:number):number{
    return a+b;
}
const a:Iplus<number> = plus

function connect(a:string,b:string):string{
    return a+b;
}
const b:Iplus<string> = connect