//
function findUnique(arr) {
  let uniqueArr = [];
  let arrMap = {};

  for (const value of arr) {
    if (arrMap[value]) {
      arrMap[value]++;
    } else {
      arrMap[value] = 1;
    }
  }

  for (const key of arr) {
    if (arrMap[key] === 1) {
      uniqueArr.push(key);
    }
  }

  return uniqueArr;
}

console.log(findUnique([1, 2, 3, 4, 3, 4, 5, 6])); // [1,2]
