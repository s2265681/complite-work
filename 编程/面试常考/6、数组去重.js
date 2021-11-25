/**
 * 数组去重
 * 1、简单去重
 * 2、JSON 数组去重
 */

let arr1 = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4];
let arr2 = [
  {
    name: "liming",
    age: 11,
  },
  {
    name: "liming",
    age: 11,
  },
  {
    name: "wanghong",
    age: 12,
  },
  {
    name: "liming",
    age: 11,
  },
  {
    name: "wanghong",
    age: 12,
  },
];

/**
 * 一维数组去重
 */

// 1、 Set 去重
// console.log("Set", Array.from(new Set(arr1)));
// console.log("Set", [...new Set(arr1)]);

// 2、 map 配合 includes
let result = [];
arr1.map((item) => {
  if (!result.includes(item)) {
    result.push(item);
  }
});
// console.log("map", result);

// 3、reduce
let reduceResult = arr1.reduce(
  (previousValue, currentValue, currentIndex, array) => {
    if (!previousValue.includes(currentValue)) {
      previousValue.push(currentValue);
    }
    return previousValue;
  },
  []
);
// console.log("reduce", reduceResult);

/**
 * JSON数组类型去重
 */
function filterJson(array, keyName) {
  let keyArr = [];
  let result = [];
  array.map((item) => {
    if (!keyArr.includes(item[keyName])) {
      keyArr.push(item[keyName]);
      result.push(item);
    }
  });
  return result;
}

function filterJson2(array, keyName) {
  let result = [];
  array.reduce((pre, cur, idx, arr) => {
    if (!pre.hasOwnProperty(cur[keyName])) {
      pre[cur[keyName]] = idx;
      result.push(cur);
    }
    return pre || {};
  }, {});
  return result;
}

// console.log(filterJson(arr2, "name"));
console.log(filterJson2(arr2, "name"));
