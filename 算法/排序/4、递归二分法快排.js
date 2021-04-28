let arr = [5, 4, 1, 3, 6, 7, 8, 9, 0, 6, 1, 222];
function sortFun(arr) {
    if(arr.length === 0 ) return arr
    let leftArr=[];
    let rightArr = []
    let midIndex  =  Math.floor(arr.length/2)
    // 数组中原地删除这个值 
    midValue = arr.splice(midIndex,1)[0]
    for(let i=0;i<arr.length;i++){
        if(arr[i]< midValue){
            // console.log(left)
            leftArr.push(arr[i])
        }else{
            rightArr.push(arr[i])
        }
    }
    return sortFun(leftArr).concat(midValue, sortFun(rightArr));
}
console.log(sortFun(arr))

