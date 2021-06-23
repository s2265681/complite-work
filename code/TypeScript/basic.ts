// 为什么用
// 1、类型判断 2、减少出错 3、增加类型定义 缺点，增加学习成本，小型项目没必要
// ts-node basic.ts

let a:string = '1'
a = '123'

let isBoo:boolean = true;

let nullTxt:null = null;

// null 和 undefined是任何类型的子类型
isBoo = null;
isBoo = undefined;

a.charAt(1);  // 自动匹配string的方法

function Test(a:string,b?:number,c=12):number{
      return b
} 

Test('1',1)

const arr: string[] = ['1','2','3','4']
let numberOrString: number | string = 12334;
numberOrString = '1234'

// 数组
let arrOfNumbers :number[] = [1,2,4,5]  // 必须是数字类型的数组
arrOfNumbers.push(1)


// 元组 
let strOrArr:[string, number,number] = ['viking', 1 , 1]

// interface 初探 定义对象的类型  描述shape 对类class进行抽象 鸭子类型
interface Person {
   name:string;
   age?:number;  // ? 可选类型
   readonly id:number;
}
const viking:Person = {name:'12',id:1}
// viking.id =1  X  可读的不可修改




