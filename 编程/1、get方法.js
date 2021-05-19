// const get = (data, path, defaultValue = void 0) => {
//   // get(data, 'a[3].b') => data.3.b
//   // ?: 非捕获性分组
//   let paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
//   // paths => ['a' ,'3' ,'b']
//   let result = data;
//   for (const path of paths) {
//     result = Object(result)[path]; // edge case data -> null
//     if (result == null) {
//       return defaultValue;
//     }
//   }
//   return result;
// };

// [ 'a', '3', 'b' ]
const get = (obj, path, defaultValue = void 0) =>
  path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce((o, j) => (o || {})[j], obj) || defaultValue;

// let obj = {
//   a: {
//     3: {
//       b: "lisi",
//     },
//   },
// };


let obj = {
    a: [{b:1}]
  };

// a[3].b
b = get(obj, "a[0].b");
console.log(b);
