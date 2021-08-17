

// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 方法一
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length;i++){
        for(let j=1;j<nums.length;j++){
            if(nums[i]+nums[j]===target && i!==j){
                return [i,j]
            }
        }
    }
 };
 
//  54/54 cases passed (136 ms)
// Your runtime beats 25.98 % of javascript submissions
// Your memory usage beats 56.19 % of javascript submissions (39 MB)

// 方法二i y
var twoSum = function(nums, target) {
    let currentValue;
    let targetIndex;
   for(let i=0;i<nums.length;i++){
       currentValue = nums[i]
       otherValue = target - currentValue
       targetIndex = nums.findIndex((e=>e==otherValue)) 
       if(targetIndex>-1&&targetIndex!==i){
           return [i,targetIndex]
       }
   }
};

// Accepted
// 54/54 cases passed (588 ms)
// Your runtime beats 5.01 % of javascript submissions
// Your memory usage beats 37.85 % of javascript submissions (39.8 MB)


// 方法三
var twoSum = function (nums, target) {
    let obj = {};
    for (let i = 0; i < nums.length; i++) {
      let num = nums[i];
      if (num in obj) {
        return [obj[num], i];
      } else {
        obj[target - num] = i;
      }
    }
  };

//   54/54 cases passed (64 ms)
// Your runtime beats 98.47 % of javascript submissions
// Your memory usage beats 56.39 % of javascript submissions (39 MB)