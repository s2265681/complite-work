// 题一

// 题三
// 给定一个大小为n的数组，打印出所有可能的r个元素的组合。
// 例如，对于输入数组{1, 2, 3, 4}和r=2，输出应该是:
// {1, 2}
// {1, 3}
// {1, 4}
// {2, 3}
// {2, 4}
// {3, 4}
// 请注意，{2 , 1}与{1 , 2}相同，因此不会列出。
const arr = [1, 2, 3, 4]; // r=2
function fn(array, r) {
  for (let i = 0; i < array.length; i++) {
    let j = i + 1;
    while ((j > i) & (j < arr.length)) {
      console.log(array[i], array[j], ";;;;;");
      j++;
    }
  }
}
fn(arr);

// function printCombinations(arr, r) {
//     const combinations = [];

//     // 递归辅助函数，生成组合
//     function generateCombination(currentCombination, startIndex) {
//       if (currentCombination.length === r) {
//         combinations.push([...currentCombination]);
//         return;
//       }

//       for (let i = startIndex; i < arr.length; i++) {
//         currentCombination.push(arr[i]);
//         generateCombination(currentCombination, i + 1);
//         currentCombination.pop();
//       }
//     }

//     generateCombination([], 0);

//     // 打印组合
//     combinations.forEach(combination => {
//       console.log(combination.join(", "));
//     });
//   }

//   const arr = [1, 2, 3, 4];
//   const r = 2;

//   printCombinations(arr, r);
