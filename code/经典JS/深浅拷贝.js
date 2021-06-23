/**
 * time:2020-6-20
 * content:深浅克隆相关知识
 * 设计到知识点
 * 1、for...in for...of 区别、 区分数组还是对象的方法 isObject isArray
 * 2、浅拷贝和深拷贝实现方式 shallowClone、deepClone
 * 3、深拷贝会产生的两种问题  通过createDate函数，模拟产生不同层级和不同元素的对象
 * —— 栈溢出（递归爆栈问题） 解决爆栈，使用栈的循环替代递归解决  loopClone
 * —— 对象的循环引用问题    解决循环引用的问题，在克隆时对同一引用的对象进行记录，去重  forceClone
 */

// 1、 对象实现浅克隆的方式  Object.assign() 或者 使用展开运算符 {...obj}
// let o1 = {name:'a1'}
// let o2 = Object.assign({},o1)
// let o3 = {...o1}
// o3.name = 'o2'
// console.log(o1,o3)
// 2、数组实现浅克隆  通过slice返回一个新数组， 展开运算符
// let a1 = [1,2,3]
// let a2 = a1.slice()
// let a3 = [...a1]
// a2[0]=22
// a3[0]=33
// console.log(a1,a2,a3)
// // [ 1, 2, 3 ] [ 22, 2, 3 ] [ 33, 2, 3 ]
// 3、通过for...in数组遍历
// for...in 遍历数组和对象都可以，分别返回索引或者key，原型链上的方法属性也会返回，需要通过object.hasOwnProperty()筛选, 类似Object.keys()
// for...of 只能遍历iteare接口的数组，遍历对象会报错，遍历数组会返回value，类似Object.values()
/**
 * 判断是否为对象isObject
 */
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * 判断是否为数组
 */
function isArray(value) {
  return (
    value instanceof Array &&
    Object.prototype.toString.call(value) === "[object Array]"
  );
}
/**
 * 浅拷贝函数
 * shallowClone
 */
function shallowClone(source) {
  let target;
  if (typeof source !== "object") return source;
  if (isArray(source)) target = [];
  if (isObject(source)) target = {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}
/**
 * 深拷贝函数
 * deepClone
 */
function deepClone(source) {
  let target;
  if (isArray(source)) target = [];
  if (isObject(source)) target = {};
  if (typeof source !== "object") return source;
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === "object") {
        target[key] = deepClone(source[key]); // 递归回来将返回值付给target[key]
      } else {
          if (isArray(source[key])) {
            target.push(source[key]);
          }
          target[key] = source[key];
      }
    }
  }
  return target;
}
// 验证
// let d1 = [{name:'d1'},{name:'d1'}]
// let d1 = [12,34,[12]]
// let d1 = { name: { a: "a" } };
// let d2 = deepClone(d1);
// d2[0].name ='d2'
// console.log(d1, d2);
// let b ={}
// let d1 = {name1: b, name2:b}
// let d2 = deepClone(d1)
// console.log(d2.name1 === d2.name2)  // false

/**
 * 创造层级和广度自定义的对象
 * createObjectData
 */
function createObjectData(deep, breadth) {
  let data = {};
  let temp = data;
  for (let i = 0; i < deep; i++) {
    temp = temp["data"] = {};
    for (let j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }
  return data;
}

// 上面的deepClone会有三个问题
// 1、 无法解决对象中含有正则或者其他对象的拷贝
// 2、 无法处理爆栈，递归次数太多  deepClone(createObjectData(10001,2)) // Maximum call stack size exceeded
// 3、 无法处理循环引用  let a = {}; a.a = a ; deepClone(a) //Maximum call stack size exceeded

/**
 * 处理爆栈采取的策略是改为栈形式的循环，代替递归遍历
 * 解决了栈溢出的问题但是只能拷贝对象
 * loopClone
 */
function loopClone(x) {
  const root = {};
  // 栈 遍历当前节点，如果是对象就放到栈里，否则直接拷贝
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];
  while (loopList.length) {
    // 深度优先
    const node = loopList.pop(); // 拿到最后一个
    const parent = node.parent;
    const key = node.key;
    const data = node.data;
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      // typeof 结果为字符串
      res = parent[key] = {};
    }
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }
  return root;
}

// console.log(loopClone(createObjectData(10001,2)))

/**
 * 处理循环引用
 * 原理是判断有没有对当前引用克隆过，如果是下一次遇到相同的引用不去创建新的
 * forceClone
 */
//
//  比如 let b ={} ;  let a = {a1 : b,a2:b};  此时a.a1 === a.a2 但是深克隆后 a.a1!==a.a2
//  比如 let a ={}; a.a =a; 此时深克隆会陷入循环中从而爆栈，因为没有解决循环引用的问题
function forceClone(x) {
  const uniqueList = []; // 用来去重
  const root = {};
  // 栈 遍历当前节点，如果是对象就放到栈里，否则直接拷贝
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];
  while (loopList.length) {
    // 深度优先
    const node = loopList.pop(); // 拿到最后一个
    const parent = node.parent;
    const key = node.key;
    const data = node.data;
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      // typeof 结果为字符串
      res = parent[key] = {};
    }
    // =========
    // 数据存在
    let uniqueData = find(uniqueList, data); // find(a,b) 判断a是不是属于b find([1],[1,2,3]) true
    if (uniqueData) {
      parent[key] = uniqueData.target;
      continue; // 终端本次循环
    }
    // 数据不存在
    uniqueList.push({
      source: data,
      target: res,
    });
    // ========
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }
  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.source === item) {
      return arr[i];
    }
  }
  return null;
}

// let b ={}
// let d1 = {name1: b, name2:b}
// let d2 = forceClone(d1)
// console.log(d1,d2)
// console.log(d2.name1 === d2.name2)
