// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。 限制：不可使用 sort 函数 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
function findNthmax(arr, nth) {
  // TODO
  for (let i = 0; i < arr.length -1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr[nth - 1];
}

console.log(findNthmax([3, 2, 1, 5, 6, 4], 2)); // 输出 5
console.log(findNthmax([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 输出 4
