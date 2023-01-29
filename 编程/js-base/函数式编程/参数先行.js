// lodash/fp 参数先行， 会将多参数先转化成单参数的函数， 方便进行组合参数的处理
const _ = require("lodash");

// 'click button' -> 'CLICK_BUTTON'
let str = "click button";

let pp1 = _.split(str, " ");
let pp2 = _.join(pp1, "_");
let pp3 = _.toUpper(pp2);
console.log(pp3); // CLICK_BUTTON

// 组合的要求  必须是一个参数的入参
// 先柯里化，处理成单参数
let splitStr = _.curry((sep, str) => _.split(str, sep));
let joinStr = _.curry((sep, str) => _.join(str, sep));
const composed = _.flowRight(_.toUpper, joinStr("_"), splitStr(" "));
console.log(composed(str));

const fplodash = require("lodash/fp"); // 会自动将内部的方法柯里化，都处理成参数先行的特点, 内部自动进行了柯里化

const componsed2 = _.flowRight(
  fplodash.toUpper,
  fplodash.join("_"),
  fplodash.split(" ")
);
console.log(componsed2(str), "componsed2");
