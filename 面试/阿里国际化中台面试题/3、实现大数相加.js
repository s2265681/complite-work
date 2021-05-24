// 请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算

var BigInt = function (str) {
  // your code here
  this.str = str;
};

BigInt.prototype.plus = function (bigint) {
  debugger;
  let a = this.str;
  let b = bigint.str;
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  let t = 0;
  let f = 0;
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f == 1) {
    sum = "1" + sum;
  }
  return this.toString(sum);
};

BigInt.prototype.toString = function (result) {
  // your code here
  return result.toString();
};

var bigint1 = new BigInt("99");
var bigint2 = new BigInt("99");
console.log(bigint1.plus(bigint2));
