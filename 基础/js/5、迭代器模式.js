function each(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr[i]);
  }
}
each([1, 2, 3], function (i, n) {
  console.log(i);
  console.log(n);
});

const compare = function (arr1, arr2) {
  let tag = false;
  each(arr1, function (i, n) {
    if (arr2[i] !== n) {
      tag = true;
    }
  });
  if (!tag) {
    console.log("两数组相等");
  } else {
    console.log("两数组不相等");
  }
};
let arr1 = [1, 2, 3],
  arr2 = [1, 2, 3];
compare(arr1, arr2);
