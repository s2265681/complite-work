// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

/**
 * @param {number[]} prices
 * @return {number}
 */

// 超时 法一
// var maxProfit = function (prices) {
//   let len = prices.length;
//   if (len < 2) return 0;
//   let finallyMax = 0;
//   for (let i = 0; i < prices.length; i++) {
//     let cur = prices[i];
//     let max = 0;
//     for (let j = i + 1; j < prices.length; j++) {
//       let next = prices[j];
//       if (next > cur && next - cur > max) {
//         max = next - cur;
//       }
//     }
//     if (max > finallyMax) finallyMax = max;
//   }
//   return finallyMax;
// };

// 法二
var maxProfit = function (prices) {
  let len = prices.length;
  if (len < 2) return 0;
  let res = 0;
  let minPrices = prices[0];
  for (let i = 1; i < len; i++) {
    minPrices = Math.min(minPrices, prices[i]);
    res = Math.max(res, prices[i] - minPrices);
  }
  return res;
};

console.log(maxProfit([7, 6, 4, 3, 1]));
console.log(maxProfit([7, 1, 5, 3, 6, 4]));
