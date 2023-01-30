function mycurry() {}

const _ = require("lodash");

function f1(n, m, d, f) {
  console.log(n + m + d + f);
}

// let fn = _.curry(f1);
// console.log(fn(1)(2)(3)(4));
// console.log(fn(1, 2)(3)(4));

function mycurry(func) {
  let argslen = func.length;
  return function curried(...args) {
    if (args.length < argslen) {
      return (...others) => curried(...args, ...others);
    } else {
      return func.apply(this, args);
    }
  };
}
let fn = mycurry(f1);

console.log(fn(1)(2)(3)(4));
console.log(fn(1, 2)(3)(4));
