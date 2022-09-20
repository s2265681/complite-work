function deepClone(obj) {
  if (obj instanceof Array) {
    let newArr = [];
    obj.forEach((el) => {
      newArr.push(deepClone(el));
    });
    return newArr;
  } else {
    const newObj = {};
    Object.entries(obj).map(([key, value]) => {
      if (typeof value !== "object") {
        newObj[key] = value;
      }
      if (value instanceof Array) {
        let newArr = [];
        value.forEach((el) => {
          newArr.push(deepClone(el));
        });
        newObj[key] = newArr;
      }
      if (typeof value === "object" && typeof value !== "null") {
        newObj[key] = deepClone(value);
      }
    });
    return newObj;
  }
}

const obj = {
  a: "1",
  b: 123,
  c: { n: 0, m: false },
  d: false,
  e: [{ name: "liming" }],
};
// const obj = [
//   {
//     a: "1",
//     b: 123,
//     c: { n: 0, m: false },
//   },
// ];
const result = deepClone(obj);
console.log(obj, result);
