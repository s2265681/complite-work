# JS笔试题（二）

### 一、原型原型链

> (1) 每个函数|构造函数都有一个原型prototype，用来存储公有的属性和方法
>
> (2) 每个原型对象都有一个constructor属性，指向函数本身
>
> (3) 每个实例都有__ proto __ 隐式指向所在类的原型
>
> 原型链的机制是：当成员访问的时候，首先查找自身的私有属性，如果没有会隐式查找所在模块原型上的属性和方法，再查不到会一直通过__ proto __ 向上查找，一直找到Object.prototype 为止。最终原型链指向null结束，这种机制称为原型链机制



1、下面代码运行的结果

```js
function fun(){
    this.a=0;
    this.b=function(){
        alert(this.a);
    }
}
fun.prototype={
    b:function(){
        this.a=20;
        alert(this.a);
    },
    c:function(){
        this.a=30;
        alert(this.a)
    }
}
var my_fun=new fun();  
my_fun.b();
my_fun.c();
```

> 结果：
>
> "0"  "30"
>
> 分析: 
>
> 类原型的重定向：会失去constructor，原始的原型对象上的属性方法会被新的原型对象覆盖，内置类原型无法重定向
>
> var my_fun=new fun(); =>  { a:0 , b: function(){ alert(this.a)}}
>
> my_fun.b(); => 此时 this=> my_fun ， 所以结果为"0"
>
> my_fun.c(); => 此时my_fun中没有c这个属性，去原型中查找，打印结果为“30”



2、写出下面代码执行输出的结果

```js
function C1(name) {
    if (name) {
        this.name = name;
    }
}
function C2(name) {
    this.name = name;
}
function C3(name) {
    this.name = name || 'join';
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
```

> 结果： 
>
> "Tomundefinedjoin"
>
> 分析： 
>
> 考察原型原型链构造函数，函数实例化，参数不传为undefined
>
> new C1().name => 因为name为undefined，所以当前函数内没有name属性，只能去原型对象去找所以结果为"Tom"
>
> new C2().name => 因为name为undefined，所以当前函数内拥有私有属性name为 undefined，结果为undefined
>
> new C3().name => 因为name为undefined，所以当前函数内拥有私有属性name为 "join"，结果为'join'
>
> 综上，结果为 alert("Tom" + undefined + 'join') => "Tomundefinedjoin"



3、下面代码运行的结果？

```js
function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function () {
    this.a = 2;
}
Fn.prototype = new Fn;

let f1 = new Fn;
Fn.prototype.b = function () {
    this.a = 3;
};

console.log(f1.a);
console.log(f1.prototype);  // undefined
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn);
```

> 结果：
>
> 分析:
>
> f1 =>  {
>
>  a: 1 ,
>
>  __ proto __ : { 
>
>      a =1,
>     
>      b:function(){  this.a = 3;},
>     
>       __ proto __ :   {
>     
>               say: func(){this.a = 2;}
>     
>               }
>     
>         } 
>
> }
>
> console.log(f1.a); =>  1
>
> console.log(f1.prototype); => 对象是没有prototype属性的，只有函数才有，结果为undefined
>
> console.log(f1.b);  => function(){ this.a =3 }
>
> console.log(f1.hasOwnProperty('b'));  => false
>
> console.log('b' in f1);  => true
>
> console.log(f1.constructor == Fn); => true



4、写出下面代码执行输出的结果

```js
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

> 结果为：
>
> 2
> 4
> 1
> 1
> 2
> 3
> 3
> Foo.getName {}
>
> 分析： 
>
> 考察原型链、变量提升
>
> 词法解析阶段，var getName 和 函数getName变量提升
>
> 2、getName();   // 当作对象属性访问
>
> 3、Foo().getName();   // 当作普通函数执行，执行的结果调用getName成员，遇到getName变量并且不是私有变量，所以把全局的getName变成了输出函数1的函数，
>
>   因为Foo执行，调用者是window， 所以return window， window.getName => 全局下的getName =>  1
>
> 4、getName();   // 输出全局的getName为输出函数1的
>
> 5、new Foo.getName();  // 运算符的优先级， 成员访问【19】， xxx.xxx，
>
>   带参数列表的new【19】(new fn())， 不带参数列表的new【18】(new fn) , 优先级相同从左
>
>   此题： 先Foo.getName()。在 new
>
> 6、new Foo().getName(); 
>
>   此题 先new Foo() 在 .getName()
>
> 7、new new Foo().getName(); 



5、完成如下的需求

```js
let n = 10;
let m = n.plus(10).minus(5);
console.log(m);
//=>15（10+10-5）
```

> 分析：
>
> 给数字Number这个类添加原型方法
>
> 向内置原型类上扩展方法，方法调取方便this就是调用的实例，this是对象类型的值(没有this除外)，方便链式调用，注意，不要和内置类原有方式重合
>
> function initParams(num){ num = Numer(num); return isNaN(num)?0:num;}
>
> Number.prototype.plus = function(n){return this+initParams(n)}
>
> Number.prototype.minus = function(n){return this-initParams(n)}



6、实现如下需求

```js
/*
 * 编写queryURLParams方法实现如下的效果（至少两种方案）
 */
let url="http://www.zhufengpeixun.cn/?lx=1&from=wx#video";
console.log(url.queryURLParams("from")); //=>"wx"
console.log(url.queryURLParams("_HASH")); //=>"video"
```

> 分析：
>
> ```js
> // 第一种方案（太low了）
> new URL(url) // 通过get获取
> String.prototype. queryURLParams=function(params){
>  let obj = {}
>  let {search,hash} = new URL(this);
>  if(hash)obj['_HASH'] = hash.substring(1)
>  if(search){
>    search = search.substring(1).split('&')  // ["lx=1","from=wx"]
>    search.forEach(item => {
>      let [key,value] = item.split("=");
>      obj[ley] = value;
>    })
>  }
> return key ? obj[key] : obj
> }
> // 方法二 利用a标签
> // 创建一个a标签利用a中的link
> 
> // 方法三 利用正则
> String.prototype. queryURLParams=function(params){
>  let obj = {}
>  this.replace(/([^?=&#])=([^?=&#])/g,(_,key,value)=> obj[key] = value);
>  this.replace(/#([^?=&#])/g,(_,hash) => obj['_HASH'] = hash)
>  return key ? obj[key] : obj
> }
> ```



7、基于ES6中的class重构下面的代码

```js
function Modal(x,y){
    this.x=x;
    this.y=y;
}
Modal.prototype.z=10;
Modal.prototype.getX=function(){
    console.log(this.x);
}
Modal.prototype.getY=function(){
    console.log(this.y);
}
Modal.n=200;
Modal.setNumber=function(n){
    this.n=n;
};
let m = new Modal(10,20);
```

```js
// 重构
class Parent {
  constructor() {
    this.z = 10;
    this.getX = function () {
      console.log(x);
    };
    this.getY = function () {
      console.log(y);
    };
  }
}

class Modal extends Parent{
  // 构造函数体
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
  // ES7+ 给实例设置私有属性，和上面this.x的写法一样,只是不能传入值
  z = 100;
  // 给原型设置方法，不能这个设置原型上的属性，只能通过prototype设置
  getX(){
    console.log(this.x) 
  }
  getY(){
    console.log(this.y) 
  }
  static n = 200;
  static setNumber = function (n) {
    this.n = n;
  };
}
Modal.prototype.z = 10;
let m = new Modal(10, 20);
console.log(m);
```



8、代码输出的结果

```js
let obj = {
    2: 3,
    3: 4,
    length: 2,
    push: Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj);
```

> 分析： 先分析数组的push做了什么事，在分析结果
>
> ```js
> Array.prototype.push = function push(item){
> // this => 需要处理实例
> // this[this.length] = item;
> // this.length++
> // 返回新增后的数组长度this.length
> }
> 
> obj.push(1); 
> // item => 1 this => obj
> // obj[obj.length] = 1   obj[2] =1
> // obj.length++
> obj.push(2);
> // item => 2 this => obj
> // obj[3] = 2   obj[3] =2
> // obj.length++
> console.log(obj);
> 结果为
> {
> 2:1,
> 3:2,
> length:4,
> push: Array.prototype.push
> }
> ```



9、a等于什么值会让下面条件成立

```js
var a = ?;
if (a == 1 && a == 2 && a == 3) {
 console.log('OK');
}
```

> 分析：== 比较的时候，如果两边的数据类型不一致，默认会进行数据类型转换
>
> 方案一： 让对象转换为数字，需要调取valueOf/toString，如果有原始值拿原始值，否则调valueOf，而且对象中有私有属性，那么不会再向原型上找
>
> ```js
> var a = {
> i = 0,
> toString(){
>   // this => a
>   return ++this.i
> }
> }
> let a = [1,2,3];
> a.toString = a.shift() // 删除第一项返回删除的值
> ```
>
> 方案二：利用数据劫持 Object.defineProperty /  Proxy
>
> 只要获取对象的某个属性，就能进行劫持，对他属性进行操作
>
> 获取a， 如果a不是变量，就是window的一个属性...
>
> ```js
> let i = 0;
> Object.defineProperty(window,'a',{
> get(){
>  return ++i;
> },
> set(n){
>   console.log(n)
> }
> })
> console.log(window.a)
> window.a = 100;
> ```
>
> 



10、实现如下需求

```js
let utils = (function(){
    /*
     * toArray：转换为数组的方法
     *   @params
     *      不固定数量，不固定类型
     *   @return
     *      [Array] 返回的处理后的新数组
     */
    function toArray(){
        //=>实现你的代码（多种办法实现）   
    }

    return {
        toArray
    };
})();
let ary = utils.toArray(10,20,30); //=>[10,20,30]
ary = utils.toArray('A',10,20,30); //=>['A',10,20,30]
```

> 分析： 高级单例模式封装
>
> ```js
> let utils = (function(){
> function toArray(...rest){ 
> // return Array.from(arguments)
> // return [...arguments]  // Array.from(arguments)
> // return rest
> // 把类数组转化成数组
> //var arr = [];
> //for(let i=0;i<arguments.length;i++){
> //   arr.push(arguments[i])
> //}
> //return arr
> // 借用数组上的方法实现arguments使用数组上的方法，只要两个实例结构类似，那么大部分操作他们的代码都可以公用，无外乎THIS指向的问题
> return [].slice.call(arguments)
> }
> return {
> toArray
> };
> })();
> ```



11、对象(数组)的深克隆和浅克隆（头条）

```js
//=>浅克隆：只复制对象或者数组的第一级内容
//=>深克隆：克隆后数组的每一级都和原始数组没有关联
//那么请说出，浅克隆都怎么去实现，如何实现深度克隆
let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};

let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];
```

> 分析： 
>
> ```js
> // 浅克隆
> // 数组的浅克隆, arguments虽然是类数组，除了__proto__不是Array，和数组的结构基本一致
> // 如果可以让数组原型上的slice执行，方法中的this变为arguments
> Array.prototype.slice = function slice(){
> var arr = [];
> for(let i=0;i<arguments.length;i++){
>   arr.push(arguments[i])
> }
> return arr
> }
> 
> 
> let shallowwClone=function(value){
> let newValue;
> if(value instanceof Array){
> newValue = value.slice()
> // 或者newValue = [...value]
> }else if(value instanceof Object){
> newValue = {...value}
> }else{
> newValue = value
> }
> return newValue
> }
> // 深克隆 递归
> ```





12、已知基于 instanceof 可以实现检测：实例是否属于某个类，现在需要自己编写这样的一个方法，实现出 instanceof 的效果

```js
//=>example：要检测的实例
//=>classFunc:要检测的类
function instance_of(example, classFunc) {
    //...
}
let res = instance_of([12,23],Array);
console.log(res); //=>true
```

> 分析： 
>
> ```js
> // 不考虑非对象数组情况
> function instance_of(example, classFunc) {
> return Object.prototype.toString.call(example)===`[object ${classFunc.name}]`
> }
> ```



### 二、附加题（偏难）

1、实现如下需求

```js
//=>编写toType方法，实现数据类型检测
function toType( obj ) {
   //完成你的代码
   // [object Array]
  Object.prototype.toString.call(obj).
}
console.log(toType(1)); //=>"number"
console.log(toType(NaN)); //=>"number"
console.log(toType([])); //=>"array"
console.log(toType(/^\d+$/)); //=>"regexp"
console.log(toType({})); //=>"object"
...
```

```js
const toType = obj => Object.prototype.toString.call(obj).slice(8).slice(0,-1).toLocaleLowerCase()
```



2、 完成如下需求

```js
!function(){
    function change(){
        //=>实现你的代码
    };
    Function.prototype.change=change;
}();
let obj = {name:'nihao'};
function func(x,y){
    this.total=x+y;
    return this;
}
let res = func.change(obj,100,200);
//res => {name:'Alibaba',total:300}
```

> 分析
>
> 思路： 目的是在函数方法的原型上挂载一个change的方法，第一个参数为对象，添加一个total的属性，计算后两个参数相加
>
> 代码实现思路
>
> ```js
> !function(){
> function change(){
> let args = [...arguments]
> let t = new this(args[1],args[2])
> return {...args[0],...t}
> };
> Function.prototype.change=change;
> }();
> let obj = {name:'nihao'};
> function func(x,y){
> this.total=x+y;
> return this;
> }
> let res = func.change(obj,100,200);
> console.log(res)
> ```



3、完成如下需求 —— 实现bind

```js
~function(){
    //=>bind方法在IE6~8中不兼容，接下来我们自己基于原生JS实现这个方法
    function bind(){

    };
    Function.prototype.bind=bind;
}();
var obj = {name:'xiaohong'};
function func(){
    console.log(this,arguments);
    //=>当点击BODY的时候，执行func方法，输出：obj [100,200,MouseEvent事件对象]
}
document.body.onclick = func.bind(obj,100,200);
```

> 分析 ：
>
> 代码实现
>
> ```js
> // bind IE 6~8 不兼容， 自己实现bind方法
> !function(){
> function bind(){
> return function(){
>   this.call(arguments)
>   }
> }
> Function.prototype.bind = bind;
> }();
> // let obj3 ={
> //   name:'lisi',
> //   run:function(){console.log(this.name)}
> // }
> // let obj4  = {
> //  name:'wangwu',
> // }
> // let f = obj3.run.bind(obj4)
> ```



4、下面代码的输出结果？为什么？

```js
var name = 'xixi';
function A(x,y){
    var res = x+y;
    console.log(res,this.name);
}
function B(x,y){
    var res = x-y;
    console.log(res,this.name);
}
B.call(A,40,30);  // res => 10 , "A"
B.call.call.call(A,20,10);  // NaN undefined
Function.prototype.call(A,60,50);  // 空函数
Function.prototype.call.call.call(A,80,70);  // NaN undefined
```

>  结果：10 “A”   NaN undefined  NaN undefined
>



5、 实现一个防抖和节流

```js
/*
*  防抖 —— 在用户频繁触发的时候，我们只识别一次（第一次或者最后一次）【可以设置时间间隔】比如按钮点击事件
*/
// 1、设置标示判断。初级的防止频繁点击触发的模式
let isClick = false;
btn.onclick =function(){
  if(isClick)return
  isClick = true
  setTimeout(()=>{
    console.log('ok')
    isClick = false
  },500)
}
// 2、第一次点击，等待500ms，如果触发第二次在500ms以内，属于频繁点击，不去执行，非频繁点击则去触发
let timer = null,
    wait = 500;
btn.onclick =function(){
  clearTimeout(timer); // 最后一次点击为主，重新设置定时器
   timer = setTimeout(()=>{
      console.log('ok')
   },500);
}
// 3、
/*
* debounce 实现函数的防抖，目的是频繁触发中只执行一次
* @params
*    func: 需要执行的函数
*    wait: 检测防抖的间隔频率
*    immediate: 是否立即执行(true触发第一次的时候执行函数，默认false最后一次触发为准)
* @return
*    可被调用执行的函数
*/
function debounce(func,wait =500,immediate=false){
   let timer = null; 
   return function anonymous(...params){
      let now = immediate && !timer;
      clearTimeout(timer)
      timer = setTimeout(()=>{
         timer = null
         // 执行函数注意保持THIS的参数完整度
         !immediate ? func.call(this,...params) : null
      },wait)
      now ? func.call(this, ...params) : null
   }
}

/*
* 节流 —— 在一定时间之内执行多次，目的是频繁触发中缩减执行的频率
* throttle 实现函数节流，目的是频繁触发中缩减执行的频率
* @params 
*    func: 需要执行的函数
*    wait: 自己设置的时间(频率)
* @return
*    可被调用执行的函数
*/
// 1、
function throttle(func,wait = 500){
    let timer = null;
        previous = 0; // 记录上一次执行的时间点
    return function anonymous(params){
        let now = new Date(),  // 当前操作的时间
            remaing = wait - (now - previous)
         // 两次间隔时间超过频率 把方法执行
         if(remaing<=0){
            clearTimeout(timer)
            timer = null
            previous = now
            func.call(this,...params)
         }else if(!timer){  // 最后一次不能漏掉
         // 两次执行的时间没有超过频率，说明还没有达到触发标准，设置定时器等待
         timer = setTimeout(()=>{
            clearTimeout(timer)
            timer = null
            previous = new Date();
           func.call(this,...params)
         },remaing)
     }
  }
}
```

