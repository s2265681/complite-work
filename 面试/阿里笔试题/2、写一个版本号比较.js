// 2、写一个版本号比较函数，形参 ver1 和 ver2 ，要求实现如下逻辑：

// 如果 ver1 > ver2，返回结果 1；如果 ver1 < ver2，返回 -1；其他情况返回 0 版本号规则x.y.z，xyz均为大于等于0的整数，至少有x位。

//example:

function compare(str1, str2) {
  let arr1 = str1.replace(/0{1,}/g, "0").split(".");
  let arr2 = str2.replace(/0{1,}/g, "0").split(".");
  // 补零
  let arr1Length = arr1.length,
    arr2Length = arr2.length,
    diff = Math.abs(arr1Length - arr2Length);

  if (arr1Length < arr2Length) {
    arr1.push(...Array(diff));
  } else {
    arr2.push(...Array(diff));
  }
  let status = 0;
  for (let i = 0; i < arr1.length; i++) {
    arr1[i] = arr1[i] || 0;
    arr2[i] = arr2[i] || 0;
    if (arr1[i] > arr2[i]) {
      return (status = 1);
    } else if (arr1[i] < arr2[i]) {
      return (status = -1);
    }
  }
  console.log(status, "status...");
  return status;
}

// console.log(compare("0.1", "1.1.1")); // 返回 -1
// console.log(compare("13.37", "1.2"));  // 返回 1
// console.log(compare("1.1", "1.1.0"));  // 0
// console.log(compare("0.0.1", "0.0.1.3.2.0")); // -1
console.log(compare("0.0.1.0.0.0.0.1.1", "0.0.1.0.0.0.0.1.0.0.2")); // 1
