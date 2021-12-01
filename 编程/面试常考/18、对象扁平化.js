/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-01 20:47:31
 */

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};

// function flatten(obj) {
//   const result = {}
//   const handleObject = (key,value) => {
//       result[key] = cycleCheckType(value)
//       return result
//   };
//   const handleArray = (key,value) => {
//     value.forEach((item,index)=>{
//         key[index] = cycleCheckType(item)
//     })
//     return key
//   };
//   const checkObject = (value) =>
//     Object.prototype.toString.call(value) === "[object Object]";

//   const cycleCheckType = (object) => {
//       if(typeof object !== 'object') return object
//     let keys = Object.keys(object);
//     keys.forEach((key) => {
//       let value = obj[key];
//       // 1、value 是非对象
//       if (typeof value !== "object") result[key] = value;
//       // 2、value 是对象
//       if (checkObject(value))result[key] = handleObject(key,value);
//       // 3、value 是数组
//       if (Array.isArray(value)) result[key] =  handleArray(key,value);
//     });
//   };
//   cycleCheckType(obj);
// }

const isObject = (val) => typeof val === "object" && typeof val !== null;
function flatten(object) {
  if (!isObject(object)) return;
  const res = {};
  function dfs(cur, prefix) {
    if (isObject(cur)) {
      // 数组
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        // 对象
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? "." : ""}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  }
  dfs(object, "");
  return res;
}

console.log(flatten(obj)); // 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
