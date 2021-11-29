/**
 * 涉及一个函数 put 存数据 get 取数据， 存的时候去掉不常用的
 */
// function LRUCache(size) {
//   let map = new Map();
//   let useKey = [];
//   const put = (key, value) => {
//     if (useKey.length >= size) {
//       let startKey = useKey.shift();
//       map.delete(startKey);
//     }
//     map.set(key, value);
//     useKey.push(key);
//   };
//   const get = (key) => {
//     let cur = map.get(key) || -1;
//     if (cur > 0) {
//       useKey = useKey.filter((el) => el !== key);
//       useKey.push(cur);
//     }
//     return cur;
//   };
//   return { get, put };
// }

/**
 * 法二 利用Map数据结构 每次get设置新的键值对 map.keys().next().value  获取第一个元素的key 删除
 * 使用类的方式， 在构造函数内写公共变量， 方便共享和数据外部使用 不用return
 */
class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }
  get(key) {
    let hasKey = this.cache.has(key);
    if (hasKey) {
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    } else {
      return -1;
    }
  }
  put(key, val) {
    let hasKey = this.cache.get(key);
    if (hasKey) {
      this.cache.delete(key);
    }
    this.cache.set(key, val);
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}
const cache = new LRUCache(2); // 存储容量

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // 密钥2作废
console.log(cache.get(2)); // -1
cache.put(4, 4); // 密钥1作废
console.log(cache.get(1)); // -1
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4
