// 1、有数目不限的1分、2分、5分硬币。现在要凑齐 1元钱，有多少种凑法

// 方法一 ： 暴力解决
function func1() {
  let r = 0;
  for (let x = 0; x <= 100; x++)
    for (let y = 0; y <= 50; y++)
      for (let z = 0; z <= 20; z++) if (x + 2 * y + 5 * z === 100) ++r;
  return r;
}

function func2() {
  let r = 0;
  for (let y = 0; y <= 50; y++)
    for (let z = 0; z <= (100 - y * 2) / 5; z++) ++r;
  console.log(r);
}

function func3() {
  let r = 0;
  for (let y = 0; y <= 50; y++) r += Math.floor((100 - y * 2) / 5) + 1;
  console.log(r);
}

console.log(func3()); // 541

//2、推广
// 有数目不限的硬币，其面值存储于数组values当中，现要凑齐价值n，问有多少种凑法。

// 所有动态规划问题的一个通用思路，就是我们先把问题的规模缩小去思考，再考虑如何解决更大规模，一方面，我们可以通过解决小规模的问题，熟悉题目，积累经验，另一方面，小规模的问题的解，也可以作为更大规模问题的基础。
