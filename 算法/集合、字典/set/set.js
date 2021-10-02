let mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(5);
mySet.add(5);
mySet.add("ssss");
let o = { a: 1, b: 2 };
mySet.add(o);
mySet.add({ a: 1, b: 2 });

const has = mySet.has(o);

mySet.delete(5);

// 迭代
// for ... of
for (const item of mySet.entries()) {
  console.log(item);
}

// 互转
// Set => Array
// const setArr = [...mySet];
// const setArr = Array.from(mySet);

// Array => Set 使用new Set
let myset2 = new Set([1, 2, 3, 4]);

// 求交集
const intersection = new Set([...mySet].filter((x) => myset2.has(x)));

// 求差集
const difference = new Set([...mySet].filter((x) => !myset2.has(x)));
console.log(intersection, difference);
