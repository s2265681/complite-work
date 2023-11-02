function multiplyAndFormat(input) {
  const regex = /([><]?)(\d+(\.\d+)?)(?:(-)(\d+(\.\d+)?))?/g;
  debugger;
  const result = input.replace(
    regex,
    function (match, prefix, num1, _, separator, num2) {
      const parsedNum1 = parseFloat(num1) * 10;
      let parsedNum2 = null;

      if (separator && num2 !== undefined) {
        parsedNum2 = parseFloat(num2) * 10;
      }

      if (separator && parsedNum2 !== null) {
        return `${prefix}${parsedNum1}-${parsedNum2}`;
      } else {
        return `${prefix}${parsedNum1}`;
      }
    }
  );

  return result;
}

// 测试
const input1 = ">1";
const input2 = "<1";
const input3 = "1-20";

console.log(multiplyAndFormat(input1)); // 输出 '>100'
console.log(multiplyAndFormat(input2)); // 输出 '<100'
console.log(multiplyAndFormat(input3)); // 输出 '100-200'
