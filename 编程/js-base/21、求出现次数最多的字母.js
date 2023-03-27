function mostFrequentChar(str) {
  // 用对象存储每个单词出现的次数
  let chartCount = {};
  for (let chart of str) {
    if (chartCount[chart]) {
      chartCount[chart]++;
    } else {
      chartCount[chart] = 1;
    }
  }

  let maxCount = 0;
  let mostFrequentChar = "";
  for (const chart in chartCount) {
    if (Object.hasOwnProperty.call(chartCount, chart)) {
      if (chartCount[chart] > maxCount) {
        maxCount = chartCount[chart];
        mostFrequentChar = chartCount[chart];
      }
    }
  }
  return mostFrequentChar;
}

// 求出现最多的单词

console.log(mostFrequentChar("hello")); // l

// console.log('JavaScript') // 'a'
