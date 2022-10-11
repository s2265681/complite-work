function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  // 对对象进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor(); // 生成对象并继承原型上的属性方法
  hash.set(obj, cloneObj);
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

let a = [
  {
    name: 111,
    k: new Date(),
    c: /\d+/,
  },
];
let b = deepClone(a);
a[0].name = 22;
a[0].k = 22;
a[0].c = 22;
console.log(b);
