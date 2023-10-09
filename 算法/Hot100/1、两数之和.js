// 暴力解法 双循环 时间On2 空间 On
// var twoSum = function(nums, target) {
//     for(let i=0;i<nums.length;i++){
//         for(let j=i+1;j<nums.length;j++){
//             if(nums[i] + nums[j] === target) return [i,j]
//         }
//     }
// }

// 哈希表解法 时间 On
// var twoSum = function(nums, target) {
//     const hashMap = {}
//     for(let i=0;i<nums.length;i++){
//        const complement = target - nums[i]
//        if(complement in hashMap){
//            return [hashMap[complement],i]
//        }
//        hashMap[nums[i]] = i
//     }
//     return []
// }

// 双指针 必须有序 否则就要排序
var twoSum = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) {
      return [l, r];
    } else if (sum < target) {
      l++;
    } else {
      r--;
    }
  }
  return [];
};

console.log(twoSum([2, 3, 4], 6));
