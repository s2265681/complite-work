/* 
* 数据类型的检测四种方法及优劣
* + typeof  
*   检测出来的都是字符串，字符串中包含了对应的数据类型
*   typeof 检测null(二进制000开头和对象混了)的结果为'object', 计算机的一个bug
*   typeof 检测对象细分的类型都是'object' 
* + instanceof
* + constructor
* + Object.prototype.toString.call([value])
*/

let a = typeof typeof typeof [12,23];  // 'string'
// 'object' -> 'string' -> 'string'