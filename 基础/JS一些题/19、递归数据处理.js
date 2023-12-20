const o = {
  a: 1,
  b: [1, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null,
};
// result = {
//     a:1,
//     'b[0]':1,
//     'b[1].c': true,
//     'b[2][0]': 3,
//     'd.e':2,
//     'd.f': 3
// }
function trans(o, rKey = "", result = {}) {
  if (typeof o === "object") {
    if (Array.isArray(o)) {
      // 数组
      o.map((iV, iI) => {
        trans(iV, rKey + "[" + iI + "]", result);
      });
    } else if (o !== null) {
      // 对象
      Object.entries(o).map(([iK, iV]) => {
        trans(iV, rKey + (rKey ? "." : "") + iK, result);
      });
    }
  } else {
    result[rKey] = o;
  }
  return result;
}

console.log(trans(o, "", {}));
