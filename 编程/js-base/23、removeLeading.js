/**
 * Remove floating-point numbers leading zero.
 * @example
 * 0.5 → .5
 * @example
 * -0.5 → -.5
 * @type {(num: number) => string}
 */
const removeLeadingZero = (num) => {
  let strNum = num.toString();

  if (0 < num && num < 1) {
    strNum = strNum.slice(1);
  } else if (-1 < num && num < 0) {
    strNum = "-" + strNum.slice(2);
  }
  return strNum;
};

console.log(removeLeadingZero("0.3"));

const num = 23;

console.log(num.toExponential());
