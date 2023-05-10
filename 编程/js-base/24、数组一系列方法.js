/**
 * 1、生成一个0-99的数组
 */
const createArr = (n) => Array.from(new Array(n), (v, i) => i);
const createArr2 = (n) => new Array(n).fill(0).map((v, i) => i);
const createArr3 = (n) => Array.from({ length: n }, (v, i) => i);

/**
 * 2、打乱数组
 */

const random = (array) => array.sort((a, b) => Math.random() - 0.5);

/**
 * 3、数组去重
 */
const arr = [...new Set([1, 1, 2, 3, 4, 3])];

/**
 * 4、多个数组取交集
 * intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9]) => // [3, 4]
 */
const intersection = (a, ...arr) =>
  [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

/**
 * 5、寻找最大索引值
 * indexOfMax([1, 3, 9, 7, 5]); // 2
 * 思路 通过 reduce 判断当前值 和前一个值 比较 大的话 返回index 否则 返回prev
 */

const indexOfMax = (arr) =>
  arr.reduce((prev, curr, index, arr) => (curr > arr[prev] ? index : prev), 0);

/**
 * 6、寻找最小索引值
 *indexOfMin([2, 5, 3, 4, 1, 0, 9])  // 5
 */

const indexOfMin = (arr) =>
  arr.reduce((prev, curr, index, arr) => (curr < arr[prev] ? index : prev), 0);

/**
 * 7、找到最接近的数值
 * 还是通过reduce 来判断 前面数与当前值的绝对值 与 当前数与当前值的绝对值比较
 * closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33
 */

const closest = (arr, n) =>
  arr.reduce((prev, curr) =>
    Math.abs(prev - n) < Math.abs(curr - n) ? prev : curr
  );
console.log(closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50));

/**
 * 8、随机生成一个颜色
 */

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
getRandomColor(); // '#4c2fd7'

/**
 * 9、获取cookie
 */

const getCookie = () =>
  document.cookie
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc, {});

getCookie();

/**
 * 10、强制等待
 */

const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {
  console.log("time");
});
