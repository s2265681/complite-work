/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-11-29 17:27:46
 */

/**
 *  统计一下层数
 */

const obj = {
  a: { b: [1] },
  c: { d: { e: { f: 1 } } },
};

function loopGetLevel(obj) {
  let res = 1;
  function computedLevel(obj, level = 0) {
    if (typeof obj === "object") {
      for (var key in obj) {
        if (typeof obj[key] === "object") {
          computedLevel(obj[key], level + 1);
        } else {
          res = level + 1 > res ? level + 1 : res;
        }
      }
    }
  }
  computedLevel(obj);
  return res;
}

console.log(loopGetLevel(obj)); // 4
