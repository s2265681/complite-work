// console.log(factorial(5)) // 120
// console.log(factorial(3)) // 6
// console.log(factorial(1)) // 1

// 求阶乘 如 3 = 3*2*1 = 6

function factorial(num) {
  if (num === 1 || num === 0) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

console.log(factorial(5));
