/**
 * 题目描述：实现JSON.parse
 */

function parse(json) {
  return eval("(" + json + ")");
}

let str = JSON.stringify({ obj: 1212 });

console.log(parse(str));
