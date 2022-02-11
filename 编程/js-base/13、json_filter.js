let c = [
  {
    name: "liming",
    age: "23",
  },
  {
    name: "liming",
    age: "23",
  },
  {
    name: "wanghong",
    age: "21",
  },
];

// map
// Array.prototype.jsonFilter = function (ckey) {
//   let _array = this || [];
//   let obj = {};
//   _array.map((item, index) => {
//     if (obj[item[ckey]] !== undefined) {
//       _array.splice(index, 1);
//     } else {
//       obj[item[ckey]] = index;
//     }
//   });
//   return _array;
// };

// console.log(c.jsonFilter("name")); // [{name:'liming', age:'23'},{name:'wanghong',age:'21'}]

// filter
let obj = {};
c.filter((item, index) => {
  if (obj[item["name"]] === undefined) {
    obj[item["name"]] = index;
    return true;
  }
  return false;
}).map((el) => {
  console.log(el, "el....");
});
