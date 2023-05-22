var obj1 = { name: "kw" };
Object.defineProperty(obj1, "key", {
  get() {
    return obj[key];
  },
  set(val) {
    obj[key] = val;
  },
});

console.log(object);

// 1、重写了对象的属性，性能较差；
// 2、只能拦截到对象属性的操作，不能处理数组。所以 Vue2 需要单独对数组数据进行处理。
// 3、对于属性的新增和删除，无法拦截到。所以额外提供了 $set 和 $delete 方法，整体不和谐。

const target = {
  name: "kw",
  age: 18,
};
const handler = {
  get(target, key, receiver) {
    return target[key];
  },
  set(target, key, value, receiver) {
    target[key] = value;
  },
};
const proxy = new Proxy(target, handler);
console.log(proxy.name); // "kw"
proxy.name = "zk";
console.log(proxy.name); // "zk"
