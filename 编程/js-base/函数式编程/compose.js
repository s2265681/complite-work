// const _ = require('lodash')

function double(n) {
  return n * 2;
}

function toFixed(n) {
  return n.toFixed(2);
}

function addPrefix(n) {
  return "💷" + n;
}

let _ = require("lodash");
let composed = _.flowRight(addPrefix, double, toFixed); // Pointed Free
console.log(composed(2));

// let m = compose(f1, f2);

// console.log(m());

// a -> (...args) => double(toFixed(...args))
// 最终，中间形成的自执行函数消掉了 -> (...args) => addPrefix(double(toFixed(...args)))
function myFlowRight(...fns) {
  if (fns.legnth === 1) return fns[0];
  return fns.reduceRight(
    (a, b) =>
      (...args) =>
        b(a(...args))
  );
}

let aa = myFlowRight(addPrefix, double, toFixed);
console.log(aa(1));
